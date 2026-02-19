"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/upload/FileUpload";
import { DrugInput } from "@/components/upload/DrugInput";
import { uploadVCFAndAnalyze } from "@/lib/api";
import { demoReports } from "@/lib/demoData";
import type { DrugRiskReport } from "@/types/pharmacogenomics";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [drugInput, setDrugInput] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [drugError, setDrugError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileSelect(selectedFile: File | null) {
    setFileError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.name.endsWith(".vcf")) {
      setFileError("Only VCF files are allowed");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
  }

  function handleLoadDemo() {
    sessionStorage.setItem(
      "reports",
      JSON.stringify(demoReports)
    );

    router.push("/dashboard");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFileError(null);
    setDrugError(null);

    if (!file) {
      setFileError("Please select a VCF file");
      return;
    }

    if (!drugInput.trim()) {
      setDrugError("Please enter at least one drug name");
      return;
    }

    const drugs = drugInput
      .split(",")
      .map((drug) => drug.trim())
      .filter((drug) => drug.length > 0);

    if (drugs.length === 0) {
      setDrugError("Please enter at least one valid drug name");
      return;
    }

    setIsSubmitting(true);

    try {
      const reports: DrugRiskReport[] =
        await uploadVCFAndAnalyze(file, drugs);

      sessionStorage.setItem(
        "reports",
        JSON.stringify(reports)
      );

      router.push("/dashboard");
    } catch {
      setFileError(
        "An error occurred during analysis. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl text-zinc-900">
            Upload Patient Data
          </h1>
          <p className="text-sm text-zinc-600">
            Upload a VCF file and specify medications to receive pharmacogenomic analysis
          </p>
        </div>

        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-base text-zinc-900">
              Patient Genomic Data
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={file}
                error={fileError}
              />

              <DrugInput
                value={drugInput}
                onChange={setDrugInput}
                error={drugError}
              />

              <Button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Analyzing..." : "Analyze"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* File Requirements */}
        <Card className="border-zinc-200 bg-zinc-50">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="text-xs text-zinc-900">
                File Requirements
              </div>
              <ul className="text-xs text-zinc-600 space-y-1">
                <li>VCF format only (.vcf extension)</li>
                <li>Maximum file size: 5MB</li>
                <li>
                  Must include pharmacogenomic variants
                  (CYP450, SLCO, TPMT, DPYD)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Demo Section */}
        <Card className="border-zinc-200 bg-zinc-50">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <div className="text-xs text-zinc-900">
                Demo Data Available
              </div>
              <div className="text-xs text-zinc-600">
                View demo pharmacogenomic reports
                showcasing different risk levels.
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              onClick={handleLoadDemo}
            >
              Load Demo Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
