import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RiskLabel, Severity } from "@/types/pharmacogenomics";

interface RiskCardProps {
  drugName: string;
  riskLabel: RiskLabel;
  severity: Severity;
  confidenceScore: number;
  reasoning?: string;
}

function getRiskBadgeColor(riskLabel: RiskLabel): string {
  switch (riskLabel) {
    case "Safe":
      return "bg-green-50 text-green-700 border border-green-200";
    case "Adjust Dosage":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "Toxic":
    case "Ineffective":
      return "bg-red-50 text-red-700 border border-red-200";
    default:
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
  }
}

function getSeverityBadgeColor(severity: Severity): string {
  switch (severity) {
    case "none":
    case "low":
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
    case "moderate":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "high":
    case "critical":
      return "bg-red-50 text-red-700 border border-red-200";
    default:
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
  }
}

function formatSeverity(severity: Severity): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

export function RiskCard({
  drugName,
  riskLabel,
  severity,
  confidenceScore,
  reasoning,
}: RiskCardProps) {
  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-zinc-900">
            {drugName}
          </CardTitle>

          <div className="flex gap-2">
            <Badge className={getRiskBadgeColor(riskLabel)}>
              {riskLabel}
            </Badge>

            <Badge className={getSeverityBadgeColor(severity)}>
              {formatSeverity(severity)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs text-zinc-500">
            Confidence Score
          </div>
          <div className="text-sm text-zinc-900">
            {(confidenceScore * 100).toFixed(1)}%
          </div>
        </div>

        {reasoning ? (
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">
              Clinical Reasoning
            </div>
            <div className="text-sm text-zinc-700 leading-relaxed">
              {reasoning}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
