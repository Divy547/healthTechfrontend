import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl text-zinc-900">
          PharmaGuard Clinical Decision Support
        </h1>

        <p className="text-zinc-600 max-w-2xl mx-auto">
          AI-powered pharmacogenomics analysis for precision medicine.
          Upload patient VCF files to receive evidence-based drug interaction
          and dosing recommendations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Card */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-base text-zinc-900">
              Upload Analysis
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-600">
              Upload patient VCF files and specify medications to receive
              comprehensive pharmacogenomic risk assessments.
            </p>

            <Link href="/upload">
              <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                Start Analysis
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Dashboard Card */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-base text-zinc-900">
              View Dashboard
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-600">
              Review detailed pharmacogenomic reports including variant
              analysis, risk assessments, and clinical recommendations.
            </p>

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="w-full border-zinc-300 text-zinc-900"
              >
                View Reports
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Features */}
      <Card className="border-zinc-200 bg-zinc-50">
        <CardHeader>
          <CardTitle className="text-base text-zinc-900">
            Clinical Features
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-900">
                Variant Analysis
              </div>
              <div className="text-xs text-zinc-600">
                Comprehensive analysis of CYP450 and transporter genes
                with evidence-based phenotype predictions.
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-zinc-900">
                Risk Assessment
              </div>
              <div className="text-xs text-zinc-600">
                AI-powered risk stratification with confidence scoring
                and detailed clinical reasoning.
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-zinc-900">
                CPIC Guidelines
              </div>
              <div className="text-xs text-zinc-600">
                Recommendations aligned with Clinical Pharmacogenetics
                Implementation Consortium standards.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-zinc-500 pt-8">
        <p>
          For research and clinical decision support.
          Not a substitute for professional medical judgment.
        </p>

        <p className="mt-2">
          Demo data available — click "View Dashboard" or
          "Start Analysis" to explore sample reports.
        </p>
      </div>
    </div>
  );
}