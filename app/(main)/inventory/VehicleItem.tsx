import Vehicle from "@/types/VehicleType";
import Image from "next/image";

export default function VehicleItem({vehicle}: {vehicle: Vehicle}) {
    const cleanUrl = vehicle.images[0]?.replace(/~canvas-size\.[^/]+/, '');
    
    function getDaysOnLotBorder(days: number): string {
        if (days < 30) return "border-3 border-green-500/90";
        if (days < 90) return "border-3 border-yellow-500/90";
        return "border-3 border-red-500/90";
    }

    return(
        <div className="h-35 gap-2 py-4 pl-2 shrink-0 flex items-center w-full md:rounded-xl md:max-w-400">
            {cleanUrl && 
                <Image width={120} height={63} src={cleanUrl} alt="vehicle" className={`${getDaysOnLotBorder(Number(vehicle.daysOnLot))} rounded`}/>
            }
            <div className="flex flex-col justify-center gap-1 h-full">
                <span className="text-sm">{vehicle.year} {vehicle.make} {vehicle.model}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Price: <span>${vehicle.price}</span></span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Miles: <span>{vehicle.mileage}</span></span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">VIN: <span className="text-gray-300">{vehicle.vin}</span></span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Fuel: <span>{vehicle.fuelType}</span></span>
            </div>
        </div>
    );
}