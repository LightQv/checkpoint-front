import Link from "next/link"
import React from "react"

interface Country {
  title: string
  emoji: string
  link: number
}

export default function CountryCard({ title, emoji, link }: Country) {
  return (
    <Link
      href={`/${String(link)}`}
      className="border-slate-200 border-[1px] rounded-md flex flex-col justify-center items-center p-4 hover:bg-slate-200"
    >
      <h3 className="line-clamp-1">{title}</h3>
      <p className="text-3xl">{emoji}</p>
    </Link>
  )
}
