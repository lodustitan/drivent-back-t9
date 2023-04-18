import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { requestError, unauthorizedError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payment-service';

export async function readPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  try {
    if (Object.keys(req.query).length === 0) throw new Error();

    const ticketNumber = Number(ticketId);
    const result = await paymentsService.getPayment(ticketNumber, userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function payPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const data = req.body;

  try {
    await paymentsService.createNewPayment(
      {
        ticketId: data.ticketId,
        cardData: {
          cvv: data.cardData.cvv,
          expirationDate: data.cardData.expirationDate,
          issuer: data.cardData.issuer,
          name: data.cardData.name,
          number: data.cardData.number,
        },
      },
      userId,
    );
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
