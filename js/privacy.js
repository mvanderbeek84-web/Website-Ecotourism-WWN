/* Privacy page: show English or Spanish (same choice as the main page) */
(function () {
  var q = new URLSearchParams(location.search).get("lang"), lang = "en";
  if (q === "en" || q === "es") lang = q;
  else { try { var s = localStorage.getItem("wwn-lang"); if (s === "en" || s === "es") lang = s; } catch (e) {} }
  function show(l) {
    lang = l; document.documentElement.lang = l;
    document.querySelectorAll("[data-lang]").forEach(function (el) { el.hidden = el.getAttribute("data-lang") !== l; });
    document.title = l === "es" ? "Declaración de privacidad · Fundación Work with Nature" : "Privacy statement · Fundación Work with Nature";
    var back = document.getElementById("back"); if (back) back.href = "index.html?lang=" + l;
  }
  document.getElementById("switch").addEventListener("click", function () {
    show(lang === "en" ? "es" : "en");
    try { localStorage.setItem("wwn-lang", lang); } catch (e) {}
  });
  show(lang);
})();
