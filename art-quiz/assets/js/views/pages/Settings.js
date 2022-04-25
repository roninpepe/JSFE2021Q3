import Sound from '../../services/Sound.js'

let Settings = {
    render: async () => {
        document.querySelector('.settings-btn').href =
            'javascript:history.back()'
        document.querySelector('#hback').remove()
        let settings = globalThis.vars.settings,
            view = /*html*/ `
			<section class="section settings">
				<h2>SFX</h2>
				<input type="range" id="sfx" name="sfx" value="${
                    settings.sound.sfx.volume
                }" min="0" max="1" step="0.01">
				<div class="btn-sfx-mute pb icon">${
                    settings.sound.sfx.muted ? '🔇' : '🔈'
                }</div>
				<h2>Timer</h2>
				<input type="range" id="timer" name="timer" value="${
                    settings.timer.round.value
                }" min="0" max="30" step="5">
				<div class="timer-round">${
                    settings.timer.round.value
                        ? settings.timer.round.value
                        : 'Disabled'
                }</div>
			</section>
		`
        return view
    },
    after_render: async () => {
        let settings = globalThis.vars.settings
        document.querySelector('#sfx').addEventListener('change', function (e) {
            settings.sound.sfx.volume = Number(e.currentTarget.value)
            Sound.setVolume()
        })
        document
            .querySelector('.btn-sfx-mute')
            .addEventListener('click', function (e) {
                settings.sound.sfx.muted = settings.sound.sfx.muted ? 0 : 1
                Sound.setVolume()
                e.currentTarget.innerHTML = settings.sound.sfx.muted
                    ? '🔇'
                    : '🔈'
            })
        document
            .querySelector('#timer')
            .addEventListener('change', function (e) {
                settings.timer.round.value = Number(e.currentTarget.value)
                document.querySelector('.timer-round').innerHTML = settings
                    .timer.round.value
                    ? settings.timer.round.value
                    : 'Disabled'
            })
    },
}

export default Settings
