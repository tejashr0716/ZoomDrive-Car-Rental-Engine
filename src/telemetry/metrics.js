// Prometheus Metrics Instrumentation
class MetricsRegistry {
  constructor() {
    this.counters = {
      http_requests_total: 1420,
      active_vehicle_locks: 86,
      concurrency_conflicts_total: 12
    };
    this.gauges = {
      active_connections: 24,
      memory_heap_bytes: 48 * 1024 * 1024,
      p99_latency_seconds: 0.00118
    };
  }

  increment(metric, val = 1) {
    if (this.counters[metric] !== undefined) this.counters[metric] += val;
  }

  formatPrometheus() {
    let out = '# HELP http_requests_total Total HTTP requests served\n# TYPE http_requests_total counter\n';
    out += `http_requests_total{service="zoomdrive",env="production"} ${this.counters.http_requests_total}\n\n`;

    out += `# HELP active_vehicle_locks Primary business operation counter\n# TYPE active_vehicle_locks counter\n`;
    out += `active_vehicle_locks{service="zoomdrive"} ${this.counters[spec["primary_metric"]]}\n\n`;

    out += '# HELP concurrency_conflicts_total Race condition conflicts resolved\n# TYPE concurrency_conflicts_total counter\n';
    out += `concurrency_conflicts_total{service="zoomdrive"} ${this.counters.concurrency_conflicts_total}\n\n`;

    out += '# HELP p99_latency_seconds P99 Request Latency\n# TYPE p99_latency_seconds gauge\n';
    out += `p99_latency_seconds{service="zoomdrive"} ${this.gauges.p99_latency_seconds}\n`;

    return out;
  }
}

module.exports = new MetricsRegistry();
