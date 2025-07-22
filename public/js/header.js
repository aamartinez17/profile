// import { setTimeout } from "timers/promises";
export async function headerscript() {
    const navbarURL = '../pages/navbar.html';
    const navbarPlaceholder = document.getElementById('navbar-Placeholder');
    const navContainer = document.getElementById('mainNavbar');
    
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
        
}


export function onNavInit() {
    setTimeout(() =>{

            const experiencePostion = document.querySelector('#experience').getBoundingClientRect().top;
        const skillPostion = document.querySelector('#skills').getBoundingClientRect().top;
        const educationPostion = document.querySelector('#education').getBoundingClientRect().top;

    window.addEventListener('scroll', function() {
        // Get the current vertical scroll position
        const scrollPosition = window.scrollY + 53;
        
            // const elementPositionInViewport = experienceElement.getBoundingClientRect().top;
            // const experience = document.querySelector('#experience');
            // const elementPositionInViewport = experience.getBoundingClientRect().top;
            console.log("scroll Location: " + scrollPosition);
            console.log("experiencePostion Location: " + experiencePostion);
            console.log("skillPostion Location: " + skillPostion);
            console.log("educationPostion Location: " + educationPostion);

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

            } else if(scrollPosition > experiencePostion-100) {
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

        },1000);
}