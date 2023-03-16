const contactModal = document.getElementById('contact_modal');
const modal = document.querySelector('.modal');
const contactBtn = document.querySelector('.contact_button');
const closeBtn = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');
const body = document.querySelector('body');

// open contact modal
contactBtn.addEventListener('click', () => {
  contactModal.setAttribute('aria-hidden', 'false');
  modal.classList.add('show-contact-modal');
  body.classList.toggle('no-scroll');
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  contactModal.setAttribute('aria-hidden', 'true');
  console.log('First Name: ', firstName.value);
  console.log('Last Name: ', lastName.value);
  console.log('E-Mail: ', email.value);
  console.log('Message: ', message.value);
  modal.classList.remove('show-contact-modal');
  body.classList.remove('no-scroll');
});

closeBtn.addEventListener('click', () => {
  contactModal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('show-contact-modal');
  body.classList.remove('no-scroll');
});

window.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    contactModal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('show-contact-modal');
    body.classList.remove('no-scroll');
  }
});
