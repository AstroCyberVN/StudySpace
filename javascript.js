// import { CONFIG } from "./config";

function tabSelect() {
    const currentPath = window.location.pathname;

    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.classList.toggle('selected', link.pathname == currentPath)
    })
}

async function loadComponent(url, placeholderId) {
    const result = await fetch(url);
    const html = await result.text();
    document.getElementById(placeholderId).innerHTML = html;
}

async function start() {
    await loadComponent('./shared/navbar.html', 'navbar');
    await loadComponent('./shared/sidebar.html', 'sidebar');

    tabSelect();
}

start();