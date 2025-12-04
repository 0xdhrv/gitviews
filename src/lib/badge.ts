import { makeBadge } from "badge-maker";
import * as simpleIcons from "simple-icons";

const styles = ["flat", "flat-square", "for-the-badge", "social", "plastic"];

type Style = "flat" | "flat-square" | "for-the-badge" | "social" | "plastic";

interface Options {
  labelColor?: string | null;
  color?: string | null;
  style?: string | null;
  logo?: string | null;
  logoColor?: string | null;
  label?: string | null;
  prefix?: string | null;
  suffix?: string | null;
  links?: string[] | null;
}

export function generateBadge(
  defaultLabel: string,
  value: string,
  options: Options = {}
) {
  let style: Style = "flat";

  if (styles.includes(options.style || "")) {
    style = options.style as Style;
  }

  const label = options.label || defaultLabel;

  // Apply prefix and suffix to the value
  let message = value;
  if (options.prefix) {
    message = options.prefix + message;
  }
  if (options.suffix) {
    message = message + options.suffix;
  }

  // Handle logo
  let logoBase64: string | undefined = undefined;
  if (options.logo) {
    try {
      // Convert the logo slug to simple-icons format
      // simple-icons uses camelCase with 'si' prefix, e.g., 'github' -> 'siGithub'
      const iconKey = `si${options.logo.charAt(0).toUpperCase()}${options.logo.slice(1).replace(/-(.)/g, (_, c) => c.toUpperCase())}` as keyof typeof simpleIcons;
      const icon = simpleIcons[iconKey];
      
      if (icon && typeof icon === 'object' && 'svg' in icon) {
        // Apply logo color if specified
        let svg = icon.svg;
        if (options.logoColor) {
          // Replace the fill/path color in the SVG
          // Simple icons SVGs don't have fill attributes, so we need to add them to the path
          svg = svg.replace(/<path/g, `<path fill="${options.logoColor}"`);
        }
        logoBase64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
      }
    } catch (error) {
      // Logo not found or error, continue without it
      console.warn(`Logo '${options.logo}' not found in simple-icons`);
    }
  }

  // Build the badge format object, only including defined values
  const badgeFormat: {
    style: Style;
    message: string;
    label: string;
    labelColor?: string;
    color?: string;
    logoBase64?: string;
    links?: string[];
  } = {
    style,
    message,
    label,
  };

  if (options.labelColor) {
    badgeFormat.labelColor = options.labelColor;
  }

  if (options.color) {
    badgeFormat.color = options.color;
  }

  if (logoBase64) {
    badgeFormat.logoBase64 = logoBase64;
  }

  if (options.links && options.links.length > 0) {
    badgeFormat.links = options.links;
  }

  const badge = makeBadge(badgeFormat);

  return badge;
}
