let listaDeSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();

let tentativas =1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela ('h1','Jogo do Número Secreto');
    exibirTextoNaTela( 'p', 'Escolha um Número de 1 a 10');
} 

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector ('input').value;
    console.log (chute == numeroSecreto);
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1','acertou');
        let mensagemTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p',`o número secreto é menor do que ${chute}`);
        }else{
            exibirTextoNaTela('p',`o número secreto é maior do que ${chute}`);
        } tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let numeroDeElementos = listaDeSorteados.length;

if (numeroDeElementos == numeroLimite){
    listaDeSorteados = [];
}

    if(listaDeSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeSorteados.push(numeroEscolhido);
        console.log(listaDeSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}