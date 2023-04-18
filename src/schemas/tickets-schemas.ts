import Joi from 'joi';

export const postTicketsSchema = Joi.object({
  ticketTypeId: Joi.number().required(),
});
