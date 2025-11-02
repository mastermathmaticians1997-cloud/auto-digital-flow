import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Bot, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Resources', href: '/resources' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

const footerLinks = {
  products: [
    { name: 'AI Agent Templates', href: '/products' },
    { name: 'Workflow Automation', href: '/products' },
    { name: 'Chatbots', href: '/products' },
    { name: 'Dashboards', href: '/products' },
  ],
  services: [
    { name: 'Digital Marketing', href: '/services' },
    { name: 'AI Agents', href: '/services' },
    { name: 'Workflow Automation', href: '/services' },
    { name: 'App Development', href: '/services' },
  ],
  industries: [
    { name: 'E-commerce', href: '/industries' },
    { name: 'Healthcare', href: '/industries' },
    { name: 'Finance', href: '/industries' },
    { name: 'Real Estate', href: '/industries' },
  ],
  resources: [
    { name: 'Blog', href: '/resources' },
    { name: 'Guides', href: '/resources' },
    { name: 'Webinars', href: '/resources' },
    { name: 'Glossary', href: '/resources' },
  ],
};

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-light-gray/20">
        <nav className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-electric-blue" />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
                AI Solutions
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-paragraph transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-electric-blue'
                      : 'text-light-gray hover:text-electric-blue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-light-gray/20">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-paragraph text-lg transition-colors duration-200 ${
                        location.pathname === item.href
                          ? 'text-electric-blue'
                          : 'text-light-gray hover:text-electric-blue'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-background/50 border-t border-light-gray/20 py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Bot className="h-8 w-8 text-electric-blue" />
                <span className="text-xl font-heading font-bold bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
                  AI Solutions
                </span>
              </Link>
              <p className="text-light-gray font-paragraph mb-6 max-w-md">
                Transforming businesses with cutting-edge AI automation, intelligent workflows, and data-driven digital marketing strategies.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-light-gray hover:text-electric-blue transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-light-gray hover:text-electric-blue transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-light-gray hover:text-electric-blue transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-light-gray hover:text-electric-blue transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-light-gray hover:text-electric-blue transition-colors font-paragraph"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-light-gray hover:text-electric-blue transition-colors font-paragraph"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-4">Industries</h3>
              <ul className="space-y-2">
                {footerLinks.industries.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-light-gray hover:text-electric-blue transition-colors font-paragraph"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-electric-blue" />
                  <span className="text-light-gray font-paragraph">hello@aisolutions.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-electric-blue" />
                  <span className="text-light-gray font-paragraph">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-electric-blue" />
                  <span className="text-light-gray font-paragraph">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-light-gray/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-gray font-paragraph text-sm">
              © 2024 AI Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-light-gray hover:text-electric-blue transition-colors font-paragraph text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-light-gray hover:text-electric-blue transition-colors font-paragraph text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Demo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90 shadow-lg"
        >
          <Bot className="h-6 w-6 text-background" />
        </Button>
      </motion.div>
    </div>
  );
}