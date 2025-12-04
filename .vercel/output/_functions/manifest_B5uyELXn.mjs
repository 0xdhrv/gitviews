import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_CX-Zeb0e.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DLnuS1mq.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/runner/work/gitviews/gitviews/","cacheDir":"file:///home/runner/work/gitviews/gitviews/node_modules/.astro/","outDir":"file:///home/runner/work/gitviews/gitviews/dist/","srcDir":"file:///home/runner/work/gitviews/gitviews/src/","publicDir":"file:///home/runner/work/gitviews/gitviews/public/","buildClientDir":"file:///home/runner/work/gitviews/gitviews/dist/client/","buildServerDir":"file:///home/runner/work/gitviews/gitviews/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/repo/[username]/[repo].svg","isIndex":false,"type":"endpoint","pattern":"^\\/repo\\/([^/]+?)\\/([^/]+?)\\.svg\\/?$","segments":[[{"content":"repo","dynamic":false,"spread":false}],[{"content":"username","dynamic":true,"spread":false}],[{"content":"repo","dynamic":true,"spread":false},{"content":".svg","dynamic":false,"spread":false}]],"params":["username","repo"],"component":"src/pages/repo/[username]/[repo].svg.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/user/[username].svg","isIndex":false,"type":"endpoint","pattern":"^\\/user\\/([^/]+?)\\.svg\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}],[{"content":"username","dynamic":true,"spread":false},{"content":".svg","dynamic":false,"spread":false}]],"params":["username"],"component":"src/pages/user/[username].svg.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/user/[username]/repos.svg","isIndex":false,"type":"endpoint","pattern":"^\\/user\\/([^/]+?)\\/repos\\.svg\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}],[{"content":"username","dynamic":true,"spread":false}],[{"content":"repos.svg","dynamic":false,"spread":false}]],"params":["username"],"component":"src/pages/user/[username]/repos.svg.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.MEWSMtHY.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/runner/work/gitviews/gitviews/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/repo/[username]/[repo].svg@_@ts":"pages/repo/_username_/_repo_.svg.astro.mjs","\u0000@astro-page:src/pages/user/[username].svg@_@ts":"pages/user/_username_.svg.astro.mjs","\u0000@astro-page:src/pages/user/[username]/repos.svg@_@ts":"pages/user/_username_/repos.svg.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B5uyELXn.mjs","/home/runner/work/gitviews/gitviews/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DNHOa2OL.mjs","/home/runner/work/gitviews/gitviews/src/components/silk":"_astro/silk.B8vZd3Uh.js","@astrojs/react/client.js":"_astro/client.geWUy5e5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-tight-cyrillic-ext-wght-normal.okcGN4Nq.woff2","/_astro/inter-tight-cyrillic-wght-normal.BS41q_Tv.woff2","/_astro/inter-tight-greek-ext-wght-normal.DQgQPNk4.woff2","/_astro/inter-tight-greek-wght-normal.sS1B39LI.woff2","/_astro/inter-tight-vietnamese-wght-normal.TKKdAiBA.woff2","/_astro/inter-tight-latin-ext-wght-normal.B4u9PlvR.woff2","/_astro/inter-tight-latin-wght-normal.DX-nOvPD.woff2","/_astro/inter-cyrillic-ext-400-italic.CsfrDhJx.woff2","/_astro/inter-cyrillic-400-italic.CIUtULAL.woff2","/_astro/inter-greek-ext-400-italic.DgljI1UR.woff2","/_astro/inter-greek-400-italic.SVIaMW7s.woff2","/_astro/inter-vietnamese-400-italic.Ceaj4WUo.woff2","/_astro/inter-latin-ext-400-italic.CGFCRmTM.woff2","/_astro/inter-latin-400-italic.D1l0FflY.woff2","/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-cyrillic-ext-500-normal.B0yAr1jD.woff2","/_astro/inter-cyrillic-500-normal.BasfLYem.woff2","/_astro/inter-greek-ext-500-normal.C4iEst2y.woff2","/_astro/inter-greek-500-normal.BIZE56-Y.woff2","/_astro/inter-vietnamese-500-normal.DOriooB6.woff2","/_astro/inter-latin-ext-500-normal.CV4jyFjo.woff2","/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_astro/inter-cyrillic-ext-500-italic.Bd19rs0I.woff2","/_astro/inter-cyrillic-500-italic.vob3PPp4.woff2","/_astro/inter-greek-ext-500-italic.CkCtILP9.woff2","/_astro/inter-greek-500-italic.CpNnphWM.woff2","/_astro/inter-vietnamese-500-italic.Ci6hLotD.woff2","/_astro/inter-latin-ext-500-italic.6uvZyJeQ.woff2","/_astro/inter-latin-500-italic.CmxAJXy_.woff2","/_astro/ibm-plex-mono-cyrillic-ext-400-normal.xuaO2J-f.woff2","/_astro/ibm-plex-mono-cyrillic-400-normal.BSMlKf0J.woff2","/_astro/ibm-plex-mono-vietnamese-400-normal.BulugwFq.woff2","/_astro/ibm-plex-mono-latin-ext-400-normal.BmRBH3aV.woff2","/_astro/ibm-plex-mono-latin-400-normal.DMJ8VG8y.woff2","/_astro/ibm-plex-mono-cyrillic-ext-400-italic.CBjNughH.woff2","/_astro/ibm-plex-mono-cyrillic-400-italic.CBJ8pzag.woff2","/_astro/ibm-plex-mono-vietnamese-400-italic.DRuN92E5.woff2","/_astro/ibm-plex-mono-latin-ext-400-italic.B7_fu1kp.woff2","/_astro/ibm-plex-mono-latin-400-italic.BqAiT5Ww.woff2","/_astro/ibm-plex-mono-cyrillic-ext-500-normal.BqneJy0T.woff2","/_astro/ibm-plex-mono-cyrillic-500-normal.Bq9vWWag.woff2","/_astro/ibm-plex-mono-vietnamese-500-normal.DZ4AoWbu.woff2","/_astro/ibm-plex-mono-latin-ext-500-normal.CAhNIIs5.woff2","/_astro/ibm-plex-mono-latin-500-normal.DSY6xOcd.woff2","/_astro/ibm-plex-mono-cyrillic-ext-500-italic.N7A9E2Yg.woff2","/_astro/ibm-plex-mono-cyrillic-500-italic.BkZTplhZ.woff2","/_astro/ibm-plex-mono-vietnamese-500-italic.B2ThFYzE.woff2","/_astro/ibm-plex-mono-latin-ext-500-italic.xMSC0T8m.woff2","/_astro/ibm-plex-mono-latin-500-italic.As4cCeDr.woff2","/_astro/inter-cyrillic-ext-400-italic.xTUDxVF8.woff","/_astro/inter-cyrillic-400-italic.DsJ3McxZ.woff","/_astro/inter-greek-ext-400-italic.ByZcx49q.woff","/_astro/inter-greek-400-italic.C1OpWafJ.woff","/_astro/inter-vietnamese-400-italic.E-DnQMHp.woff","/_astro/inter-latin-ext-400-italic.DpQ6ZOoA.woff","/_astro/inter-latin-400-italic.BmFrN47l.woff","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-cyrillic-ext-500-normal.BmqWE9Dz.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/inter-cyrillic-500-normal.CxZf_p3X.woff","/_astro/inter-greek-ext-500-normal.2j5mBUwD.woff","/_astro/inter-greek-500-normal.Xzm54t5V.woff","/_astro/inter-vietnamese-500-normal.mJboJaSs.woff","/_astro/inter-latin-ext-500-normal.BxGbmqWO.woff","/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_astro/inter-cyrillic-ext-500-italic.CjoSAfs0.woff","/_astro/inter-cyrillic-500-italic.YH_3ZzEh.woff","/_astro/inter-greek-ext-500-italic.BrEhXof8.woff","/_astro/inter-greek-500-italic.DoOKiI6j.woff","/_astro/inter-vietnamese-500-italic.BDm3lIJY.woff","/_astro/inter-latin-ext-500-italic.O82l3e5v.woff","/_astro/inter-latin-500-italic.BaBk7Nya.woff","/_astro/ibm-plex-mono-cyrillic-ext-400-normal.DMdlQ8Kv.woff","/_astro/ibm-plex-mono-cyrillic-400-normal.CEL4l2ZJ.woff","/_astro/ibm-plex-mono-vietnamese-400-normal.DDuiU_S-.woff","/_astro/ibm-plex-mono-latin-ext-400-normal.D3D2R8hC.woff","/_astro/ibm-plex-mono-latin-400-normal.CvHOgSBP.woff","/_astro/ibm-plex-mono-cyrillic-ext-400-italic.B4oTjJdl.woff","/_astro/ibm-plex-mono-cyrillic-400-italic.2syK4fUT.woff","/_astro/ibm-plex-mono-vietnamese-400-italic.D6eaYXMU.woff","/_astro/ibm-plex-mono-latin-ext-400-italic.Bg0ZHwF4.woff","/_astro/ibm-plex-mono-latin-400-italic.66oory27.woff","/_astro/ibm-plex-mono-cyrillic-ext-500-normal.BIfNGwUT.woff","/_astro/ibm-plex-mono-cyrillic-500-normal.Ael50iVv.woff","/_astro/ibm-plex-mono-vietnamese-500-normal.C8zxqsMH.woff","/_astro/ibm-plex-mono-latin-ext-500-normal.CZ70TYgx.woff","/_astro/ibm-plex-mono-latin-500-normal.CB9ihrfo.woff","/_astro/ibm-plex-mono-cyrillic-ext-500-italic.D-lPmOBg.woff","/_astro/ibm-plex-mono-cyrillic-500-italic.DweczOj8.woff","/_astro/ibm-plex-mono-vietnamese-500-italic.BBsY2dvH.woff","/_astro/ibm-plex-mono-latin-ext-500-italic.DVumefDh.woff","/_astro/ibm-plex-mono-latin-500-italic.C4MYrNFW.woff","/_astro/index.MEWSMtHY.css","/favicon.svg","/logo.svg","/og.png","/_astro/client.geWUy5e5.js","/_astro/index.Db0b2aiq.js","/_astro/silk.B8vZd3Uh.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"TMSmJrr92lws4fHIng75UsY/If8bBkPR7E5N1o5fTds="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
