import { Injectable, Inject, Optional } from '@nestjs/common';
import { PaymentServiceInterface } from '../interfaces/payment-service.interface';
import { StripePaymentService } from '../services/stripe-payment.service';
import { RazorpayPaymentService } from '../services/razorpay-payment.service';

@Injectable()
export class PaymentServiceFactory {
  private readonly services: Map<string, PaymentServiceInterface>;

  constructor(
    @Optional()
    @Inject(StripePaymentService)
    private stripeService?: StripePaymentService,
    @Optional()
    @Inject(RazorpayPaymentService)
    private razorpayService?: RazorpayPaymentService,
  ) {
    this.services = new Map<string, PaymentServiceInterface>();
    if (stripeService) this.services.set('stripe', stripeService);
    if (razorpayService) this.services.set('razorpay', razorpayService);
  }

  registerService(type: string, service: PaymentServiceInterface) {
    this.services.set(type, service);
  }

  getPaymentService(type: string): PaymentServiceInterface {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`Payment service for type ${type} not found`);
    }
    return service;
  }
}
