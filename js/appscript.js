let headerSection = document.querySelector("#headerSection");
let contactSection = document.querySelector("#contactSection");
let popularGameSection = document.querySelector("#popularGameSection");
let availableGameListSection = document.querySelector("#availableGameList");
let searchResultSection = document.querySelector("#searchResultSection");
let scrollTopSection = document.querySelector("#scrollTopSection");
let copyrightSection = document.querySelector("#copyrightSection");
let contactWrapper = document.querySelector("#contactSection .contactWrapper");
let contactButton = document.querySelector(".contactButton");
let closeContactButton = document.querySelector("#contactSection .closeButtonWrapper");
let facebookButton = document.querySelector("#contactSection .contactWrapper .facebook");
let messengerButton = document.querySelector("#contactSection .contactWrapper .messenger");
let phoneButton = document.querySelector("#contactSection .contactWrapper .phone");
let searchBar = document.querySelector("#headerSection .searchBarWrapper .searchBar");
let backgroundImage = document.querySelector("#popularGameSection .backgroundImage");
let gameplayImages = document.querySelectorAll("#popularGameSection .gameplayImage");
let popularDetailButton = document.querySelector(".popularDetailButton");
let additionalImagesWrapper = document.querySelectorAll(".additionalImagesWrapper .gameplayImagesWrapper .imageWrapper");
let delayInMilliseconds = 300; //1 second
// let smoothScrollBar = { behavior: 'auto'};
const pageMessengerLink = "https://m.me/blackskypcgamestore";
const pageLink = "https://www.facebook.com/blackskypcgamestore";
const phoneNumber = "+959769952798";



// Initiate application...
scrollTopSection.onclick = () => availableGameListSection.scrollIntoView();
let sectionHider = (section,isHide) => {
    if ( isHide ) {
        section.style.display = "none";
    } else {
        if ( section === headerSection || section === scrollTopSection || 
            section === copyrightSection ) {
            section.style.display = "flex";
        } else {
            section.style.display = "block";
        }
    }
}

let buyGameListener = () => {
    $(".buyGameButton").click( function () {
        window.open(pageMessengerLink, '_blank');
    });
}

messengerButton.onclick = () => {
    window.open(pageMessengerLink, '_blank');
}
facebookButton.onclick = () => {
    window.open(pageLink, '_blank');
}
phoneButton.firstChild.setAttribute("href",`tel:${phoneNumber}`);

closeContactButton.onclick = () => {
    contactSection.style.opacity = 0;
    contactWrapper.style.transform = "translateY(-50%)";
    setTimeout(() => {
        contactSection.style.display = "none";
    }, 400);
    
}

if ( searchBar.value === "" ) searchResultSection.style.display = "none";
searchBar.onkeydown = (event) => {
    searchResultSection.style.display = "block";
    setTimeout(() => {
        $(".resultWrapper").remove();
        let isDatafound = false;
        let pressedKey = event.code;
        let searchData = searchBar.value;
        // if ( searchData === "" ) return;
        for ( let id = 0 ; id < gameData.length ; id++ ) {
            if ( searchData === "" ) {
                $(".resultWrapper").remove();
                searchResultSection.style.display = "none";
            } 
            else if ( gameData[id].title.toLowerCase().includes(searchData.toLowerCase()) ) {
                $(searchResultSection).append(`
                    <div class="resultWrapper" id="SID${id}">
                    <div class="imageWrapper">
                        <img src="${gameData[id].logoLink}" alt="${gameData[id].title}">
                    </div>
                    <div class="detailWrapper">
                        <div class="title">${gameData[id].title}</div>
                        <div class="publisher">Publisher: <span>${gameData[id].publisher}</span></div>
                    </div>
                    </div>
                `);
                $(".noResultFound").attr("style","display: none");
                isDatafound = true;
                // Clicked on search result data...
                document.querySelector(`#SID${id}`).onclick = () => {
                    sectionHider(searchResultSection,true);
                    setTimeout(() => {
                        sectionHider(headerSection,true);
                        sectionHider(popularGameSection,true);
                        sectionHider(availableGameListSection,true);
                        sectionHider(scrollTopSection,true);
                        sectionHider(copyrightSection,true);
                        
                    }, 1000);
                    gameDetailManipulator(id,popularGameSection);
                }
                // Clicked on search result data...
            }
        }
        if ( !isDatafound ) {        
            $(".noResultFound").attr("style","display: flex");
            
        }
        // If press enter
        if ( pressedKey === "Enter" || pressedKey === "NumpadEnter" ) {
            console.log(searchData);
        }
    }, 100);
}


