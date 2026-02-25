import parseCsv from "@/services/vehicleRetriever"
import InventoryClient from "./InventoryClient"
import Vehicle from "@/types/VehicleType";
import SideMenu from "@/common/SideMenu";

export default async function InventoryPage() {
    const vehicles: Vehicle[] = (await parseCsv())
        .filter(vehicle => vehicle.stateOfVehicle === 'Used')
        .sort((a, b) => Number(b.year) - Number(a.year));    

    return (
        <div className="flex flex-1">
            <div className="hidden md:block">
                <SideMenu />
            </div>
            <main className="flex flex-col w-full">
                <InventoryClient vehicles={vehicles} />
            </main>
        </div>
    )
}