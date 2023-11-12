import { IInvoice, IPerfomance, IPlays, IStatmentData } from '../interfaces';

export function createStatmentData(invoice: IInvoice, plays: IPlays) {
  const statementData: IStatmentData = {
    customer: '',
    perfomances: [],
    totalAmount: 0,
    totalVolumeCredit: 0,
  };
  statementData.customer = invoice.customer;
  statementData.perfomances = invoice.perfomances.map(enrichPerfomance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredit = totalVolumeCredit(statementData);

  return statementData;

  function enrichPerfomance(aPerfomance: IPerfomance) {
    const result: IPerfomance = Object.assign({}, aPerfomance);

    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }
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

  function volumeCreditsFor(aPerfomance: IPerfomance) {
    let volumeCredits = 0;

    volumeCredits += Math.max(aPerfomance.audience - 30, 0);

    if ('comedy' === aPerfomance.play.type)
      volumeCredits += Math.floor(aPerfomance.audience / 5);

    return volumeCredits;
  }

  function totalAmount(data: IStatmentData) {
    return data.perfomances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredit(data: IStatmentData) {
    return data.perfomances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}
