import { Router } from 'express';

import { paymentPostSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { payPayment, readPayments } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', readPayments)
  .post('/process', validateBody(paymentPostSchema), payPayment);

export { paymentsRouter };
