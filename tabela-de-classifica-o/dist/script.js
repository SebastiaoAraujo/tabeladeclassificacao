// criação de objeto
var jogadores = []; // Array de objetos jogadores

// tem a sequencia correta para chamar as funções.
function adicionarJogador() {
  var nomeJogador = document.getElementById("cadastro").value;
  var localMensagemErro = document.getElementById("teste01");
  for (var x = 0; x < jogadores.length; x++) {
    if (jogadores[x].nome == nomeJogador) {
      localMensagemErro.innerHTML = "Jogador já registrado..";
      document.getElementById("cadastro").value = null;
      return;
    }
  }
  if (nomeJogador == "") {
    localMensagemErro.innerHTML = "Voce tem que digitar um nome...";
    document.getElementById("cadastro").value = null;
    return;
  } else {
    var jogadorNovo = {
      nome: nomeJogador,
      status: "",
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      pontos: 0
    };
    jogadores.push(jogadorNovo);
    exibeJogadoresNaTela(jogadores);
    document.getElementById("cadastro").value = null;
    localMensagemErro.innerHTML = null;
  }
}
//funcao para exibir jogadores na tela passando Array de jogadores como parametro
function exibeJogadoresNaTela(jogadores) {
  var elemento = "";
  // preenche a tabela em HTML
  for (var i = 0; i < jogadores.length; i++) {
    elemento += "<tr><td>" + jogadores[i].nome + "</td>";
    elemento += "<td>" + jogadores[i].status + "</td>";
    elemento += "<td>" + jogadores[i].vitorias + "</td>";
    elemento += "<td>" + jogadores[i].empates + "</td>";
    elemento += "<td>" + jogadores[i].derrotas + "</td>";
    elemento += "<td>" + jogadores[i].pontos + "</td>";
    elemento +=
      "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
    elemento +=
      "<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>";
    /* elemento +=
      "<td><button onClick='adicionarDerrota(" + i + ")'>Derrota</button></td>";
      */
    elemento +=
      "<td><button onClick='zeraPontos(" +
      i +
      ")'>Zera os Pontos</button></td>";
    elemento +=
      "<td><button onClick='removerJogador(" +
      i +
      ")'>Remover Jogador</button></td>";
    elemento += "</tr>";
  }
  // pega o campo onde sera preenchida a tabela no HTML, e o id da tabela
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento; // monstra o conteudo na tela no HTML
}

// passando objeto por parametro utilizando a variavel jogador
// funcao que calcula os pontos
function calculaPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}
function adicionarVitoria(i) {
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calculaPontos(jogador);
  exibeJogadoresNaTela(jogadores);
  pegapontos(i);
  adicionarDerrota(i);
}
//funcao para adicionar empate
function adicionarEmpate(i) {
  var jogador = jogadores[i];
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].empates++;
    jogadores[i].pontos = calculaPontos(jogadores[i]);
    exibeJogadoresNaTela(jogadores);
    pegapontos(i);
  }
}

function adicionarDerrota(x) {
  for (var i = 0; i < jogadores.length; i++) {
    if (jogadores[i] != jogadores[x]) {
      jogadores[i].derrotas++;
    }
  }
  exibeJogadoresNaTela(jogadores);
}
// funcao para zera a tabela
function zeraPontos(i) {
  // var jogador = jogadores[i];
  for (var x = 0; x < jogadores.length; x++) {
    jogadores[x].vitorias = 0;
    jogadores[x].empates = 0;
    jogadores[x].derrotas = 0;
    jogadores[x].pontos = 0;
    jogadores[x].status = "";
    maiorPontuacao = 0;
  }
  /*
  jogador.vitorias = 0;
  jogador.empates = 0;
  jogador.derrotas = 0;
  jogador.pontos = 0;
  jogador.status = "";
  maiorPontuacao = 0;
  */
  exibeJogadoresNaTela(jogadores);
}
//---------------------//---------------
var maiorPontuacao = 0; //variavel de escopo global
var indice = 0; //variavel de escopo global
//---------------------------------------
// funcao para preencher o campo status da tabela
function pegapontos(i) {
  if (jogadores[i].pontos > maiorPontuacao) {
    maiorPontuacao = jogadores[i].pontos;
    indice = i;
    jogadores[indice].status = "campeao";
  } else if (jogadores[i].pontos == jogadores[indice].pontos) {
    jogadores[indice].status = "empate";
    jogadores[i].status = "empate";
    indice = 0;
  }
  for (var i = 0; i < jogadores.length; i++) {
    if (
      jogadores[i].status == "empate" &&
      jogadores[indice].status == "campeao"
    ) {
      jogadores[i].status = "";
    } // fechamento da comparacao do status
  } // fechamento do laco de repeticao do indice
  exibeJogadoresNaTela(jogadores);
} // fim da função

// remove jogador
function removerJogador(i) {
  zeraPontos();
  indice = 0;
  jogadores.splice(i, 1);
  exibeJogadoresNaTela(jogadores);
}

// function maiorponto() {
//   var tamanho = [];
//   for (var x = 0; x < jogadores.length; x++) {
//     tamanho.push(jogadores[x].pontos);
//   }
//   tamanho.sort(ordenacao);
//   function ordenacao(a, b) {
//     return a - b;
//   }

//   console.log(tamanho);
// }