import * as express from 'express';
import * as passport from 'passport';
import '../middlewares/auth';
import * as authController from '../controllers/auth';

const router = express.Router();

const loginMiddleware = passport.authenticate('local', { session: false });

/* MIDDLEWARE COMMON FOR ALL ROUTES */

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('[AUTH ROUTER] Time: ', Date.now());
    next();
});


/* ROUTES */

router.post('/signup/', authController.signup);
router.post('/login/', loginMiddleware, authController.login);

export default router;
