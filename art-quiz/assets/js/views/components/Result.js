import Utils from '../../services/Utils.js'

let Result = {
    render: (result) => {
        let question = Number([Utils.parseRequestURL()][0].id),
            total = globalThis.vars.session.length - 1,
            notEnd = question < total,
            category = Number(globalThis.vars.category),
            questionData = globalThis.vars.session[question],
            picture = questionData.picture,
            author = questionData.author,
            year = questionData.year,
            name = questionData.name,
            round = Number(questionData.round),
            sound = globalThis.soundbank.sfx,
            score = globalThis.vars.userAnswers[category][round].reduce(
                (p, c) => Number(p) + Number(c)
            ),
            answerSound = result ? sound.correct : sound.wrong,
            roundSound = score ? sound.victory : sound.lose,
            view = /*html*/ `
<div class="popup-result">
    <div class="popup-info ${result}">
        <div class="picture" style="background-image:url('./assets/img/full/${picture}.jpg');"></div>
        <div class="author">${author}</div>
        <div class="year">${year}</div>
        <div class="name">${name}</div>
    </div>
    ${
        notEnd
            ? ''
            : '<h4 class="round-result"><div class="result">' +
              (score ? (score === 10 ? 'Perfect!' : 'Victory!') : 'Lose') +
              '</div><div class="score">Your score: ' +
              score +
              '</div></h4>'
    }
    <div class="buttons">
        <a href="#/${
            notEnd ? 'quiz/' + (question + 1) : 'category/' + category
        }" class="btn-continue">${notEnd ? 'Next' : 'Continue'}</a>
    </div>
</div>
        `,
            stop = (sound) => {
                sound.pause()
                sound.currentTime = 0
            }
        stop(answerSound)
        stop(roundSound)
        notEnd ? answerSound.play() : roundSound.play()
        return view
    },
}

export default Result
