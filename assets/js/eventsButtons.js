//Function to replace # -> %23 to share the link
const doClick = (page, lang) => {
    var url = ''
    if (lang == 'es') {
        url = 'https://gospelgeek.github.io/fuentedeverdad/#pagina/' + page;
    } else {
        url = 'https://gospelgeek.github.io/fuentedeverdad/#page/' + page;
    }

    url = url.replace('#', '%23')
    return url
}


//Functions to show audio
const showAudio = (audio) => {
    $('#button-' + audio.id).parent().parent().css({ display: 'none' })
    $('#button-' + audio.id).css({ display: 'none' })
    $('#' + audio.id).css({ display: 'flex' })
    $('#' + audio.id)[0].play();
}

const click_autor = (e) => {

    if (e !== '') {
        //poner visible la caja de texto
        $('.read-more-box').removeClass('display-none')
        $('.read-more-content').addClass('aux-video-author')
        $('.read-more-close').addClass('change-color-text')
        $('.read-more-text').addClass('aux-video-author-text')
        $('.read-more-text').html(`<iframe width='100%' height='100%' src="${e}" title='' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`)
    }

}



//variables auxiliares para el audio
var band_audio = true;
var audio_array = [];
const hideAudio = () => {

    try {
        $('.button-audio').parent().parent().css({ display: 'flex' })
        $('.button-audio').css({ display: 'flex' })
        $('.audioPage').css({ display: 'none' })
        //$('.audioPage ')[0].pause();
        audio_array.map((audio) => {
            audio.pause();
        })
        band_audio = true;
        audio_array = [];
        $('.audio-img-content').removeClass('opacity-audio')
    }
    catch (error) {
        console.log(error)
    }

}

//event click of read more
const clickReadMore = async (e) => {

    //poner visible la caja de texto
    $('.read-more-box').removeClass('display-none')

    //scroll 0
    $('.read-more-text').scrollTop(0)

    let id_page = (e.replace("+", "").replace("+", "")).split('-')[2]
    let lang = (e.replace("+", "").replace("+", "")).split('-')[1]

    console.log(id_page, (e.replace("+", "").replace("+", "")).split('-')[1])

    if (id_page !== undefined && id_page !== '') {

        json = await getPagesJson(id_page, (lang !== 'espana') ? 1 : 0);

        if (lang !== 'espana') {
            text_insert = ((json[id_page])[lang]).find(x => x._id == 'text-read-more').text
        } else {
            text_insert = json.find(x => x._id == 'text-read-more').text
        }

        //insertar el texto en la caja de texto
        $('.read-more-text').html(text_insert)

    }

}


//evento click para quitar el read more
$('.read-more-close').on('click', function (event) {
    //prevent the default action for the click event
    event.preventDefault();

    $(this).parent().parent().addClass('display-none')
    //quitar reproductor de audio e video de un iframe
    $('.read-more-text').html('')
    $('.read-more-content').removeClass('aux-video-author')
    $('.read-more-close').removeClass('change-color-text')
    $('.read-more-text').removeClass('aux-video-author-text')
    $('.read-more-content').removeClass('height-auto')
});




//capturar el json de la pagina actual
async function getPagesJson(page, type) {

    try {
        const array = {
            "0": {
                fetch: `./assets/pages-es/${page}-page.json`
            },
            "1": {
                fetch: `./assets/json_Languages/languages.json`
            }
        }
        const response = await fetch((array[type]).fetch);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }

}


/**
 * @dec Simular el proceso de creacion de los componentes
*/
function change_info_page_lengauage(page, lang) {

    //crear el div padre
    if (checkMobile()) {
        element = $(`<div style='width: 100%; height: 100%;' id="content-inter-${page}" />`, { class: 'hard' });
    } else {
        element = $(`<div  style='width: 100%; height: 100%;' id="content-inter-${page}" />`, {});
    }

    if (page % 2 == 0) {
        element.addClass('even')
    } else {
        element.addClass('odd')
    }

    //Insertar html para saber en pagina se encuentra
    element.html('<div class="gradient"></div><div id=' + "pie-pagina-" + (page-1) + ' class="number-page" onclick=goPage(2)>' + (page-1) + '</div>');

    insert_img_background(page, element)

    if (lang !== 'es') { add_components_page(element, page, lang) } else { loadRegions(page, element, 'es') }

    return element

}



