import { Router } from 'express';
import { signup } from '../../controller/auth';
import { login } from '../../controller/auth';
import { logout } from '../../controller/auth';

import multer from 'multer';
import { userAutorization } from '../../utils/authorization';

// Make a folder named upload in order to save comming avatar images in it.
const upload = multer({ dest: 'upload/' })

const authRouter = Router();

// Middleware which is primarily used for uploading files. 
authRouter.post('/signup', upload.single('avatar'), signup);

authRouter.post('/login', login);

authRouter.delete('/logout', userAutorization, logout)

export default authRouter;