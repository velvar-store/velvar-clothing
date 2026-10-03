import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')

  // 1. Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { name: "Men's T-shirts" }, update: {}, create: { name: "Men's T-shirts" } }),
    prisma.category.upsert({ where: { name: "Hoodies" }, update: {}, create: { name: "Hoodies" } }),
    prisma.category.upsert({ where: { name: "Shirts" }, update: {}, create: { name: "Shirts" } }),
    prisma.category.upsert({ where: { name: "Panjabi" }, update: {}, create: { name: "Panjabi" } }),
    prisma.category.upsert({ where: { name: "Women's Wear" }, update: {}, create: { name: "Women's Wear" } }),
  ])

  console.log(`Created ${categories.length} categories.`)

  // 2. Create sample products with variants and price tiers
  // Creating a Shirt
  const shirtCat = categories.find(c => c.name === "Shirts")!

  const product1 = await prisma.product.create({
    data: {
      name: "Classic Silk Shirt",
      description: "Premium silk blend, perfect for evening wear or formal events.",
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=1000&auto=format&fit=crop",
      categoryId: shirtCat.id,
      variants: {
        create: [
          {
            size: "M",
            color: "Black",
            sku: "SH-SILK-BLK-M",
            stockQuantity: 100,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 120.00 }, // Retail
                { minQuantity: 12, pricePerUnit: 85.00 }  // Wholesale MOQ 12
              ]
            }
          },
          {
            size: "L",
            color: "White",
            sku: "SH-SILK-WHT-L",
            stockQuantity: 50,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 120.00 },
                { minQuantity: 12, pricePerUnit: 85.00 }
              ]
            }
          }
        ]
      }
    }
  })

  // Creating a Men's T-shirt
  const tshirtCat = categories.find(c => c.name === "Men's T-shirts")!

  const product2 = await prisma.product.create({
    data: {
      name: "Essential Heavyweight Tee",
      description: "Ultra-premium 280gsm cotton t-shirt with dropped shoulders.",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
      categoryId: tshirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "Charcoal",
            sku: "TS-HVY-CHAR-L",
            stockQuantity: 200,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 45.00 }, // Retail
                { minQuantity: 12, pricePerUnit: 25.00 } // Wholesale MOQ 12
              ]
            }
          }
        ]
      }
    }
  })

  console.log(`Created products with ID: ${product1.id}, ${product2.id}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
