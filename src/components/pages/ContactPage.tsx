import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        service: '',
        budget: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background via-electric-blue/5 to-neon-green/5">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-electric-blue via-neon-green to-primary bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Ready to transform your business with AI? Let's discuss your project and explore how we can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <Card className="bg-background/50 border-light-gray/20">
                <CardHeader className="pb-8">
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-light-gray font-paragraph">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="h-16 w-16 text-neon-green mx-auto mb-6" />
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-light-gray font-paragraph">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="John Doe"
                            className="bg-background/50 border-light-gray/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                            Email Address *
                          </label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@company.com"
                            className="bg-background/50 border-light-gray/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                            Company
                          </label>
                          <Input
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Your Company"
                            className="bg-background/50 border-light-gray/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="bg-background/50 border-light-gray/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                            Service Interest
                          </label>
                          <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                            <SelectTrigger className="bg-background/50 border-light-gray/20">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ai-agents">AI Agents</SelectItem>
                              <SelectItem value="workflow-automation">Workflow Automation</SelectItem>
                              <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                              <SelectItem value="app-development">App Development</SelectItem>
                              <SelectItem value="custom-solution">Custom Solution</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                            Project Budget
                          </label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                            <SelectTrigger className="bg-background/50 border-light-gray/20">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-10k">Under $10,000</SelectItem>
                              <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                              <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                              <SelectItem value="over-500k">Over $500,000</SelectItem>
                              <SelectItem value="discuss">Let's Discuss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                          Subject *
                        </label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="How can we help you?"
                          className="bg-background/50 border-light-gray/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                          rows={6}
                          className="bg-background/50 border-light-gray/20"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card className="bg-background/50 border-light-gray/20">
                <CardHeader>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    Contact Information
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-electric-blue mt-1" />
                    <div>
                      <p className="font-heading font-semibold text-foreground">Email</p>
                      <p className="text-light-gray font-paragraph">hello@zapshere.com</p>
                      <p className="text-light-gray font-paragraph">support@zapshere.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-electric-blue mt-1" />
                    <div>
                      <p className="font-heading font-semibold text-foreground">Phone</p>
                      <p className="text-light-gray font-paragraph">+1 (555) 123-4567</p>
                      <p className="text-light-gray font-paragraph">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-electric-blue mt-1" />
                    <div>
                      <p className="font-heading font-semibold text-foreground">Headquarters</p>
                      <p className="text-light-gray font-paragraph">
                        123 Innovation Drive<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-electric-blue mt-1" />
                    <div>
                      <p className="font-heading font-semibold text-foreground">Business Hours</p>
                      <p className="text-light-gray font-paragraph">
                        Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                        Saturday: 10:00 AM - 4:00 PM PST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-background/50 border-light-gray/20">
                <CardHeader>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    Quick Actions
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-neon-green text-background hover:bg-neon-green/90">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Consultation
                  </Button>
                  
                  <Button variant="outline" className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Live Chat Support
                  </Button>
                  
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    <Phone className="mr-2 h-4 w-4" />
                    Request Callback
                  </Button>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-to-br from-electric-blue/10 to-neon-green/10 border-electric-blue/20">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-electric-blue mx-auto mb-4" />
                  <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Fast Response Time
                  </h4>
                  <p className="text-light-gray font-paragraph mb-4">
                    We typically respond to all inquiries within 2-4 hours during business hours.
                  </p>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    Average: 2 hours
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
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
              Global Presence
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Serving clients worldwide with local expertise and global reach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                region: 'North America',
                cities: ['San Francisco', 'New York', 'Toronto'],
                timezone: 'PST/EST',
                icon: Globe,
              },
              {
                region: 'Europe',
                cities: ['London', 'Berlin', 'Amsterdam'],
                timezone: 'GMT/CET',
                icon: Globe,
              },
              {
                region: 'Asia Pacific',
                cities: ['Singapore', 'Tokyo', 'Sydney'],
                timezone: 'SGT/JST',
                icon: Globe,
              },
              {
                region: 'Latin America',
                cities: ['São Paulo', 'Mexico City', 'Buenos Aires'],
                timezone: 'BRT/CST',
                icon: Globe,
              },
            ].map((office, index) => (
              <motion.div
                key={office.region}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/30 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 text-center h-full">
                  <CardContent className="p-8">
                    <office.icon className="h-12 w-12 text-electric-blue mx-auto mb-6" />
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                      {office.region}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {office.cities.map((city, idx) => (
                        <p key={idx} className="text-light-gray font-paragraph text-sm">
                          {city}
                        </p>
                      ))}
                    </div>
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                      {office.timezone}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Ready to start your AI transformation journey? We're here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Live Chat
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}