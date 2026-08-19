// import { CONFIG } from "./config";

async function loadComponent(url, placeholderId) {
    const result = await fetch(url);
    const html = await result.text();
    document.getElementById(placeholderId).innerHTML = html;
}

async function start() {
    await loadComponent('./shared/navbar.html', 'navbar');
}

start();