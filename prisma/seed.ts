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
  const tshirtCat = categories.find(c => c.name === "Men's T-shirts")!

  const shirtCat = categories.find(c => c.name === "Shirts")!
  const hoodieCat = categories.find(c => c.name === "Hoodies")!

  const product1 = await prisma.product.create({
    data: {
      name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (White)",
      description: "500 GSM waffle-textured heavyweight cotton drop-shoulder tee. Features clean monochrome chest 'V' emblem on the front and full 'ALWAYS CONFIDENT' anime/cyber graphic on the back.",
      images: ["https://i.ibb.co.com/zWwg6p7b/FB-IMG-1791020395770.jpg", "https://i.ibb.co.com/7xydbyTM/FB-IMG-1791020400681.jpg"],
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

  const product2 = await prisma.product.create({
    data: {
      name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (Black)",
      description: "Premium ribbed structure luxury black tee with minimalist chest monogram and high-density dark cyberpunk illustration back print.",
      images: ["https://i.ibb.co.com/DDkG0B3L/FB-IMG-1791020405761.jpg", "https://i.ibb.co.com/3yfyvcv0/FB-IMG-1791020398394.jpg"],
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

  const product3 = await prisma.product.create({
    data: {
      name: "VELVAR Mountain Landscape Graphic Drop-Shoulder Tee",
      description: "Contemporary streetwear tee showcasing 'SAME DREAMS BIGGER PLANS' mountain graphic with custom VELVAR neck and hem tags.",
      images: ["https://i.ibb.co.com/xqdnqqdY/FB-IMG-1791020375676.jpg"],
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
                { minQuantity: 15, pricePerUnit: 26.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const product4 = await prisma.product.create({
    data: {
      name: "VELVAR Classic Silk Shirt",
      description: "Premium silk blend, perfect for evening wear or formal events.",
      images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"],
      categoryId: shirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "White",
            sku: "SH-SLK-WHT-L",
            stockQuantity: 50,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 120.00 },
                { minQuantity: 10, pricePerUnit: 52.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const product5 = await prisma.product.create({
    data: {
      name: "VELVAR Heavyweight Velvet Hoodie",
      description: "Custom heavyweight cotton fleece with structured dropped shoulders, double-layered hood, and plush finish.",
      images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"],
      categoryId: hoodieCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "Black",
            sku: "HD-VLV-BLK-L",
            stockQuantity: 40,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 185.00 },
                { minQuantity: 10, pricePerUnit: 75.00 }
              ]
            }
          }
        ]
      }
    }
  })

  console.log(`Created products with ID: ${product1.id}, ${product2.id}, ${product3.id}, ${product4.id}, ${product5.id}`)
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
