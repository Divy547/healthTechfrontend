"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClinicalRecommendation } from "@/types/pharmacogenomics";

interface RecommendationCardProps {
  recommendation: ClinicalRecommendation;
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-zinc-900">
            Clinical Recommendation
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* PRIMARY ACTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-1"
          >
            <div className="text-xs text-zinc-500">
              Recommended Action
            </div>

            <div className="text-sm font-semibold text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2">
              {recommendation.action}
            </div>
          </motion.div>

          {/* DOSAGE */}
          {recommendation.dosage_adjustment ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-1"
            >
              <div className="text-xs text-zinc-500">
                Dosage Adjustment
              </div>

              <div className="text-sm font-medium text-zinc-900">
                {recommendation.dosage_adjustment.direction === "decrease"
                  ? "Reduce"
                  : "Increase"}{" "}
                by{" "}
                {Math.abs(
                  (1 - recommendation.dosage_adjustment.factor) * 100
                ).toFixed(0)}
                %
              </div>

              <div className="text-xs text-zinc-600 mt-1">
                {recommendation.dosage_adjustment.rationale}
              </div>
            </motion.div>
          ) : null}

          {/* ALTERNATIVE DRUGS */}
          {recommendation.alternative_drugs?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="text-xs text-zinc-500">
                Alternative Medications
              </div>

              <div className="flex flex-wrap gap-2">
                {recommendation.alternative_drugs.map(
                  (drug, index) => (
                    <motion.span
                      key={`${drug}-${index}`}
                      whileHover={{ scale: 1.08 }}
                      className="inline-block px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-700"
                    >
                      {drug}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>
          ) : null}

          {/* MONITORING */}
          {recommendation.monitoring_recommendations?.length ? (
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">
                Monitoring Recommendations
              </div>

              <ul className="space-y-1">
                {recommendation.monitoring_recommendations.map(
                  (item, index) => (
                    <motion.li
                      key={`monitoring-${index}`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-sm text-zinc-700 flex items-start"
                    >
                      <span className="text-zinc-400 mr-2">•</span>
                      <span>{item}</span>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}