// Correct Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADgqRzxvHHZiDQRVWWdZZorwa2aVj29VQ",
  authDomain: "getpi-fb878.firebaseapp.com",
  projectId: "getpi-fb878",
  storageBucket: "getpi-fb878.firebaseapp.com",
  messagingSenderId: "997869700135",
  appId: "1:997869700135:web:96f5213f5c70bcebacfa02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference the form
const messageForm = document.getElementById("messageForm");

// Listen for form submission
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const formMessage = document.getElementById("form-field-message").value;

  // Clear messages
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");
  errorMessage.textContent = "";
  successMessage.style.display = "none";

  try {
    // Save data to Firestore
    await addDoc(collection(db, "formData"), {
      form_message: formMessage,
      timestamp: serverTimestamp(),
    });

    // Show success message
    successMessage.style.display = "block";
    messageForm.reset(); // Clear the form
  } catch (error) {
    // Show error message
    errorMessage.textContent = "Failed to submit form: " + error.message;
  }
});
