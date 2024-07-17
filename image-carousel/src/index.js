import './styles.css';

const buttons = document.querySelectorAll('[data-carousel-button]');
const navButtons = document.querySelectorAll('.slider-nav button');
let autoSlideInterval;

function updateNavButtons(activeIndex) {
	navButtons.forEach((button, index) => {
		if (index === activeIndex) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
}

function moveToNextSlide() {
	const slides = document.querySelector('[data-slides]');
	const activeSlide = slides.querySelector('[data-active]');
	let newIndex = [...slides.children].indexOf(activeSlide) + 1;
	if (newIndex >= slides.children.length) newIndex = 0;

	slides.children[newIndex].dataset.active = true;
	delete activeSlide.dataset.active;
	updateNavButtons(newIndex);
}

function startAutoSlide() {
	clearInterval(autoSlideInterval); // Clear any existing interval
	autoSlideInterval = setInterval(moveToNextSlide, 5000);
}

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
		const slides = button
			.closest('[data-carousel]')
			.querySelector('[data-slides]');

		const activeSlide = slides.querySelector('[data-active]');
		let newIndex = [...slides.children].indexOf(activeSlide) + offset;
		if (newIndex < 0) newIndex = slides.children.length - 1;
		if (newIndex >= slides.children.length) newIndex = 0;

		slides.children[newIndex].dataset.active = true;
		delete activeSlide.dataset.active;
		updateNavButtons(newIndex);
		startAutoSlide();
	});
});

navButtons.forEach((button, index) => {
	button.addEventListener('click', () => {
		const slides = button
			.closest('[data-carousel]')
			.querySelector('[data-slides]');
		const activeSlide = slides.querySelector('[data-active]');

		slides.children[index].dataset.active = true;
		delete activeSlide.dataset.active;
		updateNavButtons(index);
		startAutoSlide();
	});
});

// Initialize the navigation buttons
updateNavButtons(
	[...document.querySelector('[data-slides]').children].findIndex((slide) =>
		slide.hasAttribute('data-active'),
	),
);
startAutoSlide();
