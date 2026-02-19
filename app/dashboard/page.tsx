"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { RiskCard } from "@/components/report/RiskCard";
import { GeneProfile } from "@/components/report/GeneProfile";
import { VariantTable } from "@/components/report/VariantTable";
import { RecommendationCard } from "@/components/report/RecommendationCard";
import { AIExplanation } from "@/components/report/AIExplanation";
import { QualityMetrics } from "@/components/report/QualityMetrics";

import { downloadReport, copyToClipboard } from "@/lib/api";
import { demoReports } from "@/lib/demoData";
import type { DrugRiskReport } from "@/types/pharmacogenomics";

export default function DashboardPage() {
  const [reports, setReports] = useState<DrugRiskReport[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("reports");

    if (stored) {
      try {
        const parsed: DrugRiskReport[] = JSON.parse(stored);
        setReports(parsed);
        setIsDemo(false);
      } catch {
        setReports(demoReports);
        setIsDemo(true);
      }
    } else {
      setReports(demoReports);
      setIsDemo(true);
    }
  }, []);

  async function handleDownload(report: DrugRiskReport) {
    await downloadReport(report);
  }

  async function handleCopy(reportId: string, report: DrugRiskReport) {
    const json = JSON.stringify(report, null, 2);
    await copyToClipboard(json);

    setCopiedId(reportId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (reports.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-zinc-200">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-sm text-zinc-600">
              No reports available
            </div>
            <div className="text-xs text-zinc-500">
              Upload a VCF file and specify medications to generate reports
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-zinc-900">
            Pharmacogenomic Reports
          </h1>

          {isDemo ? (
            <div className="px-3 py-1 border border-zinc-300 text-zinc-700 text-xs rounded bg-zinc-100">
              Demo Data
            </div>
          ) : null}
        </div>

        <p className="text-sm text-zinc-600">
          Patient ID: {reports[0].patient_id} • {reports.length}{" "}
          {reports.length === 1 ? "report" : "reports"}
        </p>
      </div>

      <div className="space-y-6">
        {reports.map((report, index) => {
          const reportId = `${report.patient_id}-${report.drug}-${index}`;

          return (
            <Card key={reportId} className="border-zinc-200">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500">
                      Analysis Timestamp
                    </div>
                    <div className="text-sm font-mono text-zinc-700">
                      {new Date(report.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                      onClick={() =>
                        handleCopy(reportId, report)
                      }
                    >
                      {copiedId === reportId
                        ? "Copied!"
                        : "Copy JSON"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                      onClick={() =>
                        handleDownload(report)
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>

                <Separator className="bg-zinc-200" />

                <div className="grid md:grid-cols-2 gap-6">
                  <RiskCard
                    drugName={report.drug}
                    riskLabel={
                      report.risk_assessment.risk_label
                    }
                    severity={
                      report.risk_assessment.severity
                    }
                    confidenceScore={
                      report.risk_assessment.confidence_score
                    }
                  />

                  <GeneProfile
                    profile={
                      report.pharmacogenomic_profile
                    }
                    patientId={report.patient_id}
                  />
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="border border-zinc-200 rounded-lg"
                >
                  <AccordionItem
                    value="variants"
                    className="border-0"
                  >
                    <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
                      <span className="text-sm text-zinc-900">
                        Detected Variants (
                        {
                          report
                            .pharmacogenomic_profile
                            .detected_variants.length
                        }
                        )
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-4">
                      <VariantTable
                        variants={
                          report
                            .pharmacogenomic_profile
                            .detected_variants
                        }
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <RecommendationCard
                  recommendation={
                    report.clinical_recommendation
                  }
                />

                <AIExplanation
                  explanation={
                    report.llm_generated_explanation
                  }
                />

                <QualityMetrics
                  metrics={report.quality_metrics}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