/**
 * @dec insertar imagen de fondo
*/
function insert_img_background(page, pageElement) {

    var img = $(`<img id="background-page-${page}" />`, { class: 'backPage' + page });

    img.mousedown(function (e) {
        e.preventDefault();
    });

    img.load(function () {

        // Set the size
        $(this).css({ width: '100%', height: '100%' });

        // Add the image to the page after loaded

        $(this).appendTo(pageElement);

        // Remove the loader indicator

        pageElement.find('.loader').remove();
    });

    // Load the page
    checkImage('../assets/pics/backgrounds/' + page + '.jpg', img, pageElement, page)

}

async function add_components_page(element, page, lang) {

    try {

        //sacar la informacion de la pagina
        json = await getPagesJson(5, 1);
        let data = (json[page])[lang]

        console.log(data)

        data.map((region) => {
            addRegion(region, element, 'es', page);
        })

    } catch (error) {
        console.log(error)
    }

}

const playAudio = (e) => {
    
    
    id_pag = e.split(",", 2);
    id_page = '#'+id_pag[1];
    e = id_pag[0];
    $('.backVideo10').trigger('pause')
    $(".backVideo10").prop('muted', true);
    if (audio_array.length > 0) {

        audio_array.map((audio) => {
            audio.pause();
        })
        //eventos para quitar el audio
        audio_array = [];
        band_audio = true;
        $(id_page).removeClass('opacity-audio')
        if(id_pag[1] == "page9" || id_pag[1] == "page10"){
            $('.backVideo10').trigger('play')
            $(".backVideo10").prop('muted', false);  
        }

    }
    else if (band_audio) {

        var audio = new Audio(e);
        audio_actual = audio;
        $(audio).attr('id', 'audio-page')
        audio.play();
        band_audio = false;

        audio_array.push(audio)
        $(id_page).addClass('opacity-audio')

        //saber si el audio no ha terminado
        audio.addEventListener('ended', function () {
            $(id_page).removeClass('opacity-audio')
            band_audio = true;
            audio_array = [];
        }, false);

    }

}

function click_ul_li(e) {

    $('.read-more-box').removeClass('display-none')
    let array_data_class = ['1','2','3','4','5']
    if (array_data_class.includes(e)) {
    $('.read-more-content').addClass('height-auto')
    }
    //scroll 0
    $('.read-more-text').scrollTop(0)

    const array = { 
        
    }

    $('.read-more-text').html(array[e])

}

function event_click_accordion(e) {

    const array = {
       
    }
    
    if (!$(`#accordion-${e}`).hasClass('active-accordion')) {
        $(`#accordion-${e}`).addClass('active-accordion')
        $(`#accordion-${e}`).parent().append(array[e])
    } else {
        $(`#accordion-${e}`).removeClass('active-accordion')
        $(`#accordion-${e}`).parent().find('p').remove()
        $(`#accordion-${e}`).parent().find('ul').remove()
    }


}

function indice_event(e) {
    $('.magazine').turn('page', e);
}


function click_boton_a_spanish() {
    var URLhash = window.location.hash;
    window.location.href = "./index.html"+URLhash;

}

function click_boton_a_english() {
    var URLhash = window.location.hash;
    window.location.href = "./index-en.html"+URLhash;

}

/*CARUSEL*/
  
