import { IInvoice, IPerfomance, IPlays, IStatmentData } from '../interfaces';

const enrichPerfomance = (aPerfomance: IPerfomance) =>
  Object.assign({}, aPerfomance);

export function statement(invoice: IInvoice, plays: IPlays) {
  const statementData: IStatmentData = { customer: '', perfomances: [] };
  statementData.customer = invoice.customer;
  statementData.perfomances = invoice.perfomances.map(enrichPerfomance);
  return renderPlainText(statementData, plays);
}

export function renderPlainText(data: IStatmentData, plays: IPlays) {
  let result = `Statement for ${data.customer}\n`;

  for (const perf of data.perfomances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)}`;
    result += ` (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You erned ${totalVolumeCredit()}\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (const perf of data.perfomances) {
      result += amountFor(perf);
    }
    return result;
  }

  function totalVolumeCredit() {
    let result = 0;

    for (const perf of data.perfomances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function usd(aNumber: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function volumeCreditsFor(aPerfomance: IPerfomance) {
    let volumeCredits = 0;

    volumeCredits += Math.max(aPerfomance.audience - 30, 0);

    if ('comedy' === playFor(aPerfomance).type)
      volumeCredits += Math.floor(aPerfomance.audience / 5);

    return volumeCredits;
  }

  function amountFor(aPerfomance: IPerfomance) {
    let result = 0;

    switch (playFor(aPerfomance).type) {
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
        throw new Error(`Uncnown type: ${playFor(aPerfomance).type}`);
    }

    return result;
  }

  function playFor(aPerfomance: IPerfomance) {
    return plays[aPerfomance.playID];
  }
}
