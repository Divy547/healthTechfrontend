import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClinicalRecommendation } from "@/types/pharmacogenomics";

interface RecommendationCardProps {
  recommendation: ClinicalRecommendation;
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-zinc-900">
          Clinical Recommendation
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Recommended Action */}
        <div className="space-y-1">
          <div className="text-xs text-zinc-500">
            Recommended Action
          </div>
          <div className="text-sm text-zinc-900">
            {recommendation.action}
          </div>
        </div>

        {/* Dosage Adjustment */}
        {recommendation.dosage_adjustment ? (
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">
              Dosage Adjustment
            </div>

            <div className="text-sm text-zinc-900">
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
          </div>
        ) : null}

        {/* Alternative Drugs */}
        {recommendation.alternative_drugs?.length ? (
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">
              Alternative Medications
            </div>

            <div className="flex flex-wrap gap-2">
              {recommendation.alternative_drugs.map(
                (drug, index) => (
                  <span
                    key={`${drug}-${index}`}
                    className="inline-block px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-xs text-zinc-700"
                  >
                    {drug}
                  </span>
                )
              )}
            </div>
          </div>
        ) : null}

        {/* Monitoring Recommendations */}
        {recommendation.monitoring_recommendations?.length ? (
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">
              Monitoring Recommendations
            </div>

            <ul className="space-y-1">
              {recommendation.monitoring_recommendations.map(
                (item, index) => (
                  <li
                    key={`monitoring-${index}`}
                    className="text-sm text-zinc-700 flex items-start"
                  >
                    <span className="text-zinc-400 mr-2">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
