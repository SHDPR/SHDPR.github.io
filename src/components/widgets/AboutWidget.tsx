import { Redis } from "@upstash/redis";

import {
  CAREER_START_YEAR,
  SPARKLINE_HEIGHT,
  SPARKLINE_WIDTH,
  VIEW_WINDOW_DAYS,
} from "@/lib/constants";
import { Lang, t } from "@/lib/i18n";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function getDailyVisits(): Promise<number[]> {
  const days = Array.from({ length: VIEW_WINDOW_DAYS }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (VIEW_WINDOW_DAYS - 1 - i));
    return d.toISOString().slice(0, 10);
  });
  const keys = days.map((d) => `blog:daily:visits:${d}`);
  try {
    const counts = await redis.mget<number[]>(...keys);
    return counts.map((c) => c ?? 0);
  } catch {
    return Array(VIEW_WINDOW_DAYS).fill(0);
  }
}

function Sparkline({ data }: { data: number[] }) {
  const W = SPARKLINE_WIDTH;
  const H = SPARKLINE_HEIGHT;
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
  const yrs = new Date().getFullYear() - CAREER_START_YEAR;

  return (
    <div
      className="rounded-xl p-5 overflow-hidden"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start gap-3">
        {/* Sparkline — left side */}
        <div className="flex items-end flex-1 h-24">
          <Sparkline data={visits} />
        </div>
        {/* Avatar — right side, fixed width */}
        <div className="shrink-0">
          <img
            src="/avatar.jpg"
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover object-top"
          />
        </div>
      </div>
      {/* Role text — full width, right-aligned, below the row */}
      <p
        className="mt-2 text-sm font-medium flex items-center gap-1.5 justify-end"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-playfair), var(--font-korean), serif",
        }}
      >
        {tr.about_role(yrs)}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            borderRadius: 4,
            backgroundColor: "#111111",
            flexShrink: 0,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </span>
      </p>
    </div>
  );
}
