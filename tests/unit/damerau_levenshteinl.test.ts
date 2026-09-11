import { describe, it } from 'mocha'
import { expect } from 'chai'
import DamerauLevenshtein from '../../src/hermetrics/damerau_levenshtein'
const ERROR : number = 1e-4
describe('Damerau - Levenshtein Distance', function()
{
    describe('Distance Test', function()
    {
        // 1 transposition
        it('should return 2 for ab - ba', function()
        {   
            const dam = new DamerauLevenshtein();
            const distance = dam.distance('ab', 'ba');
            expect(distance).equal(1);
        });
        // 1 deletion (b) then 1 transposition (ac -> ca) (unrestricted)
        it('should return 2 for abc - ca', function()
        {   
            const dam = new DamerauLevenshtein();
            const distance = dam.distance('abc', 'ca');
            expect(distance).equal(2);
        });
        // a match after unrestricted transposition
        it('should return 3 for abc - caa', function()
        {   
            const dam = new DamerauLevenshtein();
            const distance = dam.distance('abc', 'caa');
            expect(distance).equal(3);
        });
        // 2 substitutions
        it('should return 2 for abcd - cbad', function()
        {   
            const dam = new DamerauLevenshtein();
            const distance = dam.distance('abcd', 'cbad');
            expect(distance).equal(2);
        });
        // 2 insertions
        it('should return 2 for ace - abcde and (0.75, 1, 1.25, 1.5)', function()
        {   
            const dam = new DamerauLevenshtein();
            const distance = dam.distance('ace', 'abcde', {deletionCost:0.75, insertionCost:1,substitutionCost:1.25,transpositionCost:1.5});
            expect(distance).equal(2);
        });
        // 3 substitutions
        it('should return 3 for abc - def', function()
        {   
            const dam = new DamerauLevenshtein();
            const distance = dam.distance('abc', 'def');
            expect(distance).equal(3);
        });
    });

    describe('Similarity test', function()
    {
        // 1 deletion (b) then 1 transposition (ac -> ca) (unrestricted)
        it('should return 0.3333 for abc - ca', function()
        {   
            const dam = new DamerauLevenshtein();
            const similarity = dam.similarity('abc', 'ca');
            const expApp = Math.abs(similarity - 0.3333) < ERROR;
            expect(expApp).equal(true);
        });

        // a match after unrestricted transposition
        it('should return 0 for abc - caa', function()
        {   
            const dam = new DamerauLevenshtein();
            const similarity = dam.similarity('abc', 'caa');
            const expApp = Math.abs(similarity - 0) < ERROR;
            expect(expApp).equal(true);
        });
        
        it('should return 0.5 for abcd - cbad', function()
        {   
            const dam = new DamerauLevenshtein();
            const similarity = dam.similarity('abcd', 'cbad');
            const expApp = Math.abs(similarity - 0.5) < ERROR;
            expect(expApp).equal(true);
        });

        it('should return 0.6522 for ace - abcde and (0.75, 1, 1.25, 1.5)', function()
        {   
            const dam = new DamerauLevenshtein();
            const similarity = dam.similarity('ace', 'abcde', {deletionCost:0.75, insertionCost:1,substitutionCost:1.25,transpositionCost:1.5});
            const expApp = Math.abs(similarity - 0.6522) < ERROR;
            expect(expApp).equal(true);
        });
    })
    describe('Normalized test', function()
    {
        // 1 deletion (b) then 1 transposition (ac -> ca) (unrestricted)
        it('should return 0.6667 for abc - ca', function()
        {   
            const dam = new DamerauLevenshtein();
            const normalizedDistance = dam.normalizedDistance('abc', 'ca');
            const expApp = Math.abs(normalizedDistance - 0.6667) < ERROR;
            expect(expApp).equal(true);
        });
        
        // a match after unrestricted transposition
        it('should return 1 for abc - caa', function()
        {   
            const dam = new DamerauLevenshtein();
            const normalizedDistance = dam.normalizedDistance('abc', 'caa');
            const expApp = Math.abs(normalizedDistance - 1) < ERROR;
            expect(expApp).equal(true);
        });
        
        it('should return 0.5 for abcd - cbad', function()
        {   
            const dam = new DamerauLevenshtein();
            const normalizedDistance = dam.normalizedDistance('abcd', 'cbad');
            const expApp = Math.abs(normalizedDistance - 0.5) < ERROR;
            expect(expApp).equal(true);
        });

        it('should return 0.3478 for ace - abcde and (0.75, 1, 1.25, 1.5)', function()
        {   
            const dam = new DamerauLevenshtein();
            const normalizedDistance = dam.normalizedDistance('ace', 'abcde', {deletionCost:0.75, insertionCost:1,substitutionCost:1.25,transpositionCost:1.5});
            const expApp = Math.abs(normalizedDistance - 0.3478) < ERROR;
            expect(expApp).equal(true);
        });
    })
});
