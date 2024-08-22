import { DynamicModule, Module } from '@nestjs/common';
import { StripePaymentService } from './services/stripe-payment.service';
import { RazorpayPaymentService } from './services/razorpay-payment.service';
import { PaymentServiceFactory } from './factories/payment-service.factory';
import { CustomPaymentService } from './services/custom-payment.service';
import { PayPalPaymentService } from './services/paypal-payment.service';

@Module({})
export class PaymentServiceModule {
  static forRoot(
    serviceType: 'stripe' | 'razorpay' | 'paypal' | 'custom',
  ): DynamicModule {
    let service;
    switch (serviceType) {
      case 'stripe':
        service = StripePaymentService;
        break;
      case 'razorpay':
        service = RazorpayPaymentService;
        break;
      case 'paypal':
        service = PayPalPaymentService;
        break;
      case 'custom':
        service = CustomPaymentService;
        break;
      default:
        throw new Error(`Payment service type ${serviceType} is not supported`);
    }

    return {
      module: PaymentServiceModule,
      providers: [
        PaymentServiceFactory,
        service,
        {
          provide: 'PaymentService',
          useExisting: service,
        },
      ],
      exports: ['PaymentService'],
    };
  }
}
