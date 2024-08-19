document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body')
	const burger = document.querySelector('.burger')
	const menu = document.querySelector('.menu')
	const close = document.querySelector('.menu__close')
	const filterSort = document.querySelectorAll('.filter__sort-text')
	const basket = document.querySelector('.basket')
	const product = document.querySelector('.product')
	const form = document.querySelector('.form')

	const toggleMenu = () => {
		menu.classList.toggle('menu--active')
		burger.classList.toggle('burger--active')
		body.classList.toggle('no-scroll')
	}

	const clickOutsideMenu = event => {
		if (!menu.contains(event.target) && !burger.contains(event.target)) {
			menu.classList.remove('menu--active')
			burger.classList.remove('burger--active')
			body.classList.remove('no-scroll')
		}
	}

	close?.addEventListener('click', toggleMenu)
	burger?.addEventListener('click', toggleMenu)
	document.addEventListener('click', clickOutsideMenu)

	if (form) {
		const formSelect = form.querySelector('.form__accordion')
		const formDownload = form.querySelector('.form__download')

		formSelect.addEventListener('click', e => {
			const select = formSelect.querySelector('.form__accordion-select input')
			if (e.target.classList.contains('form__accordion-option')) {
        
        select.value = e.target.textContent.trim()
        console.log(select.value);
			}
		})

		const file = formDownload.querySelector('.form__download-file')
		file.addEventListener('change', e => {
			const text = formDownload.querySelector('.form__download-text')
			const fileName = e.target.files[0].name
			text.textContent = fileName
		})
	}

	if (basket) {
		const checkAll = basket.querySelector('.check-all .label__input')
		const deleteAll = basket.querySelector('.basket__delete--all')
		const basketItem = basket.querySelectorAll('.basket__item')

		checkAll.addEventListener('click', () => {
			basketItem.forEach(item => {
				const check = item.querySelector('.label__input')
				check.checked = checkAll.checked
			})
		})

		deleteAll.addEventListener('click', () => {
			basketItem.forEach(item => {
				const check = item.querySelector('.label__input')
				if (check.checked) {
					item.remove()
					checkAll.checked = false
				}
			})
		})

		basketItem.forEach(item => {
			const deleteItem = item.querySelector('.basket__delete')
			deleteItem.addEventListener('click', () => {
				item.remove()
			})
		})
	}

	if (product) {
		addDataGoto()

		function addDataGoto() {
			const bigImages = product.querySelectorAll('.product__item-big__img')
			const smallImages = product.querySelectorAll('.product__item-small__img')

			smallImages.forEach((smallImg, index) => {
				smallImg.setAttribute('data-goto', `.item-${index + 1}`)
			})
			bigImages.forEach((bigImg, index) => {
				bigImg.classList.add(`item-${index + 1}`)
			})
		}
	}

	filterSort?.forEach(item => {
		item.addEventListener('click', function () {
			filterSort.forEach(item => {
				item.classList.remove('filter__sort-text--active')
			})
			this.classList.add('filter__sort-text--active')
		})
	})

	document.addEventListener('click', e => {
		if (e.target.classList.contains('favorite')) {
			e.target.classList.toggle('favorite--active')
		}
	})

	function handleTabClick(
		tabs,
		pages,
		activeTabClass,
		activePageClass,
		opacityPageClass
	) {
		tabs.forEach((tab, idx) => {
			tab.addEventListener('click', () => {
				tabs.forEach(tab => tab.classList.remove(activeTabClass))
				pages.forEach(page => {
					page.classList.remove(activePageClass)
					page.classList.remove(opacityPageClass)
				})

				tab.classList.add(activeTabClass)
				pages[idx].classList.add(activePageClass)

				setTimeout(() => {
					pages[idx].classList.add(opacityPageClass)
				}, 380)
			})
		})
	}

	const tabs = document.querySelectorAll('.tab__target')
	const pages = document.querySelectorAll('.tab__info')

	handleTabClick(
		tabs,
		pages,
		'tab__target--active',
		'tab__info--active',
		'tab__info--opacity'
	)

	const accordionNext = document.querySelectorAll('.accordionNext')

	accordionNext?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			const content = acc.nextElementSibling
			if (acc.classList.contains('accordionNext--active')) {
				acc.classList.remove('accordionNext--active')
				content.style.maxHeight = '0'
			} else {
				acc.classList.add('accordionNext--active')
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	})

	const accordion = document.querySelectorAll('.accordion')

	accordion?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			const content = acc.querySelector('.accordion__content')
			if (acc.classList.contains('accordion--active')) {
				acc.classList.remove('accordion--active')
				content.style.maxHeight = '0'
			} else {
				acc.classList.add('accordion--active')
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	})

	const accordionIndex = document.querySelectorAll('.accordionIndex')
	const contents = document.querySelectorAll('.accordionIndex-content')
	if (innerWidth < 768) {
		accordionIndex?.forEach((acc, index) => {
			acc.addEventListener('click', e => {
				e.preventDefault()
				const content = contents[index]

				if (acc.classList.contains('accordionIndex--active')) {
					acc.classList.remove('accordionIndex--active')
					content.style.maxHeight = '0'
				} else {
					acc.classList.add('accordionIndex--active')
					content.style.maxHeight = content.scrollHeight + 'px'
				}
			})
		})
	}

	document.addEventListener('click', e => {
		const isAccordionClicked = e.target.closest('.accordionIndex')

		if (!isAccordionClicked) {
			accordionIndex.forEach((acc, index) => {
				const content = contents[index]
				acc.classList.remove('accordionIndex--active')
				content.style.maxHeight = '0'
			})
		}
	})

	const count = document.querySelectorAll('.count')

	count?.forEach(element => {
		element.addEventListener('click', function (event) {
			const e = event.target
			const num = element.querySelector('.count__num')
			let sum = +num.innerHTML

			if (e.classList.contains('count__plus')) {
				++sum
				num.innerHTML = sum
			}
			if (e.classList.contains('count__minus')) {
				if (sum > 1) {
					--sum
					num.innerHTML = sum
				}
			}
		})
	})

	const goto = document.querySelectorAll('[class][data-goto]')

	if (goto.length > 0) {
		goto.forEach(item => {
			item.addEventListener('click', function (e) {
				onMenuLinkClick(e)
				goto.forEach(item => {
					item.classList.remove('active')
				})
				this.classList.add('active')
				addDataGoto()
			})
		})

		function onMenuLinkClick(e) {
			const item = e.target
			if (item.dataset.goto && document.querySelector(item.dataset.goto)) {
				const gotoBlock = document.querySelector(item.dataset.goto)
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top - 12
				window.scrollBy({
					top: gotoBlockValue,
					behavior: 'smooth',
				})
				e.preventDefault()
			}
		}
	}

	if (document.querySelector('[name="phone"]')) {
		const element = document.querySelector('[name="phone"]')
		const maskOptions = {
			mask: '+{7} 000 000 00 00',
		}
		const mask = IMask(element, maskOptions)
	}

	if (document.querySelector('.promo__swiper')) {
		var promoSwiper = new Swiper('.promo__swiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '.promo__swiper-pagination',
			},
		})
	}

	const contentSwipers = []

	const contentSwiper = document.querySelectorAll('.content__swiper')
	if (contentSwiper) {
		contentSwiper.forEach(swiper => {
			contentSwipers.push(setContentSwiper(swiper))
		})
	}

	function setContentSwiper(element) {
		return new Swiper(element, {
			slidesPerView: 1,
			spaceBetween: 10,
			pagination: {
				el: '.swiper-pagination',
			},
		})
	}

	Fancybox.bind('[data-fancybox]', {
		// Your custom options
	})
})
