/* AUTH ====================================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyCT3jMfeCOAIpi4-8Pkz7hZviqLm6UMMKQ",
    authDomain: "car-cost-14317.firebaseapp.com",
    projectId: "car-cost-14317",
    storageBucket: "car-cost-14317.appspot.com",
    messagingSenderId: "74635691189",
    appId: "1:74635691189:web:778784ee28977af71eaafc",
    measurementId: "G-PP0LBWJWMT"
};

// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();
    const auth = firebase.auth();
    const db = firebase.firestore();

    
/* Listen to auth status changes ---------------*/
auth.onAuthStateChanged(user => {
    if(user) {
        console.log(`This user is logged in ${user.email}!`);
    } else {
        console.log("User logged out!")
    }
});





/* DROPDOWN LIST ===================================================== */

const menuButton = document.getElementById("menuButton");
const navList = document.getElementById("navList");
const dropdownOverlay = document.getElementById("dropdownOverlay");
const navItem = document.getElementsByClassName("navigationItem");


menuButton.addEventListener("click", () => {
    // Open or close dropdown
        navList.classList.add("active-dropdown");
        dropdownOverlay.classList.add("active-overlay");

    // Close dropdown by clicking anywhere else
        dropdownOverlay.addEventListener("click", () => {
            navList.classList.remove("active-dropdown");
            dropdownOverlay.classList.remove("active-overlay");
        });

    // Close dropdown by clicking on links
        for(let i = 0; i < navItem.length; i++) {
            let link = navItem[i];
            link.addEventListener("click", () => {
                navList.classList.remove("active-dropdown");
                dropdownOverlay.classList.remove("active-overlay");
            });
        };

});


/* FUEL CALCULATOR DATA ========================================================== */

// Input field values --------------------------------------
const form = document.getElementById("fuelForm")
const distanceInput = document.getElementById("distanceInput");
const twoWayCheckInput = document.getElementById("twoWayCheckInput");
const avarageConsInput = document.getElementById("avarageConsInput");
const fuelPrice = document.getElementById("fuelPriceInput");

// Input buttons --------------------------------------------
const petrolButton = document.getElementById("petrolButton");
const dieselButton = document.getElementById("dieselButton");
const submitButton = document.getElementById("submitButton");

/* Add result to page ============================================================== */

// Input card items
const sectionTwo = document.getElementById("sectionTwo"); // section-two-results
const fuelForm = document.getElementById("fuelForm"); // trans-card-result
const calcForm = document.getElementById("calcForm"); // calc-form-result

const cardItems = document.getElementsByClassName("card-item") // card-item-result
const fuelButtonContainer = document.getElementById("fuelButtonContainer") // fuel-type-container-result

// Result card items
const resultCard = document.getElementById("resultCard"); // remove: display-none

const consumtionNumber = document.getElementById("consumtionNumber");
const priceNumber = document.getElementById("priceNumber");
const emissionNumber = document.getElementById("emissionNumber");

// Emission card items
const emissonCard = document.getElementById("emissonCard"); // remove: display-none


// Input button functions ------------------------------------
let fuelType = "petrol";

// Set fuel type to the corresponding button and stlye it - Diesel button
dieselButton.addEventListener("click", () => {
    fuelType = "diesel";
    if (petrolButton.classList.contains("active-fuel-btn")) petrolButton.classList.remove("active-fuel-btn");
    dieselButton.classList.add("active-fuel-btn");
})

// Set fuel type to the corresponding button and stlye it - Petrol button
petrolButton.addEventListener("click", () => {
    fuelType = "petrol";
    if (dieselButton.classList.contains("active-fuel-btn")) dieselButton.classList.remove("active-fuel-btn");
    petrolButton.classList.add("active-fuel-btn");
})


// Submmitting --------------------------------------------------
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page to realod after submitting

    /* Calculate result ----------------------------------------------- */
        const values = getDataValues(); // Get the input fields values - values in an object
        const totalConsumption = getTotalConsumption(values); // Total trip consumption
        const fuelPrice = Math.round(totalConsumption * values.price); // Trip fuel pice
        const coEmission = Number((values.fuel === "petrol" ? totalConsumption * 2.39 : totalConsumption * 2.62).toFixed(2)); // CO2 emisson
            console.log(`total consumption: ${totalConsumption} total price:${fuelPrice} emission: ${coEmission}`);

    /* Add layout to page --------------------------------------------- */

    // Change submit button text
        /* submitButton.innerText = "Re-calculate"; */

    // Change input card
        sectionTwo.classList.add("section-two-results");
        fuelForm.classList.add("trans-card-result");
        calcForm.classList.add("calc-form-result");
        fuelButtonContainer.classList.add("fuel-type-container-result");
        for (let item of cardItems) {
            item.classList.add("card-item-result");
        }

    // Add result card
        resultCard.classList.remove("display-none");

        consumtionNumber.innerText = `${totalConsumption} L`;
        priceNumber.innerText = fuelPrice;
        emissionNumber.innerText = `${coEmission} Kg CO2`;
    
    // Add emission card
        emissonCard.classList.remove("display-none");
})  

// FUNCTIONS-----------------------------------------
// This function gets the values from the input field and creats an object of them
function getDataValues() {
    // Number
    const distanceValue = parseInt(distanceInput.value);

    // String
    const twoWayValue = twoWayCheckInput.checked;

    // Float
    const consumtionValue = parseFloat(avarageConsInput.value);

    // Number
    const priceValue = parseInt(fuelPrice.value);

    // Creating a data object
    const data = {
        "distance": distanceValue,
        "twoWay": twoWayValue,
        "consumtion": consumtionValue,
        "price": priceValue,
        "fuel": fuelType
    };

    return data;


}

// -------------------------------------------
// This function calculates the trip's consumption
function getTotalConsumption(values) {
    // Calculate L / 1 km
    const literPerOneKm = values.consumtion / 100;
    let tempConsumption = null;

    // Calculate consumption based on oneway or twoway
    if(values.twoWay === false) {
        tempConsumption = (literPerOneKm * values.distance);
    } else {
        tempConsumption = (literPerOneKm * (values.distance * 2));
    }

    return Number((tempConsumption).toFixed(2)) ; // Rounding and make it an intiger again
}

function addReleventEmission(values) {

}






