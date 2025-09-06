import { UnitContext } from '../interfaces/IUnit';
// IUnitConfig interface not found, using any for now

export interface MonitoringConfig {
  enablePerformanceMonitoring: boolean;
  enableHealthChecks: boolean;
  enableAlerts: boolean;
  alertingEnabled: boolean;
  performanceThresholds: {
    responseTime: number;
    memoryUsage: number;
    errorRate: number;
  };
  healthCheckInterval: number;
  metricsCollectionInterval: number;
  alertThresholds: Record<string, number>;
}

export interface PerformanceMetric {
  timestamp: Date;
  metricName: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
}

export interface HealthCheck {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  component: string;
  metadata?: Record<string, any>;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface MonitoringConfiguration {
  enablePerformanceMonitoring: boolean;
  enableHealthChecks: boolean;
  enableAlerting: boolean;
  performanceThresholds: {
    responseTime: number;
    memoryUsage: number;
    errorRate: number;
  };
  healthCheckInterval: number;
  alertRetentionDays: number;
  maxAlertsPerComponent: number;
}

export interface MonitoringStatistics {
  totalMetrics: number;
  totalHealthChecks: number;
  totalAlerts: number;
  activeAlerts: number;
  acknowledgedAlerts: number;
  averageResponseTime: number;
  currentMemoryUsage: number;
  errorRate: number;
  uptime: number;
}

/**
 * Production Monitoring System
 * Handles performance monitoring, health checks, and alerting for production environments
 * Follows Single Responsibility Principle - only manages monitoring concerns
 * 
 * Note: This class focuses solely on monitoring logic. Logging concerns are handled
 * by decorators in the orchestration layer to maintain Single Responsibility Principle.
 */
export class ProductionMonitoringSystem {
  private metrics: PerformanceMetric[] = [];
  private healthChecks: HealthCheck[] = [];
  private alerts: Alert[] = [];
  private configuration: MonitoringConfiguration;
  private startTime: Date;
  private monitoringStatistics: MonitoringStatistics = {
    totalMetrics: 0,
    totalHealthChecks: 0,
    totalAlerts: 0,
    activeAlerts: 0,
    acknowledgedAlerts: 0,
    averageResponseTime: 0,
    currentMemoryUsage: 0,
    errorRate: 0,
    uptime: 0,
  };

  constructor(config?: Partial<MonitoringConfiguration>) {
    this.startTime = new Date();
    this.configuration = {
      enablePerformanceMonitoring: true,
      enableHealthChecks: true,
      enableAlerting: true,
      performanceThresholds: {
        responseTime: 1000, // 1 second
        memoryUsage: 100 * 1024 * 1024, // 100MB
        errorRate: 0.05, // 5%
      },
      healthCheckInterval: 30000, // 30 seconds
      alertRetentionDays: 30,
      maxAlertsPerComponent: 100,
      ...config,
    };
  }

  /**
   * Record a performance metric
   */
  public recordMetric(metricName: string, value: number, unit: string, tags: Record<string, string> = {}): void {
    if (!this.configuration.enablePerformanceMonitoring) {
      return;
    }

    const metric: PerformanceMetric = {
      timestamp: new Date(),
      metricName,
      value,
      unit,
      tags,
    };

    this.metrics.push(metric);
    this.monitoringStatistics.totalMetrics++;
    this.updateMonitoringStatistics();

    // Check for performance thresholds
    this.checkPerformanceThresholds(metric);
  }

  /**
   * Perform a health check
   */
  public performHealthCheck(component: string, checkFunction: () => Promise<boolean> | boolean, message?: string): void {
    if (!this.configuration.enableHealthChecks) {
      return;
    }

    const startTime = Date.now();
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let checkMessage = message || 'Health check completed';

    try {
      const result = checkFunction();
      if (result instanceof Promise) {
        result.then(success => {
          const duration = Date.now() - startTime;
          this.processHealthCheckResult(component, success, checkMessage, duration);
        });
      } else {
        const duration = Date.now() - startTime;
        this.processHealthCheckResult(component, result, checkMessage, duration);
      }
    } catch (error) {
      status = 'unhealthy';
      checkMessage = `Health check failed: ${error}`;
      this.recordHealthCheck(component, status, checkMessage);
    }
  }

