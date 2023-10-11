import { Propriedade } from "./propriedade.mjs";

export class Player{
    constructor(id, perfil){
        this._id = id;
        this._saldo = 300;
        this._perfil = perfil;
        this._posicao = -1;
        this._faliu = false;
    }

    get id(){
        return this._id;
    }

    get saldo(){
        return this._saldo;
    }

    get perfil(){
        return this._perfil;
    }

    get posicao(){
        return this._posicao;
    }

    get faliu(){
        return this._faliu;
    }

    set faliu(status){
        this._faliu = status;
    }

    set posicao(posicao){
        this._posicao = posicao;
    }

    set saldo(valor){
        this._saldo = valor;
    }

    comprarPropriedade(propriedade) {
        if (this.saldo >= propriedade.valor) {
          this.saldo = this.saldo - propriedade.valor;
          propriedade.dono = this;
        }
    }

    pagarAluguelPropriedade(propriedade){
        if(propriedade.dono !== null){
            this.saldo = this.saldo - propriedade.aluguel;
            propriedade.dono.saldo = propriedade.dono.saldo + propriedade.aluguel
        }
    }
}