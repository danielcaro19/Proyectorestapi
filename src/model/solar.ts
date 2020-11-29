import {Schema, model } from 'mongoose'
// import {Rectangulo} from './rectangulo'

export class Solar{

    private _nombre: string
    // private _forma: Rectangulo
    private _codigopostal: number
    private _metroscuadrados: number
    private _precio: number

    constructor(nombre:string,codpost:number,superficie:number,precio:number){
        this._nombre=nombre
        this._codigopostal=codpost
        this._metroscuadrados=superficie
        this._precio=precio
    }
    get nombre(){
        return this._nombre
    }
    get codpost(){
        return this._codigopostal
    }
    setsuperficie(lado1:number,lado2:number){
        this._metroscuadrados=lado1*lado2
        return this._metroscuadrados
    }
    get superficie(){
        return this._metroscuadrados
    }
    setprecio(superficie:number,codpost:number){
        this._precio=superficie*(codpost/100)
        return this._precio
    }
    get precio(){
        return this._precio
    }

    /*precioMedio(){
        let total=0
        let precio=0
        for (this._precio){
            precio=precio+this._precio
            total=total+superficie
        }
        return Math.round(total/precio)
    }

    superficieMedia(){
        let total=0
        let superficie=0
        for (let e of this._metroscuadrados){
            superficie=
        }
    }*/

}


export type tSolar = {
     _nombre:string,
    //_forma:Rectangulo,
    _codpost:number,
    _superficie:number,
    _precio:number,
}

const solarSchema = new Schema({
    _nombre:String,
    //_forma:Rectangulo,
    _codigopostal:Number,
    _metroscuadrados:Number,
    _precio:Number,
})

export const Solares = model('solares', solarSchema)