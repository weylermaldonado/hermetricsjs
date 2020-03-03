import LevenshteinCostOptions from '../interfaces/levenshtein-opts.interface'

class Metric {
  private readonly _name: string;

  constructor (name = 'Generic') {
    this._name = name
  }

  /**
     * distance
     */
  public distance (source: string, target: string, { deletionCost, insertionCost, substitutionCost }: LevenshteinCostOptions = {}): number {
    return source === target ? 0 : 1
  }

  public maxDistance (source: string, target: string, { deletionCost, insertionCost, substitutionCost }: LevenshteinCostOptions = {}): number {
    return (source.length === 0 && target.length === 0) ? 0 : 1
  }
}

export default Metric
