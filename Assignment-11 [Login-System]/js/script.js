var username_login = document.getElementById("username_login");
var password_login = document.getElementById("password_login");
var username_signup = document.getElementById("username_signup");
var email_signup = document.getElementById("email_signup");
var password_signup = document.getElementById("password_signup");
var confirmPassword_signup = document.getElementById("confirm_password_signup");

const validationRules = {
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

function isFieldValid(fieldName, value) {
  const rule = validationRules[fieldName];
  return rule ? rule.test(value) : false;
}

function validateForm() {
  if (!checkEmptySignupInputs()) {
    return false;
  }

  const usernameError = document.getElementById("username-signup-error");
  const emailError = document.getElementById("email-signup-error");
  const passwordError = document.getElementById("password-signup-error");
  const confirmPasswordError = document.getElementById("confirm-password-signup-error");

  if (!isFieldValid("username", username_signup.value)) {
    usernameError.innerHTML =
      '<p class="text-danger">Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens</p>';
    return false;
  } else {
    usernameError.innerHTML = "";
  }

  if (!isFieldValid("email", email_signup.value)) {
    emailError.innerHTML =
      '<p class="text-danger">Please enter a valid email address</p>';
    return false;
  } else {
    emailError.innerHTML = "";
  }

  if (!isFieldValid("password", password_signup.value)) {
    passwordError.innerHTML =
      '<p class="text-danger">Password must be at least 8 characters long and contain at least one letter and one number</p>';
    return false;
  } else {
    passwordError.innerHTML = "";
  }

  if (password_signup.value !== confirmPassword_signup.value) {
    confirmPasswordError.innerHTML =
      '<p class="text-danger">Passwords do not match</p>';
    return false;
  } else {
    confirmPasswordError.innerHTML = "";
  }

  if (isEmailExists()) {
    emailError.innerHTML = '<p class="text-danger">Email already exists</p>';
    return false;
  }

  if (isUsernameExists()) {
    usernameError.innerHTML = `<p class='text-danger'>Username is already exists</p>`;
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

  if (!isFieldValid("username", username_login.value)) {
    usernameError.innerHTML =
      '<p class="text-danger">Invalid username format</p>';
    return false;
  } else {
    usernameError.innerHTML = "";
  }

  if (!isFieldValid("password", password_login.value)) {
    passwordError.innerHTML =
      '<p class="text-danger">Invalid password format</p>';
    return false;
  } else {
    passwordError.innerHTML = "";
  }

  const loginData = {
    username: username_login.value,
    password: password_login.value,
  };
  saveToLocalStorage("LoginData", loginData);

  // Check if user exists in SignUpData
  let userFound = SignUpData.some(
    (user) =>
      user.username === username_login.value &&
      user.password === password_login.value
  );

  if (userFound) {
    // Set current user and redirect
    localStorage.setItem("currentUser", username_login.value);
    window.location.href = "welcome.html";
    return false; // Prevent form submission
  } else {
    document.getElementById("login-error").innerHTML =
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
  return SignUpData.some(
    (user) => user.email.toLowerCase() === email_signup.value.toLowerCase()
  );
}

function isUsernameExists() {
  return SignUpData.some(
    (user) =>
      user.username.toLowerCase() === username_signup.value.toLowerCase()
  );
}

function logout() {
  // Remove the current user from localStorage
  localStorage.removeItem("currentUser");

  // Remove LoginData and SignUpData from localStorage
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