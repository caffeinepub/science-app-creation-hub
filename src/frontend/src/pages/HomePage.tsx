import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Car,
  ChevronRight,
  Clock,
  Dumbbell,
  Gamepad2,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  Utensils,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  {
    icon: ShoppingBag,
    label: "Fashion",
    count: "45+ Stores",
    color: "from-rose-900/40 to-rose-800/20",
  },
  {
    icon: Utensils,
    label: "Food Court",
    count: "30+ Outlets",
    color: "from-amber-900/40 to-amber-800/20",
  },
  {
    icon: Smartphone,
    label: "Electronics",
    count: "20+ Stores",
    color: "from-blue-900/40 to-blue-800/20",
  },
  {
    icon: Sparkles,
    label: "Beauty & Wellness",
    count: "25+ Stores",
    color: "from-purple-900/40 to-purple-800/20",
  },
  {
    icon: Dumbbell,
    label: "Sports",
    count: "15+ Stores",
    color: "from-green-900/40 to-green-800/20",
  },
  {
    icon: Gamepad2,
    label: "Entertainment",
    count: "10+ Zones",
    color: "from-indigo-900/40 to-indigo-800/20",
  },
];

const PROMOTIONS = [
  {
    badge: "Flash Sale",
    title: "50% Off at Luxe Fashion Hub",
    desc: "Designer wear at half price — this weekend only. Selected items from top international brands.",
    expires: "Ends Sunday",
    img: "/assets/generated/store-fashion.dim_600x400.jpg",
  },
  {
    badge: "Buy 1 Get 1",
    title: "Double Delight at Grand Bistro",
    desc: "Buy any main course and get a second one free. Valid all day, every day this month.",
    expires: "Ends Oct 31",
    img: "/assets/generated/store-food.dim_600x400.jpg",
  },
  {
    badge: "Mega Deal",
    title: "Tech Bonanza — Up to 40% Off",
    desc: "Latest smartphones, laptops, and accessories at unbeatable prices from TechWorld.",
    expires: "While stocks last",
    img: "/assets/generated/store-electronics.dim_600x400.jpg",
  },
];

const EVENTS = [
  {
    date: { day: "18", month: "Oct" },
    title: "Grand Weekend Sale",
    desc: "Three days of incredible deals across 200+ stores. The biggest sale of the year.",
    tag: "Sale",
  },
  {
    date: { day: "25", month: "Oct" },
    title: "Kids Fun Day",
    desc: "Magic shows, face painting, balloon art, and complimentary ice cream for children under 12.",
    tag: "Family",
  },
  {
    date: { day: "01", month: "Nov" },
    title: "International Food Festival",
    desc: "A week-long celebration of global cuisines, live cooking demos, and tasting sessions.",
    tag: "Food",
  },
  {
    date: { day: "10", month: "Nov" },
    title: "Fashion Week Showcase",
    desc: "Live runway shows featuring collections from our top fashion brands on the Grand Atrium stage.",
    tag: "Fashion",
  },
];

const STATS = [
  { value: "200+", label: "Stores" },
  { value: "5", label: "Floors" },
  { value: "7", label: "Days Open" },
  { value: "Free", label: "Parking" },
];

