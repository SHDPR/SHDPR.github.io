import { Lang, t } from "@/lib/i18n";

export default function AboutWidget({ lang }: { lang: Lang }) {
  const tr = t(lang);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        {tr.about_title}
      </h3>
      <img
        src="/avatar.svg"
        alt="avatar"
        className="w-24 h-24 rounded-full mb-3 object-cover object-top ml-auto"
      />
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {tr.about_bio}
      </p>
    </div>
  );
}
