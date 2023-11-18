import { IPerfomance, IPlay, IRenderPerfomance } from '../../interfaces';
import { ComedyCalculator } from './ComedyCalculator';
import { TragedyCalculator } from './TragedyCalculator';

export function createPerfomanceCalculator(
  aPerfomance: IPerfomance | IRenderPerfomance,
  aPlay: IPlay
) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerfomance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerfomance, aPlay);

    default:
      throw new Error(`Unknown type: ${aPlay.type}`);
  }
}
