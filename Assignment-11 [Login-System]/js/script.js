var username_login = document.getElementById("username_login");
var password_login = document.getElementById("password_login");
var confirmPassword_login = document.getElementById("confirm_password_login");
var username_signup = document.getElementById("username_signup");
var email_signup = document.getElementById("email_signup");
var password_signup = document.getElementById("password_signup");
var confirmPassword_signup = document.getElementById("confirm_password_signup");

function validateForm() {
  if (!checkEmptySignupInputs()) {
    return false;
  }
  const usernameError = document.getElementById("username-signup-error");
  const emailError = document.getElementById("email-signup-error");
  const passwordError = document.getElementById("password-signup-error");
  const confirmPasswordError = document.getElementById("confirm-password-signup-error");
  let isValid = true;

  // Check for empty fields
  if (
    !username_signup.value ||
    !email_signup.value ||
    !password_signup.value ||
    !confirmPassword_signup.value
  ) {
    document.getElementById("signup-error").innerHTML =
      '<p class="text-danger">Error: All inputs are required</p>';
    isValid = false;
  } else {
    document.getElementById("signup-error").innerHTML = "";
  }

  // Username validation (3-20 characters, alphanumeric, underscores, and hyphens allowed)
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  if (!usernameRegex.test(username_signup.value)) {
    usernameError.innerHTML =
      '<p class="text-danger">Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens</p>';
    isValid = false;
  } else {
    usernameError.innerHTML = "";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_signup.value)) {
    emailError.innerHTML =
      '<p class="text-danger">Please enter a valid email address</p>';
    isValid = false;
  } else {
    emailError.innerHTML = "";
  }

  // Password validation (at least 8 characters, including at least one letter and one number)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password_signup.value)) {
    passwordError.innerHTML =
      '<p class="text-danger">Password must be at least 8 characters long and contain at least one letter and one number</p>';
    isValid = false;
  } else {
    passwordError.innerHTML = "";
  }

  if (password_signup.value !== confirmPassword_signup.value) {
    confirmPasswordError.innerHTML =
      '<p class="text-danger">Passwords do not match</p>';
    isValid = false;
  } else {
    confirmPasswordError.innerHTML = "";
  }

  if (isEmailExists()) {
    emailError.innerHTML = '<p class="text-danger">Email already exists</p>';
    isValid = false;
  }

  if (isUsernameExists()) {
    usernameError.innerHTML = `<p class='text-danger'>Username is already exists</p>`;
  }

  if (!isValid) {
    return false;
  }

  // Save signup data to localStorage
  const signUpData = {
    username: username_signup.value,
    email: email_signup.value,
    password: password_signup.value,
  };
  saveToLocalStorage("SignUpData", signUpData);

  return true;
}

function validateLoginForm() {
  if (!checkEmptyLoginInputs()) {
    return false;
  }
  const usernameError = document.getElementById("username-login-error");
  const passwordError = document.getElementById("password-login-error");
  let isValid = true;

  // Check for empty fields
  if (!username_login.value || !password_login.value) {
    document.getElementById("login-error").innerHTML =
      '<p class="text-danger text-center">All inputs are required</p>';
    isValid = false;
  } else {
    document.getElementById("login-error").innerHTML = "";
  }

  usernameError.innerHTML = "";
  passwordError.innerHTML = "";

  // Username validation (3-20 characters, alphanumeric, underscores, and hyphens allowed)
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  if (!usernameRegex.test(username_login.value)) {
    usernameError.innerHTML =
      '<p class="text-danger">Invalid username format</p>';
    isValid = false;
  }

  // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password_login.value)) {
    passwordError.innerHTML =
      '<p class="text-danger">Invalid password format</p>';
    isValid = false;
  }

  if (!isValid) {
    return false;
  }

  const loginData = {
    username: username_login.value,
    password: password_login.value,
  };
  saveToLocalStorage("LoginData", loginData);

  // Check if user exists in SignUpData
  let userFound = false;
  for (let i = 0; i < SignUpData.length; i++) {
    if (
      SignUpData[i].username === username_login.value &&
      SignUpData[i].password === password_login.value
    ) {
      userFound = true;
      break;
    }
  }

  if (userFound) {
    // Set current user and redirect
    localStorage.setItem("currentUser", username_login.value);
    window.location.href = "welcome.html";
    return false; // Prevent form submission
  } else {
    loginError.innerHTML =
      '<p class="text-danger">Invalid username or password</p>';
    return false; // Prevent form submission
  }
}

function saveToLocalStorage(key, data) {
  var existingData = JSON.parse(localStorage.getItem(key));
  if (existingData === null) {
    existingData = [];
  }
  existingData.push(data);
  localStorage.setItem(key, JSON.stringify(existingData));
}

// Initialize arrays from localStorage
var SignUpData = [];
var LoginData = [];

function initializeArrays() {
  const storedSignUpData = localStorage.getItem("SignUpData");
  const storedLoginData = localStorage.getItem("LoginData");

  if (storedSignUpData) {
    SignUpData = JSON.parse(storedSignUpData);
  }

  if (storedLoginData) {
    LoginData = JSON.parse(storedLoginData);
  }
}

// Call the initialization function
initializeArrays();

// Function to print all data in the console 
function printAllData() {
  console.log(
    "All SignUpData:",
    JSON.parse(localStorage.getItem("SignUpData"))
  );
  console.log("All LoginData:", JSON.parse(localStorage.getItem("LoginData")));
}

// Call this function to print all data whenever needed
printAllData();

function isEmailExists() {
  for (var i = 0; i < SignUpData.length; i++) {
    if (
      SignUpData[i].email.toLowerCase() === email_signup.value.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

function isUsernameExists() {
  for (var i = 0; i < SignUpData.length; i++) {
    if (
      SignUpData[i].username.toLowerCase() ===
      username_signup.value.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

function logout() {
  // Remove the current user from localStorage
  localStorage.removeItem("currentUser");

  // Remove LoginData from localStorage
  localStorage.removeItem("LoginData");
  localStorage.removeItem("SignUpData");

  // Redirect to the login page
  window.location.href = "index.html";
}

function showWelcomeMessage() {
  const welcomeMessage = document.getElementById("welcome-message");
  const username = localStorage.getItem("currentUser");

  if (username) {
    welcomeMessage.innerHTML = `Welcome, ${username}!`;
  } else {
    window.location.href = "index.html";
  }
}

// Call this function when the welcome page loads
if (window.location.pathname.includes("welcome.html")) {
  showWelcomeMessage();
}

function checkEmptyLoginInputs() {
  const loginError = document.getElementById("login-error");
  if (!username_login.value || !password_login.value) {
    loginError.innerHTML =
      '<p class="text-danger text-center">All inputs are required</p>';
    return false;
  }
  loginError.innerHTML = ""; // Clear error message if inputs are not empty
  return true;  
}

function checkEmptySignupInputs() {
  const signupError = document.getElementById("signup-error");
  if (
    !username_signup.value ||
    !email_signup.value ||
    !password_signup.value ||
    !confirmPassword_signup.value
  ) {
    signupError.innerHTML =
      '<p class="text-danger text-center">All inputs are required</p>';
    return false;
  }
  signupError.innerHTML = ""; 
  return true;
}
