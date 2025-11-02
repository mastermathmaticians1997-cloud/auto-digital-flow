import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { BaseCrudService } from '@/integrations';
import { PricingPlans } from '@/entities';

export default function PricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlans[]>([]);
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const { items } = await BaseCrudService.getAll<PricingPlans>('pricingplans');
        setPricingPlans(items);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Zap className="h-12 w-12 text-electric-blue mx-auto mb-4 animate-pulse" />
          <p className="text-light-gray font-paragraph">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-electric-blue/5">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-electric-blue via-neon-green to-primary bg-clip-text text-transparent">
              Pricing Plans
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Choose the perfect AI solution package for your business needs and budget
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <span className={`font-paragraph ${!isAnnual ? 'text-electric-blue' : 'text-light-gray'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-electric-blue"
            />
            <span className={`font-paragraph ${isAnnual ? 'text-electric-blue' : 'text-light-gray'}`}>
              Annual
            </span>
            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 ml-2">
              Save 20%
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {pricingPlans.length === 0 ? (
            <div className="text-center py-16">
              <Zap className="h-16 w-16 text-light-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-light-gray mb-2">
                No pricing plans found
              </h3>
              <p className="text-light-gray/70 font-paragraph">
                Please check back later for our pricing options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => {
                const price = plan.price || 0;
                const displayPrice = isAnnual ? Math.round(price * 0.8) : price;
                const isRecommended = plan.isRecommended;
                
                return (
                  <motion.div
                    key={plan._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`relative ${isRecommended ? 'z-10' : ''}`}
                  >
                    <Card className={`h-full overflow-hidden transition-all duration-300 ${
                      isRecommended 
                        ? 'bg-gradient-to-b from-electric-blue/10 to-neon-green/10 border-electric-blue/50 scale-105' 
                        : 'bg-background/50 border-light-gray/20 hover:border-electric-blue/30'
                    }`}>
                      {isRecommended && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-electric-blue to-neon-green p-3 text-center">
                          <Badge className="bg-background/90 text-electric-blue border-none">
                            <Star className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className={`text-center ${isRecommended ? 'pt-16' : 'pt-8'} pb-8`}>
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                          {plan.planName}
                        </h3>
                        
                        <div className="mb-4">
                          <span className="text-4xl md:text-5xl font-heading font-bold text-electric-blue">
                            ${displayPrice}
                          </span>
                          <span className="text-light-gray font-paragraph ml-2">
                            /{plan.priceUnit || 'month'}
                          </span>
                        </div>

                        {isAnnual && (
                          <div className="text-sm text-neon-green font-paragraph">
                            Save ${Math.round((price - displayPrice) * 12)} annually
                          </div>
                        )}

                        <p className="text-light-gray font-paragraph">
                          {plan.shortDescription}
                        </p>
                      </CardHeader>

                      <CardContent className="px-8 pb-8">
                        {/* Features */}
                        {plan.features && (
                          <div className="mb-8">
                            <h4 className="text-lg font-heading font-semibold text-neon-green mb-4">
                              What's Included:
                            </h4>
                            <ul className="space-y-3">
                              {plan.features.split(',').map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-neon-green mt-0.5 flex-shrink-0" />
                                  <span className="text-light-gray font-paragraph">
                                    {feature.trim()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CTA Button */}
                        <Button 
                          asChild 
                          className={`w-full ${
                            isRecommended 
                              ? 'bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90 text-background' 
                              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          }`}
                        >
                          {plan.callToActionUrl ? (
                            <a href={plan.callToActionUrl} target="_blank" rel="noopener noreferrer">
                              {plan.callToActionText || 'Get Started'} <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          ) : (
                            <Link to="/contact">
                              {plan.callToActionText || 'Get Started'} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/10 via-electric-blue/10 to-neon-green/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-electric-blue">
              Enterprise Solutions
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Custom AI solutions designed for large-scale organizations with specific requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background/30 border-light-gray/20 h-full">
                <CardContent className="p-12">
                  <h3 className="text-3xl font-heading font-bold mb-6 text-foreground">
                    Custom Enterprise Package
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      'Dedicated AI development team',
                      'Custom model training and deployment',
                      'Enterprise-grade security and compliance',
                      '24/7 priority support and monitoring',
                      'On-premise or hybrid cloud deployment',
                      'Advanced analytics and reporting',
                      'Integration with existing enterprise systems',
                      'Scalable infrastructure and performance optimization',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-neon-green mt-0.5 flex-shrink-0" />
                        <span className="text-light-gray font-paragraph">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link to="/contact">
                        Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                      <Link to="/case-studies">
                        View Enterprise Cases
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: '500+', label: 'Enterprise Clients', color: 'electric-blue' },
                  { metric: '99.9%', label: 'Uptime SLA', color: 'neon-green' },
                  { metric: '24/7', label: 'Support Coverage', color: 'primary' },
                  { metric: '50+', label: 'Countries Served', color: 'electric-blue' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <Card className="bg-background/50 border-light-gray/20 p-6">
                      <div className={`text-3xl font-heading font-bold text-${stat.color} mb-2`}>
                        {stat.metric}
                      </div>
                      <div className="text-light-gray font-paragraph text-sm">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-background/50 border-light-gray/20 p-8 text-center">
                <h4 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Need a Custom Quote?
                </h4>
                <p className="text-light-gray font-paragraph mb-6">
                  Our enterprise solutions are tailored to your specific needs and scale.
                </p>
                <Button asChild className="bg-neon-green text-background hover:bg-neon-green/90">
                  <Link to="/contact">
                    Schedule Consultation <Calendar className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-neon-green">
              Frequently Asked Questions
            </h2>
            <p className="text-xl font-paragraph text-light-gray">
              Common questions about our pricing and services
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'Can I change my plan at any time?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly.',
              },
              {
                question: 'Do you offer custom pricing for large organizations?',
                answer: 'Absolutely! We offer custom enterprise packages with volume discounts, dedicated support, and tailored features for organizations with specific requirements.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, bank transfers, and can accommodate purchase orders for enterprise clients.',
              },
              {
                question: 'Is there a free trial available?',
                answer: 'Yes, we offer a 14-day free trial for all our plans. No credit card required to get started.',
              },
              {
                question: 'What kind of support is included?',
                answer: 'All plans include email support. Higher-tier plans include priority support, phone support, and dedicated account management.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/50 border-light-gray/20">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-light-gray font-paragraph leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/20 via-electric-blue/20 to-neon-green/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Choose your plan and start transforming your business with AI today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/contact">
                  Start Free Trial <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg">
                <Link to="/contact">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}