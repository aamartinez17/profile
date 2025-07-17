export async function projectsScript() {

const projectNav = document.querySelector('.project-nav');
    const tabContentContainer = document.querySelector('.tab-content');

    // Make sure both the navigation and the content elements exist
    if (projectNav && tabContentContainer) {
        
        projectNav.addEventListener('click', function(event) {
            // We only want to run this code if a nav-link button was clicked
            if (event.target.matches('.nav-link')) {

                // Check if the screen is mobile-sized (less than 992px, like Bootstrap's 'lg' breakpoint)
                if (true) {
                    
                    // We use a short delay to ensure the click event has time to
                    // trigger the tab change before we scroll.
                    setTimeout(() => {
                        // Calculate the position of the tab content area from the top of the page
                        const topPosition = tabContentContainer.getBoundingClientRect().top + window.scrollY;

                        // Scroll smoothly to just above the tab content area
                        window.scrollTo({
                            top: topPosition - 70,
                            behavior: 'smooth'
                        });
                    }, 150); // A 150ms delay is usually enough
                }
            }
        });
    }
}
