import { AuthErrorCodes } from "firebase/auth";
import { format } from "date-fns";
import { Toast, Tooltip } from "bootstrap";
import emailjs from "@emailjs/browser";


// Clock/Misc UI
export const toolTips = document.querySelectorAll(".tt");
export const clock = document.querySelector(".clock");

// Email JS
emailjs.init("teumzvK_dd_tm2EDs");

// Auth Flow UI
// To get to the auth flow
export const loginButton = document.querySelector("#login-button");
export const logoutButton = document.querySelector("#logout-button");
export const signupButton = document.querySelector("#signup-button");
export const cart = document.querySelector("#cart");
export const welcomeMessage = document.querySelector("#welcome-message");
export const errorMessageElement = document.querySelector("#error-message");
// Going through the Auth Flow
export const formLoginBtn = document.getElementById("login-btn");
export const formSignupBtn = document.getElementById("signup-btn");

export const showLoginState = (user) => {
  lblAuthState.innerHTML = `You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `;
};

// *** Toast Logic ***
 document.querySelectorAll(".toast").forEach((toastEl) => {
   const toast = new Toast(toastEl);
   toast.show();
 });

// *** Clock Logic***
toolTips.forEach((t) => {
  new Tooltip(t);
});

// Function to add ordinal suffix to a number
function addOrdinalSuffix(date) {
  const dayOfMonth = date.getDate();
  if (dayOfMonth > 3 && dayOfMonth < 21) return dayOfMonth + "th";
  switch (dayOfMonth % 10) {
    case 1:
      return dayOfMonth + "st";
    case 2:
      return dayOfMonth + "nd";
    case 3:
      return dayOfMonth + "rd";
    default:
      return dayOfMonth + "th";
  }
}

const tick = () => {
  const now = new Date();

  // Modified format string to include the ordinal suffix
  const formattedDate =
    format(now, "MMMM") +
    " " +
    addOrdinalSuffix(now) +
    " / " +
    format(now, "yyyy");
  const formattedTime = format(now, "h:mm a");

  const html = `
    <span>${formattedDate}</span>
    <span>${formattedTime}</span>
  `;

  clock.innerHTML = html;
};

setInterval(tick, 1000);

// ***Quiz Logic***
document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.querySelector(".quiz-form");
  const correctAnswers = ["B", "B", "B", "B"];
  const result = document.querySelector(".result");
  if (quizForm) {
    quizForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let score = 0;
      const userAnswers = [
        quizForm.q1.value,
        quizForm.q2.value,
        quizForm.q3.value,
        quizForm.q4.value,
      ];
      // Check answer
      userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
          score += 25;
        }
      });
      // show result
      scrollTo(0, 0);

      result.classList.remove("d-none");
      let userResult = 0;
      const timer = setInterval(() => {
        {
          result.querySelector("span").textContent = `${userResult}%`;
          if (userResult === score) {
            clearInterval(timer);
          } else {
            userResult++;
          }
        }
      }, 10);
    });
  }
});

// ***Send Email Logic***
document.addEventListener("DOMContentLoaded", function () {
  const questionForm = document.getElementById("contact-form");

  if (questionForm) {
    questionForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission
      sendMail();
    });
  }
});

function validateForm(params) {
  // Add your validation logic here
  // Example: Check if the name, email, and message are not empty
  return params.name && params.email && params.message;
}

function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  if (!validateForm(params)) {
    alert("Please fill in all the fields.");
    return; // Stop the function if validation fails
  }
  const serviceID = "service_53r37qr";
  const templateID = "template_3ln9oxq";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      console.log("success", res.status);
      // Clear the form fields only after successful submission
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      alert("Your Message sent successfully");
    })
    .catch((err) => console.log(err));
}
