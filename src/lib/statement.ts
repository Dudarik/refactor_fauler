import { IInvoice, IPerfomance, IPlays, IStatmentData } from '../interfaces';

export function statement(invoice: IInvoice, plays: IPlays) {
  const statementData: IStatmentData = { customer: '', perfomances: [] };
  statementData.customer = invoice.customer;
  statementData.perfomances = invoice.perfomances.map(enrichPerfomance);

  function enrichPerfomance(aPerfomance: IPerfomance) {
    const result: IPerfomance = Object.assign({}, aPerfomance);

    result.play = playFor(result);
    result.amount = amountFor(result);

    function playFor(aPerfomance: IPerfomance) {
      return plays[aPerfomance.playID];
    }

    function amountFor(aPerfomance: IPerfomance) {
      let result = 0;

      switch (aPerfomance.play.type) {
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
          throw new Error(`Uncnown type: ${aPerfomance.play.type}`);
      }

      return result;
    }
    return result;
  }

  return renderPlainText(statementData);
}

export function renderPlainText(data: IStatmentData) {
  let result = `Statement for ${data.customer}\n`;

  for (const perf of data.perfomances) {
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)}`;
    result += ` (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You erned ${totalVolumeCredit()}\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (const perf of data.perfomances) {
      result += perf.amount;
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

    if ('comedy' === aPerfomance.play.type)
      volumeCredits += Math.floor(aPerfomance.audience / 5);

    return volumeCredits;
  }
}
