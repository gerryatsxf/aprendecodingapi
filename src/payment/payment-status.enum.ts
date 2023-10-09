export enum PaymentStatusEnum {
  Pending = 'pending', // default, set when new booking is requested
  Paid = 'paid', // set when booking payment is successful
  Stale = 'stale', // set when booking payment has expired
  Failed = 'failed', // set when booking payment was tried but failed
}
