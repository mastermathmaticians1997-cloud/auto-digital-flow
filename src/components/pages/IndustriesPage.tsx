import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Heart, DollarSign, Home, GraduationCap, Cpu, Briefcase, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Industries } from '@/entities';

const industryIcons = {
  'E-commerce': ShoppingCart,
  'Healthcare': Heart,
  'Finance': DollarSign,
  'Real Estate': Home,
  'Education': GraduationCap,
  'Technology': Cpu,
  'Professional Services': Briefcase,
  'Manufacturing': Building2,
};

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Industries>('industries');
        setIndustries(items);
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-electric-blue mx-auto mb-4 animate-pulse" />
          <p className="text-light-gray font-paragraph">Loading industries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background via-neon-green/5 to-electric-blue/5">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-neon-green to-electric-blue bg-clip-text text-transparent">
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Specialized AI solutions tailored to the unique challenges and opportunities of your industry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {industries.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-light-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-light-gray mb-2">
                No industries found
              </h3>
              <p className="text-light-gray/70 font-paragraph">
                Please check back later for our industry solutions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => {
                const IconComponent = industryIcons[industry.industryName as keyof typeof industryIcons] || Building2;
                
                return (
                  <motion.div
                    key={industry._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-background/50 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 h-full overflow-hidden">
                      <CardContent className="p-0">
                        {/* Industry Image */}
                        {industry.industryImage && (
                          <div className="relative overflow-hidden">
                            <Image
                              src={industry.industryImage}
                              alt={industry.industryName || 'Industry'}
                              width={400}
                              height={250}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                            
                            {/* Industry Icon */}
                            <div className="absolute top-4 right-4">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neon-green/20 backdrop-blur-sm">
                                <IconComponent className="h-6 w-6 text-neon-green" />
                              </div>
                            </div>

                            {/* Industry Badge */}
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30 backdrop-blur-sm">
                                AI Solutions Available
                              </Badge>
                            </div>
                          </div>
                        )}

                        {/* Industry Content */}
                        <div className="p-8">
                          <h3 className="text-2xl font-heading font-bold mb-4 text-foreground group-hover:text-neon-green transition-colors">
                            {industry.industryName}
                          </h3>
                          
                          {/* Short Description */}
                          <p className="text-light-gray font-paragraph mb-6 leading-relaxed">
                            {industry.shortDescription}
                          </p>

                          {/* Key Benefits */}
                          {industry.keyBenefits && (
                            <div className="mb-6">
                              <h4 className="text-sm font-heading font-semibold text-electric-blue mb-3 uppercase tracking-wider">
                                Key Benefits:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {industry.keyBenefits.split(',').slice(0, 3).map((benefit, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs border-light-gray/30 text-light-gray hover:border-neon-green/50 hover:text-neon-green transition-colors"
                                  >
                                    {benefit.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Button */}
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-neon-green group-hover:text-background transition-all duration-300">
                            Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
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

      {/* Industry Solutions Overview */}
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
              Tailored AI Solutions
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Every industry has unique challenges. Our AI solutions are specifically designed to address your sector's needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: 'E-commerce',
                features: ['Personalized Recommendations', 'Inventory Optimization', 'Customer Support Automation'],
                color: 'electric-blue',
              },
              {
                icon: Heart,
                title: 'Healthcare',
                features: ['Patient Data Analysis', 'Diagnostic Assistance', 'Treatment Optimization'],
                color: 'neon-green',
              },
              {
                icon: DollarSign,
                title: 'Finance',
                features: ['Risk Assessment', 'Fraud Detection', 'Algorithmic Trading'],
                color: 'primary',
              },
              {
                icon: Home,
                title: 'Real Estate',
                features: ['Property Valuation', 'Market Analysis', 'Lead Generation'],
                color: 'electric-blue',
              },
            ].map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-background/30 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${solution.color}/20 mb-6`}>
                      <solution.icon className={`h-8 w-8 text-${solution.color}`} />
                    </div>
                    <h3 className="text-lg font-heading font-semibold mb-4 text-foreground">
                      {solution.title}
                    </h3>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-light-gray font-paragraph">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
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
              Proven Results Across Industries
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Our AI solutions deliver measurable impact across diverse sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: '250+', label: 'Companies Served', color: 'electric-blue' },
              { metric: '15+', label: 'Industries', color: 'neon-green' },
              { metric: '89%', label: 'Average ROI Increase', color: 'primary' },
              { metric: '24/7', label: 'Support Coverage', color: 'electric-blue' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-4xl md:text-5xl font-heading font-bold text-${stat.color} mb-2`}>
                  {stat.metric}
                </div>
                <div className="text-light-gray font-paragraph">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-24 px-4 bg-background/50">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-electric-blue">
                Deep Industry Expertise
              </h2>
              <p className="text-xl font-paragraph text-light-gray mb-8 leading-relaxed">
                Our team combines technical AI expertise with deep industry knowledge to deliver solutions that truly understand your business challenges.
              </p>
              
              <div className="space-y-6">
                {[
                  'Industry-specific AI models and algorithms',
                  'Compliance with sector regulations and standards',
                  'Integration with existing industry tools and platforms',
                  'Scalable solutions that grow with your business',
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-neon-green rounded-full flex-shrink-0" />
                    <span className="text-light-gray font-paragraph">{point}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/contact">
                    Discuss Your Industry <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                  <Link to="/case-studies">
                    View Case Studies
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: ShoppingCart, label: 'E-commerce', count: '50+' },
                  { icon: Heart, label: 'Healthcare', count: '30+' },
                  { icon: DollarSign, label: 'Finance', count: '40+' },
                  { icon: Home, label: 'Real Estate', count: '25+' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-background/50 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 text-center">
                      <CardContent className="p-6">
                        <item.icon className="h-8 w-8 text-electric-blue mx-auto mb-3" />
                        <div className="text-2xl font-heading font-bold text-neon-green mb-1">
                          {item.count}
                        </div>
                        <div className="text-sm text-light-gray font-paragraph">
                          {item.label} Projects
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Let's discuss how AI can revolutionize your specific industry and drive unprecedented growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/contact">
                  Start Your Transformation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg">
                <Link to="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}