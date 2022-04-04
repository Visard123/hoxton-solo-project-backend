import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

const foods: Prisma.FoodCreateInput[] = [
  {
    title: "pizza",
    image: "images/future.jpg",
    price: 2,
    restaurantId: 2,
  },
];

const restaurants: Prisma.RestaurantCreateInput[] = [
  {
    name: "KFC",
    image: "https://kfc.al/sites/default/files/Zinger%20Boxmaster%20Menu.jpg",
  },
  {
    name: "Burger King",
    image:
      "https://pavilion.cxcms.ascentis.com.sg/mallsmobile/media/mediafields/Outlet/4d2t30x9j0wrxva7v5w26mmecs/1067c0f23a03d0ac2294b9e397a2492c.jpg",
  },
  {
    name: "OPA",
    image: "",
  },
  {
    name: "Pizzeri Era",
    image:
      "https://dhurata.com/images/retailers/article/tiranepizzaera/kapricioza.jpg",
  },
  {
    name: "Serendipity",
    image: "https://pbs.twimg.com/media/Dxl8XrrWwAAKo50.jpg",
  },
  {
    name: "Lift",
    image:
      "https://rhg-services-images-production.s3.eu-central-1.amazonaws.com/596cc39e-3671-4f08-bb73-3a3e58766d07_d02d31bdd61c666253f52a7cee8f2d8b_a36998ac-5d2e-494e-9c7e-8c7409b5b514_NY%20STRIP.jpg",
  },

  {
    name: "Nama Sushi",
    image: "",
  },
  {
    name: "Il Gusto",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/6a/b2/il-gusto.jpg",
  },
  {
    name: "Milky",
    image: "",
  },
];

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
  for (const restaurant of restaurants) {
    await prisma.restaurant.create({ data: restaurant });
  }
  for (const food of foods) {
    await prisma.food.create({ data: food });
  }

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
createStuff();
