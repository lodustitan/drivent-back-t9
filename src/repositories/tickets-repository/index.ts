import { Prisma, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: createPostTicket) {
  return prisma.ticket.create({
    data,
    include: {
      TicketType: true,
    },
  });
}
type createPostTicket = {
  status: TicketStatus;
  ticketTypeId: number;
  enrollmentId: number;
};

async function findFirst(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function findAllTicketTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  create,
  findFirst,
  findAllTicketTypes,
};

export default ticketRepository;
