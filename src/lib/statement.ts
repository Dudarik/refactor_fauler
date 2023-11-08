import { IInvoice, IPerfomance, IPlay, IPlays } from '../interfaces';

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

    const thisAmount = amountFor(perf, play);

    volumeCredits += Math.max(perf.audience - 30, 0);

    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += ` ${play.name}: ${format(thisAmount / 100)}`;
    result += ` (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You erned ${volumeCredits}\n`;
  return result;

  function amountFor(aPerfomance: IPerfomance, play: IPlay) {
    let result = 0;

    switch (play.type) {
      case 'tragedy':
        result = 40000;

        if (aPerfomance.audience > 30)
          result += 1000 * (aPerfomance.audience - 30);

        break;

      case 'comedy':
        result = 30000;

        if (aPerfomance.audience > 20)
          result += 10000 + 500 * (aPerfomance.audience - 20);

        result += 300 * aPerfomance.audience;

        break;

      default:
        throw new Error(`Uncnown type: ${play.type}`);
    }

    return result;
  }
}
