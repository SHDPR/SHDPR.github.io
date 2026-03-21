export default function AboutWidget() {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        About
      </h3>
      <div
        className="w-14 h-14 rounded-full mb-3 flex items-center justify-center text-xl font-bold"
        style={{
          background: "var(--gradient)",
          color: "#fff",
        }}
      >
        S
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Hi, I&apos;m SHDPR. I write about things I find interesting — tech, travel, career, and
        everyday life.
      </p>
    </div>
  );
}
