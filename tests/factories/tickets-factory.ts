import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType(isRemote?: boolean, includesHotel?: boolean) {
  const config = {
    isRemote,
    includesHotel,
  };

  if (isRemote === undefined) config.isRemote = faker.datatype.boolean();
  if (includesHotel === undefined) config.includesHotel = faker.datatype.boolean();

  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: config.isRemote,
      includesHotel: config.includesHotel,
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
