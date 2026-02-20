"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Variant } from "@/types/pharmacogenomics";

interface VariantTableProps {
  variants: Variant[];
}

function getImpactColor(impact: string): string {
  switch (impact) {
    case "high":
      return "bg-red-50 text-red-700 border border-red-200";
    case "moderate":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "low":
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
    default:
      return "bg-zinc-100 text-zinc-700 border border-zinc-200";
  }
}

export function VariantTable({ variants }: VariantTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50">
            <TableHead className="text-xs text-zinc-700">Gene</TableHead>
            <TableHead className="text-xs text-zinc-700">rsID</TableHead>
            <TableHead className="text-xs text-zinc-700">Position</TableHead>
            <TableHead className="text-xs text-zinc-700">Genotype</TableHead>
            <TableHead className="text-xs text-zinc-700">Consequence</TableHead>
            <TableHead className="text-xs text-zinc-700">Impact</TableHead>
            <TableHead className="text-xs text-zinc-700">Evidence</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {variants.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-sm text-zinc-500 py-8"
              >
                🧬 No pharmacogenomic variants detected
              </TableCell>
            </TableRow>
          ) : (
            variants.map((variant, index) => (
              <motion.tr
                key={`${variant.rsid}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-zinc-100 hover:bg-zinc-50 transition-colors"
              >
                <TableCell className="text-sm font-mono text-zinc-900">
                  {variant.gene}
                </TableCell>

                <TableCell className="text-sm font-mono text-zinc-700">
                  {variant.rsid}
                </TableCell>

                <TableCell className="text-xs font-mono text-zinc-600">
                  {variant.position}
                </TableCell>

                <TableCell className="text-sm font-mono text-zinc-700">
                  {variant.genotype}
                  <div className="text-xs text-zinc-500">
                    {variant.ref_allele}/{variant.alt_allele}
                  </div>
                </TableCell>

                <TableCell className="text-xs text-zinc-600">
                  {variant.consequence}
                </TableCell>

                <TableCell>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Badge
                      variant="outline"
                      className={getImpactColor(variant.impact)}
                    >
                      {variant.impact}
                    </Badge>
                  </motion.div>
                </TableCell>

                <TableCell className="text-sm text-zinc-700">
                  {variant.evidence_level}
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}