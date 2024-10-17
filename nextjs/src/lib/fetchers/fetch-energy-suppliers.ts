import { Entities } from "@/types";

type FetchEnergySuppliersOptions = {
  monthlyConsumption: number;
};

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
