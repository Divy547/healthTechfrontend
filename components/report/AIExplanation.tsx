import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LLMExplanation } from "@/types/pharmacogenomics";

interface AIExplanationProps {
  explanation: LLMExplanation;
}

export function AIExplanation({ explanation }: AIExplanationProps) {
  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-zinc-900">
          Clinical Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs text-zinc-500">Summary</div>
          <div className="text-sm text-zinc-700 leading-relaxed">
            {explanation.summary}
          </div>
        </div>

        <Separator className="bg-zinc-200" />

        <div className="space-y-2">
          <div className="text-xs text-zinc-500">Genetic Factors</div>
          <ul className="space-y-1">
            {explanation.genetic_factors.map((factor, index) => (
              <li
                key={`factor-${index}`}
                className="text-sm text-zinc-700 flex items-start"
              >
                <span className="text-zinc-400 mr-2">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-zinc-200" />

        <div className="space-y-2">
          <div className="text-xs text-zinc-500">Clinical Implications</div>
          <div className="text-sm text-zinc-700 leading-relaxed">
            {explanation.clinical_implications}
          </div>
        </div>

        <Separator className="bg-zinc-200" />

        <div className="space-y-2">
          <div className="text-xs text-zinc-500">
            Patient-Friendly Explanation
          </div>
          <div className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded border border-zinc-200">
            {explanation.patient_friendly_explanation}
          </div>
        </div>

        {explanation.references?.length ? (
          <>
            <Separator className="bg-zinc-200" />
            <div className="space-y-2">
              <div className="text-xs text-zinc-500">References</div>
              <ul className="space-y-1">
                {explanation.references.map((reference, index) => (
                  <li
                    key={`ref-${index}`}
                    className="text-xs text-zinc-600 flex items-start"
                  >
                    <span className="text-zinc-400 mr-2">
                      {index + 1}.
                    </span>
                    <span>{reference}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
