import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const EVENTS = [
  {
    id: 1,
    title: "Grand Weekend Sale",
    date: "Oct 18–20, 2025",
    time: "10:00 AM – 10:00 PM",
    location: "All Floors",
    tag: "Sale",
    tagColor: "bg-red-900/40 text-red-300 border-red-700/40",
    attendees: "Expected 10,000+",
    featured: true,
    desc: "Our biggest sale of the year! Over 200 stores participating with discounts of up to 70%. Get early access by signing in to your account. Includes flash deals every hour on the hour.",
  },
  {
    id: 2,
    title: "Kids Fun Day",
    date: "Oct 25, 2025",
    time: "11:00 AM – 6:00 PM",
    location: "Ground Floor Atrium",
    tag: "Family",
    tagColor: "bg-yellow-900/40 text-yellow-300 border-yellow-700/40",
    attendees: "Families Welcome",
    featured: true,
    desc: "A magical day for children with magic shows, face painting, balloon art, interactive science demos, and complimentary ice cream for all children under 12.",
  },
  {
    id: 3,
    title: "International Food Festival",
    date: "Nov 1–7, 2025",
    time: "12:00 PM – 10:00 PM",
    location: "Food Court & Floor 2",
    tag: "Food",
    tagColor: "bg-amber-900/40 text-amber-300 border-amber-700/40",
    attendees: "Open to All",
    featured: false,
    desc: "A week-long celebration of global cuisines featuring 50+ countries. Live cooking demonstrations by celebrity chefs, tasting sessions, and a cooking competition.",
  },
  {
    id: 4,
    title: "Fashion Week Showcase",
    date: "Nov 10–12, 2025",
    time: "2:00 PM – 8:00 PM",
    location: "Grand Atrium Stage",
    tag: "Fashion",
    tagColor: "bg-rose-900/40 text-rose-300 border-rose-700/40",
    attendees: "500 per show",
    featured: false,
    desc: "Three days of live runway shows featuring the latest collections from our top fashion tenants. Industry guests, press, and shoppers all welcome.",
  },
  {
    id: 5,
    title: "Tech Innovation Expo",
    date: "Nov 15–16, 2025",
    time: "10:00 AM – 8:00 PM",
    location: "Floor 3 – TechWorld Zone",
    tag: "Technology",
    tagColor: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    attendees: "Open to All",
    featured: false,
    desc: "Hands-on demos of cutting-edge technology, from AI gadgets to smart home devices. Interactive booths, product launches, and expert talks.",
  },
  {
    id: 6,
    title: "Christmas Lighting Ceremony",
    date: "Dec 1, 2025",
    time: "6:00 PM – 9:00 PM",
    location: "Main Entrance & Atrium",
    tag: "Festive",
    tagColor: "bg-green-900/40 text-green-300 border-green-700/40",
    attendees: "All Welcome",
    featured: true,
    desc: "Join us for the spectacular Christmas light switch-on ceremony featuring live carol performances, a snow machine, and a visit from Santa Claus.",
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

const featured = EVENTS.filter((e) => e.featured);
const regular = EVENTS.filter((e) => !e.featured);

export default function EventsPage() {
  function handleRSVP(title: string) {
    toast.success(
      `Reminder set for "${title}"! We'll notify you before the event.`,
    );
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
          What's On
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Upcoming Events
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From family days and food festivals to fashion shows and festive
          celebrations — there's always something happening at Grand Plaza.
        </p>
      </motion.div>

      {/* Featured Events */}
      <section className="mb-14">
        <h2 className="text-gold text-sm uppercase tracking-widest mb-5">
          Featured Events
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featured.map((event, i) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              data-ocid={`events.item.${i + 1}`}
            >
              <div className="bg-card border border-gold rounded-xl p-6 shadow-gold hover:shadow-[0_0_40px_oklch(0.78_0.13_75/0.35)] transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`text-xs border ${event.tagColor}`}>
                    {event.tag}
                  </Badge>
                  <span className="text-gold text-xs font-semibold">
                    ★ Featured
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {event.desc}
                </p>
                <div className="space-y-2 pt-4 border-t border-gold-dim">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="w-3 h-3 text-gold" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Clock className="w-3 h-3 text-gold" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <MapPin className="w-3 h-3 text-gold" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Users className="w-3 h-3 text-gold" />
                    {event.attendees}
                  </div>
                </div>
                <Button
                  className="mt-4 gradient-gold text-primary-foreground font-semibold w-full"
                  onClick={() => handleRSVP(event.title)}
                  data-ocid={`events.primary_button.${i + 1}`}
                >
                  Set Reminder <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* All Upcoming */}
      <section>
        <h2 className="text-gold text-sm uppercase tracking-widest mb-5">
          All Upcoming Events
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {regular.map((event, i) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              data-ocid={`events.item.${featured.length + i + 1}`}
            >
              <div className="bg-card border border-gold-dim rounded-xl p-5 hover:border-gold hover:shadow-gold transition-all duration-300 flex flex-col md:flex-row gap-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <Badge
                      className={`text-xs border ${event.tagColor} shrink-0`}
                    >
                      {event.tag}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {event.desc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar className="w-3 h-3 text-gold" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3 text-gold" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <MapPin className="w-3 h-3 text-gold" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col md:items-end gap-3 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gold-dim text-gold hover:bg-gold/10"
                    onClick={() => handleRSVP(event.title)}
                    data-ocid={`events.secondary_button.${i + 1}`}
                  >
                    Remind Me
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
