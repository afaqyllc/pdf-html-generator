import { Module } from '@nestjs/common';
import { PdfHtmlGeneratorService } from './pdf-html-generator.service';

@Module({
  providers: [PdfHtmlGeneratorService],
  exports: [PdfHtmlGeneratorService],
})
export class PdfHtmlGeneratorModule {}
