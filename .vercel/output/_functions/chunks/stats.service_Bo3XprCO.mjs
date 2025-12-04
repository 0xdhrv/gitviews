import { r as redis, d as createStatsKey } from './keys_DgPjlJxi.mjs';

async function incrementTotal() {
  const key = createStatsKey("views");
  const total = await redis.incr(key);
  return total;
}
async function getTotal() {
  const key = createStatsKey("views");
  const total = redis.get(key);
  return total ?? 0;
}

export { getTotal as g, incrementTotal as i };
