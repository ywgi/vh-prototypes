'use client'

import Image from "next/image";
import vhlogo from "@/public/vh-logo.png"
import { useState } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,  // you might want to rename this field
        password: formData.password
      })
    })

    if (res.ok) {
      window.location.href = '/dashboard'
    } else {
      const data = await res.json()
      // display data.error to the user however you want
      console.error(data.error)
    }
  }

  return (
    <main className="flex py-4 flex-col gap-4 flex-1 items-center justify-center">
      <Image 
        className="max-w-[80%] py-2 md:py-4 invert dark:invert-0" 
        src={vhlogo} 
        alt="ver hoef automotive logo"/>
      <h1 className="text-xl italic py-4">"Worth the drive from anywhere..."</h1>
      <form 
        className="flex flex-col gap-2 py-2 items-center justify-center md:py-4 md:gap-4" 
        onSubmit={handleSubmit}>
        <input 
          className="px-2 py-1  border rounded-xl focus:outline-gray-500 focus:outline-1 md:py-1.5"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="username"
        />
        <input 
          className="px-2 py-1  border rounded-xl focus:outline-gray-500 focus:outline-1 md:py-1.5"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button 
          className="px-8 py-2 bg-[#0087EB] dark:text-white rounded-xl" 
          type="submit"
          >
            Login
        </button>

      </form>
    </main>
  );
}
