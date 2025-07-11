// import * as pdfjsLib from "pdfjs";
export async function resumeScript() {
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

    const resumeURL = '../img/Resume 05102025.pdf'; // IMPORTANT: Make sure this PDF file is in the same folder.
        console.log("resumeURL: " + resumeURL);
        console.log("pdfjsLib: " + pdfjsLib);




            // --- PDF.js Script ---

        // UPDATED: Set worker path to the local file from your npm package.
        // This requires your project to be served by a local server that can access node_modules.
        // pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js'

        // pdfjsLib.GlobalWorkerOptions.workerSrc = "../../";
        // const url = '../img/Resume 05102025.pdf'; // IMPORTANT: Make sure this PDF file is in the same folder.
        console.log("resumeURL: " + resumeURL);

        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null;

        const scale = 1.5,
              canvas = document.getElementById('pdf-canvas'),
              ctx = canvas.getContext('2d'),
              loader = document.getElementById('loader');

        // Render the page
        const renderPage = num => {
            pageIsRendering = true;

            // Get page
            pdfDoc.getPage(num).then(page => {
                // Set scale
                const viewport = page.getViewport({ scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport
                };

                page.render(renderCtx).promise.then(() => {
                    pageIsRendering = false;
                    loader.style.display = 'none'; // Hide loader after first render
                    canvas.style.display = 'block';

                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });

                // Output current page
                document.getElementById('page-num').textContent = num;
            });
        };

        // Check for pages rendering
        const queueRenderPage = num => {
            if (pageIsRendering) {
                pageNumIsPending = num;
            } else {
                renderPage(num);
            }
        };

        // Show previous page
        const showPrevPage = () => {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        };

        // Show next page
        const showNextPage = () => {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        };

        // Get Document
        pdfjsLib.getDocument(resumeURL).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            // document.getElementById('page-count').textContent = pdfDoc.numPages;
            renderPage(1);
        }).catch(err => {
            // Display error
            loader.innerHTML = `<div class="alert alert-danger">Error: Could not load PDF. Make sure "Resume 05102025.pdf" is in the correct folder.</div>`;
        });

        // Button Events
        document.getElementById('prev-page').addEventListener('click', showPrevPage);
        document.getElementById('next-page').addEventListener('click', showNextPage);
}