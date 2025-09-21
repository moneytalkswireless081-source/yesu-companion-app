import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign,
  Heart,
  CreditCard,
  Smartphone,
  Gift,
  Target,
  Users,
  Church,
  HandHeart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const DonationsPage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  const quickAmounts = [10000, 25000, 50000, 100000, 250000, 500000];

  const projects = [
    {
      id: 'general',
      title: 'General Church Fund',
      description: 'Support general church operations and ministries',
      goal: 10000000,
      raised: 6500000,
      supporters: 234,
      icon: Church
    },
    {
      id: 'youth',
      title: 'Youth Ministry',
      description: 'Programs and activities for young people',
      goal: 3000000,
      raised: 1800000,
      supporters: 89,
      icon: Users
    },
    {
      id: 'outreach',
      title: 'Community Outreach',
      description: 'Helping those in need in our community',
      goal: 5000000,
      raised: 3200000,
      supporters: 156,
      icon: HandHeart
    },
    {
      id: 'building',
      title: 'Building Fund',
      description: 'Expansion and maintenance of church facilities',
      goal: 15000000,
      raised: 4500000,
      supporters: 78,
      icon: Target
    }
  ];

  const mobileMoneyProviders = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      code: '*165#',
      instructions: 'Dial *165# and follow the prompts to send money to church account'
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      code: '*185#',
      instructions: 'Dial *185# and follow the prompts to send money to church account'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const handleDonate = () => {
    if (!donationAmount || !selectedProject) {
      alert('Please select an amount and project');
      return;
    }
    
    console.log('Processing donation:', {
      amount: donationAmount,
      project: selectedProject,
      method: paymentMethod
    });
    
    // Here you would integrate with payment processors
    alert('Redirecting to payment processor...');
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Donations & Giving</h1>
        <p className="text-muted-foreground">Support God's work through your generous giving</p>
      </div>

      {/* Quick Donation */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Make a Donation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Amount Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Quick Amounts</label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={donationAmount === amount.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDonationAmount(amount.toString())}
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Custom Amount (UGX)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </div>

          {/* Project Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Select Project</label>
            <div className="space-y-2">
              {projects.map((project) => {
                const Icon = project.icon;
                const progress = calculateProgress(project.raised, project.goal);
                
                return (
                  <div
                    key={project.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-smooth ${
                      selectedProject === project.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{project.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {formatCurrency(project.raised)} raised
                            </span>
                            <span className="text-muted-foreground">
                              {formatCurrency(project.goal)} goal
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2 transition-smooth"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {project.supporters} supporters
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={handleDonate} 
            className="w-full"
            disabled={!donationAmount || !selectedProject}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Donate {donationAmount && formatCurrency(parseInt(donationAmount) || 0)}
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="card">Card/PayPal</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
          <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Card & PayPal Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-sm">Secure payments powered by Stripe & PayPal</span>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Credit/Debit Card
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74l.635-5.928C2.585 9.394 7.613 4.897 14 5.1c3.573.113 6.526 1.831 8.124 4.699.588 1.056.91 2.246.91 3.548-.001 5.498-4.814 10.001-10.963 9.89H7.076Z"/>
                  </svg>
                  PayPal
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                All card payments are processed securely. We never store your payment information.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Mobile Money
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-orange-700">Currently in development for production</span>
              </div>
              {mobileMoneyProviders.map((provider) => (
                <div key={provider.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">{provider.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{provider.instructions}</p>
                  <div className="bg-muted p-2 rounded text-center">
                    <span className="font-mono text-lg">{provider.code}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Church Account: 1234567890 (YesuApp Ministries)
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Bank Transfer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Bank Name</label>
                  <p className="text-sm text-muted-foreground">Stanbic Bank Uganda</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Account Name</label>
                  <p className="text-sm text-muted-foreground">YesuApp Ministries</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Account Number</label>
                  <p className="text-sm text-muted-foreground font-mono">9030011234567</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Branch Code</label>
                  <p className="text-sm text-muted-foreground">237</p>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Please include your phone number in the transaction reference for confirmation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Donations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">Anonymous Donor</p>
                <p className="text-xs text-muted-foreground">General Church Fund</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{formatCurrency(50000)}</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">Grace M.</p>
                <p className="text-xs text-muted-foreground">Youth Ministry</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{formatCurrency(25000)}</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">John K.</p>
                <p className="text-xs text-muted-foreground">Building Fund</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{formatCurrency(100000)}</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};