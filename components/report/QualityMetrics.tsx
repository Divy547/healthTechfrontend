import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { QualityMetrics as QualityMetricsType } from "@/types/pharmacogenomics";

interface QualityMetricsProps {
  metrics: QualityMetricsType;
}

export function QualityMetrics({ metrics }: QualityMetricsProps) {
  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-zinc-900">
          Quality Metrics
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* VCF Parsing */}
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">
              VCF Parsing
            </div>

            <Badge
              className={
                metrics.vcf_parsing_success
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }
            >
              {metrics.vcf_parsing_success ? "Success" : "Failed"}
            </Badge>
          </div>

          {/* Variant Call Quality */}
          {typeof metrics.variant_call_quality === "number" ? (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">
                Variant Call Quality
              </div>
              <div className="text-sm text-zinc-900">
                {metrics.variant_call_quality.toFixed(1)}%
              </div>
            </div>
          ) : null}

          {/* Coverage Depth */}
          {typeof metrics.coverage_depth === "number" ? (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">
                Coverage Depth
              </div>
              <div className="text-sm text-zinc-900">
                {metrics.coverage_depth}x
              </div>
            </div>
          ) : null}

          {/* Confidence Interval */}
          {metrics.confidence_interval ? (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">
                Confidence Interval
              </div>
              <div className="text-sm text-zinc-900">
                {(metrics.confidence_interval.lower * 100).toFixed(0)}% -{" "}
                {(metrics.confidence_interval.upper * 100).toFixed(0)}%
              </div>
            </div>
          ) : null}

          {/* Model Version */}
          {metrics.model_version ? (
            <div className="space-y-1 col-span-2">
              <div className="text-xs text-zinc-500">
                Model Version
              </div>
              <div className="text-sm font-mono text-zinc-700">
                {metrics.model_version}
              </div>
            </div>
          ) : null}

          {/* Timestamp */}
          {metrics.analysis_timestamp ? (
            <div className="space-y-1 col-span-2">
              <div className="text-xs text-zinc-500">
                Analysis Timestamp
              </div>
              <div className="text-xs font-mono text-zinc-600">
                {new Date(metrics.analysis_timestamp).toLocaleString()}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}