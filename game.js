// Pool variado de vontades do Bunny (sorteadas aleatoriamente para nunca ficar igual)
const bancoDePedidos = [
  {
    acaoCerta: "cenoura",
    icone: "🥕",
    fala: "Estou com vontade de roer uma cenourinha crocante!",
    acerto: "Nham nham! Cenourinha doce e crocante!",
    dica: "Clique em Comidinha e escolha Cenoura!"
  },
  {
    acaoCerta: "morango",
    icone: "🍓",
    fala: "Tem moranguinho fresquinho na tigela rosa?",
    acerto: "Mnham! Ele amou o moranguinho docinho!",
    dica: "Abra Comidinha e dê Morango para ele!"
  },
  {
    acaoCerta: "alface",
    icone: "🥬",
    fala: "Quero uma folhinha verdinha bem leve!",
    acerto: "Croc croc! Folhinha fresquinha aprovada!",
    dica: "Escolha Folhinha no menu de Comidinha!"
  },
  {
    acaoCerta: "biscoito",
    icone: "🍪",
    fala: "Posso ganhar um biscoitinho de petisco?",
    acerto: "Eba! Ele adorou o biscoitinho especial!",
    dica: "Dê um Biscoito lá no menu de Comidinha!"
  },
  {
    acaoCerta: "agua",
    icone: "💧",
    fala: "Deu sedezinha! Vamos encher o bebedouro?",
    acerto: "Glub glub! Aguinha fresquinha!",
    dica: "Clique em Aguinha ou na gotinha lá no Canto da Comida!"
  },
  {
    acaoCerta: "escovar",
    icone: "🪮",
    fala: "Meu pelinho está bagunçado, passa a escovinha?",
    acerto: "Ficou todo macio e brilhante!",
    dica: "Clique no botão Escovar para pentear o Bunny!"
  },
  {
    acaoCerta: "brincar",
    icone: "🧶",
    fala: "Quero pular e brincar com a bolinha de lã!",
    acerto: "Boing! Ele deu pulinhos de alegria no tapete!",
    dica: "Clique em Brincar ou toque na bolinha de lã no quarto!"
  },
  {
    acaoCerta: "dormir",
    icone: "🌙",
    fala: "Bocejo... apaga o abajur para eu tirar um cochilo?",
    acerto: "Zzz... ele tirou uma sonequinha gostosa no escuro!",
    dica: "Clique em Dormir ou toque no abajur/caminha do quarto!"
  }
];

// Customizações disponíveis
const listaLacos = ["", "🎀", "🌸", "💜", "🍓", "⭐"];
const estilosQuarto = [
  { classe: "decor-rosa", luzes: "✨ ⭐ ✨ ⭐ ✨", p1: "🧸 🐰 ☁️", p2: "🎀 🐱 🌸" },
  { classe: "decor-lilas", luzes: "💜 🌙 💜 🌙 💜", p1: "🦄 🔮 ☁️", p2: "👾 🎀 💫" },
  { classe: "decor-flor", luzes: "🌸 🍃 🌸 🍃 🌸", p1: "🍓 🐥 🌼", p2: "🍄 🌷 🐝" }
];

// Estado do jogo
let modoLivre = false;
let pedidoAtual = null;
let cenarioAtual = "quarto";
let estaTriste = false;
let luzApagada = false;
let indiceLaco = 0;
let indiceDecor = 0;
let tempoInicio = Date.now();
let interacoesTotais = 0;

// Elementos da interface
const botaoModo = document.getElementById("botao-modo");
const botaoTema = document.getElementById("botao-tema");
const abaQuarto = document.getElementById("aba-quarto");
const abaComida = document.getElementById("aba-comida");
const botaoLaco = document.getElementById("botao-laco");
const botaoDecor = document.getElementById("botao-decor");
const palco = document.getElementById("palco");
const filtroNoite = document.getElementById("filtro-noite");
const decoracaoQuarto = document.getElementById("decoracao-quarto");
const decoracaoComida = document.getElementById("decoracao-comida");
const luzinhas = document.getElementById("luzinhas");
const prateleira1 = document.getElementById("prateleira-1");
const prateleira2 = document.getElementById("prateleira-2");
const balaoPedido = document.getElementById("balao-pedido");
const iconePedido = document.getElementById("icone-pedido");
const textoPedido = document.getElementById("texto-pedido");
const botaoCoelhinho = document.getElementById("coelhinho");
const coelhinhoVisual = document.getElementById("coelhinho-visual");
const acessorioCoelho = document.getElementById("acessorio-coelho");
const efeitoFlutuante = document.getElementById("efeito-flutuante");
const menuComidinhas = document.getElementById("menu-comidinhas");
const conteudoTigela = document.getElementById("conteudo-tigela");
const mensagemStatus = document.getElementById("mensagem-status");
const botoesAcao = document.querySelectorAll(".botao-acao");
const opcoesComida = document.querySelectorAll(".opcao-comida");

