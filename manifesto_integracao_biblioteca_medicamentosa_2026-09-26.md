# Manifesto de integração da biblioteca medicamentosa pediátrica

## Meta
- manter as entradas documentais e operacionais separadas;
- preservar a geração original do catálogo;
- permitir busca e revisão sem auto-publicar doses não validadas;
- registrar a trilha de campos preservados e regras de gate.

## Status
- status: ACTIVE_CANONICAL_SOURCE
- data: 2026-09-26
- versão: 62.0-master-498-2026-09-26
- escopo: 498 monografias catalogadas
- integridade: import_integrity_498_of_498

## Regras de integração
- import_all_498_as_searchable_records: true
- preserve_existing_valid_content: true
- do_not_auto_enable_unvalidated_restriction_lines: true
- additive_delta: true

## Campos preservados
- indication
- population
- age_range
- weight_range
- route
- dose
- interval
- duration
- maximum
- formulation
- concentration
- monitoring
- precautions
- renal_adjustment
- hepatic_adjustment
- incompatibilities
- off_label_status
- source

## Gates de implantação
- duplicate_name_check
- unit_check
- dose_vs_daily_dose_check
- max_per_dose_and_daily_max_check
- age_weight_guard_check
- presentation_component_check
- reverse_calculation_check
- high_alert_human_double_check_flag
- regression_test_existing_regimens

## Observação
Este manifesto serve como registro documental do pacote de integração, sem substituir a aprovação humana e sem converter entradas restritas em prescrição operacional automática.
