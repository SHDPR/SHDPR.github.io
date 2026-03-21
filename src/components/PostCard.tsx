import Link from 'next/link'
import TagBadge from './TagBadge'
import { PostMeta } from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="py-6 border-b border-gray-100 last:border-0">
      <time className="text-sm text-gray-400">{post.date}</time>
      <h2 className="mt-1 text-lg font-semibold">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-1 text-sm text-gray-500">{post.description}</p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
