

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
            navImgCurr.src = "../images/Pakistan-flag.png";
            break;
        case "USD":
            navImgCurr.src = "../images/USA-flag.png";
            break;
        case "JPY":
            navImgCurr.src = "../images/Japan-flag.png";
            break
        case "ILS":
            navImgCurr.src = "../images/Israel-flag.png";
            break
        case "INR":
            navImgCurr.src = "../images/india-flag.png";
            break
        case "GBP":
            navImgCurr.src = "../images/British-flag.png";
            break
        default:
             navImgCurr.src = "../images/default-flag.png";
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
        item.textContent = `${currency} ${newPrice.toFixed(2)}`;
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

// Fetch data from json

let http = new XMLHttpRequest();
http.open('GET', '../data/ladder.json', true);
http.send();
http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);
        let output = '';
        for (let item of products) {
            output += `
        <div class="detailing-section">
            <div class="d-name">${item.name}</div>
        <div class="game-naughty">
           <img src="${item.newURL}">
        </div>
            <div class="game-cart">
                Buy Now 
            </div>
            <div class="games-discription">
                <div class="dicr">${item.discription}</div>
                <div class="discri">${item.discri}</div>
            </div>
            <div class="time-re">
                <div class="time-re-he">${item.pack}</div>
                <p class="time-re-p1">${item.minTime}</p>
                <p class="time-re-p2">${item.maxTime}<span class="price" changing-original-currency="${item.price}">${item.price}</span>${item.midTime}</p>
            </div>
        </div>`;
        }

        document.querySelector('.detail-pack').innerHTML = output;
    }
}
