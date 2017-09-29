import * as express from 'express'
import { getSecret } from '../utils/getSecret';

export abstract class Route {

    protected secret: string;

    constructor() { 
        this.secret = getSecret();
    }

    abstract registerRoute(router: express.Router) : express.Router;

}