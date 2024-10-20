// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"; // Import Realtime Database functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYGNq96hCsumXU066i20ANjoCWYYzUioQ",
  authDomain: "qbuild-extra.firebaseapp.com",
  databaseURL: "https://qbuild-extra-default-rtdb.firebaseio.com/", // Add this line for Realtime Database
  projectId: "qbuild-extra",
  storageBucket: "qbuild-extra.appspot.com",
  messagingSenderId: "1063395487049",
  appId: "1:1063395487049:web:9a2e05881d4881978a7e98",
  measurementId: "G-HQGY13CTQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Realtime Database

// Event listener for the Requests Credentials button
document.getElementById('requests-btn').addEventListener('click', function() {
  const modal = document.getElementById('credentialsModal');
  modal.style.display = 'block'; // Show the modal
});

// Event listener for the close button of the modal
document.getElementById('closeModal').addEventListener('click', function() {
  const modal = document.getElementById('credentialsModal');
  modal.style.display = 'none'; // Hide the modal
});

// Event listener for the Submit button in the modal
document.getElementById('submitCredentials').addEventListener('click', async function() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('newEmail').value.trim();
  const role = document.getElementById('role').value;

  // Basic validation
  if (!name || !email) {
    alert("Please fill in all fields.");
    return;
  }

  // Format name for use as a Firebase key (remove spaces and special characters)
  const formattedName = name.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');

  try {
    // Create a unique key for each entry under 'users' using the formatted name
    const newCredentialRef = ref(db, 'users/' + formattedName); // Use 'users/' as the key path
    await set(newCredentialRef, {
      name: name,
      email: email,
      role: role
    });

    console.log("Credentials stored successfully!");

    // Hide the modal and clear inputs
    document.getElementById('credentialsModal').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('newEmail').value = '';
    document.getElementById('role').value = 'admin'; // Reset to default

    // Show a success message
    alert("Credentials submitted successfully!");
  } catch (e) {
    console.error("Error storing credentials: ", e);
    alert("Error submitting credentials. Please try again.");
  }
});