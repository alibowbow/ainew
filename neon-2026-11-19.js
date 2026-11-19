const NEON_REVIEW = {
  checkedAt: '2026-11-19',
  publishedAt: '2026-11-18',
  release: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/',
  modelCard: 'https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Neon-Model-Card.pdf',
  pricing: 'https://ai.google.dev/gemini-api/docs/pricing#gemini-4-neon',
  evaluations: 'https://artificialanalysis.ai/models/gemini-4-neon',
  analysis: 'https://artificialanalysis.ai/articles/gemini-4-neon-intelligence-gain',
  cohort: 'aa-v501-neon-20261118'
};

const AA_CURRENT = {
  checkedAt: NEON_REVIEW.checkedAt,
  leaderboard: AA_RELEASE_20261117.leaderboard,
  models: [
    ...AA_RELEASE_20261117.models.slice(0, 2),
    ['gemini-4-neon', 'Gemini 4 Neon', 'Xhigh', 61],
    ...AA_RELEASE_20261117.models.slice(2, 19)
  ]
};

function applyNeon20261119(models, rows, snapshots) {
  const review = NEON_REVIEW;
  const modelId = 'gemini-4-neon';
  function upsert(list, value, key) {
    const index = list.findIndex(item => key(item) === key(value));
    if (index === -1) list.push(value);
    else list[index] = value;
  }

  upsert(models, {
    id: modelId, name: 'Gemini 4 Neon', family: 'Gemini 4', provider: 'Google DeepMind',
    region: 'US', regionTags: [], category: 'reasoning', current: true, recordType: 'model',
    date: review.publishedAt, announcementDate: review.publishedAt, releaseDate: review.publishedAt,
    apiDate: review.publishedAt, previewDate: null, weightsDate: null, checkedAt: review.checkedAt,
    access: 'Gemini API 유료 티어 · AI Studio · Gemini for business · Gemini 앱/Antigravity (Pro·Ultra)',
    accessType: 'api-only', license: 'Google 서비스 및 Gemini API 약관',
    params: 'gemini-4-neon · LOW / MEDIUM / HIGH / XHIGH',
    context: '최대 1M 토큰 (입력·출력 합산) · 기본 동기 출력 최대 64K',
    modality: '텍스트 · 이미지 · 오디오 · 영상 → 텍스트',
    highlight: '복잡한 코딩과 분석을 빠르게 처리하도록 조정한 Carbon 기반 추론 모델',
    source: review.release, sourceLabel: 'Google Gemini 4 Neon 공식 발표', sourceStatus: 'official',
    sources: [review.release, review.modelCard, review.pricing, review.evaluations, review.analysis],
    scores: {},
    apiPricing: {
      status: 'verified', currency: 'USD', unit: '100만 토큰', tier: 'Gemini API 유료 Standard',
      checkedAt: review.checkedAt, source: review.pricing,
      rates: [{label:'입력',amount:3}, {label:'출력',amount:15}, {label:'캐시 입력',amount:0.15}],
      note: 'Google 표준 토큰 단가. 출력에 추론 토큰이 포함됩니다.'
    },
    benchmarkReview: {
      checkedAt: review.checkedAt, scope: 'benchmark-only', source: review.analysis, aaStatus: 'verified',
      note: 'AA Intelligence Index v5.0.1 추론 설정 네 가지와 코딩 에이전트 평가를 확인했습니다.'
    },
    note: 'Google 공식 발표일은 11월 18일입니다. 기본 동기 출력은 최대 64K이며, 백그라운드 장문 생성은 통합 컨텍스트 한도 내에서 확장됩니다.'
  }, item => item.id);

  const rowKey = row => [row.modelId, row.benchmark, row.cohort, row.modelVariant || ''].join('|');
  const common = {
    modelId, checkedAt: review.checkedAt, publishedAt: review.publishedAt, evaluationDate: null,
    rankMode: 'reference', sourceType: 'independent-leaderboard'
  };
  for (const [modelVariant, score] of [['Xhigh',61], ['High',60], ['Medium',55], ['Low',44]]) {
    upsert(rows, {
      ...common, modelVariant, score, benchmark: 'aaIntelligenceV5', unit: '점',
      cohort: review.cohort, cohortLabel: 'Gemini 4 Neon · AA v5.0.1 · 2026-11-18',
      source: review.evaluations, sourceLabel: 'Artificial Analysis Gemini 4 Neon',
      benchmarkVersion: 'Artificial Analysis Intelligence Index · v5.0.1',
      harness: 'Artificial Analysis 독립 평가', tools: '평가별 AA 허용 도구',
      reasoningBudget: modelVariant, comparisonNote: 'Gemini 4 Neon의 공식 추론 설정별 점수입니다.'
    }, rowKey);
  }
  upsert(snapshots, {
    id: 'review-2026-11-19-aaIntelligenceV5', key: 'aaIntelligenceV5',
    name: 'Artificial Analysis Intelligence Index v5.0.1', version: 'v5.0.1',
    checkedAt: review.checkedAt, snapshotDate: review.checkedAt, source: AA_CURRENT.leaderboard,
    sourceLabel: 'Artificial Analysis 공식 리더보드',
    note: '모델별 대표 설정 상위 20개를 확인하고 Gemini 4 Neon의 공식 설정별 평가를 등록했습니다.'
  }, item => item.id);

  models.sort((a,b) => (b.date || '').localeCompare(a.date || '') || a.name.localeCompare(b.name));
  rows.sort((a,b) => rowKey(a).localeCompare(rowKey(b)));
}
