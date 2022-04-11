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


/* Register ----------------------------------- */
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent page realoading

        // get user info
        const email = document.getElementById("registerEmail").value;
        const pw = document.getElementById("registerPw").value;
        const pwAgain = document.getElementById("registerPwAgain").value;

        if(pw === pwAgain) {
            
            // sign up the user
            auth.createUserWithEmailAndPassword(email, pw)
                .then(credential => {
                    console.log(credential.user.email + " is registered");
                    registerForm.reset();
                });

        } else {
            console.log("password is not matching")
        }
    });


/* Logout --------------------------------------*/
    const logouButton = document.getElementById("logoutButton");

    logouButton.addEventListener("click", (event) => {
        event.preventDefault(); // prevent page realoading

        auth.signOut();
    })
 
/* Login ------------------------------------------*/
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent page realoading

        const email = document.getElementById("loginEmail").value;
        const pw = document.getElementById("loginPw").value;

        auth.signInWithEmailAndPassword(email, pw)
            .then(credential => {
                /* console.log(credential.user.email + " signed in") */
                registerForm.reset();
            })
    })


/* Auth page tabs ========================================================== */
// Select all data attribrute
    const tabs = document.querySelectorAll("[data-tab-target]");
    const tabContents = document.querySelectorAll("[data-tab-container]");
    // Loop through all the tabs and add active class to make them visible

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.tabTarget); // Get what button we clicked
            
            tabs.forEach(tab => tab.classList.remove("active-btn")); // button hover
            tab.classList.add("active-btn");  // button hover

            tabs.forEach(tab => tab.classList.add("nav-button")); // button hover
            tab.classList.remove("nav-button");  // button hover
            
            tabContents.forEach(tabContent => tabContent.classList.remove("active")); // Remove all tabs from visibility
            target.classList.add("active"); // Make clicked tab visible
        })
    });