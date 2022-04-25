let Bottombar = {
    render: async () => {
        let view = /*html*/ `
        <footer class="footer desktop">
            <a href="https://rs.school/js" class="rs-logo"></a>
            <div class="cr"><a href="https://github.com/roninpepe">Pepe the Ronin</a></div>
            <div class="year">2021</div>
        </footer>
        `
        return view
    },
    after_render: async () => {},
}

export default Bottombar
