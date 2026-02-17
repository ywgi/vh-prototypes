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

  function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      console.log(formData)
      // send to API, etc.
  }

  return (
    <main className="flex flex-col gap-4 flex-1 items-center justify-center">
      <h1>Worth the drive from anywhere...</h1>
      <Image 
        className="max-w-[80%]" 
        src={vhlogo} 
        alt="ver hoef automotive logo"/>
      <form 
        className="flex flex-col gap-2 items-center justify-center" 
        onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input 
          type="password"
          name="password"
          value={formData.username}
          onChange={handleChange}
          placeholder="password"
        />
        <button 
          className="" 
          type="submit"
          >
            Send
        </button>
      </form>
    </main>
  );
}
