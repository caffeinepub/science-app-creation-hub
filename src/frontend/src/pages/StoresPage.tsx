import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STORES = [
  {
    name: "Luxe Fashion Hub",
    category: "Fashion",
    floor: "Floor 1",
    desc: "International designer brands and bespoke tailoring for the discerning shopper.",
    rating: 4.8,
    new: false,
  },
  {
    name: "Zara Premium",
    category: "Fashion",
    floor: "Floor 1",
    desc: "Contemporary fashion collections for men, women, and children.",
    rating: 4.5,
    new: false,
  },
  {
    name: "Casa Bella Home",
    category: "Fashion",
    floor: "Floor 2",
    desc: "Luxury home décor, furniture, and lifestyle accessories.",
    rating: 4.6,
    new: true,
  },
  {
    name: "Grand Bistro",
    category: "Food",
    floor: "Food Court",
    desc: "Farm-to-table gourmet cuisine with an ever-changing seasonal menu.",
    rating: 4.9,
    new: false,
  },
  {
    name: "Tokyo Ramen Bar",
    category: "Food",
    floor: "Food Court",
    desc: "Authentic Japanese ramen and izakaya street food.",
    rating: 4.7,
    new: true,
  },
  {
    name: "The Gelato Lab",
    category: "Food",
    floor: "Ground Floor",
    desc: "Artisanal Italian gelato made fresh daily with premium ingredients.",
    rating: 4.8,
    new: false,
  },
  {
    name: "TechWorld",
    category: "Electronics",
    floor: "Floor 3",
    desc: "Latest smartphones, laptops, smart home devices, and expert tech support.",
    rating: 4.6,
    new: false,
  },
  {
    name: "SoundSphere",
    category: "Electronics",
    floor: "Floor 3",
    desc: "Premium audio equipment, headphones, and home cinema systems.",
    rating: 4.5,
    new: false,
  },
  {
    name: "iRepair Centre",
    category: "Electronics",
    floor: "Floor 3",
    desc: "Certified repairs for all major device brands within 24 hours.",
    rating: 4.7,
    new: false,
  },
  {
    name: "Glow Beauty Spa",
    category: "Beauty",
    floor: "Floor 4",
    desc: "Luxury facials, massages, and wellness treatments in a serene setting.",
    rating: 4.9,
    new: false,
  },
  {
    name: "Sephora",
    category: "Beauty",
    floor: "Floor 1",
    desc: "Global beauty brands: skincare, makeup, fragrance, and haircare.",
    rating: 4.7,
    new: false,
  },
  {
    name: "SportsPlex",
    category: "Sports",
    floor: "Floor 4",
    desc: "Premium sports gear and equipment for every sport and fitness level.",
    rating: 4.6,
    new: false,
  },
  {
    name: "Running Republic",
    category: "Sports",
    floor: "Floor 4",
    desc: "Specialist running shoes and athletic wear with gait analysis.",
    rating: 4.8,
    new: true,
  },
  {
    name: "Cineplex Premiere",
    category: "Entertainment",
    floor: "Floor 5",
    desc: "8-screen cinema with IMAX, Dolby Atmos, and premium recliner seating.",
    rating: 4.8,
    new: false,
  },
  {
    name: "Sky Bowl",
    category: "Entertainment",
    floor: "Floor 5",
    desc: "24-lane bowling alley with neon ambiance and a full-service bar.",
    rating: 4.7,
    new: false,
  },
  {
    name: "Escape Zone",
    category: "Entertainment",
    floor: "Floor 5",
    desc: "Immersive escape rooms with 12 uniquely themed challenges.",
    rating: 4.9,
    new: true,
  },
];

const CATEGORIES = [
  "All",
  "Fashion",
  "Food",
  "Electronics",
  "Beauty",
  "Sports",
  "Entertainment",
];

const CATEGORY_COLORS: Record<string, string> = {
  Fashion: "bg-rose-900/30 text-rose-300 border-rose-700/30",
  Food: "bg-amber-900/30 text-amber-300 border-amber-700/30",
  Electronics: "bg-blue-900/30 text-blue-300 border-blue-700/30",
  Beauty: "bg-purple-900/30 text-purple-300 border-purple-700/30",
  Sports: "bg-green-900/30 text-green-300 border-green-700/30",
  Entertainment: "bg-indigo-900/30 text-indigo-300 border-indigo-700/30",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function StoresPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = STORES.filter((store) => {
    const matchesSearch =
      !search.trim() ||
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || store.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p className="text-gold text-sm uppercase tracking-widest mb-2">
          Explore
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Our Stores
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Browse 200+ premium stores across fashion, food, electronics, beauty,
          sports, and entertainment.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative max-w-lg mx-auto mb-8"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-secondary border-gold-dim focus:border-gold"
          data-ocid="stores.search_input"
        />
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex justify-center mb-10 overflow-x-auto"
      >
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="bg-secondary border border-gold-dim h-auto p-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground text-xs sm:text-sm px-3 py-1.5"
                data-ocid={`stores.${cat.toLowerCase()}.tab`}
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Store Count */}
      <p className="text-muted-foreground text-sm mb-6">
        {filtered.length} stores found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" data-ocid="stores.empty_state">
          <p className="text-muted-foreground text-lg">
            No stores match your search.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Try a different keyword or category.
          </p>
        </div>
      ) : (
        <motion.div
          key={`${search}-${activeCategory}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((store, i) => (
            <motion.div
              key={store.name}
              variants={itemVariants}
              data-ocid={`stores.item.${i + 1}`}
            >
              <div className="bg-card border border-gold-dim rounded-xl p-5 hover:border-gold hover:shadow-gold transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {store.name}
                    </h3>
                    {store.new && (
                      <Badge className="bg-gold/20 text-gold border-gold-dim text-xs mt-1">
                        New
                      </Badge>
                    )}
                  </div>
                  <Badge
                    className={`text-xs shrink-0 border ${CATEGORY_COLORS[store.category] ?? ""}`}
                  >
                    {store.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3">
                  {store.desc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gold-dim">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">
                      {store.floor}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="text-muted-foreground text-xs">
                      {store.rating}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
