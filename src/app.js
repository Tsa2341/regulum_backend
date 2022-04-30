import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { sequelize } from './database/models';
import cookieParser from 'cookie-parser';
import 'dotenv';

const app = express();
const port = parseInt(process.env.PORT) || 3000;

try {
	app.set('view engine', 'ejs');
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());

	app.use(cors());
	app.use(morgan('dev'));

	app.get('/', (req, res, next) => {
		res.status(200).json({
			message: 'hello, this is my api',
		});
	});

	app.use('/api/v1', routes);

	app.use('*', (req, res, next) => {
		res.status(404).json({
			message: 'not found',
		});
	});

	app.listen(port, async () => {
		console.log('app running on port 3000');
		await sequelize.authenticate().then((err) => {
			if (err) return console.log('database connection failed');
			console.log('connected to the database');
		});
	});
} catch (error) {
	console.error(error);
}
