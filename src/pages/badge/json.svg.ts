export const prerender = false;

import type { APIRoute } from "astro";
import { JSONPath } from "jsonpath-plus";
import { generateBadge } from "@/lib/badge";

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  // Required parameters
  const url = searchParams.get("url");
  const query = searchParams.get("query");

  if (!url || !query) {
    return new Response(
      "Missing required parameters: url and query are required",
      {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  try {
    // Fetch JSON from the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      return new Response(`Failed to fetch JSON from ${url}`, {
        status: 502,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const jsonData = await response.json();

    // Query the JSON using JSONPath
    const result = JSONPath({ path: query, json: jsonData });

    if (!result || result.length === 0) {
      return new Response(`No results found for query: ${query}`, {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // Get the first result and convert to string
    const value = String(result[0]);

    // Optional parameters
    const prefix = searchParams.get("prefix");
    const suffix = searchParams.get("suffix");
    const style = searchParams.get("style");
    const logo = searchParams.get("logo");
    const logoColor = searchParams.get("logoColor");
    const logoSize = searchParams.get("logoSize");
    const label = searchParams.get("label");
    const labelColor = searchParams.get("labelColor");
    const color = searchParams.get("color");
    const cacheSeconds = searchParams.get("cacheSeconds");
    const links = searchParams.getAll("link");

    // Generate the badge
    const badge = generateBadge("value", value, {
      prefix,
      suffix,
      style,
      logo,
      logoColor,
      logoSize,
      label,
      labelColor,
      color,
      links: links.length > 0 ? links : null,
    });

    // Determine cache control
    const maxAge = cacheSeconds ? parseInt(cacheSeconds, 10) : 300; // Default 5 minutes
    const cacheControl = `public, max-age=${maxAge}`;

    return new Response(badge, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("Error generating badge:", error);
    return new Response(
      `Error generating badge: ${error instanceof Error ? error.message : "Unknown error"}`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
};
