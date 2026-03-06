import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Loader2,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  Phone,
  Shield,
  Star,
  Users,
  Wrench,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  type Variants,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ── smooth scroll helper ─────────────────────────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ── fade-in wrapper ──────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── stagger container ────────────────────────────────────── */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

/* ── Navbar ───────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", id: "home", ocid: "nav.home_link" },
    { label: "About", id: "about", ocid: "nav.about_link" },
    { label: "Products", id: "products", ocid: "nav.products_link" },
    { label: "Services", id: "services", ocid: "nav.services_link" },
    { label: "Why Us", id: "why-us", ocid: "nav.why_us_link" },
    { label: "Contact", id: "contact", ocid: "nav.contact_link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_2px_30px_oklch(0_0_0/0.4)] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex-shrink-0"
        >
          <img
            src="/assets/generated/logo-transparent.dim_300x80.png"
            alt="India Rock Splitter"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                data-ocid={l.ocid}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex">
          <Button
            data-ocid="nav.cta_button"
            onClick={() => scrollTo("contact")}
            className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 px-6"
          >
            Get a Quote
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  type="button"
                  key={l.id}
                  data-ocid={l.ocid}
                  onClick={() => {
                    scrollTo(l.id);
                    setOpen(false);
                  }}
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Button
                data-ocid="nav.cta_button"
                onClick={() => {
                  scrollTo("contact");
                  setOpen(false);
                }}
                className="mt-2 bg-primary text-primary-foreground font-semibold"
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-rock-splitter.dim_1200x600.jpg"
          alt="Hydraulic Rock Splitter in action"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        {/* Geometric accent */}
        <div
          className="absolute bottom-0 right-0 w-1/2 h-full"
          style={{
            background:
              "linear-gradient(225deg, oklch(0.72 0.19 55 / 0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">
              <Shield className="h-3.5 w-3.5" />
              Trusted Manufacturer Since 2014
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-4"
          >
            India Rock
            <span className="block text-gradient-orange">Splitter</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="font-display text-xl sm:text-2xl font-semibold text-foreground/80 mb-5"
          >
            Precision Hydraulic Rock Splitting Solutions
          </motion.p>

          {/* Body */}
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg text-foreground/65 leading-relaxed max-w-xl mb-10"
          >
            Leading manufacturer of high-performance hydraulic rock splitters
            for construction, mining, and demolition. Engineered for maximum
            force, built to last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              onClick={() => scrollTo("products")}
              className="bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 px-8 py-6 shadow-[0_0_40px_oklch(0.72_0.19_55/0.35)]"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              onClick={() => scrollTo("contact")}
              className="border-foreground/30 text-foreground hover:bg-white/10 hover:border-foreground/60 font-bold text-base px-8 py-6 bg-transparent"
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 flex flex-wrap gap-3"
        >
          {[
            "500+ Projects",
            "100+ Clients",
            "Pan-India Service",
            "10+ Years",
          ].map((stat) => (
            <span
              key={stat}
              className="px-4 py-2 rounded-full bg-white/8 backdrop-blur-sm border border-white/15 text-sm font-semibold text-foreground/80"
            >
              {stat}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-foreground/40 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-0.5 h-6 bg-gradient-to-b from-primary to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────── */
function About() {
  const stats = [
    { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
    { value: "100+", label: "Satisfied Clients", icon: Users },
    { value: "10+", label: "Years Experience", icon: Star },
    { value: "Pan-India", label: "Service Network", icon: MapPinned },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-background noise-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <FadeIn>
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3 block">
                About Us
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                Trusted Experts in{" "}
                <span className="text-gradient-orange">Rock Splitting</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                India Rock Splitter is a trusted manufacturer of Hydraulic Rock
                Splitters with years of expertise in rock breaking solutions. We
                serve construction, mining, quarrying, and demolition industries
                across India.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Our products are built to deliver maximum performance,
                durability, and safety. Every machine is precision-engineered
                and rigorously tested before delivery, ensuring our clients
                receive only the best.
              </p>
              <Button
                onClick={() => scrollTo("contact")}
                className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
              >
                Talk to Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="stat-card rounded-xl p-6">
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <div className="font-display text-3xl font-extrabold text-foreground mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Products ─────────────────────────────────────────────── */
function Products() {
  const products = [
    {
      name: "Standard Hydraulic Rock Splitter",
      tag: "Most Popular",
      description:
        "Ideal for medium-duty rock breaking in construction and quarrying. High splitting force, easy operation, and robust design for everyday use.",
      specs: ["Up to 500 Ton Force", "60–120mm Drill Hole", "Manual Control"],
    },
    {
      name: "Heavy-Duty Hydraulic Rock Splitter",
      tag: "Industrial Grade",
      description:
        "Designed for demanding applications in mining and large-scale demolition. Maximum splitting force with a robust build that handles the toughest conditions.",
      specs: ["Up to 1000 Ton Force", "90–150mm Drill Hole", "Remote Control"],
    },
    {
      name: "Compact Hydraulic Rock Splitter",
      tag: "Portable",
      description:
        "Perfect for confined spaces and precise rock breaking. Lightweight, portable, and powerful — ideal for urban construction and utility work.",
      specs: ["Up to 300 Ton Force", "38–65mm Drill Hole", "Battery Operated"],
    },
  ];

  return (
    <section id="products" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3 block">
              Our Products
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
              Engineered for{" "}
              <span className="text-gradient-orange">Peak Performance</span>
            </h2>
          </div>
        </FadeIn>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              variants={staggerItem}
              data-ocid={`products.item.${i + 1}`}
              className="card-industrial rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_oklch(0.72_0.19_55/0.15)] flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src="/assets/generated/product-hydraulic-splitter.dim_600x400.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-md">
                  {product.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-foreground mb-3 leading-tight">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>

                {/* Specs */}
                <ul className="space-y-1.5 mb-6">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-xs text-foreground/70"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <Button
                  data-ocid={`products.quote_button.${i + 1}`}
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-primary/15 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/40 hover:border-primary font-semibold transition-all duration-200"
                  variant="ghost"
                >
                  Get Quote
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      title: "Manufacturing",
      description:
        "We manufacture top-quality hydraulic rock splitters tailored to your specific requirements. Every unit is precision-built and quality-tested for reliable field performance.",
      image: "/assets/generated/product-hydraulic-splitter.dim_600x400.jpg",
      icon: "⚙️",
    },
    {
      title: "Repairing",
      description:
        "Expert repair and maintenance services to keep your equipment performing at peak efficiency. Our skilled technicians handle all makes and models with fast turnaround.",
      image: "/assets/generated/service-repair.dim_600x400.jpg",
      icon: "🔧",
    },
    {
      title: "Hiring / Rental",
      description:
        "Flexible hiring solutions — get the right equipment for your project without long-term commitment. Short-term and long-term rental options available across India.",
      image: "/assets/generated/service-hiring.dim_600x400.jpg",
      icon: "🏗️",
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3 block">
              Our Services
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
              Complete{" "}
              <span className="text-gradient-orange">
                Rock Splitting Solutions
              </span>
            </h2>
          </div>
        </FadeIn>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              data-ocid={`services.item.${i + 1}`}
              className="card-industrial rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_oklch(0.72_0.19_55/0.15)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <span className="absolute bottom-4 left-4 text-3xl">
                  {service.icon}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Why Choose Us ────────────────────────────────────────── */
function WhyUs() {
  const features = [
    {
      icon: Star,
      title: "Premium Quality",
      description:
        "Manufactured using the finest materials and precision engineering. ISO-compliant processes ensure consistent, reliable performance.",
    },
    {
      icon: Wrench,
      title: "Expert Team",
      description:
        "Skilled engineers with years of hands-on experience in hydraulic equipment design, manufacturing, and field service.",
    },
    {
      icon: MapPin,
      title: "Pan-India Service",
      description:
        "Comprehensive service network covering all major states across India, ensuring fast support wherever you operate.",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description:
        "Competitive pricing without compromising on quality. Transparent quotes with no hidden costs.",
    },
  ];

  return (
    <section
      id="why-us"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.012 250) 0%, oklch(0.13 0.008 250) 100%)",
      }}
    >
      {/* BG accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.72 0.19 55 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3 block">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
              Why Choose{" "}
              <span className="text-gradient-orange">India Rock Splitter?</span>
            </h2>
          </div>
        </FadeIn>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="card-industrial rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.72_0.19_55/0.12)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Contact Form ─────────────────────────────────────────── */
function Contact() {
  const { actor } = useActor();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const id = crypto.randomUUID();
      await actor.submitInquiry(
        id,
        form.name,
        form.email,
        form.phone,
        form.message,
        form.serviceType || "General Inquiry",
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", serviceType: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@indiarocksplitter.com",
      href: "mailto:info@indiarocksplitter.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "India — Pan-India Service Coverage",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3 block">
              Contact Us
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
              Get in <span className="text-gradient-orange">Touch</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Have a project in mind? Need a quote or more information? We'd
              love to hear from you.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact info */}
          <FadeIn className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 p-5 card-industrial rounded-xl hover:border-primary/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors mt-0.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {value}
                    </div>
                  </div>
                </a>
              ))}

              {/* Why reach out */}
              <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
                <h4 className="font-display font-bold text-foreground mb-2 text-sm">
                  We respond within 24 hours
                </h4>
                <p className="text-muted-foreground text-sm">
                  Whether you need a product quote, rental arrangement, or
                  repair assistance — our team is ready to help.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="card-industrial rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    data-ocid="contact.name_input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Email Address <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-ocid="contact.email_input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    data-ocid="contact.phone_input"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                {/* Service type */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground/80">
                    Service Type
                  </Label>
                  <Select
                    value={form.serviceType}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, serviceType: v }))
                    }
                  >
                    <SelectTrigger
                      data-ocid="contact.service_select"
                      className="bg-background border-border focus:border-primary"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Inquiry">
                        General Inquiry
                      </SelectItem>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="Repairing">Repairing</SelectItem>
                      <SelectItem value="Hiring">Hiring / Rental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-semibold text-foreground/80"
                >
                  Message <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="message"
                  data-ocid="contact.message_textarea"
                  placeholder="Tell us about your project or inquiry..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  required
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              {/* Success / Error states */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    data-ocid="contact.success_state"
                    className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">
                        Inquiry Sent Successfully!
                      </p>
                      <p className="text-xs text-green-400/70 mt-0.5">
                        Our team will get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    data-ocid="contact.error_state"
                    className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">
                        Something went wrong
                      </p>
                      <p className="text-xs opacity-70 mt-0.5">
                        Please try again or reach us directly by phone.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground font-bold py-6 text-base hover:bg-primary/90 shadow-[0_0_30px_oklch(0.72_0.19_55/0.25)]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/assets/generated/logo-transparent.dim_300x80.png"
              alt="India Rock Splitter"
              className="h-10 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Leading manufacturer of precision hydraulic rock splitters for
              construction, mining, and demolition across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                ["Home", "home"],
                ["About Us", "about"],
                ["Products", "products"],
                ["Services", "services"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                info@indiarocksplitter.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                Pan-India Service
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} India Rock Splitter. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ──────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
