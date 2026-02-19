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
  confidence_score: number;
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
  details: string;
}


export interface LLMExplanation {
  summary: string;
  genetic_factors: string[];
  clinical_implications: string;
  patient_friendly_explanation: string;
  references?: string[];
}


export interface QualityMetrics {
  vcf_parsing_success: boolean;
  gene_match_confidence: number;
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
