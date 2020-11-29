import {Request, Response, Router } from 'express'
import { Solares } from '../model/solar'
import { db } from '../database/database'

class SolarRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getSolares = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query = await Solares.find()
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }

    private nuevoSolarGet = async (req: Request, res: Response) => {
        const { nombre, codpost, superficie, precio} = req.params
        console.log(req.params)

        await db.conectarBD()
        const dSchema = {
            _nombre: nombre,
            _codpost: parseInt(codpost),
            _superficie: parseInt(superficie),
            _precio: parseInt(precio)
        }
        const oSchema = new Solares(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        await db.desconectarBD()
    } 

    private listarSolares = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            const query = await Solares.find()
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        await db.desconectarBD()
    }

    private mostrarSolar = async (req: Request, res: Response) => {
        const { local } = req.params
        await db.conectarBD()
        
        const ns : any= await Solares.findOne({_nombre:{$eq:local}})
        res.json(ns)
        

        await db.desconectarBD()
    }

    

    misRutas(){
        this._router.get('/', this.getSolares)
        this._router.get('/añadirS/:nombre&:codpost&:superficie&:precio', this.nuevoSolarGet)
        this._router.get('/listS', this.listarSolares)
        this._router.get('/mostrar/:nombre', this.mostrarSolar)
    }
}

const obj = new SolarRoutes()
obj.misRutas()
export const solarRoutes = obj.router