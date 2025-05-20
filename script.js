const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

const roles = [
    "Data Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "Platform & Cloud Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const speed = 100;
  const pause = 1500;
  const typedElement = document.getElementById("typed-role");

  function typeRole() {
    const currentRole = roles[roleIndex];
    const currentText = isDeleting
      ? currentRole.substring(0, charIndex--)
      : currentRole.substring(0, charIndex++);

    typedElement.textContent = currentText;

    if (!isDeleting && charIndex === currentRole.length + 1) {
      isDeleting = true;
      setTimeout(typeRole, pause);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, speed);
    } else {
      setTimeout(typeRole, isDeleting ? speed / 2 : speed);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (typedElement) typeRole();
  });

document.addEventListener('scroll', scrollUp)
