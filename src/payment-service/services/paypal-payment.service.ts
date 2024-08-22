import { Injectable } from '@nestjs/common';
import paypal from '@paypal/checkout-server-sdk';
import { PaymentServiceInterface } from '../interfaces/payment-service.interface';

@Injectable()
export class PayPalPaymentService implements PaymentServiceInterface {
  private payPalClient: paypal.core.PayPalHttpClient;

  constructor() {
    const environment = new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET,
    );
    this.payPalClient = new paypal.core.PayPalHttpClient(environment);
  }

  async initializePayment(
    amount: number,
    currency: string,
    description: string,
  ) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString(),
          },
          description,
        },
      ],
    });

    const order = await this.payPalClient.execute(request);
    return order.result;
  }

  async verifyPayment(paymentId: string) {
    const request = new paypal.orders.OrdersGetRequest(paymentId);
    const order = await this.payPalClient.execute(request);
    return order.result;
  }
}
