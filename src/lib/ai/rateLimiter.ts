/**
 * rateLimiter.ts
 * In-memory sliding-window rate limiter for Naadu AI queries.
 * Prevents denial of service and API quota exhaustion.
 */

interface RateLimitRecord {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

const DEFAULT_LIMIT = 30; // 30 requests per window
const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Checks if the incoming request key is within rate limits.
 */
export function checkRateLimit(
  key: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Periodic cleanup of stale keys
  if (rateLimitMap.size > 2000) {
    rateLimitMap.forEach((v, k) => {
      if (now - v.windowStart > windowMs) {
        rateLimitMap.delete(k);
      }
    });
  }

  if (!record || now - record.windowStart > windowMs) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: limit - 1,
      resetMs: windowMs,
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(0, windowMs - (now - record.windowStart)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetMs: Math.max(0, windowMs - (now - record.windowStart)),
  };
}

/**
 * Resets rate limit for a specific key (useful for test suites).
 */
export function resetRateLimit(key?: string) {
  if (key) {
    rateLimitMap.delete(key);
  } else {
    rateLimitMap.clear();
  }
}
