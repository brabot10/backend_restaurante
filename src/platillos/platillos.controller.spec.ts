import { Test, TestingModule } from '@nestjs/testing';
import { PlatillosController } from './platillos.controller';
import { PlatillosService } from './platillos.service';

describe('PlatillosController', () => {
  let controller: PlatillosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatillosController],
      providers: [PlatillosService],
    }).compile();

    controller = module.get<PlatillosController>(PlatillosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
