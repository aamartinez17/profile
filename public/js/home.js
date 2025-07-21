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

// // Select all links within the navigation's action-buttons div
//             const navLinks = document.querySelectorAll('.action-buttons a');

//             navLinks.forEach(link => {
//                 link.addEventListener('click', function(event) {
//                     // Get the full href attribute (e.g., "./home#experience")
//                     const href = this.getAttribute('href');
                    
//                     // Find the position of the '#' character
//                     const hashIndex = href.indexOf('#');

//                     // Proceed only if the link has a hash and is meant for the current page
//                     // (We assume if it has a hash, it's for this page)
//                     if (hashIndex !== -1) {
//                         // Extract the ID from the href (e.g., '#experience')
//                         const targetId = href.substring(hashIndex);
                        
//                         // Find the target element on this page
//                         const targetElement = document.querySelector(targetId);

//                         // If the target element exists on this page...
//                         if (targetElement) {
//                             // ...prevent the default browser jump
//                             event.preventDefault();

//                             // And perform a smooth scroll to that element
//                             targetElement.scrollIntoView({
//                                 behavior: 'smooth',
//                                 block: 'start' // Aligns the top of the element to the top of the viewport
//                             });
//                         }
//                         // If the targetElement doesn't exist, the link will behave normally,
//                         // navigating to the 'home' page and jumping to the anchor.
//                     }
//                     // If the link has no hash (like "./resume.html"), it will navigate normally.
//                 });
//             });
}

export async function scrollTo() {

    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    // console.log("hashIndex: " + hashIndex);
    if (hashIndex !== -1) {
        // Extract the ID from the href (e.g., '#experience')
        const targetId = currentUrl.substring(hashIndex);
        // console.log("targetId: " + targetId);
        // Find the target element on this page
        const targetElement = document.querySelector(targetId);
        // console.log("targetElement :" + targetElement);

        // If the target element exists on this page...
        if (targetElement) {
            // ...prevent the default browser jump
            // event.preventDefault();

            // And perform a smooth scroll to that element
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Aligns the top of the element to the top of the viewport
            });
        }
        // If the targetElement doesn't exist, the link will behave normally,
        // navigating to the 'home' page and jumping to the anchor.
    }
}