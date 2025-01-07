function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}

/*hash(getCookie("c")).then((result) => {
    hashResult = result;
    if (hashResult !== "20264a9d385ebd31243b85647adbb293b4770f7ceda7d9a64828939e3e255bc0") {
        window.location.href = "/";
    }
}).catch(console.error);*/

const fpWidth = window.innerWidth;
const fpHeight = window.innerHeight;

//mostre o url base da página
var url = window.location.origin;


carregado = false;
    

async function loadFotos() {

    if (!carregado) {
        carregado = true;
    } else {
        window.offsetHeight;
        window.innerHeight;
        return;
    }

    try {
        const response = await fetch('/assets/images/fotos/lista.txt');
        const text = await response.text();
        const links = text.split("\n");

        var fotos = document.getElementById('div-fotos-pedido');

        for (var i = 0; i < links.length - 1; i++) {
            var link = "/assets/images/fotos/" + links[i];

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
        img.src = '/assets/images/episodios/10/postit.jpg';
        img.className = 'img-foto';
        foto.appendChild(img);

        fotos.appendChild(foto);

        var fullpg = new fullpage('#fullpage', {
            navigation: false,
            navigationPosition: 'right',
            touchSensitivity: 10,
            afterLoad: function (origin, destination) { carregarFotos(origin, destination); },
        });

        const dragFotos = document.querySelectorAll('.drag-foto');

        console.log('Carregou');
        var dgWidth = 122;
        var dgHeight = 146;

        var titulo_pedido = document.getElementById('titulo-section-pedido');

        for (var i = 0; i < dragFotos.length; i++) {
            var draggable = new PlainDraggable(dragFotos[i])

            draggable.containment = {
                left: (dgWidth * 0.9) * -1,
                top: (dgHeight * 0.9) * -1,
                width: fpWidth + (dgWidth * 0.8),
                height: fpHeight + (dgHeight * 0.8)
            };

            var nleft = Math.floor(Math.random() * (fpWidth - dgWidth));
            var ntop = Math.floor(Math.random() * (fpHeight - dgHeight))

            if (dragFotos[i].classList.contains('pedido')) {
                let i = 0;
                var horCob = true;
                var verCob = true;

                do {
                    if (titulo_pedido.offsetLeft > draggable.left + nleft + dgWidth || draggable.left + nleft > titulo_pedido.offsetWidth + titulo_pedido.offsetLeft) {
                        horCob = false;
                    } else {
                        horCob = true;
                    }

                    if (titulo_pedido.offsetTop > draggable.top + ntop + dgHeight || draggable.top + ntop > titulo_pedido.offsetHeight + titulo_pedido.offsetTop) {
                        verCob = false;
                    } else {
                        verCob = true;
                    }

                    if (horCob && verCob) {
                        nleft = Math.floor(Math.random() * (fpWidth - dgWidth));
                        ntop = Math.floor(Math.random() * (fpHeight - dgHeight))
                    }
                }
                while ((horCob && verCob))
            }

            function insertAfter(newNode, referenceNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            }

            draggable.top += ntop;
            draggable.left += nleft;
            draggable.setOptions()
            draggable.onDragStart = function () {
                fullpage_api.setAllowScrolling(false);
                console.log(this.element);

                var parent = this.element.parentNode;
                var nDragFotos = parent.querySelectorAll('.drag-foto');

                insertAfter(this.element, nDragFotos[nDragFotos.length - 1]);
            };
            draggable.onDragEnd = function () {
                fullpage_api.setAllowScrolling(true);
            };
        }

        function carregarFotos(origem, destino) {
            changeBackgroundColor(destino.index);
            var sections = document.querySelectorAll('.section');
            var dragFotos = sections[destino.index].querySelectorAll('.drag-foto');

            for (var i = 0; i < dragFotos.length; i++) {
                if (destino.index !== sections.length - 1) {
                    setTimeout(function (i) {
                        $(dragFotos[i]).fadeIn(1000);
                    }, 300 * (i + 1), i);
                } else {
                    var titulo_pedido_section = document.getElementById('titulo-section-pedido');
                    var titulo_pedido = titulo_pedido_section.querySelector('#titulo-texto1');
                    titulo_pedido.style.display = 'none';
                    titulo_pedido.style.opacity = 1;
                    setTimeout(function (i) {
                        $(titulo_pedido).fadeIn(1500);
                    }, 2000);
                    setTimeout(function (i) {
                        $(dragFotos[i]).fadeIn(1000);
                    }, 600 * (i + 1), i);
                }
                console.log(destino.index, sections.length - 1);
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
            navlinks[i].style.width = maiorWidth + 'px';
        }

        function changeBackgroundColor(step) {
            var sections = document.querySelectorAll(".section")
            var fundo = document.getElementById("fundo");

            var currentStep = step;
            const startColor = '#00070f';
            const middleColor = '#446275';
            const endColor = '#87cefa';
            const totalSteps = (sections.length - 1) - 4;

            currentStep = Math.min(Math.max(currentStep, 0), totalSteps);

            const stepRed1 = (parseInt(middleColor.substr(1, 2), 16) - parseInt(startColor.substr(1, 2), 16)) / (totalSteps / 2);
            const stepGreen1 = (parseInt(middleColor.substr(3, 2), 16) - parseInt(startColor.substr(3, 2), 16)) / (totalSteps / 2);
            const stepBlue1 = (parseInt(middleColor.substr(5, 2), 16) - parseInt(startColor.substr(5, 2), 16)) / (totalSteps / 2);

            const stepRed2 = (parseInt(endColor.substr(1, 2), 16) - parseInt(middleColor.substr(1, 2), 16)) / (totalSteps / 2);
            const stepGreen2 = (parseInt(endColor.substr(3, 2), 16) - parseInt(middleColor.substr(3, 2), 16)) / (totalSteps / 2);
            const stepBlue2 = (parseInt(endColor.substr(5, 2), 16) - parseInt(middleColor.substr(5, 2), 16)) / (totalSteps / 2);

            let red, green, blue;
            if (currentStep < totalSteps / 2) {
                red = Math.floor(parseInt(startColor.substr(1, 2), 16) + (currentStep * stepRed1)).toString(16).padStart(2, '0');
                green = Math.floor(parseInt(startColor.substr(3, 2), 16) + (currentStep * stepGreen1)).toString(16).padStart(2, '0');
                blue = Math.floor(parseInt(startColor.substr(5, 2), 16) + (currentStep * stepBlue1)).toString(16).padStart(2, '0');
            } else {
                currentStep -= totalSteps / 2;
                red = Math.floor(parseInt(middleColor.substr(1, 2), 16) + (currentStep * stepRed2)).toString(16).padStart(2, '0');
                green = Math.floor(parseInt(middleColor.substr(3, 2), 16) + (currentStep * stepGreen2)).toString(16).padStart(2, '0');
                blue = Math.floor(parseInt(middleColor.substr(5, 2), 16) + (currentStep * stepBlue2)).toString(16).padStart(2, '0');
            }

            const newColor = `#${red}${green}${blue}`;

            document.body.style.transition = 'background-color 0.5s ease-in-out';
            document.body.style.backgroundColor = newColor;
            if (step === totalSteps) {
                $(fundo).fadeOut(1000);
            } else if (step === 0) {
                fundo.style.backgroundImage = 'url("/assets/images/bolinhas-br.png")';
                fundo.style.opacity = 1;
                $(fundo).fadeIn(1000);
            } else {
                if (step === (sections.length - 1) - 1 || step === (sections.length - 1) - 2 || step === (sections.length - 1) - 3) {
                    fundo.style.backgroundImage = 'url("/assets/images/coracoes.png")';
                    fundo.style.opacity = 0.2;
                    document.body.style.backgroundColor = '#fa8787';
                    $(fundo).fadeIn(2000);
                } else if (step === (sections.length - 1)) {
                    fundo.style.backgroundImage = 'url("/assets/images/coracoes.png")';
                    fundo.style.opacity = 0.2;
                    document.body.style.backgroundColor = '#350000';
                } else {
                    fundo.style.backgroundImage = 'url("/assets/images/bolinhas-br.png")';
                    fundo.style.opacity = (1 - (step / totalSteps)).toFixed(2);
                    $(fundo).fadeIn(1000);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

loadFotos();



function page_out (link) {
    var blackout = document.getElementById('blackout');
    var main = document.getElementById('fullpage');
    var fundo = document.getElementById('fundo');

    blackout.style.transition = 'opacity 0.5s ease';
    blackout.offsetHeight;
    blackout.style.opacity = 1;

    //main.style.filter = 'blur(100px)';
    main.setAttribute('style', '--blur: 100px');
    fundo.style.filter = 'blur(100px)';

    setTimeout(() => {
        if (link === 'back') {
            window.history.back();
        } else {
            window.location.href = link;
        }
        page_in();
    }, 500);

}

function page_in () {
    var blackout = document.getElementById('blackout');
    var main = document.getElementById('fullpage');

    //blackout.style.transition = 'none';
    blackout.style.opacity = 1;
    blackout.offsetHeight;
    blackout.style.transition = 'opacity 0.5s ease';
    blackout.style.opacity = 0;

    //main.style.filter = 'blur(0px)';
    main.setAttribute('style', '--blur: 0px');
    fundo.style.filter = 'blur(0px)';
}

loadFotos();

controle = 0;

window.onload = function() {

    onDOMLoaded();

};

if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", onDOMLoaded);
else 
    onDOMLoaded();

function onDOMLoaded() {
    controle++;

    if (controle === 2) {
        page_in();
    }
}