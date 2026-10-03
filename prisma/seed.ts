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
      imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
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

  const product5 = await prisma.product.create({
    data: {
      name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (Black)",
      description: "Heavyweight drop-shoulder silhouette featuring 'VELVAR - ALWAYS CONFIDENT' cyber-anime back print with minimal chest emblem.",
      imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      categoryId: tshirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "Black",
            sku: "TS-CYB-BLK-L",
            stockQuantity: 100,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 65.00 },
                { minQuantity: 15, pricePerUnit: 28.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const product6 = await prisma.product.create({
    data: {
      name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (White)",
      description: "Waffle-textured premium cotton oversized drop-shoulder tee with full anime graphic illustration back.",
      imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
      categoryId: tshirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "White",
            sku: "TS-CYB-WHT-L",
            stockQuantity: 100,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 65.00 },
                { minQuantity: 15, pricePerUnit: 28.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const product7 = await prisma.product.create({
    data: {
      name: "VELVAR Minimalist Mountain Graphic Drop-Shoulder Tee",
      description: "280 GSM luxury combed cotton with minimal front 'V' logo and high-density monochrome landscape back print.",
      imageUrl: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80",
      categoryId: tshirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "Grey",
            sku: "TS-MNT-GRY-L",
            stockQuantity: 100,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 60.00 },
                { minQuantity: 20, pricePerUnit: 25.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const hoodieCat = categories.find(c => c.name === "Hoodies")!

  const product4 = await prisma.product.create({
    data: {
      name: "Velvar Heavyweight Drop-Shoulder Tactical Hoodie",
      description: "Custom heavyweight cotton fleece with structured dropped shoulders, double-layered hood, and concealed side-seam pockets.",
      imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
      categoryId: hoodieCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "Black",
            sku: "HD-TAC-BLK-L",
            stockQuantity: 75,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 220.00 },
                { minQuantity: 10, pricePerUnit: 85.00 }
              ]
            }
          }
        ]
      }
    }
  })

  console.log(`Created products with ID: ${product1.id}, ${product5.id}, ${product6.id}, ${product7.id}, ${product4.id}`)
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
