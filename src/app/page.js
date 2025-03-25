import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 120,
    description:
      "High-quality wireless headphones with noise cancellation and 20 hours of battery life.",
    image: "/images/headphones.jpg",
  },
  {
    id: 2,
    title: "Smartphone",
    price: 700,
    description:
      "Latest 5G smartphone with 128GB storage, AMOLED display, and triple-camera setup.",
    image: "/images/smartphone.jpg",
  },
  {
    id: 3,
    title: "Gaming Laptop",
    price: 1500,
    description:
      "Powerful gaming laptop with RTX 4070 GPU, 16GB RAM, and 1TB SSD storage.",
    image: "/images/laptop.jpg",
  },
  {
    id: 4,
    title: "Smart Watch",
    price: 250,
    description:
      "Fitness smartwatch with heart rate monitor, GPS, and sleep tracking features.",
    image: "/images/smartwatch.jpg",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: 80,
    description:
      "Portable Bluetooth speaker with 12-hour battery life and waterproof design.",
    image: "/images/speaker.jpg",
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    price: 130,
    description:
      "RGB backlit mechanical keyboard with customizable key switches for gaming.",
    image: "/images/keyboard.jpg",
  },
  {
    id: 7,
    title: "4K Smart TV",
    price: 999,
    description:
      "Ultra HD 4K smart TV with HDR, voice control, and built-in streaming apps.",
    image: "/images/tv.jpg",
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    price: 150,
    description:
      "True wireless earbuds with active noise cancellation and 30-hour battery life.",
    image: "/images/earbuds.jpg",
  },
  {
    id: 9,
    title: "Gaming Mouse",
    price: 60,
    description:
      "Ergonomic gaming mouse with 12,000 DPI sensor and customizable buttons.",
    image: "/images/mouse.jpg",
  },
  {
    id: 10,
    title: "External Hard Drive",
    price: 110,
    description:
      "2TB external hard drive with USB 3.0 support for fast data transfer.",
    image: "/images/harddrive.jpg",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">All Product</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
