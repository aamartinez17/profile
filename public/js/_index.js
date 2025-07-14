import { resumeScript } from './resume.js';
import { homeScript, scrollTo } from './home.js';
import { projectsScript } from './projects.js'

document.addEventListener('DOMContentLoaded', () => {

const contentPlaceholder = document.getElementById('content-placeholder');
// const headerPlaceholder = document.getElementById('header-placeholder');
const footerPlaceholder = document.getElementById('footer-placeholder');

// Define a list of known valid page names (without .html)
// This helps prevent requests for completely unknown pages.
const VALID_PAGES = ['home', 'resume', 'projects']; // Add all your valid page names

/**
 * Updates the active state of navigation links.
 * @param {string} currentPageName - The name of the page currently being loaded.
 */
// function updateActiveNavLink(currentPageName) {
//     if (!headerPlaceholder.innerHTML.trim()) {
//         console.warn("Header not loaded yet, cannot update active nav link.");
//         return;
//     }
//     const navLinks = headerPlaceholder.querySelectorAll('nav a.nav-link'); // Be specific with .nav-link
//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         link.removeAttribute('aria-current');

//         // Extract pageName from this link's href to compare
//         let linkPageName = link.getAttribute('href').startsWith('/') ? link.getAttribute('href').substring(1) : link.getAttribute('href');
//         linkPageName = linkPageName.replace('.html', '');
//         if (linkPageName === '' || linkPageName === 'index') linkPageName = 'home';

//         if (linkPageName === currentPageName) {
//             link.classList.add('active');
//             link.setAttribute('aria-current', 'page'); // Important for accessibility
//             // console.log(`Set active link: ${currentPageName}`);
//         }
//     });
// }


    // Function to fetch and inject HTML content
async function loadHTML(url, element) {
    try {
        // console.log("URL: " + url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok for ${url}: ${response.statusText} (status ${response.status})`);
        }
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        element.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    }
}

    // Function to load page content based on URL and update history
async function loadPage(pageName, pushToHistory = true) {
    console.log("Loading--" + pageName);
    // Construct the URL for the content fragment.
    // Assume content fragments are in a 'pages' subdirectory or similar.
    // e.g., if pageName is 'contact-us', it loads 'pages/contact-us.html'
    // Adjust this logic based on how your content files are named and structured.
    const contentUrl = `../pages/${pageName}.html`; // Example: loads public/pages/contact-us.html

    // updateActiveNavLink(pageName);

    if (!VALID_PAGES.includes(pageName)) {
        console.error(`Invalid page name requested: ${pageName}`);
        contentPlaceholder.innerHTML = `
            <div class="error-message" style="padding: 20px; text-align: center;">
                <p><strong>Page Not Found</strong></p>
                <p>The page you're looking for ("${pageName}") doesn't seem to exist.</p>
                <p><a href="/">Go to Homepage</a></p>
            </div>`;
        // Optionally update history to reflect the error or redirect
        if (pushToHistory) {
            document.title = "Page Not Found - Profile";
            // Consider what URL to show for a client-side 404
            // history.pushState({ error: '404', page: normalizedPageName }, document.title, `/${normalizedPageName}`);
        }
        return; // Stop further execution
    }
    // console.log(`Loading content from: ${contentUrl}`);
    await loadHTML(contentUrl, contentPlaceholder);
    // console.log("Load HTML")
    window.scrollTo(0,0);
    

    if (pushToHistory) {
        // Construct the "pretty" URL for the browser's address bar
        const displayUrl = `/${pageName}`;
        document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1) + " - Profile"; // Basic title update
        history.pushState({ page: pageName }, document.title, displayUrl);
    }

    setupPageSpecificListeners(pageName)
}

async function setupPageSpecificListeners(pageName) {

    // console.log("setupPageSpecificListeners: " + pageName);

    if(pageName === "home"){
        initializeNav();
        await homeScript();
        scrollTo();
    }

    if(pageName === "resume"){
        initializeNav();
        resumeScript();
    }

    if(pageName === 'projects') {
        initializeNav();
        projectsScript();
    }
}

// Function to handle routing based on the current path
function handleRoute() {
    let path = window.location.pathname;
    // Remove leading slash and .html extension for consistency
    path = path.startsWith('/') ? path.substring(1) : path;
    // console.log("path: " + path);
    path = path.replace('.html', '');
    if (path === '' || path === '_index') {
        path = 'home'; // Default page
    }

    loadPage(path, false); // false because we are just loading based on current URL, not a new navigation
}

// --- Initial Page Load ---
async function initializeApp() {
    // await loadHTML('../pages/header.html', headerPlaceholder); // Ensure header.html path is correct
    // setupNavigation(); // Setup navigation links AFTER header is loaded
    console.log("App initialized");

    await loadHTML('../pages/footer.html', footerPlaceholder); // Ensure footer.html path is correct

    handleRoute(); // Load content based on initial URL (e.g. if user bookmarked /contact-us)

    // initializeToTopButton();
}

// --- Handle Browser Back/Forward Buttons ---
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        loadPage(event.state.page, false); // Load content, don't push to history
    } else {
        // If no state, try to derive from location (e.g., for initial load or external links)
        handleRoute();
    }
});

async function initializeNav() {

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
    // Select all links within the navigation's action-buttons div
            const navLinks = document.querySelectorAll('.action-buttons a');

            navLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    // Get the full href attribute (e.g., "./home#experience")
                    const href = this.getAttribute('href');
                    
                    // Find the position of the '#' character
                    const hashIndex = href.indexOf('#');

                    // Proceed only if the link has a hash and is meant for the current page
                    // (We assume if it has a hash, it's for this page)
                    if (hashIndex !== -1) {
                        // Extract the ID from the href (e.g., '#experience')
                        const targetId = href.substring(hashIndex);
                        
                        // Find the target element on this page
                        const targetElement = document.querySelector(targetId);

                        // If the target element exists on this page...
                        if (targetElement) {
                            // ...prevent the default browser jump
                            event.preventDefault();

                            // And perform a smooth scroll to that element
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start' // Aligns the top of the element to the top of the viewport
                            });
                        }
                        // If the targetElement doesn't exist, the link will behave normally,
                        // navigating to the 'home' page and jumping to the anchor.
                    }
                    // If the link has no hash (like "./resume.html"), it will navigate normally.
                });
            });

}


    /**
 * Initializes the filtering logic for the portfolio page.
 * This function should only be called AFTER the portfolio HTML is in the DOM.
 */


// document.addEventListener('click', function (event) {
//         // callapseNavBar();
//     });



window.addEventListener('popstate', handleRoute);
// Initialize the app
initializeApp();
});