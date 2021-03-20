import { RegisterRoutes } from '../build/routes';
import express, {Application, Request, RequestHandler, Response} from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from  '../swagger.json';


import logger, { outStream} from './helpers/logger';

const app: Application = express();

app.use(morgan((tokens, req: Request, res: Response) => {
    return JSON.stringify(
        {
            'method': tokens.method(req, res),
            'url': tokens.url(req, res),
            'status': tokens.status(req, res),
            'response-time': `${tokens['response-time'](req, res)} ms`,
            'host': req.hostname
        });
}, { stream: outStream }));
morgan.token('host', (req: Request, res: Response) => {
    return req.hostname;
});
// Only using json for api
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// endpoints
// app.use('/api', index);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

RegisterRoutes(app);

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: RequestHandler) => {
    logger.error(err);
    res.status(500).json({ msg: 'Something went wrong!' });
});

app.listen(3000, () =>{
    logger.info('Started on port 3000');
})
