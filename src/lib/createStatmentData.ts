import {
  IInvoice,
  IPerfomance,
  IPlay,
  IPlays,
  IRenderPerfomance,
  IStatmentData,
} from '../interfaces';

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
    const result: IRenderPerfomance = Object.assign({}, aPerfomance, {
      play: { name: '', type: '' },
      amount: 0,
      volumeCredits: 0,
    });

    const calculator = new PerfomanceCalculator(aPerfomance, playFor(result));

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }
  function playFor(aPerfomance: IRenderPerfomance) {
    return plays[aPerfomance.playID];
  }

  function volumeCreditsFor(aPerfomance: IRenderPerfomance) {
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

export class PerfomanceCalculator {
  constructor(
    public aPerfomance: IPerfomance | IRenderPerfomance,
    public play: IPlay
  ) {}

  get amount() {
    let result = 0;

    switch (this.play.type) {
      case 'tragedy':
        result = 40000;

        if (this.aPerfomance.audience > 30)
          result += 1000 * (this.aPerfomance.audience - 30);

        break;

      case 'comedy':
        result = 30000;

        if (this.aPerfomance.audience > 20)
          result += 10000 + 500 * (this.aPerfomance.audience - 20);

        result += 300 * this.aPerfomance.audience;

        break;

      default:
        throw new Error(`Uncnown type: ${this.play.type}`);
    }

    return result;
  }
}
