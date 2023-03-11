const modal = document.querySelector('.modal');
const contactBtn = document.querySelector('.contact_button');
const submitBtn = document.querySelector('.submit_btn');
const closeBtn = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');

contactBtn.addEventListener('click', () => {
  modal.classList.add('show-contact-modal');
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('First Name: ', firstName.value);
  console.log('Last Name: ', lastName.value);
  console.log('E-Mail: ', email.value);
  console.log('Message: ', message.value);
  modal.classList.remove('show-contact-modal');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show-contact-modal');
});

window.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    modal.classList.remove('show-contact-modal');
  }
});
