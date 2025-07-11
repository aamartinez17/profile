export async function homeScript() {
    const navbarURL = '../pages/navbar.html';
    const navbarPlaceholder = document.getElementById('navbar-Placeholder');
    
    try {
    // console.log("URL: " + navbarURL);
    const response = await fetch(navbarURL);
    if (!response.ok) {
        throw new Error(`Network response was not ok for ${navbarURL}: ${response.statusText} (status ${response.status})`);
    }
    const html = await response.text();
    // console.log("navbarPlaceholder: " + navbarPlaceholder);
    navbarPlaceholder.innerHTML = html;
    } catch (error) {
        console.error(`Error fetching ${navbarURL}:`, error);
        element.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    }
}