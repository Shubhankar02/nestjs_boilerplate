export interface PaymentServiceInterface {
  initializePayment(
    amount: number,
    currency: string,
    description: string,
  ): Promise<any>;

  verifyPayment(paymentId: string): Promise<any>;
}
