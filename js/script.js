let portfolioItems;


window.addEventListener("load", () => {
    /*-----------------  Page Loader ----------------*/
    document.querySelector(".page-loader").classList.add("slide-out-right");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 1000);
});


/*======================= Bg Animation Effect ===========*/
function bgAnimationItems() {
    const rows = 7,
        cols = 10;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = `col-${j + 1}`;
            document.querySelector(".bg-animation-effect").appendChild(div);
        }
    }
}
bgAnimationItems();




/*================= Toggle Navbar ================*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
    navToggler.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("open");
    toggleOverlayEffect();
    toggleBodyScrolling();
}

// Hide And Show Profile Img Full Width
let profileImg = document.querySelector(".preview_full-img");
let previewBtn = document.querySelector(".preview_img");
let btnCloseen = document.querySelector(".close_profile");

previewBtn.addEventListener("click", () => {
    profileImg.classList.add("show");
});
btnCloseen.addEventListener("click", () => {
    profileImg.classList.remove("show");
});



/*===============  Hide  & show Section  ==================*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        const hash = e.target.hash;

        if (e.target.classList.contains("nav-item")) {
            activeSection(hash);
            toggleNavbar();
        } else {
            toggleBodyScrolling();
            toggleOverlayEffect();
            document.querySelector(".nav-toggler").classList.add("toggle-hide");
            setTimeout(() => {
                activeSection(hash);
                toggleOverlayEffect();
                toggleBodyScrolling();
                document.querySelector(".nav-toggler").classList.remove("toggle-hide");
            }, 950);
        }
    }
});

function activeSection(sectionId) {
    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionId).classList.add("active");
    window.scrollTo(0, 0);
}


/* ============= Toggle Overlay Effect =======================*/
function toggleOverlayEffect() {
    document.querySelector(".overlay-effect").classList.toggle("active");
}


/* ============= Toggle Body Scrolling =======================*/
function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling");
}

/* ============= Filter Portfolio Items =======================*/
const filterBtnsContainer = document.querySelector(".portfolio-filter");

filterBtnsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
        filterBtnsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        toggleBodyScrolling();
        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
        setTimeout(() => {
            filterItems(e.target);
        }, 400);
        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodyScrolling();
        }, 800);
    }
});


/*=============== Filter Items when click category Buttons =================*/
function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(",");
        if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
}


// filter active category Portfolio Items
filterItems(document.querySelector(".portfolio-filter-btn.active"));


/* ============= Portfolio Item Details Popup ====================*/
let portfolioItemIndex;

document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();
    }
});

/*============= Open and Close Portfolio Popup =============*/
function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);


/*===============  Add details when click in one of items ===================*/

