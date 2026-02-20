'use client';

import { useState } from "react";
import Vehicle from "@/types/VehicleType";
import InventoryActionBar from "./InventoryActionBar";
import VehicleItem from "./VehicleItem";
import useDebounce from "@/lib/useDebounce";

function matchesSearch(vehicle: Vehicle, term: string): boolean {
    const lower = term.toLowerCase()
    return Object.values(vehicle)
        .filter(val => typeof val === 'string')
        .some(val => val.toLowerCase().includes(lower))
}

export default function InventoryClient({ vehicles }: { vehicles: Vehicle[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 250);

    const filteredVehicles = debouncedSearch
        ? vehicles.filter(v => matchesSearch(v, debouncedSearch))
        : vehicles;

    return (
        <>
            <InventoryActionBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="divide-y-2 divide-[#282828]">
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle, index) => (
                        <VehicleItem vehicle={vehicle} key={index} />
                    ))
                ) : (
                    <p className="px-4 py-8 text-center text-gray-500">No vehicles match your search.</p>
                )}
            </div>
        </>
    )
}