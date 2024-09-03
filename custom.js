// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh84E-a1utVEu2DDbr8DTGzM6CdtW7ZGg",
  authDomain: "myportfoliocontactform-85f4c.firebaseapp.com",
  projectId: "myportfoliocontactform-85f4c",
  storageBucket: "myportfoliocontactform-85f4c.appspot.com",
  messagingSenderId: "107892138862",
  appId: "1:107892138862:web:887c7efdb1146dbb17977f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const tablinks = document.getElementsByClassName("tab-links");
  const tabcontents = document.getElementsByClassName("tab-contents");

  function opentab(event, tabname) {
    for (let tablink of tablinks) { 
      tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) { 
      tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
  }

  // Attach event listeners to tab links if not using inline onclick
  for (let tablink of tablinks) {
    tablink.addEventListener("click", (event) => {
      opentab(event, tablink.getAttribute("data-tab"));
    });
  }
}); // <-- Closing brace for DOMContentLoaded event listener

// Form handling
const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Form submission handler triggered");
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, "contactSubmissions"), {
        name: name,
        email: email,
        message: message,
        timestamp: new Date()
      });

      // Display success message
      console.log("Message Submitted Successfully!");
      msg.innerHTML = "Message Sent Successfully";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 4000);

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error.message);
    }
  });
}