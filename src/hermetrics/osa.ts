import LevenshteinCostOptions from '../interfaces/levenshtein-opts.interface';
import Levenshtein from './levenshtein';


class OSA extends Levenshtein
{
    constructor(name: string = "OSA")
    {
        super(name)
    }

    public distance(source: string, target: string, { deletionCost, insertionCost, substitutionCost, transpositionCost, cost=1 } : LevenshteinCostOptions = {}): number
    {
        const sourceLength: number = source.length;
        const targetLength: number = target.length;
        

        const removeCost: number = deletionCost ??  cost;
        const insertCost: number = insertionCost ?? cost;
        const subtractCost: number = substitutionCost ?? cost;
        const transposCost: number = transpositionCost ?? cost;
        const rows: number = sourceLength + 1;
        const cols: number = targetLength + 1;

                const distanceMatrix: number[][] = Array<number>(rows).fill(0).map(() => Array<number>(cols).fill(0))

        for(var i = 0; i < rows; i++)
        {
            distanceMatrix[i][0] = UPPER;
        }
        for(var i = 0; i < cols; i++)
        {
            distanceMatrix[0][i] = UPPER;
        }
        for(var i = 1; i < rows; i++)
        {
            distanceMatrix[i][1] = (i - 1)*insertCost;
        }
        for(var i = 1; i < cols; i++)
        {
            distanceMatrix[1][i] = (i - 1)*insertCost;
        }
        
        var lastMatchCol : number = 0;
        var lastMatchRow : number = 0;
        var sourceSymbol : string = "";
        var targetSymbol : string = "";
        var lastRow  = Object.create(null);
        var optSubCost : number = 0;
        var deletion : number = 0;
        var insertion : number = 0;
        var substitution : number = 0; 
        var transpotition : number = 0;
        for(var i = 1; i < sourceLength + 1; i++)
        {
            sourceSymbol = source[i - 1];
            lastMatchCol = 0;

            for( var j = 1; j < targetLength + 1; j++)
            {
                targetSymbol = target[j-1]
                lastMatchRow = lastRow[targetSymbol] != undefined ? lastRow[targetSymbol] : 0;
                optSubCost =  sourceSymbol == targetSymbol ? 0  : subtractCost;

                deletion = distanceMatrix[i][j + 1] + removeCost;
                insertion = distanceMatrix[i + 1][j] + insertCost;
                substitution = distanceMatrix[i][j] + optSubCost;

                transpotition = distanceMatrix[lastMatchRow][lastMatchCol] + 
                                Math.max((i - lastMatchRow)*removeCost, (j - lastMatchCol) * insertCost) + transposCost;
                distanceMatrix[i + 1][j + 1] = Math.min(deletion, insertion, substitution, transpotition);

                if (optSubCost == 0)
                {
                    lastMatchCol = j;
                }
            }
            lastRow[sourceSymbol] = i;
        }

        //this.printMatrix(distanceMatrix)
        return distanceMatrix[rows-1][cols-1];
    }
    private printMatrix(distanceMatrix: number[][] ) : void
    {
        for(var i in distanceMatrix)
        {
            console.log(distanceMatrix[i]);   
        }
    }
    /**
     * 
     * @param source 
     * @param target 
     * @param param2 
     */
    public maxDistance(source: string, target: string, { deletionCost, insertionCost, substitutionCost, cost=1 } : LevenshteinCostOptions = {}): number
    {
        return super.maxDistance(source, target, { deletionCost, insertionCost, substitutionCost, cost})
    }
}

export default OSA 