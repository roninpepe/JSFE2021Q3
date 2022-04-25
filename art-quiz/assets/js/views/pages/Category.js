import Utils from '../../services/Utils.js'
import Quiz from '../../services/Quiz.js'

let Category = {
    render: async () => {
        document.getElementById('hback').innerHTML = 'Home'
        let request = Utils.parseRequestURL()
        globalThis.vars.category = request.id
        let items = await Promise.all(
                globalThis.quizRounds[globalThis.vars.category].map(
                    async (item, index) =>
                        /*html*/ `<li class="picture-thumb${
                            globalThis.vars.userAnswers[
                                globalThis.vars.category
                            ][index].reduce((p, c) => Number(p) + Number(c))
                                ? ' played'
                                : ''
                        }"><a href="#/quiz/0" class="play-round" quiz-round="${index}">Round ${
                            index + 1
                        }</a><a href="#/round/${index}" class="score" title="Your score&#10;Click to view details" score="${globalThis.vars.userAnswers[
                            globalThis.vars.category
                        ][index].reduce(
                            (p, c) => Number(p) + Number(c)
                        )}"></a></li>`
                )
            ),
            view = /*html*/ `
			<section class="section category">
				<h1> Category: ${
                    Object.keys(globalThis.randomFiller)[
                        globalThis.vars.category
                    ]
                } </h1>
				<ul class="thumb-list">
					${items.join('\n ')}
				</ul>
			</section>
		`
        return view
    },
    after_render: async () => {
        Array.from(document.getElementsByClassName('picture-thumb')).forEach(
            async (e, i) => {
                await Quiz.setBackgroundStyle(
                    0,
                    [
                        await Quiz.getRandomItem(
                            globalThis.quizRounds[globalThis.vars.category][i]
                        ),
                    ][0].picture,
                    e
                )
                e.addEventListener(
                    'click',
                    async () =>
                        (globalThis.vars.session = await Quiz.initSession(i))
                )
            }
        )
    },
}

export default Category
