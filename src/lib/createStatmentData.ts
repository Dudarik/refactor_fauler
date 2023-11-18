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

    const calculator = createPerfomanceCalculator(aPerfomance, playFor(result));

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.voulumeCredits;

    return result;
  }
  function playFor(aPerfomance: IRenderPerfomance) {
    return plays[aPerfomance.playID];
  }

  function totalAmount(data: IStatmentData) {
    return data.perfomances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredit(data: IStatmentData) {
    return data.perfomances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function createPerfomanceCalculator(
  aPerfomance: IPerfomance | IRenderPerfomance,
  aPlay: IPlay
) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerfomance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerfomance, aPlay);

    default:
      throw new Error(`Uncnown type: ${aPlay.type}`);
  }
}

export class PerfomanceCalculator {
  constructor(
    public aPerfomance: IPerfomance | IRenderPerfomance,
    public play: IPlay
  ) {}

  get voulumeCredits() {
    let volumeCredits = 0;

    volumeCredits += Math.max(this.aPerfomance.audience - 30, 0);

    if ('comedy' === this.play.type)
      volumeCredits += Math.floor(this.aPerfomance.audience / 5);

    return volumeCredits;
  }
}

class TragedyCalculator extends PerfomanceCalculator {
  get amount() {
    let result = 40000;

    if (this.aPerfomance.audience > 30)
      result += 1000 * (this.aPerfomance.audience - 30);
    return result;
  }
}
class ComedyCalculator extends PerfomanceCalculator {
  get amount() {
    let result = 30000;

    if (this.aPerfomance.audience > 20)
      result += 10000 + 500 * (this.aPerfomance.audience - 20);

    result += 300 * this.aPerfomance.audience;
    return result;
  }
}
