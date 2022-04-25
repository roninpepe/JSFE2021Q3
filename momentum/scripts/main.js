// Default variables
const userLocale = navigator.languages.filter(a => a.match(/en|ru|be/))[0]
let currentLocale = getLocalStorageItem('currentLocale') ?
	getLocalStorageItem('currentLocale') :
		userLocale == 'ru' ? 'ru-RU' :
		userLocale == 'be' ? 'be-BY' :
		'en-US'
// Main framework
function $(v) {return document.querySelector(v)} // !!! THIS IS NOT JQUERY !!!
function translateTemplater(en, ru, by, locale = currentLocale) {return locale == 'en-US' ? en : locale == 'ru-RU' ? ru : by}
// Time and Date
function getTimeAndDate(date = new Date(), options = {weekday: 'long', month: 'long', day: 'numeric'}) {
	const
	currentTime = date.toLocaleTimeString('ru-RU'),
	currentDate = date.toLocaleDateString(locale = currentLocale, options)
	return [currentTime, currentDate]
}
function showTimeAndDate() {
	const [currentTime, currentDate] = getTimeAndDate()
	$('.time').textContent = currentTime
	$('.date').textContent = currentDate
	setTimeout(showTimeAndDate, 1000)
}
// Greeting
function getTimeOfDay(hour = new Date().getHours()) {
	return (
		hour < 6 ? 1 :
		hour < 12 ? 2 :
		hour < 18 ? 3 :
		4
	)
}
function getTimeOfDayTemplate(night, morning, afternoon, evening, timeOfDay = getTimeOfDay()) {
	return (
		timeOfDay < 2 ? night :
		timeOfDay < 3 ? morning :
		timeOfDay < 4 ? afternoon :
		evening
	)
}
function getGreeting() {
	return (
		translateTemplater('Good ', 'Добр', 'Д') + getTimeOfDayTemplate(
			translateTemplater('night', 'ой ночи', 'абранач'),
			translateTemplater('morning', 'ое утро', 'обрай раніцы'),
			translateTemplater('afternoon', 'ый день', 'обры дзень'),
			translateTemplater('evening', 'ый вечер', 'обры вечар')
		 ) + ','
	)
}
function showGreeting() {
	$('.greeting').textContent = getGreeting()
	$('.name').placeholder = translateTemplater('%username%', '%юзернейм%', '%юзэрнэйм%')
	setTimeout(showGreeting, 1000)
}
// Background
let bodyBackgroundMaxIndex = 20,
bodyBackgroundIndex
function getRandomInt(max) {
	return 	(Math.floor(Math.random() * max + 1))
}
function getIndex(maxIndex, index) {
	return ('' + index).padStart(('' + maxIndex).length, '0')
}
function getBackground(backgroundIndex) {
	return './assets/img/' + getTimeOfDayTemplate('night', 'morning', 'afternoon', 'evening') + '/' + backgroundIndex + '.jpg'
}
function setBackground(backgroundIndex) {
	const img = new Image()
	img.loading = 'eager'
  	img.src = getBackground(backgroundIndex)
  	img.onload = () => {
		$('body').style.backgroundImage = 'url("' + img.src + '")'
	}
	return backgroundIndex
}
function makeBackgroundSlider(maxIndex) {
	backgroundSource == 'local' ?
		bodyBackgroundIndex =  setBackground(getIndex(maxIndex, getRandomInt(maxIndex))) :
		getLinkToImage()
}
function getSlideNext() {
	if(backgroundSource == 'local') {
		bodyBackgroundIndex = bodyBackgroundIndex < bodyBackgroundMaxIndex ? getIndex(bodyBackgroundMaxIndex, ++bodyBackgroundIndex) : '01'
		setBackground(bodyBackgroundIndex)
	} else {getLinkToImage()}	
}
function getSlidePrev() {
	if(backgroundSource == 'local') {
		bodyBackgroundIndex = bodyBackgroundIndex > 1 ? getIndex(bodyBackgroundMaxIndex, --bodyBackgroundIndex) : '' + bodyBackgroundMaxIndex
		setBackground(bodyBackgroundIndex)
	} else {getLinkToImage()}
}
// Background: API
let
backgroundSource = getLocalStorageItem('backgroundSource') ?
	getLocalStorageItem('backgroundSource') :
	'local'
