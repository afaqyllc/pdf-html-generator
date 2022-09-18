import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';
import hbs = require('handlebars');

@Injectable()
export class PdfHtmlGeneratorService {
  async compile(templateName, data): Promise<any> {
    const filePath = path.join(__dirname, '..', `views/${templateName}.hbs`);
    if (!filePath) {
      throw new Error(`Could not find ${templateName}.hbs in generatePDF`);
    }
    const html = fs.readFileSync(filePath, 'utf8');
    return Promise.resolve(hbs.compile(html)(data));
  }

  async generateTestPDFFromHTML(content) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');
    const buffer = await page.pdf({
      format: 'a4',
      height: 290,
      margin: { top: 0, bottom: 0, right: 0, left: 0 },
    });
    await browser.close();
    return buffer;
  }

  async generatePDFFromHtml(template, data) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await this.compile(template, data);
    await page.setContent(content, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');
    await page.waitFor(100);
    const buffer = await page.pdf({
      format: 'a4',
      margin: { top: 0, bottom: 0, right: 0, left: 0 },
      pageRanges: '1,2',
    });
    await browser.close();
    return buffer;
  }
}
