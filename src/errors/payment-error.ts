import { ApplicationError } from '@/protocols';

export function paymentRequired(): ApplicationError {
  return {
    name: 'PaymentRequest',
    message: 'Ticket not paid!',
  };
}
