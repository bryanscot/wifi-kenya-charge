import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wifi, 
  Calendar, 
  Zap, 
  Database,
  RefreshCw,
  Settings
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

interface SubscriptionStatusProps {
  subscription: Subscription | null;
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
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

  const getProgressValue = (endDate: string, totalDays: number) => {
    const remaining = getDaysRemaining(endDate);
    return (remaining / totalDays) * 100;
  };

  if (!subscription) {
    return (
      <Card className="card-gradient border-dashed border-2 border-muted-foreground/20">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Wifi className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">No Active Subscription</CardTitle>
          <p className="text-muted-foreground">
            Choose from our internet packages to get started with fast, reliable WiFi.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button className="btn-glow bg-gradient-primary">
            Browse Packages
          </Button>
        </CardContent>
      </Card>
    );
  }

  const daysRemaining = getDaysRemaining(subscription.end_date);
  const progressValue = getProgressValue(subscription.end_date, subscription.package.duration_days);

  return (
    <Card className="card-gradient overflow-hidden slide-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Current Plan
                <Badge 
                  variant="secondary" 
                  className="bg-success/10 text-success border-success/20"
                >
                  Active
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your internet service</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover-glow">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Zap className="w-4 h-4" />
              Package
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{subscription.package.name}</p>
              <p className="text-sm text-muted-foreground">{subscription.package.description}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Zap className="w-4 h-4" />
              Speed
            </div>
            <div>
              <p className="text-2xl font-bold">{subscription.package.speed_mbps}</p>
              <p className="text-sm text-muted-foreground">Mbps</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Database className="w-4 h-4" />
              Data Limit
            </div>
            <div>
              <p className="text-2xl font-bold">
                {subscription.package.data_limit_gb || "∞"}
              </p>
              <p className="text-sm text-muted-foreground">
                {subscription.package.data_limit_gb ? "GB" : "Unlimited"}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Time Remaining
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{daysRemaining}</p>
              <p className="text-sm text-muted-foreground">days left</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Service Period</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressValue)}% remaining
            </span>
          </div>
          <Progress 
            value={progressValue} 
            className="h-3"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(subscription.start_date).toLocaleDateString()}</span>
            <span>{new Date(subscription.end_date).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm font-medium">Monthly Cost</p>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(subscription.package.price)}
            </p>
          </div>
          <Button className="btn-glow" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Renew Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}