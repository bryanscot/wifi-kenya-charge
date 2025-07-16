import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wifi, Shield, Zap, Clock, CheckCircle, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8 fade-in">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mr-6 shadow-glow">
                <Wifi className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PrimeConnect
              </h1>
            </div>
            
            <div className="space-y-4 slide-up">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Fast, Reliable WiFi
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Billing Made Simple
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Kenya's premier WiFi billing system. Manage your internet packages, track usage, and make payments seamlessly with M-Pesa integration.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 scale-in">
              <Link to="/auth">
                <Button size="lg" className="px-10 py-4 text-lg btn-glow bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="px-10 py-4 text-lg hover-lift border-primary/20 hover:border-primary/40">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 fade-in">
          <h3 className="text-4xl font-bold mb-4">Why Choose PrimeConnect?</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our cutting-edge WiFi billing platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center card-gradient hover-lift group transition-all duration-300">
            <CardHeader className="pb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-lg transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-3">Lightning Fast</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                High-speed internet with minimal latency for all your streaming, gaming, and work needs
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center card-gradient hover-lift group transition-all duration-300 scale-105">
            <CardHeader className="pb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-lg transition-all duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-3">Secure Payments</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Seamless M-Pesa integration with bank-level security and instant payment processing
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center card-gradient hover-lift group transition-all duration-300">
            <CardHeader className="pb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-lg transition-all duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-3">24/7 Support</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Round-the-clock technical support and customer service from our expert team
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Packages Preview */}
      <div className="container mx-auto px-4 py-20 bg-gradient-card">
        <div className="text-center mb-16 slide-up">
          <h3 className="text-4xl font-bold mb-4">Choose Your Plan</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible packages designed for every need and budget
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="card-gradient hover-lift transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-primary-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Basic Plan</CardTitle>
              <CardDescription>Perfect for light browsing and social media</CardDescription>
              <div className="text-3xl font-bold text-primary mt-6">KSh 1,500</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">5 Mbps Speed</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">50 GB Data</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">Basic Support</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-gradient hover-lift transition-all duration-300 ring-2 ring-primary relative scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm flex items-center gap-1 shadow-glow">
                <Star className="w-3 h-3" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Standard Plan</CardTitle>
              <CardDescription>Great for streaming and video calls</CardDescription>
              <div className="text-3xl font-bold text-primary mt-6">KSh 2,500</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">10 Mbps Speed</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">100 GB Data</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">Priority Support</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-gradient hover-lift transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-primary-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Premium Plan</CardTitle>
              <CardDescription>High-speed for multiple devices and gaming</CardDescription>
              <div className="text-3xl font-bold text-primary mt-6">KSh 4,000</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">25 Mbps Speed</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">200 GB Data</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-subtle">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">24/7 Support</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6 scale-in">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mr-4 shadow-glow">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PrimeConnect
              </span>
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Connecting Kenya with fast, reliable internet solutions and seamless billing experience.
            </p>
            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                © 2024 PrimeConnect. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
