import Quiz from '../../services/Quiz.js'

let Home = {
    render: async () => {
        document.getElementById('hback').remove()
        let types = Object.keys(globalThis.randomFiller),
            items = await Promise.all(
                types.map(
                    async (type, index) =>
                        /*html*/ `<li class="picture-thumb"><a href="#/category/${index}" quiz-type="${index}">${type}</a></li>`
                )
            )
        let view = /*html*/ `
			<section class="section">
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
                    [await Quiz.getRandomItem(globalThis.quizTypes[i])][0]
                        .picture,
                    e
                )
            }
        )
    },
}

export default Home
