import parseCsv from "@/services/vehicleRetriever";

export default async function DashboardPage() {
    const vehicles = await parseCsv();

    return (
        <div className="flex flex-col flex-1">
            <main>
                <p>
                    dashboard
                </p>
            </main>
        </div>

    );
}