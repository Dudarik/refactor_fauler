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

export function renderHtml(data: IStatmentData) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += `<table>`;
  result += `<tr><th>Play</th><th>cost</th></tr>`;

  for (const perf of data.perfomances) {
    result += `<tr><td>${perf.play.name}</td>`;
    result += `<td>${perf.audience} seats)</td>`;
    result += `<td>${usd(perf.amount / 100)}</td></tr>`;
  }
  result += `</table>`;

  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>`;
  result += `<p>You erned <em>${data.totalVolumeCredit}</em> credits</p>`;
  return result;
}
