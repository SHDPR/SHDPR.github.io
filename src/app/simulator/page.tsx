"use client";

import { useState, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_SIMULATOR_API_URL ?? "http://localhost:10000";

type ProgressEvent = {
  type: "progress";
  pct: number;
  io_num: number;
  total_ios: number;
  waf: number;
  free_sb: number;
};

type StatsEvent = {
  type: "stats";
  waf: number;
  host_bytes: number;
  nand_bytes: number;
  gc_bytes: number;
  buffer_hits: number;
  host_reads: number;
  nand_reads: number;
  erase_count: number;
  free_pages: number;
  valid_pages: number;
  invalid_pages: number;
  free_superblocks: number;
  total_pages: number;
};

type SimEvent = ProgressEvent | StatsEvent | { type: "error"; message: string };

function fmt(n: number): string {
  return n.toLocaleString();
}

function fmtBytes(n: number): string {
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2)} GB`;
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(2)} KB`;
  return `${n} B`;
}

export default function SimulatorPage() {
  const [rw, setRw] = useState("randwrite");
  const [bs, setBs] = useState("8");
  const [size, setSize] = useState("65536");
  const [iodepth, setIodepth] = useState("1");
  const [numjobs, setNumjobs] = useState("1");
  const [rwmixread, setRwmixread] = useState("70");

  const [running, setRunning] = useState(false);
  const [warming, setWarming] = useState(false);
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [stats, setStats] = useState<StatsEvent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  async function handleRun() {
    setRunning(true);
    setWarming(true);
    setProgress(null);
    setStats(null);
    setError(null);

    abortRef.current = new AbortController();

    const params = new URLSearchParams({ rw, bs, size, iodepth, numjobs, rwmixread });
    const url = `${API_URL}/simulate?${params}`;

    try {
      const res = await fetch(url, { signal: abortRef.current.signal });
      if (!res.ok || !res.body) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const event: SimEvent = JSON.parse(line.slice(6));
          setWarming(false);

          if (event.type === "progress") setProgress(event);
          else if (event.type === "stats") setStats(event);
          else if (event.type === "error") setError(event.message);
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") {
        setError(e.message);
      }
    } finally {
      setRunning(false);
      setWarming(false);
    }
  }

  function handleStop() {
    abortRef.current?.abort();
    setRunning(false);
    setWarming(false);
  }

  const inputClass =
    "w-full px-3 py-2 text-sm rounded border bg-transparent focus:outline-none focus:ring-1";
  const labelClass = "text-xs font-bold uppercase tracking-widest mb-1 block";

  return (
    <div>
      <section className="pb-8">
        <h1
          className="text-4xl font-bold gradient-text leading-tight mb-2"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          SSD Simulator
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          A cycle-accurate NAND flash simulator. Configure a workload and watch WAF evolve in real
          time.
        </p>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Config form */}
      <section className="py-8">
        <h2
          className="text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Workload
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {/* rw */}
          <div>
            <label className={labelClass} style={{ color: "var(--text-muted)" }}>
              Pattern (rw)
            </label>
            <select
              value={rw}
              onChange={(e) => setRw(e.target.value)}
              disabled={running}
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <option value="write">write</option>
              <option value="read">read</option>
              <option value="randwrite">randwrite</option>
              <option value="randread">randread</option>
              <option value="randrw">randrw</option>
            </select>
          </div>

          {/* bs */}
          <div>
            <label className={labelClass} style={{ color: "var(--text-muted)" }}>
              Block Size (bs)
            </label>
            <input
              type="text"
              value={bs}
              onChange={(e) => setBs(e.target.value)}
              disabled={running}
              placeholder="e.g. 8, 4k, 1m"
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
          </div>

          {/* size */}
          <div>
            <label className={labelClass} style={{ color: "var(--text-muted)" }}>
              Total Size
            </label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              disabled={running}
              placeholder="e.g. 65536, 512m"
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
          </div>

          {/* iodepth */}
          <div>
            <label className={labelClass} style={{ color: "var(--text-muted)" }}>
              IO Depth
            </label>
            <input
              type="number"
              value={iodepth}
              onChange={(e) => setIodepth(e.target.value)}
              disabled={running}
              min={1}
              max={256}
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
          </div>

          {/* numjobs */}
          <div>
            <label className={labelClass} style={{ color: "var(--text-muted)" }}>
              Num Jobs
            </label>
            <input
              type="number"
              value={numjobs}
              onChange={(e) => setNumjobs(e.target.value)}
              disabled={running}
              min={1}
              max={16}
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
          </div>

          {/* rwmixread */}
          {rw === "randrw" && (
            <div>
              <label className={labelClass} style={{ color: "var(--text-muted)" }}>
                Read Mix %
              </label>
              <input
                type="number"
                value={rwmixread}
                onChange={(e) => setRwmixread(e.target.value)}
                disabled={running}
                min={0}
                max={100}
                className={inputClass}
                style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleRun}
            disabled={running}
            className="px-6 py-2 text-sm font-bold uppercase tracking-widest rounded transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent-1)", color: "#fff" }}
          >
            Run
          </button>
          {running && (
            <button
              onClick={handleStop}
              className="px-6 py-2 text-sm font-bold uppercase tracking-widest rounded border transition-opacity"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Stop
            </button>
          )}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Progress / live stats */}
      <section className="py-8 min-h-32">
        {warming && !progress && (
          <p className="text-sm animate-pulse" style={{ color: "var(--text-muted)" }}>
            Warming up server… (free tier may take ~30s on first run)
          </p>
        )}

        {error && (
          <p className="text-sm" style={{ color: "#FF1E63" }}>
            Error: {error}
          </p>
        )}

        {(running || progress) && !stats && progress && (
          <div>
            <div
              className="flex justify-between text-xs mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span>
                {fmt(progress.io_num)} / {fmt(progress.total_ios)} I/Os
              </span>
              <span>{progress.pct}%</span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden mb-6"
              style={{ background: "var(--surface)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress.pct}%`,
                  background: "var(--accent-1)",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Metric label="WAF" value={progress.waf.toFixed(3)} highlight />
              <Metric label="Free Superblocks" value={fmt(progress.free_sb)} />
            </div>
          </div>
        )}

        {stats && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Results
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
              <Metric label="WAF" value={stats.waf.toFixed(3)} highlight />
              <Metric label="Host Written" value={fmtBytes(stats.host_bytes)} />
              <Metric label="NAND Written" value={fmtBytes(stats.nand_bytes)} />
              <Metric label="GC Written" value={fmtBytes(stats.gc_bytes)} />
              <Metric label="Buffer Hits" value={fmt(stats.buffer_hits)} />
              <Metric label="Host Reads" value={fmt(stats.host_reads)} />
              <Metric label="Block Erases" value={fmt(stats.erase_count)} />
              <Metric label="Free Superblocks" value={fmt(stats.free_superblocks)} />
            </div>

            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              NAND State
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <Metric label="Valid Pages" value={fmt(stats.valid_pages)} />
              <Metric label="Invalid Pages" value={fmt(stats.invalid_pages)} />
              <Metric label="Free Pages" value={fmt(stats.free_pages)} />
            </div>

            {/* Page distribution bar */}
            <div className="mt-4">
              <div className="w-full h-3 rounded-full overflow-hidden flex">
                <div
                  style={{
                    width: `${(stats.valid_pages / stats.total_pages) * 100}%`,
                    background: "var(--accent-1)",
                  }}
                />
                <div
                  style={{
                    width: `${(stats.invalid_pages / stats.total_pages) * 100}%`,
                    background: "#FF1E63",
                    opacity: 0.6,
                  }}
                />
              </div>
              <div className="flex gap-4 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--accent-1)" }}>■ Valid</span>
                <span style={{ color: "#FF1E63", opacity: 0.8 }}>■ Invalid</span>
                <span>□ Free</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="p-4 rounded border"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div
        className="text-xs uppercase tracking-widest mb-1"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-bold"
        style={{ color: highlight ? "var(--accent-1)" : "var(--text-primary)" }}
      >
        {value}
      </div>
    </div>
  );
}
