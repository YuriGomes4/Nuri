//Conte os dias desde a data 06/01/2024
var data = new Date('2024-01-06');
var dataAtual = new Date();
var diferenca = dataAtual.getTime() - data.getTime();
var dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
document.getElementById('titulo-texto2').innerText = dias-1;

//mostre o url base da página
var url = window.location.origin;

//Ver todos os arquivos da pasta assets/images/fotos
var fotos = document.getElementById('descricao');
var xhr = new XMLHttpRequest();
xhr.open('GET', url+'/assets/images/fotos/', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var resposta = xhr.responseText;
        //Cace os links usando a string assets/images/fotos/
        var links = resposta.match(/assets\/images\/fotos\/[^"]+/g);
        for (var i = 1; i < links.length; i++) {
            var link = links[i];
            var img = document.createElement('img');
            img.className = 'fotos';
            img.src = link;
            fotos.appendChild(img);
        }
    }
}
xhr.send();