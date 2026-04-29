export interface MenuItem {
  id: string;
  name: string;
  price: number;
  badge: "best" | "new" | "hot" | "";
  type: "veg" | "nv";
  img: string;
  desc: string;
  category: string;
}

export interface Combo {
  id: string;
  name: string;
  items: string;
  price: number;
  was: number;
  save: number;
  tag: string;
  img: string;
}

export const MENU: Record<string, MenuItem[]> = {
  biryani: [
    { id: "b1", name: "Chicken Dum Biryani", price: 249, badge: "best", type: "nv", category: "biryani", desc: "Slow-cooked with aromatic spices in sealed handi over charcoal", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop&q=80" },
    { id: "b2", name: "Mutton Dum Biryani", price: 349, badge: "", type: "nv", category: "biryani", desc: "Tender mutton pieces layered with fragrant basmati rice", img: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=600&h=400&fit=crop&q=80" },
    { id: "b3", name: "Egg Biryani", price: 199, badge: "", type: "nv", category: "biryani", desc: "Perfectly boiled eggs nestled in flavourful spiced rice", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop&q=80" },
    { id: "b4", name: "Prawns Biryani", price: 349, badge: "", type: "nv", category: "biryani", desc: "Juicy prawns cooked in coastal spices with long-grain rice", img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&h=400&fit=crop&q=80" },
    { id: "b5", name: "Special Chicken Biryani", price: 299, badge: "hot", type: "nv", category: "biryani", desc: "Extra spicy, extra loaded - our chef's signature creation", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&h=400&fit=crop&q=80" },
    { id: "b6", name: "Veg Dum Biryani", price: 199, badge: "", type: "veg", category: "biryani", desc: "Garden-fresh vegetables slow-cooked in traditional dum style", img: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&h=400&fit=crop&q=80" },
    { id: "b7", name: "Paneer Biryani", price: 229, badge: "new", type: "veg", category: "biryani", desc: "Soft paneer cubes with aromatic basmati and fresh herbs", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&q=80" },
    { id: "b8", name: "Dragon Chicken Biryani", price: 299, badge: "hot", type: "nv", category: "biryani", desc: "Fiery Indo-Chinese fusion with crispy dragon chicken", img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600&h=400&fit=crop&q=80" },
  ],
  pulao: [
    { id: "p1", name: "Chicken Pulao", price: 199, badge: "best", type: "nv", category: "pulao", desc: "Light, fragrant rice cooked with tender chicken pieces", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop&q=80" },
    { id: "p2", name: "Veg Pulao", price: 149, badge: "", type: "veg", category: "pulao", desc: "Aromatic basmati with seasonal vegetables and whole spices", img: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&h=400&fit=crop&q=80" },
    { id: "p3", name: "Egg Pulao", price: 179, badge: "", type: "nv", category: "pulao", desc: "Fluffy rice with perfectly spiced scrambled eggs", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop&q=80" },
    { id: "p4", name: "Mushroom Pulao", price: 179, badge: "new", type: "veg", category: "pulao", desc: "Earthy mushrooms with fragrant rice and fresh herbs", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&q=80" },
  ],
  chinese: [
    { id: "c1", name: "Dragon Chicken", price: 249, badge: "hot", type: "nv", category: "chinese", desc: "Crispy chicken tossed in fiery dragon sauce", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop&q=80" },
    { id: "c2", name: "Chicken 65", price: 229, badge: "best", type: "nv", category: "chinese", desc: "Classic spicy deep-fried chicken, Hyderabad's favourite", img: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&h=400&fit=crop&q=80" },
    { id: "c3", name: "Chicken Manchuria", price: 229, badge: "", type: "nv", category: "chinese", desc: "Crispy chicken balls in tangy Manchurian sauce", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop&q=80" },
    { id: "c4", name: "Gobi Manchuria", price: 179, badge: "", type: "veg", category: "chinese", desc: "Crunchy cauliflower florets in spicy Indo-Chinese sauce", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop&q=80" },
    { id: "c5", name: "Veg Fried Rice", price: 149, badge: "", type: "veg", category: "chinese", desc: "Wok-tossed rice with fresh vegetables and soy", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&q=80" },
    { id: "c6", name: "Chicken Fried Rice", price: 199, badge: "", type: "nv", category: "chinese", desc: "Smoky wok-fried rice loaded with chicken pieces", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&q=80" },
    { id: "c7", name: "Egg Noodles", price: 179, badge: "", type: "nv", category: "chinese", desc: "Stir-fried noodles with egg and fresh vegetables", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop&q=80" },
  ],
  sides: [
    { id: "s1", name: "Raita", price: 49, badge: "", type: "veg", category: "sides", desc: "Cool yogurt with cucumber, onion and spices", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop&q=80" },
    { id: "s2", name: "Mirchi Ka Salan", price: 79, badge: "", type: "veg", category: "sides", desc: "Traditional Hyderabadi chilli curry with peanut-sesame gravy", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&q=80" },
    { id: "s3", name: "Soft Drink (300ml)", price: 40, badge: "", type: "veg", category: "sides", desc: "Chilled carbonated beverage", img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=600&h=400&fit=crop&q=80" },
    { id: "s4", name: "Butter Milk", price: 39, badge: "", type: "veg", category: "sides", desc: "Refreshing spiced buttermilk", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=400&fit=crop&q=80" },
    { id: "s5", name: "Water Bottle", price: 20, badge: "", type: "veg", category: "sides", desc: "500ml packaged drinking water", img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop&q=80" },
    { id: "s6", name: "Double Ka Meetha", price: 89, badge: "new", type: "veg", category: "sides", desc: "Traditional Hyderabadi bread pudding with nuts and saffron", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop&q=80" },
  ],
};

export const COMBOS: Combo[] = [
  { id: "combo1", name: "IT Lunch Combo", items: "Chicken Biryani + Raita + Soft Drink", price: 199, was: 328, save: 129, tag: "BEST VALUE", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&h=400&fit=crop&q=80" },
  { id: "combo2", name: "Couple Pack", items: "2 Chicken Biryani + 1 Chicken 65 + 2 Drinks", price: 499, was: 807, save: 308, tag: "FOR TWO", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop&q=80" },
  { id: "combo3", name: "Squad Pack", items: "5 Chicken Biryani + 2 Starters + Raita", price: 999, was: 1742, save: 743, tag: "OFFICE FAVE", img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&h=400&fit=crop&q=80" },
  { id: "combo4", name: "Party Pack", items: "10 Chicken Biryani + 4 Starters + 10 Drinks", price: 1899, was: 3806, save: 1907, tag: "PARTY MODE", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop&q=80" },
];

export const CATEGORIES = [
  { id: "biryani", label: "Biryani", icon: "ð", count: 8 },
  { id: "pulao", label: "Pulao", icon: "ð²", count: 4 },
  { id: "chinese", label: "Chinese", icon: "ð¥¡", count: 7 },
  { id: "sides", label: "Sides & Drinks", icon: "ð¥¤", count: 6 },
];

export const REVIEWS = [
  { name: "Ravi K.", text: "Best biryani in Kondapur! The dum is perfect and portions are super generous. My go-to every week.", rating: 5, source: "Google", avatar: "RK" },
  { name: "Priya S.", text: "Ordered the couple pack for date night. The chicken 65 was incredible and biryani was next level.", rating: 5, source: "Zomato", avatar: "PS" },
  { name: "Arun T.", text: "We order office packs every Friday. Consistent quality, WhatsApp ordering is so convenient!", rating: 5, source: "WhatsApp", avatar: "AT" },
  { name: "Sneha M.", text: "Dragon chicken biryani is addictive! Fast delivery and the food arrives piping hot every time.", rating: 5, source: "Google", avatar: "SM" },
  { name: "Vikram R.", text: "Tried their new double ka meetha. Absolutely divine! The whole menu is a hit in our household.", rating: 5, source: "Swiggy", avatar: "VR" },
  { name: "Deepa J.", text: "Party pack for my birthday was perfect. 10 biryanis, all consistent quality. Everyone loved it!", rating: 5, source: "Google", avatar: "DJ" },
];

export const PHONE = "919640034646";
export const WHATSAPP_URL = `https://wa.me/${PHONE}`;
