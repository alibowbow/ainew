/* Artificial Analysis public leaderboard checked 2026-10-01 UTC.
   One explicitly named configuration per model; these are leaderboard positions,
   not ranks inferred from the subset shown on this site. */
function applyAaIndex20261001(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-01';
  const cohort='aa-intelligence-20261001';
  const source='https://artificialanalysis.ai/leaderboards/models';
  const methodology='https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index';
  const entries=[
    ['claude-opus-5-5',58,1,'max · default fallback'],
    ['claude-sonnet-5-5',56,3,'max · default fallback'],
    ['claude-fable-5-1',53,5,'max · default fallback'],
    ['gpt-6-astra',53,7,'max'],
    ['gemini-4-argon',53,8,'high'],
    ['gpt-6-1-sol',52,11,'max'],
    ['muse-spark-1-3',48,19,'max']
  ];
  for(const [modelId,score,officialRank,modelVariant] of entries){
    if(!models.some(m=>m.id===modelId))throw new Error('Unknown AA model: '+modelId);
    const value={modelId,benchmark:'aaIntelligence432',score,unit:'점',officialRank,modelVariant,cohort,
      cohortLabel:'Artificial Analysis 공식 순위 · 2026-10-01 확인',source,sourceLabel:'Artificial Analysis 공식 LLM 리더보드',
      methodologySource:methodology,sourceType:'independent-leaderboard',rankMode:'official',
      benchmarkVersion:'Artificial Analysis Intelligence Index v4.3.2',
      harness:'Artificial Analysis 독립 평가 · 10개 평가 구성',tools:'평가별 허용 도구 · AA 방법론 참조',
      reasoningBudget:modelVariant+' · 구체적 토큰 예산 미공개',
      publishedAt:null,evaluationDate:null,snapshotDate:checkedAt,checkedAt,
      comparisonNote:'AA 전체 리더보드 순위 중 카탈로그 등록 모델의 설정별 발췌입니다. 서로 다른 effort와 fallback 설정을 표기했으며 제공사 보고 점수와 섞지 않습니다.'};
    const previous=rows.find(r=>r.modelId===modelId&&r.benchmark===value.benchmark&&r.cohort===cohort&&r.modelVariant===modelVariant);
    if(previous)Object.assign(previous,value);else rows.push(value);
  }
  const value={id:'aa-intelligence-20261001',key:'aaIntelligence432',name:metrics.aaIntelligence432.name,
    checkedAt,snapshotDate:checkedAt,source,sourceLabel:'Artificial Analysis 공식 LLM 리더보드',
    version:'Artificial Analysis Intelligence Index v4.3.2',
    note:'2026-10-01 확인한 공개 리더보드에서 7개 모델 설정을 발췌. 게시/평가 날짜는 명시되지 않아 추정하지 않았습니다. Gemini 4 Argon은 제한 접근 상태입니다.'};
  const previous=snapshots.find(s=>s.id===value.id);if(previous)Object.assign(previous,value);else snapshots.push(value);
}
