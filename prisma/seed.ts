import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed the plans if they don't exist
  const planData = [
    {
      name: "Basic",
      price: 0.0,
      formLimit: 3,
      submissionLimit: 90,
      downloadLimit: 0,
    },
    {
      name: "Pro",
      price: 9.0,
      formLimit: 10,
      submissionLimit: 1000,
      downloadLimit: 500,
    },
    {
      name: "Enterprise",
      price: 29.0,
      formLimit: -1,
      submissionLimit: -1,
      downloadLimit: -1,
    },
  ];

  // 2. Create plans if they don't already exist
  await prisma.plan.createMany({
    data: planData,
    skipDuplicates: true,
  });

  // 3. Fetch all users without a plan
  const usersWithoutPlan = await prisma.user.findMany({
    where: {
      userPlans: { none: {} },
    },
  });

  // 4. Find the Basic plan (you can adjust this logic as needed)
  const basicPlan = await prisma.plan.findUnique({
    where: { name: "Basic" },
  });

  if (basicPlan) {
    // 5. Assign the Basic plan to all users without a plan
    for (const user of usersWithoutPlan) {
      await prisma.userPlan.create({
        data: {
          userId: user.id,
          planId: basicPlan.id,
          startDate: new Date(),
          expiryDate: null,
        },
      });
    }
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
