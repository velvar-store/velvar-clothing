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
            priceTiers: [{ id: "pt-5", variantId: "var-5", minQuantity: 1, pricePerUnit: 220.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-6",
        name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (White)",
        description: "500 GSM waffle-textured heavyweight cotton drop-shoulder tee with full 'ALWAYS CONFIDENT' anime/cyber back illustration.",
        imageUrl: "https://i.ibb.co.com/7xydbyTM/FB-IMG-1791020400681.jpg",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-6", productId: "mock-6", size: "L", color: "White", sku: "TS-CYB-WHT-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-6", variantId: "var-6", minQuantity: 1, pricePerUnit: 65.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-7",
        name: "VELVAR Minimalist Chest Emblem Drop-Shoulder Tee (Black)",
        description: "Premium ribbed structure luxury tee featuring clean monochrome chest 'V' logo and relaxed dropped shoulders.",
        imageUrl: "https://i.ibb.co.com/DDkG0B3L/FB-IMG-1791020405761.jpg",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-7", productId: "mock-7", size: "L", color: "Black", sku: "TS-MIN-BLK-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-7", variantId: "var-7", minQuantity: 1, pricePerUnit: 55.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-8",
        name: "VELVAR Minimalist Chest Emblem Drop-Shoulder Tee (White)",
        description: "Heavyweight drop-shoulder silhouette in clean optical white with high-density embroidered 'V' monogram.",
        imageUrl: "https://i.ibb.co.com/zWwg6p7b/FB-IMG-1791020395770.jpg",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-8", productId: "mock-8", size: "L", color: "White", sku: "TS-MIN-WHT-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-8", variantId: "var-8", minQuantity: 1, pricePerUnit: 55.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-9",
        name: "VELVAR Mountain Landscape Graphic Drop-Shoulder Tee",
        description: "Contemporary streetwear tee showcasing 'SAME DREAMS BIGGER PLANS' mountain graphic with branded hem and neck details.",
        imageUrl: "https://i.ibb.co.com/xqdnqqdY/FB-IMG-1791020375676.jpg",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-9", productId: "mock-9", size: "L", color: "Grey", sku: "TS-MNT-GRY-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-9", variantId: "var-9", minQuantity: 1, pricePerUnit: 60.00, createdAt: new Date(), updatedAt: new Date() }]
          }
        ]
      },
      {
        id: "mock-10",
        name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (Black)",
        description: "High-density dark cyberpunk back print on luxury textured cotton with raw dropped shoulders.",
        imageUrl: "https://i.ibb.co.com/3yfyvcv0/FB-IMG-1791020398394.jpg",
        categoryId: "cat-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: "cat-2", name: "Men's T-shirts", description: null, createdAt: new Date(), updatedAt: new Date() },
        variants: [
          {
            id: "var-10", productId: "mock-10", size: "L", color: "Black", sku: "TS-CYB-BLK-L", stockQuantity: 100, createdAt: new Date(), updatedAt: new Date(),
            priceTiers: [{ id: "pt-10", variantId: "var-10", minQuantity: 1, pricePerUnit: 65.00, createdAt: new Date(), updatedAt: new Date() }]
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
