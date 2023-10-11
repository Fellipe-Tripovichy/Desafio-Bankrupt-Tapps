import { Player }from './player.mjs'
import { Propriedade } from './propriedade.mjs'
import fs from 'fs'

const jogador0 = new Player(0, 'impulsivo');
const jogador1 = new Player(1, 'exigente');
const jogador2 = new Player(2, 'cauteloso');
const jogador3 = new Player(3, 'aleatorio');

const arquivoDePropriedades = 'gameConfig.txt';
let propriedades = [];
propriedades = lerArquivoDePropriedades(arquivoDePropriedades);

const numeroDeJogos = 300;
const numeroMaximoDeRodadas = 1000;

var vitorias0 = 0;
var vitorias1 = 0;
var vitorias2 = 0
var vitorias3 = 0
var numTimeOut = 0;
var mediaRodadas = 0;

for(let i = 0; i < numeroDeJogos; i++){
    console.log(`Jogo ${i+1} --------- ${jogarBankrupt(propriedades)}`);
}

console.log(`Vitórias do Jogador 0: ${(vitorias0/numeroDeJogos)*100}%`);
console.log(`Vitórias do Jogador 1: ${(vitorias1/numeroDeJogos)*100}%`);
console.log(`Vitórias do Jogador 2: ${(vitorias2/numeroDeJogos)*100}%`);
console.log(`Vitórias do Jogador 3: ${(vitorias3/numeroDeJogos)*100}%`);
console.log(`Número de timeouts: ${numTimeOut}`);
console.log(`Média de rodadas: ${mediaRodadas}`);

function jogarBankrupt(propriedades){
    
    let rodada = 1;

    const jogadores = [jogador0, jogador1, jogador2, jogador3];

    for(var elemento of jogadores){
        elemento.saldo = 300;
        elemento.posicao = -1;
    }

    for(var elemento of propriedades){
        elemento.dono = null
    }

    while(jogadores.length > 1 && rodada <= numeroMaximoDeRodadas){
        for(const jogador of jogadores){
            const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
            jogador.posicao = jogador.posicao + numeroAleatorio
            if(jogador.posicao >= propriedades.length){
                jogador.posicao = jogador.posicao - propriedades.length
                jogador.saldo = jogador.saldo + 100
            }
            switch(jogador.perfil){
                case 'impulsivo':
                    if(propriedades[jogador.posicao].dono === null){
                        jogador.comprarPropriedade(propriedades[jogador.posicao]);
                    } else if(propriedades[jogador.posicao].dono !== null){
                        jogador.pagarAluguelPropriedade(propriedades[jogador.posicao]);
                    }
                    break;
                case 'exigente':
                    if(propriedades[jogador.posicao].dono === null && propriedades[jogador.posicao].aluguel > 50){
                        jogador.comprarPropriedade(propriedades[jogador.posicao]);
                    } else if(propriedades[jogador.posicao].dono !== null){
                        jogador.pagarAluguelPropriedade(propriedades[jogador.posicao]);
                    }
                    break;
                case 'cauteloso':
                    if(propriedades[jogador.posicao].dono === null && jogador.saldo - propriedades[jogador.posicao].valor >= 80){
                        jogador.comprarPropriedade(propriedades[jogador.posicao]);
                    } else if(propriedades[jogador.posicao].dono !== null){
                        jogador.pagarAluguelPropriedade(propriedades[jogador.posicao]);
                    }
                    break;
                case 'aleatorio':
                    const numeroAleatorio = Math.floor(Math.random() * 2) + 1;
                    if(propriedades[jogador.posicao].dono === null && numeroAleatorio%2 === 0){
                        jogador.comprarPropriedade(propriedades[jogador.posicao]);
                    } else if(propriedades[jogador.posicao].dono !== null) {
                        jogador.pagarAluguelPropriedade(propriedades[jogador.posicao]);
                    }
                    break;
            }
            if(jogador.saldo < 0){
                for(elemento of propriedades){
                    if(elemento.dono === jogador){
                        elemento.dono === null
                    }
                }
                jogador.faliu = true;
                var indice = jogadores.indexOf(jogador);
                if(indice !== -1){
                    jogadores.splice(indice, 1);
                }
            }
        }
        rodada++;
        
    }

    if(mediaRodadas === 0){
        mediaRodadas = rodada-1;
    } else {
        mediaRodadas = (mediaRodadas+(rodada-1))/2;
    }

    if(jogadores.length < 2){
        for(var elemento of jogadores){
            switch(elemento.id){
                case jogador0.id:
                    vitorias0++;
                    break;
                case jogador1.id:
                    vitorias1++;
                    break;
                case jogador2.id:
                    vitorias2++;
                     break;
                case jogador3.id:
                    vitorias3++;
                    break;
            }
            return `Jogador ${elemento.id} ganhou`
        }
    } else if(jogadores.length > 1){
        numTimeOut++;
        return 'Timeout'
    } else {
        return 'Nada foi computado'
    }

}

function lerArquivoDePropriedades(nomeArquivo) {
    try {
        const data = fs.readFileSync(nomeArquivo, 'utf8');
        const linhas = data.split('\n');

        const propriedades = [];
        let id = 0;
        let preco = 0;
        let aluguel = 0;

        for (const linha of linhas) {
            if(id < 2){
                [preco, aluguel] = linha.split('  ').map(Number);
            } else {
                [preco, aluguel] = linha.split(' ').map(Number);
            }
            const propriedade = new Propriedade(preco, aluguel);
            propriedades.push(propriedade);
            id++;
        }

        return propriedades;
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        return [];
    }
}
