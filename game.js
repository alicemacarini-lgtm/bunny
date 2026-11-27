// Lista dos 6 momentos do dia para cuidar do Bunny
const momentosDoDia = [
  {
    acaoCerta: "comer",
    cenarioIdeal: "comida",
    icone: "🥕",
    fala: "Bom dia! Minha barriguinha está roncando...",
    acerto: "Nham nham! A cenourinha estava deliciosa!",
    dica: "Que tal ir para o Canto da Comida dar comidinha?"
  },
  {
    acaoCerta: "agua",
    cenarioIdeal: "comida",
    icone: "💧",
    fala: "Agora deu uma sedezinha depois de comer!",
    acerto: "Glub glub! Aguinha fresquinha!",
    dica: "Ele quer beber aguinha lá no Canto da Comida!"
  },
  {
    acaoCerta: "brincar",
    cenarioIdeal: "quarto",
    icone: "🧶",
    fala: "Estou cheio de energia! Vamos brincar no quarto?",
    acerto: "Eba! Ele adorou brincar no tapete fofinho!",
    dica: "Vamos para o Quarto Fofinho brincar com ele!"
  },
  {
    acaoCerta: "carinho",
    cenarioIdeal: "quarto",
    icone: "💖",
    fala: "Quero ficar bem pertinho e ganhar cafuné...",
    acerto: "Purr... ele fechou os olhinhos de tanto carinho!",
    dica: "O Bunny só quer um pouquinho de carinho agora."
  },
  {
    acaoCerta: "comer",
    cenarioIdeal: "comida",
    icone: "🍓",
    fala: "Hora do lanchinho da tarde! Tem moranguinho?",
    acerto: "Mnham! Ele amou o lanchinho na tigela rosa!",
    dica: "Ele está pedindo um lanchinho no Canto da Comida."
  },
  {
    acaoCerta: "dormir",
    cenarioIdeal: "quarto",
    icone: "🌙",
    fala: "Bocejo... já está ficando tarde, quero minha caminha.",
    acerto: "Zzz... ele deitou na caminha de madeira bem quentinho!",
    dica: "Leve ele para o Quarto Fofinho para dormir."
  }
];

// Variáveis de estado do jogo
let indiceMomento = 0;
let cenarioAtual = "quarto";
let estaTriste = false;
let tempoInicio = Date.now();
let acoesFeitas = 0;

// Pegando os elementos da tela
const textoMomento = document.getElementById("texto-momento");
const botaoTema = document.getElementById("botao-tema");
const abaQuarto = document.getElementById("aba-quarto");
const abaComida = document.getElementById("aba-comida");
const palco = document.getElementById("palco");
const decoracaoQuarto = document.getElementById("decoracao-quarto");
const decoracaoComida = document.getElementById("decoracao-comida");
const iconePedido = document.getElementById("icone-pedido");
const textoPedido = document.getElementById("texto-pedido");
const botaoCoelhinho = document.getElementById("coelhinho");
const coelhinhoVisual = document.getElementById("coelhinho-visual");
const efeitoCoracao = document.getElementById("efeito-coracao");
const mensagemStatus = document.getElementById("mensagem-status");
const botoesAcao = document.querySelectorAll(".botao-acao");
const telaFinal = document.getElementById("tela-final");
const botaoReiniciar = document.getElementById("botao-reiniciar");

// Função para avisar o portal sobre a altura da tela
function avisarAlturaPortal() {
  const altura = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "vrgame:resize", height: altura }, "*");
}

// Função para trocar entre o Quarto Fofinho e o Canto da Comida
function trocarCenario(novoCenario) {
  cenarioAtual = novoCenario;

  if (novoCenario === "quarto") {
    abaQuarto.classList.add("ativa");
    abaComida.classList.remove("ativa");
    palco.classList.remove("cenario-comida");
    palco.classList.add("cenario-quarto");
    decoracaoQuarto.classList.remove("escondido");
    decoracaoComida.classList.add("escondido");
  } else {
    abaComida.classList.add("ativa");
    abaQuarto.classList.remove("ativa");
    palco.classList.remove("cenario-quarto");
    palco.classList.add("cenario-comida");
    decoracaoComida.classList.remove("escondido");
    decoracaoQuarto.classList.add("escondido");
  }

  avisarAlturaPortal();
}

// Mostra um coraçãozinho rápido acima do Bunny
function mostrarCoracao() {
  efeitoCoracao.classList.add("mostrar");
  setTimeout(function () {
    efeitoCoracao.classList.remove("mostrar");
  }, 800);
}