// Objetos clicáveis nos cenários
const objEstante = document.getElementById("obj-estante");
const objAbajur = document.getElementById("obj-abajur");
const objBola = document.getElementById("obj-bola");
const objCama = document.getElementById("obj-cama");
const objAgua = document.getElementById("obj-agua");
const objTigelaComida = document.getElementById("obj-tigela-comida");

function avisarAlturaPortal() {
  const altura = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "vrgame:resize", height: altura }, "*");
}

function trocarCenario(novoCenario) {
  cenarioAtual = novoCenario;
  menuComidinhas.classList.add("escondido");

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
    definirLuzApagada(false);
  }

  avisarAlturaPortal();
}

function definirLuzApagada(apagar) {
  luzApagada = apagar;
  if (apagar) {
    filtroNoite.classList.remove("escondido");
  } else {
    filtroNoite.classList.add("escondido");
  }
}

function mostrarEfeito(emoji, pular) {
  efeitoFlutuante.textContent = emoji;
  efeitoFlutuante.classList.add("mostrar");

  if (pular) {
    coelhinhoVisual.classList.remove("pulando");
    void coelhinhoVisual.offsetWidth;
    coelhinhoVisual.classList.add("pulando");
  }

  setTimeout(function () {
    efeitoFlutuante.classList.remove("mostrar");
  }, 850);
}

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

function sortearNovoPedido() {
  if (modoLivre) {
    iconePedido.textContent = "🌸";
    textoPedido.textContent = "Modo Livre: cuide e brinque do jeito que quiser!";
    return;
  }

  let proximo = bancoDePedidos[Math.floor(Math.random() * bancoDePedidos.length)];
  while (pedidoAtual && proximo.acaoCerta === pedidoAtual.acaoCerta) {
    proximo = bancoDePedidos[Math.floor(Math.random() * bancoDePedidos.length)];
  }

  pedidoAtual = proximo;
  iconePedido.textContent = pedidoAtual.icone;
  textoPedido.textContent = pedidoAtual.fala;
  avisarAlturaPortal();
}

// Reações personalizadas por tipo de comida
const detalhesComida = {
  cenoura: { emoji: "🥕", texto: "Croc croc! Cenourinha doce!" },
  morango: { emoji: "🍓", texto: "Mnham! Moranguinho delicioso!" },
  alface: { emoji: "🥬", texto: "Nham! Folhinha bem fresquinha!" },
  biscoito: { emoji: "🍪", texto: "Delícia! Biscoitinho crocante!" }
};

function executarAcao(acao) {
  menuComidinhas.classList.add("escondido");
  interacoesTotais = interacoesTotais + 1;

  // Se estiver tristinho, precisa de carinho primeiro
  if (estaTriste) {
    if (acao === "carinho") {
      mudarHumor(false);
      mostrarEfeito("💖", true);
      mensagemStatus.textContent = "Oba! O Bunny ficou feliz de novo com seu cafuné!";
    } else {
      mensagemStatus.textContent = "Ele ainda está tristinho... faça carinho nele primeiro!";
    }
    return;
  }

  // Ajusta cenário e efeitos visuais de cada ação
  if (detalhesComida[acao]) {
    if (cenarioAtual !== "comida") {
      trocarCenario("comida");
    }
    conteudoTigela.textContent = detalhesComida[acao].emoji;
    mostrarEfeito(detalhesComida[acao].emoji, true);
  } else if (acao === "agua") {
    if (cenarioAtual !== "comida") {
      trocarCenario("comida");
    }
    mostrarEfeito("💧", false);
  } else if (acao === "brincar") {
    if (cenarioAtual !== "quarto") {
      trocarCenario("quarto");
    }
    definirLuzApagada(false);
    mostrarEfeito("🧶", true);
  } else if (acao === "escovar") {
    mostrarEfeito("✨", false);
  } else if (acao === "dormir") {
    if (cenarioAtual !== "quarto") {
      trocarCenario("quarto");
    }
    definirLuzApagada(true);
    mostrarEfeito("💤", false);
  } else if (acao === "carinho") {
    mostrarEfeito("💖", true);
    if (modoLivre) {
      mensagemStatus.textContent = "Purr... o Bunny ama receber carinho!";
      return;
    }
  }

  // No Modo Livre, toda ação gera uma resposta carinhosa sem erro
  if (modoLivre) {
    if (detalhesComida[acao]) {
      mensagemStatus.textContent = detalhesComida[acao].texto;
    } else if (acao === "agua") {
      mensagemStatus.textContent = "Glub glub! Bebeu aguinha fresquinha!";
    } else if (acao === "escovar") {
      mensagemStatus.textContent = "Pelinho penteado e super fofinho!";
    } else if (acao === "brincar") {
      mensagemStatus.textContent = "Pulinhos de alegria pelo quarto!";
    } else if (acao === "dormir") {
      mensagemStatus.textContent = "Zzz... descansando na caminha quentinha!";
    }
    return;
  }

  // No Modo Pedidos, verifica se atendeu ao pedido atual
  if (acao === pedidoAtual.acaoCerta) {
    mensagemStatus.textContent = pedidoAtual.acerto;

    // Avisa o portal de progresso suave a cada 5 cuidados
    if (interacoesTotais % 5 === 0) {
      window.parent.postMessage(
        {
          type: "vrgame:finish",
          score: interacoesTotais,
          maxScore: interacoesTotais,
          timeMs: Date.now() - tempoInicio,
          detail: { jogo: "bunny" }
        },
        "*"
      );
    }

    setTimeout(sortearNovoPedido, 850);
  } else if (acao !== "carinho") {
    mudarHumor(true);
    mensagemStatus.textContent = "Oh não, ele queria outra coisa! Faça carinho para alegrar. (" + pedidoAtual.dica + ")";
  } else {
    mensagemStatus.textContent = "Ele gostou do cafuné, mas ainda quer o pedido do balãozinho!";
  }
}

