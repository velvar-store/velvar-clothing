import { PrismaClient } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

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
          <Card key={product.id} className="bg-white/5 border-white/10 rounded-none text-white">
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
