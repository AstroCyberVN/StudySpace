// Root of the site, resolved from this module's own location.
// Works whether hosted at "/" (localhost live server) or under a
// sub-path like "/StudySpace/" (GitHub Pages).
export const ROOT = new URL('.', import.meta.url).href;

async function loadComponent(url, placeholderId) {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Cannot load ${url} (status ${result.status})`);
    }

    const el = document.getElementById(placeholderId);
    el.innerHTML = await result.text();
    return el;
}

// Sidebar links are written relative to the site root
// (ex: "index.html", "features/study/study.html"). Turn them into
// absolute URLs so they work from any page depth and any base path.
function fixLinks(container) {
    container.querySelectorAll('a[href]').forEach(link => {
        const raw = link.getAttribute('href');
        if (/^(https?:|mailto:|#|\/)/.test(raw)) return;

        link.href = ROOT + raw;
    });
}

function tabSelect() {
    let currentPath = window.location.pathname;
    if (currentPath.endsWith('/')) currentPath += 'index.html';

    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.classList.toggle('selected', link.pathname === currentPath);
    });
}

async function start() {
    await loadComponent(ROOT + 'shared/navbar.html', 'navbar');
    const sidebar = await loadComponent(ROOT + 'shared/sidebar.html', 'sidebar');

    fixLinks(sidebar);
    tabSelect();
}

start();