import { PerfomanceCalculator } from './PerfomaceCalculator';

export class TragedyCalculator extends PerfomanceCalculator {
  get amount() {
    let result = 40000;

    if (this.aPerfomance.audience > 30)
      result += 1000 * (this.aPerfomance.audience - 30);
    return result;
  }

  get voulumeCredits() {
    return Math.floor(this.aPerfomance.audience / 5);
  }
}
