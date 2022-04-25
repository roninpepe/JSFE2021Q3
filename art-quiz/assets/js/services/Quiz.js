const Quiz = {
    parseJSON: async (src) => {
        const JSONData = await fetch(src)
        return await JSONData.json()
    },
    getArrayChunks: async (parsedJSON, counter) => {
        const reducer = (all, one, i) => {
            const chunk = Math.floor(i / counter)
            all[chunk] = [].concat(all[chunk] || [], one)
            return all
        }
        return await parsedJSON.reduce(reducer, [])
    },
    getObjectWithJSONFields: async (parsedJSON, ...fields) => {
        let obj = {}
        for (let field of fields) {
            let set = new Set()
            await parsedJSON.forEach((e) => set.add(e[field]))
            obj[field] = [...set]
        }
        return obj
    },
    getInitQuizDataFromJSON: async (parsedJSON, fields) => {
        let quizTypes = await Quiz.getArrayChunks(
                await parsedJSON,
                (await parsedJSON.length) / 2
            ),
            quizRounds = await Promise.all(
                quizTypes.map(
                    async (e) => await Quiz.getArrayChunks(await e, 10)
                )
            ),
            randomFiller = await Quiz.getObjectWithJSONFields(
                parsedJSON,
                ...fields
            )
        return [quizTypes, quizRounds, randomFiller]
    },
    getImagePath: async (type, index) => {
        return `./assets/img/${type ? 'full' : 'thumb'}/${index}.jpg`
    },
    setBackgroundStyle: async (type, index, item) => {
        const img = new Image()
        img.loading = 'eager'
        img.src = await Quiz.getImagePath(type, index)
        img.onload = () => (item.style.backgroundImage = `url('${img.src}')`)
    },
    getRandomItem: async (array) => {
        return await array[~~(Math.random() * array.length)]
    },
    shuffleArray: async (array) => {
        let i = await array.length
        while (i--) {
            const j = ~~(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return await array
    },
    initSession: async (round) => {
        let src = globalThis.quizRounds,
            filler = globalThis.randomFiller,
            type = globalThis.vars.category,
            typeName = Object.keys(filler)[type],
            sessionTmp = await src[type][round].map(async (v, i) => {
                let answers = new Set()
                answers.add(v[typeName])
                while (answers.size < 4)
                    answers.add(
                        await Quiz.getRandomItem(await filler[typeName])
                    )
                v.answers = await Quiz.shuffleArray([...answers])
                v.round = round + ''
                v.question = i + ''
                v.played = '0'
                return v
            }),
            session = await Quiz.shuffleArray(await Promise.all(sessionTmp))
        return await session
    },
    checkAnswer: (localNum, answer) => {
        localNum = Number(localNum)
        let session = globalThis.vars.session,
            question = Number(session[localNum].question),
            typeNum = Number(globalThis.vars.category),
            type = Object.keys(globalThis.randomFiller)[typeNum],
            round = Number(session[localNum].round),
            validAnswer = session[localNum][type],
            check = validAnswer === answer
        globalThis.vars.userAnswers[typeNum][round][question] = check
            ? '1'
            : '0'
        return check
    },
}

export default Quiz
