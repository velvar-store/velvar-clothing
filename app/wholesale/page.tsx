import { PrismaClient } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

const prisma = new PrismaClient()

async function getWholesaleProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
      variants: {
        include: {
          priceTiers: {
            where: {
              minQuantity: {
                gte: 12
              }
            }
          }
        }
      }
    }
  })
}

export default async function WholesalePage() {
  let products: Awaited<ReturnType<typeof getWholesaleProducts>> = [];
  try {
    products = await getWholesaleProducts()
  } catch (e) {
    console.error("Database connection failed, showing empty state", e)
  }

  if (!products || products.length === 0) {
    // Fallback data if db is empty or disconnected
    products = [
      {
        id: "mock-1",
        name: "Classic Silk Shirt",
        description: "Premium silk blend, perfect for evening wear or formal events.",
        imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        categoryId: "cat-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-1", name: "Shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-1", productId: "mock-1", size: "M", color: "Black", sku: "SH-SILK-BLK-M", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-1", variantId: "var-1", minQuantity: 12, pricePerUnit: 85.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-3",
        name: "Luxury Velvet Hoodie",
        description: "Plush velvet blend hoodie for unmatched comfort and style.",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
        categoryId: "cat-3",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-3", name: "Hoodies", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-3", productId: "mock-3", size: "L", color: "Navy", sku: "HD-VLVT-NVY-L", stockQuantity: 50, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-3", variantId: "var-3", minQuantity: 12, pricePerUnit: 120.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-5",
        name: "Velvar Heavyweight Drop-Shoulder Tactical Hoodie",
        description: "Custom heavyweight cotton fleece with structured dropped shoulders, double-layered hood, and concealed side-seam pockets.",
        imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
        categoryId: "cat-3",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-3", name: "Hoodies", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-5", productId: "mock-5", size: "L", color: "Black", sku: "HD-TAC-BLK-L", stockQuantity: 75, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-5", variantId: "var-5", minQuantity: 10, pricePerUnit: 85.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-6",
        name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (Black)",
        description: "Heavyweight drop-shoulder silhouette featuring 'VELVAR - ALWAYS CONFIDENT' cyber-anime back print with minimal chest emblem.",
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-6", productId: "mock-6", size: "L", color: "Black", sku: "TS-CYB-BLK-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-6", variantId: "var-6", minQuantity: 15, pricePerUnit: 28.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-7",
        name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (White)",
        description: "Waffle-textured premium cotton oversized drop-shoulder tee with full anime graphic illustration back.",
        imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-7", productId: "mock-7", size: "L", color: "White", sku: "TS-CYB-WHT-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-7", variantId: "var-7", minQuantity: 15, pricePerUnit: 28.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-8",
        name: "VELVAR Minimalist Mountain Graphic Drop-Shoulder Tee",
        description: "280 GSM luxury combed cotton with minimal front 'V' logo and high-density monochrome landscape back print.",
        imageUrl: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-8", productId: "mock-8", size: "L", color: "Grey", sku: "TS-MNT-GRY-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-8", variantId: "var-8", minQuantity: 20, pricePerUnit: 25.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      }
    ] as unknown as Awaited<ReturnType<typeof getWholesaleProducts>>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <nav className="mb-12 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-[0.2em] cursor-pointer">VELVAR <span className="text-gray-500">| B2B</span></h1>
        </Link>
        <div className="flex gap-4">
          <Badge variant="outline" className="border-red-500/50 text-red-400 tracking-widest">
            MOQ 12 UNITS
          </Badge>
          <Badge variant="outline" className="border-white/20 text-white tracking-widest">
            WHOLESALE PORTAL
          </Badge>
        </div>
      </nav>

      <div className="mb-8 p-6 border border-white/10 bg-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-wider mb-2">Wholesale Application Status</h2>
          <p className="text-gray-400 font-light text-sm">You must be approved for wholesale to place an order.</p>
        </div>
        <Button variant="outline" className="rounded-none border-white/20 text-white hover:bg-white/10 tracking-widest">
          APPLY FOR WHOLESALE
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map(product => (
          <Card key={product.id} className="bg-white/5 border-white/10 rounded-none text-white overflow-hidden group">
            {product.imageUrl && (
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl tracking-wider">{product.name}</CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    ${product.variants[0]?.priceTiers[0]?.pricePerUnit?.toFixed(2) ?? "0.00"}
                  </div>
                  <div className="text-xs text-gray-500 tracking-widest mt-1">PER UNIT</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 font-light mt-2">{product.category.name}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-light mb-6">{product.description}</p>

              <div className="space-y-4">
                <h4 className="text-sm tracking-widest text-gray-400 border-b border-white/10 pb-2">ORDER MATRIX</h4>
                {product.variants.map((v) => (
                  <div key={v.id} className="flex justify-between items-center bg-black/50 p-3 border border-white/5">
                    <span className="font-mono">{v.sku}</span>
                    <span className="text-gray-400 text-sm">{v.size} - {v.color}</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-20 bg-transparent border border-white/20 text-white p-2 text-center focus:outline-none focus:border-white"
                      disabled
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full rounded-none bg-gray-800 text-gray-400 tracking-widest cursor-not-allowed">
                MINIMUM ORDER: {product.variants[0]?.priceTiers[0]?.minQuantity ?? 12} UNITS
              </Button>
            </CardFooter>
          </Card>
        ))}
        {products.length === 0 && (
          <div className="col-span-2 text-center text-gray-500 py-12 border border-dashed border-white/10">
            No wholesale products available or database not connected.
          </div>
        )}
      </div>
    </div>
  )
}