function evento(e){

    $(".carousel-container").html("");
    const modal = $(e).data("id");
    const imagenes  = $(e).data("imagenes");
    const div = document.querySelector('#'+modal);
    const carousel = div.querySelector(".carousel-container");
    
    if(imagenes != "undefined" && imagenes != undefined){
        
        const div2 = document.createElement('div');
        div2.setAttribute('class','carousel-slide')
        carousel.appendChild(div2);

        for (let step = 0; step < imagenes.length; step++) {
            if(imagenes[step].tipo == "video"){
                /*const video = document.createElement('video');

                video.src = imagenes[step].src;
                video.setAttribute('alt', step+1)
                div2.appendChild(image);*/

            }else{

                const image = document.createElement('img');

                if(step==0){
                    image.setAttribute('class','active');
                }
    
                image.src = imagenes[step].src;
                image.setAttribute('alt', step+1)
                div2.appendChild(image);
            }
            
        }
    
        const images = carousel.querySelectorAll('img');
        const video = carousel.querySelectorAll('video');
        var prevBtn = document.querySelector('#'+modal+'1');
        var nextBtn = document.querySelector('#'+modal+'2');
        const fondo = document.querySelector('#'+modal);
        fondo.style.background = "none";
        let index = 0;

        function changeImage(n) {
            if(imagenes[n].tipo == "video"){
                /*images[index].classList.remove('active');
                index = (n + imagenes.length) % imagenes.length;
                video[index].classList.add('active');*/
            }
            else{
                images[index].classList.remove('active');
                index = (n + images.length) % images.length;
                images[index].classList.add('active');
            }
            
        } 

        prevBtn.addEventListener('click', () => {
            if(index>0){
                changeImage(index - 1);
            }
            
        });

        nextBtn.addEventListener('click', () => {

            if(index<images.length-1){
                changeImage(index + 1);
            }
            
        });

        $("#"+modal).modal('show');
    }else{
        alert("El Evento no posee imagenes");
    }

}

    
    
/* PAISES - PASTORES */  


