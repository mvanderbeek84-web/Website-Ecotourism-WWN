/* Always open at the top of the page (no restored scroll position, no #section jump) */
(function () {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  function top() { window.scrollTo(0, 0); }
  top();
  window.addEventListener("DOMContentLoaded", top);
  window.addEventListener("load", function () { top(); setTimeout(top, 0); });
  window.addEventListener("pageshow", function (e) { if (e.persisted) top(); });
})();

/* Search engines: the Spanish page (?lang=es) and English page (?lang=en) each point to themselves */
(function () {
  var q = new URLSearchParams(location.search).get("lang");
  if (q !== "en" && q !== "es") return;
  var c = document.querySelector('link[rel="canonical"]');
  if (c) c.href = c.href.split("?")[0] + "?lang=" + q;
})();

/* Photos: if a light AVIF version is missing, fall back to the JPG (works for every <picture> on the page) */
window.addEventListener("error", function (e) {
  var img = e.target, pic = img && img.parentNode;
  if (!img || img.tagName !== "IMG" || !pic || pic.tagName !== "PICTURE") return;
  var s = pic.querySelectorAll("source");
  for (var i = 0; i < s.length; i++) pic.removeChild(s[i]);
}, true);
