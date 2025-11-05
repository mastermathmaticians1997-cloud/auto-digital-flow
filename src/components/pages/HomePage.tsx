import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Bot, Workflow, BarChart3, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Services, Products, Industries, CaseStudies, Testimonials } from '@/entities';

// Animated AI Data Stream Hook
const useAnimatedDataStream = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#8B5CF6' : '#3B82F6',
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 10, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.save();
            ctx.globalAlpha = (80 - distance) / 80 * 0.3;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return canvasRef;
};

export default function HomePage() {
  const canvasRef = useAnimatedDataStream();
  const [services, setServices] = useState<Services[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [industries, setIndustries] = useState<Industries[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, productsData, industriesData, caseStudiesData, testimonialsData] = await Promise.all([
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<Products>('products'),
          BaseCrudService.getAll<Industries>('industries'),
          BaseCrudService.getAll<CaseStudies>('casestudies'),
          BaseCrudService.getAll<Testimonials>('testimonials'),
        ]);

        setServices(servicesData.items.slice(0, 4));
        setProducts(productsData.items.slice(0, 6));
        setIndustries(industriesData.items.slice(0, 6));
        setCaseStudies(caseStudiesData.items.slice(0, 3));
        setTestimonials(testimonialsData.items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-6xl md:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-brand-purple-light via-brand-blue to-brand-blue-light bg-clip-text text-transparent"
            >
              AI-Powered Solutions
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-xl md:text-2xl font-paragraph mb-8 text-light-gray max-w-4xl mx-auto"
            >
              Transform your business with cutting-edge AI automation, intelligent workflows, and data-driven digital marketing strategies
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-blue-light text-brand-blue-light hover:bg-brand-blue-light/10 px-8 py-4 text-lg">
                <Link to="/products">
                  Explore Products
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-blue-light">
              Our Services
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Comprehensive AI and automation solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/50 border-light-gray/20 hover:border-brand-blue-light/50 transition-all duration-300 h-full group">
                  <CardContent className="p-10">
                    {service.serviceImage && (
                      <div className="mb-8 overflow-hidden rounded-lg">
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Service'}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-semibold mb-6 text-foreground">
                      {service.serviceName}
                    </h3>
                    <p className="text-light-gray font-paragraph mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Link to="/services">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-background/50">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-purple-accent">
              AI Products & Tools
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Ready-to-deploy AI solutions that transform your business operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-background border-light-gray/20 hover:border-brand-purple-accent/50 transition-all duration-300 h-full group overflow-hidden">
                  <CardContent className="p-0">
                    {product.gridImage && (
                      <div className="relative overflow-hidden">
                        <Image
                          src={product.gridImage}
                          alt={product.productName || 'Product'}
                          width={400}
                          height={250}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    )}
                    <div className="p-10">
                      <div className="flex items-center gap-2 mb-6">
                        <Bot className="h-5 w-5 text-brand-blue-light" />
                        <span className="text-sm font-paragraph text-brand-blue-light uppercase tracking-wider">
                          {product.productType}
                        </span>
                      </div>
                      <h3 className="text-xl font-heading font-semibold mb-6 text-foreground">
                        {product.productName}
                      </h3>
                      <p className="text-light-gray font-paragraph mb-8 leading-relaxed">
                        {product.shortDescription}
                      </p>
                      <Button asChild className="bg-brand-blue-accent text-background hover:bg-brand-blue-accent/90">
                        <Link to="/products">
                          Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
              Industries We Serve
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Specialized solutions across diverse sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/industries" className="block">
                  <Card className="bg-background/30 border-light-gray/20 hover:border-primary/50 transition-all duration-300 text-center group">
                    <CardContent className="p-8">
                      {industry.industryImage && (
                        <div className="mb-6 overflow-hidden rounded-lg">
                          <Image
                            src={industry.industryImage}
                            alt={industry.industryName || 'Industry'}
                            width={150}
                            height={100}
                            className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h3 className="text-sm font-heading font-semibold text-foreground">
                        {industry.industryName}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-background/50">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-blue-light">
              Success Stories
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Real results from our AI implementations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background border-light-gray/20 hover:border-brand-blue-light/50 transition-all duration-300 h-full">
                  <CardContent className="p-10">
                    {study.mainImage && (
                      <div className="mb-8 overflow-hidden rounded-lg">
                        <Image
                          src={study.mainImage}
                          alt={study.projectTitle || 'Case Study'}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="h-5 w-5 text-brand-purple-accent" />
                      <span className="text-sm font-paragraph text-brand-purple-accent uppercase tracking-wider">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-6 text-foreground">
                      {study.projectTitle}
                    </h3>
                    <p className="text-light-gray font-paragraph mb-8 leading-relaxed">
                      {study.problemDescription}
                    </p>
                    {study.roiPercentage && (
                      <div className="flex items-center gap-2 mb-8">
                        <span className="text-2xl font-heading font-bold text-brand-purple-accent">
                          {study.roiPercentage}% ROI
                        </span>
                      </div>
                    )}
                    <Button asChild variant="outline" className="border-brand-blue-light text-brand-blue-light hover:bg-brand-blue-light/10">
                      <Link to="/case-studies">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-purple-accent">
              What Our Clients Say
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Trusted by industry leaders worldwide
            </p>
          </motion.div>

          {/* Animated Scrolling Carousel */}
          <div className="relative">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -100 * testimonials.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: testimonials.length * 8,
                  ease: "linear"
                }
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* First set of testimonials */}
              {testimonials.map((testimonial) => (
                <motion.div
                  key={`first-${testimonial._id}`}
                  className="flex-shrink-0 w-96"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/30 border-light-gray/20 h-full hover:bg-background/40 transition-colors duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < (testimonial.rating || 5) ? 'text-brand-purple-accent fill-current' : 'text-light-gray/30'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-light-gray font-paragraph mb-8 italic leading-relaxed text-sm">
                        "{testimonial.testimonialText}"
                      </p>
                      <div className="flex items-center gap-4">
                        {testimonial.clientPhoto && (
                          <Image
                            src={testimonial.clientPhoto}
                            alt={testimonial.clientName || 'Client'}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h4 className="font-heading font-semibold text-foreground text-sm">
                            {testimonial.clientName}
                          </h4>
                          <p className="text-xs text-light-gray font-paragraph">
                            {testimonial.clientTitleCompany}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial) => (
                <motion.div
                  key={`second-${testimonial._id}`}
                  className="flex-shrink-0 w-96"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/30 border-light-gray/20 h-full hover:bg-background/40 transition-colors duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < (testimonial.rating || 5) ? 'text-brand-purple-accent fill-current' : 'text-light-gray/30'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-light-gray font-paragraph mb-8 italic leading-relaxed text-sm">
                        "{testimonial.testimonialText}"
                      </p>
                      <div className="flex items-center gap-4">
                        {testimonial.clientPhoto && (
                          <Image
                            src={testimonial.clientPhoto}
                            alt={testimonial.clientName || 'Client'}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h4 className="font-heading font-semibold text-foreground text-sm">
                            {testimonial.clientName}
                          </h4>
                          <p className="text-xs text-light-gray font-paragraph">
                            {testimonial.clientTitleCompany}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Gradient overlays for smooth edge effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-primary/20 via-brand-blue/20 to-brand-blue-light/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl font-paragraph text-light-gray mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of companies already leveraging AI to drive growth and efficiency
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg">
                <Link to="/contact">
                  Start Your AI Journey <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-blue-light text-brand-blue-light hover:bg-brand-blue-light/10 px-10 py-4 text-lg">
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