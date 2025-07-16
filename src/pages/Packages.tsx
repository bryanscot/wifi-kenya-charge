import { useState, useEffect } from "react";
import { PackageCard } from "@/components/packages/PackageCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  speed_mbps: number;
  price: number;
  duration_days: number;
  data_limit_gb: number | null;
}

export default function Packages() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPackageId, setCurrentPackageId] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
    if (user) {
      fetchCurrentSubscription();
    }
  }, [user]);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from("internet_packages")
        .select("*")
        .eq("status", "active")
        .order("price", { ascending: true });

      if (error) throw error;
      setPackages(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading packages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("package_id")
        .eq("customer_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      setCurrentPackageId(data?.package_id || null);
    } catch (error: any) {
      console.error("Error fetching current subscription:", error);
    }
  };

  const handleSubscribe = () => {
    fetchCurrentSubscription();
    toast({
      title: "Subscription Updated",
      description: "Your subscription has been updated successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Choose Your Internet Package
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect internet plan that suits your needs. Fast, reliable, and affordable connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isPopular={index === 1} // Make the middle package popular
              currentPackageId={currentPackageId}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No packages available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}