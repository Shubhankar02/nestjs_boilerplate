export interface CRMServiceInterface {
  createContact(contactData: any): Promise<any>;

  getContactById(contactId: string): Promise<any>;

  updateContact(contactId: string, updateData: any): Promise<any>;

  deleteContact(contactId: string): Promise<any>;
}
