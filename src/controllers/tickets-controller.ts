import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import enrollmentsService from '@/services/enrollments-service';

export async function readTicketTypes(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).json(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function readTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function ticketPost(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);
    const { id } = enrollmentWithAddress;
    const ticket = await ticketsService.createTicket({
      enrollmentId: id,
      ticketTypeId: Number(ticketTypeId),
      status: 'RESERVED',
    });

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
