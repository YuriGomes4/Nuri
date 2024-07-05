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

hash(getCookie("c")).then((result) => {
    hashResult = result;
    if (hashResult !== "20264a9d385ebd31243b85647adbb293b4770f7ceda7d9a64828939e3e255bc0") {
        window.location.href = "/";
    }
}).catch(console.error);

//ler um txt linha por linha
fetch('assets/resources/conversa.txt')
  .then(response => response.text())
  .then(text => {
    const linhas = text.split("\n");

	var mensagens = document.getElementById('mensagens');

	for (var i = 0; i < linhas.length; i++) {
	var linha = linhas[i];
	
		if (linha === "Yuri") {
			var mensagemPH = document.createElement('div');
			mensagemPH.className = 'mensagem-placeholder';
			mensagens.appendChild(mensagemPH);

			var mensagemDir = document.createElement('div');
			mensagemDir.className = 'mensagem mensagem-direita';
			mensagemPH.appendChild(mensagemDir);

			i++;
			linha = linhas[i];

			if (linha !== "Nicole") {
				var msg = document.createElement('p');
				msg.className = 'texto-mensagem';
				msg.innerText = linha;
				mensagemDir.appendChild(msg);
			} else {
				var resposta = document.createElement('div');
				resposta.className = 'resposta-mensagem';
				mensagemDir.appendChild(resposta);

				var nomeResp = document.createElement('p');
				nomeResp.className = 'texto-resposta-mensagem';
				nomeResp.innerText = linha;
				resposta.appendChild(nomeResp);

				i++;
				linha = linhas[i];

				var msgResp = document.createElement('p');
				msgResp.className = 'texto-resposta-mensagem';
				msgResp.innerText = linha;
				resposta.appendChild(msgResp);

				i++;
				linha = linhas[i];

				var msg = document.createElement('p');
				msg.className = 'texto-mensagem';
				msg.innerText = linha;
				mensagemDir.appendChild(msg);
			}
		} else {
			var mensagemPH = document.createElement('div');
			mensagemPH.className = 'mensagem-placeholder';
			mensagens.appendChild(mensagemPH);

			var mensagemEsq = document.createElement('div');
			mensagemEsq.className = 'mensagem mensagem-esquerda';
			mensagemPH.appendChild(mensagemEsq);

			i++;
			linha = linhas[i];

			if (linha !== "Yuri") {
				var msg = document.createElement('p');
				msg.className = 'texto-mensagem';
				msg.innerText = linha;
				mensagemEsq.appendChild(msg);
			} else {
				var resposta = document.createElement('div');
				resposta.className = 'resposta-mensagem';
				mensagemEsq.appendChild(resposta);

				var nomeResp = document.createElement('p');
				nomeResp.className = 'texto-resposta-mensagem';
				nomeResp.innerText = linha;
				resposta.appendChild(nomeResp);

				i++;
				linha = linhas[i];

				var msgResp = document.createElement('p');
				msgResp.className = 'texto-resposta-mensagem';
				msgResp.innerText = linha;
				resposta.appendChild(msgResp);

				i++;
				linha = linhas[i];

				var msg = document.createElement('p');
				msg.className = 'texto-mensagem';
				msg.innerText = linha;
				mensagemEsq.appendChild(msg);
			}
		
		}

	}

	// Select all elements with class "mensagem"
	var mensagens = $(".mensagem-placeholder");

	for (var i = 0; i < mensagens.length; i++) {
		var mensagemPlace = mensagens[i]
		var mensagem = mensagemPlace.querySelector(".mensagem");
	
		var tempWidth = mensagemPlace.offsetWidth; // Use offsetWidth instead of innerWidth
		var tempHeight = mensagemPlace.offsetHeight; // Use offsetHeight instead of innerHeight
	
		$(mensagemPlace).attr("ordem", ordem++);
		$(mensagem).css("display", 'none');

	
		mensagemPlace.style.width = tempWidth + "px";
		mensagemPlace.style.height = tempHeight + "px";
	}

	const windowHeight = window.innerHeight;
	verificarMensagens(windowHeight);

})

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

var ordem = 1; // Counter for order numbers

function verificarMensagens(windowHeight) {
	var ordemAtual = $("#mensagens").attr("ordem");

	function revelarMensagem(ordem, windowHeight) {
		proxMensagem = $(".mensagem-placeholder[ordem="+(parseInt(ordem)+1)+"]")[0]
		
		if (proxMensagem.getBoundingClientRect().top < windowHeight) {
			$(proxMensagem.querySelector('.mensagem')).fadeIn(1000);

			$("#mensagens").attr("ordem", parseInt(ordem)+1);
			if (parseInt(ordem)+1< $('.mensagem').length) {	
				revelarMensagem(parseInt(ordem)+1, windowHeight);
			}
		} else {
			return;
		}
	}

	if (parseInt(ordemAtual) < document.querySelectorAll('.mensagem').length) {	
		revelarMensagem(ordemAtual, windowHeight);
	}
}

window.addEventListener('scroll', function() {
	const scrollPosition = window.scrollY; // Obtém a posição vertical do scroll
	const windowHeight = window.innerHeight; // Altura da viewport

	verificarMensagens(windowHeight);
});