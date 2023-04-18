import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';

async function createNewPayment(cardInfo: cardInfos, userId: number) {
  const ticket = await paymentRepository.getTicketIdByUserId(userId);

  if (!ticket.id) throw notFoundError();
  if (ticket.id !== cardInfo.ticketId) throw unauthorizedError();

  const result = await paymentRepository.findTicketInfo(cardInfo.ticketId);
  const result2 = await paymentRepository.createPayment({
    ticketId: cardInfo.ticketId,
    issuer: cardInfo.cardData.issuer,
    lastDigits: cardInfo.cardData.number.toString().slice(-4),
    value: result.TicketType.price,
  });
  await paymentRepository.updateTicketPayment(cardInfo.ticketId);

  if (!result2) throw notFoundError();

  return result2;
}

export type cardInfos = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

async function getPayment(ticketId: number, userId: number) {
  const ticket = await paymentRepository.getTicketIdByUserId(userId);

  if (!ticket) throw unauthorizedError();

  if (ticket.id !== ticketId) throw unauthorizedError();

  const result = await paymentRepository.find(ticketId);

  if (!result) throw notFoundError();

  return result;
}

const paymentsService = {
  createNewPayment,
  getPayment,
};

export default paymentsService;
