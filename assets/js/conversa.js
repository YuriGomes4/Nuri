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

$(document).ready(function() {
	
	// Select all elements with class "mensagem"
	var mensagens = $(".mensagem-placeholder");
	
	for (var i = 0; i < mensagens.length; i++) {
		var mensagemPlace = mensagens[i]
		var mensagem = mensagemPlace.querySelector(".mensagem");
	
		var tempWidth = mensagemPlace.innerWidth;
		var tempHeight = mensagemPlace.innerHeight;
	
		$(mensagemPlace).attr("ordem", ordem++);
		$(mensagem).css("display", 'none');
	
		mensagemPlace.style.width = tempWidth + "px";
		mensagemPlace.style.height = 36 + "px";
	}

	const windowHeight = window.innerHeight;
	verificarMensagens(windowHeight);

});

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