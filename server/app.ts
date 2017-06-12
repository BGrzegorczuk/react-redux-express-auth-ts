import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as passport from 'passport';
import authRoutes from './routes/auth';


const app = express();

const IS_PRODUCTION = app.get('env') === 'production';
const staticsPath = path.join(__dirname, '../../build');

/* MIDDLEWARES */

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
if (IS_PRODUCTION) {
    app.use(express.static(staticsPath));
}

/* ROUTES */

app.use('/api/auth', authRoutes);

app.use('/', (req: express.Request, res: express.Response) => {
    if (IS_PRODUCTION) {
        res.sendFile(`${staticsPath}/index.html`);
    } else {
        res.send({msg: "Hello from the server ;)"});
    }
});


/* ERROR HANDLERS */

// DEVELOPMENT error handler - prints stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req: express.Request, res: express.Response) => {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// PRODUCTION error handler - no stacktrace leaks to user
app.use((err: any, req: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


export default app;
