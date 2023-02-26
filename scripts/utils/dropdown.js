const dropdownWrapper = document.querySelector('.wrapper-button');
const dropdownBtn = document.querySelector('.btn-dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownOptions = document.querySelectorAll('.dropdown-option');
const btnText = document.querySelector('.btn-text');

dropdownWrapper.addEventListener('click', () => {
  dropdownBtn.classList.toggle('radius');
  dropdownContent.classList.toggle('show');
});

const options = dropdownOptions.forEach(e => {
  e.addEventListener('click', e => {
    let from = btnText.textContent;
    btnText.textContent = e.target.textContent;
    e.target.textContent = from;
    dropdownBtn.classList.toggle('radius');
    dropdownContent.classList.toggle('show');
    const testP = document.querySelector('.test-p');
    testP.textContent = e.target.textContent;
  });
});
btnText.addEventListener('change', e => {
  console.log(e.target.textContent);
});
