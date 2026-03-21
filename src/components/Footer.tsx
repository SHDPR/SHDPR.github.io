export default function Footer() {
  return (
    <footer className="mt-16 py-8" style={{ borderTop: "1px solid var(--border)" }}>
      <div
        className="max-w-3xl mx-auto px-6 flex items-center justify-between text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="gradient-text font-bold">SHDPR</span>
        <span>© {new Date().getFullYear()} · All rights reserved.</span>
      </div>
    </footer>
  );
}
