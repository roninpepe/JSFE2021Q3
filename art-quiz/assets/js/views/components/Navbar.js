let Navbar = {
    render: async () => {
        let view = /*html*/ `
			 <nav class="navbar" role="navigation" aria-label="main navigation">
				<div class="navbar-start">
					<div class="borgir-btn pb icon mobile">☰</div>
					<div class="navbar-borgir desktop">
						<div class="navbar-borgir-start">
							<a class="navbar-item navbar-logo" href="#/"></a>
							<div class="navbar-submenu">
								<a href="#/" class="navbar-item pb" id="hback">Back</a>
							</div>
						</div>
						<div class="navbar-footer mobile">
							<div class="cr"><a href="https://github.com/roninpepe">Pepe the Ronin</a></div>
						</div>
					</div>
				</div>
				<div class="navbar-end">
					<div class="fullscreen-btn pb icon" title="Fullscreen" onclick="!document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen ? document.exitFullscreen() : null">⛶</div>
					<a href="#/settings" class="settings-btn icon">⚙</a>
			</nav>
		`
        return view
    },
    after_render: async () => {
        document.querySelector('html').classList.remove('ofh')
        document.querySelector('.borgir-btn').addEventListener('click', () => {
            document.querySelector('.navbar-borgir').classList.toggle('active')
            document.querySelector('html').classList.toggle('ofh')
        })
    },
}

export default Navbar
