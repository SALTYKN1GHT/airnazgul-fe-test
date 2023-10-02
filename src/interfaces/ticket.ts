import { Destination } from './destination';

export interface TicketObject {
  from: Destination;
  to: Destination;
  departureDate: string;
  returnDate: string;
  departureHour: string;
  arrivalHour: string;
  flightTime: string;
  distance: number;
  price: number;
}
