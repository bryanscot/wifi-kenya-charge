import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  Upload, 
  Clock, 
  Star,
  Zap,
  Shield,
  Loader
} from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  speed_mbps: number;
  price: number;
  duration_days: number;
  data_limit_gb: number | null;
}

interface PackageCardProps {
  package: Package;
  isPopular?: boolean;
  currentPackageId?: string;
  onSubscribe?: () => void;
}

export function PackageCard({ package: pkg, isPopular, currentPackageId, onSubscribe }: PackageCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a package.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Calculate end date
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + pkg.duration_days);

      const { error } = await supabase
        .from("subscriptions")
        .insert({
          customer_id: user.id,
          package_id: pkg.id,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: "active"
        });

      if (error) throw error;

      toast({
        title: "Subscription Successful!",
        description: `You have subscribed to ${pkg.name}. Your service is now active.`,
      });

      onSubscribe?.();
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPlan = currentPackageId === pkg.id;

  return (
    <Card className={`relative hover-lift transition-all duration-300 ${
      isPopular ? 'ring-2 ring-primary card-gradient scale-105' : 'card-gradient'
    }`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-gradient-primary text-white px-4 py-1 rounded-full shadow-glow flex items-center gap-1">
            <Star className="w-3 h-3" />
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isPopular ? 'bg-gradient-primary' : 'bg-primary-subtle'
          }`}>
            <Zap className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-primary'}`} />
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
        <CardDescription className="text-sm">{pkg.description}</CardDescription>
        
        <div className="mt-4">
          <div className="text-3xl font-bold text-primary">{formatCurrency(pkg.price)}</div>
          <p className="text-sm text-muted-foreground">per {pkg.duration_days} days</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-subtle">
            <Download className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-sm">Speed</p>
              <p className="text-xs text-muted-foreground">{pkg.speed_mbps} Mbps download</p>
            </div>
            <Badge variant="secondary">{pkg.speed_mbps} Mbps</Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-subtle">
            <Upload className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-sm">Data Limit</p>
              <p className="text-xs text-muted-foreground">
                {pkg.data_limit_gb ? `${pkg.data_limit_gb} GB included` : "Unlimited usage"}
              </p>
            </div>
            <Badge variant="secondary">
              {pkg.data_limit_gb ? `${pkg.data_limit_gb} GB` : "Unlimited"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-subtle">
            <Clock className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-sm">Duration</p>
              <p className="text-xs text-muted-foreground">Service validity period</p>
            </div>
            <Badge variant="secondary">{pkg.duration_days} days</Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
            <Shield className="h-4 w-4 text-success" />
            <div className="flex-1">
              <p className="font-medium text-sm text-success">24/7 Support</p>
              <p className="text-xs text-success/70">Technical assistance included</p>
            </div>
          </div>
        </div>
        
        <Button 
          className={`w-full mt-6 ${
            isPopular ? 'btn-glow bg-gradient-primary hover:shadow-glow' : ''
          } ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSubscribe}
          disabled={loading || isCurrentPlan}
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : isCurrentPlan ? (
            "Current Plan"
          ) : (
            "Subscribe Now"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}