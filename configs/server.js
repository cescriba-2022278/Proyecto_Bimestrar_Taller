'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import productoRoutes from '../src/producto/producto.routes.js';
import usuarioRoutes from '../src/usuario/usuario.routes.js';
import loginRoutes from '../src/login/login.routes.js';
import categoriaRoutes from '../src/categoria/categoria.routes.js';
import facturaRoutes from '../src/factura/factura.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.productoPath = '/gestion/v1/productos';
        this.usuarioPath = '/gestion/v2/usuarios';
        this.loginPath = '/gestion/v3/login';
        this.categoriaPath = '/gestion/v4/categorias';
        this.facturaPath = '/gestion/v5/facturas';


        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.productoPath, productoRoutes);
        this.app.use(this.usuarioPath, usuarioRoutes);
        this.app.use(this.loginPath, loginRoutes);
        this.app.use(this.categoriaPath, categoriaRoutes);
        this.app.use(this.facturaPath, facturaRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;