import FilterIcon from "@/icons/FilterIcon"
import SearchIcon from "@/icons/SearchIcon"

type Props = {
    searchTerm: string
    onSearchChange: (value: string) => void
}

export default function InventoryActionBar({ searchTerm, onSearchChange }: Props) {
    return (
        <div className="sticky top-20 z-10 flex w-full items-center justify-between gap-4 px-4 py-4 border-b-2 bg-gray-200 dark:bg-[#222222]">
            <FilterIcon />
            <div className="flex w-full px-4 py-1 gap-2 border border-gray-500 rounded-2xl focus-within:border-[#0087EE]">
                <SearchIcon />
                <input
                    className="w-full focus:outline-0 bg-transparent"
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    )
}