var creator = function(){
	var formulario = document.querySelector("#daumgoogle_generator"),
		cor;
	formulario.addEventListener("submit", function(e){
		frase = document.querySelector("#frase").value;
		e.preventDefault();

		if (document.querySelector('#cor_vermelho').checked) {
			cor = document.querySelector('#cor_vermelho').value;
		} else if (document.querySelector('#cor_verde').checked) {
			cor = document.querySelector('#cor_verde').value;
		} else if (document.querySelector('#cor_azul').checked) {
			cor = document.querySelector('#cor_azul').value;
		} else if (document.querySelector('#cor_amarelo').checked) {
			cor = document.querySelector('#cor_amarelo').value;
		} else {
			cor = null;
		};		
		if( frase !== "") {			
			goToGenerator(frase,cor);
		} else {
			alert("preencha a sua frase");
		};
	});
};	

var goToGenerator = function(frase,cor) {	
	setTimeout(window.location.href = "generate.html?frase="+frase+"&cor="+cor+"", 1000);	//apenas para se certificar que a informacao foi passada
};
/*globais*/
fraseGerada = "";
fraseOragnizada = "";
cor = "";

var geraFrase = function(){
	var q = window.location.href.split("?frase="),
		fraseGerada = q[1].split("&cor=");
	cor = fraseGerada[1];
	montaFrase(fraseGerada[0]);
	//aplica a cor
	document.querySelector("#page").style.backgroundColor = "#"+cor;
};
var montaFrase = function(fraseGerada) {	
	fraseParagrafo = document.querySelector("#gerafrase");
	//rotina de limpeza
	fraseOragnizada = fraseGerada
		.replace(/%20/g, ' ')
		.replace(/%22/g,'\"')
		.replace(/%C3%A0/g,'à')
		.replace(/%C3%82/g,'Â')
		.replace(/%C3%8A/g,'Ê')
		.replace(/%C3%94/g,'Ô')
		.replace(/%C3%83/g,'Ã')
		.replace(/%C3%95/g,'Õ')
		.replace(/%C3%A3/g,'ã')
		.replace(/%C3%B5/g,'õ')
		.replace(/%C3%81/g,'Á')
		.replace(/%C3%89/g,'É')
		.replace(/%C3%8D/g,'Í')
		.replace(/%C3%93/g,'Ó')
		.replace(/%C3%9A/g,'Ú')
		.replace(/%C3%A1/g,'á')
		.replace(/%C3%A9/g,'é')
		.replace(/%C3%AD/g,'í')
		.replace(/%C3%B3/g,'ó')
		.replace(/%C3%BA/g,'ú')
		.replace(/%C3%A2/g,'â')
		.replace(/%C3%AA/g,'ê')
		.replace(/%C3%B4/g,'ô')
		.replace(/%C3%A7/g,'ç')
		.replace(/%3F/g,'?')
		.replace(/\+/g,' ')
		.replace(/%C3%87/g,'Ç');		
};
var aplicaFrase = function() {
	//aplica a frase
	fraseParagrafo.innerHTML = fraseOragnizada;
	configuraAltura();
};
var configuraAltura = function(){
	// var ratio = window.devicePixelRatio || 1, w = screen.width * ratio, h = screen.height * ratio;
	document.querySelector("#page").style.height = window.innerHeight+"px";	
	mostraPagina();
};
var mostraPagina = function(){
	document.querySelector("#googlewrap").style.display = "block";
};

var geradorImagem = function(fraseOragnizada, cor){	
	var canvas = document.getElementById("canvas");	
	var html = ''+
	'<style>@import url(\'https://fonts.googleapis.com/css?family=Roboto:300,400\');*{box-sizing:border-box}</style>'+	
	'<div style="background-color:#'+cor+';padding:10px;height:650px;width:500px;position:relative;font-family:Roboto;font-weight:300;">'+
	'	<div style="width:80%;margin:0 auto;">'+
	'		<img src="/img/lupa.png" style="width:50px;height:50px;display:inline-block;margin-right:10px">'+
	'		<span style="color:#FFF;font-size:60px;font-family:Roboto">'+fraseOragnizada+'</span>'+
	'	</div>'+
	'	<section id="daumgoogle" style="position: absolute;left: 50%;bottom: 10%;margin-left: -10vw;">'+
	'		<div class="imgw" style="width: 13vw;height: 13vw;background-color: #fff;border-radius: 100%; margin: 0 auto 2vw;text-align: center;">'+
	'			<img src="/img/G.png" alt="" class="glogo" style="width: 13vw; height: 13vw;">'+
	'		</div>'+
	'		<p class="d_daumgoogle" style="font-size: 3vw; text-align: center; color:#FFF; font:300 3vw Roboto">Dá um Google</p>'+
	'	</section>'+
	'<div style="position:absolute;bottom:10px;right:10px;color:rgba(255,255,255,0.5);font:400 12px/1 Roboto">http://bit.do/da-um-google</div>'+
	'</div>'+	
	'<img src="someimg.png">'
	rasterizeHTML.drawHTML(html, canvas)
};
(function(){
	var body = document.getElementsByTagName("BODY")[0];
	var page = body.getAttribute("id");
	switch(page) {
		case "home":
			creator();
			break;
		case "generate":
			geraFrase();
			gerarImagem.addEventListener("click", function(){
				window.open("gerar-imagem.html?frase="+fraseOragnizada+"&cor="+cor, "_blank", "location=yes,width=520, height=670");
			});
			aplicaFrase();
			break;
		case "imagem-gerada":
			geraFrase();
			geradorImagem(fraseOragnizada, cor);
			break;
	};
})();

//FACEBOOK
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbshareCurrentPage() {
	window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(window.location.href)+"&picture=http%3A%2F%2Fda-um-google.planetwide-suicide.com%2Fimg%2Ffb.jpg&title="+escape(fraseOragnizada)+"&caption=d%C3%A1+um+google+generator&description=Gere+sua+frase+em:+http%3A%2F%2Fda-um-google.planetwide-suicide.com", '', 
	'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
	//window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(window.location.href)+"&t="+fraseGerada, '', 
	//'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
	return false; 
};