async function getLinkToImage() {
	let userTags = backgroundSource == 'unsplash' ?
		$('.user-tags').value.replace(/^\s+|\s+$/g, '').replace(/(\s+)?,(\s+)?/g, '+').replace(/\s+/g, '_') :
		$('.user-tags').value.replace(/^\s+|\s+$/g, '').replace(/(\s+)?,(\s+)?/g, ',').replace(/\s+/g, '_')
	const src = backgroundSource == 'unsplash' ?
		'https://api.unsplash.com/photos/random?orientation=landscape&query=' + getTimeOfDayTemplate('night', 'morning', 'afternoon', 'evening') + (userTags.length ? ('+' + userTags) : '') + '&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17' :
		'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=-people,' + getTimeOfDayTemplate('night', 'morning', 'afternoon', 'evening') + (userTags.length ? (',' + userTags) : '') + '&extras=url_l&format=json&nojsoncallback=1&media=photos&content_type=1&tag_mode=all',
	res = await fetch(src),
	data = await res.json(),
	img = new Image()
	img.loading = 'eager'
  	img.src = await backgroundSource == 'unsplash' ?
		data.urls.regular :
		data.photos.photo[getRandomInt(data.photos.photo.length) - 1].url_l.replace(/\\/g,'')
	img.onload = () => {
		$('body').style.backgroundImage = 'url("' + img.src + '")'
	}
}
// Weather
async function getWeather() {  
	const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + ($('.city').value ? $('.city').value : 'Минск') + '&lang=' + translateTemplater('en', 'ru', 'be') + '&units=metric&appid=c89e5d82c3a41ba192d3b0fae97df1c5'),
	data = await res.json()
	if (data.cod == '404' && $('.city').value) {
		$('.city').classList.add('invalid')
		$('.weather-icon').className = 'weather-icon owf'
		$('.temperature').textContent = translateTemplater('City not found', 'Город не найден', 'Горад не знойдзены')
		$('.weather-description').textContent = ''
	} else {
		$('.city').className = 'city'
		$('.city').placeholder = translateTemplater('Minsk', 'Минск', 'Мінск')
		$('.weather-icon').className = 'weather-icon owf'
		$('.weather-icon').classList.add('owf-' + data.weather[0].id)
		$('.temperature').textContent = data.main.temp + '°C | ' + data.wind.speed + ' ' + translateTemplater('m/s', 'м/с', 'м/с') + ' | ' + data.main.humidity + '%'
		$('.weather-description').textContent = data.weather[0].description
	}
}
// Quote
let quotes,
quoteMaxIndex,
quoteIndex
async function getQuotes(src = 'https://files.catbox.moe/difv2x.json') {
	const
	res = await fetch(src),
	data = await res.json()
	quotes = await data
	quoteMaxIndex = await data[Object.keys(data)[0]].length
}
function getQuote(locaQuoteIndex) {
	if(quoteIndex !== locaQuoteIndex) quoteIndex = locaQuoteIndex
	return quotes[currentLocale][quoteIndex]
}
function getRandomQuote(maxIndex = quoteMaxIndex) {
	return getQuote(getRandomInt(maxIndex) - 1)
}
function showQuote(quote) {
	$('.quote').textContent = '“' + quote.text + '”'
	$('.author').textContent = quote.author
}
function showRandomQuote() {
	return showQuote(getRandomQuote(quoteMaxIndex))
}
function makeQuoteContainer() {
	if(!quoteMaxIndex) {setTimeout(makeQuoteContainer, 1000)} else {
		showQuote(getRandomQuote(quoteMaxIndex))
	}
}
// Audio
const audio = new Audio()
let
playList,
playListMaxIndex,
playListIndex = 0
async function getPlayList(src = 'https://files.catbox.moe/ikrhxx.json') {
	const
	res = await fetch(src),
	data = await res.json()
	playList = await data.playList
	playListMaxIndex = await data[Object.keys(data)[0]].length - 1
}
function makePlayList() {
	if(!playList) {setTimeout(makePlayList, 1000)}
	else {
		for(let v of playList) {
			playListItem = document.createElement('div')
			playListItem.className = 'play-item'
			playListItem.innerHTML = v.title
			$('.play-list').appendChild(playListItem)
		}
		markCurrentTrack()
	}
}
function playAudio() {
	audio.src = playList[playListIndex].src
	audio.currentTime = 0
	audio.play()
	$('.play-list').childNodes[playListIndex].classList.toggle('item-active')
}
function pauseAudio() {
	audio.pause()
	$('.play-list').childNodes[playListIndex].classList.toggle('item-active')
}
function markCurrentTrack() {
	for(let v of $('.play-list').childNodes) v.style.textDecoration = 'none'
	$('.play-list').childNodes[playListIndex].style.textDecoration = 'underline'
}
function playNext() {
	if($('.play-list').childNodes[playListIndex].classList.contains('item-active')) pauseAudio()
	playListIndex < playListMaxIndex ?
		++playListIndex :
		playListIndex = 0
	markCurrentTrack()
	if($('.play').classList.contains('pause')) playAudio()
}
function playPrev() {
	if($('.play-list').childNodes[playListIndex].classList.contains('item-active')) pauseAudio()
	playListIndex > 0 ?
		--playListIndex :
		playListIndex = playListMaxIndex
	markCurrentTrack()
	if($('.play').classList.contains('pause')) playAudio()
}
function playAudioByPlayButton() {
	this.classList.contains('pause') ?
		pauseAudio() :
		playAudio()
	this.classList.toggle('pause')
}
// Localization
function changeLocale() {
	getWeather()
	showQuote(getQuote(quoteIndex))
	showLocalizedSettings()
}
// Search
let searchEngine = getLocalStorageItem('searchEngine') ?
	getLocalStorageItem('searchEngine') :
	'google'
