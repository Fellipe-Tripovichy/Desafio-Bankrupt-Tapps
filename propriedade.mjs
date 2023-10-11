export class Propriedade {
    constructor(valor, aluguel){
        this._valor = valor;
        this._alguel = aluguel;
        this.dono = null;
    }

    get valor(){
        return this._valor;
    }

    get aluguel(){
        return this._alguel;
    }

    get dono(){
        return this._dono;
    }

    set dono(novoDono){
        this._dono = novoDono;
    }
}