//Conte os dias desde a data 06/01/2024
var data = new Date('2024-01-06');
var dataAtual = new Date();
var diferenca = dataAtual.getTime() - data.getTime();
var dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
document.getElementById('titulo-texto2').innerText = dias-1;

//mostre o url base da página
var url = window.location.origin;

fetch('assets/images/fotos/lista.txt')
  .then(response => response.text())
  .then(text => {
    const links = text.split("\n");
    var fotos = document.getElementById('descricao');
        for (var i = 0; i < links.length-1; i++) {
            var link = links[i];
            var img = document.createElement('img');
            img.className = 'fotos';
            img.src = 'assets/images/fotos/'+link;
            fotos.appendChild(img);
        }
    }
);