// Deixa o coelhinho feliz ou tristinho
function mudarHumor(triste) {
  estaTriste = triste;
  if (triste) {
    coelhinhoVisual.classList.remove("feliz");
    coelhinhoVisual.classList.add("triste");
  } else {
    coelhinhoVisual.classList.remove("triste");
    coelhinhoVisual.classList.add("feliz");
  }
}

// Atualiza o pedido atual na tela
function atualizarTela() {
  const atual = momentosDoDia[indiceMomento];
  textoMomento.textContent = "Momento " + (indiceMomento + 1) + " de " + momentosDoDia.length;
  iconePedido.textContent = atual.icone;
  textoPedido.textContent = atual.fala;
  avisarAlturaPortal();
}

// Finaliza o dia quando os 6 momentos acabam
function finalizarDia() {
  telaFinal.classList.remove("escondido");
  const tempoTotal = Date.now() - tempoInicio;

  window.parent.postMessage(
    {
      type: "vrgame:finish",
      score: momentosDoDia.length,
      maxScore: momentosDoDia.length,
      timeMs: tempoTotal,
      detail: { jogo: "bunny" }
    },
    "*"
  );

  avisarAlturaPortal();
}

// Verifica o que acontece quando o jogador clica em um botão de cuidado
function cuidarDoBunny(acaoEscolhida) {
  const atual = momentosDoDia[indiceMomento];

  // Se o Bunny estiver tristinho, primeiro precisa receber carinho para melhorar
  if (estaTriste) {
    if (acaoEscolhida === "carinho") {
      mudarHumor(false);
      mostrarCoracao();
      mensagemStatus.textContent = "Oba! O Bunny ficou feliz de novo com seu carinho!";
    } else {
      mensagemStatus.textContent = "Ele ainda está tristinho... faça carinho nele primeiro!";
    }
    return;
  }

  // Verifica se está no cômodo certo para comida ou água
  if ((acaoEscolhida === "comer" || acaoEscolhida === "agua") && cenarioAtual !== "comida") {
    trocarCenario("comida");
  }

  // Verifica se acertou o que o Bunny pediu
  if (acaoEscolhida === atual.acaoCerta) {
    acoesFeitas = acoesFeitas + 1;
    mostrarCoracao();
    mensagemStatus.textContent = atual.acerto;

    // Vai para o próximo momento ou termina o dia
    indiceMomento = indiceMomento + 1;
    if (indiceMomento >= momentosDoDia.length) {
      setTimeout(finalizarDia, 900);
    } else {
      setTimeout(atualizarTela, 700);
    }
  } else {
    // Se clicou em outra coisa, ele faz carinha triste até ganhar carinho
    mudarHumor(true);
    mensagemStatus.textContent = "Oh não, ele ficou tristinho! Faça carinho para alegrá-lo. (" + atual.dica + ")";
  }
}

// Eventos de clique nas abas dos cenários
abaQuarto.addEventListener("click", function () {
  trocarCenario("quarto");
});

abaComida.addEventListener("click", function () {
  trocarCenario("comida");
});

// Clicar direto no coelhinho também faz carinho nele
botaoCoelhinho.addEventListener("click", function () {
  cuidarDoBunny("carinho");
});

// Eventos nos 5 botões inferiores
botoesAcao.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const acao = botao.getAttribute("data-acao");
    cuidarDoBunny(acao);
  });
});

// Alternar tema claro e escuro pelo botão
botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("tema-escuro");
  avisarAlturaPortal();
});

// Reiniciar para brincar de novo quando quiser
botaoReiniciar.addEventListener("click", function () {
  indiceMomento = 0;
  estaTriste = false;
  acoesFeitas = 0;
  tempoInicio = Date.now();
  mudarHumor(false);
  trocarCenario("quarto");
  mensagemStatus.textContent = "Um novo dia fofinho começou!";
  telaFinal.classList.add("escondido");
  atualizarTela();
});

// Escuta mensagens enviadas pelo portal (tema e tela cheia)
window.addEventListener("message", function (evento) {
  const dados = evento.data;
  if (!dados || typeof dados !== "object") {
    return;
  }

  if (dados.type === "vrgame:theme") {
    if (dados.theme === "dark") {
      document.body.classList.add("tema-escuro");
    } else {
      document.body.classList.remove("tema-escuro");
    }
    avisarAlturaPortal();
  }

  if (dados.type === "vrgame:fullscreen") {
    avisarAlturaPortal();
  }
});

// Atualiza tamanho se a janela mudar
window.addEventListener("resize", avisarAlturaPortal);

// Inicializa o jogo e avisa o portal que está pronto
atualizarTela();
window.parent.postMessage({ type: "vrgame:ready" }, "*");
avisarAlturaPortal();