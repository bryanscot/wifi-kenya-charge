import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  Globe,
  Activity,
  Clock,
  TrendingUp,
  Wifi,
  Timer,
  BarChart3
} from "lucide-react";

interface Payment {
  id: string;
  amount: number;
  payment_method: string;
  status: string;
  payment_date: string;
}

interface Subscription {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  package: {
    duration_days: number;
  };
}

interface StatsGridProps {
  payments: Payment[];
  subscription: Subscription | null;
}

export function StatsGrid({ payments, subscription }: StatsGridProps) {
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

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const daysRemaining = subscription ? getDaysRemaining(subscription.end_date) : 0;
  const monthlySpent = payments
    .filter(p => {
      const paymentDate = new Date(p.payment_date);
      const now = new Date();
      return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

  const stats = [
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      description: "All time spending",
      icon: DollarSign,
      trend: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Connection Status",
      value: subscription?.status === "active" ? "Active" : "Inactive",
      description: "Current service status",
      icon: Globe,
      trend: subscription?.status === "active" ? "Online" : "Offline",
      color: subscription?.status === "active" ? "text-green-600" : "text-red-600",
      bgColor: subscription?.status === "active" ? "bg-green-50" : "bg-red-50",
      borderColor: subscription?.status === "active" ? "border-green-200" : "border-red-200"
    },
    {
      title: "Data Usage",
      value: "2.4 GB",
      description: "This month",
      icon: Activity,
      trend: "↑ 8%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "Next Payment",
      value: `${daysRemaining} days`,
      description: "Until renewal",
      icon: Clock,
      trend: daysRemaining <= 7 ? "Due soon" : "On track",
      color: daysRemaining <= 7 ? "text-red-600" : "text-green-600",
      bgColor: daysRemaining <= 7 ? "bg-red-50" : "bg-green-50",
      borderColor: daysRemaining <= 7 ? "border-red-200" : "border-green-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`card-gradient hover-lift border ${stat.borderColor} fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Badge 
                variant="secondary" 
                className={`text-xs ${stat.color} ${stat.bgColor} border-0`}
              >
                {stat.trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}