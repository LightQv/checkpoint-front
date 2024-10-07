import Link from "next/link"
import React from "react"

interface Country {
  title: string
  emoji: string
  code: string
}

export default function CountryCard({ title, emoji, code }: Country) {
  return (
    <Link
      href={`/details/${code}`}
      className="border-slate-200 border-[1px] rounded-md flex flex-col justify-center items-center p-4 hover:bg-slate-200"
    >
      <h2 className="line-clamp-1">{title}</h2>
      <p className="text-3xl">{emoji}</p>
    </Link>
  )
}
