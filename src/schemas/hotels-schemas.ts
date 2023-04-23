import Joi from 'joi';

export const getHotelIdSchema = Joi.object({
  hotelId: Joi.number().required(),
});
