import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CRMServiceInterface } from '../interfaces/crm-service.interface';

@Injectable()
export class HubSpotCRMService implements CRMServiceInterface {
  private readonly apiUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';

  async createContact(contactData: any): Promise<any> {
    const response = await axios.post(this.apiUrl, contactData, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
    });
    return response.data;
  }

  async getContactById(contactId: string): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/${contactId}`, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
    });
    return response.data;
  }

  async updateContact(contactId: string, updateData: any): Promise<any> {
    const response = await axios.patch(
      `${this.apiUrl}/${contactId}`,
      updateData,
      {
        headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
      },
    );
    return response.data;
  }

  async deleteContact(contactId: string): Promise<any> {
    const response = await axios.delete(`${this.apiUrl}/${contactId}`, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
    });
    return response.data;
  }
}
