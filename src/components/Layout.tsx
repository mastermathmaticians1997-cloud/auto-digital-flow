import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Bot, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Resources', href: '/resources' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

const solutionsDropdown = [
  { name: 'Industries', href: '/industries' },
  { name: 'Case Studies', href: '/case-studies' },
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
        <nav className="max-w-[120rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <Bot className="h-9 w-9 text-brand-purple-light" />
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-brand-purple-light to-brand-purple-accent bg-clip-text text-transparent">
                Zapshere
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-paragraph transition-colors duration-200 hover:scale-105 transform py-2 px-1 ${
                    location.pathname === item.href
                      ? 'text-brand-purple-light'
                      : 'text-light-gray hover:text-brand-purple-light'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Solutions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`font-paragraph transition-colors duration-200 hover:scale-105 transform flex items-center space-x-1 py-2 px-1 ${
                  location.pathname === '/industries' || location.pathname === '/case-studies'
                    ? 'text-brand-purple-light'
                    : 'text-light-gray hover:text-brand-purple-light'
                }`}>
                  <span>Solutions</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border-light-gray/20 mt-2 p-2">
                  {solutionsDropdown.map((item) => (
                    <DropdownMenuItem key={item.name} asChild className="p-3">
                      <Link
                        to={item.href}
                        className={`font-paragraph transition-colors duration-200 w-full ${
                          location.pathname === item.href
                            ? 'text-brand-purple-light'
                            : 'text-light-gray hover:text-brand-purple-light'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground ml-8 px-6 py-3">
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
              <SheetContent side="right" className="bg-background border-light-gray/20 p-8">
                <div className="flex flex-col space-y-8 mt-12">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-paragraph text-lg transition-colors duration-200 py-2 ${
                        location.pathname === item.href
                          ? 'text-brand-purple-light'
                          : 'text-light-gray hover:text-brand-purple-light'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Solutions Section */}
                  <div className="border-t border-light-gray/20 pt-6">
                    <h3 className="text-foreground font-heading font-semibold mb-6">Solutions</h3>
                    {solutionsDropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block font-paragraph text-lg transition-colors duration-200 mb-4 py-2 ${
                          location.pathname === item.href
                            ? 'text-brand-purple-light'
                            : 'text-light-gray hover:text-brand-purple-light'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-8 py-3">
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
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-background/50 border-t border-light-gray/20 py-20">
        <div className="max-w-[120rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <Bot className="h-9 w-9 text-brand-purple-light" />
                <span className="text-2xl font-heading font-bold bg-gradient-to-r from-brand-purple-light to-brand-purple-accent bg-clip-text text-transparent">
                  Zapshere
                </span>
              </Link>
              <p className="text-light-gray font-paragraph mb-8 max-w-md leading-relaxed">
                Transforming businesses with cutting-edge AI automation, intelligent workflows, and data-driven digital marketing strategies.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-light-gray hover:text-brand-purple-light transition-colors p-2">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-light-gray hover:text-brand-purple-light transition-colors p-2">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-light-gray hover:text-brand-purple-light transition-colors p-2">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-light-gray hover:text-brand-purple-light transition-colors p-2">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-6">Products</h3>
              <ul className="space-y-4">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-light-gray hover:text-brand-purple-light transition-colors font-paragraph py-1 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-light-gray hover:text-brand-purple-light transition-colors font-paragraph py-1 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-6">Industries</h3>
              <ul className="space-y-4">
                {footerLinks.industries.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-light-gray hover:text-brand-purple-light transition-colors font-paragraph py-1 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-foreground font-heading font-semibold mb-6">Contact</h3>
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-brand-purple-light mt-1" />
                  <div className="flex flex-col space-y-1">
                    <span className="text-light-gray font-paragraph">hello@zapshere.com</span>
                    <span className="text-light-gray font-paragraph">support@zapshere.com</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-brand-purple-light" />
                  <span className="text-light-gray font-paragraph">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-purple-light" />
                  <span className="text-light-gray font-paragraph">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-light-gray/20 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-gray font-paragraph text-sm">
              © 2024 Zapshere. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link to="/privacy" className="text-light-gray hover:text-brand-purple-light transition-colors font-paragraph text-sm py-2">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-light-gray hover:text-brand-purple-light transition-colors font-paragraph text-sm py-2">
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
          className="h-14 w-14 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-accent hover:from-brand-purple/90 hover:to-brand-purple-accent/90 shadow-lg"
        >
          <Bot className="h-6 w-6 text-background" />
        </Button>
      </motion.div>
    </div>
  );
}