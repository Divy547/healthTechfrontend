import type { DrugRiskReport } from '../types/pharmacogenomics';

export const demoReports: DrugRiskReport[] = [
  {
    patient_id: 'PT-2026-DEMO-12847',
    drug: 'Warfarin',
    timestamp: '2026-02-19T14:32:00.000Z',
    risk_assessment: {
      risk_label: 'Adjust Dosage',
      confidence_score: 0.94,
      severity: 'high',
      reasoning:
        'Patient carries CYP2C9*2/*3 compound heterozygous genotype and VKORC1 -1639G>A variant, both significantly affecting warfarin metabolism and sensitivity. This combination results in dramatically reduced warfarin clearance and increased bleeding risk at standard doses.',
    },
    pharmacogenomic_profile: {
      primary_gene: 'CYP2C9',
      diplotype: '*2/*3',
      phenotype: 'PM',
      detected_variants: [
        {
          rsid: 'rs1799853',
          gene: 'CYP2C9',
          position: 'chr10:94942290',
          ref_allele: 'C',
          alt_allele: 'T',
          genotype: 'C/T',
          consequence: 'missense_variant',
          impact: 'high',
          evidence_level: '1A',
          clinical_annotation: 'CYP2C9*2 allele - reduced enzyme activity (~40%)',
        },
        {
          rsid: 'rs1057910',
          gene: 'CYP2C9',
          position: 'chr10:94981296',
          ref_allele: 'A',
          alt_allele: 'C',
          genotype: 'A/C',
          consequence: 'missense_variant',
          impact: 'high',
          evidence_level: '1A',
          clinical_annotation: 'CYP2C9*3 allele - reduced enzyme activity (~20%)',
        },
        {
          rsid: 'rs9923231',
          gene: 'VKORC1',
          position: 'chr16:31107689',
          ref_allele: 'A',
          alt_allele: 'G',
          genotype: 'A/G',
          consequence: 'regulatory_variant',
          impact: 'moderate',
          evidence_level: '1A',
          clinical_annotation: '-1639G>A variant - increased warfarin sensitivity',
        },
        {
          rsid: 'rs2108622',
          gene: 'CYP4F2',
          position: 'chr19:15990431',
          ref_allele: 'C',
          alt_allele: 'T',
          genotype: 'C/T',
          consequence: 'missense_variant',
          impact: 'moderate',
          evidence_level: '2A',
          clinical_annotation: 'V433M variant - may affect vitamin K metabolism',
        },
      ],
      additional_genes: [
        {
          gene: 'VKORC1',
          diplotype: '-1639G>A (het)',
          phenotype: 'IM',
        },
      ],
    },
    clinical_recommendation: {
      action: 'Reduce initial dose by 75% and implement intensive monitoring',
      alternative_drugs: ['Apixaban', 'Rivaroxaban', 'Dabigatran', 'Edoxaban'],
      dosage_adjustment: {
        factor: 0.25,
        direction: 'decrease',
        rationale:
          'Poor metabolizer phenotype combined with increased warfarin sensitivity requires substantial dose reduction. CPIC guidelines recommend 0.5-2mg initial dose vs standard 5-10mg.',
      },
      monitoring_recommendations: [
        'INR monitoring every 2-3 days initially, then weekly for first month',
        'Target INR 2.0-3.0 with strict monitoring',
        'Educate patient on bleeding precautions and drug/food interactions',
        'Consider direct oral anticoagulants (DOACs) as safer alternative',
        'Pharmacist consultation for dose titration strategy',
      ],
      contraindications: [
        'Avoid concomitant use with CYP2C9 inhibitors (fluconazole, amiodarone)',
        'Extreme caution with NSAIDs due to increased bleeding risk',
      ],
    },
    llm_generated_explanation: {
      summary:
        'This patient has high-risk genetic variants that dramatically reduce warfarin metabolism and increase drug sensitivity.',
      genetic_factors: [
        'CYP2C9*2 allele reduces enzyme activity to ~40% of normal',
        'CYP2C9*3 allele reduces enzyme activity to ~20% of normal',
        'Compound heterozygous (*2/*3) results in ~12% residual activity',
        'VKORC1 -1639G>A variant increases warfarin sensitivity 3-5 fold',
        'CYP4F2 variant may slightly increase vitamin K metabolism',
      ],
      clinical_implications:
        'Warfarin requires CRITICAL DOSAGE ADJUSTMENT for this patient. The combination of CYP2C9 poor metabolizer status and VKORC1 sensitivity variant creates extremely high bleeding risk with standard dosing. Initial dose should be 75% lower than standard (0.5-2mg vs 5-10mg). This is a CPIC Level 1A recommendation requiring immediate action.',
      patient_friendly_explanation:
        'Your genetic test shows that your body breaks down Warfarin very slowly and you are more sensitive to its effects than most people. This means you need a much lower dose than typical - about one-quarter of the standard amount. If you take too much, you could be at serious risk for bleeding problems. Your doctor will start you on a very low dose and monitor your blood closely with frequent tests.',
      references: [
        'CPIC Guideline for Pharmacogenetics-Guided Warfarin Dosing (2017)',
        'PharmGKB Clinical Annotation for warfarin and CYP2C9',
      ],
    },
    quality_metrics: {
      vcf_parsing_success: true,
      variant_call_quality: 99.2,
      coverage_depth: 52,
      confidence_interval: {
        lower: 0.91,
        upper: 0.97,
      },
      model_version: 'PharmaGuard-v2.1.0',
      analysis_timestamp: '2026-02-19T14:32:15.000Z',
    },
  },
  {
    patient_id: 'PT-2026-DEMO-12847',
    drug: 'Codeine',
    timestamp: '2026-02-19T14:33:00.000Z',
    risk_assessment: {
      risk_label: 'Ineffective',
      confidence_score: 0.97,
      severity: 'critical',
      reasoning:
        'Patient is a CYP2D6 poor metabolizer (*4/*4 genotype) with near-zero enzyme activity. Codeine is a prodrug requiring CYP2D6 conversion to morphine for analgesic effect. This patient will receive minimal to no pain relief from codeine.',
    },
    pharmacogenomic_profile: {
      primary_gene: 'CYP2D6',
      diplotype: '*4/*4',
      phenotype: 'PM',
      detected_variants: [
        {
          rsid: 'rs35742686',
          gene: 'CYP2D6',
          position: 'chr22:42127803',
          ref_allele: 'G',
          alt_allele: 'A',
          genotype: 'A/A',
          consequence: 'splice_site_variant',
          impact: 'high',
          evidence_level: '1A',
          clinical_annotation: 'CYP2D6*4 homozygous - no enzyme activity',
        },
        {
          rsid: 'rs5030655',
          gene: 'CYP2D6',
          position: 'chr22:42130692',
          ref_allele: 'G',
          alt_allele: 'G',
          genotype: 'G/G',
          consequence: 'structural_variant',
          impact: 'high',
          evidence_level: '1A',
          clinical_annotation: 'Confirms CYP2D6 loss of function',
        },
      ],
    },
    clinical_recommendation: {
      action: 'AVOID codeine - use alternative analgesics',
      alternative_drugs: [
        'Morphine',
        'Hydromorphone',
        'Oxycodone',
        'Tramadol (with caution)',
        'Acetaminophen',
        'Ibuprofen',
      ],
      monitoring_recommendations: [
        'Do not prescribe codeine or codeine-containing combinations',
        'Use direct-acting opioids if strong analgesia needed',
        'Document CYP2D6 poor metabolizer status in medical record',
        'Consider multimodal analgesia with non-opioid agents',
        'Update medication allergy list to flag codeine as ineffective',
      ],
      contraindications: [
        'Absolute contraindication to codeine therapy',
        'Also avoid tramadol (partially dependent on CYP2D6)',
      ],
    },
    llm_generated_explanation: {
      summary:
        'This patient cannot convert codeine to its active form due to complete CYP2D6 enzyme deficiency.',
      genetic_factors: [
        'CYP2D6*4 alleles result in non-functional enzyme',
        'Homozygous *4/*4 genotype = 0% enzyme activity',
        'Affects ~7-10% of Caucasian population',
        'Codeine requires CYP2D6 to convert to active morphine metabolite',
      ],
      clinical_implications:
        'Codeine is INEFFECTIVE for this patient. As a prodrug, codeine must be metabolized by CYP2D6 to morphine to provide pain relief. This patient has zero CYP2D6 activity and will experience no analgesic benefit from codeine. Prescribing codeine would result in inadequate pain control and potential patient harm from untreated pain.',
      patient_friendly_explanation:
        'Your genetic test shows that your body cannot activate Codeine. Codeine is an inactive drug that only works after your body converts it to morphine - but you lack the enzyme needed for this conversion. Taking Codeine would not relieve your pain at all. Your doctor should prescribe a different pain medication that works directly without needing to be converted first, such as morphine, oxycodone, or hydromorphone.',
      references: [
        'CPIC Guideline for Codeine and CYP2D6 (2014)',
        'FDA Safety Communication on Codeine in Poor Metabolizers',
      ],
    },
    quality_metrics: {
      vcf_parsing_success: true,
      variant_call_quality: 98.8,
      coverage_depth: 48,
      confidence_interval: {
        lower: 0.94,
        upper: 0.99,
      },
      model_version: 'PharmaGuard-v2.1.0',
      analysis_timestamp: '2026-02-19T14:33:12.000Z',
    },
  },
  {
    patient_id: 'PT-2026-DEMO-12847',
    drug: 'Simvastatin',
    timestamp: '2026-02-19T14:34:00.000Z',
    risk_assessment: {
      risk_label: 'Toxic',
      confidence_score: 0.91,
      severity: 'critical',
      reasoning:
        'Patient carries homozygous SLCO1B1*5/*5 genotype (rs4149056 C/C), dramatically impairing hepatic uptake of simvastatin. This results in 3-4 fold higher plasma concentrations and significantly increased risk of myopathy and rhabdomyolysis, particularly at doses >20mg.',
    },
    pharmacogenomic_profile: {
      primary_gene: 'SLCO1B1',
      diplotype: '*5/*5',
      phenotype: 'PM',
      detected_variants: [
        {
          rsid: 'rs4149056',
          gene: 'SLCO1B1',
          position: 'chr12:21331549',
          ref_allele: 'T',
          alt_allele: 'C',
          genotype: 'C/C',
          consequence: 'missense_variant',
          impact: 'high',
          evidence_level: '1A',
          clinical_annotation: 'SLCO1B1*5 homozygous - 17x increased myopathy risk',
        },
        {
          rsid: 'rs2231142',
          gene: 'ABCG2',
          position: 'chr4:89052323',
          ref_allele: 'G',
          alt_allele: 'T',
          genotype: 'G/T',
          consequence: 'missense_variant',
          impact: 'moderate',
          evidence_level: '2A',
          clinical_annotation: 'Q141K variant - impaired statin efflux',
        },
      ],
      additional_genes: [
        {
          gene: 'ABCG2',
          diplotype: 'Q141K (het)',
          phenotype: 'IM',
        },
      ],
    },
    clinical_recommendation: {
      action: 'AVOID simvastatin or use lowest dose (10mg max) with intensive monitoring',
      alternative_drugs: [
        'Pravastatin',
        'Rosuvastatin (low dose)',
        'Fluvastatin',
        'Pitavastatin',
        'Atorvastatin (preferred)',
      ],
      dosage_adjustment: {
        factor: 0.2,
        direction: 'decrease',
        rationale:
          'If simvastatin must be used, limit to 10mg maximum daily dose due to 17-fold increased myopathy risk at higher doses in homozygous SLCO1B1*5 carriers.',
      },
      monitoring_recommendations: [
        'If simvastatin used: maximum 10mg daily dose, never exceed 20mg',
        'Monitor CK levels at baseline and if muscle symptoms develop',
        'Educate patient on myopathy symptoms (muscle pain, weakness, dark urine)',
        'Consider alternative statin not affected by SLCO1B1 (pravastatin, rosuvastatin)',
        'Review drug interactions - avoid CYP3A4 inhibitors completely',
        'Obtain baseline renal function and monitor periodically',
      ],
      contraindications: [
        'Do not use simvastatin >40mg (FDA restriction for all patients)',
        'Avoid concomitant CYP3A4 inhibitors (grapefruit, clarithromycin, itraconazole)',
        'Contraindicated with gemfibrozil in this patient',
      ],
    },
    llm_generated_explanation: {
      summary:
        'This patient has genetic variants that dramatically increase simvastatin blood levels and risk of severe muscle toxicity.',
      genetic_factors: [
        'SLCO1B1*5/*5 homozygous genotype reduces transporter function by ~80%',
        'Impairs hepatic uptake of simvastatin and active metabolite',
        'Results in 3-4x higher plasma concentrations at standard doses',
        'ABCG2 variant further impairs drug elimination',
        'Combined effect creates high-risk scenario for myopathy',
      ],
      clinical_implications:
        'Simvastatin poses HIGH TOXICITY RISK for this patient. The SLCO1B1*5/*5 genotype is the strongest genetic predictor of statin-induced myopathy. At doses above 40mg, this patient has a 17-fold increased risk of myopathy compared to normal genotype. Even at lower doses, risk remains elevated. FDA black box warning specifically addresses this genetic risk. Strong recommendation to use alternative statin or maximum 10mg dose with careful monitoring.',
      patient_friendly_explanation:
        'Your genetic test shows you have a high risk of developing serious muscle problems if you take Simvastatin, especially at higher doses. You have two copies of a gene variant that causes Simvastatin to build up in your blood to much higher levels than normal. This can lead to muscle pain, weakness, and in rare cases, severe muscle breakdown (rhabdomyolysis) that can damage your kidneys. Your doctor should either prescribe a different cholesterol medication (like Pravastatin or Atorvastatin) or, if Simvastatin is necessary, use only the lowest possible dose and monitor you carefully.',
      references: [
        'CPIC Guideline for Simvastatin and SLCO1B1 (2012, updated 2014)',
        'FDA Drug Safety Communication: SLCO1B1 and Simvastatin',
      ],
    },
    quality_metrics: {
      vcf_parsing_success: true,
      variant_call_quality: 99.5,
      coverage_depth: 58,
      confidence_interval: {
        lower: 0.88,
        upper: 0.94,
      },
      model_version: 'PharmaGuard-v2.1.0',
      analysis_timestamp: '2026-02-19T14:34:18.000Z',
    },
  },
  {
    patient_id: 'PT-2026-DEMO-12847',
    drug: 'Metoprolol',
    timestamp: '2026-02-19T14:35:00.000Z',
    risk_assessment: {
      risk_label: 'Safe',
      confidence_score: 0.96,
      severity: 'none',
      reasoning:
        'Patient has normal CYP2D6 activity (*1/*1 wild-type genotype). Metoprolol will be metabolized at expected rates with standard pharmacokinetics. No dose adjustment necessary.',
    },
    pharmacogenomic_profile: {
      primary_gene: 'CYP2D6',
      diplotype: '*1/*1',
      phenotype: 'NM',
      detected_variants: [
        {
          rsid: 'rs1065852',
          gene: 'CYP2D6',
          position: 'chr22:42126611',
          ref_allele: 'G',
          alt_allele: 'G',
          genotype: 'G/G',
          consequence: 'wild_type',
          impact: 'low',
          evidence_level: '1A',
          clinical_annotation: 'Wild-type CYP2D6 - normal enzyme activity',
        },
      ],
    },
    clinical_recommendation: {
      action: 'Proceed with standard dosing per clinical indication',
      alternative_drugs: [],
      monitoring_recommendations: [
        'Standard blood pressure and heart rate monitoring per protocol',
        'Assess therapeutic response at 2-4 weeks',
        'Monitor for typical beta-blocker side effects (fatigue, bradycardia)',
        'No additional pharmacogenomic monitoring required',
      ],
    },
    llm_generated_explanation: {
      summary:
        'This patient has normal genetics for metoprolol metabolism and can use standard dosing.',
      genetic_factors: [
        'CYP2D6*1/*1 wild-type genotype indicates normal enzyme function',
        '100% enzyme activity - normal metabolizer phenotype',
        'No rare variants detected in relevant pharmacogenes',
        'Standard metoprolol pharmacokinetics expected',
      ],
      clinical_implications:
        'Metoprolol can be used SAFELY with standard dosing for this patient. Normal CYP2D6 activity means the drug will be metabolized at typical rates. Follow standard clinical protocols for blood pressure or heart rate management. Dose adjustments should be based on clinical response rather than pharmacogenomic factors.',
      patient_friendly_explanation:
        'Good news - your genetic test shows that your body processes Metoprolol normally. You can take this medication at standard doses as prescribed by your doctor. Your genes for breaking down this drug work the same way as most people, so you should respond to the medication as expected.',
      references: [
        'PharmGKB Clinical Annotation for metoprolol and CYP2D6',
      ],
    },
    quality_metrics: {
      vcf_parsing_success: true,
      variant_call_quality: 98.1,
      coverage_depth: 44,
      confidence_interval: {
        lower: 0.93,
        upper: 0.98,
      },
      model_version: 'PharmaGuard-v2.1.0',
      analysis_timestamp: '2026-02-19T14:35:09.000Z',
    },
  },
  {
    patient_id: 'PT-2026-DEMO-12847',
    drug: 'Clopidogrel',
    timestamp: '2026-02-19T14:36:00.000Z',
    risk_assessment: {
      risk_label: 'Adjust Dosage',
      confidence_score: 0.89,
      severity: 'moderate',
      reasoning:
        'Patient carries CYP2C19*2 loss-of-function allele (heterozygous), resulting in intermediate metabolizer phenotype. Clopidogrel is a prodrug requiring CYP2C19 activation. Reduced enzyme activity leads to decreased active metabolite formation and potentially reduced antiplatelet effect.',
    },
    pharmacogenomic_profile: {
      primary_gene: 'CYP2C19',
      diplotype: '*1/*2',
      phenotype: 'IM',
      detected_variants: [
        {
          rsid: 'rs4244285',
          gene: 'CYP2C19',
          position: 'chr10:94781859',
          ref_allele: 'G',
          alt_allele: 'A',
          genotype: 'G/A',
          consequence: 'splice_site_variant',
          impact: 'high',
          evidence_level: '1A',
          clinical_annotation: 'CYP2C19*2 - loss of function allele',
        },
        {
          rsid: 'rs4986893',
          gene: 'CYP2C19',
          position: 'chr10:94781858',
          ref_allele: 'G',
          alt_allele: 'G',
          genotype: 'G/G',
          consequence: 'wild_type',
          impact: 'low',
          evidence_level: '1A',
          clinical_annotation: 'Wild-type allele on second chromosome',
        },
      ],
    },
    clinical_recommendation: {
      action: 'Consider alternative P2Y12 inhibitor or higher clopidogrel dose',
      alternative_drugs: [
        'Prasugrel (if no prior stroke/TIA)',
        'Ticagrelor',
      ],
      dosage_adjustment: {
        factor: 1.5,
        direction: 'increase',
        rationale:
          'Some evidence supports higher clopidogrel doses (150mg) in CYP2C19 intermediate metabolizers, though alternative P2Y12 inhibitors are preferred',
      },
      monitoring_recommendations: [
        'Strongly consider prasugrel or ticagrelor instead of clopidogrel',
        'If clopidogrel used, consider platelet function testing',
        'Monitor for cardiovascular events more closely',
        'Higher loading dose (600mg) may be considered in PCI setting',
        'Document CYP2C19 intermediate metabolizer status',
      ],
      contraindications: [
        'If prasugrel chosen: avoid in patients with prior stroke/TIA or age >75 years',
      ],
    },
    llm_generated_explanation: {
      summary:
        'This patient has reduced ability to activate clopidogrel, potentially decreasing its protective effects.',
      genetic_factors: [
        'CYP2C19*2 allele creates non-functional enzyme',
        'Heterozygous genotype (*1/*2) = ~55% enzyme activity',
        'Intermediate metabolizer phenotype',
        'Clopidogrel requires CYP2C19 for conversion to active metabolite',
        'Reduced activation may compromise antiplatelet effect',
      ],
      clinical_implications:
        'Clopidogrel requires DOSAGE ADJUSTMENT or preferably ALTERNATIVE medication for this patient. As an intermediate CYP2C19 metabolizer, this patient produces less active drug metabolite, potentially reducing protection against cardiovascular events. Clinical studies show intermediate metabolizers have 1.5-2x higher risk of major adverse cardiovascular events. FDA boxed warning addresses this genetic risk. Prasugrel or ticagrelor are superior alternatives unaffected by CYP2C19 genetics.',
      patient_friendly_explanation:
        'Your genetic test shows that your body does not fully activate Clopidogrel, which is used to prevent blood clots and heart attacks. You have one normal and one slow version of the gene that activates this drug, so you get only about half the benefit. This could mean less protection for your heart. Your doctor should consider prescribing a different blood thinner like Prasugrel or Ticagrelor that works better for people with your genetics, or possibly use a higher dose of Clopidogrel with careful monitoring.',
      references: [
        'CPIC Guideline for Clopidogrel and CYP2C19 (2013, updated 2019)',
        'FDA Boxed Warning for Clopidogrel and CYP2C19',
      ],
    },
    quality_metrics: {
      vcf_parsing_success: true,
      variant_call_quality: 97.9,
      coverage_depth: 47,
      confidence_interval: {
        lower: 0.85,
        upper: 0.93,
      },
      model_version: 'PharmaGuard-v2.1.0',
      analysis_timestamp: '2026-02-19T14:36:22.000Z',
    },
  },
];
