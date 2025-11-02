import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Bot, Workflow, MessageSquare, BarChart3, Wrench, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';

const productTypeIcons = {
  'AI Agent Templates': Bot,
  'Workflow Automation': Workflow,
  'Chatbots': MessageSquare,
  'Dashboards': BarChart3,
  'Custom Tools': Wrench,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Products>('products');
        setProducts(items);
        setFilteredProducts(items);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.productType === selectedType));
    }
  }, [selectedType, products]);

  const productTypes = ['all', ...Array.from(new Set(products.map(p => p.productType).filter(Boolean)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-12 w-12 text-electric-blue mx-auto mb-4 animate-pulse" />
          <p className="text-light-gray font-paragraph">Loading products...</p>
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
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-electric-blue via-primary to-neon-green bg-clip-text text-transparent">
              AI Products & Tools
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-light-gray max-w-4xl mx-auto">
              Ready-to-deploy AI solutions that transform your business operations and drive unprecedented growth
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
              <span className="font-paragraph text-light-gray">Filter by type:</span>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-64 bg-background/50 border-light-gray/20">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Products' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-[120rem] mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Bot className="h-16 w-16 text-light-gray/50 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-light-gray mb-2">
                No products found
              </h3>
              <p className="text-light-gray/70 font-paragraph">
                Try adjusting your filter or check back later for new products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const IconComponent = productTypeIcons[product.productType as keyof typeof productTypeIcons] || Bot;
                
                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="bg-background/50 border-light-gray/20 hover:border-electric-blue/50 transition-all duration-300 h-full overflow-hidden">
                      <CardContent className="p-0">
                        {/* Product Image */}
                        {product.gridImage && (
                          <div className="relative overflow-hidden">
                            <Image
                              src={product.gridImage}
                              alt={product.productName || 'Product'}
                              width={400}
                              height={250}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                            
                            {/* Product Type Badge */}
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue/30">
                                <IconComponent className="h-3 w-3 mr-1" />
                                {product.productType}
                              </Badge>
                            </div>
                          </div>
                        )}

                        {/* Product Content */}
                        <div className="p-8">
                          <h3 className="text-xl font-heading font-semibold mb-4 text-foreground group-hover:text-electric-blue transition-colors">
                            {product.productName}
                          </h3>
                          
                          <p className="text-light-gray font-paragraph mb-6 line-clamp-3">
                            {product.shortDescription}
                          </p>

                          {/* Key Features */}
                          {product.keyFeatures && (
                            <div className="mb-6">
                              <h4 className="text-sm font-heading font-semibold text-neon-green mb-2">
                                Key Features:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {product.keyFeatures.split(',').slice(0, 3).map((feature, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs border-light-gray/30 text-light-gray"
                                  >
                                    {feature.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            
                            {product.demoUrl && (
                              <Button
                                asChild
                                variant="outline"
                                className="border-neon-green text-neon-green hover:bg-neon-green/10"
                              >
                                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Demo
                                </a>
                              </Button>
                            )}
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

      {/* Featured Products Section */}
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
              Why Choose Our AI Products?
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for real-world business challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: 'AI-Powered Intelligence',
                description: 'Advanced machine learning algorithms that adapt and improve over time',
                color: 'electric-blue',
              },
              {
                icon: Workflow,
                title: 'Seamless Integration',
                description: 'Easy-to-implement solutions that work with your existing systems',
                color: 'primary',
              },
              {
                icon: BarChart3,
                title: 'Measurable Results',
                description: 'Track performance and ROI with comprehensive analytics and reporting',
                color: 'neon-green',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/30 border-light-gray/20 text-center h-full">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${feature.color}/20 mb-6`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-light-gray font-paragraph">
                      {feature.description}
                    </p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-8 max-w-2xl mx-auto">
              Transform your business with our AI-powered products. Contact us for a personalized demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/contact">
                  Request Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg">
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}