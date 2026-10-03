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

  const product5 = await prisma.product.create({
    data: {
      name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (White)",
      description: "500 GSM waffle-textured heavyweight cotton drop-shoulder tee with full 'ALWAYS CONFIDENT' anime/cyber back illustration.",
      imageUrl: "https://i.ibb.co.com/7xydbyTM/FB-IMG-1791020400681.jpg",
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

  const product6 = await prisma.product.create({
    data: {
      name: "VELVAR Minimalist Chest Emblem Drop-Shoulder Tee (Black)",
      description: "Premium ribbed structure luxury tee featuring clean monochrome chest 'V' logo and relaxed dropped shoulders.",
      imageUrl: "https://i.ibb.co.com/DDkG0B3L/FB-IMG-1791020405761.jpg",
      categoryId: tshirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "Black",
            sku: "TS-MIN-BLK-L",
            stockQuantity: 100,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 55.00 },
                { minQuantity: 20, pricePerUnit: 24.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const product7 = await prisma.product.create({
    data: {
      name: "VELVAR Minimalist Chest Emblem Drop-Shoulder Tee (White)",
      description: "Heavyweight drop-shoulder silhouette in clean optical white with high-density embroidered 'V' monogram.",
      imageUrl: "https://i.ibb.co.com/zWwg6p7b/FB-IMG-1791020395770.jpg",
      categoryId: tshirtCat.id,
      variants: {
        create: [
          {
            size: "L",
            color: "White",
            sku: "TS-MIN-WHT-L",
            stockQuantity: 100,
            priceTiers: {
              create: [
                { minQuantity: 1, pricePerUnit: 55.00 },
                { minQuantity: 20, pricePerUnit: 24.00 }
              ]
            }
          }
        ]
      }
    }
  })

  const product8 = await prisma.product.create({
    data: {
      name: "VELVAR Mountain Landscape Graphic Drop-Shoulder Tee",
      description: "Contemporary streetwear tee showcasing 'SAME DREAMS BIGGER PLANS' mountain graphic with branded hem and neck details.",
      imageUrl: "https://i.ibb.co.com/xqdnqqdY/FB-IMG-1791020375676.jpg",
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

  const product9 = await prisma.product.create({
    data: {
      name: "VELVAR Cyberpunk Graphic Drop-Shoulder Tee (Black)",
      description: "High-density dark cyberpunk back print on luxury textured cotton with raw dropped shoulders.",
      imageUrl: "https://i.ibb.co.com/3yfyvcv0/FB-IMG-1791020398394.jpg",
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

  console.log(`Created products with ID: ${product5.id}, ${product6.id}, ${product7.id}, ${product8.id}, ${product9.id}`)
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
