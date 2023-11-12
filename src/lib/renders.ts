import { usd } from '.';
import { IStatmentData } from '../interfaces';

export function renderPlainText(data: IStatmentData) {
  let result = `Statement for ${data.customer}\n`;

  for (const perf of data.perfomances) {
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)}`;
    result += ` (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You erned ${data.totalVolumeCredit}\n`;
  return result;
}
