import { IPerfomance, IPlay, IRenderPerfomance } from '../../interfaces';

export class PerfomanceCalculator {
  constructor(
    public aPerfomance: IPerfomance | IRenderPerfomance,
    public play: IPlay
  ) {}

  get voulumeCredits() {
    let volumeCredits = 0;

    volumeCredits += Math.max(this.aPerfomance.audience - 30, 0);

    return volumeCredits;
  }
}
