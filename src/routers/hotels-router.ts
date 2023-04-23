import { Router } from 'express';

import { getHotelIdSchema } from '@/schemas';
import { authenticateToken, validateParams } from '@/middlewares';
import { listHotels, listHotelRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', listHotels)
  .get('/:hotelId', validateParams(getHotelIdSchema), listHotelRooms);

export { hotelsRouter };
