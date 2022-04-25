// I like spaghetti and especially pasta :^)
import Error404 from '../views/pages/Error404.js'
import Home from '../views/pages/Home.js'
import Categoty from '../views/pages/Category.js'
import Round from '../views/pages/Round.js'
import Game from '../views/pages/Game.js'
import Settings from '../views/pages/Settings.js'

import Navbar from '../views/components/Navbar.js'
import Bottombar from '../views/components/Bottombar.js'

import Utils from './Utils.js'
import Quiz from './Quiz.js'
import Sound from './Sound.js'

// init global vars (I hate module scoping)
globalThis.vars = (await JSON.parse(localStorage.getItem('vars'))) || {
    parsedJSON: await Quiz.parseJSON('./assets/js/json/images.json'),
    category: '0',
    userAnswers: Array(2).fill(Array(12).fill(Array(10).fill('0'))),
    session: '',
    settings: {
        sound: {
            sfx: {
                volume: 1,
                muted: 0,
            },
            music: {
                volume: 1,
                muted: 0,
            },
        },
        timer: {
            round: {
                value: 0,
                enable: 0,
            },
        },
    },
}
// LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('vars', JSON.stringify(globalThis.vars))
}

window.addEventListener('beforeunload', saveToLocalStorage)

// load data
;[globalThis.quizTypes, globalThis.quizRounds, globalThis.randomFiller] =
    await Quiz.getInitQuizDataFromJSON(globalThis.vars.parsedJSON, [
        'author',
        'picture',
    ])
await globalThis.quizRounds
saveToLocalStorage()
globalThis.vars = await JSON.parse(localStorage.getItem('vars'))

// audio
Sound.initGlobalVar()
Sound.setVolume()

document.addEventListener('click', () => globalThis.soundbank.sfx.click.play())

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home,
    '/category/:id': Categoty,
    '/round/:id': Round,
    '/quiz/:id': Game,
    '/settings': Settings,
}

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const header = null || document.getElementById('header_container')
    const content = null || document.getElementById('page_container')
    const footer = null || document.getElementById('footer_container')

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render()
    await Navbar.after_render()
    footer.innerHTML = await Bottombar.render()
    await Bottombar.after_render()

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL =
        (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render()
    await page.after_render()
}

// Listen on hash change:
window.addEventListener('hashchange', router)

// Listen on page load:
window.addEventListener('load', router)

console.log(`220/220
Стартовая страница и навигация +20
вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения +10
реализована навигация по страницам приложения +10

Настройки +40
в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда +10
в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +10
в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +10
при перезагрузке страницы приложения выбранные настройки сохраняются +10

Страница категорий +30
вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения +10
карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10

Страница с вопросами +50
вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения +10
варианты ответов на вопросы генерируются случайным образом +10
правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10
после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории +10
после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10

Страница с результатами +50
вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения +10
страница с результатами содержит превью всех картин категории +10
картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10
при клике по картине выводится информация о ней - название, автор, год создания +10
если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами +10

Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера +10
f: Возможен баг: для достижения требуемого эффекта используется как ожидание предзагрузки, так и использование Progressive JPEG (https://ru.wikipedia.org/wiki/JPEG#Разновидности_схем_сжатия_JPEG). Но при использовании их вместе у меня Хром иногда засчитывал onload при загрузке первых "чанков" картинки.

Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия, чтобы работа с приложением шла плавным и непрерывным потоком +15
f: таймер, попап, шторка на мобильной версии

Дополнительный функционал на выбор +9
возможность открыть приложение во весь экран +2
разные уведомления по окончанию раунда в зависимости от результата +2
f: 10, 9…1, 0
возможность скачать картину на компьютер +5
f: На странице счёта.

========================================

Для ментора:
190/220
Невыполненные пункты:
для сборки кода используется webpack. Студенты могут использовать как свою собственную, так и готовую сборку webpack -10
f: недавно переустанавливал ШИНДОШС, руки не дошли всю рабочую среду восстановить
используется eslint с конфигурацией eslint-config-airbnb-base, ошибки линтера исправлены, в eslint не добавляются собственные правила без согласования с ментором -10
f: эй, чистый код (° ͜ʖ͡°)╭∩╮
для написания компонентов приложения используются классы -10
f: не успел переписать
`)