function externalSearch() {
	let url = (searchEngine == 'google' ?
		'https://google.com/search?q=' :
		searchEngine == 'yandex' ?
			'https://yandex.com/search/?text=' :
			'https://duckduckgo.com/?q=') + encodeURI($('.search-field').value).replace(/\+/g, '%2B').replace(/\%20/g, '+')
	window.open(url, '_blank').focus()
}
function resizeInput() {
	this.style.minWidth = this.value.length + 4 + "ch";
}
// Settings
function showLocalizedSettings() {
	$('.user-tags').placeholder = translateTemplater('Comma-separated tags', 'Теги через запятую', 'Тэгі праз коску')
	$('[for="player"]').textContent = translateTemplater('Player', 'Плеер', 'Плэер')
	$('[for="search"]').textContent = translateTemplater('Search', 'Поиск', 'Пошук')
	$('[for="weather"]').textContent = translateTemplater('Weather', 'Погода', "Надвор'е")
	$('[for="time"]').textContent = translateTemplater('Time', 'Время', 'Час')
	$('[for="date"]').textContent = translateTemplater('Date', 'Дата', 'Дата')
	$('[for="greeting-container"]').textContent = translateTemplater('Greeting', 'Приветствие', 'Прывітанне')
	$('[for="quote-container"]').textContent = translateTemplater('Quote', 'Цитата', 'Цытата')
}
function changeLocaleByClick() {
	let l = this.getAttribute('for')
	currentLocale = $('#' + l).value
	changeLocale()
}
function changeBackgroundSource() {
	let l = this.getAttribute('for')
	if($('#' + l).value !== backgroundSource) {
		backgroundSource = $('#' + l).value
		makeBackgroundSlider(bodyBackgroundMaxIndex)
	}
}
function changeSearchEngineByClick() {
	let l = this.getAttribute('for')
	searchEngine = $('#' + l).value
}
let
elementsToHide = {
	['player'] : 0,
	['search'] : 0,
	['weather'] : 0,
	['time'] : 0,
	['date'] : 0,
	['greeting-container'] : 0,
	['quote-container'] : 0
},
arrElementsToHide = eval(getLocalStorageItem('arrElementsToHide')) ?
eval(getLocalStorageItem('arrElementsToHide')) :
[0,0,0,0,0,0,0]
function hideElements() {
	let i = 0
	arrElementsToHide.forEach(v => {elementsToHide[Object.keys(elementsToHide)[i]] = v; ++i})
	Object.entries(elementsToHide).forEach(v => $('.' + v[0]).style.cssText = Number(v[1]) ? 'opacity: 0; pointer-events: none;' : '')
}
function hideElementByClick() {
	let
	element = this.getAttribute('for'),
	controller = $('#' + element),
	itr = 0
	controller.checked ?
		elementsToHide[element] = 0 :
		elementsToHide[element] = 1
	while(itr < arrElementsToHide.length) {
		arrElementsToHide[itr] = elementsToHide[Object.keys(elementsToHide)[itr]]
		++itr
	}
	hideElements()	
}
// LocalStorage
function setLocalStorageItem(key, v) {
	if(typeof v !== 'undefined') localStorage.setItem(key, v)
}
function setLocalStorageItemFromElementClassValue(v) {
	setLocalStorageItem(v, $('.'+v).value)
}
function setLocalStorageFromClassValues() {
	for(let v of arguments){
		setLocalStorageItemFromElementClassValue(v)
	}
}
function setLocalStorageFromGlobalVariables() {
	for(let v of arguments){
		let
		eV = eval(v), 
		tV = (typeof eV !== 'undefined' && typeof eV !== 'string') ?
			JSON.stringify(eV) :
			eV
		setLocalStorageItem(v, tV)
	}
}
function getLocalStorageItem(v) {
	if(localStorage.getItem(v)) return localStorage.getItem(v)
}
function getLocalStorageItemToElementClassValue(v) {
	if(getLocalStorageItem(v)) $('.' + v).value = getLocalStorageItem(v)
}
function getLocalStorageToClassValues() {
	for(let v of arguments){
		getLocalStorageItemToElementClassValue(v)
	}
}
function checkInputs() {
	Object.keys(elementsToHide).forEach(v => {if(elementsToHide[v]) $('#' + v).checked = true})
	$('#' + currentLocale).checked = true
	$('#' + backgroundSource).checked = true
	$('#' + searchEngine).checked = true
}
// Data manipulations
const
classNamesValuesToLS = [
	'name',
	'city',
	'user-tags'
],
globalVariablesToLS = [
	'currentLocale',
	'quotes',
	'quoteMaxIndex',
	'playList',
	'playListMaxIndex',
	'backgroundSource',
	'searchEngine',
	'arrElementsToHide'
]
function regeneratePage() {
	showTimeAndDate()
	showGreeting()
	getWeather()
	if(typeof quoteIndex !== 'undefined') showRandomQuote()
	makeBackgroundSlider(bodyBackgroundMaxIndex)
	showLocalizedSettings()
	hideElements()
}
function initializePage() {
	getLocalStorageToClassValues(...classNamesValuesToLS)
	regeneratePage()
	if(getLocalStorageItem('quoteMaxIndex')) {
		quotes = JSON.parse(getLocalStorageItem('quotes'))
		quoteMaxIndex = Number(getLocalStorageItem('quoteMaxIndex'))
	}
	else {
		getQuotes('./scripts/quotes.json')
	}
	if(getLocalStorageItem('playListMaxIndex')) {
		playList = JSON.parse(getLocalStorageItem('playList'))
		playListMaxIndex = Number(getLocalStorageItem('playListMaxIndex'))
	}
	else {
		getPlayList('./scripts/playList.json')
	}
	makeQuoteContainer()
	makePlayList()
	checkInputs()
}
function saveToLocalStorage() {
	setLocalStorageFromClassValues(...classNamesValuesToLS)
	setLocalStorageFromGlobalVariables(...globalVariablesToLS)
}
// Listeners
window.addEventListener('beforeunload', saveToLocalStorage)
window.addEventListener('load', initializePage)

