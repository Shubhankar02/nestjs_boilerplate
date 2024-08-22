import { DynamicModule, Module } from '@nestjs/common';
import { CRMServiceFactory } from './factories/crm-service.factory';

@Module({})
export class CrmModule {
  static forRoot(
    serviceType: 'hubspot' | 'zoho' | 'salesforce' | 'dynamics' | 'custom',
  ): DynamicModule {
    let service;
    switch (serviceType) {
      case 'hubspot':
        service = HubSpotCRMService;
        break;
      // Add cases for other services...
      default:
        throw new Error(`CRM service type ${serviceType} is not supported`);
    }

    return {
      module: CRMModule,
      providers: [
        CRMServiceFactory,
        service,
        {
          provide: 'CRMService',
          useExisting: service,
        },
      ],
      exports: [CRMServiceFactory],
    };
  }
}
