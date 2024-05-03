const fpWidth = window.innerWidth;
const fpHeight = window.innerHeight;

//mostre o url base da página
var url = window.location.origin;

//ler um txt linha por linha
fetch('assets/images/fotos/lista.txt')
  .then(response => response.text())
  .then(text => {
    const links = text.split("\n");

	    var fotos = document.getElementById('div-fotos-pedido');

        for (var i = 0; i < links.length-1; i++) {
            var link = "assets/images/fotos/"+links[i];

            var foto = document.createElement('div');
            foto.id = 'draggable';
            foto.className = 'drag-foto pedido';
            
            var img = document.createElement('img');
            img.src = link;
            img.className = 'img-foto';
            foto.appendChild(img);

            var divDesc = document.createElement('div');
            divDesc.className = 'desc-foto';
            divDesc.innerText = 'S2';
            foto.appendChild(divDesc);

            fotos.appendChild(foto);
        }

        var foto = document.createElement('div');
        foto.id = 'draggable';
        foto.className = 'drag-foto pedido';
        foto.style.padding = '0px';
        foto.style.backgroundColor = 'transparent';
        foto.style.height = '110px';
        
        var img = document.createElement('img');
        img.src = 'assets/images/episodios/10/postit.jpg';
        img.className = 'img-foto';
        foto.appendChild(img);

        fotos.appendChild(foto);


        var fullpg = new fullpage('#fullpage', {
            //anchors:['slide1', 'slide2', 'slide3', 'slide4'],
            navigation: true,
            navigationPosition: 'right',
            touchSensitivity: 10,
            afterLoad: function(origin, destination) {carregarFotos(origin, destination);},
        });

        const dragFotos = document.querySelectorAll('.drag-foto');

        
            console.log('Carregou');
            var dgWidth = 122;
            //var dgWidth = dragFotos[i].offsetWidth;
            var dgHeight = 146;
            //var dgHeight = dragFotos[i].offsetHeight;

            var titulo_pedido = document.getElementById('titulo-section-pedido');

            for (var i = 0; i < dragFotos.length; i++) {
                var draggable = new PlainDraggable(dragFotos[i])

                draggable.containment = {
                    left: (dgWidth*0.9)*-1,
                    top: (dgHeight*0.9)*-1,
                    width: fpWidth+(dgWidth*0.8),
                    height: fpHeight+(dgHeight*0.8)};

                var nleft = Math.floor(Math.random() * (fpWidth-dgWidth));
                var ntop = Math.floor(Math.random() * (fpHeight-dgHeight))

                if (dragFotos[i].classList.contains('pedido')) {

                    //Faça o script verificar se a foto não vai ficar em cima do título
                    let i = 0;
                    
                    //console.log(titulo_pedido.offsetLeft, draggable.left+nleft+dgWidth, draggable.left+nleft, titulo_pedido.offsetWidth+titulo_pedido.offsetLeft);
                    //console.log(titulo_pedido.offsetTop, draggable.top+ntop+dgHeight, draggable.top+ntop, titulo_pedido.offsetHeight+titulo_pedido.offsetTop);

                    var horCob = true;
                    var verCob = true;

                    do {
                        if (titulo_pedido.offsetLeft > draggable.left+nleft+dgWidth || draggable.left+nleft > titulo_pedido.offsetWidth+titulo_pedido.offsetLeft) {
                            horCob = false;
                        } else {
                            horCob = true;
                        }

                        if (titulo_pedido.offsetTop > draggable.top+ntop+dgHeight || draggable.top+ntop > titulo_pedido.offsetHeight+titulo_pedido.offsetTop) {
                            verCob = false;
                        } else {
                            verCob = true;
                        }

                        if (horCob && verCob) {
                            nleft = Math.floor(Math.random() * (fpWidth-dgWidth));
                            ntop = Math.floor(Math.random() * (fpHeight-dgHeight))
                        }
                    }
                    while ((horCob && verCob))

                    /*if (titulo_pedido.offsetLeft > draggable.left+nleft+dgWidth || draggable.left+nleft > titulo_pedido.offsetWidth+titulo_pedido.offsetLeft) {
                        horCob = false;
                    } else {
                        horCob = true;
                    }

                    if (titulo_pedido.offsetTop > draggable.top+ntop+dgHeight || draggable.top+ntop > titulo_pedido.offsetHeight+titulo_pedido.offsetTop) {
                        verCob = false;
                    } else {
                        verCob = true;
                    }

                    console.log((horCob && verCob));*/

                }
                
                draggable.top += ntop;
                draggable.left += nleft;
                draggable.setOptions()
                draggable.onDragStart = function() {
                    fullpage_api.setAllowScrolling(false);
                };
                draggable.onDragEnd = function() {
                    fullpage_api.setAllowScrolling(true);
                };
            }
        


        function carregarFotos(origem, destino) {

            changeBackgroundColor(destino.index);
            var sections = document.querySelectorAll('.section');
            var dragFotos = sections[destino.index].querySelectorAll('.drag-foto');

            for (var i = 0; i < dragFotos.length; i++) {
                setTimeout(function(i) {
                    $(dragFotos[i]).fadeIn(1000);
                }, 300 * (i + 1), i);
            }
        }

        var navlinks = document.querySelectorAll('.nav_link')

        var maiorWidth = 0;

        for (var i = 0; i < navlinks.length; i++) {
            if (navlinks[i].offsetWidth > maiorWidth) {
                maiorWidth = navlinks[i].offsetWidth;
            }
        }

        for (var i = 0; i < navlinks.length; i++) {
            navlinks[i].style.width = maiorWidth+'px';
        }


        function changeBackgroundColor(step) {

            var sections = document.querySelectorAll(".section")

            var fundo = document.getElementById("fundo");

            // Current step based on function argument
            var currentStep = step;

            // Define the starting, middle, and ending colors
            const startColor = '#00070f'; // Night sky blue
            const middleColor = '#446275'; // Light blue (middle color)
            const endColor = '#87cefa'; // Daytime sky blue

            // Calculate the total number of steps (considering 3 colors)
            const totalSteps = (sections.length-1)-3; // Double the number of sections

            // Ensure step stays within valid range (0 to totalSteps)
            currentStep = Math.min(Math.max(currentStep, 0), totalSteps);

            // Calculate step size for each color transition (start to middle, middle to end)
            const stepRed1 = (parseInt(middleColor.substr(1, 2), 16) - parseInt(startColor.substr(1, 2), 16)) / (totalSteps / 2);
            const stepGreen1 = (parseInt(middleColor.substr(3, 2), 16) - parseInt(startColor.substr(3, 2), 16)) / (totalSteps / 2);
            const stepBlue1 = (parseInt(middleColor.substr(5, 2), 16) - parseInt(startColor.substr(5, 2), 16)) / (totalSteps / 2);

            const stepRed2 = (parseInt(endColor.substr(1, 2), 16) - parseInt(middleColor.substr(1, 2), 16)) / (totalSteps / 2);
            const stepGreen2 = (parseInt(endColor.substr(3, 2), 16) - parseInt(middleColor.substr(3, 2), 16)) / (totalSteps / 2);
            const stepBlue2 = (parseInt(endColor.substr(5, 2), 16) - parseInt(middleColor.substr(5, 2), 16)) / (totalSteps / 2);

            // Calculate color values based on current step
            let red, green, blue;
            if (currentStep < totalSteps / 2) {
                // Transition from start to middle color
                red = Math.floor(parseInt(startColor.substr(1, 2), 16) + (currentStep * stepRed1)).toString(16).padStart(2, '0');
                green = Math.floor(parseInt(startColor.substr(3, 2), 16) + (currentStep * stepGreen1)).toString(16).padStart(2, '0');
                blue = Math.floor(parseInt(startColor.substr(5, 2), 16) + (currentStep * stepBlue1)).toString(16).padStart(2, '0');
            } else {
                // Transition from middle to end color (adjusted step index)
                currentStep -= totalSteps / 2;
                red = Math.floor(parseInt(middleColor.substr(1, 2), 16) + (currentStep * stepRed2)).toString(16).padStart(2, '0');
                green = Math.floor(parseInt(middleColor.substr(3, 2), 16) + (currentStep * stepGreen2)).toString(16).padStart(2, '0');
                blue = Math.floor(parseInt(middleColor.substr(5, 2), 16) + (currentStep * stepBlue2)).toString(16).padStart(2, '0');
            }

            // Combine the calculated values into a new hex color string
            const newColor = `#${red}${green}${blue}`;

            // Set the background color with CSS transition
            document.body.style.transition = 'background-color 0.5s ease-in-out'; // Add transition property
            document.body.style.backgroundColor = newColor;
            if (step === totalSteps) {
                //fundo.style.opacity = 0;
                $(fundo).fadeOut(1000);
            } else if (step === 0) {
                fundo.style.backgroundImage = 'url("assets/images/bolinhas-br.png")';
                fundo.style.opacity = 1;
                $(fundo).fadeIn(1000);
            } else {
                if (step === (sections.length-1)-1 || step === (sections.length-1)-2) {
                    fundo.style.backgroundImage = 'url("assets/images/coracoes.png")';
                    fundo.style.opacity = 0.2;
                    document.body.style.backgroundColor = '#fa8787';
                    $(fundo).fadeIn(2000);
                } else if (step === (sections.length-1)) {
                    fundo.style.backgroundImage = 'url("assets/images/coracoes.png")';
                    fundo.style.opacity = 0.2;
                    document.body.style.backgroundColor = '#350000';
                } else {
                    fundo.style.backgroundImage = 'url("assets/images/bolinhas-br.png")';
                    fundo.style.opacity = (1-(step/totalSteps)).toFixed(2);
                    $(fundo).fadeIn(1000);
                }
            }
        }
})