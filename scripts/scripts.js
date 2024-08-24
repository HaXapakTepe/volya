document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body')
	const burger = document.querySelector('.burger')
	const menu = document.querySelector('.menu')
	const filterSort = document.querySelectorAll('.filter__sort-text')
	const basket = document.querySelector('.basket')
	const product = document.querySelector('.product')
	const form = document.querySelector('.form')
	const box = document.querySelectorAll('.form__inner-box')
	const discount = document.querySelector('.discount')
	const tabs = document.querySelectorAll('.tab__target')
	const pages = document.querySelectorAll('.tab__info')
	const accordionNext = document.querySelectorAll('.accordionNext')
	const accordion = document.querySelectorAll('.accordion')
	const count = document.querySelectorAll('.count')
	const goto = document.querySelectorAll('[class][data-goto]')
	const filter = document.querySelector('.filter')
	const modal = document.querySelectorAll('.modal')

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

	burger?.addEventListener('click', toggleMenu)
	document.addEventListener('click', clickOutsideMenu)

	if (modal) {
		modal.forEach(item => {
			const close = item.querySelector('.close')
			const passwordIcon = item.querySelectorAll('.form__label-icon')

			passwordIcon?.forEach(function (icon) {
				icon?.addEventListener('click', () => {
					const passwordInput = icon.previousElementSibling

					if (passwordInput.type === 'password') {
						passwordInput.type = 'text'
					} else {
						passwordInput.type = 'password'
					}
				})
			})

			close.addEventListener('click', () => {
				item.classList.remove('modal--active')
			})
		})
	}

	if (filter) {
		const filterOpen = filter?.querySelector('.filter--open')
		const modal = filter?.querySelector('.filter__modal')
		const close = filter?.querySelector('.close')
		filterOpen?.addEventListener('click', () => {
			modal.classList.add('filter__modal--active')
			body.classList.add('no-scroll')
		})
		close?.addEventListener('click', () => {
			modal.classList.remove('filter__modal--active')
			body.classList.remove('no-scroll')
		})
	}

	box?.forEach(item => {
		const editButton = item.querySelector('.btn--edit')
		const inputFields = item.querySelectorAll('.form__label-input')
		const passwordIcon = item.querySelectorAll('.form__label-icon')

		editButton?.addEventListener('click', () => {
			inputFields?.forEach(input => {
				input.disabled = !input.disabled
			})

			if (editButton.textContent === 'сохранить') {
				editButton.textContent = 'редактировать'
			} else {
				editButton.textContent = 'сохранить'
			}
		})

		passwordIcon?.forEach(function (icon) {
			icon?.addEventListener('click', () => {
				const passwordInput = icon.previousElementSibling

				if (passwordInput.type === 'password') {
					passwordInput.type = 'text'
				} else {
					passwordInput.type = 'password'
				}
			})
		})
	})

	if (discount) {
		const line = discount.querySelector('.discount__block')
		const text = discount.querySelector('.discount__block-text')
		const ellipse = discount.querySelectorAll('.discount__nums-ellipse')
		const linePercent = parseInt(line.dataset.line)
		const percent = linePercent

		line.style.width = `${percent}%`

		ellipse.forEach((item, i) => {
			item.style.backgroundColor = ''

			if (percent === 100) {
				item.style.backgroundColor = '#ff4d26'
				text.classList.add('discount__block-text--right')
			} else if (percent >= 70) {
				if (i < 4) item.style.backgroundColor = '#ff4d26'
			} else if (percent >= 50) {
				if (i < 3) item.style.backgroundColor = '#ff4d26'
			} else if (percent >= 30) {
				if (i < 2) item.style.backgroundColor = '#ff4d26'
			} else if (percent >= 0) {
				if (i < 1) item.style.backgroundColor = '#ff4d26'
			}
		})
	}

	if (form) {
		const formSelect = form.querySelector('.form__accordion')
		const formDownload = form.querySelector('.form__download')

		formSelect?.addEventListener('click', e => {
			const select = formSelect?.querySelector('.form__accordion-select input')
			if (e.target.classList.contains('form__accordion-option')) {
				select.value = e.target.textContent.trim()
			}
		})

		const file = formDownload?.querySelector('.form__download-file')
		file?.addEventListener('change', e => {
			const text = formDownload?.querySelector('.form__download-text')
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
			accordionNext?.forEach(acc => {
				const content = acc.nextElementSibling
				if (acc.classList.contains('accordionNext--active')) {
					acc.classList.remove('accordionNext--active')
					content.style.maxHeight = '0'
				}
			})
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

	handleTabClick(
		tabs,
		pages,
		'tab__target--active',
		'tab__info--active',
		'tab__info--opacity'
	)

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

	if (document.querySelector('#mapYandex')) {
		const map = document.querySelector('.map')
		const img = map.querySelector('.map__hidden-img')
		const src = img.src
		const text = map.querySelector('.map__hidden-text').textContent.trim()
		var points = [
			[
				`<div class="map__ballon"><img class="map__ballon-img" src="${src}" alt=""><p class="map__ballon-text">${text}</p></div>`,
				55.823464,
				37.497568,
			],
		]

		ymaps.ready(init)

		function init() {
			var myMap = new ymaps.Map('mapYandex', {
				center: [55.823464, 37.497568],
				zoom: 12,
			})

			var myCollection = new ymaps.GeoObjectCollection()

			for (var i = 0; i < points.length; i++) {
				var myPlacemark = new ymaps.Placemark(
					[points[i][1], points[i][2]],
					{
						balloonContent: points[i][0],
					},
					{
						iconLayout: 'default#image',
						iconImageHref: '/volya/assets/images/icons/loca.svg',
						// iconImageSize: [48, 48],
					}
				)
				myCollection.add(myPlacemark)
			}

			myMap.geoObjects.add(myCollection)
		}
	}
})
