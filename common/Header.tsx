'use client'

import Image from "next/image"
import vhlogo from "@/public/vh-logo.png"
import SunIcon from "@/icons/SunIcon"
import MoonIcon from "@/icons/MoonIcon";
import UserIcon from "@/icons/UserIcon";
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/inventory", label: "Inventory" },
    { href: "/crew", label: "Crew" },
    { href: "/calendar", label: "Calendar" },
    { href: "/sold", label: "Sold" },
]

export default function Header() {
    const pathname = usePathname()
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <header className="grid grid-cols-3 h-20 border-b-2 flex-row-reverse md:flex-row justify-between items-center p-4 overflow-hidden">
            <div className="relative h-full w-40">
                <Image 
                    className="object-contain invert dark:invert-0"
                    src={vhlogo} 
                    alt="Ver Hoef Automotive logo"
                    fill
                />
            </div>        
            <nav className="hidden md:flex gap-4items-center justify-center">
                {navLinks.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`px-4 py-2 rounded tracking-widest ${
                            pathname === href
                                ? "bg-[#0087EB] dark:text-white transition-colors"
                                : "hover:text-[#0087EB]"
                        }`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            <div className="hidden md:flex gap-4 items-center justify-end ">
                <button onClick={toggleTheme} aria-label="Toggle theme">
                    {mounted && (theme === "dark" ? <SunIcon /> : <MoonIcon />)}
                </button>
                <UserIcon className="size-10" />
            </div>
        </header>
    );
}