import type { DrugRiskReport } from "@/types/pharmacogenomics";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  console.log("Using API base URL:", process.env.NEXT_PUBLIC_API_URL);

export async function uploadVCFAndAnalyze(
  file: File,
  drugs: string[]
): Promise<DrugRiskReport[]> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("drugs", drugs.join(","));

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze VCF");
  }

  const data: unknown = await response.json();

  return data as DrugRiskReport[];
}


export async function downloadReport(
  report: DrugRiskReport
) {
  const blob = new Blob(
    [JSON.stringify(report, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `${report.patient_id}-${report.drug}.json`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}


export async function copyToClipboard(
  text: string
) {
  await navigator.clipboard.writeText(text);
}
