import Link from "next/link"

export default function Header() {
  return (
    <header className="w-screen bg-purple-400 flex flex-col justify-center items-center p-4 lg:gap-2">
      <h1 className="text-white font-bold text-2xl lg:text-3xl">
        Checkpoint : frontend
      </h1>
      <Link href="/" className="text-white">
        Countries
      </Link>
    </header>
  )
}