const FAQS = [
  {
    q: "What are the mall's opening hours?",
    a: "Grand Plaza Mall is open Monday to Friday from 10am to 10pm, and Saturday to Sunday from 10am to 11pm. On public holidays we may have special extended hours — check our Events page for updates.",
  },
  {
    q: "Is parking available and is it free?",
    a: "Yes! We offer 3,000+ free parking spaces across two basement levels and a multi-storey car park. Electric vehicle charging stations are available on Level B2.",
  },
  {
    q: "How do I find a specific store?",
    a: "Visit our Stores page to search by name or browse by category. Interactive digital directories are also located at every entrance and on each floor.",
  },
  {
    q: "Is there a concierge or information desk?",
    a: "Our concierge desk is located at the Main Entrance on Ground Floor, open daily from 10am to 9pm. Our friendly staff can assist with gift wrapping, lost & found, and general enquiries.",
  },
  {
    q: "Are pets allowed in the mall?",
    a: "We welcome well-behaved pets on leashes in our outdoor areas and the ground floor common areas. However, pets are not permitted inside individual stores unless they are service animals.",
  },
  {
    q: "Is the mall wheelchair accessible?",
    a: "Absolutely. Grand Plaza is fully accessible with dedicated parking bays, ramps, wide corridors, and lifts on every floor. Wheelchair rentals are available at the concierge desk.",
  },
  {
    q: "Do you offer a loyalty programme?",
    a: "Yes — sign in with your account to earn Grand Points on every purchase across participating stores. Points can be redeemed for vouchers, free parking, and exclusive member offers.",
  },
  {
    q: "How can I stay updated on sales and events?",
    a: "Subscribe to our newsletter below or follow us on social media. You can also check the Promotions and Events pages on this website for the latest deals.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed! Welcome to the Grand Plaza family.");
    setEmail("");
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-mall.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-primary/20 text-gold border-gold-dim px-3 py-1 text-xs uppercase tracking-widest">
              Now Open 7 Days
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Welcome to</span>
              <br />
              <span className="text-gradient-gold">Grand Plaza</span>
              <br />
              <span className="text-foreground">Mall</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Over 200 world-class stores, gourmet dining, and premier
              entertainment — all in the heart of the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/stores">
                <Button
                  size="lg"
                  className="gradient-gold text-primary-foreground font-semibold shadow-gold px-8 hover:opacity-90 transition-opacity"
                  data-ocid="hero.primary_button"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Explore Stores
                </Button>
              </Link>
              <Link to="/promotions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold-dim text-gold hover:bg-gold/10 px-8"
                  data-ocid="hero.secondary_button"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  View Deals
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy-deep border-y border-gold-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-2">
            Shop By Category
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Discover Our Stores
          </h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.label} variants={itemVariants}>
              <Link to="/stores" data-ocid={`categories.item.${i + 1}`}>
                <div
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.color} border border-gold-dim hover:border-gold hover:shadow-gold transition-all duration-300 group p-6 cursor-pointer`}
                >
                  <cat.icon className="w-8 h-8 text-gold mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-foreground text-base">
                    {cat.label}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {cat.count}
                  </p>
                  <ChevronRight className="absolute bottom-4 right-4 w-4 h-4 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Promotions */}
      <section className="bg-navy-deep border-y border-gold-dim py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <p className="text-gold text-sm uppercase tracking-widest mb-2">
                Exclusive Deals
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Featured Promotions
              </h2>
            </div>
            <Link to="/promotions">
              <Button
                variant="outline"
                className="border-gold-dim text-gold hover:bg-gold/10"
                data-ocid="promotions.link"
              >
                All Deals <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PROMOTIONS.map((promo, i) => (
              <motion.div
                key={promo.title}
                variants={itemVariants}
                data-ocid={`promotions.item.${i + 1}`}
              >
                <div className="bg-card border border-gold-dim rounded-xl overflow-hidden hover:border-gold hover:shadow-gold transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={promo.img}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-gold text-primary-foreground font-semibold text-xs">
                      {promo.badge}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground text-base mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {promo.desc}
                    </p>
                    <div className="flex items-center gap-1 text-gold text-xs">
                      <Clock className="w-3 h-3" />
                      {promo.expires}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <p className="text-gold text-sm uppercase tracking-widest mb-2">
              What's On
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Upcoming Events
            </h2>
          </div>
          <Link to="/events">
            <Button
              variant="outline"
              className="border-gold-dim text-gold hover:bg-gold/10"
              data-ocid="events.link"
            >
              All Events <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              variants={itemVariants}
              data-ocid={`events.item.${i + 1}`}
            >
              <div className="bg-card border border-gold-dim rounded-xl p-5 hover:border-gold hover:shadow-gold transition-all duration-300 flex gap-5">
                <div className="flex-shrink-0 w-14 text-center">
                  <div className="bg-primary/20 rounded-lg px-2 py-2">
                    <div className="font-display text-2xl font-bold text-gold leading-none">
                      {event.date.day}
                    </div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
                      {event.date.month}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">
                      {event.title}
                    </h3>
                    <Badge className="bg-secondary text-muted-foreground border-border text-xs shrink-0">
                      {event.tag}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mall Info */}
      <section className="bg-navy-deep border-y border-gold-dim py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-gold text-sm uppercase tracking-widest mb-2">
              Plan Your Visit
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Mall Information
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-gold-dim rounded-xl p-6"
            >
              <Clock className="w-6 h-6 text-gold mb-3" />
              <h3 className="font-semibold text-foreground mb-3">
                Opening Hours
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="text-foreground">10:00 – 22:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sat – Sun</span>
                  <span className="text-foreground">10:00 – 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Public Holidays</span>
                  <span className="text-gold">Check Events</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-gold-dim rounded-xl p-6"
            >
              <MapPin className="w-6 h-6 text-gold mb-3" />
              <h3 className="font-semibold text-foreground mb-3">Location</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                1 Grand Plaza Avenue
                <br />
                City Centre, Downtown
                <br />
                <span className="text-gold mt-1 block">
                  5 min from Central Station
                </span>
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-gold-dim rounded-xl p-6"
            >
              <Car className="w-6 h-6 text-gold mb-3" />
              <h3 className="font-semibold text-foreground mb-3">Parking</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>3,000+ parking spaces</li>
                <li>Free for first 3 hours</li>
                <li>EV charging on Level B2</li>
                <li className="text-gold">Valet available at Main Entrance</li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 bg-card border border-gold-dim rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 justify-between"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Customer Hotline
                </p>
                <p className="text-muted-foreground text-sm">
                  +1 (800) GRAND-PLZ — Available 9am to 9pm daily
                </p>
              </div>
            </div>
            <Button
              className="gradient-gold text-primary-foreground font-semibold shrink-0"
              data-ocid="info.primary_button"
            >
              Get Directions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-gold-dim bg-card p-10 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="relative z-10">
            <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get first access to exclusive promotions, event announcements, and
              new store openings.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-gold-dim focus:border-gold flex-1"
                data-ocid="newsletter.input"
                required
              />
              <Button
                type="submit"
                className="gradient-gold text-primary-foreground font-semibold shadow-gold-sm hover:opacity-90"
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-2">
            Got Questions?
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="bg-card border border-gold-dim rounded-xl px-5 data-[state=open]:border-gold"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="text-foreground font-medium text-sm hover:no-underline hover:text-gold py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
}
