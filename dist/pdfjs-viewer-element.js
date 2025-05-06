const y = (p, t) => new Promise((o) => {
  let s = t.querySelector(p);
  s ? o(s) : new MutationObserver((r, e) => {
    Array.from(t.querySelectorAll(p)).forEach((i) => {
      o(i), e.disconnect();
    });
  }).observe(t, { childList: !0, subtree: !0 });
}), T = { trailing: !0 }, S = "/pdfjs", D = "/web/viewer.html", A = "", k = "", C = "", P = "", R = "", V = "none", F = "", O = "", L = "", I = "", j = "", q = "", M = "", W = "", v = "AUTOMATIC", x = "", z = "", H = "", b = { AUTOMATIC: 0, LIGHT: 1, DARK: 2 }, N = ["src", "viewer-path", "disable-worker", "text-layer", "disable-font-face", "disable-range", "disable-stream", "disable-auto-fetch", "verbosity", "locale", "viewer-css-theme", "viewer-extra-styles", "viewer-extra-styles-urls"];
class $ extends HTMLElement {
  constructor() {
    super(), this.onIframeReady = function(s, r = 25, e = {}) {
      if (e = { ...T, ...e }, !Number.isFinite(r)) throw new TypeError("Expected `wait` to be a finite number");
      let i, n, a, l, h = [];
      const f = (c, m) => (a = async function(d, u, w) {
        return await d.apply(u, w);
      }(s, c, m), a.finally(() => {
        if (a = null, e.trailing && l && !n) {
          const d = f(c, l);
          return l = null, d;
        }
      }), a);
      return function(...c) {
        return a ? (e.trailing && (l = c), a) : new Promise((m) => {
          const d = !n && e.leading;
          clearTimeout(n), n = setTimeout(() => {
            n = null;
            const u = e.leading ? i : f(this, c);
            for (const w of h) w(u);
            h = [];
          }, r), d ? (i = f(this, c), m(i)) : h.push(m);
        });
      };
    }(async (s) => {
      await y("iframe", this.shadowRoot), s();
    }, 0, { leading: !0 }), this.setViewerExtraStyles = (s, r = "extra") => {
      var i, n, a, l, h;
      if (!s) return void ((n = (i = this.iframe.contentDocument) == null ? void 0 : i.head.querySelector(`style[${r}]`)) == null ? void 0 : n.remove());
      if (((l = (a = this.iframe.contentDocument) == null ? void 0 : a.head.querySelector(`style[${r}]`)) == null ? void 0 : l.innerHTML) === s) return;
      const e = document.createElement("style");
      e.innerHTML = s, e.setAttribute(r, ""), (h = this.iframe.contentDocument) == null || h.head.appendChild(e);
    }, this.injectExtraStylesLinks = (s) => {
      s && s.replace(/'|]|\[/g, "").split(",").map((r) => r.trim()).forEach((r) => {
        var n, a;
        if ((n = this.iframe.contentDocument) == null ? void 0 : n.head.querySelector(`link[href="${r}"]`)) return;
        const i = document.createElement("link");
        i.rel = "stylesheet", i.href = r, (a = this.iframe.contentDocument) == null || a.head.appendChild(i);
      });
    }, this.initialize = () => new Promise(async (s) => {
      var r;
      await y("iframe", this.shadowRoot), (r = this.iframe) == null || r.addEventListener("load", async () => {
        var e, i, n;
        await ((i = (e = this.iframe.contentWindow) == null ? void 0 : e.PDFViewerApplication) == null ? void 0 : i.initializedPromise), s((n = this.iframe.contentWindow) == null ? void 0 : n.PDFViewerApplication);
      }, { once: !0 });
    });
    const t = this.attachShadow({ mode: "open" }), o = document.createElement("template");
    o.innerHTML = `
      <style>:host{width:100%;display:block;overflow:hidden}:host iframe{height:100%;display:block;margin-top:-60px;}</style>
      <iframe frameborder="0" width="100%" loading="lazy"></iframe>
    `, t.appendChild(o.content.cloneNode(!0));
  }
  static get observedAttributes() {
    return ["src", "viewer-path", "page", "search", "phrase", "zoom", "pagemode", "disable-worker", "text-layer", "disable-font-face", "disable-range", "disable-stream", "disable-auto-fetch", "verbosity", "locale", "viewer-css-theme", "viewer-extra-styles", "viewer-extra-styles-urls", "nameddest"];
  }
  connectedCallback() {
    this.iframe = this.shadowRoot.querySelector("iframe"), document.addEventListener("webviewerloaded", async () => {
      var t, o, s, r, e, i, n, a;
      this.setCssTheme(this.getCssThemeOption()), this.injectExtraStylesLinks(this.getAttribute("viewer-extra-styles-urls") ?? z), this.setViewerExtraStyles(this.getAttribute("viewer-extra-styles") ?? x), this.getAttribute("src") !== A && ((o = (t = this.iframe.contentWindow) == null ? void 0 : t.PDFViewerApplicationOptions) == null || o.set("defaultUrl", "")), (r = (s = this.iframe.contentWindow) == null ? void 0 : s.PDFViewerApplicationOptions) == null || r.set("disablePreferences", !0), (i = (e = this.iframe.contentWindow) == null ? void 0 : e.PDFViewerApplicationOptions) == null || i.set("pdfBugEnabled", !0), (a = (n = this.iframe.contentWindow) == null ? void 0 : n.PDFViewerApplicationOptions) == null || a.set("eventBusDispatchToDOM", !0);
    });
  }
  attributeChangedCallback(t) {
    N.includes(t) ? this.onIframeReady(() => this.mountViewer(this.getIframeSrc())) : this.onIframeReady(() => {
      this.iframe.src = this.getIframeSrc();
    });
  }
  getIframeSrc() {
    const t = this.getFullPath(this.getAttribute("src") || A), o = this.getFullPath(this.getAttribute("viewer-path") || S), s = this.getAttribute("page") || k, r = this.getAttribute("search") || C, e = this.getAttribute("phrase") || P, i = this.getAttribute("zoom") || R, n = this.getAttribute("pagemode") || V, a = this.getAttribute("disable-worker") || O, l = this.getAttribute("text-layer") || L, h = this.getAttribute("disable-font-face") || I, f = this.getAttribute("disable-range") || j, c = this.getAttribute("disable-stream") || q, m = this.getAttribute("disable-auto-fetch") || M, d = this.getAttribute("verbosity") || W, u = this.getAttribute("locale") || F, w = this.getAttribute("viewer-css-theme") || v, E = !!(this.getAttribute("viewer-extra-styles") || x), g = this.getAttribute("nameddest") || H;
    return `
${o}${D}?file=
${encodeURIComponent(t)}#page=${s}&zoom=${i}&pagemode=${n}&search=${r}&phrase=${e}&textLayer=
${l}&disableWorker=
${a}&disableFontFace=
${h}&disableRange=
${f}&disableStream=
${c}&disableAutoFetch=
${m}&verbosity=
${d}
${u ? "&locale=" + u : ""}&viewerCssTheme=
${w}&viewerExtraStyles=
${E}
${g ? "&nameddest=" + g : ""}`;
  }
  mountViewer(t) {
    t && this.iframe && (this.shadowRoot.replaceChild(this.iframe.cloneNode(), this.iframe), this.iframe = this.shadowRoot.querySelector("iframe"), this.iframe.src = t);
  }
  getFullPath(t) {
    return t.startsWith("/") ? `${window.location.origin}${t}` : t;
  }
  getCssThemeOption() {
    const t = this.getAttribute("viewer-css-theme");
    return Object.keys(b).includes(t) ? b[t] : b[v];
  }
  setCssTheme(t) {
    var o, s, r;
    if (t === b.DARK) {
      const e = (o = this.iframe.contentDocument) == null ? void 0 : o.styleSheets[0], i = (e == null ? void 0 : e.cssRules) || [], n = Object.keys(i).filter((a) => {
        var l;
        return ((l = i[Number(a)]) == null ? void 0 : l.conditionText) === "(prefers-color-scheme: dark)";
      }).map((a) => i[Number(a)].cssText.split(`@media (prefers-color-scheme: dark) {
`)[1].split(`
}`)[0]);
      this.setViewerExtraStyles(n.join(""), "theme");
    } else (r = (s = this.iframe.contentDocument) == null ? void 0 : s.head.querySelector("style[theme]")) == null || r.remove();
  }
}
window.customElements.get("pdfjs-viewer-element") || (window.PdfjsViewerElement = $, window.customElements.define("pdfjs-viewer-element", $));
export {
  $ as PdfjsViewerElement,
  b as ViewerCssTheme,
  $ as default,
  N as hardRefreshAttributes
};
