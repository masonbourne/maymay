const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id], header#home');
const revealItems = document.querySelectorAll('.reveal');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.55 }
);

sections.forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const year = document.querySelector('#year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out! This demo form is ready to connect to your email service.');
    contactForm.reset();
  });
}

const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('#chat-messages');
const chatName = document.querySelector('#chat-name');
const chatInput = document.querySelector('#chat-input');
const CHAT_KEY = 'maymay-community-chat';

function getMessages() {
  try {
    const data = JSON.parse(localStorage.getItem(CHAT_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveMessages(messages) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages.slice(-60)));
}

function renderMessages() {
  if (!chatMessages) {
    return;
  }

  const messages = getMessages();
  chatMessages.innerHTML = '';

  if (!messages.length) {
    chatMessages.innerHTML = '<p class="section-text">No messages yet. Be the first one in the chat.</p>';
    return;
  }

  messages.forEach((message) => {
    const bubble = document.createElement('article');
    bubble.className = 'chat-message';

    const meta = document.createElement('div');
    meta.className = 'chat-meta';
    meta.textContent = `${message.name} • ${message.time}`;

    const text = document.createElement('p');
    text.textContent = message.text;

    bubble.append(meta, text);
    chatMessages.appendChild(bubble);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatForm && chatInput && chatName) {
  renderMessages();

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = chatName.value.trim();
    const text = chatInput.value.trim();

    if (!name || !text) {
      return;
    }

    const messages = getMessages();
    messages.push({
      name,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    saveMessages(messages);
    chatInput.value = '';
    renderMessages();
  });
}
