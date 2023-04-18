import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function createPayment(card: customCardData) {
  return prisma.payment.create({
    data: {
      ticketId: card.ticketId,
      value: card.value,
      cardIssuer: card.issuer,
      cardLastDigits: card.lastDigits,
    },
  });
}
export type customCardData = {
  ticketId: number;
  value: number;
  lastDigits: string;
  issuer: string;
};

async function findTicketInfo(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function updateTicketPayment(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'PAID',
    },
  });
}

async function find(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function getTicketIdByUserId(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    select: {
      id: true,
      enrollmentId: true,
    },
  });
}

const paymentRepository = {
  createPayment,
  updateTicketPayment,
  find,
  findTicketInfo,
  getTicketIdByUserId,
};

export default paymentRepository;
