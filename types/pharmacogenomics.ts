export type RiskLabel = 'Safe' | 'Adjust Dosage' | 'Toxic' | 'Ineffective';
export type Severity = 'none' | 'low' | 'moderate' | 'high' | 'critical';
export type Phenotype = 'PM' | 'IM' | 'NM' | 'RM' | 'URM' | 'Unknown';

export interface Variant {
  rsid: string;
  gene: string;
  position: string;
  ref_allele: string;
  alt_allele: string;
  genotype: string;
  consequence: string;
  impact: 'high' | 'moderate' | 'low';
  evidence_level: '1A' | '1B' | '2A' | '2B' | '3' | '4';
  clinical_annotation?: string;
}

export interface RiskAssessment {
  risk_label: RiskLabel;
  confidence_score: number; // 0–1 normalized
  severity: Severity;
  reasoning?: string;
}

export interface PharmacogenomicProfile {
  primary_gene: string;
  diplotype: string;
  phenotype: Phenotype;
  detected_variants: Variant[];
  additional_genes?: {
    gene: string;
    diplotype: string;
    phenotype: Phenotype;
  }[];
}

export interface ClinicalRecommendation {
  action: string;

  dosage_adjustment?: {
    factor: number;
    direction: "increase" | "decrease";
    rationale: string;
  };

  alternative_drugs?: string[];
  monitoring_recommendations?: string[];
  contraindications?: string[];
}


export interface LLMExplanation {
  summary: string;
  genetic_factors: string[];
  clinical_implications: string;
  patient_friendly_explanation: string;
  references?: string[];

  // Advanced explainability
  clinical_reasoning?: string;
  drug_interaction_mechanism?: string;
  safety_notes?: string[];

  // AI transparency
  confidence_explanation?: {
    confidence_score: number; // 0–1
    reason?: string;
  };
}


export interface QualityMetrics {
  // Core parsing
  vcf_parsing_success: boolean;
  gene_match_confidence?: number;

  // Variant analytics
  variant_call_quality?: number; // percentage (0–100)
  coverage_depth?: number; // e.g., 30x

  // Statistical confidence
  confidence_interval?: {
    lower: number; // 0–1
    upper: number; // 0–1
  };

  // AI / pipeline metadata
  model_version?: string; // e.g. pharma-llm-v1.2
  analysis_timestamp?: string; // ISO timestamp
}


export interface DrugRiskReport {
  patient_id: string;
  drug: string;
  timestamp: string;
  risk_assessment: RiskAssessment;
  pharmacogenomic_profile: PharmacogenomicProfile;
  clinical_recommendation: ClinicalRecommendation;
  llm_generated_explanation: LLMExplanation;
  quality_metrics: QualityMetrics;
}
