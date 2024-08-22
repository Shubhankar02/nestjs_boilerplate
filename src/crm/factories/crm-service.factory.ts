import { Injectable, Inject, Optional } from '@nestjs/common';
import { CRMServiceInterface } from '../interfaces/crm-service.interface';
import { HubSpotCRMService } from '../services/hubspot-crm.service';
// Import other CRM services...

@Injectable()
export class CRMServiceFactory {
  private readonly services: Map<string, CRMServiceInterface>;

  constructor(
    @Optional()
    @Inject(HubSpotCRMService)
    private hubspotService?: HubSpotCRMService,
    // Inject other CRM services...
  ) {
    this.services = new Map<string, CRMServiceInterface>();
    if (hubspotService) this.services.set('hubspot', hubspotService);
    // Register other services...
  }

  registerService(type: string, service: CRMServiceInterface) {
    this.services.set(type, service);
  }

  getCRMService(type: string): CRMServiceInterface {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`CRM service for type ${type} not found`);
    }
    return service;
  }
}