  /**
   * Create an alert
   */
  public createAlert(
    severity: 'info' | 'warning' | 'error' | 'critical',
    title: string,
    message: string,
    component: string,
    metadata?: Record<string, any>
  ): string {
    if (!this.configuration.enableAlerting) {
      return '';
    }

    const alertId = this.generateAlertId();
    const alert: Alert = {
      id: alertId,
      severity,
      title,
      message,
      timestamp: new Date(),
      component,
      metadata: metadata || {},
      acknowledged: false,
    };

    this.alerts.push(alert);
    this.monitoringStatistics.totalAlerts++;
    this.monitoringStatistics.activeAlerts++;
    this.updateMonitoringStatistics();

    return alertId;
  }

  /**
   * Acknowledge an alert
   */
  public acknowledgeAlert(alertId: string, acknowledgedBy: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (!alert) {
      return false;
    }

    alert.acknowledged = true;
    alert.acknowledgedBy = acknowledgedBy;
    alert.acknowledgedAt = new Date();
    this.monitoringStatistics.acknowledgedAlerts++;
    this.monitoringStatistics.activeAlerts--;

    return true;
  }

  /**
   * Get all metrics
   */
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name
   */
  public getMetricsByName(metricName: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.metricName === metricName);
  }

  /**
   * Get metrics by time range
   */
  public getMetricsByTimeRange(startTime: Date, endTime: Date): PerformanceMetric[] {
    return this.metrics.filter(m => m.timestamp >= startTime && m.timestamp <= endTime);
  }

  /**
   * Get all health checks
   */
  public getHealthChecks(): HealthCheck[] {
    return [...this.healthChecks];
  }

  /**
   * Get health checks by component
   */
  public getHealthChecksByComponent(component: string): HealthCheck[] {
    return this.healthChecks.filter(h => h.component === component);
  }

  /**
   * Get latest health check for component
   */
  public getLatestHealthCheck(component: string): HealthCheck | undefined {
    const componentChecks = this.getHealthChecksByComponent(component);
    return componentChecks.length > 0 
      ? componentChecks[componentChecks.length - 1] 
      : undefined;
  }

  /**
   * Get all alerts
   */
  public getAlerts(): Alert[] {
    return [...this.alerts];
  }

  /**
   * Get active alerts
   */
  public getActiveAlerts(): Alert[] {
    return this.alerts.filter(a => !a.acknowledged);
  }

  /**
   * Get alerts by severity
   */
  public getAlertsBySeverity(severity: 'info' | 'warning' | 'error' | 'critical'): Alert[] {
    return this.alerts.filter(a => a.severity === severity);
  }

  /**
   * Get alerts by component
   */
  public getAlertsByComponent(component: string): Alert[] {
    return this.alerts.filter(a => a.component === component);
  }

  /**
   * Get monitoring statistics
   */
  public getMonitoringStatistics(): MonitoringStatistics {
    return { ...this.monitoringStatistics };
  }

  /**
   * Get monitoring configuration
   */
  public getConfiguration(): MonitoringConfiguration {
    return { ...this.configuration };
  }

  /**
   * Update monitoring configuration
   */
  public updateConfiguration(config: Partial<MonitoringConfiguration>): void {
    this.configuration = { ...this.configuration, ...config };
  }

  /**
   * Clear old data based on retention policies
   */
  public cleanupOldData(): void {
    const now = new Date();
    const retentionDate = new Date(now.getTime() - (this.configuration.alertRetentionDays * 24 * 60 * 60 * 1000));

    // Clean up old metrics (keep last 1000)
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Clean up old health checks (keep last 500)
    if (this.healthChecks.length > 500) {
      this.healthChecks = this.healthChecks.slice(-500);
    }

    // Clean up old alerts
    this.alerts = this.alerts.filter(alert => alert.timestamp >= retentionDate);

    this.updateMonitoringStatistics();
  }

  /**
   * Get system health summary
   */
  public getSystemHealthSummary(): {
    overallStatus: 'healthy' | 'degraded' | 'unhealthy';
    componentStatuses: Record<string, 'healthy' | 'degraded' | 'unhealthy'>;
    criticalAlerts: number;
    warningAlerts: number;
    uptime: number;
  } {
    const componentStatuses: Record<string, 'healthy' | 'degraded' | 'unhealthy'> = {};
    const components = [...new Set(this.healthChecks.map(h => h.component))];

    components.forEach(component => {
      const latestCheck = this.getLatestHealthCheck(component);
      componentStatuses[component] = latestCheck ? latestCheck.status : 'unhealthy';
    });

    const criticalAlerts = this.getAlertsBySeverity('critical').length;
    const warningAlerts = this.getAlertsBySeverity('warning').length;

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (criticalAlerts > 0) {
      overallStatus = 'unhealthy';
    } else if (warningAlerts > 0 || Object.values(componentStatuses).includes('degraded')) {
      overallStatus = 'degraded';
    }

    return {
      overallStatus,
      componentStatuses,
      criticalAlerts,
      warningAlerts,
      uptime: Date.now() - this.startTime.getTime(),
    };
  }

