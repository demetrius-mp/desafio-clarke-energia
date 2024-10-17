import { Entities } from "@/types";

type FetchEnergySuppliersOptions = {
  monthlyConsumption: number;
};

// const SUPPLIERS: Entities.EnergySupplier[] = [
//   {
//     id: "1",
//     name: "Energisa",
//     logo: "https://picsum.photos/200",
//     state: "Mato Grosso",
//     costPerKwh: 0.6,
//     minKwhLimit: 100,
//     totalClients: 1000000,
//     averageRating: 4.5,
//   },
//   {
//     id: "2",
//     name: "Neoenergia",
//     logo: "https://picsum.photos/200",
//     state: "Bahia",
//     costPerKwh: 0.7,
//     minKwhLimit: 150,
//     totalClients: 2000000,
//     averageRating: 4.2,
//   },
//   {
//     id: "3",
//     name: "Enel",
//     logo: "https://picsum.photos/200",
//     state: "Rio de Janeiro",
//     costPerKwh: 0.8,
//     minKwhLimit: 200,
//     totalClients: 3000000,
//     averageRating: 4.0,
//   },
//   {
//     id: "4",
//     name: "Light",
//     logo: "https://picsum.photos/200",
//     state: "Santa Catarina",
//     costPerKwh: 0.9,
//     minKwhLimit: 250,
//     totalClients: 4000000,
//     averageRating: 3.8,
//   },
//   {
//     id: "5",
//     name: "CPFL",
//     logo: "https://picsum.photos/200",
//     state: "Minas Gerais",
//     costPerKwh: 1.0,
//     minKwhLimit: 300,
//     totalClients: 5000000,
//     averageRating: 3.5,
//   },
// ];

export async function fetchEnergySuppliers(
  options: FetchEnergySuppliersOptions
): Promise<Entities.EnergySupplier[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { monthlyConsumption } = options;

  const response = await fetch(
    `http://localhost:3000/energy-suppliers?monthlyConsumption=${monthlyConsumption}`
  );
  const suppliers = await response.json();

  return suppliers;
}
