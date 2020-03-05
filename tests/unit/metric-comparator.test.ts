import { describe, it } from 'mocha'
import { expect } from 'chai'
import MetricComparator from '../../src/hermetrics/metric-comparator'
import ComparatorSimilarity from '../../src/interfaces/comparator-opts.interface'

describe('Metric comparator', function() {
    describe('Metrics tests', function() {           
       it('should return 0.5 with Levenshtein metric', function() {
            // Arrange
        const metricComparator = new MetricComparator()

        // Act
        const result = metricComparator.similarity('hardin', 'martinez')
        const levenshteinResult: Array<ComparatorSimilarity>  = result.filter(item => item.metric.name === 'Levenshtein')

        // Assert
        expect(levenshteinResult[0].metric.similarityValue).equal(0.5)
       })
    
       it('should return 0.72 with Jaro metric', function() {
            // Arrange
            const metricComparator = new MetricComparator()

            // Act
            const result = metricComparator.similarity('hardin', 'martinez')
            const levenshteinResult: Array<ComparatorSimilarity>  = result.filter(item => item.metric.name === 'Jaro')

            // Assert
            expect(levenshteinResult[0].metric.similarityValue).equal(0.7222222222222222)
        })

        it('should return 0.72 with JaroWinkler metric', function() {
                // Arrangejua
                const metricComparator = new MetricComparator()
    
                // Act
                const result = metricComparator.similarity('hardin', 'martinez')
                const levenshteinResult: Array<ComparatorSimilarity>  = result.filter(item => item.metric.name === 'JaroWinkler')
    
                // Assert
                expect(levenshteinResult[0].metric.similarityValue).equal(0.7222222222222222)
        })
    })
})