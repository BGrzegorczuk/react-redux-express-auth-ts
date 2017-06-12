import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

const app = express();

const IS_PRODUCTION = app.get('env') === 'production';
const staticsPath = path.join(__dirname, '../../build');

/* MIDDLEWARES */
app.use(helmet()); // for security reasons
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (IS_PRODUCTION) {
    app.use(express.static(staticsPath));
}

app.use('/', (req: express.Request, res: express.Response) => {
    if (IS_PRODUCTION) {
        res.sendFile(`${staticsPath}/index.html`);
    } else {
        res.send({msg: "Hello from the server ;)"});
    }
});


export default app;
