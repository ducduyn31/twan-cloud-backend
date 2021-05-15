import { Test, TestingModule } from '@nestjs/testing';
import { OrayApiService } from './oray-api.service';

describe('OrayApiService', () => {
  let service: OrayApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrayApiService],
    }).compile();

    service = module.get<OrayApiService>(OrayApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
