import Utils from '../../services/Utils.js'
import Quiz from '../../services/Quiz.js'

let Round = {
    render: async () => {
        document.getElementById('hback').innerHTML = 'Category'
        document.getElementById('hback').href =
            '#/category/' + globalThis.vars.category
        let request = Utils.parseRequestURL(),
            round = Number(request.id),
            items = await Promise.all(
                globalThis.quizRounds[globalThis.vars.category][round].map(
                    async (item, index) =>
                        /*html*/ `<li class="round-item picture-thumb pb" quiz-round="${index}" solved="${
                            globalThis.vars.userAnswers[
                                globalThis.vars.category
                            ][round][index]
                        }"><div class="round-info"><a download href="${await Quiz.getImagePath(
                            1,
                            item.picture
                        )}">Download</a><div class="info"><div class="author">${
                            item.author
                        }</div><div class="year">${
                            item.year
                        }</div><div class="name">${
                            item.name
                        }</div></div></div></li>`
                )
            ),
            view = /*html*/ `
			<section class="section round-page">
				<h1>Category: ${
                    Object.keys(globalThis.randomFiller)[
                        globalThis.vars.category
                    ]
                }</h1>
				<h2>Round ${round + 1}</h2>
				<ul class="round-grid">
					${items.join('\n ')}
				</ul>
			</section>
		`
        return view
    },
    after_render: async () => {
        Array.from(document.getElementsByClassName('picture-thumb')).forEach(
            async (e, i) => {
                let request = Utils.parseRequestURL(),
                    round = Number(request.id)
                await Quiz.setBackgroundStyle(
                    0,
                    globalThis.quizRounds[globalThis.vars.category][round][i]
                        .picture,
                    e
                )
                e.addEventListener('click', (e) =>
                    e.currentTarget.classList.toggle('show-info')
                )
            }
        )
    },
}

export default Round
