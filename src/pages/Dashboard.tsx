import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PackageCard } from "@/components/packages/PackageCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { SubscriptionStatus } from "@/components/dashboard/SubscriptionStatus";
import { 
  CreditCard, 
  PackageOpen,
  TrendingUp,
  Sparkles
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

interface Subscription {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  package: Package;
}

interface Payment {
  id: string;
  amount: number;
  payment_method: string;
  status: string;
  payment_date: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch packages
      const { data: packagesData, error: packagesError } = await supabase
        .from("internet_packages")
        .select("*")
        .eq("status", "active");

      if (packagesError) throw packagesError;
      setPackages(packagesData || []);

      // Fetch user's current subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("subscriptions")
        .select(`
          *,
          package:internet_packages(*)
        `)
        .eq("customer_id", user?.id)
        .eq("status", "active")
        .single();

      if (subscriptionError && subscriptionError.code !== "PGRST116") {
        throw subscriptionError;
      }
      setSubscription(subscriptionData);

      // Fetch recent payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from("payments")
        .select("*")
        .eq("customer_id", user?.id)
        .order("payment_date", { ascending: false })
        .limit(5);

      if (paymentsError) throw paymentsError;
      setPayments(paymentsData || []);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-12 w-12 border-2 border-primary/20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between fade-in">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Welcome back to PrimeConnect</p>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Live</span>
          </div>
        </div>

        {/* Current Subscription Status */}
        <SubscriptionStatus subscription={subscription} />

        {/* Quick Stats */}
        <StatsGrid payments={payments} subscription={subscription} />

        {/* Available Packages */}
        <Card className="card-gradient slide-up">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <PackageOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Available Packages</CardTitle>
                <CardDescription>Upgrade or change your internet plan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  isPopular={index === 1} // Make the second package popular
                  currentPackageId={subscription?.package.id}
                  onSubscribe={fetchData}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        {payments.length > 0 && (
          <Card className="card-gradient scale-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Payments</CardTitle>
                  <CardDescription>Your payment history</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment, index) => (
                  <div 
                    key={payment.id} 
                    className="flex items-center justify-between p-4 border rounded-xl hover-lift transition-all duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-subtle rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.payment_method.toUpperCase()} • {new Date(payment.payment_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={payment.status === "completed" ? "default" : "secondary"}
                      className={payment.status === "completed" ? "bg-success text-success-foreground" : ""}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}