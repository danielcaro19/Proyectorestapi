"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solarRoutes = void 0;
const express_1 = require("express");
const solar_1 = require("../model/solar");
const database_1 = require("../database/database");
class SolarRoutes {
    constructor() {
        this.getSolares = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield solar_1.Solares.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.nuevoSolarGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, codpost, superficie, precio } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _codpost: parseInt(codpost),
                _superficie: parseInt(superficie),
                _precio: parseInt(precio)
            };
            const oSchema = new solar_1.Solares(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            yield database_1.db.desconectarBD();
        });
        this.listarSolares = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield solar_1.Solares.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.mostrarSolar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            yield database_1.db.conectarBD();
            const ns = yield solar_1.Solares.findOne({ _nombre: { $eq: local } });
            res.json(ns);
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getSolares);
        this._router.get('/añadirS/:nombre&:codpost&:superficie&:precio', this.nuevoSolarGet);
        this._router.get('/listS', this.listarSolares);
        this._router.get('/mostrar/:nombre', this.mostrarSolar);
    }
}
const obj = new SolarRoutes();
obj.misRutas();
exports.solarRoutes = obj.router;
