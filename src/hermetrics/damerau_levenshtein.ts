import Levenshtein from '../hermetrics/levenshtein'
import IDamerauLevenshteinCostOptions from '../interfaces/damerau-levenshtein-opts.interface'

class DamerauLevenshtein extends Levenshtein {
  constructor (name: string = 'Damerau-Levenshtein') {
    super(name)
  }

  public distance (source: string, target: string, costs: IDamerauLevenshteinCostOptions = {}): number {
    const { insertionCost = 1, deletionCost = 1, substitutionCost = 1, transpositionCost = 1 } = costs
    const sourceLength: number = source.length
    const targetLength: number = target.length
    const UPPER = Math.max(insertionCost, deletionCost, substitutionCost, transpositionCost) * (sourceLength + targetLength)

    let matrix: number[][] = [this.range(targetLength + 2).map(() => UPPER)]
    matrix = matrix.concat([[UPPER].concat(this.range(targetLength + 1).map((j: number) => j * insertionCost))])
    matrix = matrix.concat(this.range(1, sourceLength + 1).map((i) => [UPPER, i].concat(new Array<number>(targetLength).fill(0))))

    // const lastRow = new Map()
    const lastRow = new Map()

    for (let i = 1; i < sourceLength + 1; i++) {
      const sourceSymbol: string = source[i - 1]
      let lastMatchCol = 0

      for (let j = 1; j < targetLength + 1; j++) {
        const targetSymbol = target[j - 1]
        // lastRow.set(targetSymbol, 0)
        const lastMatchRow: number = lastRow.get(targetSymbol) ?? 0
        const optSubstitutionCost = sourceSymbol === targetSymbol ? 0 : substitutionCost

        const del = matrix[i][j + 1] + deletionCost
        const ins = matrix[i + 1][j] + insertionCost
        const subs = matrix[i][j] + optSubstitutionCost

        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const transposition = matrix[lastMatchRow][lastMatchCol] + Math.max((i - lastMatchRow - 1), (j - lastMatchCol - 1) * insertionCost) + transpositionCost
        matrix[i + 1][j + 1] = Math.min(del, ins, subs, transposition)

        if (optSubstitutionCost === 0) lastMatchCol = j
      }
      lastRow.set(sourceSymbol, i)
    }
    console.log(matrix)
    return matrix[sourceLength][targetLength]
  }

  private range (start: number = 0, stop: number = 0, step: number = 1): number[] {
    const result: number[] = []
    if (stop === 0) {
      stop = start
      start = 0
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) return result
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) result.push(i)
    return result
  }
}
const a = new DamerauLevenshtein()
console.log(a.distance('abcd', 'cbad')) // 2
console.log(a.distance('abc', 'abc')) // 0
console.log(a.distance('abc', 'def')) // 3
console.log(a.distance('abc', '')) // 3
console.log(a.distance('', 'abc')) // 3
console.log(a.distance('', '')) // 0
console.log(a.distance('abc', 'ca')) // 2

export default DamerauLevenshtein
