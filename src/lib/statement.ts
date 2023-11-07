import { IInvoice, IPlays } from '../interfaces';

export function statement(invoice: IInvoice, plays: IPlays) {
  let totalAmount = 0;
  let volumeCredits = 0;

  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (const perf of invoice.perfomances) {
    const play = plays[perf.playID];

    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;

        if (perf.audience > 30) thisAmount += 1000 * (perf.audience - 30);

        break;

      case 'comedy':
        thisAmount = 30000;

        if (perf.audience > 20)
          thisAmount += 10000 + 500 * (perf.audience - 20);

        thisAmount += 300 * perf.audience;

        break;

      default:
        throw new Error(`Uncnown type: ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);

    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += ` ${play.name}: ${format(thisAmount / 100)}`;
    result += ` (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You erned ${volumeCredits}\n`;
  return result;
}
