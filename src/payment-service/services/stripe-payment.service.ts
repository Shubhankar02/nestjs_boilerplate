import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentServiceInterface } from '../interfaces/payment-service.interface';

@Injectable()
export class StripePaymentService implements PaymentServiceInterface {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('your-stripe-secret-key', {
      apiVersion: '2024-06-20',
    });
  }

  async initializePayment(
    amount: number,
    currency: string,
    description: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      description,
    });
  }

  async verifyPayment(paymentId: string) {
    return this.stripe.paymentIntents.retrieve(paymentId);
  }
}
