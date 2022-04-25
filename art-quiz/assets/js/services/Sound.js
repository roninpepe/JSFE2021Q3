const Sound = {
    bank: {
        sfx: {
            click: new Audio('./assets/sound/misc/click.mp3'),
            correct: new Audio('./assets/sound/misc/correct.mp3'),
            wrong: new Audio('./assets/sound/misc/wrong.mp3'),
            victory: new Audio('./assets/sound/misc/victory.mp3'),
            lose: new Audio('./assets/sound/misc/lose.mp3'),
        },
        music: {
            combat: {
                c1: new Audio('./assets/sound/music/combat1.mp3'),
                c2: new Audio('./assets/sound/music/combat2.mp3'),
                c3: new Audio('./assets/sound/music/combat3.mp3'),
                c4: new Audio('./assets/sound/music/combat4.mp3'),
            },
        },
    },
    initGlobalVar: () => (globalThis.soundbank = Sound.bank),
    setVolume: () => {
        let findAudio = (obj, type) => {
            for (let item in obj) {
                if (typeof obj[item] === 'object') {
                    if (obj[item].tagName === 'AUDIO') {
                        let settings = globalThis.vars.settings.sound
                        for (let param in settings[type]) {
                            obj[item][param] = settings[type][param]
                        }
                    } else {
                        findAudio(obj[item], type)
                    }
                }
            }
        }
        for (let type in globalThis.soundbank) {
            findAudio(globalThis.soundbank[type], type)
        }
    },
}

export default Sound
