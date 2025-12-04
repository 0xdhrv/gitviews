export const prerender = false;

import type { APIRoute } from "astro";

import { generateBadge } from "@/lib/badge";
import { incrementUserViews } from "@/services/user.service";
import { incrementTotal } from "@/services/stats.service";

export const GET: APIRoute = async ({ request, params }) => {
  const username = params.username!;
  const views = await incrementUserViews(username);

  const { searchParams } = new URL(request.url);

  const style = searchParams.get("style");
  const labelColor = searchParams.get("labelColor") || searchParams.get("label-color");
  const color = searchParams.get("color");
  const logo = searchParams.get("logo");
  const logoColor = searchParams.get("logoColor");
  const label = searchParams.get("label");
  const prefix = searchParams.get("prefix");
  const suffix = searchParams.get("suffix");
  const links = searchParams.getAll("link");

  const badge = generateBadge("Profile Views", String(views.toLocaleString()), {
    style,
    color,
    labelColor,
    logo,
    logoColor,
    label,
    prefix,
    suffix,
    links: links.length > 0 ? links : null,
  });

  await incrementTotal();

  // Determine cache control
  const cacheSecondsParam = searchParams.get("cacheSeconds");
  const maxAge = cacheSecondsParam 
    ? Math.max(0, Math.min(parseInt(cacheSecondsParam, 10) || 0, 86400)) 
    : 0; // Max 24 hours
  const cacheControl =
    maxAge > 0 ? `public, max-age=${maxAge}` : "no-cache, no-store, must-revalidate";

  return new Response(badge, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": cacheControl,
      Pragma: maxAge > 0 ? "" : "no-cache",
      Expires: maxAge > 0 ? "" : "0",
    },
  });
};
