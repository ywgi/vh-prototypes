import Papa from 'papaparse';
import UnfilteredVehicle from '../types/UnfilteredVehicle';
import Vehicle from "../types/VehicleType";

const url = "https://vendordownloads.homenetinc.com/VerHoefChevroletBuick/VerHoefChevroletBuick.csv";

const fetchCsv = async (): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status}`);
    }
    return response.text();
};

const vehicleConverter = (unfilteredVehicles : UnfilteredVehicle[]) : Vehicle[] => {
    const vehicles = unfilteredVehicles.map(uv => {
        return {
            vin: uv.vin,
            title: uv.title,
            make: uv.make,
            model: uv.model,
            year: uv.year,
            mileage: uv['mileage.value'],
            transmission: uv.transmission,
            fuelType: uv.fuel_type,
            bodyStyle: uv.body_style,
            drivetrain: uv.drivetrain,
            stateOfVehicle: uv.state_of_vehicle,
            stockNumber: uv.stock_number,
            price: uv.price,
            exteriorColor: uv.exterior_color,
            daysOnLot: uv.days_on_lot,
            msrp: uv.msrp,
            images: Object.keys(uv)
                .filter(key => key.startsWith('image') && key.endsWith('.url'))
                .map(key => uv[key])
        } as Vehicle;
    })
    return vehicles;
}

const parseCsv = async () : Promise<Vehicle[]> => {
    const csvData = await fetchCsv();
    const results = Papa.parse<UnfilteredVehicle>(csvData, {
        header: true,
        transformHeader: (header: string) => header.toLowerCase(),
    });

    return vehicleConverter(results.data);
};

export default parseCsv;