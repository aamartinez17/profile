let initiated = false;

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

    if(!initiated) {
        onNavInit()
        initiated = true;
    }

}

function onNavInit() {
    const margin = 53;
    const experiencePostion = document.querySelector('#experience').getBoundingClientRect().top - margin;
    const skillPostion = document.querySelector('#skills').getBoundingClientRect().top - margin;
    const educationPostion = document.querySelector('#education').getBoundingClientRect().top - margin;

    window.addEventListener('scroll', function() {
        // Get the current vertical scroll position
        const scrollPosition = window.scrollY;
        const navContainer = document.getElementById('mainNavbar');
        
            // const elementPositionInViewport = experienceElement.getBoundingClientRect().top;
            // const experience = document.querySelector('#experience');
            // const elementPositionInViewport = experience.getBoundingClientRect().top;
            // console.log("scroll Location: " + scrollPosition);
            // console.log("experiencePostion Location: " + experiencePostion);
            // console.log("skillPostion Location: " + skillPostion);
            // console.log("educationPostion Location: " + educationPostion);

            // if ((scrollPosition > experiencePostion) && navContainer.getElementsByClassName()){
            //     continue;
            // }
            const navLinks = navContainer.querySelectorAll('nav button.nav-link');

        if(document.querySelector(".home-page")){

            if(scrollPosition < experiencePostion){
                navLinks.forEach(link => {
                    if(link.value != "home"){
                        link.classList.remove('active')
                        link.removeAttribute('aria-current', 'page');
                    } else if (!link.classList.contains('active')){
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page'); // Important for accessibility
                    }
                });
            }else if(scrollPosition > educationPostion) {
                navLinks.forEach(link => {
                    if(link.value != "home#education"){
                        link.classList.remove('active')
                        link.removeAttribute('aria-current', 'page');
                    } else if (!link.classList.contains('active')){
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page'); // Important for accessibility
                    }
                });
            }else if(scrollPosition > skillPostion){
                navLinks.forEach(link => {
                    if(link.value != "home#skills"){
                        link.classList.remove('active')
                        link.removeAttribute('aria-current', 'page');
                    } else if (!link.classList.contains('active')){
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page'); // Important for accessibility
                    }
                });

            } else if(scrollPosition > experiencePostion) {
                navLinks.forEach(link => {
                    if(link.value != "home#experience"){
                        link.classList.remove('active')
                        link.removeAttribute('aria-current', 'page');
                    } else if (!link.classList.contains('active')){
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page'); // Important for accessibility
                    }
                });
            }
        }
        
    });
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