import * as express from 'express';
import * as authController from '../controllers/auth';

const router = express.Router();

/* MIDDLEWARE COMMON FOR ALL ROUTES */

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('[AUTH ROUTER] Time: ', Date.now());
    next();
});


/* ROUTES */

router.post('/signup/', authController.signup);

export default router;
