import { PrismaClient } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

const prisma = new PrismaClient()

async function getRetailProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
      variants: {
        include: {
          priceTiers: {
            where: {
              minQuantity: 1
            }
          }
        }
      }
    }
  })
}

export default async function RetailPage() {
  let products: Awaited<ReturnType<typeof getRetailProducts>> = [];
  try {
    products = await getRetailProducts()
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
            priceTiers: [{ id: "pt-1", variantId: "var-1", minQuantity: 1, pricePerUnit: 120.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-2",
        name: "Essential Heavyweight Tee",
        description: "Ultra-premium 280gsm cotton oversized t-shirt with dropped shoulders.",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-2", productId: "mock-2", size: "L", color: "Charcoal", sku: "TS-HVY-CHAR-L", stockQuantity: 200, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-2", variantId: "var-2", minQuantity: 1, pricePerUnit: 45.00, createdAt: new Date(), updatedAt: new Date() }]
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
            priceTiers: [{ id: "pt-3", variantId: "var-3", minQuantity: 1, pricePerUnit: 185.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      }
    ] as unknown as Awaited<ReturnType<typeof getRetailProducts>>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <nav className="mb-12 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-[0.2em] cursor-pointer">VELVAR</h1>
        </Link>
        <Badge variant="outline" className="border-white/20 text-white tracking-widest">
          RETAIL CATALOG
        </Badge>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <CardTitle className="text-xl tracking-wider">{product.name}</CardTitle>
                <Badge className="bg-white text-black hover:bg-gray-200">
                  ${product.variants[0]?.priceTiers[0]?.pricePerUnit?.toFixed(2) ?? "0.00"}
                </Badge>
              </div>
              <p className="text-sm text-gray-400 font-light mt-2">{product.category.name}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-light">{product.description}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <Badge key={v.id} variant="outline" className="border-white/20 text-gray-300">
                    {v.size} - {v.color}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-none bg-white text-black hover:bg-gray-200 tracking-widest">
                ADD TO CART
              </Button>
            </CardFooter>
          </Card>
        ))}
        {products.length === 0 && (
          <div className="col-span-3 text-center text-gray-500 py-12 border border-dashed border-white/10">
            No products available or database not connected.
          </div>
        )}
      </div>
    </div>
  )
}
