"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PharmacogenomicProfile } from "@/types/pharmacogenomics";

interface GeneProfileProps {
  profile: PharmacogenomicProfile;
  patientId: string;
}

function getPhenotypeBadgeColor(phenotype: string): string {
  switch (phenotype) {
    case "PM":
      return "bg-red-50 text-red-700 border border-red-200";
    case "IM":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "NM":
      return "bg-green-50 text-green-700 border border-green-200";
    case "RM":
    case "URM":
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
    default:
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
  }
}

function formatPhenotype(phenotype: string): string {
  const phenotypeMap: Record<string, string> = {
    PM: "Poor Metabolizer",
    IM: "Intermediate Metabolizer",
    NM: "Normal Metabolizer",
    RM: "Rapid Metabolizer",
    URM: "Ultra-Rapid Metabolizer",
    Unknown: "Unknown",
  };

  return phenotypeMap[phenotype] ?? phenotype;
}

export function GeneProfile({ profile, patientId }: GeneProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-zinc-900">
            Pharmacogenomic Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Gene + Diplotype */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">Primary Gene</div>
              <div className="text-sm font-mono text-zinc-900">
                {profile.primary_gene}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-zinc-500">Diplotype</div>
              <div className="text-sm font-mono text-zinc-900">
                {profile.diplotype}
              </div>
            </div>
          </div>

          {/* Phenotype */}
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">Phenotype</div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Badge className={getPhenotypeBadgeColor(profile.phenotype)}>
                  {profile.phenotype}
                </Badge>
              </motion.div>

              <span className="text-sm text-zinc-700">
                {formatPhenotype(profile.phenotype)}
              </span>
            </motion.div>
          </div>

          {/* Additional Genes */}
          {profile.additional_genes?.length ? (
            <div className="space-y-2 pt-2 border-t border-zinc-200">
              <div className="text-xs text-zinc-500">Additional Genes</div>

              <div className="space-y-2">
                {profile.additional_genes.map((gene, idx) => (
                  <motion.div
                    key={`${gene.gene}-${idx}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between text-xs p-2 rounded-md hover:bg-zinc-50 transition"
                  >
                    <span className="font-mono text-zinc-900">
                      {gene.gene}
                    </span>

                    <span className="text-zinc-600">
                      {gene.diplotype}
                    </span>

                    <Badge
                      variant="outline"
                      className={getPhenotypeBadgeColor(gene.phenotype)}
                    >
                      {gene.phenotype}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Patient ID */}
          <div className="space-y-1 pt-2 border-t border-zinc-200">
            <div className="text-xs text-zinc-500">Patient ID</div>
            <div className="text-sm font-mono text-zinc-700">
              {patientId}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}