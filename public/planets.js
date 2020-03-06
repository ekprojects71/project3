//DOM Queries
const planets = document.querySelector(".options");
const jumboImg = document.querySelector(".planet-jumbo-img img");
const jumboLabel = document.querySelector(".planet-jumbo-label span");
const summary = document.querySelector(".overview-left");
const imgGallery = document.querySelector(".or-gallery");
const planetHeadline = document.querySelector(".fh-planet");
const surfaceImg = document.querySelector(".fb-right");
const overviewPts = document.querySelector(".ov-pts");
const mainFeatures = document.querySelector(".mf-pts");
const otherFacts = document.querySelector(".of-pts");
const imgModal = document.querySelector(".img-modal");
const hamMenu = document.querySelector(".hamburger");
const navBottom = document.querySelector(".nav-bottom");
const scrollTop = document.querySelector(".scroll-top");

//HTML Template functions
const buildJumbo = (planet) => {
    jumboImg.setAttribute("src", `images/${planet.name.toLowerCase()}/${planet.name.toLowerCase()}.png`);
    jumboLabel.innerText = planet.name;
};
const buildSummary = (planet) => {
    summary.querySelector(".ol-heading span").innerText = planet.heading.title;
    summary.querySelector(".ol-summary span").innerText = planet.heading.summary;
};
const buildImgGallery = (planet) => {
    imgGallery.querySelector(".img1").setAttribute("src", `images/${planet.name.toLowerCase()}/img1.jpg`);
    imgGallery.querySelector(".img2").setAttribute("src", `images/${planet.name.toLowerCase()}/img2.jpg`);
    imgGallery.querySelector(".img3").setAttribute("src", `images/${planet.name.toLowerCase()}/img3.jpg`);
};
const buildHeadline = (planet) => {
    planetHeadline.innerText = planet.name;
};
const buildFacts = (planet) => {
    overviewPts.innerHTML = "";
    for(let i = 0; i < Object.keys(planet.overview).length; i++) {
        let current = `point${i+1}`
        overviewPts.innerHTML += `<li class="plh-pt">${planet.overview[current]}</li>`
    }

    mainFeatures.innerHTML = "";
    for(let i = 0; i < Object.keys(planet.features).length; i++) {
        let current = `point${i+1}`
        mainFeatures.innerHTML += `<li class="plh-pt">${planet.features[current]}</li>`
    }

    otherFacts.innerHTML = "";
    for(let i = 0; i < Object.keys(planet.extras).length; i++) {
        let current = `point${i+1}`
        otherFacts.innerHTML += `<li class="plh-pt">${planet.extras[current]}</li>`
    }
};
const buildSurfaceImg = (planet) => {
    surfaceImg.style.background = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(20,20,20,0.34) 20%, rgba(66,66,66,0.10) 87%), 
                                    url(images/${planet.name.toLowerCase()}/${planet.name.toLowerCase()}-surface.jpg)`;
    surfaceImg.style.backgroundRepeat = "no-repeat";
    surfaceImg.style.backgroundSize = "cover";
    surfaceImg.style.backgroundPositionY = "80%";
    
};
const buildImgModal = (imageURL, planet) => {
    imgModal.querySelector(".im-img").setAttribute("src", `images/${planet.name.toLowerCase()}/${imageURL}.jpg`);
    imgModal.querySelector(".im-descrip span").innerText = planet.images[imageURL];
};

//Request & planet variable
async function queryPlanet(planet) {

    const response = await fetch(`planets/${planet}.json`);
    const data = await response.json();

    return data;
}

adjustContent();
let currentPlanet = "";

//initialize to mercury
queryPlanet("mercury")
            .then((planet) => {
                currentPlanet = planet;
                buildJumbo(planet);
                buildSummary(planet);
                buildImgGallery(planet);
                buildHeadline(planet);
                buildFacts(planet);
                buildSurfaceImg(planet);
            });


//Navbar event listener
planets.addEventListener("click", (e) => {
    if(e.target.tagName === "SPAN") {
        
        queryPlanet(e.target.classList.value)
            .then((planet) => {
                currentPlanet = planet;
                buildJumbo(planet);
                buildSummary(planet);
                buildImgGallery(planet);
                buildHeadline(planet);
                buildFacts(planet);
                buildSurfaceImg(planet);
            });

        if(innerWidth <= 600) { 
            navBottom.classList.toggle("im-hidden");
        }
        else{
            navBottom.classList.remove("im-hidden");
        }
    }
});

//Image Gallery Listener
imgGallery.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG") {
        imgModal.classList.remove("im-hidden");
        buildImgModal(e.target.classList.value.trim(), currentPlanet);
    }
});

//Image Modal listener
imgModal.addEventListener("click", (e) => {
    if(e.target === imgModal.querySelector(".exit")) {
        imgModal.classList.add("im-hidden");
    }
});
imgModal.addEventListener("touchstart", (e) => {
    if(e.target === imgModal.querySelector(".exit")) {
        imgModal.classList.add("im-hidden");
    }
});

//footer scroll top
scrollTop.addEventListener("click", (e) => {
    scrollTo(0,0);
});
scrollTop.addEventListener("touchstart", (e) => {
    scrollTo(0,0);
});


//hamburger menu for mobile devices
hamMenu.addEventListener("touchstart", (e) => {
    if(innerWidth <= 600) {
        console.log(e.target.classList);
        hamMenu.classList.toggle("checked");

        if(!hamMenu.classList.contains("checked")) {
            hamMenu.setAttribute("src", "images/ham.svg");
            navBottom.classList.toggle("im-hidden");
        }
        else {
            hamMenu.setAttribute("src", "images/ham-exit.svg");
            navBottom.classList.toggle("im-hidden");
        }
    }
    
});

//used by body tag to listen for changes in the viewport width
function adjustContent() {
    if(innerWidth > 600) { 
        navBottom.classList.remove("im-hidden");
    }
    else {
        navBottom.classList.add("im-hidden");
    }
}