  /**
   * Process health check result
   */
  private processHealthCheckResult(component: string, success: boolean, message: string, duration: number): void {
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    
    if (!success) {
      status = 'unhealthy';
    } else if (duration > this.configuration.performanceThresholds.responseTime) {
      status = 'degraded';
      message += ` (slow: ${duration}ms)`;
    }

    this.recordHealthCheck(component, status, message);
  }

  /**
   * Record health check
   */
  private recordHealthCheck(component: string, status: 'healthy' | 'degraded' | 'unhealthy', message: string): void {
    const healthCheck: HealthCheck = {
      component,
      status,
      message,
      timestamp: new Date(),
    };

    this.healthChecks.push(healthCheck);
    this.monitoringStatistics.totalHealthChecks++;
    this.updateMonitoringStatistics();
  }

  /**
   * Check performance thresholds
   */
  private checkPerformanceThresholds(metric: PerformanceMetric): void {
    const thresholds = this.configuration.performanceThresholds;

    if (metric.metricName === 'responseTime' && metric.value > thresholds.responseTime) {
      this.createAlert(
        'warning',
        'High Response Time',
        `Response time ${metric.value}ms exceeds threshold ${thresholds.responseTime}ms`,
        metric.tags.component || 'unknown'
      );
    }

    if (metric.metricName === 'memoryUsage' && metric.value > thresholds.memoryUsage) {
      this.createAlert(
        'error',
        'High Memory Usage',
        `Memory usage ${metric.value} bytes exceeds threshold ${thresholds.memoryUsage} bytes`,
        metric.tags.component || 'unknown'
      );
    }

    if (metric.metricName === 'errorRate' && metric.value > thresholds.errorRate) {
      this.createAlert(
        'critical',
        'High Error Rate',
        `Error rate ${metric.value} exceeds threshold ${thresholds.errorRate}`,
        metric.tags.component || 'unknown'
      );
    }
  }

  /**
   * Generate unique alert ID
   */
  private generateAlertId(): string {
    return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Update monitoring statistics
   */
  private updateMonitoringStatistics(): void {
    this.monitoringStatistics.uptime = Date.now() - this.startTime.getTime();
    this.monitoringStatistics.currentMemoryUsage = this.getCurrentMemoryUsage();
    this.monitoringStatistics.errorRate = this.calculateErrorRate();
    this.monitoringStatistics.averageResponseTime = this.calculateAverageResponseTime();
  }

  /**
   * Get current memory usage
   */
  private getCurrentMemoryUsage(): number {
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Calculate error rate
   */
  private calculateErrorRate(): number {
    const errorMetrics = this.metrics.filter(m => m.metricName === 'errorRate');
    if (errorMetrics.length === 0) return 0;
    
    const totalErrors = errorMetrics.reduce((sum, m) => sum + m.value, 0);
    return totalErrors / errorMetrics.length;
  }

  /**
   * Calculate average response time
   */
  private calculateAverageResponseTime(): number {
    const responseTimeMetrics = this.metrics.filter(m => m.metricName === 'responseTime');
    if (responseTimeMetrics.length === 0) return 0;
    
    const totalTime = responseTimeMetrics.reduce((sum, m) => sum + m.value, 0);
    return totalTime / responseTimeMetrics.length;
  }

  /**
   * Get configuration
   */
  public getConfig(): any {
    return this.configuration;
  }

  /**
   * Collect metrics
   */
  public collectMetrics(unit: any, metricType: string, context: UnitContext, error?: Error): void {
    if (metricType === 'error' && error) {
      this.recordMetric('error', 1, 'count', { errorType: error.name });
    } else {
      this.recordMetric(metricType, 1, 'count', { unitId: unit.id });
    }
  }

  /**
   * Get health status
   */
  public getHealthStatus(): any {
    return {
      isHealthy: this.healthChecks.every(h => h.status === 'healthy'),
      timestamp: Date.now(),
      issues: this.healthChecks.filter(h => h.status !== 'healthy')
    };
  }
}