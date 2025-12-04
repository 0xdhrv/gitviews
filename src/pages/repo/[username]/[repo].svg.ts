export const prerender = false;

import type { APIRoute } from "astro";

import { generateBadge } from "@/lib/badge";
import { incrementRepoViews } from "@/services/repo.service";
import { incrementUserRepoViews } from "@/services/user.service";
import { incrementTotal } from "@/services/stats.service";

export const GET: APIRoute = async ({ params, request }) => {
  const username = params.username!;
  const repo = params.repo!;
  const views = await incrementRepoViews(username, repo);

  const { searchParams } = new URL(request.url);
  const style = searchParams.get("style");
  const labelColor = searchParams.get("labelColor") || searchParams.get("label-color");
  const color = searchParams.get("color");
  const logo = searchParams.get("logo");
  const logoColor = searchParams.get("logoColor");
  const logoSize = searchParams.get("logoSize");
  const label = searchParams.get("label");
  const prefix = searchParams.get("prefix");
  const suffix = searchParams.get("suffix");
  const cacheSeconds = searchParams.get("cacheSeconds");
  const links = searchParams.getAll("link");

  const badge = generateBadge("Repo Views", String(views.toLocaleString()), {
    style,
    color,
    labelColor,
    logo,
    logoColor,
    logoSize,
    label,
    prefix,
    suffix,
    links: links.length > 0 ? links : null,
  });

  await Promise.all([incrementUserRepoViews(username), incrementTotal()]);

  // Determine cache control
  const maxAge = cacheSeconds ? parseInt(cacheSeconds, 10) : 0;
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
