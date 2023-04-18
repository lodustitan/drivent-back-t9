import { Router } from 'express';

import { postTicketsSchema } from '@/schemas';

import { validateBody, authenticateToken } from '@/middlewares';
import { readTicket, readTicketTypes, ticketPost } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', readTicketTypes)
  .get('/', readTicket)
  .post('/', validateBody(postTicketsSchema), ticketPost);

export { ticketsRouter };
