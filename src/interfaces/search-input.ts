import { Destination } from './destination';

export interface SearchInput {
  from?: Destination | null;
  to?: Destination | null;
  checkstatus?: boolean | null;
  departure?: string | null | Date;
  return?: string | null | Date;
}
