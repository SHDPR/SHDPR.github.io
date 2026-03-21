import Link from "next/link";

interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-block text-xs px-2.5 py-1 rounded-full font-medium transition-opacity duration-200 hover:opacity-80"
      style={{
        background: "linear-gradient(90deg, var(--accent-1), var(--accent-2))",
        color: "#1a1127",
      }}
    >
      {tag}
    </Link>
  );
}
