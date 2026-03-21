'use client'

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { PostMeta } from '@/lib/posts'
import PostCard from './PostCard'

interface SearchBarProps {
  posts: PostMeta[]
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PostMeta[]>(posts)

  const fuse = new Fuse(posts, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.4,
  })

  useEffect(() => {
    if (query.trim() === '') {
      setResults(posts)
    } else {
      setResults(fuse.search(query).map((r) => r.item))
    }
  }, [query])

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <div className="mt-4">
        {results.length === 0 ? (
          <p className="text-sm text-gray-400">No posts found.</p>
        ) : (
          results.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  )
}
