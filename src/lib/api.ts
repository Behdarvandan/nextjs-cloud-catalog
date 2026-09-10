import type { FilterParams, Product } from "@/types/product";

/**
 * In-memory mock database of premium e-commerce products.
 * Replace this layer with a real database, CMS, or microservice call
 * without touching any UI code.
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Quantum Wireless Noise-Cancelling Headphones",
    description:
      "Immerse yourself in pure acoustic bliss. Featuring adaptive active noise cancelling, 45-hour battery life, and spatial audio configuration.",
    price: 299.99,
    rating: { rate: 4.8, count: 124 },
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    category: "Electronics",
    stock: 14,
    featured: true,
    specs: {
      "Battery Life": "Up to 45 hours",
      "Bluetooth Version": "5.3 LE Audio",
      Drivers: "40mm Beryllium dynamic",
      Weight: "250g",
    },
  },
  {
    id: "prod-2",
    title: "Minimalist Leather Backpack",
    description:
      "Handcrafted from full-grain vegetable-tanned leather. Fitted with a water-resistant 16-inch laptop pocket and secure quick-access zippers.",
    price: 189.5,
    rating: { rate: 4.6, count: 85 },
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    category: "Accessories",
    stock: 8,
    featured: true,
    specs: {
      Material: "Full-grain leather",
      "Laptop Capacity": "Up to 16 inches",
      Capacity: "22 Liters",
      "Water Resistant": "Yes (surface-treated)",
    },
  },
  {
    id: "prod-3",
    title: "Ergonomic Mechanical Keyboard",
    description:
      "Designed for developers and creators. Featuring hot-swappable tactile switches, per-key RGB backlighting, and CNC anodized aluminum case.",
    price: 159.0,
    rating: { rate: 4.9, count: 210 },
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    category: "Electronics",
    stock: 25,
    featured: true,
    specs: {
      "Form Factor": "75% Layout",
      "Hot-swap": "Yes (3-pin & 5-pin compatible)",
      Connectivity: "USB-C / 2.4Ghz / Bluetooth",
      Keycaps: "PBT Double-Shot Cherry Profile",
    },
  },
  {
    id: "prod-4",
    title: "Premium Merino Wool Hoodie",
    description:
      "Ultralight, breathable, and odor-resistant. Designed for modern explorers transitioning effortlessly from city commutes to mountain paths.",
    price: 125.0,
    rating: { rate: 4.7, count: 64 },
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    category: "Apparel",
    stock: 19,
    featured: false,
    specs: {
      Composition: "100% Superfine Merino Wool",
      "Fabric Weight": "260 gsm",
      Fit: "Athletic Modern",
      Care: "Machine washable",
    },
  },
  {
    id: "prod-5",
    title: "Smart Home Ambient Light Bar",
    description:
      "Transform your workspace or home theater setup. Syncs perfectly with music, games, and ambient environments through smart home voice integrations.",
    price: 79.99,
    rating: { rate: 4.4, count: 142 },
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    category: "Electronics",
    stock: 45,
    featured: false,
    specs: {
      Colors: "16 Million (RGBIC)",
      "Smart Assistants": "Google, Alexa, Apple HomeKit",
      Length: "12 inches",
      Power: "USB 5V/2A",
    },
  },
  {
    id: "prod-6",
    title: "Eco-Friendly Ceramic Coffee Mug Set",
    description:
      "A set of four hand-thrown organic ceramic mugs. Coated in a unique dual-tone matte glaze, dishwasher safe and thermal insulated.",
    price: 48.0,
    rating: { rate: 4.5, count: 42 },
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    category: "Home & Living",
    stock: 30,
    featured: false,
    specs: {
      Quantity: "4 Mugs per set",
      Capacity: "14 oz (415ml)",
      Material: "Natural clay stoneware",
      "Thermal Insulation": "Double-walled base",
    },
  },
  {
    id: "prod-7",
    title: "Titanium Polarized Sport Sunglasses",
    description:
      "Indestructible beta-titanium framing equipped with high-contrast polarized lenses. Offers 100% UVA/UVB protection and a lightweight fit.",
    price: 135.0,
    rating: { rate: 4.8, count: 98 },
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    category: "Accessories",
    stock: 5,
    featured: false,
    specs: {
      "Frame Type": "Beta-titanium wireframe",
      "Lens Technology": "9-layer Polarized HD",
      Weight: "Only 14 grams",
      Protection: "UV400 Certified",
    },
  },
  {
    id: "prod-8",
    title: "Stainless Steel Insulated Water Bottle",
    description:
      "Keep your beverages icy cold for 24 hours or steaming hot for 12 hours. Ergonomic carry strap, double-wall copper vacuum insulation.",
    price: 35.0,
    rating: { rate: 4.7, count: 320 },
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    category: "Home & Living",
    stock: 150,
    featured: true,
    specs: {
      Capacity: "32 oz (950ml)",
      Material: "18/8 food-grade Stainless Steel",
      Coating: "Powder-coated sweat-free finish",
      Insulation: "Copper-clad vacuum",
    },
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch and filter the product catalog based on the provided parameters.
 * Simulates realistic network/database latency so the architecture is
 * ready for a real backend swap.
 */
export async function fetchProducts(filters: FilterParams = {}): Promise<Product[]> {
  await delay(300);

  const products = [...MOCK_PRODUCTS];
  let filtered = products;

  // 1. Case-insensitive text search across title and description
  if (filters.search) {
    const term = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term),
    );
  }

  // 2. Category filter
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category?.toLowerCase(),
    );
  }

  // 3. Price range filters
  if (filters.minPrice) {
    const min = parseFloat(filters.minPrice);
    if (!Number.isNaN(min)) {
      filtered = filtered.filter((p) => p.price >= min);
    }
  }
  if (filters.maxPrice) {
    const max = parseFloat(filters.maxPrice);
    if (!Number.isNaN(max)) {
      filtered = filtered.filter((p) => p.price <= max);
    }
  }

  // 4. Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating.rate - a.rating.rate;
        });
        break;
    }
  }

  return filtered;
}

/**
 * Fetch a single product by its unique id.
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(200);
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  return product ?? null;
}

/**
 * Return the distinct list of categories with an "all" option prepended.
 */
export async function fetchCategories(): Promise<string[]> {
  await delay(100);
  const categories = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)));
  return ["all", ...categories];
}

