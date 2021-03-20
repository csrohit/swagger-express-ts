import express, {Application, Request, RequestHandler, Response} from 'express';
import morgan from 'morgan';


import logger, { outStream} from './helpers/logger';
import index from './routes/index';


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

app.use('/api', index);




// error handling middleware
app.use((err: Error, req: Request, res: Response, next: RequestHandler) => {
    logger.error(err);
    res.status(500).json({ msg: 'Something went wrong!' });
});

app.listen(3000, () =>{
    logger.info('Started on port 3000');
})
