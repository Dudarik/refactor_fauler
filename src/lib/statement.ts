import { IInvoice, IPlays, IStatmentData } from '../interfaces';
import { createStatmentData } from '.';

export function statement(invoice: IInvoice, plays: IPlays) {
  return renderPlainText(createStatmentData(invoice, plays));
}

export function renderPlainText(data: IStatmentData) {
  let result = `Statement for ${data.customer}\n`;

  for (const perf of data.perfomances) {
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)}`;
    result += ` (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You erned ${data.totalVolumeCredit}\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
