import { Redis } from "@upstash/redis";

import { Lang, t } from "@/lib/i18n";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function getDailyVisits(): Promise<number[]> {
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });
  const keys = days.map((d) => `blog:daily:visits:${d}`);
  try {
    const counts = await redis.mget<number[]>(...keys);
    return counts.map((c) => c ?? 0);
  } catch {
    return Array(14).fill(0);
  }
}

function Sparkline({ data }: { data: number[] }) {
  const W = 110;
  const H = 48;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polyline = pts.join(" ");
  const area = `0,${H} ${polyline} ${W},${H}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sparkFill)" />
      <polyline
        points={polyline}
        fill="none"
        stroke="var(--accent-1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function AboutWidget({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const visits = await getDailyVisits();

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3">
        {/* Sparkline — left side */}
        <div className="flex items-end flex-1 h-24">
          <Sparkline data={visits} />
        </div>
        {/* Avatar + role — right side */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <img
            src="/avatar.jpg"
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover object-top"
          />
          {tr.about_bio.map((line) => (
            <p
              key={line}
              className="text-xs text-right leading-snug"
              style={{ color: "var(--text-muted)" }}
            >
              {line}
            </p>
          ))}
          <p
            className="text-sm font-medium text-right"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-playfair), var(--font-korean), serif",
            }}
          >
            {tr.about_role}
          </p>
        </div>
      </div>
    </div>
  );
}
