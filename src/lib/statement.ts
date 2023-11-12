import { IInvoice, IPlays } from '../interfaces';
import { createStatmentData, renderHtml } from '.';

export function statement(invoice: IInvoice, plays: IPlays) {
  // return renderPlainText(createStatmentData(invoice, plays));
  return renderHtml(createStatmentData(invoice, plays));
}
