"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, FileText, ShieldCheck } from "lucide-react";

export default function Home() {
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-16">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            Clinical-Grade AI Engine
          </div>

          {/* FINAL TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            PharmaGuard Clinical Intelligence
          </h1>

          <p className="text-slate-500 max-w-2xl mx-auto">
            AI-powered pharmacogenomics platform that predicts drug-gene risks
            and delivers explainable clinical insights in seconds.
          </p>
        </motion.div>

        {/* ACTION CARDS */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Upload */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white rounded-2xl shadow-lg shadow-slate-200 border border-slate-200 hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Upload Analysis
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500">
                  Upload VCF files and receive pharmacogenomic risk insights
                  with evidence-based dosing recommendations.
                </p>

                <Link href="/upload">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                    Start Analysis
                  </Button>
                </Link>

                <p className="text-xs text-slate-400 text-center">
                  Secure genomic file processing
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dashboard */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white rounded-2xl shadow-lg shadow-slate-200 border border-slate-200 hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <FileText className="w-4 h-4 text-blue-600" />
                  View Dashboard
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500">
                  Explore detailed pharmacogenomic reports, variant analysis,
                  and clinical recommendations.
                </p>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full border-slate-300"
                  >
                    View Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* FEATURES SECTION */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-800">
              Clinical-Grade Intelligence
            </h2>
            <p className="text-slate-500 text-sm">
              Trusted by research institutions and healthcare providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-medium text-slate-800">99.8% Accuracy</div>
              <p className="text-sm text-slate-500">
                Validated against clinical pharmacogenomic databases with
                peer-reviewed precision standards.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="font-medium text-slate-800">Explainable AI</div>
              <p className="text-sm text-slate-500">
                Every prediction includes detailed clinical reasoning and
                gene-drug mechanism insights.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-green-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="font-medium text-slate-800">Clinical Grade</div>
              <p className="text-sm text-slate-500">
                HIPAA-ready infrastructure with audit trails and compliance
                reporting.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-400 space-y-2">
          <p>
            For research and clinical decision support. Not a substitute for
            professional medical judgment.
          </p>
          <p>© 2026 PharmaGuard</p>
        </div>

      </div>
    </div>
  );
}