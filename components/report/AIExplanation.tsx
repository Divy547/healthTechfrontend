"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LLMExplanation } from "@/types/pharmacogenomics";

interface AIExplanationProps {
  explanation: LLMExplanation;
}

export function AIExplanation({ explanation }: AIExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* HEADER */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-zinc-900">
              Clinical AI Analysis
            </CardTitle>

            {explanation.confidence_explanation?.confidence_score !== undefined && (
              <div className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-200">
                AI Confidence:{" "}
                {Math.round(
                  explanation.confidence_explanation.confidence_score * 100
                )}
                %
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* SUMMARY */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-xs text-zinc-500 mb-1">Summary</div>
            <div className="text-sm text-zinc-700 leading-relaxed">
              {explanation.summary}
            </div>
          </motion.div>

          {/* CLINICAL REASONING */}
          {explanation.clinical_reasoning && (
            <>
              <Separator className="bg-zinc-200" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-xs text-zinc-500 mb-1">
                  Clinical Reasoning
                </div>
                <div className="text-sm text-zinc-700 leading-relaxed">
                  {explanation.clinical_reasoning}
                </div>
              </motion.div>
            </>
          )}

          <Separator className="bg-zinc-200" />

          {/* GENETIC FACTORS */}
          <div>
            <div className="text-xs text-zinc-500 mb-2">Genetic Factors</div>
            <ul className="space-y-1">
              {explanation.genetic_factors.map((factor, index) => (
                <motion.li
                  key={`factor-${index}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-sm text-zinc-700 flex items-start"
                >
                  <span className="text-zinc-400 mr-2">•</span>
                  <span>{factor}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* MECHANISM */}
          {explanation.drug_interaction_mechanism && (
            <>
              <Separator className="bg-zinc-200" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-xs text-zinc-500 mb-1">
                  Drug Activation Mechanism
                </div>
                <div className="text-sm text-zinc-700 leading-relaxed">
                  {explanation.drug_interaction_mechanism}
                </div>
              </motion.div>
            </>
          )}

          <Separator className="bg-zinc-200" />

          {/* CLINICAL IMPLICATIONS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-xs text-zinc-500 mb-1">
              Clinical Implications
            </div>
            <div className="text-sm text-zinc-700 leading-relaxed">
              {explanation.clinical_implications}
            </div>
          </motion.div>

          {/* PATIENT FRIENDLY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-md p-3"
          >
            <div className="text-xs text-blue-600 mb-1 font-medium">
              Patient-Friendly Explanation
            </div>
            <div className="text-sm text-zinc-700 leading-relaxed">
              {explanation.patient_friendly_explanation}
            </div>
          </motion.div>

          {/* SAFETY NOTES */}
          {explanation.safety_notes?.length ? (
            <>
              <Separator className="bg-zinc-200" />
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <div className="text-xs text-amber-700 mb-1 font-medium">
                  Safety Considerations
                </div>
                <ul className="space-y-1">
                  {explanation.safety_notes.map((note, i) => (
                    <li key={i} className="text-xs text-amber-700 flex">
                      <span className="mr-2">⚠</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          {/* REFERENCES */}
          {explanation.references?.length ? (
            <>
              <Separator className="bg-zinc-200" />
              <div>
                <div className="text-xs text-zinc-500 mb-2">References</div>
                <ul className="space-y-1">
                  {explanation.references.map((reference, index) => (
                    <motion.li
                      key={`ref-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-xs text-zinc-600 flex items-start"
                    >
                      <span className="text-zinc-400 mr-2">
                        {index + 1}.
                      </span>
                      <span>{reference}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          {/* TRUST LABEL */}
          <div className="text-[10px] text-zinc-400 text-right">
            AI-generated explanation (CPIC-aligned)
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}