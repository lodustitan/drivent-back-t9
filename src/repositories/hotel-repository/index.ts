import { prisma } from '@/config';

async function findManyHotels() {
  return prisma.hotel.findMany();
}
async function findManyRooms(hotelId: number) {
  return prisma.hotel.findMany({ where: { id: hotelId }, include: { Rooms: true } });
}

const hotelRepository = {
  findManyHotels,
  findManyRooms,
};

export default hotelRepository;
