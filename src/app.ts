import * as express from "express";
import { Sequelize } from 'sequelize-typescript';

import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import { PostRoute } from "./routes/PostRoute";
import { UserRoute } from "./routes/UserRoute";
import { SignupRoute } from "./routes/SignupRoute";
import { AuthRoute } from "./routes/AuthRoute";

import Post from './models/Post';
import Comment from './models/Comment';
import User from './models/User';

import * as bearerToken from "express-bearer-token";

export class App {

	private express: express.Application;
	private db_name: string;
	private router: express.Router;

	constructor() {
		this.express = express();
		this.router = express.Router();
		this.db_name = 'blog';
		this.connectDatabase();
		this.registerMiddleware();
		this.registerRoutes();
		this.registerErrorHandlers();
	}

	private connectDatabase(): void {
		console.log('Connecting to database...');
		const sequelize =  new Sequelize({
			database: 'postgres',
			dialect: 'postgres',
			username: 'postgres',
			password: 'password123',
			port: 5433,
		});
		console.log('database connected!!!');
		// modelPaths: [__dirname + '/models']
		sequelize.addModels([Post, Comment, User]);
		// sequelize.addModels([Comment]);
		// sequelize.addModels([User]);
	}

	private registerMiddleware(): void {
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bearerToken());
		//setup CORS and options response
		this.express.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, Z-Requested-With, Content-Type, Accept, Authorization");

			if (req.method === "OPTIONS") {
				res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,GET");
				return res.status(200).json({});
			}

			next();
		});
	}

	private registerRoutes(): void {
		this.express.use("/posts", new PostRoute().registerRoute());
		this.express.use("/signup", new SignupRoute().registerRoute());
		this.express.use("/users", new UserRoute().registerRoute());
		this.express.use('/auth', new AuthRoute().registerRoute());
	}

	private registerErrorHandlers(): void {
		this.express.use((req, res, next) => {
			var err: any = new Error("Not Found");
			err.message = err.message;
			err.status = 404
			next(err);
		});

		this.express.use((err,req,res,next) => {
			res.status(err.status || 500);
			res.json({
				error: {
					message: err.message || err
				}
			});
		});
	}
}
