import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wifi, Shield, Zap, Clock, CheckCircle, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mr-4">
              <Wifi className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold">PrimeConnect</h1>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Fast, Reliable WiFi
            <br />
            <span className="text-primary">Billing Made Simple</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kenya's premier WiFi billing system. Manage your internet packages, track usage, and make payments seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/auth">
              <Button size="lg" className="px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose PrimeConnect?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>High-speed internet with minimal latency for all your needs</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>M-Pesa integration and secure payment processing</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>24/7 Support</CardTitle>
              <CardDescription>Round-the-clock technical support and customer service</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Packages Preview */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Our Packages</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Basic Plan</CardTitle>
              <CardDescription>Perfect for light browsing</CardDescription>
              <div className="text-3xl font-bold text-primary mt-4">KSh 1,500</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>5 Mbps Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>50 GB Data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Basic Support</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm flex items-center gap-1">
                <Star className="w-3 h-3" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle>Standard Plan</CardTitle>
              <CardDescription>Great for streaming</CardDescription>
              <div className="text-3xl font-bold text-primary mt-4">KSh 2,500</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>10 Mbps Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>100 GB Data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Priority Support</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Premium Plan</CardTitle>
              <CardDescription>High-speed for multiple devices</CardDescription>
              <div className="text-3xl font-bold text-primary mt-4">KSh 4,000</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>25 Mbps Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>200 GB Data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <Wifi className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PrimeConnect</span>
            </div>
            <p className="text-muted-foreground">
              Connecting Kenya with fast, reliable internet solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