$('.slide-next').addEventListener('click', getSlideNext)
$('.slide-prev').addEventListener('click', getSlidePrev)
$('.city').addEventListener('input', getWeather)
$('.change-quote').addEventListener('click', showRandomQuote)
$('.play').addEventListener('click', playAudioByPlayButton)
$('.play-next').addEventListener('click', playNext)
$('.play-prev').addEventListener('click', playPrev)
audio.addEventListener('ended', playNext)
$('.search-field').addEventListener('keypress', e => {if(e.key == 'Enter') {externalSearch()}})
$('.search-field').addEventListener('input', resizeInput)
document.querySelectorAll('.locale-pb').forEach(v => v.addEventListener('click', changeLocaleByClick))
document.querySelectorAll('.bg-source-pb').forEach(v => v.addEventListener('click', changeBackgroundSource))
document.querySelectorAll('.search-pb').forEach(v => v.addEventListener('click', changeSearchEngineByClick))
document.querySelectorAll('.hide-pb').forEach(v => v.addEventListener('click', hideElementByClick))
console.log('Ваша оценка - 140 баллов \nОтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) добавлен прогресс-бар в котором отображается прогресс проигрывания \n2) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека \n3) над прогресс-баром отображается название трека \n4) отображается текущее и общее время воспроизведения трека \n5) есть кнопка звука при клике по которой можно включить/отключить звук \n6) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука \n7) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте \nВыполненные пункты:\n1) время выводится в 24-часовом формате, например: 21:01:00 \n2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) \n3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" \n4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток \n5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется \n6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз \n7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) \n8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) \n9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения \n10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage \n11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел \n12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) \n13) при загрузке страницы приложения отображается рандомная цитата и её автор \n14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) \n15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause \n16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play \n17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) \n18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем \n19) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. \n20) переводится язык и меняется формат отображения даты \n\nfeedback: В беларусской локали toLocaleDateString у меня не распознало локаль и выдавало дату на русском. ¯\\_( ͡° ͜ʖ ͡°)_/¯ btw в ТЗ нужно только два языка, а тут три, ОБРАЩАЮ ВНИМАНИЕ!\n\n21) переводится приветствие и placeholder \n22) переводится прогноз погоды в т.ч описание погоды и город по умолчанию \n23) переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая \n24) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется \n25) в качестве источника изображений может использоваться Unsplash API \n26) в качестве источника изображений может использоваться Flickr API \n27) в настройках приложения можно указать язык приложения (en/ru или en/be)  \n28) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API \n29) если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото \n30) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал \n31) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их \n32) настройки приложения сохраняются при перезагрузке страницы \n33) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным \n\nfeedback: Поиск с разными поисковиками. Эскейпить символы больно.')