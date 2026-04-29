"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CartProvider, useCart } from "@/lib/cart-store";
import { MENU, COMBOS, CATEGORIES, REVIEWS, PHONE, WHATSAPP_URL, type MenuItem } from "@/lib/menu-data";

/* ─── INTERSECTION OBSERVER HOOK ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── ANIMATED COUNTER ─── */
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0; const step = end / (duration / 16);
        const timer = setInterval(() => { start += step; if (start >= end) { setVal(end); clearInterval(timer); } else setVal(Math.floor(start)); }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#combos", label: "Combos" },
    { href: "#reviews", label: "Reviews" },
    { href: "#location", label: "Find Us" },
    { href: "#gallery", label: "Gallery" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-dark/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-lg font-display text-gold group-hover:scale-110 transition-transform">P</div>
          <div>
            <div className="font-display text-gold text-lg leading-tight">Pothuraju</div>
            <div className="text-[10px] text-white/40 tracking-[3px] uppercase">The Dum God</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-gold transition-colors font-medium tracking-wide uppercase">{l.label}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa text-sm !px-5 !py-2.5 flex items-center gap-2">
            <span>📞</span> Order Now
          </a>
          <button onClick={cart.toggle} className="relative ml-2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            🛒
            {cart.count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand rounded-full text-[10px] font-bold flex items-center justify-center cart-bounce">{cart.count}</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={cart.toggle} className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            🛒
            {cart.count > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand rounded-full text-[10px] font-bold flex items-center justify-center">{cart.count}</span>}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="w-10 h-10 flex flex-col items-center justify-center gap-1.5">
            <span className={`w-5 h-0.5 bg-gold transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-gold transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-gold transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-dark-alt/98 backdrop-blur-xl border-t border-white/5 animate-fade-in">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-white/70 text-lg font-medium">{l.label}</a>)}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa text-center mt-2">📞 Order on WhatsApp</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Background layers */}
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&h=1080&fit=crop&q=80" alt="Hyderabadi Dum Biryani background" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
      </div>

      {/* Floating food images */}
      <div className="absolute top-20 right-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden opacity-20 animate-float hidden lg:block">
        <Image src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&h=200&fit=crop&q=70" alt="Biryani handi" fill className="object-cover" />
      </div>
      <div className="absolute bottom-32 right-[25%] w-20 h-20 rounded-full overflow-hidden opacity-15 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
        <Image src="https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=200&h=200&fit=crop&q=70" alt="Indian spices" fill className="object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse" />
            <span className="text-xs text-white/60 tracking-widest uppercase">Now delivering in Kondapur</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-4">
            The Dum<br />God of<br /><span className="text-gradient">Biryani</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-md mb-8 leading-relaxed">
            Authentic Hyderabadi dum biryani, slow-cooked over coal in sealed handis. No shortcuts. Just flavour.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi! I'd like to order.")}`} target="_blank" rel="noopener noreferrer" className="btn-wa text-base flex items-center gap-2 !px-8 !py-4">
              💬 Order on WhatsApp
            </a>
            <a href="#menu" className="btn-outline text-base flex items-center gap-2 !px-8 !py-4">
              View Menu →
            </a>
          </div>

          <div className="flex gap-8 md:gap-12">
            {[
              { val: "4.5★", label: "Google Rating" },
              { val: "30 min", label: "Fast Delivery" },
              { val: "10%", label: "Direct Savings" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display text-gold text-2xl md:text-3xl">{s.val}</div>
                <div className="text-[11px] text-white/40 tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/20 to-gold/10 animate-pulse-glow" />
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-gold/30">
              <Image src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop&q=85" alt="Pothuraju Biryani" fill className="object-cover" priority />
            </div>
          </div>
          {/* Floating stat cards */}
          <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 animate-float">
            <div className="font-display text-gold text-xl">5L+</div>
            <div className="text-[10px] text-white/50 tracking-wider uppercase">Customers Served</div>
          </div>
          <div className="absolute top-8 -right-4 glass rounded-xl px-4 py-3 animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="font-display text-gold text-xl">25+</div>
            <div className="text-[10px] text-white/50 tracking-wider uppercase">Menu Items</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-white/30 tracking-[4px] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const text = "🔥 Chicken Biryani + Raita + Drink @ just ₹199  |  Order Direct & Save 10%!  |  ";
  return (
    <div className="bg-brand py-3 overflow-hidden">
      <div className="marquee-track animate-marquee">
        {[...Array(6)].map((_, i) => <span key={i} className="text-sm font-medium text-white whitespace-nowrap px-8">{text}</span>)}
      </div>
    </div>
  );
}

/* ─── WHY US ─── */
function WhyUs() {
  const ref = useReveal();
  const features = [
    { img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop&q=80", title: "Authentic Dum", desc: "Slow-cooked over coal in sealed handis. No shortcuts, no pressure cookers." },
    { img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop&q=80", title: "Fresh Daily", desc: "Every ingredient sourced fresh each morning. No frozen meat, no day-old rice." },
    { img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=200&h=200&fit=crop&q=80", title: "25+ Items", desc: "From royal Mutton Dum to fiery Dragon Chicken. Something for every craving." },
    { img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=200&h=200&fit=crop&q=80", title: "30min Delivery", desc: "Kondapur deliveries in under 30 minutes. Hotter than your expectations." },
  ];

  return (
    <section id="about" className="section-pad bg-dark-alt">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[6px] text-gold uppercase">Why Choose Us</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Why <span className="text-gradient">Pothuraju</span>?</h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">Every grain tells a story of tradition, slow-cooked perfection, and the pursuit of flavour.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className={`reveal reveal-delay-${i + 1} group bg-dark/50 border border-white/5 rounded-2xl p-6 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1`}>
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 group-hover:scale-110 transition-transform border-2 border-gold/20">
                <Image src={f.img} alt={f.title} width={64} height={64} className="object-cover w-full h-full" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MENU ITEM CARD ─── */
function MenuCard({ item }: { item: MenuItem }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    cart.add(item.id, item.name, item.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  return (
    <div className="group bg-dark-alt border border-white/5 rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
      <div className="relative h-44 overflow-hidden">
        <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-alt via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.type === "veg" ? <div className="badge-veg"><div className="veg-dot" /></div> : <div className="badge-nv"><div className="nv-dot" /></div>}
          {item.badge === "best" && <span className="badge-best">★ Bestseller</span>}
          {item.badge === "new" && <span className="badge-new">New</span>}
          {item.badge === "hot" && <span className="badge-hot">🌶 Spicy</span>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-1">{item.name}</h3>
        <p className="text-xs text-white/30 mb-3 line-clamp-2">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-white">₹{item.price}</span>
          <button
            onClick={handleAdd}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${added ? "bg-whatsapp text-white scale-110" : "bg-brand/20 text-brand-light border border-brand/30 hover:bg-brand hover:text-white"}`}
          >
            {added ? "✓" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SMART RECOMMENDATIONS ─── */
function SmartRecs() {
  const cart = useCart();
  const allItems = Object.values(MENU).flat();
  const cartIds = Object.keys(cart.items);

  if (cartIds.length === 0) return null;

  // Simple recommendation: if user has biryani, suggest sides; if sides, suggest biryani
  const hasBiryani = cartIds.some(id => id.startsWith("b") || id.startsWith("p"));
  const hasSides = cartIds.some(id => id.startsWith("s"));
  const recs = hasBiryani && !hasSides
    ? MENU.sides.slice(0, 3)
    : !hasBiryani ? MENU.biryani.filter(i => i.badge === "best").slice(0, 3)
    : MENU.chinese.filter(i => i.badge === "best" || i.badge === "hot").slice(0, 3);

  if (recs.length === 0) return null;

  return (
    <div className="mb-10 bg-gradient-to-r from-gold/5 to-brand/5 border border-gold/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🤖</span>
        <span className="text-sm font-semibold text-gold">People also ordered</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {recs.map(item => (
          <div key={item.id} className="flex-shrink-0 flex items-center gap-3 bg-dark/50 border border-white/5 rounded-xl p-3 min-w-[220px]">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.img} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{item.name}</div>
              <div className="text-sm font-display text-gold">₹{item.price}</div>
            </div>
            <button onClick={() => cart.add(item.id, item.name, item.price)} className="w-7 h-7 rounded-lg bg-brand/20 text-brand-light text-sm font-bold flex items-center justify-center hover:bg-brand hover:text-white transition-colors">+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MENU SECTION ─── */
function MenuSection() {
  const [active, setActive] = useState("biryani");
  const ref = useReveal();

  return (
    <section id="menu" className="section-pad bg-dark">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[6px] text-gold uppercase">Our Menu</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Crafted with <span className="text-gradient">Passion</span></h2>
          <p className="text-white/40 mt-4">Tap ADD to build your order. Checkout via WhatsApp or pay online.</p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${active === cat.id ? "bg-brand text-white shadow-lg shadow-brand/30" : "bg-white/5 text-white/60 border border-white/10 hover:border-white/20"}`}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span className={`text-xs ${active === cat.id ? "text-white/70" : "text-white/30"}`}>({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Smart Recommendations */}
        <SmartRecs />

        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MENU[active]?.map(item => <MenuCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── COMBOS ─── */
function CombosSection() {
  const cart = useCart();
  const ref = useReveal();

  return (
    <section id="combos" className="section-pad bg-dark-alt">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[6px] text-gold uppercase">Save More</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Value <span className="text-gradient">Combos</span></h2>
          <p className="text-white/40 mt-4">Maximum flavour, maximum savings. Because great biryani shouldn&apos;t burn your wallet.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMBOS.map((combo, i) => (
            <div key={combo.id} className={`reveal reveal-delay-${i + 1} group relative bg-dark border border-white/5 rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-500 hover:-translate-y-2`}>
              <div className="relative h-48 overflow-hidden">
                <Image src={combo.img} alt={combo.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full">{combo.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-white mb-1">{combo.name}</h3>
                <p className="text-xs text-white/30 mb-4">{combo.items}</p>
                <div className="flex items-end gap-3 mb-3">
                  <span className="font-display text-2xl text-white">₹{combo.price}</span>
                  <span className="text-sm text-white/30 line-through">₹{combo.was}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">SAVE ₹{combo.save}</span>
                </div>
                <div className="flex gap-2">
                  <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi! I want the ${combo.name} @ ₹${combo.price}`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 btn-wa !py-2 text-center text-sm">💬 Order</a>
                  <button onClick={() => cart.add(combo.id, combo.name, combo.price)} className="px-3 py-2 bg-brand/20 text-brand-light border border-brand/30 rounded-full text-sm font-bold hover:bg-brand hover:text-white transition-colors">+ Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ORDER BANNER ─── */
function OrderBanner() {
  const ref = useReveal();
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand-dark to-brand" />
      <div className="absolute inset-0 opacity-10">
        <Image src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&h=400&fit=crop&q=60" alt="Biryani texture background" fill className="object-cover" />
      </div>
      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6">
          <span className="text-gold font-display text-lg">5,00,000+</span>
          <span className="text-white/80 text-sm font-medium">Customers Served in 7 Months</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-white mb-6">Order Direct &amp; Save <span className="text-gold">10%</span></h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {["No App Commission", "10% Cheaper", "Faster Delivery", "Direct Support"].map(t => (
            <div key={t} className="flex items-center gap-2 text-sm text-white/80">
              <span className="text-whatsapp">✓</span> {t}
            </div>
          ))}
        </div>
        <a href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi! I want to place a direct order.")}`} target="_blank" rel="noopener noreferrer" className="btn-wa !px-10 !py-4 text-lg inline-flex items-center gap-2">
          💬 Order on WhatsApp Now
        </a>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function ReviewsSection() {
  const ref = useReveal();
  return (
    <section id="reviews" className="section-pad bg-dark">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[6px] text-gold uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">What Customers <span className="text-gradient">Say</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1} bg-dark-alt border border-white/5 rounded-2xl p-6 hover:border-gold/20 transition-all duration-500`}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.rating)].map((_, j) => <span key={j} className="text-gold text-sm">★</span>)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-gold flex items-center justify-center text-xs font-bold text-white">{r.avatar}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-white/30">{r.source} Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
function Stats() {
  const ref = useReveal();
  return (
    <section className="py-16 bg-dark-alt border-y border-white/5">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { end: 500000, suffix: "+", label: "Customers Served" },
          { end: 7, suffix: " Months", label: "Since Launch" },
          { end: 25, suffix: "+", label: "Menu Items" },
          { end: 30, suffix: " min", label: "Avg Delivery" },
        ].map(s => (
          <div key={s.label}>
            <div className="font-display text-3xl md:text-4xl text-gold"><Counter end={s.end} suffix={s.suffix} /></div>
            <div className="text-xs text-white/40 tracking-widest uppercase mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── LOCATION ─── */
function LocationSection() {
  const ref = useReveal();
  return (
    <section id="location" className="section-pad bg-dark">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[6px] text-gold uppercase">Visit Us</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Find <span className="text-gradient">Us</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden border border-white/10 h-80 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.3528!3d17.4611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI3JzQwLjAiTiA3OMKwMjEnMTAuMSJF!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%" style={{ border: 0, minHeight: 320 }} allowFullScreen loading="lazy"
            />
          </div>

          <div className="bg-dark-alt border border-white/5 rounded-2xl p-8">
            <h3 className="font-display text-2xl text-gold mb-6">Pothuraju Biryani</h3>
            {[
              { icon: "📍", label: "Address", value: "Plot 182C/211C, PR Residency, Raghavendra Colony, Circle 20, Kondapur, Hyderabad 500084" },
              { icon: "📞", label: "Phone / WhatsApp", value: "96400 34646", link: `tel:+${PHONE}` },
              { icon: "🕐", label: "Hours", value: "Open Daily: 11:00 AM – 12:00 AM" },
              { icon: "🍽️", label: "Service", value: "Dine-in · Takeaway · Delivery" },
            ].map(r => (
              <div key={r.label} className="flex gap-4 mb-5">
                <span className="text-xl">{r.icon}</span>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{r.label}</div>
                  {r.link ? <a href={r.link} className="text-brand-light font-semibold hover:text-brand transition-colors">{r.value}</a> : <div className="text-white/70 text-sm">{r.value}</div>}
                </div>
              </div>
            ))}
            <div className="flex gap-3 mt-6">
              <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/50">★ Also on Swiggy</span>
              <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/50">★ Also on Zomato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
function Gallery() {
  const ref = useReveal();
  const images = [
    { src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop&q=80", alt: "Signature Dum Biryani", span: "col-span-2 row-span-2" },
    { src: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=400&fit=crop&q=80", alt: "Biryani Handi", span: "" },
    { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop&q=80", alt: "Authentic Preparation", span: "" },
    { src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80", alt: "Fresh Ingredients", span: "" },
    { src: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&h=400&fit=crop&q=80", alt: "Kebabs & Starters", span: "" },
    { src: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop&q=80", alt: "Naan & Breads", span: "col-span-2" },
    { src: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=400&fit=crop&q=80", alt: "Delivery Ready", span: "" },
    { src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop&q=80", alt: "Spices & Flavour", span: "" },
  ];

  return (
    <section id="gallery" className="section-pad bg-dark-alt">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[6px] text-gold uppercase">Gallery</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Pothuraju <span className="text-gradient">Gallery</span></h2>
          <p className="text-white/40 mt-4">A feast for the eyes before the feast for the soul.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {images.map((img, i) => (
            <div key={i} className={`${img.span} group relative rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-dark-alt border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-display text-2xl text-gold mb-2">Pothuraju Biryani</div>
            <div className="text-xs text-white/30 tracking-widest uppercase mb-4">The Dum God of Biryani</div>
            <p className="text-sm text-white/40 leading-relaxed">Authentic Hyderabadi dum biryani in Kondapur. Slow-cooked over coal, served with love. Order direct and save.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {["About", "Menu", "Combos", "Reviews", "Gallery", "Location"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/40 hover:text-gold transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Order Now</h4>
            <div className="flex flex-col gap-2.5">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-whatsapp transition-colors">💬 WhatsApp</a>
              <a href={`tel:+${PHONE}`} className="text-sm text-white/40 hover:text-gold transition-colors">📞 Call: 96400 34646</a>
              <span className="text-sm text-white/40">🛵 Swiggy</span>
              <span className="text-sm text-white/40">🛵 Zomato</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-xs text-white/20">
          © 2026 Pothuraju Biryani. All rights reserved. | Kondapur, Hyderabad | Built with ❤️
        </div>
      </div>
    </footer>
  );
}

/* ─── CART PANEL ─── */
function CartPanel() {
  const cart = useCart();
  const entries = Object.values(cart.items);

  const waCheckout = () => {
    if (entries.length === 0) return;
    let msg = "Hi! I want to order:\n";
    entries.forEach(i => { msg += `\n${i.qty}x ${i.name} (₹${i.price * i.qty})`; });
    msg += `\n\nTotal: ₹${cart.total}`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {cart.isOpen && <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={cart.close} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-alt border-l border-white/10 z-50 transition-transform duration-500 ease-out ${cart.isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h3 className="font-display text-xl text-white">Your Order</h3>
            <button onClick={cart.close} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-5xl mb-4">🍽️</span>
                <p className="text-white/40">Your cart is empty</p>
                <p className="text-xs text-white/20 mt-1">Add items from our menu to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-dark/50 border border-white/5 rounded-xl p-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">{item.name}</div>
                      <div className="text-sm text-gold font-display">₹{item.price * item.qty}</div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg">
                      <button onClick={() => cart.updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white font-bold">−</button>
                      <span className="text-sm font-bold text-white w-6 text-center">{item.qty}</span>
                      <button onClick={() => cart.updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {entries.length > 0 && (
            <div className="border-t border-white/10 p-5 space-y-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/50">Total</span>
                <span className="font-display text-2xl text-white">₹{cart.total}</span>
              </div>
              <button onClick={waCheckout} className="w-full btn-wa !py-3.5 text-center flex items-center justify-center gap-2">
                💬 Checkout on WhatsApp
              </button>
              <button className="w-full btn-primary !py-3.5 text-center flex items-center justify-center gap-2 opacity-60 cursor-not-allowed" title="Coming soon">
                💳 Pay Online (Coming Soon)
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── CHATBOT ─── */
function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({ name: "", guests: "", date: "", time: "", request: "" });
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "bot", text: "Hey there! 👋 Welcome to Pothuraju Biryani! I can help you with:" },
    { from: "bot", text: "1️⃣ Book a Table\n2️⃣ Order on WhatsApp\n3️⃣ View Menu\n4️⃣ Talk to Us" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const addMsg = (from: string, text: string) => setMessages(prev => [...prev, { from, text }]);

  const handleSend = () => {
    if (!input.trim()) return;
    const val = input.trim();
    addMsg("user", val);
    setInput("");

    if (step === 0) {
      if (val === "1" || val.toLowerCase().includes("book") || val.toLowerCase().includes("table")) {
        setTimeout(() => { addMsg("bot", "Awesome! Let's book a table. 🍽️\n\nWhat's your name?"); setStep(1); }, 400);
      } else if (val === "2" || val.toLowerCase().includes("order") || val.toLowerCase().includes("whatsapp")) {
        setTimeout(() => { addMsg("bot", "Taking you to WhatsApp for ordering! 🛵"); window.open(`${WHATSAPP_URL}?text=${encodeURIComponent("Hi! I want to place an order.")}`, "_blank"); }, 400);
      } else if (val === "3" || val.toLowerCase().includes("menu")) {
        setTimeout(() => { addMsg("bot", "Check out our full menu! 👇"); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); setIsOpen(false); }, 400);
      } else if (val === "4" || val.toLowerCase().includes("talk") || val.toLowerCase().includes("call")) {
        setTimeout(() => { addMsg("bot", "Call us at 96400 34646 or WhatsApp us! 📞"); window.open(`tel:+91${PHONE}`); }, 400);
      } else {
        setTimeout(() => addMsg("bot", "Please pick an option:\n1️⃣ Book a Table\n2️⃣ Order on WhatsApp\n3️⃣ View Menu\n4️⃣ Talk to Us"), 400);
      }
    } else if (step === 1) {
      setBooking(b => ({ ...b, name: val }));
      setTimeout(() => { addMsg("bot", `Nice to meet you, ${val}! 😊\n\nHow many guests?`); setStep(2); }, 400);
    } else if (step === 2) {
      setBooking(b => ({ ...b, guests: val }));
      setTimeout(() => { addMsg("bot", "Great! What date? (e.g., Today, Tomorrow, 5th May)"); setStep(3); }, 400);
    } else if (step === 3) {
      setBooking(b => ({ ...b, date: val }));
      setTimeout(() => { addMsg("bot", "Perfect! What time? (e.g., 7:00 PM, 8:30 PM)"); setStep(4); }, 400);
    } else if (step === 4) {
      setBooking(b => ({ ...b, time: val }));
      setTimeout(() => { addMsg("bot", "Any special requests? (Type 'none' if nothing special)"); setStep(5); }, 400);
    } else if (step === 5) {
      const req = val.toLowerCase() === "none" ? "" : val;
      const final = { ...booking, request: req, time: booking.time || val };
      setBooking(final);
      const msg = `Hi! I'd like to book a table:\n\n👤 Name: ${final.name}\n👥 Guests: ${final.guests}\n📅 Date: ${final.date}\n🕐 Time: ${final.time}${req ? `\n📝 Request: ${req}` : ""}`;
      setTimeout(() => {
        addMsg("bot", `Here's your booking:\n\n👤 ${final.name}\n👥 ${final.guests} guests\n📅 ${final.date}\n🕐 ${final.time}${req ? `\n📝 ${req}` : ""}\n\nConfirming via WhatsApp... ✅`);
        setTimeout(() => window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, "_blank"), 1500);
        setStep(0);
        setBooking({ name: "", guests: "", date: "", time: "", request: "" });
      }, 400);
    }
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* WhatsApp Book Button */}
        <a href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi! I'd like to book a table.")}`} target="_blank" className="flex items-center gap-2 bg-whatsapp text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-whatsapp/30 hover:scale-105 transition-transform group">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span className="text-sm font-bold">Book Table</span>
        </a>
        {/* Chat Bot Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${isOpen ? "bg-white/20 text-white rotate-45 scale-110" : "bg-brand text-white hover:scale-110 shadow-brand/30"}`}>
          {isOpen ? "✕" : "🤖"}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] bg-dark-alt border border-white/10 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand to-brand-dark px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
            <div>
              <div className="text-sm font-bold text-white">Pothuraju Bot</div>
              <div className="text-[10px] text-white/60 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-whatsapp inline-block" /> Online</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-[260px] max-h-[320px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${m.from === "user" ? "bg-brand text-white rounded-br-sm" : "bg-white/5 text-white/80 border border-white/5 rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-2.5 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder={step === 0 ? "Type 1, 2, 3, or 4..." : "Type your answer..."}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-gold/40"
            />
            <button onClick={handleSend} className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center text-white hover:bg-brand-light transition-colors text-sm font-bold">→</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  useEffect(() => {
    // Intersection observer for .reveal elements
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <Marquee />
      <WhyUs />
      <MenuSection />
      <CombosSection />
      <Stats />
      <OrderBanner />
      <ReviewsSection />
      <LocationSection />
      <Gallery />
      <Footer />
      <CartPanel />
      <ChatBot />
    </CartProvider>
  );
}
