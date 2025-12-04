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

  // Validate URL to prevent SSRF attacks
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return new Response(
        "Invalid URL: Only HTTP and HTTPS protocols are allowed",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }
    
    // Block private IP ranges to prevent SSRF
    const hostname = parsedUrl.hostname.toLowerCase();
    const privateIpPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^169\.254\./,
      /^::1$/,
      /^fc00:/,
      /^fe80:/,
    ];
    
    if (privateIpPatterns.some(pattern => pattern.test(hostname))) {
      return new Response(
        "Invalid URL: Private IP addresses are not allowed",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }
  } catch (error) {
    return new Response(
      "Invalid URL format",
      {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  try {
    // Fetch JSON from the provided URL with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'GitViews-Badge/1.0',
      },
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return new Response(`Failed to fetch JSON from ${url}`, {
        status: 502,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const jsonData = await response.json();

    // Query the JSON using JSONPath with timeout protection
    const startTime = Date.now();
    const result = JSONPath({ path: query, json: jsonData });
    const queryTime = Date.now() - startTime;
    
    // Reject queries that take too long (potential DoS)
    if (queryTime > 1000) {
      return new Response(
        "Query execution time exceeded limit",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }

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
      label,
      labelColor,
      color,
      links: links.length > 0 ? links : null,
    });

    // Determine cache control with validation
    const maxAge = cacheSeconds 
      ? Math.max(0, Math.min(parseInt(cacheSeconds, 10) || 300, 86400)) 
      : 300; // Default 5 minutes, max 24 hours
    const cacheControl = `public, max-age=${maxAge}`;

    return new Response(badge, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("Error generating badge:", error);
    
    // Handle timeout errors specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response(
        "Request timeout: Failed to fetch JSON within 5 seconds",
        {
          status: 504,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }
    
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
