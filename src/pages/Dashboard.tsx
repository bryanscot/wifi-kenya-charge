import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  Wifi, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Download, 
  Upload, 
  DollarSign,
  Globe,
  Clock,
  Activity
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

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to PrimeConnect</p>
        </div>
      </div>

      {/* Current Subscription Status */}
      {subscription ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Package</p>
                <p className="text-2xl font-bold">{subscription.package.name}</p>
                <p className="text-sm text-muted-foreground">{subscription.package.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Speed</p>
                <p className="text-2xl font-bold">{subscription.package.speed_mbps} Mbps</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Limit</p>
                <p className="text-2xl font-bold">
                  {subscription.package.data_limit_gb ? `${subscription.package.data_limit_gb} GB` : "Unlimited"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Remaining</p>
                <p className="text-2xl font-bold">{getDaysRemaining(subscription.end_date)}</p>
                <Progress 
                  value={(getDaysRemaining(subscription.end_date) / subscription.package.duration_days) * 100} 
                  className="mt-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>Choose a package to get started</CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(payments.reduce((sum, payment) => sum + payment.amount, 0))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscription ? getDaysRemaining(subscription.end_date) : 0} days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Packages */}
      <Card>
        <CardHeader>
          <CardTitle>Available Packages</CardTitle>
          <CardDescription>Choose from our internet packages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pkg.name}
                    <Badge variant="secondary">{pkg.speed_mbps} Mbps</Badge>
                  </CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{formatCurrency(pkg.price)}</div>
                    <p className="text-sm text-muted-foreground">per {pkg.duration_days} days</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Download className="h-4 w-4" />
                      Speed: {pkg.speed_mbps} Mbps
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Upload className="h-4 w-4" />
                      Data: {pkg.data_limit_gb ? `${pkg.data_limit_gb} GB` : "Unlimited"}
                    </div>
                    <Button className="w-full mt-4">
                      {subscription?.package.id === pkg.id ? "Current Plan" : "Subscribe"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      {payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.payment_method.toUpperCase()} • {new Date(payment.payment_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}