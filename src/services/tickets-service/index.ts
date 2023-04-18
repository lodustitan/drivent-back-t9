import { Ticket, Prisma, TicketType } from '@prisma/client';
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import { exclude } from '@/utils/prisma-utils';

async function getTicket(userId: number): Promise<Ticket> {
  const ticket = await ticketRepository.findFirst(userId);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(data: createTicketResult): Promise<Ticket> {
  const ticket = await ticketRepository.create(data);

  return ticket;
}

export type createTicketResult = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getAllTicketTypes(): Promise<TicketType[] | []> {
  const ticketType = await ticketRepository.findAllTicketTypes();

  if (ticketType.length > 0) {
    return ticketType;
  } else {
    return [];
  }
}

const ticketsService = {
  getTicket,
  createTicket,
  getAllTicketTypes,
};

export default ticketsService;
