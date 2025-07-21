import { resumeScript } from './resume.js';
import { homeScript, scrollTo } from './home.js';
import { projectsScript } from './projects.js'

document.addEventListener('DOMContentLoaded', () => {

const contentPlaceholder = document.getElementById('content-placeholder');
const headerPlaceholder = document.getElementById('header-placeholder');
const footerPlaceholder = document.getElementById('footer-placeholder');

// Define a list of known valid page names (without .html)
// This helps prevent requests for completely unknown pages.
const VALID_PAGES = ['home', 'resume', 'projects']; // Add all your valid page names

/**
 * Updates the active state of navigation links.
 * @param {string} currentPageName - The name of the page currently being loaded.
 */
    function updateActiveNavLink(currentPageName) {
        // console.log("currentPageName: " + currentPageName);
        // Assuming 'headerPlaceholder' is the container for your dynamically loaded navbar.
        // If the navbar is static, you can select it directly with document.getElementById('mainNavbar').
        const navContainer = document.getElementById('headerPlaceholder') || document;
        // If the container isn't ready, exit.
        // console.log('test1');
        // if (!navContainer.innerHTML.trim() && navContainer.id === 'headerPlaceholder') {
        //     console.log('test1');
        //     console.warn("Header not loaded yet, cannot update active nav link.");
        //     return;
        // }
        // console.log('test1');
        const navLinks = navContainer.querySelectorAll('nav button.nav-link');
        // console.log('test1');
        navLinks.forEach(link => {
            // First, reset all links to be inactive.
            // console.log('test2');
            link.classList.remove('active');
            link.removeAttribute('aria-current');

            const href = link.value;
            const url = window.location.href;
            // console.log('url: ' + url);
            // console.log('href: ' + href);
            try {
                let linkPage = url;
                if(url.includes('/')) {
                    linkPage = url.substring(url.lastIndexOf('/') + 1);
                }

                // console.log('linkPage: ' + linkPage);
                
                if (linkPage.startsWith('/')) {
                    linkPage = linkPage.substring(1);
                }
                // 2. Remove file extension: "projects.html" -> "projects"
                linkPage = linkPage.replace('.html', '');
                
                // 3. Treat the root path as 'home' for the index page.
                if (linkPage === '' || linkPage === 'index') {
                    linkPage = 'home';
                }

                // console.log('linkPage: ' + linkPage);

                if(href === linkPage){
                    // console.log('test 2 linkPage: ' + linkPage);
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page'); // Important for accessibility
                }

            } catch (error) {
                console.error(`Could not parse href: "${href}"`, error);
            }
        });
    }

function callapseNavBar() {
// Find your main navbar and the collapsible element
    const mainNavbar = document.getElementById('mainNavbar');
    const navbarCollapse = document.getElementById('navbarNavAltMarkup');
    // console.log("callapseNavBar");

    // Get the Bootstrap 5 collapse instance
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false // We will manually trigger hide, so we set toggle to false
    });

    bsCollapse.hide();

    // // Listen for click events on the entire page
    // document.addEventListener('click', function (event) {
    //     // Check if the collapsible menu is currently shown
    //     const isMenuOpen = navbarCollapse.classList.contains('show');
    //     console.log("isMenuOpen: " + isMenuOpen);
        
    //     // Check if the element that was clicked is outside of the main navbar
    //     const isClickOutside = !mainNavbar.contains(event.target);

    //     // If the menu is open and the click was outside, hide the menu
    //     if (isMenuOpen || isClickOutside) {
    //         bsCollapse.hide();
    //     }
    // });
}

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

    const filteredPage = pageName.includes("#") ? pageName.substring(0,pageName.indexOf('#')): pageName;
    // console.log("filteredPage: " + filteredPage)
    // console.log("Loading--" + filteredPage);
    // Construct the URL for the content fragment.
    // Assume content fragments are in a 'pages' subdirectory or similar.
    // e.g., if pageName is 'contact-us', it loads 'pages/contact-us.html'
    // Adjust this logic based on how your content files are named and structured.
    const contentUrl = `../pages/${filteredPage}.html`; // Example: loads public/pages/contact-us.html


    // const filteredPage = pageName.contains("#") ? pageName.substring(0,pageName.indexOf('#')): pageName;
    // console.log("filteredPage" + filteredPage)

    if (!VALID_PAGES.includes(filteredPage)) {
        console.error(`Invalid page name requested: ${filteredPage}`);
        contentPlaceholder.innerHTML = `
            <div class="error-message" style="padding: 20px; text-align: center;">
                <p><strong>Page Not Found</strong></p>
                <p>The page you're looking for ("${filteredPage}") doesn't seem to exist.</p>
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
    // await loadHTML(contentUrl, contentPlaceholder);
    // console.log("Load HTML")
    const currentURL = window.location.pathname.substring(window.location.pathname.indexOf("/")+1);
        // console.log("URL: " + currentURL);
        // console.log("filteredPage: " + filteredPage);
        // console.log("contentPlaceholder.innerHTML.trim()" + contentPlaceholder.innerHTML.trim());

    if((filteredPage !== currentURL) || contentPlaceholder.innerHTML.trim() === ''){
        console.log("loadHTML");
        await loadHTML(contentUrl, contentPlaceholder);
    }

    callapseNavBar();
    

    if (pushToHistory) {
        // Construct the "pretty" URL for the browser's address bar
        const displayUrl = `/${pageName}`;
        document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1) + " - Profile"; // Basic title update
        history.pushState({ page: pageName }, document.title, displayUrl);
    }
    // Find the position of the '#' character
    const hashIndex = pageName.indexOf('#');
    // console.log("hashIndex: " + hashIndex);

    // Proceed only if the link has a hash and is meant for the current page
    // (We assume if it has a hash, it's for this page)
    if (hashIndex !== -1) {
        // Extract the ID from the href (e.g., '#experience')
        const targetId = pageName.substring(hashIndex);
        // console.log('targetId: ' + targetId);
        
        // Find the target element on this page
        const targetElement = document.getElementById(targetId);

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
    } else {
        window.scrollTo(0,0);
    }

    updateActiveNavLink(pageName);

    setupPageSpecificListeners(filteredPage);
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
    // path = path.replace("public/pages/", "");
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
    await loadHTML('../pages/header.html', headerPlaceholder); // Ensure header.html path is correct
    // setupNavigation(); // Setup navigation links AFTER header is loaded
    // console.log("App initialized");

    await loadHTML('../pages/footer.html', footerPlaceholder); // Ensure footer.html path is correct

    handleRoute(); // Load content based on initial URL (e.g. if user bookmarked /contact-us)

    initializeToTopButton();
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

        document.addEventListener('click', function (event) {
        
        // Check if the element that was clicked is outside of the main navbar
        const isClickOutside = !mainNavbar.contains(event.target);

        // If the menu is open and the click was outside, hide the menu
        if (isClickOutside) {
            callapseNavBar();
        }
    });


    
    // Select all links within the navigation's action-buttons div
            // const navLinks = document.querySelectorAll('.action-buttons a');

            // navLinks.forEach(link => {
            //     link.addEventListener('click', function(event) {
            //         // Get the full href attribute (e.g., "./home#experience")
            //         const href = this.getAttribute('href');
                    
            //         // Find the position of the '#' character
            //         const hashIndex = href.indexOf('#');

            //         // Proceed only if the link has a hash and is meant for the current page
            //         // (We assume if it has a hash, it's for this page)
            //         if (hashIndex !== -1) {
            //             // Extract the ID from the href (e.g., '#experience')
            //             const targetId = href.substring(hashIndex);
                        
            //             // Find the target element on this page
            //             const targetElement = document.querySelector(targetId);

            //             // If the target element exists on this page...
            //             if (targetElement) {
            //                 // ...prevent the default browser jump
            //                 event.preventDefault();

            //                 // And perform a smooth scroll to that element
            //                 targetElement.scrollIntoView({
            //                     behavior: 'smooth',
            //                     block: 'start' // Aligns the top of the element to the top of the viewport
            //                 });
            //             }
            //             // If the targetElement doesn't exist, the link will behave normally,
            //             // navigating to the 'home' page and jumping to the anchor.
            //         }
            //         // If the link has no hash (like "./resume.html"), it will navigate normally.
            //     });
            // });

}

function initializeToTopButton() {
    // console.log("button initialized");
    const toTopButton = document.getElementById('to-top-button');

    if (toTopButton) {
        
        // Listen for scroll events on the window
        window.addEventListener('scroll', () => {
            // --- Logic for showing/hiding the button ---
            if (window.scrollY > 300) {
                toTopButton.classList.add('is-visible');
            } else {
                toTopButton.classList.remove('is-visible');
            }

            // --- Logic for the fill animation based on scroll position ---
            // Calculate the maximum scrollable height
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Prevent division by zero if the page isn't scrollable
            if (scrollableHeight <= 0) {
                return;
            }

            // Calculate current scroll progress (from 0 at top to 1 at bottom)
            const scrollProgress = window.scrollY / scrollableHeight;
            
            // Invert the progress so it's 100% at the top and 0% at the bottom
            const fillAmount = scrollProgress;

            // Update the CSS custom property on the button element
            toTopButton.style.setProperty('--scroll-fill-amount', fillAmount);
        });

        // Listen for a click on the button to scroll to top
        toTopButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}


    /**
 * Initializes the filtering logic for the portfolio page.
 * This function should only be called AFTER the portfolio HTML is in the DOM.
 */


// document.addEventListener('click', function (event) {
//         // callapseNavBar();
//     });


// document.addEventListener('click', function (event) {
//         callapseNavBar();
// });

window.loadPage = loadPage; // Makes the function globally accessible


window.addEventListener('popstate', handleRoute);
// Initialize the app
initializeApp();
});