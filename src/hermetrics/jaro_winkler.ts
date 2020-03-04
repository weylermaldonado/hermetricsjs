import Jaro from './jaro'

class JaroWinkler extends Jaro
{
    constructor(name: string = 'Jaro_Winkler')
    {
        super(name);
    }
    /**
     * Jaro Winkler Similarity
     * @param source 
     * @param target 
     * @param cost 
     * @param p 
     */
    public similarity(source: string, target: string, cost: number = 1, p: number = 0.1): number
    {
        if (!( 0 <= p  && p <= 0.25 ))
        {
            new Error("The p parameter must be between 0 and 0.25");
        }

        const maxL: number = 4;
        let l: number = 0;

        for( let i = 0; i < 4; i++)
        {
            if(source[i] != target[i]) break;
            l++;
        }

        const j: number = super.similarity(source, target, cost);
        return j + l*p*(1 - j);

    }

    /**
     * Jaro Winkler distance
     * @param source 
     * @param target 
     * @param cost 
     * @param p 
     */
    public distance(source: string, target: string, cost: number = 1, p: number = 0.1): number
    {
        return 1 - this.similarity(source, target, cost, p)
    }
}
export default JaroWinkler;