function conectar_mexico(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    if(mexico.value == "6"){
        const audio = new Audio("./assets/audios/correct.wav");
        sonido = audio;
        mexico.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
        sonido.play();
    }else{
        if(mexico.value == "0"){
            mexico.setAttribute("style","rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
        }else{
            const audio = new Audio("./assets/audios/incorrecto.wav");
            sonido = audio;
            mexico.setAttribute("style","box-shadow: #f00 2px 0px 25px 2px inset;");
            sonido.play();
        }
        
    }

    if(mexico.value == "6" && colombia.value == "3" && japon.value == "1" && cambodia.value == "4" && costa_rica.value == "2" && chile.value == "5"){
        //alert("FILICITACIONES")
    }
}

function conectar_colombia(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    if(colombia.value == "3"){
        const audio = new Audio("./assets/audios/correct.wav");
        sonido = audio;
        colombia.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
        sonido.play();
    }else{
        if(colombia.value == "0"){
            colombia.setAttribute("style","rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
        }else{
            const audio = new Audio("./assets/audios/incorrecto.wav");
            sonido = audio;
            colombia.setAttribute("style","box-shadow: #f00 2px 0px 25px 2px inset;");
            sonido.play();
        }
        
    }

    if(mexico.value == "6" && colombia.value == "3" && japon.value == "1" && cambodia.value == "4" && costa_rica.value == "2" && chile.value == "5"){
        //alert("FILICITACIONES")
    }
}

function conectar_japon(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    if(japon.value == "1"){
        const audio = new Audio("./assets/audios/correct.wav");
        sonido = audio;
        japon.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
        sonido.play();
    }else{
        if(japon.value == "0"){
            japon.setAttribute("style","rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
        }else{
            const audio = new Audio("./assets/audios/incorrecto.wav");
            sonido = audio;
            japon.setAttribute("style","box-shadow: #f00 2px 0px 25px 2px inset;");
            sonido.play();
        }
        
    }

    if(mexico.value == "6" && colombia.value == "3" && japon.value == "1" && cambodia.value == "4" && costa_rica.value == "2" && chile.value == "5"){
        //alert("FILICITACIONES")
    }
}

function conectar_cambodia(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    if(cambodia.value == "4"){
        const audio = new Audio("./assets/audios/correct.wav");
        sonido = audio;
        cambodia.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
        sonido.play();
    }else{
        if(cambodia.value == "0"){
            cambodia.setAttribute("style","rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
        }else{
            const audio = new Audio("./assets/audios/incorrecto.wav");
            sonido = audio;
            cambodia.setAttribute("style","box-shadow: #f00 2px 0px 25px 2px inset;");
            sonido.play();
        }
        
    }

    if(mexico.value == "6" && colombia.value == "3" && japon.value == "1" && cambodia.value == "4" && costa_rica.value == "2" && chile.value == "5"){
        //alert("FILICITACIONES")
    }
}

function conectar_costa_rica(){
    
    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    if(costa_rica.value == "2"){
        const audio = new Audio("./assets/audios/correct.wav");
        sonido = audio;
        costa_rica.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
        sonido.play();
    }else{
        if(costa_rica.value == "0"){
            costa_rica.setAttribute("style","rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
        }else{
            const audio = new Audio("./assets/audios/incorrecto.wav");
            sonido = audio;
            costa_rica.setAttribute("style","box-shadow: #f00 2px 0px 25px 2px inset;");
            sonido.play();
        }
        
    }

    if(mexico.value == "6" && colombia.value == "3" && japon.value == "1" && cambodia.value == "4" && costa_rica.value == "2" && chile.value == "5"){
        //alert("FILICITACIONES")
    }
}

function conectar_chile(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    if(chile.value == "5"){
        const audio = new Audio("./assets/audios/correct.wav");
        sonido = audio;
        chile.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
        sonido.play();
    }else{
        if(chile.value == "0"){
            chile.setAttribute("style","rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
        }else{
            const audio = new Audio("./assets/audios/incorrecto.wav");
            sonido = audio;
            chile.setAttribute("style","box-shadow: #f00 2px 0px 25px 2px inset;");
            sonido.play();
        }
        
    }

    if(mexico.value == "6" && colombia.value == "3" && japon.value == "1" && cambodia.value == "4" && costa_rica.value == "2" && chile.value == "5"){
        //alert("FILICITACIONES")
    }
}

function conectar_resolver(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    mexico.value = "6";
    colombia.value = "3";
    japon.value = "1";
    cambodia.value = "4";
    costa_rica.value = "2";
    chile.value = "5";

    chile.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
    colombia.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
    japon.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
    cambodia.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
    costa_rica.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
    mexico.setAttribute("style","box-shadow: rgba(107, 237, 8) 2px 0px 25px 2px inset;");
}

function conectar_reiniciar(){

    const mexico = document.getElementById("word1");
    const colombia = document.getElementById("word2");
    const japon = document.getElementById("word3");
    const cambodia = document.getElementById("word4");
    const costa_rica = document.getElementById("word5");
    const chile = document.getElementById("word6");

    mexico.value = "0";
    colombia.value = "0";
    japon.value = "0";
    cambodia.value = "0";
    costa_rica.value = "0";
    chile.value = "0";

    chile.setAttribute("style","box-shadow: rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
    colombia.setAttribute("style","box-shadow: rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
    japon.setAttribute("style","box-shadow: rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
    cambodia.setAttribute("style","box-shadow: rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
    costa_rica.setAttribute("style","box-shadow: rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
    mexico.setAttribute("style","box-shadow: rgba(127, 215, 219, 255) 2px 0px 25px 2px inset;");
}


function texto_completo(e){
    console.log(e);
    const leermas = document.querySelector('#button-'+e);
    leermas.setAttribute('style',"display:block !important");
    const ocultar = document.querySelector('#boton-ocultar'+e);
    ocultar.setAttribute('style','display: none');
}

/*const mostrar_leer_mas = document.querySelector('#page-wrapper-45');
        mostrar_leer_mas.addEventListener("click", ()=>{
            const ocultar = document.querySelector(".bottom-container p");
            ocultar.setAttribute("style","display: -webkit-box;");
            const mostrar_boton = document.querySelector('#boton-ocultar2');
            mostrar_boton.setAttribute("style","display: block")
            console.log(mostrar_boton);
 })*/

function abrirmodal(e){
    var modal = $(e).data('modal');
    if(modal == "modal-p11" || modal == "modal-p10"){
        $('.backVideo10').trigger('pause');
        $(".backVideo10").prop('muted', true);
    }

    $("#"+modal).modal('show');
}







