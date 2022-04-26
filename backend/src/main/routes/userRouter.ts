import { Router } from 'express';
import { UserController } from '../../presentation/controllers';

const userRouter = Router();

userRouter.route('/')
  .get(() => {
    return {'MENSAGEM': 'Oi, entrei!'};
  });

export { userRouter };
