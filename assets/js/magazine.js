   //Función detectar el tamaño del dispostivo en que se abra la revista
   function checkMobile() { return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); }

   function addPage(page, book, lang) {

    var pages = book.turn('pages')
        // Create a new element for this page
    if (checkMobile()) {
        var element = $('<div />', { class: '' });
    } else {
        var element = $('<div />', {});

    }

    if (page % 2 == 0) {
        element.addClass('even')
    } else {
        element.addClass('odd')
    }


    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {
        // Add the initial HTML
        // It will contain a loader indicator and a gradient

        if (page !== 1  && page !== pages && page !== 2) {
            if (lang == 'es') {
                if(page % 2 == 0){
                    element.html('<div class="gradient"></div><div class="number-page" onclick=goPage(2)>' + (page-1) + '-Publicación Misiones Globales</div>')
                }else{
                    element.html('<div class="gradient"></div><div class="number-page" onclick=goPage(2)>Publicación Misiones Globales-' + (page-1) + '</div>');
                }
            } else {
                element.html('<div class="gradient"></div><div class="number-page" onclick=goPage(2)>' + (page-1) + ' </div>');
            }
        } else {
            element.html('<div class="gradient"></div>');
        }

        // Load the page
        loadPage(page, element, lang);
    }

}

   function loadPage(page, pageElement, lang) {

       // Create an image element

       var img = $(`<img id="background-page-${page}" />`, { class: 'backPage' + page });

       img.mousedown(function(e) {
           e.preventDefault();
       });

       $(img).on("load",function(){
            // Set the size
           $(this).css({ width: '100%', height: '100%' });

           // Add the image to the page after loaded

           $(this).appendTo(pageElement);

           // Remove the loader indicator

           pageElement.find('.loader').remove();
       });

       let background_diferent = [3,8,38,39,48,49]

       let background_jpg = [37,50]
       if(page == 10){
            video = $('<div/>', { 'class': 'videoPages' }).append($('<video />', { muted: "muted", id: "page-10-video", src: 'assets/pics/backgrounds/' + page + '.mp4', 'class': 'backVideo' + page }));
            video.appendTo(pageElement)
       }else{
        checkImage((background_diferent.includes(page))? 'assets/pics/backgrounds/' + page + '.png' : (background_jpg.includes(page)) ?'assets/pics/backgrounds/' + page + '.jpg' : 'assets/pics/backgrounds/' + page + '.webp', img, pageElement, page)
       }
       loadRegions(page, pageElement, lang);

   }

   function checkImage(url, img, element, page) {
       var request = new XMLHttpRequest();
       request.open("GET", url, true);
       request.send();
       request.onload = function() {
           status = request.status;
           if (request.status == 200) //if(statusText == OK)
           {
               img.attr('src', url);
           } else{
                if(page == 1 || page == 6 || page ==2){

                }else{
                    if(page == 44 || page == 45 || page == 4 || page == 5 || page == 38 || page == 39){
                        var video = $('<div/>', { 'class': 'videoPages' }).append($('<video/>', { playsinline: true, autoplay: true, src: 'assets/pics/backgrounds/' + page + '.webm', loop: true, 'class': 'backVideo' + page }));
                        video.appendTo(element)
                    }else{
                        var video = $('<div/>', { 'class': 'videoPages' }).append($('<video/>', { muted: true, playsinline: true, autoplay: true, src: 'assets/pics/backgrounds/' + page + '.mp4', loop: true, 'class': 'backVideo' + page }));
                        video.appendTo(element)
                    }
                }               
                
           }
       }
   }



   // Load regions

   function loadRegions(page, element, lang) {
       //console.log(lang);
       $.getJSON('./assets/pages-' + lang + '/' + page + '-page.json').
       done(function(data) {
           $.each(data, function(key, region) {
               addRegion(region, element, lang, page);
           });
       });
       /*CAPTURAR EXCEL DE PREGUNTAS Y RESPUESTAS*/
       if(page==45){
            fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQvhB_lZwOdrPfmu2HOmkQAr66b3RTX_WkU_Xqv7WglwyokeNfQZG7h5GuD4V-pH0AwlQyUoQRkWmnG/pubhtml?gid=162053975&single=true')
            .then(response => response.text())
            .then(html => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var table = doc.querySelector('table tbody');
                var tr = table.querySelectorAll('tr');

                const div_principal = document.querySelector('.answer-container');
                
                const ul = document.createElement('ul');
                ul.setAttribute('id','answer-container');
                for(i=2;i<tr.length;i++){
                    
                    var td = tr[i].querySelectorAll('td');

                    const li = document.createElement('li');
                    li.setAttribute('class','item');

                    const div = document.createElement('div');
                    div.setAttribute('class','top');

                    const strong = document.createElement('strong');
                    strong.innerHTML = td[1].innerText;


                    const div2 = document.createElement('div');
                    div2.setAttribute('class','bottom-container');
                    
                    const p = document.createElement('p');
                    p.setAttribute('id','button-'+i);
                    p.innerHTML = td[3].innerText;

                    const div3 = document.createElement('div');
                    div3.setAttribute('class', 'action');

                    const button = document.createElement('button');
                    button.setAttribute('class', 'answer-button');
                    button.setAttribute('id','boton-ocultar'+i);
                    button.setAttribute('onclick', "texto_completo("+i+")");

                    const img = document.createElement('img');
                    img.setAttribute('style','width: 100px');
                    img.setAttribute('src','assets/pics/icons/iconos_leermas2.png');

                    button.appendChild(img);
                    div3.appendChild(button);

                    div2.appendChild(p);
                    div.appendChild(strong);
                    li.appendChild(div);
                    li.appendChild(div2);
                    li.appendChild(div3);
                    ul.appendChild(li);
                }

                div_principal.appendChild(ul);

            })
            .catch(error => {
            console.error('Error:', error);
            });
       }
    }
   
