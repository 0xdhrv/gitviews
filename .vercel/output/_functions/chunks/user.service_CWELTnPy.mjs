import { makeBadge } from 'badge-maker';
import { a as createUserRepoViewsKey, r as redis, b as createUserViewsKey } from './keys_DgPjlJxi.mjs';

const styles = ["flat", "flat-square", "for-the-badge", "social", "plastic"];
function generateBadge(label, value, options) {
  let style = "flat-square";
  if (styles.includes(options.style || "")) {
    style = options.style;
  }
  const labelColor = options.labelColor || "black";
  const color = options.color || "grey";
  const badge = makeBadge({
    style,
    labelColor,
    message: value,
    label,
    color
  });
  return badge;
}

async function incrementUserViews(username) {
  const key = createUserViewsKey(username);
  const views = await redis.incr(key);
  return views;
}
async function getUserRepoViews(username) {
  const key = createUserRepoViewsKey(username);
  const views = await redis.get(key);
  return views ?? 0;
}
async function incrementUserRepoViews(username) {
  const key = createUserRepoViewsKey(username);
  const views = await redis.incr(key);
  return views;
}

export { incrementUserViews as a, getUserRepoViews as b, generateBadge as g, incrementUserRepoViews as i };
