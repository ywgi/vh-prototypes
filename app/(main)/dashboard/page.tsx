import SideMenu from "@/common/SideMenu";
import parseCsv from "@/services/vehicleRetriever";

export default async function DashboardPage() {
    const vehicles = await parseCsv();

    return (
        <div className="flex flex-1">
            <SideMenu vehicles={vehicles}/>
            <main>
                
            </main>
        </div>
    );
}