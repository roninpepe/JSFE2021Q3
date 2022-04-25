onload = function(){
  var parent = document.getElementById("shuffle");
  var frag = document.createDocumentFragment();
  while (parent.children.length) {
      frag.appendChild(parent.children[Math.floor(Math.random() * parent.children.length)]);
  }
  parent.appendChild(frag);
  const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX
        const y = e.clientY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = '50%'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})
}

var slider = tns({
    container: '.my-slider',
    items: 3,
    gutter: 20,
    slideBy: 1,
    controlsPosition: 'bottom',
    navPosition: 'bottom',
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
    controlsContainer: '#custom-control',
    responsive: {
      0 : {
        items: 1,
        nav: false
      },
      768: {
        items: 2,
        nav: true
      },
      1440 : {
        items: 3
      }
    },
    // mode: 'gallery',
    // speed: 2000,
    // animateIn: "scale",
    // controls: false,
    // nav: false,
    // edgePadding: 20,
    // loop: false,
},{
    container: '.my-slider',
    items: 3,
    gutter: 20,
    slideBy: 1,
    controlsPosition: 'bottom',
    navPosition: 'bottom',
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
    controlsContainer: '#custom-control',
    responsive: {
      0 : {
        items: 1,
        nav: false
      },
      768: {
        items: 2,
        nav: true
      },
      1440 : {
        items: 3
      }
    },
    // mode: 'gallery',
    // speed: 2000,
    // animateIn: "scale",
    // controls: false,
    // nav: false,
    // edgePadding: 20,
    // loop: false,  
});