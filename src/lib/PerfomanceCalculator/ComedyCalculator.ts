import { PerfomanceCalculator } from './PerfomaceCalculator';

export class ComedyCalculator extends PerfomanceCalculator {
  get amount() {
    let result = 30000;

    if (this.aPerfomance.audience > 20)
      result += 10000 + 500 * (this.aPerfomance.audience - 20);

    result += 300 * this.aPerfomance.audience;
    return result;
  }
}
