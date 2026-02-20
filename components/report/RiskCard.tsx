"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-zinc-900">
              {drugName}
            </CardTitle>

            <div className="flex gap-2">
              {/* Risk Badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Badge className={getRiskBadgeColor(riskLabel)}>
                  {riskLabel}
                </Badge>
              </motion.div>

              <Badge className={getSeverityBadgeColor(severity)}>
                {formatSeverity(severity)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Confidence Meter */}
          <div className="space-y-2">
            <div className="text-xs text-zinc-500">
              Confidence Score
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidenceScore * 100}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>

              <div className="text-sm font-medium text-zinc-900">
                {(confidenceScore * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Clinical Reasoning */}
          {reasoning ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1"
            >
              <div className="text-xs text-zinc-500">
                Clinical Reasoning
              </div>

              <div className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 border border-zinc-200 rounded-md p-3">
                {reasoning}
              </div>
            </motion.div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}