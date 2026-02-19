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
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-zinc-900">
          Pharmacogenomic Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
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

        <div className="space-y-1">
          <div className="text-xs text-zinc-500">Phenotype</div>
          <div className="flex items-center gap-2">
            <Badge className={getPhenotypeBadgeColor(profile.phenotype)}>
              {profile.phenotype}
            </Badge>
            <span className="text-sm text-zinc-700">
              {formatPhenotype(profile.phenotype)}
            </span>
          </div>
        </div>

        {profile.additional_genes?.length ? (
          <div className="space-y-2 pt-2 border-t border-zinc-200">
            <div className="text-xs text-zinc-500">Additional Genes</div>

            <div className="space-y-2">
              {profile.additional_genes.map((gene, idx) => (
                <div
                  key={`${gene.gene}-${idx}`}
                  className="flex items-center justify-between text-xs"
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
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-1 pt-2 border-t border-zinc-200">
          <div className="text-xs text-zinc-500">Patient ID</div>
          <div className="text-sm font-mono text-zinc-700">
            {patientId}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
