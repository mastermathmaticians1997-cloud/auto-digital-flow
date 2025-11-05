import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Bot, Workflow, BarChart3, Users, Star, Mail, Database, MessageSquare, Calendar, FileText, Globe, Settings, Cloud, Smartphone, Code } from 'lucide-react';
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
        setTestimonials(testimonialsData.items); // Show all testimonials
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
              className="text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-brand-purple-light via-brand-blue to-brand-blue-light bg-clip-text text-transparent md:text-6xl"
            >
              Intelligent Automation for a Smarter Tomorrow
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

      {/* Integrate Everything Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-background via-brand-purple/5 to-brand-blue/5">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-purple-light">
              Integrate Everything
            </h2>
            <p className="text-xl font-paragraph text-light-gray max-w-3xl mx-auto">
              Seamlessly connect with leading automation platforms and AI tools through our expert partnerships
            </p>
          </motion.div>

          {/* Platform Logos Extended Semi-Circle Animation */}
          <div className="relative max-w-6xl mx-auto h-[500px] flex items-center justify-center">
            {/* Extended semi-circle container */}
            <div className="relative w-full h-full">
              
              {/* Define platform data for easier management */}
              {(() => {
                const platforms = [
                  { name: 'ChatGPT', icon: Bot, color: 'from-green-400 to-green-600', glow: 'rgba(34, 197, 94, 0.3)', description: 'AI Intelligence', position: { x: 50, y: 250 } },
                  { name: 'Zapier', icon: Workflow, color: 'from-orange-400 to-orange-600', glow: 'rgba(249, 115, 22, 0.3)', description: 'Automation Hub', position: { x: 150, y: 100 } },
                  { name: 'Make.com', icon: Zap, color: 'from-purple-500 to-purple-700', glow: 'rgba(147, 51, 234, 0.3)', description: 'Visual Builder', position: { x: 300, y: 50 } },
                  { name: 'N8n', icon: BarChart3, color: 'from-red-500 to-red-700', glow: 'rgba(239, 68, 68, 0.3)', description: 'Open Source', position: { x: 450, y: 50 } },
                  { name: 'Gmail', icon: Mail, color: 'from-red-400 to-red-600', glow: 'rgba(239, 68, 68, 0.3)', description: 'Email Platform', position: { x: 600, y: 100 } },
                  { name: 'Airtable', icon: Database, color: 'from-blue-400 to-blue-600', glow: 'rgba(59, 130, 246, 0.3)', description: 'Database', position: { x: 700, y: 250 } },
                  { name: 'Slack', icon: MessageSquare, color: 'from-green-500 to-green-700', glow: 'rgba(34, 197, 94, 0.3)', description: 'Team Chat', position: { x: 600, y: 400 } },
                  { name: 'Google Calendar', icon: Calendar, color: 'from-blue-500 to-blue-700', glow: 'rgba(59, 130, 246, 0.3)', description: 'Scheduling', position: { x: 450, y: 450 } },
                  { name: 'Notion', icon: FileText, color: 'from-gray-600 to-gray-800', glow: 'rgba(107, 114, 128, 0.3)', description: 'Workspace', position: { x: 300, y: 450 } },
                  { name: 'Webflow', icon: Globe, color: 'from-indigo-500 to-indigo-700', glow: 'rgba(99, 102, 241, 0.3)', description: 'Web Design', position: { x: 150, y: 400 } },
                  { name: 'HubSpot', icon: Settings, color: 'from-orange-500 to-orange-700', glow: 'rgba(249, 115, 22, 0.3)', description: 'CRM Platform', position: { x: 100, y: 350 } },
                  { name: 'AWS', icon: Cloud, color: 'from-yellow-500 to-yellow-700', glow: 'rgba(245, 158, 11, 0.3)', description: 'Cloud Services', position: { x: 650, y: 350 } },
                  { name: 'Twilio', icon: Smartphone, color: 'from-pink-500 to-pink-700', glow: 'rgba(236, 72, 153, 0.3)', description: 'Communications', position: { x: 375, y: 150 } },
                  { name: 'GitHub', icon: Code, color: 'from-gray-700 to-gray-900', glow: 'rgba(75, 85, 99, 0.3)', description: 'Code Repository', position: { x: 375, y: 350 } }
                ];

                return platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute"
                    style={{
                      left: `${platform.position.x}px`,
                      top: `${platform.position.y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    whileHover={{ scale: 1.1, y: -10 }}
                  >
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          `0 0 20px ${platform.glow}`,
                          `0 0 30px ${platform.glow.replace('0.3', '0.6')}`,
                          `0 0 20px ${platform.glow}`
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                      className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center`}>
                        <platform.icon className="h-8 w-8 text-white" />
                      </div>
                    </motion.div>
                    <div className="text-center mt-3">
                      <h3 className="text-sm font-heading font-semibold text-foreground">{platform.name}</h3>
                      <p className="text-xs text-light-gray">{platform.description}</p>
                    </div>
                  </motion.div>
                ));
              })()}

              {/* Enhanced Connecting Network Animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 750 500">
                <defs>
                  <linearGradient id="networkGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="networkGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#EF4444" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                
                {/* Main outer arc */}
                <motion.path
                  d="M 50 250 Q 375 -50 700 250 Q 375 550 50 250"
                  stroke="url(#networkGradient1)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 4, delay: 1.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                
                {/* Inner connecting arcs */}
                <motion.path
                  d="M 150 100 Q 375 200 600 100"
                  stroke="url(#networkGradient2)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="6,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, delay: 2.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                
                <motion.path
                  d="M 150 400 Q 375 300 600 400"
                  stroke="url(#networkGradient2)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="6,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, delay: 3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                
                {/* Cross connections */}
                <motion.path
                  d="M 300 50 Q 375 250 450 450"
                  stroke="url(#networkGradient1)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, delay: 3.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </svg>

              {/* Enhanced Floating Connection Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-brand-blue-light rounded-full opacity-60"
                    initial={{
                      x: 375 + Math.cos((i * Math.PI) / 6) * 200,
                      y: 250 + Math.sin((i * Math.PI) / 6) * 150,
                      scale: 0
                    }}
                    animate={{
                      x: 375 + Math.cos((i * Math.PI) / 6 + Math.PI / 12) * 200,
                      y: 250 + Math.sin((i * Math.PI) / 6 + Math.PI / 12) * 150,
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Additional inner orbit particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`inner-${i}`}
                    className="absolute w-1.5 h-1.5 bg-brand-purple-light rounded-full opacity-40"
                    initial={{
                      x: 375 + Math.cos((i * Math.PI) / 4) * 120,
                      y: 250 + Math.sin((i * Math.PI) / 4) * 80,
                      scale: 0
                    }}
                    animate={{
                      x: 375 + Math.cos((i * Math.PI) / 4 - Math.PI / 8) * 120,
                      y: 250 + Math.sin((i * Math.PI) / 4 - Math.PI / 8) * 80,
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Partnership Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-brand-purple-light rounded-full animate-pulse"></div>
              <p className="text-sm font-paragraph text-brand-purple-light font-medium">
                Certified partnerships with industry-leading platforms
              </p>
            </div>
          </motion.div>

          {/* Integration Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Workflow className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                Seamless Workflows
              </h3>
              <p className="text-light-gray font-paragraph leading-relaxed">
                Connect your favorite tools and create automated workflows that work across platforms
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                Lightning Fast
              </h3>
              <p className="text-light-gray font-paragraph leading-relaxed">
                Real-time data synchronization and instant automation triggers across all platforms
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple-light to-brand-purple-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                Team Collaboration
              </h3>
              <p className="text-light-gray font-paragraph leading-relaxed">
                Enable your entire team to work together with shared integrations and workflows
              </p>
            </div>
          </motion.div>
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
      <section className="py-32 px-6 sm:px-8 lg:px-12">
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

          {/* Enhanced Scrollable Carousel */}
          <div className="relative">
            {/* Scrollable Container */}
            <div 
              className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onMouseEnter={(e) => {
                // Pause auto-scroll on hover
                const motionDiv = e.currentTarget.querySelector('[data-auto-scroll]') as HTMLElement;
                if (motionDiv) {
                  motionDiv.style.animationPlayState = 'paused';
                }
              }}
              onMouseLeave={(e) => {
                // Resume auto-scroll when not hovering
                const motionDiv = e.currentTarget.querySelector('[data-auto-scroll]') as HTMLElement;
                if (motionDiv) {
                  motionDiv.style.animationPlayState = 'running';
                }
              }}
            >
              <motion.div
                data-auto-scroll
                className="flex gap-8 min-w-max"
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
                style={{
                  width: `${(testimonials.length * 2) * 400}px` // Ensure enough width for seamless scroll
                }}
              >
                {/* First set of testimonials */}
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={`first-${testimonial._id}`}
                    className="flex-shrink-0 w-96"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-background/30 border-light-gray/20 h-full hover:bg-background/40 transition-colors duration-300 cursor-grab active:cursor-grabbing">
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
                    <Card className="bg-background/30 border-light-gray/20 h-full hover:bg-background/40 transition-colors duration-300 cursor-grab active:cursor-grabbing">
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
            </div>
            
            {/* Gradient overlays for smooth edge effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2 text-light-gray/60 text-sm font-paragraph">

                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-brand-purple-accent rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-brand-purple-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-brand-purple-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
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