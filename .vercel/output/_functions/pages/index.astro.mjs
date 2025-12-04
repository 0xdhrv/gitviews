import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderSlot, r as renderTemplate, m as maybeRenderHead, n as renderComponent } from '../chunks/astro/server_CX-Zeb0e.mjs';
import 'piccolore';
import 'clsx';
import { s as styles } from '../chunks/index.95d291e9_BC134ZY0.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { forwardRef, useLayoutEffect, useRef, useMemo } from 'react';
import { useThree, useFrame, Canvas } from '@react-three/fiber';
import { Color } from 'three';
import { g as getTotal } from '../chunks/stats.service_Bo3XprCO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const title = Astro2.props.title ? `${Astro2.props.title} \u2014 GitViews` : "GitViews: GitHub Profile & Repo View Counter";
  const description = Astro2.props.description || "Super simple counter for your GitHub profile and project visits.";
  const og = Astro2.props.og || "/og.png";
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta content="width=device-width" name="viewport"><link href="/favicon.svg" rel="icon" type="image/svg+xml"><meta${addAttribute(Astro2.generator, "content")} name="generator"><meta content="#18181b" name="theme-color"><title>${title}</title><meta${addAttribute(title, "content")} name="title"><meta${addAttribute(description, "content")} name="description"><meta${addAttribute(title, "content")} property="og:title"><meta${addAttribute(description, "content")} property="og:description"><meta content="GitViews" property="og:site_name"><meta content="https://gitviews.com/" property="og:url"><meta content="website" property="og:type"><meta${addAttribute(`https://gitviews.com${og}`, "content")} property="og:image"><meta name="twitter:card" content="summary_large_image"><link href="/sitemap-index.xml" rel="sitemap">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/runner/work/gitviews/gitviews/src/layouts/layout.astro", void 0);

const hexToNormalizedRGB = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;
const SilkPlane = forwardRef(function SilkPlane2({ uniforms }, ref) {
  const { viewport } = useThree();
  useLayoutEffect(() => {
    const mesh = ref;
    if (mesh.current) {
      mesh.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);
  useFrame((_state, delta) => {
    const mesh = ref;
    if (mesh.current) {
      const material = mesh.current.material;
      material.uniforms.uTime.value += 0.1 * delta;
    }
  });
  return /* @__PURE__ */ jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsx("planeGeometry", { args: [1, 1, 1, 1] }),
    /* @__PURE__ */ jsx(
      "shaderMaterial",
      {
        fragmentShader,
        uniforms,
        vertexShader
      }
    )
  ] });
});
SilkPlane.displayName = "SilkPlane";
const Silk = ({
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
  scale = 1,
  speed = 5
}) => {
  const meshRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uNoiseIntensity: { value: noiseIntensity },
      uRotation: { value: rotation },
      uScale: { value: scale },
      uSpeed: { value: speed },
      uTime: { value: 0 }
    }),
    [speed, scale, noiseIntensity, color, rotation]
  );
  return /* @__PURE__ */ jsx(Canvas, { dpr: [1, 2], frameloop: "always", children: /* @__PURE__ */ jsx(SilkPlane, { ref: meshRef, uniforms }) });
};

const $$Astro = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const { views } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero" data-astro-cid-zi4ldr3x> <div class="effect" data-astro-cid-zi4ldr3x> <div class="silk" data-astro-cid-zi4ldr3x>${renderComponent($$result, "Silk", Silk, { "client:load": true, "color": "#ffffff", "client:component-hydration": "load", "client:component-path": "/home/runner/work/gitviews/gitviews/src/components/silk", "client:component-export": "Silk", "data-astro-cid-zi4ldr3x": true })}</div> <div class="overlay" data-astro-cid-zi4ldr3x></div> </div> <div class="logo-wrapper" data-astro-cid-zi4ldr3x> <img src="/logo.svg" alt="GitViews Logo" class="logo" data-astro-cid-zi4ldr3x> </div> <h1 class="title" data-astro-cid-zi4ldr3x>Simple GitHub<br data-astro-cid-zi4ldr3x>Profile and Repo<br data-astro-cid-zi4ldr3x>View Counter</h1> <p class="desc" data-astro-cid-zi4ldr3x>Completely Free & Open-Source.</p> <p class="views" data-astro-cid-zi4ldr3x> <span data-astro-cid-zi4ldr3x>${views.toString().padStart(7, "0")}</span> views counted.
</p> <div class="links" data-astro-cid-zi4ldr3x> <a href="https://github.com/remvze/gitviews" data-astro-cid-zi4ldr3x>GitHub</a> </div> </section> `;
}, "/home/runner/work/gitviews/gitviews/src/components/hero.astro", void 0);

function cn(...classNames) {
  const className = classNames.filter((className2) => !!className2).join(" ");
  return className;
}

function Container({ children, wide }) {
  return /* @__PURE__ */ jsx("div", { className: cn(styles.container, wide && styles.wide), children });
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const views = await getTotal();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", Container, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$Hero, { "views": views })} ` })} ` })}`;
}, "/home/runner/work/gitviews/gitviews/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/gitviews/gitviews/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
