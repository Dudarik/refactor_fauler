import {
  IInvoice,
  IPerfomance,
  IPlays,
  IRenderPerfomance,
  IStatmentData,
} from '../interfaces';
import { createPerfomanceCalculator } from './PerfomanceCalculator';

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
