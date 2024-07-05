function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}

hash(getCookie("c")).then((result) => {
    hashResult = result;
    if (hashResult !== "20264a9d385ebd31243b85647adbb293b4770f7ceda7d9a64828939e3e255bc0" && hashResult !== "6baa2eb3b9aa2426a956ddd4aae3211a013279f52815e9a758556c8c8d0f8d20") {
        window.location.href = "/";
    }
}).catch(console.error);

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

            if (i == 16) {
                img.onclick = function() {
                    setCookie("c", "");
                    window.location.href = "/";
                }
            }
        }
    }
);