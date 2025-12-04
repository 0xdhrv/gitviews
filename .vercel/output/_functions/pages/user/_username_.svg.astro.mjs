import { a as incrementUserViews, g as generateBadge } from '../../chunks/user.service_CWELTnPy.mjs';
import { i as incrementTotal } from '../../chunks/stats.service_Bo3XprCO.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request, params }) => {
  const username = params.username;
  const views = await incrementUserViews(username);
  const { searchParams } = new URL(request.url);
  const style = searchParams.get("style");
  const labelColor = searchParams.get("label-color");
  const color = searchParams.get("color");
  const badge = generateBadge("Profile Views", String(views.toLocaleString()), {
    style,
    color,
    labelColor
  });
  await incrementTotal();
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
