import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

export let app = express();

app.use(helmet()); // for security reasons
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../build/')));
app.use('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
});
