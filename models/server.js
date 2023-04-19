import express from "express";
import cors from "cors"

import { router } from "../routes/user.js   ";
import { dbConnection } from "../database/config.js";
import { routerAuth } from "../routes/auth.js";
import { routerCategorias } from "../routes/categorias.js";
import { routerProductos } from "../routes/producto.js";
import { routerBuscar } from "../routes/buscar.js";

export class Server{
    constructor(){
        //Cada vez que se crea una clase server se ejecutan estas variables
        this.app= express()
        this.port = process.env.PORT

        //Conectar  ala base de datos
        this.conectarDB()

        //rutas
        this.paths={
            auth:'/api/auth',
            usuarios:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar'
        }
       
        //Middlewares : Funciones que se van a levantar cuando se ejecute el servidor 
        this.middelwares()
        
        //Rutas de aplicación
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }
    middelwares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body, recibe la info de los post,put, etc
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.paths.auth,routerAuth)
        this.app.use(this.paths.usuarios,router)
        this.app.use(this.paths.categorias,routerCategorias)
        this.app.use(this.paths.productos,routerProductos)
        this.app.use(this.paths.buscar,routerBuscar)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }
}