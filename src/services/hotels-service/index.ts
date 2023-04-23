import { Event } from '@prisma/client';
import { notFoundError } from '@/errors';
import { exclude } from '@/utils/prisma-utils';
import hotelRepository from '@/repositories/hotel-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { paymentRequired } from '@/errors/payment-error';

async function verifyUserHavePaidTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || !enrollment) throw notFoundError();

  if (
    ticket.status === 'RESERVED' ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false
  ) {
    throw paymentRequired();
  }

  return true;
}

async function getAllHotelRooms(hotelId: number) {
  const rooms = await hotelRepository.findManyRooms(hotelId);
  if (rooms.length === 0) throw notFoundError();

  return rooms;
}

async function getAllHotels() {
  const hotel = await hotelRepository.findManyHotels();
  if (hotel.length === 0) throw notFoundError();

  return hotel;
}

const hotelsService = {
  verifyUserHavePaidTicket,
  getAllHotelRooms,
  getAllHotels,
};

export default hotelsService;
