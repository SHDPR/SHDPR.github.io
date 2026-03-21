import Link from "next/link";

interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200 tag-pill"
    >
      {tag}
    </Link>
  );
}
