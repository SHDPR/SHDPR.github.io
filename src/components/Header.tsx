import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
          SHDPR
        </Link>
        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
          <Link href="/tags" className="hover:text-black transition-colors">Tags</Link>
        </nav>
      </div>
    </header>
  )
}
