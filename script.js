document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  function loadPage(page) {
    fetch(`Partials/${page}.html`)
      .then(res => res.text())
      .then(html => {
        content.innerHTML = html;
        window.scrollTo(0, 0);
        updateActiveLink(page);
      })
      .catch(err => console.error("Error loading page:", err));
  }

  function updateActiveLink(page) {
    document.querySelectorAll(".nav-center a").forEach(a => a.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-center a[href="#${page}"]`);
    if (activeLink) activeLink.classList.add("active");

    document.querySelectorAll(".mobile-menu a").forEach(a => a.classList.remove("active"));
    const activeLinkMobile = document.querySelector(`.mobile-menu a[href="#${page}"]`);
    if (activeLinkMobile) activeLinkMobile.classList.add("active");
  }

  // Default page
  loadPage("Subscription");
  updateActiveLink("Subscription");

  // Expose globally for buttons
  window.loadPage = loadPage;

  // Event delegation for all internal links
  document.body.addEventListener("click", e => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;
    e.preventDefault();
    const page = link.getAttribute("href").substring(1);
    loadPage(page);
  });
});

function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const backdrop = document.getElementById("mobileBackdrop");

    menu.classList.toggle("show");
    backdrop.classList.toggle("show");
}
