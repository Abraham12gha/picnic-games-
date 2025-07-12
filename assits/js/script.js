// search bar

let seaBar = document.getElementById("search-input");
let searchButton = document.getElementById("search-icon");
searchButton.addEventListener("click", function (event) {
    event.stopPropagation();
    seaBar.style.width = "200px";
    seaBar.style.visibility = "visible";
})
document.addEventListener("click", function (event) {
    event.stopPropagation();
    if (!seaBar.contains(event.target) && event.target !== seaBar) {
        seaBar.style.width = "0px";
        seaBar.style.visibility = "hidden";
    }
})

// Game dropdown

let dropdown_lower_navbar = document.getElementById("dropdown-lower-nav-2");
let lower_navbar = document.getElementById("lower-nav-2");
let lower_navbar_link = document.getElementsByClassName("lower-nav-link");
lower_navbar.addEventListener("mouseenter", function (event) {
    event.stopPropagation()
    if (dropdown_lower_navbar.style.visibility === "hidden" && dropdown_lower_navbar.style.height === "0px") {
        dropdown_lower_navbar.style.visibility = "visible";
        dropdown_lower_navbar.style.height = "250px";
    } else {
        dropdown_lower_navbar.style.visibility = "hidden";
        dropdown_lower_navbar.style.height = "0px";
    }
    if (dropdown_lower_navbar2.style.visibility === "visible" && dropdown_lower_navbar2.style.height === "250px") {
        dropdown_lower_navbar.style.visibility = "hidden";
        dropdown_lower_navbar.style.height = "0px";
    }
})
dropdown_lower_navbar.addEventListener("mouseleave", function (event) {
    event.stopPropagation();
    dropdown_lower_navbar.style.visibility = "hidden";
    dropdown_lower_navbar.style.height = "0px";
})
lower_navbar.addEventListener("mouseleave", function (event) {
    event.stopPropagation();
})
// game dropdown fix error when load
window.addEventListener("load", function () {
    let dropdownLowerNavbar = document.getElementById("dropdown-lower-nav-2");
    dropdownLowerNavbar.style.visibility = "hidden";
    dropdownLowerNavbar.style.height = "0px";
});

// packages dropdown

let dropdown_lower_navbar2 = document.getElementById("dropdown-lower-nav-3");
let lower_navbar2 = document.getElementById("lower-nav-3");
let lower_navbar_link2 = document.getElementsByClassName("lower-nav-link");
lower_navbar2.addEventListener("mouseenter", function (event) {
    event.stopPropagation()
    if (dropdown_lower_navbar2.style.visibility === "hidden" && dropdown_lower_navbar2.style.height === "0px") {
        dropdown_lower_navbar2.style.visibility = "visible";
        dropdown_lower_navbar2.style.height = "250px";
    } else {
        dropdown_lower_navbar2.style.visibility = "hidden";
        dropdown_lower_navbar2.style.height = "0px";
    }
    if (dropdown_lower_navbar.style.visibility === "visible" && dropdown_lower_navbar.style.height === "250px") {
        dropdown_lower_navbar2.style.visibility = "hidden";
        dropdown_lower_navbar2.style.height = "0px";
    }
})
dropdown_lower_navbar2.addEventListener("mouseleave", function (event) {
    event.stopPropagation();
    dropdown_lower_navbar2.style.visibility = "hidden";
    dropdown_lower_navbar2.style.height = "0px";
})
lower_navbar2.addEventListener("mouseleave", function (event) {
    event.stopPropagation();
})

// currency dropdown 

let currencyDropdown = document.getElementById("dropdown-currency");
function currencyOpen() {
    currencyDropdown.classList.toggle("open-currency");
}

function changeCurrency(currency) {
    let navCurrency = document.querySelector(".flag p");
    navCurrency.textContent = `(${currency})`;
    changeFlag(currency);
    currencyDropdown.classList.remove("open-currency");
    changePrices(currency);
}


function changeFlag(currency){
    let navImgCurr = document.querySelector('.flag img');
    switch (currency){
        case "PKR":
            navImgCurr.src = "./assits/images/Pakistan-flag.png";
            break;
        case "USD":
            navImgCurr.src = "./assits/images/USA-flag.png";
            break;
        case "JPY":
            navImgCurr.src = "./assits/images/Japan-flag.png";
            break
        case "ILS":
            navImgCurr.src = "./assits/images/Israel-flag.png";
            break
        case "INR":
            navImgCurr.src = "./assits/images/india-flag.png";
            break
        case "GBP":
            navImgCurr.src = "./assits/images/British-flag.png";
            break
        default:
             navImgCurr.src = "./assits/images/default-flag.png";
    }
}

    function changePrices(currency){
        let originalMarketRate = {
            'PKR': 1,
            'USD': 0.0036,
            'JPY': 0.54,
            'ILS': 0.013,
            'INR': 0.30,
            'GBP': 0.0028
        }
        let items = document.getElementsByClassName('price');
        for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let originalPrice = item.getAttribute('changing-original-currency');
        let newPrice = originalPrice * originalMarketRate[currency];
        item.textContent = ` ${newPrice.toFixed(2)} ${currency}`;
     }
    }

// Account setting popup

let acoocuntSection = document.getElementById("account");
let accountDrop = document.getElementById("account-drop");
acoocuntSection.addEventListener("click", function (event) {
    event.stopPropagation();
    if (accountDrop.style.display === "none") {
        accountDrop.style.display = "block";
    } else {
        accountDrop.style.display = "none";
    }
    if (accountDrop.style.display === "block") {
        cartDrop.style.display = "none"
    }
})
document.addEventListener("click", function (event) {
    event.stopPropagation();
    accountDrop.style.display = "none";
})


// Fetch data from JSON by AJAX

let http = new XMLHttpRequest();
http.open('GET', 'assits/data/index.json', true);
http.send();
http.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);
        let output = '';
        for (let item of products) {
            output += `
            <div class="card1">
                <div class="image"><img src="${item.image}" alt="" loading="lazy"></div>
                <div class="title">${item.title}</div>
                <div class="description">${item.discription}</div>
                <div class="minimum-time-required">${item.minimumtime}<span>${item.ExactTime}</span></div>
                <div class="detailing-price-description">${item.detailprice}<span class="price" changing-original-currency="${item.p}">${item.p}</span></div>
                <p><a href="${item.newUrl}">View more</a></p>
            </div>`;
        }

        document.querySelector('.packages-cards').innerHTML = output;
    }  
}

// GeoLocation API

// let lat = 24.877336153169434
// let long = 67.06210559878674

// let api = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=cbeb26f652764db3bcb87978dce29bd7`
// let mapaddress = document.querySelector(".google-location")

// async function findMyCordS() {

//     const response = await fetch(api);
//     const data = await response.json();
//     console.log(data, "current Location properties");

//     mapaddress.innerHTML = `<h1>${data.features[0].properties.address_line1}</h1><h1>${data.features[0].properties.address_line2}</h1> `

// }

// findMyCordS()
// async function findMyCordS() {
//     try {
//         const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=24.8607&lon=67.0011&apiKey=cbeb26f652764db3bcb87978dce29bd7`);


//         const data = await response.json();
//         console.log(data, "Pickup Location properties");
//     } catch (error) {
//         if (error.response) {
//             console.error("Error response:", error.response.data);

//         }
//     }
// }

AOS.init();




