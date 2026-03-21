import { Lang, t } from "@/lib/i18n";

export default function AboutWidget({ lang }: { lang: Lang }) {
  const tr = t(lang);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <img
        src="/avatar.jpg"
        alt="avatar"
        className="w-24 h-24 rounded-full mb-3 object-cover object-top ml-auto"
      />
      <p className="text-sm font-medium text-right" style={{ color: "var(--text-muted)" }}>
        {tr.about_role}
      </p>
    </div>
  );
}
