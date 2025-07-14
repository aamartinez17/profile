export async function projectsScript() {

    console.log("project Nav");
    const getprojectNav = document.querySelector('.project-nav');
    if (getprojectNav) {
        // Check if listener already exists to prevent duplicates if home is reloaded
        if (!getprojectNav.hasAttribute('.nav-link')) {
            getprojectNav.addEventListener('click', (e) => {
                // console.log("Width: " + window.screen.width);
                if(window.screen.width < 992){
                    e.preventDefault(); 
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }
                
            });
        }
    }
}
