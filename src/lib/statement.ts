import { IInvoice, IPlays } from '../interfaces';
import { createStatmentData, renderPlainText } from '.';

export function statement(invoice: IInvoice, plays: IPlays) {
  return renderPlainText(createStatmentData(invoice, plays));
}
