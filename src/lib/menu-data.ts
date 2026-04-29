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
