// ── View tracking ──────────────────────────────────────────────────────────────

/** Number of days in the rolling view-count window (sparkline + popular posts). */
export const VIEW_WINDOW_DAYS = 30;

/** Redis TTL in seconds — kept 1 day longer than the window to avoid edge-case early expiry. */
export const VIEW_TTL_SECONDS = (VIEW_WINDOW_DAYS + 1) * 24 * 60 * 60;

// ── Post listings ──────────────────────────────────────────────────────────────

/** Number of posts shown in the Popular Posts sidebar widget. */
export const POPULAR_POSTS_COUNT = 10;

/** Number of posts shown in the Recent Posts section on the home page. */
export const RECENT_POSTS_COUNT = 5;

// ── About widget ───────────────────────────────────────────────────────────────

/** Year the blog owner started their career (used to compute years of experience). */
export const CAREER_START_YEAR = 2023;

/** Sparkline chart width in pixels. */
export const SPARKLINE_WIDTH = 110;

/** Sparkline chart height in pixels. */
export const SPARKLINE_HEIGHT = 48;

// ── Search ─────────────────────────────────────────────────────────────────────

/** Fuse.js fuzzy-match threshold: 0 = exact, 1 = match anything. */
export const SEARCH_FUZZY_THRESHOLD = 0.4;

// ── UI / Scroll ────────────────────────────────────────────────────────────────

/** Scroll distance in pixels before the Back to Top button appears. */
export const BACK_TO_TOP_THRESHOLD_PX = 400;

// ── Cache / Cookies ────────────────────────────────────────────────────────────

/** Language preference cookie lifetime in seconds (1 year). */
export const LANG_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

/** RSS feed HTTP cache max-age in seconds (1 hour). */
export const RSS_CACHE_MAX_AGE_SECONDS = 60 * 60;
