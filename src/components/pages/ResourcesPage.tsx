import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, BookOpen, Video, FileText, HelpCircle, Calendar, User, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Resources } from '@/entities';
import { format } from 'date-fns';

const resourceTypeIcons = {
  'Blog': BookOpen,
  'Guide': FileText,
  'Webinar': Video,
  'Glossary': HelpCircle,
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resources[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resources[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Resources>('resources');
        setResources(items);
        setFilteredResources(items);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.resourceType === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [selectedType, searchQuery, resources]);

  const resourceTypes = ['all', ...Array.from(new Set(resources.map(r => r.resourceType).filter(Boolean)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-electric-blue mx-auto mb-4 animate-pulse" />
          <p className="text-light-gray font-paragraph">Loading resources...</p>
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
              Knowledge Hub
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Explore our comprehensive collection of AI insights, guides, and resources to accelerate your digital transformation
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 bg-background/50 border-light-gray/20"
              />
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-electric-blue" />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48 bg-background/50 border-light-gray/20">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Resources' : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-light-gray font-paragraph">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resource */}
      {filteredResources.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-electric-blue text-center">
                Featured Resource
              </h2>
              
              {(() => {
                const featuredResource = filteredResources[0];
                const IconComponent = resourceTypeIcons[featuredResource.resourceType as keyof typeof resourceTypeIcons] || BookOpen;
                
                return (
                  <Card className="bg-background/50 border-light-gray/20 hover:border-electric-blue/50 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Content */}
                        <div className="p-12">
                          <div className="flex items-center gap-2 mb-6">
                            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                              <IconComponent className="h-3 w-3 mr-1" />
                              {featuredResource.resourceType}
                            </Badge>
                            {featuredResource.publicationDate && (
                              <Badge variant="outline" className="border-light-gray/30 text-light-gray">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(new Date(featuredResource.publicationDate), 'MMM dd, yyyy')}
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-3xl font-heading font-bold mb-6 text-foreground">
                            {featuredResource.title}
                          </h3>

                          {featuredResource.author && (
                            <div className="flex items-center gap-2 mb-6">
                              <User className="h-4 w-4 text-electric-blue" />
                              <span className="text-light-gray font-paragraph">
                                By <span className="text-electric-blue font-semibold">{featuredResource.author}</span>
                              </span>
                            </div>
                          )}

                          <p className="text-light-gray font-paragraph text-lg leading-relaxed mb-8">
                            {featuredResource.summary}
                          </p>

                          <div className="flex flex-col sm:flex-row gap-4">
                            {featuredResource.externalUrl ? (
                              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <a href={featuredResource.externalUrl} target="_blank" rel="noopener noreferrer">
                                  Read More <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            )}
                            <Button asChild variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                              <Link to="/contact">
                                Get Expert Consultation
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                          {featuredResource.thumbnailImage ? (
                            <Image
                              src={featuredResource.thumbnailImage}
                              alt={featuredResource.title || 'Resource'}
                              width={600}
                              height={500}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-electric-blue/20 to-neon-green/20 flex items-center justify-center">
                              <IconComponent className="h-24 w-24 text-electric-blue/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-light-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-light-gray mb-2">
                No resources found
              </h3>
              <p className="text-light-gray/70 font-paragraph">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.slice(1).map((resource, index) => {
                const IconComponent = resourceTypeIcons[resource.resourceType as keyof typeof resourceTypeIcons] || BookOpen;
                
                return (
                  <motion.div
                    key={resource._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="bg-background/50 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 h-full overflow-hidden">
                      <CardContent className="p-0">
                        {/* Resource Image */}
                        {resource.thumbnailImage && (
                          <div className="relative overflow-hidden">
                            <Image
                              src={resource.thumbnailImage}
                              alt={resource.title || 'Resource'}
                              width={400}
                              height={200}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                            
                            {/* Resource Type Badge */}
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30 backdrop-blur-sm">
                                <IconComponent className="h-3 w-3 mr-1" />
                                {resource.resourceType}
                              </Badge>
                            </div>
                          </div>
                        )}

                        {/* Resource Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            {!resource.thumbnailImage && (
                              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30">
                                <IconComponent className="h-3 w-3 mr-1" />
                                {resource.resourceType}
                              </Badge>
                            )}
                            {resource.publicationDate && (
                              <Badge variant="outline" className="border-light-gray/30 text-light-gray text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(new Date(resource.publicationDate), 'MMM dd')}
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-lg font-heading font-semibold mb-3 text-foreground group-hover:text-neon-green transition-colors line-clamp-2">
                            {resource.title}
                          </h3>

                          {resource.author && (
                            <div className="flex items-center gap-2 mb-3">
                              <User className="h-3 w-3 text-electric-blue" />
                              <span className="text-xs text-light-gray font-paragraph">
                                By {resource.author}
                              </span>
                            </div>
                          )}

                          <p className="text-light-gray font-paragraph text-sm mb-6 line-clamp-3">
                            {resource.summary}
                          </p>

                          {/* Action Button */}
                          {resource.externalUrl ? (
                            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                              <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer">
                                Read More <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                              Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
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

      {/* Resource Categories */}
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
              Explore by Category
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Find the right resources for your AI journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Blog Posts',
                description: 'Latest insights and trends in AI and automation',
                count: resources.filter(r => r.resourceType === 'Blog').length,
                color: 'electric-blue',
              },
              {
                icon: FileText,
                title: 'Guides & Whitepapers',
                description: 'In-depth guides and comprehensive resources',
                count: resources.filter(r => r.resourceType === 'Guide').length,
                color: 'neon-green',
              },
              {
                icon: Video,
                title: 'Webinars',
                description: 'Expert-led sessions and video content',
                count: resources.filter(r => r.resourceType === 'Webinar').length,
                color: 'primary',
              },
              {
                icon: HelpCircle,
                title: 'Glossary',
                description: 'AI and tech terminology explained',
                count: resources.filter(r => r.resourceType === 'Glossary').length,
                color: 'electric-blue',
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedType(category.title.split(' ')[0])}
              >
                <Card className="bg-background/30 border-light-gray/20 hover:border-neon-green/50 transition-all duration-300 text-center h-full">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${category.color}/20 mb-6`}>
                      <category.icon className={`h-8 w-8 text-${category.color}`} />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-light-gray font-paragraph mb-4">
                      {category.description}
                    </p>
                    <Badge className={`bg-${category.color}/20 text-${category.color} border-${category.color}/30`}>
                      {category.count} resources
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Stay Updated
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest AI insights, resources, and industry updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-background/50 border-light-gray/20"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}