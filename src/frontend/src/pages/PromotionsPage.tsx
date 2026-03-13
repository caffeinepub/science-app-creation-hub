import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Gift, Percent, Star, Tag, Zap } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const PROMOTIONS = [
  {
    id: 1,
    badge: "Flash Sale",
    badgeColor: "bg-red-900/40 text-red-300 border-red-700/40",
    icon: Zap,
    title: "50% Off at Luxe Fashion Hub",
    store: "Luxe Fashion Hub — Floor 1",
    desc: "Designer wear at half price — this weekend only. Selected items from top international brands. Includes formal wear, casual collections, and accessories.",
    expires: "Ends this Sunday",
    code: "LUXE50",
    img: "/assets/generated/store-fashion.dim_600x400.jpg",
    hot: true,
  },
  {
    id: 2,
    badge: "Buy 1 Get 1",
    badgeColor: "bg-amber-900/40 text-amber-300 border-amber-700/40",
    icon: Gift,
    title: "Double Delight at Grand Bistro",
    store: "Grand Bistro — Food Court",
    desc: "Buy any main course and get a second one free. Valid all day, every day this month. Dine in or takeaway.",
    expires: "Ends Oct 31",
    code: "BOGO2024",
    img: "/assets/generated/store-food.dim_600x400.jpg",
    hot: true,
  },
  {
    id: 3,
    badge: "Mega Deal",
    badgeColor: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    icon: Percent,
    title: "Tech Bonanza — Up to 40% Off",
    store: "TechWorld — Floor 3",
    desc: "Latest smartphones, laptops, and accessories at unbeatable prices. Trade-in old devices for additional discounts.",
    expires: "While stocks last",
    code: "TECH40",
    img: "/assets/generated/store-electronics.dim_600x400.jpg",
    hot: false,
  },
  {
    id: 4,
    badge: "Members Only",
    badgeColor: "bg-purple-900/40 text-purple-300 border-purple-700/40",
    icon: Star,
    title: "VIP Beauty Treatment Package",
    store: "Glow Beauty Spa — Floor 4",
    desc: "Exclusive for loyalty members: full facial, massage, and wellness consultation at a special bundled rate. Book via the concierge.",
    expires: "Ends Nov 15",
    code: "VIPGLOW",
    img: "/assets/generated/store-fashion.dim_600x400.jpg",
    hot: false,
  },
  {
    id: 5,
    badge: "New Store",
    badgeColor: "bg-green-900/40 text-green-300 border-green-700/40",
    icon: Tag,
    title: "20% Off All at Running Republic",
    store: "Running Republic — Floor 4",
    desc: "Celebrate the grand opening of Running Republic. Get 20% off all footwear and athletic wear this opening fortnight.",
    expires: "Ends Oct 25",
    code: "NEWRUN20",
    img: "/assets/generated/store-electronics.dim_600x400.jpg",
    hot: false,
  },
  {
    id: 6,
    badge: "Family Deal",
    badgeColor: "bg-orange-900/40 text-orange-300 border-orange-700/40",
    icon: Gift,
    title: "Family Cinema Bundle at Cineplex",
    store: "Cineplex Premiere — Floor 5",
    desc: "4 tickets + 2 large popcorns + 4 drinks for the price of 3 tickets. Valid on all screening times, all days.",
    expires: "Ongoing",
    code: "FAMILY4",
    img: "/assets/generated/store-food.dim_600x400.jpg",
    hot: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PromotionsPage() {
  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      toast.success(`Code "${code}" copied to clipboard!`);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-gold text-sm uppercase tracking-widest mb-2">
          Exclusive Offers
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Promotions & Deals
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Discover incredible offers across all our stores. Flash sales, loyalty
          rewards, and family bundles — updated weekly.
        </p>
      </motion.div>

      {/* Hot Deals Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-gradient-to-r from-amber-900/30 via-card to-amber-900/30 border border-gold-dim rounded-xl p-5 mb-10 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Hot Deals This Week
          </p>
          <p className="text-muted-foreground text-sm">
            2 flash sales active right now. Don't miss out — limited time only.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PROMOTIONS.map((promo, i) => (
          <motion.div
            key={promo.id}
            variants={itemVariants}
            data-ocid={`promotions.item.${i + 1}`}
          >
            <div className="bg-card border border-gold-dim rounded-xl overflow-hidden hover:border-gold hover:shadow-gold transition-all duration-300 group h-full flex flex-col">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={promo.img}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={`text-xs border ${promo.badgeColor}`}>
                    {promo.badge}
                  </Badge>
                  {promo.hot && (
                    <Badge className="bg-red-500/80 text-white border-transparent text-xs">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {promo.title}
                </h3>
                <p className="text-gold text-xs mb-2">{promo.store}</p>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4">
                  {promo.desc}
                </p>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-4">
                  <Clock className="w-3 h-3" />
                  {promo.expires}
                </div>
                {/* Promo Code */}
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-2 border border-gold-dim">
                  <Tag className="w-3 h-3 text-gold shrink-0" />
                  <span className="font-mono text-xs text-gold flex-1 font-semibold tracking-wider">
                    {promo.code}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-6 px-2 text-muted-foreground hover:text-gold"
                    onClick={() => copyCode(promo.code)}
                    data-ocid={`promotions.secondary_button.${i + 1}`}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
