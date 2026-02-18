'use client'

import Image from "next/image";
import vhlogo from "@/public/vh-logo.png"
import { useState } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
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
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      window.location.href = '/dashboard'
    } else {
      // show error
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
          className="px-2 py-1 border rounded focus:outline-0"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input 
          className="px-2 py-1 border rounded focus:outline-0"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button 
          className="px-10 py-2 bg-[#0087EB] dark:text-white rounded hover:transf" 
          type="submit"
          >
            Login
        </button>
        <a 
          href="/auth/login"
          className="px-10 py-2 bg-green-600 text-white rounded hover:opacity-90"
        >
          Login with Auth0
        </a>
      </form>
    </main>
  );
}
