import { Injectable } from '@nestjs/common';
import { PaymentServiceInterface } from '../interfaces/payment-service.interface';

@Injectable()
export class CustomPaymentService implements PaymentServiceInterface {
  constructor() {}

  async initializePayment() {
    //Create custom initializePayment logic
  }

  async verifyPayment() {
    // Create custom verify payment logic
  }
}
