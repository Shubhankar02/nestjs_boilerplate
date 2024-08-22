import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import { PaymentServiceInterface } from '../interfaces/payment-service.interface';

@Injectable()
export class RazorpayPaymentService implements PaymentServiceInterface {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: 'your-razorpay-key-id',
      key_secret: 'your-razorpay-key-secret',
    });
  }

  async initializePayment(
    amount: number,
    currency: string,
    description: string,
  ) {
    return this.razorpay.orders.create({
      amount,
      currency,
      receipt: description,
    });
  }

  async verifyPayment(paymentId: string) {
    return this.razorpay.payments.fetch(paymentId);
  }
}