backgroundImage.setAttribute("src",gameData[0].logoLink);
buyGameListener();
$("#popularGameSection .gameIntro .title").html(gameData[0].title);
$("#popularGameSection .gameIntro .genre").html(`<b>Genre:</b> ${gameData[0].genre}`);
$("#popularGameSection .gameIntro .publisher").html(`<b>Publisher:</b> ${gameData[0].publisher}`);
$("#popularGameSection .gameIntro .platform").html(`<b>Platform:</b> ${gameData[0].platform}`);

    // Initializing popular game section...
for ( let id=0 ; id < gameplayImages.length ; id++ ) {
    if ( id === 0 ) {
        gameplayImages[0].setAttribute("src",gameData[0].logoLink);
        continue;
    }
    gameplayImages[id].setAttribute("src",gameData[0].gameplayLinks[id-1]);
}

    // Initializing available games...
for ( let id=1 ; id < gameData.length ; id++ ) {
    $("#availableGameList .row").append(
        `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 gameIntroWrapper" id="AGID${id}">
            <div class="imageWrapper">
                <img src="${gameData[id].logoLink}"  loading="lazy">
            </div>
            <div class="introWrapper">
                <div class="title">${gameData[id].title}</div>
                <div class="size">Size: <b>${gameData[id].size}</b></div>
            </div>
        </div>
        `
    )
}
    // Initializing available games...

    // Initializing contact button manipulation...
contactButton.onclick = () => {
    contactSection.style.display = "flex";
    setTimeout(() => {
        contactSection.style.opacity = 1;
        contactWrapper.style.transform = "translateY(0%)";
    }, 10);
}
    // Initializing contact button manipulation...

// Initiate application...


// Photo fade in and out effect section
for ( let id=0 ; id < gameplayImages.length ; id++ ) {
    gameplayImages[id].onclick = function () {
        for ( let idi = 0 ; idi < gameplayImages.length ; idi++ ) {
            if ( gameplayImages[idi].classList.contains("active") ) {
                gameplayImages[idi].classList.remove("active");
            }
        }
        gameplayImages[id].classList.add("active");
        backgroundImage.style.opacity = 0.0;
        setTimeout(function() {
            backgroundImage.setAttribute("src",gameplayImages[id].getAttribute("src"));
            backgroundImage.style.opacity = 1;
          }, delayInMilliseconds);
    };
}
// Photo fade in and out effect section



// Additional Images Manipulation
for ( let id = 0 ; id < additionalImagesWrapper.length ; id++ ) {
    // Mouse Clicked...
    additionalImagesWrapper[id].onclick = () => {
        console.log("clicked");
    }
    
}
// Additional Images Manipulation



