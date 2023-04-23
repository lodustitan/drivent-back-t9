import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.firstName(),
      image: faker.internet.url(),
    },
  });
}

export async function createHotelRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.firstName(),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId: hotelId,
    },
  });
}
