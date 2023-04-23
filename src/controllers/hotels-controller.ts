import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/users-service';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function listHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    await hotelsService.verifyUserHavePaidTicket(userId);
    const hotel = await hotelsService.getAllHotels();

    return res.status(httpStatus.OK).json(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    } else if (error.name === 'PaymentRequest') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function listHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const { userId } = req;
  try {
    await hotelsService.verifyUserHavePaidTicket(userId);
    const rooms = await hotelsService.getAllHotelRooms(Number(hotelId));

    return res.status(httpStatus.OK).json(rooms);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    } else if (error.name === 'PaymentRequest') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
