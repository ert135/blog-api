import * as express from "express";
import * as mongoose from "mongoose";

import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import { PostRoute } from "./routes/PostRoute";
import { UserRoute } from "./routes/UserRoute";
import { SignupRoute } from "./routes/SignupRoute";
import { AuthRoute } from "./routes/AuthRoute";

import * as bearerToken from "express-bearer-token";

export class App {

	private express: express.Application;
	private db_name: string;
	private router: express.Router

	constructor() {
		this.express = express();
		this.router = express.Router()
		this.db_name = 'blog';
		this.connectDatabase();
		this.registerMiddleware();
		this.registerRoutes();
		this.registerErrorHandlers();
	}

	private connectDatabase(): void {
		//provide a sensible default for local development
		let mongodb_connection_string = "mongodb://localhost:27017/" + this.db_name;

		//take advantage of env vars when available: need to set a enviroment var on the aws instance and save its image for reuse 
		if (process.env.MONGODB_URL) {
			mongodb_connection_string = process.env.MONGODB_URL + this.db_name;
		}

		mongoose.connect(mongodb_connection_string);

		const db = mongoose.connection;

		db.on("error", function(err){
			console.error("db connection error", err);
		});

		db.once("open", function() {
			console.log("db connection successful");
		});
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
		})
	}

	private registerRoutes(): void {
		this.express.use("/posts", new PostRoute().registerRoute(this.router));
		this.express.use("/signup", new SignupRoute().registerRoute(this.router));
		this.express.use("/users", new UserRoute().registerRoute(this.router));
		this.express.use('/auth', new AuthRoute().registerRoute(this.router));
	}

	private registerErrorHandlers(): void {
		this.express.use((req, res, next) => {
			var err: any = new Error("Not Found");
			err.message = err.message;
			err.status = 404
			next(err);
		})

		this.express.use((err,req,res,next) => {
			res.status(err.status || 500);
			res.json({
				error: {
					message: err.message || err
				}
			})
		})
	}
}
