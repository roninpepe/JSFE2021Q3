import Utils from '../../services/Utils.js'
import Quiz from '../../services/Quiz.js'
import Result from '../components/Result.js'

let Game = {
    render: async () => {
        document.getElementById('hback').innerHTML = 'Category'
        document.getElementById('hback').href =
            '#/category/' + globalThis.vars.category
        let request = Utils.parseRequestURL(),
            category = Number(globalThis.vars.category),
            localNum = Number(request.id),
            session = globalThis.vars.session,
            question = Number(session[localNum].question),
            played = Number(session[localNum].played),
            timer = globalThis.vars.settings.timer.round.value,
            questions = session.map(
                (item, index) =>
                    /*html*/ `<a href="#/quiz/${index}" class="question${
                        (Number(item.played)
                            ? Quiz.checkAnswer(
                                  index,
                                  item.answers[Number(item.answer)]
                              )
                                ? ' true'
                                : ' false'
                            : '') + (index === localNum ? ' current' : '')
                    }"></a>`
            ),
            answer = session[localNum].answer
                ? Number(session[localNum].answer)
                : false,
            answers = await Promise.all(
                session[localNum].answers.map(
                    async (item, index) =>
                        /*html*/ `<div class="pb answer ${
                            played
                                ? Quiz.checkAnswer(localNum, item) ||
                                  answer === index
                                    ? Quiz.checkAnswer(localNum, item)
                                    : ''
                                : ''
                        }" ${
                            category
                                ? 'style="background-image: url(' +
                                  (await Quiz.getImagePath(0, item)) +
                                  ');font-size: 0"'
                                : ''
                        }>${item}</div>`
                )
            ),
            view = /*html*/ `
			<section class="section${timer ? ' timer' : ''} cat-${category} game${
                played
                    ? ' played ' +
                      Quiz.checkAnswer(question, session[localNum].answer)
                    : ''
            }">
                <h2 class="question-info">
                <div>Question ${localNum + 1}</div>
                    ${
                        category
                            ? 'Choose a painting by ' + session[localNum].author
                            : '<div class="question-picture"></div>Who is the author of ' +
                              session[localNum].name +
                              '?'
                    }</h2>
				<div class="answers">${answers.join('')}</div>
				<div class="progress">${questions.join('')}</div>
			</section>
			<div class="popup-cont"></div>
		`
        if (timer)
            document.documentElement.style.setProperty('--timer', `${timer}s`)
        return view
    },
    after_render: async () => {
        let request = Utils.parseRequestURL(),
            session = globalThis.vars.session,
            question = Number(request.id),
            played = Number(session[question].played)
        if (document.querySelector('.question-picture'))
            await Quiz.setBackgroundStyle(
                1,
                session[question].picture,
                document.querySelector('.question-picture')
            )
        document.querySelector('.answers').addEventListener('click', (e) => {
            if (e.target.classList.contains('answer')) {
                let result = Quiz.checkAnswer(question, e.target.innerHTML),
                    i = [...e.currentTarget.childNodes].indexOf(e.target)
                document.querySelector('.section').classList.add('played')
                session[question].played = '1'
                session[question].answer = '' + i
                e.target.classList.add(result)
                document.querySelector('.popup-cont').innerHTML =
                    Result.render(result)
                document.querySelector('.popup-cont').classList.add('active')
            }
        })

        if (globalThis.vars.settings.timer.round.value && !played) {
            globalThis.setTimeout(() => {
                if (
                    !Number(
                        session[Number([Utils.parseRequestURL()][0].id)].played
                    )
                ) {
                    let result = Quiz.checkAnswer(question, '')
                    document.querySelector('.section').classList.add('played')
                    document
                        .querySelector('.popup-cont')
                        .classList.add('active')
                    session[question].played = '1'
                    session[question].answer = '5'
                    document.querySelector('.popup-cont').innerHTML =
                        Result.render(result)
                }
            }, globalThis.vars.settings.timer.round.value * 1000)
        }
    },
}

export default Game
