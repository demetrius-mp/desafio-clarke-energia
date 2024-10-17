// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Entities {
  export type EnergySupplier = {
    id: string;
    logo: string;
    name: string;
    state: string;
    costPerKwh: number;
    minKwhLimit: number;
    totalClients: number;
    averageRating: number;
  };
}
