import { PrismaClient } from "@prisma/client";
import { ulid } from "ulidx";

const prisma = new PrismaClient();

const energySuppliers = [
  {
    logo: "https://picsum.photos/200",
    name: "Energia Solar Plus",
    state: "São Paulo",
    costPerKwh: 0.45,
    minKwhLimit: 10000,
    totalClients: 12000,
    averageRating: 4.7,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Eletro Norte",
    state: "Pará",
    costPerKwh: 0.4,
    minKwhLimit: 8000,
    totalClients: 8000,
    averageRating: 4.2,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Sul Energia",
    state: "Rio Grande do Sul",
    costPerKwh: 0.42,
    minKwhLimit: 9000,
    totalClients: 5000,
    averageRating: 4.5,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Luz do Nordeste",
    state: "Ceará",
    costPerKwh: 0.38,
    minKwhLimit: 6000,
    totalClients: 10000,
    averageRating: 4.3,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Energia Total",
    state: "Minas Gerais",
    costPerKwh: 0.44,
    minKwhLimit: 11000,
    totalClients: 15000,
    averageRating: 4.6,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Litoral Power",
    state: "Santa Catarina",
    costPerKwh: 0.47,
    minKwhLimit: 7000,
    totalClients: 9000,
    averageRating: 4.4,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Centro Energia",
    state: "Goiás",
    costPerKwh: 0.43,
    minKwhLimit: 8500,
    totalClients: 4000,
    averageRating: 4.0,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Power Future",
    state: "Paraná",
    costPerKwh: 0.41,
    minKwhLimit: 7500,
    totalClients: 14000,
    averageRating: 4.8,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Energize",
    state: "Pernambuco",
    costPerKwh: 0.39,
    minKwhLimit: 5000,
    totalClients: 6000,
    averageRating: 4.1,
  },
  {
    logo: "https://picsum.photos/200",
    name: "Eco Watt",
    state: "Bahia",
    costPerKwh: 0.37,
    minKwhLimit: 6500,
    totalClients: 11000,
    averageRating: 4.9,
  },
];

async function main() {
  await prisma.energySupplier.createMany({
    data: energySuppliers.map((supplier) => ({
      ...supplier,
      id: ulid(),
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
