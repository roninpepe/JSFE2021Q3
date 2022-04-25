/*=== min date ===*/
function setMinDate(){
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("datefield").setAttribute("min", today);
}

/*=== viewport tracking ===*/
function inViewport(entries, observer) {
  entries.forEach(entry => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
}
const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

/*=== booking form sync ===*/
let sumprice=0;
function sumpf(){
  sumprice = (Number(localStorage.getItem("basic"))+Number(localStorage.getItem("senior"))/2)*Number(localStorage.getItem("ttypev"));
  const sumv=document.getElementsByClassName('sumv')[0];
  typeof sumprice === "number"?sumv.innerHTML=""+sumprice:sumv.innerHTML="0";
}
  //Save the value function - save it to localStorage as (ID, VALUE)
  function saveValue(e){
    var id = e.id;  // get the sender's id to save it . 
    var val = e.value; // get the value. 
    localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override .
    sumpf(); 
}
function saveValueR(e){
  var id = e.name;  // get the sender's id to save it . 
  var val = e.id; // get the value. 
  var n = e.value;
  localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override . 
  localStorage.setItem("ttypev",n);
  sumpf();
}
//get the saved value function - return the value of "v" from localStorage. 
function getSavedValue  (v){
    if (!localStorage.getItem(v)) {
        return "";// You can change this to your defualt value. 
    }
    return localStorage.getItem(v);
}

/*=== comparing slider ===*/
function initComparisons() {
  var x, i;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
     /* And released (for touch screens: */
    window.addEventListener("touchend", slideFinish);
    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

/*=== to-top button ===*/
let mybutton;
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*===== init on load =====*/

onload = function(){

  /*=== init min date ===*/
    setMinDate();
  
  /*=== init viewport tracking ===*/
    const ELs_inViewport = document.querySelector("#Gallery").querySelectorAll('img');
    ELs_inViewport.forEach(EL => {
      Obs.observe(EL, obsOptions);
    });

  
  /*=== init to-top button ===*/
    mybutton = document.getElementById("toTop");
    window.onscroll = function() {scrollFunction()};
    initComparisons();
  
  /*=== init gallery shuffle ===*/
    var parent = document.getElementById("shuffle");
    var frag = document.createDocumentFragment();
    while (parent.children.length) {
        frag.appendChild(parent.children[Math.floor(Math.random() * parent.children.length)]);
    }
    parent.appendChild(frag);
  
  /*=== init ripple ===*/
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
  
  /*=== init sliders ===*/
  tns({
    container: '.slider-w',
    items: 1,
    controlsPosition: 'bottom',
    navPosition: 'bottom',
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
    prevButton: '#e-slider-prev',
    nextButton: '#e-slider-next',
    navContainer: '#e-slider-pos',
});
tns({
  container: '.slider-yt-main',
  items: 1,
  autoplayButtonOutput: false,
  prevButton: '#yt-prev',
  nextButton: '#yt-next',
  navContainer: '#yt-nav',
});
tns({
  container: '.slider-yt-thumbs',
  items: 2,
  navAsThumbnails: true,
  gutter: 20,
  autoplayButtonOutput: false,
  prevButton: '#yt-prev',
  nextButton: '#yt-next',
  navContainer: '#yt-nav',
  responsive: {
    981: {
      items: 3,
      gutter: 40,
    }
  },
});
console.log('136 баллов\nОтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно \n2) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео \n3) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные \n4) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними \n5) клавиша Пробел — пауза, при повторном нажатии - play \n6) Клавиша M (англ) — отключение/включение звука \n7) Клавиша F — включение/выключение полноэкранного режима \n8) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика \n9) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика \n10) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них \n11) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа \n12) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа \nВыполненные пункты:\n1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам \n2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки \n3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) \n4) слайды перелистываются плавно с анимацией смещения вправо или влево \n5) перелистывание слайдов бесконечное (зацикленное) \n6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) \n7) при перелистывании слайдов кликами или свайпами меняется номер активного слайда \n8) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда \n9) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят \n10) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео \n11) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео \n12) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) \n13) перелистывание слайдов бесконечное (зацикленное) \n14) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) \n15) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда \n16) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается \n17) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается \n18) прогресс-бар отображает прогресс проигрывания видео \n19) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео \n20) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" \n21) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) \n22) при перемещении ползунка громкости звука изменяется громкость видео \n23) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой \n24) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой \n25) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем \n26) ползунок можно перетягивать мышкой по горизонтали \n27) ползунок никогда не выходит за границы картины \n28) при перемещении ползунка справа налево плавно появляется нижняя картина \n29) при перемещении ползунка слева направо плавно появляется верхняя картина \n30) при обновлении страницы ползунок возвращается в исходное положение \n31) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ \n32) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется \n33) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется \n34) при изменении количества билетов Basic и Senior пересчитывается общая цена за них \n35) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них \n36) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них \n37) когда пользователь выбирает дату в форме слева, она отображается в билете справа \n38) нельзя выбрать дату в прошлом \n39) когда пользователь выбирает время в форме слева, оно отображается в билете справа \n40) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут \n41) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы \n42) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв \n43) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр \n44) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" \n45) в секции Contacts добавлена интерактивная карта \n46) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету \n47) стиль карты соответствует макету \n48) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера \nfeedback: кнопка прокрутки страницы вверх')

  /*=== init syncing elements ===*/
  document.getElementById("basic").value = getSavedValue("basic");    // set the value to this input
  document.getElementById("senior").value = getSavedValue("senior");   // set the value to this input
  localStorage.getItem("ttype")?document.getElementById(localStorage.getItem("ttype")).checked = true:0;   // set the value to this input
  sumpf();
}