function portfolioItemDetails() {

    document.querySelector(".pp-thumbnail img").src = portfolioItems[ portfolioItemIndex ].querySelector("img").src;
    document.querySelector(".pp-header h3").innerHTML = portfolioItems[ portfolioItemIndex ].querySelector(".portfolio-item-title").innerHTML;
    document.querySelector(".pp-body").innerHTML = portfolioItems[ portfolioItemIndex ].querySelector(".portfolio-item-details").innerHTML;
    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex + 1} of ${portfolioItems.length} ( <span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span>)`;
}



function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[ portfolioItemIndex - 1 ].querySelector("h3").innerHTML;
        document.querySelector(".pp-footer-left img").src = portfolioItems[ portfolioItemIndex - 1 ].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }


    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[ portfolioItemIndex + 1 ].querySelector("h3").innerHTML;
        document.querySelector(".pp-footer-right img").src = portfolioItems[ portfolioItemIndex + 1 ].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

// when click in prev and next Buttons
document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});



function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }

    document.querySelector(".pp-overlay").classList.add(direction);

    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000);
}


/*=============== Toggle Contact Form ===================*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-contact-form-btn")) {
        document.querySelector(".contact-form").classList.toggle("open");
        toggleBodyScrolling();
    }
});



/*======================= Cursor Effect ===========*/
let cursor1 = document.querySelector(".cursor1");
let cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", function (e) {
    let mainCursor = document.querySelector(".cursor_parent");
    mainCursor.style.display = "block";

    cursor1.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px";
});


let anchor = document.querySelectorAll("a");
anchor.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor1.classList.add('hover2');
        cursor2.classList.add('hover1');
    }
    );
    item.addEventListener('mouseleave', () => {
        cursor1.classList.remove('hover2');
        cursor2.classList.remove('hover1');
    }
    );
});

/* ===========================================================
Color Switcher
==========================================================*/
let btns = document.querySelectorAll('.theme-buttons');
let root = document.querySelector(':root');
// Show the switcher color div
document.querySelector('.switcher-btn').onclick = () => {
    document.querySelector('.color-switcher').classList.toggle('active');
};
btns.forEach((item) => {
    item.addEventListener('click', (e) => {
        // remove All active class
        btns.forEach((item) => {
            item.classList.remove("active");
        });
        // Add Active Class To current Element
        e.currentTarget.classList.add("active");
        // Add color to Local Storage
        window.localStorage.setItem("portfolio-color", e.currentTarget.dataset.color);
        // change main color
        root.style.setProperty('--main-color', e.currentTarget.dataset.color);
        document.body.style.setProperty('--main-color', e.currentTarget.dataset.color);
    });
});
/*=============== Check Local Storage ===============*/
if (window.localStorage.getItem("portfolio-color")) {
    // [1] Add Main color to page
    root.style.setProperty('--main-color', window.localStorage.getItem("portfolio-color"));
    document.body.style.setProperty('--main-color', window.localStorage.getItem("portfolio-color"));
    // [2] Remove active class From All items
    btns.forEach((item) => {
        item.classList.remove("active");
    });
    // [3] Add active class to current color
    document.querySelector(`[data-color="${window.localStorage.getItem("portfolio-color")}"]`).classList.add("active");
}


/*======================== Make Glass Effect ======================================*/
let glassCheckbox = document.querySelector(".glass-toggle");
let glassStyle = document.querySelector(".js-glass-style");

glassCheckbox.addEventListener("click", () => {
    if (glassCheckbox.classList.contains("active")) {
        glassCheckbox.classList.remove("active");
        localStorage.setItem("glass-effect", "false");
        glassStyle.disabled = true;
    } else {
        glassCheckbox.classList.add("active");
        localStorage.setItem("glass-effect", "true");
        glassStyle.disabled = false;
    }
});


// check if glass checked in localstorage
if (localStorage.getItem("glass-effect") !== null) {
    if (localStorage.getItem("glass-effect") === "true") {

        glassCheckbox.classList.add("active");
        glassStyle.disabled = false;
        localStorage.setItem("glass-effect", "true");
    } else {
        glassCheckbox.classList.remove("active");
        glassStyle.disabled = true;
        localStorage.setItem("glass-effect", "false");
    }
}

/*=====================================
light & Dark mode 
======================================*/

let lightCheckbox = document.querySelector(".light-toggle");
let lightStyle = document.querySelector(".js-light-style");

lightCheckbox.addEventListener("click", function () {
    if (lightCheckbox.classList.contains("active")) {
        lightStyle.classList.remove("light");
        lightCheckbox.classList.remove("active");
        localStorage.setItem("light-effect", "false");

    } else {
        lightStyle.classList.add("light");
        lightCheckbox.classList.add("active");
        localStorage.setItem("light-effect", "true");

    }
});




// check if light checked in localstorage
if (localStorage.getItem("light-effect") !== null) {
    if (localStorage.getItem("light-effect") === "true") {
        lightStyle.classList.add("light");
        lightCheckbox.classList.add("active");
        localStorage.setItem("light-effect", "true");
    } else {
        lightStyle.classList.remove("light");
        lightCheckbox.classList.remove("active");
        localStorage.setItem("light-effect", "false");
    }
}

/*---------------- Show All Projects And Add Data From Json File ---------------------*/

function showProjects(data) {
    document.querySelector(".portfolio-items").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        document.querySelector(".portfolio-items").innerHTML += `
                <!-- Start portfolio items -->
                    <div class="portfolio-item show" data-category="${data[ i ].category}">
                        <div class="portfolio-item-thumbail">
                            <img src="${data[ i ].img}" alt="thumbail">
                            <button type="button" class="btn more-info-btn">more info <i class="fas fa-info-circle"></i></button>
                        </div>
                        <h3 class="portfolio-item-title">${data[ i ].title}</h3>
                        <div class="portfolio-item-details">
                            <div class="description">
                            ${data[ i ].description}
                            </div>
                            <div class="general-info">
                                <p>Created- <span>${data[ i ].date_Created}</span></p>
                                <p>Technologies Used - <span>${data[ i ].technologies}</span></p>
                                <p>Role - <span>${data[ i ].role}</span></p>
                                <p>View Live - <span><a href="${data[ i ].live}" target="_blank">${data[ i ].link_Name}</a></span></p>
                                <p>Source Code - <span><a href="${data[ i ].code}" target="_blank">${data[ i ].link_Name}</a></span></p>
                            </div>
                        </div>
                    </div>
                <!-- ../End portfolio items -->
            `;
    }
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
}

/*--------------------- Load Projects Details From Json File ---------------------*/
function getAllProjects() {
    fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            showProjects(data);
        })
        .catch(err => {
            console.log(err);
        });
}
getAllProjects();


//======================= Contact Form ====================
const FormAlert = document.querySelector("#form_alerts");
const form = document.forms[ 'form-submit' ];

// function for send form data by formspace
async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            successSubmit();
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    faildSubmit();
                    FormAlert.innerHTML = `<div class="alert alert-danger">Can't send an empty form </div>`;
                    document.querySelector(".alert").style.top = "15px";
                } else {
                    faildSubmit();
                }
            });
        }
    }).catch(error => {
        faildSubmit();
    });
}

// when clcik the form button
form.addEventListener("submit", handleSubmit);


// function for success and field when submit
function faildSubmit() {
    FormAlert.innerHTML = `<div class="alert alert-danger">Oops! There was a problem submitting your form</div>`;
    document.querySelector(".alert").style.top = "15px";
    setTimeout(() => {
        document.querySelector(".alert").style.top = "-150px";
    }, 2000);
}
function successSubmit() {
    FormAlert.innerHTML = `<div class="alert alert-success">Message Send Successfully</div>`;
    document.querySelector(".alert").style.top = "15px";
    setTimeout(() => {
        document.querySelector(".alert").style.top = "-150px";
    }, 2000);
}