//createWordsGame allows create the alphabet soup
function createWordsGame(words) {
    var gamePuzzle = wordfindgame.create(words, '#puzzle', '#words')
    var puzzle = wordfind.newPuzzle(words, { width: 18, height: 18, fillBlanks: false })
    wordfind.print(puzzle)
    //pintar matriz 15x15

    $('#solve').click(function () { wordfindgame.solve(gamePuzzle, words) })
    $('#clean').click(function () { wordfindgame.clean() })
}

   // Add region
function addRegion(region, pageElement, lang, page) {
       var reg = $(`<div />`, { 'class': 'region ' + region['class'] }).append(addComponents(region, lang))
       
       if (page == 40) {
        $('.p'+40).append(reg);
        var words = ['Fuentedeverdad', 'BuenasNuevas', 'Pastores', 'GranComision','Corazon','Viaje', 'Misiones','Noticias',  'Dar','Ofrenda']
        createWordsGame(words);
       }
       $(reg).attr('id', region.id_unique);

       reg.css({
           top: region.y,
           left: region.x,
           width: region.width,
           "z-index": region.zIndex,
       }).attr('region-data', $.param(region.data || ''));

       reg.appendTo(pageElement);
}

   // Process click on a region

   function regionClick(event) {
        /*ocultar leer mas de la pag 45 Respuestas obra Misionera*/
           
       var region = $(event.target).closest('div');

       if (region.hasClass('region')) {

           $('.magazine-viewport').data().regionClicked = true;

           setTimeout(function() {
               $('.magazine-viewport').data().regionClicked = false;
           }, 100);

           var regionType = $.trim(region.attr('class').replace('region', ''));

           return processRegion(region, regionType);

       }

   }

   // Process the data of every region

   function processRegion(region, regionType) {

       data = decodeParams(region.attr('region-data'));

       switch (regionType) {
           case 'link':
               window.open(data.url);
               break;

           case 'to-page':
            $('.magazine').turn('page', data.page);
               break;
       }

   }


   // http://code.google.com/p/chromium/issues/detail?id=128488

   function isChrome() {

       return navigator.userAgent.indexOf('Chrome') != -1;

   }

   function disableControls(page) {
       if (page == 1)
           $('.previous-button').hide();
       else
           $('.previous-button').show();

       if (page == $('.magazine').turn('pages'))
           $('.next-button').hide();
       else
           $('.next-button').show();
   }

   // Set the width and height for the viewport


   function resizeViewport() {

       var width = $(window).width() ,
           height = ($(window).height()),
           options = $('.magazine').turn('options'); 

       $('.magazine').removeClass('animated');

       if ( width <= 600 ) {
           height += ($(window).height() * 0.410) ;
       }
         

       $('.magazine-viewport').css({
           width: width,
           height: height
       })

       if ($('.magazine').turn('zoom') == 1) {
           var bound = calculateBound({
               width: options.width,
               height: options.height,
               boundWidth: Math.min(options.width, width),
               boundHeight: Math.min(options.height, height)
           });

           if (bound.width % 2 !== 0)
               bound.width -= 1;

           $('.magazine').css({ left: -bound.width / 2 });

           if (bound.width != $('.magazine').width() || bound.height != $('.magazine').height()) {

               if ($('.magazine').turn('page') == 1)
                   $('.magazine').turn('peel', 'br');
           }

           if (window.matchMedia("(max-width: 468px)").matches) {
               $('.magazine').turn('display', 'single');
               $('.magazine').turn('size', bound.width, height * 0.6);
               $('.magazine').css({ left: -bound.width / 2 });

           } else if (window.matchMedia("(max-width: 870px)").matches) {
               $('.magazine').turn('display', 'single');
               $('.magazine').turn('size', bound.width * 0.7, height);
               $('.magazine').css({ left: -bound.width / 2.5 });
           } else {
               $('.magazine').turn('display', 'double');
               $('.magazine').turn('size', width * 0.72, height);
               $('.magazine').css({ left: -width / 2.77 });
           }

       }

       $('.magazine').turn('peel', false);



   }

   //Go to the page
   function goPage(page) {
       $('.magazine').turn('page', page);
       $('.container-thumbs').remove()
   }


   // Number of views in a flipbook

   function numberOfViews(book) {
       return book.turn('pages') / 2 + 1;
   }

   // Current view in a flipbook

   function getViewNumber(book, page) {
       return parseInt((page || book.turn('page')) / 2 + 1, 10);
   }

   function moveBar(yes) {
       if (Modernizr && Modernizr.csstransforms) {
           $('#slider .ui-slider-handle').css({ zIndex: yes ? -1 : 10000 });
       }
   }

   // decode URL Parameters

   function decodeParams(data) {

       var parts = data.split('&'),
           d, obj = {};

       for (var i = 0; i < parts.length; i++) {
           d = parts[i].split('=');
           obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
       }

       return obj;
   }

   // Calculate the width and height of a square within another square

   function calculateBound(d) {

      var bound = { width: d.width, height: d.height };

       if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

           var rel = bound.width / bound.height;

           if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

               bound.width = Math.round(d.boundHeight * rel);
               bound.height = d.boundHeight;

           } else {

               bound.width = d.boundWidth;
               bound.height = Math.round(d.boundWidth / rel);

           }
       }

       return bound;
   }

   $('.magazine').bind("turning", function(event, page, view) {

        if (page == 10 || page == 11) {
            $('.backVideo10').trigger('play');
            $(".backVideo10").prop('muted', false);
            $('#play-video').attr('src','assets/pics/icons/pause.svg');
            $('#pause-video').attr('onclick',"pausevideo()"); 
        } else {
            $('.backVideo10').trigger('pause')
            $(".backVideo10").prop('muted', true);
            $('#play-video').attr('src','assets/pics/icons/play.svg');
            $('#pause-video').attr('onclick',"playvideo()"); 
        }

    });



   
