import { g as getEnv$1, s as setOnSetGetEnv } from './runtime_1tkDUGik.mjs';
import { Redis } from '@upstash/redis';

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const getSecret = (key) => {
	return getEnv(key);
};

setOnSetGetEnv(() => {
	
});

const redis = new Redis({
  url: getSecret("UPSTASH_REDIS_URL"),
  token: getSecret("UPSTASH_REDIS_TOKEN")
});

const prefix = "gitviews";
function normalize(input) {
  return input.toLowerCase().trim().replace(/\s+/g, "").replace(/[^a-z0-9_-]/g, "-");
}
function createUserViewsKey(username) {
  const u = normalize(username);
  return `${prefix}:user:${u}:views`;
}
function createUserRepoViewsKey(username) {
  const u = normalize(username);
  return `${prefix}:user:${u}:repo_views`;
}
function createRepoViewsKey(username, repo) {
  const u = normalize(username);
  const r = normalize(repo);
  return `${prefix}:repo:${u}:${r}:views`;
}
function createStatsKey(type) {
  const key = `${prefix}:stats:${type}:total`;
  return key;
}

export { createUserRepoViewsKey as a, createUserViewsKey as b, createRepoViewsKey as c, createStatsKey as d, redis as r };
