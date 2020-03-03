import { describe, it } from 'mocha'
import { expect } from 'chai'
import Levenshtein from '../../src/hermetircs/levenshtein'

describe('Levenshtein metric', function() {
    it('Distance test', function() {
        // Arrange
        const levenshtein = new Levenshtein();

        // Act
        const equalWordsResult = levenshtein.distance('abc', 'abc');
        const notEqualWordsResult = levenshtein.distance('abc', 'def');
        const justTargetWordResult = levenshtein.distance('abc', '');
        const justSourceWordResult = levenshtein.distance('', 'abc');
        const noWordsResult = levenshtein.distance('', '');
        const differentLengthWordsResult = levenshtein.distance('start', 'end');
        const similarWordsResult = levenshtein.distance('end', 'ended');
        const sourceContainsTargetWordsResult = levenshtein.distance('end', 'weekend');
        const camelCaseWordsResult = levenshtein.distance('ABCDEFGH', 'A*C*E*G*');
        const spacesBetweenWordsResult = levenshtein.distance('hello world', 'helloworld');
        const oneDifferenceCharWords = levenshtein.distance('survey', 'surgery');
        
        // Assert
        expect(equalWordsResult).equal(0);
        expect(notEqualWordsResult).equal(3);
        expect(justTargetWordResult).equal(3);
        expect(justSourceWordResult).equal(3);
        expect(noWordsResult).equal(0);
        expect(differentLengthWordsResult).equal(5);
        expect(similarWordsResult).equal(2);
        expect(sourceContainsTargetWordsResult).equal(4);
        expect(camelCaseWordsResult).equal(4);
        expect(spacesBetweenWordsResult).equal(1);
        expect(oneDifferenceCharWords).equal(2);


    });

    it('Max distance test', function() {
        // Arrange
        const levenshtein = new Levenshtein();

        // Act
        const equalWordsResult = levenshtein.maxDistance('abc', 'abc');
        const notEqualWordsResult = levenshtein.maxDistance('abc', 'xyz');
        const justTargetWordResult = levenshtein.maxDistance('abc', '');
        const justSourceWordResult = levenshtein.maxDistance('', 'xyz');
        const noWordsResult = levenshtein.maxDistance('', '');
        const differentLengthWordsResult = levenshtein.maxDistance('start', 'end');
        const similarWordsResult = levenshtein.maxDistance('end', 'start');
        const camelCaseWordsResult = levenshtein.maxDistance('ABCDEFGH', 'A*C*E*G*');

        // Assert
        expect(equalWordsResult).equal(3);
        expect(notEqualWordsResult).equal(3);
        expect(justTargetWordResult).equal(3);
        expect(justSourceWordResult).equal(3);
        expect(noWordsResult).equal(0);
        expect(differentLengthWordsResult).equal(5);
        expect(similarWordsResult).equal(5);
        expect(camelCaseWordsResult).equal(8);
    });
});