import { g as generateBadge, i as incrementUserRepoViews } from '../../../chunks/user.service_CWELTnPy.mjs';
import { c as createRepoViewsKey, r as redis } from '../../../chunks/keys_DgPjlJxi.mjs';
import { i as incrementTotal } from '../../../chunks/stats.service_Bo3XprCO.mjs';
export { renderers } from '../../../renderers.mjs';

async function incrementRepoViews(username, repo) {
  const key = createRepoViewsKey(username, repo);
  const views = await redis.incr(key);
  return views;
}

const prerender = false;
const GET = async ({ params, request }) => {
  const username = params.username;
  const repo = params.repo;
  const views = await incrementRepoViews(username, repo);
  const { searchParams } = new URL(request.url);
  const style = searchParams.get("style");
  const labelColor = searchParams.get("label-color");
  const color = searchParams.get("color");
  const badge = generateBadge("Repo Views", String(views.toLocaleString()), {
    style,
    color,
    labelColor
  });
  await Promise.all([incrementUserRepoViews(username), incrementTotal()]);
  return new Response(badge, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
