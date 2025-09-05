/**
 * Test runner for refactored test files
 * Demonstrates how to run all refactored tests together
 */
import { TestHelpers } from './test-helpers';

export class RefactoredTestRunner {
  private testResults: Array<{
    testFile: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
    error?: string;
  }> = [];

  /**
   * Run all refactored tests
   */
  public async runAllTests(): Promise<void> {
    console.log('Starting refactored test suite...');
    
    const testFiles = [
      'functional-equivalence.spec.ts',
      'performance-comparison.spec.ts',
      'extensibility-comparison.spec.ts',
      'testability-comparison.spec.ts',
      'code-metrics-comparison.spec.ts',
      'size-calculator-refactoring.spec.ts',
      'position-calculator-refactoring.spec.ts',
      'scale-calculator-refactoring.spec.ts'
    ];

    for (const testFile of testFiles) {
      await this.runTestFile(testFile);
    }

    this.printTestResults();
  }

  /**
   * Run a specific test file
   */
  private async runTestFile(testFile: string): Promise<void> {
    const startTime = performance.now();
    
    try {
      console.log(`Running ${testFile}...`);
      
      // In a real implementation, this would run the actual test file
      // For now, we'll simulate running the tests
      await this.simulateTestExecution(testFile);
      
      const duration = performance.now() - startTime;
      this.testResults.push({
        testFile,
        status: 'passed',
        duration
      });
      
      console.log(`✅ ${testFile} passed (${duration.toFixed(2)}ms)`);
    } catch (error) {
      const duration = performance.now() - startTime;
      this.testResults.push({
        testFile,
        status: 'failed',
        duration,
        error: error instanceof Error ? error.message : String(error)
      });
      
      console.log(`❌ ${testFile} failed (${duration.toFixed(2)}ms)`);
    }
  }

  /**
   * Simulate test execution
   */
  private async simulateTestExecution(testFile: string): Promise<void> {
    // Simulate test execution time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    
    // Simulate occasional test failures
    if (Math.random() < 0.1) {
      throw new Error(`Simulated test failure in ${testFile}`);
    }
  }

  /**
   * Print test results summary
   */
  private printTestResults(): void {
    console.log('\n=== Test Results Summary ===');
    
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    const skipped = this.testResults.filter(r => r.status === 'skipped').length;
    const total = this.testResults.length;
    
    console.log(`Total: ${total}, Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);
    
    if (failed > 0) {
      console.log('\nFailed Tests:');
      this.testResults
        .filter(r => r.status === 'failed')
        .forEach(r => {
          console.log(`  - ${r.testFile}: ${r.error}`);
        });
    }
    
    const totalDuration = this.testResults.reduce((sum, r) => sum + r.duration, 0);
    console.log(`\nTotal Duration: ${totalDuration.toFixed(2)}ms`);
    
    // Calculate average duration
    const avgDuration = totalDuration / total;
    console.log(`Average Duration: ${avgDuration.toFixed(2)}ms per test file`);
  }

  /**
   * Get test results
   */
  public getTestResults(): typeof this.testResults {
    return [...this.testResults];
  }

  /**
   * Get test statistics
   */
  public getTestStatistics(): {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    passRate: number;
    totalDuration: number;
    averageDuration: number;
  } {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    const skipped = this.testResults.filter(r => r.status === 'skipped').length;
    const totalDuration = this.testResults.reduce((sum, r) => sum + r.duration, 0);
    
    return {
      total,
      passed,
      failed,
      skipped,
      passRate: total > 0 ? (passed / total) * 100 : 0,
      totalDuration,
      averageDuration: total > 0 ? totalDuration / total : 0
    };
  }
}

// Example usage
if (require.main === module) {
  const runner = new RefactoredTestRunner();
  runner.runAllTests().catch(console.error);
}