// Botões principais
abaQuarto.addEventListener("click", function () {
  trocarCenario("quarto");
});

abaComida.addEventListener("click", function () {
  trocarCenario("comida");
});

// Trocar acessório do Bunny
botaoLaco.addEventListener("click", function () {
  indiceLaco = (indiceLaco + 1) % listaLacos.length;
  const item = listaLacos[indiceLaco];
  if (item === "") {
    acessorioCoelho.classList.add("escondido");
  } else {
    acessorioCoelho.textContent = item;
    acessorioCoelho.classList.remove("escondido");
  }
  mostrarEfeito("✨", false);
  mensagemStatus.textContent = item ? "Novo acessório colocado no Bunny!" : "Bunny sem acessório!";
});

// Trocar estilo/tema do quarto
botaoDecor.addEventListener("click", function () {
  palco.classList.remove(estilosQuarto[indiceDecor].classe);
  indiceDecor = (indiceDecor + 1) % estilosQuarto.length;
  const novoEstilo = estilosQuarto[indiceDecor];

  palco.classList.add(novoEstilo.classe);
  luzinhas.textContent = novoEstilo.luzes;
  prateleira1.textContent = novoEstilo.p1;
  prateleira2.textContent = novoEstilo.p2;
  mensagemStatus.textContent = "Decoração do quarto atualizada!";
});

// Alternar entre Modo Pedidos Aleatórios e Modo Livre
botaoModo.addEventListener("click", function () {
  modoLivre = !modoLivre;
  mudarHumor(false);
  if (modoLivre) {
    botaoModo.textContent = "🌸 Livre";
    mensagemStatus.textContent = "Modo Livre ativado! Faça o que quiser com o Bunny.";
  } else {
    botaoModo.textContent = "🎲 Pedidos";
    mensagemStatus.textContent = "Modo Pedidos ativado!";
  }
  sortearNovoPedido();
});

// Clicar direto no Bunny faz carinho
botaoCoelhinho.addEventListener("click", function () {
  executarAcao("carinho");
});

// Objetos interativos dentro do Quarto e do Canto da Comida
objEstante.addEventListener("click", function () {
  mostrarEfeito("🧸", false);
  mensagemStatus.textContent = "As pelúcias balançaram na prateleira!";
});

objAbajur.addEventListener("click", function () {
  definirLuzApagada(!luzApagada);
  if (luzApagada) {
    executarAcao("dormir");
  } else {
    mensagemStatus.textContent = "Luzinha acesa!";
  }
});

objBola.addEventListener("click", function () {
  executarAcao("brincar");
});

objCama.addEventListener("click", function () {
  executarAcao("dormir");
});

objAgua.addEventListener("click", function () {
  executarAcao("agua");
});

objTigelaComida.addEventListener("click", function () {
  menuComidinhas.classList.toggle("escondido");
  mensagemStatus.textContent = "Escolha o que colocar na tigela rosa!";
});

// Botões inferiores de ação
botoesAcao.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const acao = botao.getAttribute("data-acao");
    if (acao === "comer") {
      menuComidinhas.classList.toggle("escondido");
      mensagemStatus.textContent = "Escolha uma comidinha para o Bunny!";
    } else {
      executarAcao(acao);
    }
  });
});

// Opções do submenu de comidinha
opcoesComida.forEach(function (opcao) {
  opcao.addEventListener("click", function () {
    const comidaEscolhida = opcao.getAttribute("data-comida");
    executarAcao(comidaEscolhida);
  });
});

// Tema claro / escuro
botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("tema-escuro");
  avisarAlturaPortal();
});

// Comunicação com o portal
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

window.addEventListener("resize", avisarAlturaPortal);

// Inicializa
sortearNovoPedido();
window.parent.postMessage({ type: "vrgame:ready" }, "*");
avisarAlturaPortal();