// Typing animation
const typingElement = document.getElementById("typing");
const roles = ["Web Developer", "UI/UX Designer", "Problem Solver"];
let index = 0;
let charIndex = 0;
let currentRole = roles[index];

function type() {
  if (charIndex < currentRole.length) {
    typingElement.textContent += currentRole.charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % roles.length;
    currentRole = roles[index];
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500);
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks, Manali will reach out soon!");
  this.reset();
});

// Dark/light theme toggle
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Animated counters
const counters = document.querySelectorAll('.counter');
const speed = 100;

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});
