import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

const foods: Prisma.FoodCreateInput[] = [
  {
    title: "pizza",
    image: "pizza.jpeg",

    price: 2,
  },
];

// name: "loli",
// email: "loli@mail",
// password: bcrypt.hashSync("loli"),
// orders: {
//   create: [
//     { item: { connect: { title: "flower" } }, quantity: 2 },
//     { item: { connect: { title: "bag" } }, quantity: 1 },
//   ],
// },
// },

const users: Prisma.UserCreateInput[] = [
  {
    name: "John",
    email: "John@mail",
    password: bcrypt.hashSync("John"),
    orders: {
      create: [{ foods: { connect: { title: "pizza" } }, quantity: 1 }],
    },
  },
  {
    name: "Lionel",
    email: "Lionel@mail",
    password: bcrypt.hashSync("Lionel"),
  },
  {
    name: "Andres",
    email: "Andres@mail",
    password: bcrypt.hashSync("Andres"),
  },
  {
    name: "Ylber",
    email: "Ylber@mail",
    password: bcrypt.hashSync("Ylber"),
  },
  {
    name: "Shpetim",
    email: "Shpetim@mail",
    password: bcrypt.hashSync("Shpetim"),
  },
];
async function createStuff() {
  for (const food of foods) {
    await prisma.food.create({ data: food });
  }
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
createStuff();
