import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-white/10 p-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-[0.2em]">VELVAR</h1>
        <div className="flex gap-4 items-center">
          <Link href="/retail" className="text-sm tracking-widest hover:text-gray-300 transition-colors">SHOP</Link>
          <Link href="/wholesale" className="text-sm tracking-widest hover:text-gray-300 transition-colors">WHOLESALE</Link>
          <Button variant="outline" className="text-black bg-white hover:bg-gray-200 border-none rounded-none px-6">
            LOGIN
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-32 space-y-8">
        <Badge variant="outline" className="border-white/20 text-white tracking-widest">
          NEW COLLECTION 2026
        </Badge>

        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
          Redefining<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            Modern Elegance
          </span>
        </h2>

        <p className="max-w-xl text-gray-400 text-lg md:text-xl font-light">
          Premium apparel for those who demand excellence in every stitch. Available for individual purchase or wholesale partnership.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full max-w-md justify-center">
          <Link href="/retail" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-none px-8 py-6 text-sm tracking-widest bg-white text-black hover:bg-gray-200">
              SHOP RETAIL
            </Button>
          </Link>
          <Link href="/wholesale" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto rounded-none px-8 py-6 text-sm tracking-widest border-white/20 hover:bg-white/10 text-white">
              WHOLESALE PORTAL
            </Button>
          </Link>
        </div>
      </main>

      {/* Features Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
        <div className="p-16 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors group">
          <h3 className="text-2xl font-bold tracking-widest mb-4">RETAIL</h3>
          <p className="text-gray-400 mb-8 font-light">Experience our latest collections with premium shipping and hassle-free returns.</p>
          <ul className="space-y-4 text-sm tracking-wide text-gray-300">
            <li className="flex items-center gap-2">✓ Premium Quality Guarantee</li>
            <li className="flex items-center gap-2">✓ Worldwide Shipping</li>
            <li className="flex items-center gap-2">✓ 30-Day Returns</li>
          </ul>
        </div>
        <div className="p-16 hover:bg-white/5 transition-colors group">
          <h3 className="text-2xl font-bold tracking-widest mb-4">WHOLESALE</h3>
          <p className="text-gray-400 mb-8 font-light">Partner with us. Access exclusive tier pricing with a minimum order quantity of 12 pieces.</p>
          <ul className="space-y-4 text-sm tracking-wide text-gray-300">
            <li className="flex items-center gap-2">✓ MOQ: 12 Pieces</li>
            <li className="flex items-center gap-2">✓ Tiered Volume Discounts</li>
            <li className="flex items-center gap-2">✓ Priority B2B Support</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
