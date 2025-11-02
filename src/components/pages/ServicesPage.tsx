import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone, Bot, Workflow, Code, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';

const serviceIcons = {
  'Digital Marketing': Megaphone,
  'AI Agents': Bot,
  'Workflow Automation': Workflow,
  'App Development': Code,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Services>('services');
        setServices(items);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-12 w-12 text-electric-blue mx-auto mb-4 animate-pulse" />
          <p className="text-light-gray font-paragraph">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-neon-green/5">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-neon-green via-electric-blue to-primary bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Comprehensive AI and automation solutions designed to transform your business operations and accelerate growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {services.length === 0 ? (
            <div className="text-center py-16">
              <Bot className="h-16 w-16 text-light-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-light-gray mb-2">
                No services found
              </h3>
              <p className="text-light-gray/70 font-paragraph">
                Please check back later for our service offerings.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => {
                const IconComponent = serviceIcons[service.serviceName as keyof typeof serviceIcons] || Bot;
                
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group"
                  >
                    <Card className="bg-background/50 border-light-gray/20 hover:border-electric-blue/50 transition-all duration-300 h-full overflow-hidden">
                      <CardContent className="p-0">
                        {/* Service Image */}
                        {service.serviceImage && (
                          <div className="relative overflow-hidden">
                            <Image
                              src={service.serviceImage}
                              alt={service.serviceName || 'Service'}
                              width={600}
                              height={300}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                            
                            {/* Service Icon */}
                            <div className="absolute bottom-4 left-4">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-electric-blue/20 backdrop-blur-sm">
                                <IconComponent className="h-6 w-6 text-electric-blue" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Service Content */}
                        <div className="p-8">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-electric-blue transition-colors">
                              {service.serviceName}
                            </h3>
                            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                              Premium
                            </Badge>
                          </div>

                          {/* Tagline */}
                          {service.tagline && (
                            <p className="text-lg font-paragraph text-electric-blue mb-4 italic">
                              {service.tagline}
                            </p>
                          )}
                          
                          {/* Description */}
                          <p className="text-light-gray font-paragraph mb-6 leading-relaxed">
                            {service.description}
                          </p>

                          {/* Key Benefits */}
                          {service.keyBenefits && (
                            <div className="mb-8">
                              <h4 className="text-lg font-heading font-semibold text-neon-green mb-4 flex items-center">
                                <Star className="h-5 w-5 mr-2" />
                                Key Benefits
                              </h4>
                              <div className="space-y-2">
                                {service.keyBenefits.split(',').map((benefit, idx) => (
                                  <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-neon-green mt-0.5 flex-shrink-0" />
                                    <span className="text-light-gray font-paragraph">
                                      {benefit.trim()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                              asChild 
                              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                            >
                              <Link to="/contact">
                                {service.ctaText || 'Get Started'} <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                            
                            <Button
                              asChild
                              variant="outline"
                              className="border-electric-blue text-electric-blue hover:bg-electric-blue/10"
                            >
                              <Link to="/case-studies">
                                View Case Studies
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              A proven methodology that ensures successful AI implementation and measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery & Analysis',
                description: 'We analyze your current processes and identify opportunities for AI automation',
                color: 'electric-blue',
              },
              {
                step: '02',
                title: 'Strategy & Planning',
                description: 'Develop a comprehensive AI strategy tailored to your business objectives',
                color: 'primary',
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Deploy and integrate AI solutions with minimal disruption to your operations',
                color: 'neon-green',
              },
              {
                step: '04',
                title: 'Optimization',
                description: 'Continuous monitoring and optimization to maximize performance and ROI',
                color: 'electric-blue',
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="bg-background/30 border-light-gray/20 text-center h-full">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${process.color}/20 mb-6`}>
                      <span className={`text-2xl font-heading font-bold text-${process.color}`}>
                        {process.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                      {process.title}
                    </h3>
                    <p className="text-light-gray font-paragraph">
                      {process.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-electric-blue to-neon-green transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-neon-green">
              Why Choose Our Services?
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              We combine cutting-edge technology with deep industry expertise to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: 'Expert AI Implementation',
                description: 'Our team of AI specialists ensures seamless integration and optimal performance',
                stats: '500+ Projects',
              },
              {
                icon: Workflow,
                title: 'Proven Methodologies',
                description: 'Time-tested processes that minimize risk and maximize success rates',
                stats: '98% Success Rate',
              },
              {
                icon: Star,
                title: 'Ongoing Support',
                description: '24/7 monitoring and support to ensure your AI systems perform at their best',
                stats: '24/7 Support',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-background/50 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 text-center h-full">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-green/20 mb-6">
                      <feature.icon className="h-8 w-8 text-neon-green" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-light-gray font-paragraph mb-6">
                      {feature.description}
                    </p>
                    <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30">
                      {feature.stats}
                    </Badge>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI services can drive growth and efficiency in your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/contact">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg">
                <Link to="/case-studies">
                  View Success Stories
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}