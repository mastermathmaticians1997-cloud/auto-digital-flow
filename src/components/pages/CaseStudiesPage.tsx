import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, BarChart3, TrendingUp, Calendar, Building2, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';
import { format } from 'date-fns';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudies[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CaseStudies>('casestudies');
        setCaseStudies(items);
        setFilteredCaseStudies(items);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  useEffect(() => {
    if (selectedIndustry === 'all') {
      setFilteredCaseStudies(caseStudies);
    } else {
      setFilteredCaseStudies(caseStudies.filter(study => study.industry === selectedIndustry));
    }
  }, [selectedIndustry, caseStudies]);

  const industries = ['all', ...Array.from(new Set(caseStudies.map(s => s.industry).filter(Boolean)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-electric-blue mx-auto mb-4 animate-pulse" />
          <p className="text-light-gray font-paragraph">Loading case studies...</p>
        </div>
      </div>
    );
  }

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
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Real results from our AI implementations. Discover how we've transformed businesses across industries.
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-electric-blue" />
              <span className="font-paragraph text-light-gray">Filter by industry:</span>
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-64 bg-background/50 border-light-gray/20">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { metric: `${caseStudies.length}+`, label: 'Success Stories', color: 'electric-blue' },
              { metric: '15+', label: 'Industries', color: 'neon-green' },
              { metric: '89%', label: 'Avg ROI Increase', color: 'primary' },
              { metric: '98%', label: 'Client Satisfaction', color: 'electric-blue' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-heading font-bold text-${stat.color} mb-2`}>
                  {stat.metric}
                </div>
                <div className="text-light-gray font-paragraph text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-16">
              <BarChart3 className="h-16 w-16 text-light-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-light-gray mb-2">
                No case studies found
              </h3>
              <p className="text-light-gray/70 font-paragraph">
                Try adjusting your filter or check back later for new case studies.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study, index) => (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="bg-background/50 border-light-gray/20 hover:border-electric-blue/50 transition-all duration-300 h-full overflow-hidden">
                    <CardContent className="p-0">
                      {/* Case Study Image */}
                      {study.mainImage && (
                        <div className="relative overflow-hidden">
                          <Image
                            src={study.mainImage}
                            alt={study.projectTitle || 'Case Study'}
                            width={400}
                            height={250}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                          
                          {/* Industry Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 backdrop-blur-sm">
                              <Building2 className="h-3 w-3 mr-1" />
                              {study.industry}
                            </Badge>
                          </div>

                          {/* ROI Badge */}
                          {study.roiPercentage && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30 backdrop-blur-sm">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {study.roiPercentage}% ROI
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Case Study Content */}
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <BarChart3 className="h-5 w-5 text-electric-blue" />
                          <span className="text-sm font-paragraph text-electric-blue uppercase tracking-wider">
                            Case Study
                          </span>
                        </div>

                        <h3 className="text-xl font-heading font-semibold mb-4 text-foreground group-hover:text-electric-blue transition-colors">
                          {study.projectTitle}
                        </h3>

                        {/* Client Info */}
                        {study.clientName && (
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-paragraph text-light-gray">
                              Client: <span className="text-neon-green font-semibold">{study.clientName}</span>
                            </span>
                          </div>
                        )}

                        {/* Problem Description */}
                        <div className="mb-6">
                          <h4 className="text-sm font-heading font-semibold text-neon-green mb-2 uppercase tracking-wider">
                            Challenge:
                          </h4>
                          <p className="text-light-gray font-paragraph text-sm line-clamp-3">
                            {study.problemDescription}
                          </p>
                        </div>

                        {/* Results */}
                        {study.resultsAchieved && (
                          <div className="mb-6">
                            <h4 className="text-sm font-heading font-semibold text-electric-blue mb-2 uppercase tracking-wider">
                              Results:
                            </h4>
                            <p className="text-light-gray font-paragraph text-sm line-clamp-2">
                              {study.resultsAchieved}
                            </p>
                          </div>
                        )}

                        {/* Date */}
                        {study.dateCompleted && (
                          <div className="flex items-center gap-2 mb-6">
                            <Calendar className="h-4 w-4 text-light-gray/70" />
                            <span className="text-sm text-light-gray/70 font-paragraph">
                              Completed: {format(new Date(study.dateCompleted), 'MMM yyyy')}
                            </span>
                          </div>
                        )}

                        {/* Action Button */}
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Case Study */}
      {filteredCaseStudies.length > 0 && (
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
                Featured Success Story
              </h2>
              <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
                Dive deep into one of our most impactful AI implementations
              </p>
            </motion.div>

            {(() => {
              const featuredStudy = filteredCaseStudies[0];
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background/30 border-light-gray/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Content */}
                        <div className="p-12">
                          <div className="flex items-center gap-2 mb-6">
                            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                              {featuredStudy.industry}
                            </Badge>
                            {featuredStudy.roiPercentage && (
                              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30">
                                {featuredStudy.roiPercentage}% ROI
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-3xl font-heading font-bold mb-6 text-foreground">
                            {featuredStudy.projectTitle}
                          </h3>

                          {featuredStudy.clientName && (
                            <p className="text-lg font-paragraph text-light-gray mb-6">
                              Client: <span className="text-neon-green font-semibold">{featuredStudy.clientName}</span>
                            </p>
                          )}

                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-heading font-semibold text-neon-green mb-3">
                                The Challenge
                              </h4>
                              <p className="text-light-gray font-paragraph leading-relaxed">
                                {featuredStudy.problemDescription}
                              </p>
                            </div>

                            {featuredStudy.solutionImplemented && (
                              <div>
                                <h4 className="text-lg font-heading font-semibold text-electric-blue mb-3">
                                  Our Solution
                                </h4>
                                <p className="text-light-gray font-paragraph leading-relaxed">
                                  {featuredStudy.solutionImplemented}
                                </p>
                              </div>
                            )}

                            {featuredStudy.resultsAchieved && (
                              <div>
                                <h4 className="text-lg font-heading font-semibold text-primary mb-3">
                                  The Results
                                </h4>
                                <p className="text-light-gray font-paragraph leading-relaxed">
                                  {featuredStudy.resultsAchieved}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                              Download Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button asChild variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                              <Link to="/contact">
                                Discuss Your Project
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Image/Chart */}
                        <div className="relative">
                          {featuredStudy.chartImage ? (
                            <Image
                              src={featuredStudy.chartImage}
                              alt="Results Chart"
                              width={600}
                              height={500}
                              className="w-full h-full object-cover"
                            />
                          ) : featuredStudy.mainImage ? (
                            <Image
                              src={featuredStudy.mainImage}
                              alt={featuredStudy.projectTitle || 'Case Study'}
                              width={600}
                              height={500}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-electric-blue/20 to-neon-green/20 flex items-center justify-center">
                              <BarChart3 className="h-24 w-24 text-electric-blue/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })()}
          </div>
        </section>
      )}

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
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Join our growing list of successful AI implementations. Let's discuss how we can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
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