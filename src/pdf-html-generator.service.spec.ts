import { Test, TestingModule } from '@nestjs/testing';
import { PdfHtmlGeneratorService } from './pdf-html-generator.service';

describe('PdfHtmlGeneratorService', () => {
  let service: PdfHtmlGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfHtmlGeneratorService],
    }).compile();

    service = module.get<PdfHtmlGeneratorService>(PdfHtmlGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
