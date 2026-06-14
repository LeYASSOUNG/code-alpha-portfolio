// ── Custom Cursor ──
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
  }
  if (cursorOutline) {
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  }
});

// ── Typing Effect ──
const textArray = ["Front-End", "UI/UX", "Créatif", "CodeAlpha"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
const typedTextSpan = document.querySelector(".typing-text");

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    typedTextSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    typedTextSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

if(textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250);

// ── 3D Tilt Effect on Cards ──
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// ── Scroll Reveal ──
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .skill-tag').forEach((el, index) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
  el.style.transitionDelay = `${(index % 5) * 0.1}s`; // Stagger effect
  observer.observe(el);
});

// Contact form handling (dummy)
const form = document.getElementById('contact-form');
if(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const oldText = btn.textContent;
    btn.textContent = 'Message Envoyé !';
    btn.style.background = '#1db954';
    form.reset();
    setTimeout(() => {
      btn.textContent = oldText;
      btn.style.background = '';
    }, 3000);
  });
}