// Necessary Details Manipulation functions
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
let gameDetailManipulator = ( clickedId , oldNode ) => {
    gameDetails = document.createElement("section");
            gameDetails.setAttribute("id","gameDetail");

            gameDetails.innerHTML = 
            `
                <div class="titleWrapper">
                <div class="title">${gameData[clickedId].title}</div>
                <div class="buttonWrapper">
                    <button class="titleButtonStyle buyGameButton">Buy game</button>
                    <button class="titleButtonStyle closeDetailButton">Close detail</button>
                </div>
            </div>
            <div class="logoAndDetailWrapper">
                <img class="logo" src="${gameData[clickedId].logoLink}">
                <div class="specWrapper">
                    <div class="specLabel">Specifications</div>
                    <div class="specs"><b>Genre:</b> <span class="specDetail">${gameData[clickedId].genre}</span></div>
                    <div class="specs"><b>Publisher:</b> <span class="specDetail">${gameData[clickedId].publisher}</span></div>
                    <div class="specs"><b>Size:</b> <span class="specDetail size">${gameData[clickedId].size}</span></div>
                    <div class="spec">
                        <div class="minimum">
                            <div class="specTitle">Minimum system requirement</div>
                            <div class="specs"><b>OS:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.minimum.os}</span></div>
                            <div class="specs"><b>CPU:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.minimum.cpu}</span></div>
                            <div class="specs"><b>GPU:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.minimum.gpu}</span></div>
                            <div class="specs"><b>RAM:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.minimum.ram}</span></div>
                            <div class="specs"><b>DirectX:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.minimum.directX}</span></div>
                        </div>
                        <div class="recommend">
                            <div class="specTitle">Recommend system requirement</div>
                            <div class="specs"><b>OS:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.recommend.os}</span></div>
                            <div class="specs"><b>CPU:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.recommend.cpu}</span></div>
                            <div class="specs"><b>GPU:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.recommend.gpu}</span></div>
                            <div class="specs"><b>RAM:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.recommend.ram}</span></div>
                            <div class="specs"><b>DirectX:</b> <span class="specDetail">${gameData[clickedId].systemRequirements.recommend.directX}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="additionalImagesWrapper">
                <div class="additionImageLabel">Additional Images</div>
                <div class="gameplayImagesWrapper">
                    <div class="imageWrapper"><i class="far fa-eye"></i><img src="${gameData[clickedId].logoLink}" loading="lazy" alt="Outriders-logo" border="0" class="gameplayImage"></div>
                    <div class="imageWrapper"><i class="far fa-eye"></i><img src="${gameData[clickedId].gameplayLinks[0]}" loading="lazy" alt="Outriders-gameplay-3" border="0" class="gameplayImage"></div>
                    <div class="imageWrapper"><i class="far fa-eye"></i><img src="${gameData[clickedId].gameplayLinks[1]}" loading="lazy" alt="Outriders-gameplay-2" border="0" class="gameplayImage"></div>
                    <div class="imageWrapper"><i class="far fa-eye"></i><img src="${gameData[clickedId].gameplayLinks[2]}" loading="lazy" alt="Outriders-gameplay-1" border="0" class="gameplayImage"></div>
                    <div class="imageWrapper"><i class="far fa-eye"></i><img src="${gameData[clickedId].gameplayLinks[3]}" loading="lazy" alt="Outriders-gameplay-4" border="0" class="gameplayImage"></div>
                </div>
            </div>
            <div class="seperateLine"></div>
            <section id="copyrightSection">
                <div class="detailWrapper">
                    <div>Copyright</div>
                    <div>&copy;</div>
                    <div class="authorName">Blacksky</div>
                </div>
            </section>
            `

            insertAfter(gameDetails,availableGameListSection);
            buyGameListener();

            let closeDetailButton = document.querySelector(".closeDetailButton");
            let gameDetailSection = document.querySelector("#gameDetail");
            let additionalImageViewIcons = document.querySelectorAll(".additionalImagesWrapper .imageWrapper");

            // Viewing additional image manipulation...
            additionalImageViewIcons.forEach ( icon => {
                icon.onclick = () => {
                    let imageUrl = icon.childNodes[1].getAttribute("src");
                    console.log("url - "+imageUrl);
                    let enlargeImageElement = document.createElement("div");
                    enlargeImageElement.classList.add("enlargeImageWrapper");
                    enlargeImageElement.innerHTML = `
                        <div class="enlargeImageWrapper">
                            <i class="fas fa-window-close"></i>
                            <div class="imageWrapper">
                                <img src="${imageUrl}" alt="${gameData[clickedId].title}">
                            </div>
                        </div>
                    `;
                    insertAfter(enlargeImageElement,gameDetailSection);
                    // enlargeImageElement.style.opacity = 1;
                    let closeImageButton = document.querySelector(".enlargeImageWrapper i");
                    closeImageButton.onclick = () => {
                        enlargeImageElement.style.opacity = 0;
                        setTimeout(() => {
                            enlargeImageElement.remove();
                        }, 500);
                    }
                };
            })

            // Viewing additional image manipulation...

            
            gameDetailSection.scrollIntoView();
            gameDetailSection.style.opacity = 1;
            

            // Close Detail Button Manipulation
            closeDetailButton.addEventListener ( "click" , () => {
                // gameDetailSection.classList.add("upAndFadeEffect");
                gameDetailSection.setAttribute("style","transform: scale(0); width: 0px; height: 0px");
                setTimeout( function() {
                    // gameDetailSection.style.display = "none";
                    // gameDetailSection.classList.remove("upAndFadeEffect");
                    sectionHider(headerSection,false);
                    sectionHider(popularGameSection,false);
                    sectionHider(availableGameListSection,false);
                    sectionHider(scrollTopSection,false);
                    sectionHider(copyrightSection,false);
                    oldNode.scrollIntoView();
                },1000);
            } );
            // Close Detail Button Manipulation
}
// Necessary Details Manipulation functions


// Popular detail button manipulation
popularDetailButton.onclick = () => {
    setTimeout(() => {
        sectionHider(headerSection,true);
        sectionHider(popularGameSection,true);
        sectionHider(availableGameListSection,true);
        sectionHider(scrollTopSection,true);
        sectionHider(copyrightSection,true);
    }, 1000);
    gameDetailManipulator(0,popularGameSection);
}
// Popular detail button manipulation


// Available Games Manipulation
let gameIntroWrapper = document.querySelectorAll("#availableGameList .gameIntroWrapper");
let gameDetails;
    for ( let id=0 ; id < gameIntroWrapper.length ; id++ ) {
        gameIntroWrapper[id].onclick = () => {
            setTimeout(() => {
                sectionHider(headerSection,true);
                sectionHider(popularGameSection,true);
                sectionHider(availableGameListSection,true);
                sectionHider(scrollTopSection,true);
                sectionHider(copyrightSection,true);
            }, 1000);
            let clickedId = parseInt(gameIntroWrapper[id].getAttribute("id").replace("AGID",""));
            gameDetailManipulator(clickedId,gameIntroWrapper[id]);
            // Close Detail Button Manipulation
        }
    }
// Available Games Manipulation