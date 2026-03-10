import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User as UserIcon, LogOut, Package, ChevronRight, Star, Trash2, Plus, Minus, CheckCircle, Search, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';
import { Product, User, CartItem } from './types';

// --- Context ---
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  view: 'home' | 'product' | 'cart' | 'checkout' | 'login' | 'orders' | 'collections' | 'about' | 'reviews';
  setView: (view: 'home' | 'product' | 'cart' | 'checkout' | 'login' | 'orders' | 'collections' | 'about' | 'reviews') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- Components ---

const Navbar = () => {
  const { user, setUser, setView, cart, view, setIsSearchOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Explore' },
    { id: 'collections', label: 'Catalog' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (viewId: any) => {
    setView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl px-6 py-4 border-b border-slate-100">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center h-12">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:text-brand-primary transition-colors z-50"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {navLinks.map(link => (
            <button 
              key={link.id}
              onClick={() => handleNavClick(link.id)} 
              className={`relative py-2 transition-colors hover:text-slate-900 ${view === link.id ? 'text-brand-primary' : ''}`}
            >
              {link.label}
              {view === link.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary"
                />
              )}
            </button>
          ))}
        </div>

        <button onClick={() => setView('home')} className="text-3xl font-display uppercase tracking-tighter text-brand-primary absolute left-1/2 -translate-x-1/2">
          SwiftShop
        </button>
        
        <div className="flex items-center gap-1 md:gap-4">
          <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:text-brand-primary transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <button onClick={() => setView('cart')} className="relative p-2 hover:text-brand-primary transition-colors">
            <ShoppingCart size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-brand-primary text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <button onClick={() => setUser(null)} className="p-2 hover:text-brand-primary transition-colors hidden sm:block">
              <LogOut size={20} strokeWidth={1.5} />
            </button>
          ) : (
            <button onClick={() => setView('login')} className="p-2 hover:text-brand-primary transition-colors hidden sm:block">
              <UserIcon size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map(link => (
                <button 
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-4xl font-display uppercase tracking-tighter text-left transition-colors ${view === link.id ? 'text-brand-primary' : 'text-slate-900 hover:text-brand-primary'}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
                {user ? (
                  <button onClick={() => { setUser(null); setIsMobileMenuOpen(false); }} className="text-sm font-bold uppercase tracking-widest text-slate-900">Sign Out</button>
                ) : (
                  <button onClick={() => handleNavClick('login')} className="text-sm font-bold uppercase tracking-widest text-slate-900">Sign In</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { setView, setSelectedProduct } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col items-center"
    >
      <div 
        className="relative w-full aspect-[4/5] bg-slate-100 product-card-mask overflow-hidden cursor-pointer mb-6"
        onClick={() => {
          setSelectedProduct(product);
          setView('product');
        }}
      >
        <div className="absolute top-6 left-6 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 bg-white/80 backdrop-blur px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" /> {product.category}
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="w-full flex justify-between items-end px-2">
        <div>
          <h3 className="font-accent font-bold text-lg text-slate-800">{product.name}</h3>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{product.category}</p>
        </div>
        <button 
          onClick={() => {
            setSelectedProduct(product);
            setView('product');
          }}
          className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-4 py-2 rounded-full hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { setView } = useApp();
  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden bg-white">
      <div className="max-w-[1800px] mx-auto w-full px-6 flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10 py-12">
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col gap-12 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-brand-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">Cutting-Edge Technology</p>
            </div>
            <h1 className="text-8xl md:text-[10vw] font-display uppercase leading-[0.8] tracking-tighter text-slate-900 mb-8">
              Future <br />
              <span className="italic font-serif normal-case text-brand-primary">Essentials</span>
            </h1>
            <p className="text-slate-500 max-w-md text-xl leading-relaxed font-light">
              Elevate your lifestyle with our curated selection of high-performance gadgets and innovative home essentials.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <button 
              onClick={() => setView('collections')}
              className="group relative bg-slate-900 text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all active:scale-95"
            >
              <span className="relative z-10">Shop All Products</span>
              <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => setView('about')}
              className="px-12 py-6 rounded-full font-bold uppercase tracking-widest border border-slate-200 hover:border-slate-900 transition-all active:scale-95"
            >
              Learn More
            </button>
          </motion.div>

          <div className="grid grid-cols-3 gap-8 mt-12 border-t border-slate-100 pt-12">
            <div>
              <p className="text-3xl font-display text-slate-900">Fast</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Shipping</p>
            </div>
            <div>
              <p className="text-3xl font-display text-slate-900">24/7</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Support</p>
            </div>
            <div>
              <p className="text-3xl font-display text-slate-900">Top</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Quality</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image Showcase */}
        <div className="flex-1 relative order-1 lg:order-2 w-full lg:w-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full max-w-2xl mx-auto overflow-hidden rounded-[60px] shadow-[0_80px_100px_-20px_rgba(0,0,0,0.1)]"
          >
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" 
              alt="Premium Headphones" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-white">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Featured Product</p>
                <h3 className="text-3xl font-display uppercase tracking-tighter">Quantum X1</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display">$299.00</p>
                <button onClick={() => setView('collections')} className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4">Shop Now</button>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-48 h-48 border border-slate-100 rounded-full flex items-center justify-center -z-10"
          >
            <div className="w-40 h-40 border border-slate-50 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h1 className="text-[30vw] font-display uppercase leading-none tracking-tighter whitespace-nowrap translate-y-1/4">
          SWIFTSHOP SWIFTSHOP
        </h1>
      </div>
    </section>
  );
};

const ProductDetails = () => {
  const { selectedProduct: product, addToCart, setView } = useApp();
  if (!product) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-32">
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-400 hover:text-brand-primary mb-12 transition-colors text-xs font-bold uppercase tracking-widest">
        <ArrowLeft size={16} />
        Back to catalog
      </button>
      
      <div className="grid lg:grid-cols-2 gap-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="product-card-mask overflow-hidden bg-slate-100 aspect-[4/5]"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 text-brand-primary mb-4">
            <div className="w-2 h-2 bg-brand-primary rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest">{product.category}</span>
          </div>
          <h1 className="text-6xl font-display uppercase tracking-tighter mb-6 leading-none">{product.name}</h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md">{product.description}</p>
          
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-5xl font-accent font-bold text-slate-900">${product.price.toFixed(2)}</span>
            <span className="text-slate-400 line-through text-xl font-medium">${(product.price * 1.2).toFixed(2)}</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-brand-primary text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95 shadow-xl shadow-brand-primary/20"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, setView } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-40 text-center">
        <h2 className="text-5xl font-display uppercase tracking-tighter mb-4">Your cart is empty</h2>
        <p className="text-slate-400 mb-12 font-medium">Discover our latest products and find what you need.</p>
        <button onClick={() => setView('home')} className="bg-brand-primary text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors">
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-32">
      <h1 className="text-6xl font-display uppercase tracking-tighter mb-16">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-[1fr_400px] gap-20">
        <div className="space-y-12">
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              layout
              className="flex gap-8 items-center border-b border-slate-100 pb-12"
            >
              <div className="w-32 h-40 product-card-mask overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-accent font-bold text-xl">{item.name}</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-brand-primary transition-colors">
                    <Trash2 size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-brand-primary transition-colors"><Minus size={14} /></button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-brand-primary transition-colors"><Plus size={14} /></button>
                  </div>
                  <span className="font-accent font-bold text-2xl">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-brand-bg p-10 rounded-[40px] h-fit sticky top-32">
          <h2 className="text-2xl font-display uppercase tracking-tighter mb-8">Summary</h2>
          <div className="space-y-6 mb-10">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Shipping</span>
              <span className="text-brand-primary">Free</span>
            </div>
            <div className="h-px bg-slate-200/50 my-2"></div>
            <div className="flex justify-between text-3xl font-display uppercase tracking-tighter">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={() => setView('checkout')}
            className="w-full bg-slate-900 text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-primary transition-all active:scale-95"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-32">
      <h1 className="text-8xl font-display uppercase tracking-tighter mb-16">Our Story</h1>
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <p className="text-2xl font-accent font-light leading-relaxed text-slate-600">
            SwiftShop was born from a desire to provide high-quality, innovative products to our customers. We believe in technology that enhances your daily life.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Founded in 2024, our team works tirelessly to source the best electronics and lifestyle products from around the globe. Every item in our catalog is selected for its quality, performance, and design.
          </p>
          <div className="pt-8">
            <h3 className="text-xl font-display uppercase mb-4">Our Values</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-brand-primary rounded-full" />
                <span className="font-bold uppercase tracking-widest text-xs">Quality</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-brand-primary rounded-full" />
                <span className="font-bold uppercase tracking-widest text-xs">Innovation</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-brand-primary rounded-full" />
                <span className="font-bold uppercase tracking-widest text-xs">Customer Focus</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=800&q=80" alt="About SwiftShop" className="w-full rounded-[60px] shadow-2xl" referrerPolicy="no-referrer" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Alex J.", text: "The Quantum X1 headphones are incredible. The noise cancellation is top-notch.", rating: 5 },
    { name: "Sarah M.", text: "Fast shipping and great customer service. The Zenith watch looks even better in person.", rating: 5 },
    { name: "David L.", text: "High-quality products at reasonable prices. Highly recommend SwiftShop.", rating: 5 },
    { name: "Emily K.", text: "The Lumina lamp is perfect for my home office. Sleek design and very functional.", rating: 4 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-32">
      <h1 className="text-8xl font-display uppercase tracking-tighter mb-16">Reviews</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-bg p-12 rounded-[40px] border border-slate-100"
          >
            <div className="flex items-center gap-1 text-brand-primary mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} fill={j < review.rating ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="text-xl font-accent italic mb-8 text-slate-700">"{review.text}"</p>
            <p className="font-bold uppercase tracking-widest text-xs text-slate-400">— {review.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Collections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-12 h-12 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-[1800px] mx-auto px-6 py-32">
      <h1 className="text-8xl font-display uppercase tracking-tighter mb-16">Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setView } = useApp();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-12 h-12 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-white">
      <Hero />
      
      {/* About Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">
        <div className="flex flex-col justify-end">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">About us</p>
          <p className="text-sm font-bold text-slate-900 uppercase">What we do</p>
        </div>
        <div className="flex flex-col items-end text-right">
          <p className="text-sm font-bold text-slate-900 mb-6 leading-tight max-w-xs">
            SwiftShop provides the perfect combination of innovation and quality for your everyday needs.
          </p>
          <button onClick={() => setView('about')} className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors">
            Learn more <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-brand-primary py-32 px-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
              <button className="hover:text-white transition-colors">Latest Tech</button>
              <button className="text-white text-2xl font-display tracking-tighter">NEW ARRIVALS</button>
              <button className="hover:text-white transition-colors">Bestsellers</button>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all">
                <ArrowLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed max-w-sm">
              Our team is passionate about innovation and performance, and we bring this passion to life in every product we offer.
            </p>
            <p className="text-slate-400 text-sm font-medium mb-12 leading-relaxed max-w-sm">
              We love experimenting with modern materials, technologies and designs to create products that not only meet your needs, but also inspire new possibilities.
            </p>
            <button onClick={() => setView('about')} className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors">
              More about us <ArrowRight size={14} />
            </button>
            
            <div className="mt-20">
              <h2 className="text-[15vw] font-display uppercase leading-none text-brand-primary tracking-tighter opacity-10">
                SWIFT
              </h2>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" alt="Tech" className="w-full rounded-2xl" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Tech" className="w-full rounded-2xl" referrerPolicy="no-referrer" />
              </div>
              <div className="pt-12">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80" alt="Tech" className="w-full rounded-2xl" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/20 backdrop-blur-3xl rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-32 px-6 bg-brand-bg">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-display uppercase tracking-tighter">Our catalog</h2>
            <button onClick={() => setView('collections')} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Checkout = () => {
  const { cart, user, setView, clearCart } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      setView('login');
      return;
    }
    
    setIsProcessing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          items: cart,
          total: total
        })
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          clearCart();
          setView('home');
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-6 py-40 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600"
        >
          <CheckCircle size={48} />
        </motion.div>
        <h2 className="text-5xl font-display uppercase tracking-tighter mb-4">Order Confirmed!</h2>
        <p className="text-slate-400 mb-8 font-medium">Thank you for your purchase. We've sent a confirmation email to your inbox.</p>
        <div className="bg-brand-bg p-8 rounded-[40px] border border-slate-100 mb-8">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Order Total</p>
          <p className="text-4xl font-accent font-bold">${total.toFixed(2)}</p>
        </div>
        <p className="text-slate-300 text-xs font-bold uppercase tracking-widest">Redirecting you to the shop...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-32">
      <h1 className="text-6xl font-display uppercase tracking-tighter mb-16 text-center">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Package size={20} className="text-brand-primary" />
              Shipping Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
              <input type="text" placeholder="Last Name" className="bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
              <input type="text" placeholder="Address" className="col-span-2 bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
              <input type="text" placeholder="City" className="bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
              <input type="text" placeholder="ZIP Code" className="bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-slate-100">
            <h2 className="text-xl font-bold mb-8">Payment Details</h2>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                  <span className="font-medium">Ending in 4242</span>
                </div>
                <span className="text-slate-400 text-sm">Expires 12/26</span>
              </div>
              <button className="text-brand-primary text-xs font-bold uppercase tracking-widest hover:underline">+ Add New Payment Method</button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[40px] h-fit sticky top-32">
          <h2 className="text-2xl font-display uppercase tracking-tighter mb-8">Order Summary</h2>
          <div className="space-y-4 mb-10">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-white/60">{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between text-2xl font-display uppercase tracking-tighter">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-brand-primary text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Place Order <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6"
        >
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 p-4 hover:text-brand-primary transition-colors"
          >
            <Plus size={32} className="rotate-45" />
          </button>
          
          <div className="w-full max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">Search our catalog</p>
            <input 
              autoFocus
              type="text" 
              placeholder="Type something..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-6xl font-display uppercase tracking-tighter border-b-2 border-slate-100 focus:border-brand-primary focus:outline-none py-4 text-center"
            />
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {['Headphones', 'Watch', 'Lamp', 'Tech', 'Lifestyle'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-6 py-2 rounded-full border border-slate-200 text-sm font-bold uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'home' | 'product' | 'cart' | 'checkout' | 'login' | 'orders' | 'collections' | 'about' | 'reviews'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      user, setUser, cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      view, setView, selectedProduct, setSelectedProduct, isSearchOpen, setIsSearchOpen
    }}>
      <div className="min-h-screen flex flex-col selection:bg-brand-primary selection:text-white">
        <Navbar />
        <SearchOverlay />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {view === 'home' && <Home />}
              {view === 'collections' && <Collections />}
              {view === 'about' && <About />}
              {view === 'reviews' && <Reviews />}
              {view === 'product' && <ProductDetails />}
              {view === 'cart' && <Cart />}
              {view === 'checkout' && <Checkout />}
              {view === 'login' && <Login />}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="bg-white py-20 px-6 border-t border-slate-100">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <h2 className="text-5xl font-display uppercase tracking-tighter text-brand-primary">SwiftShop</h2>
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              <button className="hover:text-brand-primary transition-colors">Instagram</button>
              <button className="hover:text-brand-primary transition-colors">Pinterest</button>
              <button className="hover:text-brand-primary transition-colors">Twitter</button>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
              © 2024 SWIFTSHOP RETAIL GROUP
            </p>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
}

const Login = () => {
  const { setUser, setView } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/api/register' : '/api/login';
    const body = isRegister ? { email, password, name } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setView('home');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-40">
      <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-100">
        <h2 className="text-4xl font-display uppercase tracking-tighter mb-2 text-center">{isRegister ? 'Join SwiftShop' : 'Welcome'}</h2>
        <p className="text-slate-400 text-center mb-10 text-sm font-medium">{isRegister ? 'Create your account' : 'Sign in to your account'}</p>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs mb-8 text-center font-bold uppercase tracking-widest">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" 
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20" 
          />
          <button className="w-full bg-slate-900 text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-primary transition-all active:scale-95">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-slate-400 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};
