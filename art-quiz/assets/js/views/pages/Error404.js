let Error404 = {
    render: async () => {
        document.querySelector('#hback').href = 'javascript:history.back()'
        document.querySelector('html').classList.add('chen')
        let view = /*html*/ `
            <section class="section">
                <h1> Nothing to honk here, go away. </h1>
            </section>
        `
        return view
    },
    after_render: async () => {
        let removeChen = () =>
            document.querySelector('html').classList.remove('chen')
        document.querySelector('#hback').addEventListener('click', removeChen)
        document
            .querySelector('.settings-btn')
            .addEventListener('click', removeChen)
        document
            .querySelector('.navbar-logo')
            .addEventListener('click', removeChen)
    },
}
export default Error404
