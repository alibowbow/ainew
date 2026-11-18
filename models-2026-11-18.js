/* First-party model releases and Artificial Analysis snapshots verified 2026-11-18 KST. */
const AA_RELEASE_20261117 = {
  checkedAt:'2026-11-18',
  publishedAt:'2026-11-17',
  leaderboard:'https://artificialanalysis.ai/leaderboards/models',
  article:'https://artificialanalysis.ai/articles/openai-has-the-2-model-in-the-intelligence-index-with-the-release-of-gpt-6-2-astra-and-gpt-6-2-sol/',
  breakdown:'https://cdn.sanity.io/images/6vfeftx9/articles/2f6c1dae35709b3b7adaaaf090bf32bf541ce18c-2960x3468.png?auto=format&w=1200',
  intelligenceCohort:'aa-v501-checked-20261118',
  threeDCohort:'aa-3d-20261117',
  // One configuration per model from the default English leaderboard, in published order.
  models:[
    ['claude-fable-5-2','Claude Fable 5.2','Max, Default Fallback',65],
    ['gpt-6-2-astra','GPT-6.2 Astra','Max',62],
    ['gemini-4-carbon','Gemini 4 Carbon','High',60],
    ['claude-opus-5-5','Claude Opus 5.5','Max, Default Fallback',59],
    ['gpt-6-2-sol','GPT-6.2 Sol','Max',57],
    ['claude-sonnet-5-5','Claude Sonnet 5.5','Max, Default Fallback',55],
    ['gemini-4-hydrogen','Gemini 4 Hydrogen','Xhigh',54],
    ['gpt-6-1-terra','GPT-6.1 Terra','Max',51],
    ['gemini-4-argon','Gemini 4 Argon','High',50],
    ['muse-wonder-full','Muse Wonder Full','Max',50],
    ['kimi-k3-1-pro','Kimi K3.1 Pro','',46],
    ['muse-wonder','Muse Wonder','Max',44],
    ['qwen4-max','Qwen4-Max','',43],
    ['claude-haiku-5-5','Claude Haiku 5.5','Max, Default Fallback',36],
    ['muse-ember','Muse Ember','Max',36],
    ['grok-4-7','Grok 4.7','Xhigh',35],
    ['hy4','Tencent Hy4','',35],
    ['deepseek-v4-1-flash-1017','DeepSeek V4.1 Flash 1017','Max',33],
    ['glm53','GLM-5.3','Max',32],
    ['inkling-2-small','Inkling 2 Small','',31]
  ]
};

function applyModelReview20261118(models, metrics, rows, snapshots) {
  const aa = AA_RELEASE_20261117;
  const {checkedAt} = aa;
  const src = {
    openai:'https://openai.com/index/introducing-gpt-6-2-astra-sol/',
    carbon:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/',
    geminiPricing:'https://ai.google.dev/gemini-api/docs/pricing',
    geminiRobotics:'https://deepmind.google/blog/gemini-robotics-2-5-accelerates-real-world-physical-intelligence/',
    inkling:'https://thinkingmachines.ai/news/inkling-2-small/',
    inklingWeights:'https://huggingface.co/thinkingmachines/Inkling-2-Small',
    qwen:'https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max',
    qwenDocs:'https://help.aliyun.com/en/model-studio/qwen4-max',
    hyFlash:'https://www.tencent.com/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/',
    ling:'https://developer.ant-ling.com/en/docs/models/ling/',
    lingLog:'https://developer.ant-ling.com/en/docs/getting-started/changelog',
    exaone:'https://www.lgresearch.ai/news/view?seq=754',
    praxis:'https://runway.com/news/company-news/praxis-1-is-now-available',
    avatar:'https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6',
    avatarCode:'https://github.com/meituan-longcat/LongCat-Video',
    decider:'https://huggingface.co/perplexity-ai/pplx-decider-v1.3',
    deciderFlash:'https://huggingface.co/perplexity-ai/pplx-decider-flash-v1.3',
    nemotron:'https://huggingface.co/nvidia/Nemotron-Labs-Sigma-distill-spec-3B'
  };

  function upsert(list, value, key) {
    const current = list.find(item => key(item) === key(value));
    if (current) Object.assign(current, value);
    else list.push(value);
  }
  function update(id, value) {
    const current = models.find(model => model.id === id);
    const sources = [...new Set([...(value.sources || []), ...(current.sources || []), current.source].filter(Boolean))];
    Object.assign(current, {checkedAt}, value, {sources});
  }
  function model(value) {
    upsert(models, {
      current:true, checkedAt, announcementDate:null, releaseDate:null, previewDate:null,
      apiDate:null, weightsDate:null, scores:{}, sourceStatus:'official', recordType:'model',
      accessType:'api-only', regionTags:[], sources:[value.source],
      apiPricing:{status:'unverified', checkedAt, source:value.source, note:'공식 고정 단가 미확인.'},
      benchmarkReview:{checkedAt, scope:'benchmark-only', source:value.source, aaStatus:'unconfirmed',
        note:'공식 점수와 평가 조건을 확인한 항목만 평가표에 등록합니다.'},
      ...value
    }, item => item.id);
  }
  function pricing(source, entries, note, currency='USD') {
    return {status:'verified', currency, unit:'100만 토큰', checkedAt, source,
      rates:entries.map(([label, amount]) => ({label, amount})), note};
  }
  function review(source, note) {
    return {checkedAt, scope:'benchmark-only', source, aaStatus:'verified', note};
  }

  for (const [tier, input, output, cacheRead, cacheWrite, highlight] of [
    ['astra', 8, 40, 0.4, 10, '복잡한 코드베이스, 장기 전문 업무, 브라우저 3D 제작용 상위 추론 모델'],
    ['sol', 2, 10, 0.1, 2.5, '일상 코딩, 문서 작성, 반복 에이전트 작업에 쓰는 범용 추론 모델']
  ]) {
    const apiId = 'gpt-6.2-' + tier;
    const docs = 'https://developers.openai.com/api/docs/models/' + apiId;
    model({
      id:'gpt-6-2-' + tier, name:'GPT-6.2 ' + tier[0].toUpperCase() + tier.slice(1),
      family:'OpenAI', provider:'OpenAI', region:'US', category:'reasoning',
      date:'2026-11-17', announcementDate:'2026-11-17', releaseDate:'2026-11-17', apiDate:'2026-11-17',
      access:'ChatGPT Work · Codex · OpenAI API', license:'OpenAI 서비스 약관', params:apiId,
      context:'1,050,000 tokens · 최대 입력 922,000 · 최대 출력 128,000',
      modality:'텍스트 · 이미지 · 도구 → 텍스트 · 코드', highlight,
      source:src.openai, sourceLabel:'OpenAI GPT-6.2 공식 발표', sources:[src.openai, docs],
      apiPricing:pricing(docs,[['입력',input],['출력',output],['캐시 입력',cacheRead],['캐시 쓰기 (30분)',cacheWrite]],
        'Standard · 입력 272K 초과 시 전체 입력·캐시 2배, 출력 1.5배. Batch·Fast 요금은 API 문서 참조.'),
      benchmarkReview:review(aa.article,'Intelligence Index v5.0.1과 사람 선호 기반 AA-3D Elo를 별도 기록.'),
      note:'11월 17일 ChatGPT Work, Codex 및 API 출시. API는 Responses와 Chat Completions를 지원합니다.'
    });
  }

  const carbonPricing = pricing(src.geminiPricing,[['입력',2],['출력',10],['캐시 입력',0.1]],
    'Gemini API 유료 Standard 도입가. 11월 30일까지 적용. 12월 1일부터 입력 $4, 출력 $20, 캐시 입력 $0.20.');
  update('gemini-4-carbon',{
    date:'2026-11-10', releaseDate:'2026-11-10', apiDate:'2026-11-10',
    access:'Gemini API 유료 티어 · AI Studio · Gemini for business · Gemini 앱/Antigravity (AI Ultra)',
    params:'gemini-4-carbon', context:'최대 1M tokens', sourceLabel:'Google Gemini 4 Carbon 정식 출시 발표',
    source:src.carbon, sources:[src.carbon, src.geminiPricing], apiPricing:{...carbonPricing, standardRates:[
      {label:'입력',amount:4},{label:'출력',amount:20},{label:'캐시 입력',amount:0.2}
    ]},
    benchmarkReview:review(aa.leaderboard,'AA v5.0.1 공개 리더보드 high 60점 및 10월 출시 평가.'),
    note:'10월 28일 제한 프리뷰 이후 11월 10일 일반 유료 API와 AI Ultra 제품으로 확대됐습니다.'
  });
  update('gemini-4-hydrogen',{
    benchmarkReview:review(aa.leaderboard,'AA v5.0.1 공개 리더보드 xhigh 54점 및 Terminal-Bench 4.1 공식 결과.')
  });
  update('inkling-2-small',{
    access:'Tinker API · Hugging Face 가중치', accessType:'open-source-license', license:'Apache-2.0',
    weightsDate:'2026-11-12', sources:[src.inkling, src.inklingWeights],
    note:'11월 5일 Tinker API 출시 이후 11월 12일 Apache 2.0 가중치가 공개됐습니다.'
  });

  model({
    id:'qwen4-max', name:'Qwen4-Max', family:'Qwen 4', provider:'Alibaba Cloud', region:'China',
    regionTags:['China'], category:'multimodal', date:'2026-11-16', announcementDate:'2026-11-16',
    releaseDate:'2026-11-16', apiDate:'2026-11-16', access:'QwenCloud API · QwenStudio · QwenWork',
    license:'Alibaba Cloud 서비스 약관', params:'qwen4-max · 2.4T total · 71B active',
    context:'1,000,000 tokens', modality:'텍스트 · 이미지 · 영상 · 도구 → 텍스트 · 코드',
    highlight:'네이티브 시각 입력을 갖춘 Qwen 4 플래그십', source:src.qwen,
    sourceLabel:'Alibaba Cloud Qwen4-Max 공식 출시', sources:[src.qwen, src.qwenDocs],
    apiPricing:pricing(src.qwenDocs,[['입력',10],['출력',30]],'Alibaba Cloud Model Studio Global 배포 기준. 리전에 따라 요금이 다릅니다.','CNY'),
    benchmarkReview:review(aa.leaderboard,'공개 리더보드 AA v5.0.1 43점.'),
    note:'11월 11일 Token Plan 프리뷰 뒤 11월 16일 정식 API가 열렸습니다. 더 작은 Qwen 4 계열의 가중치 공개가 예고됐습니다.'
  });
  update('qwen4-max-preview',{current:false});
  model({
    id:'hy4-flash', name:'Hunyuan Hy4 Flash', family:'Hunyuan Hy', provider:'Tencent Hunyuan', region:'China',
    regionTags:['China'], category:'multimodal', date:'2026-11-16', announcementDate:'2026-11-16',
    releaseDate:'2026-11-16', apiDate:'2026-11-16', access:'Tencent Cloud TokenHub · WorkBuddy · Yuanbao',
    license:'Tencent Cloud 서비스 약관', params:'hy4-flash · 224B total · 12B active',
    context:'최대 1M tokens', modality:'텍스트 · 이미지 · 도구 → 텍스트 · 코드',
    highlight:'문서와 프론트엔드 작업을 위한 고속 멀티모달 모델', source:src.hyFlash,
    sourceLabel:'Tencent Hy4 Flash 공식 발표', note:'11월 16일 API가 공개됐으며 Tencent는 향후 오픈 웨이트 공개를 예고했습니다.'
  });
  model({
    id:'ling-3-2-flash', name:'Ling 3.2 Flash', family:'Ling', provider:'Ant Group', region:'China',
    regionTags:['China'], category:'multimodal', date:'2026-11-05', announcementDate:'2026-11-05',
    releaseDate:'2026-11-05', apiDate:'2026-11-05', access:'Ant Ling 채팅 · OpenAI/Anthropic 호환 API',
    license:'Ant Ling 서비스 약관', params:'Ling-3.2-flash · 560B total · 25B active',
    context:'최대 1M tokens', modality:'텍스트 · 이미지 · 영상 → 텍스트',
    highlight:'복합 시각 이해와 장기 멀티모달 작업용 MoE', source:src.lingLog,
    sourceLabel:'Ant Ling 공식 변경 기록', sources:[src.lingLog, src.ling],
    note:'Ant Ling의 자체 변경 기록에 11월 5일 채팅과 API 공개가 명시돼 있습니다. 이 체크포인트의 가중치 공개는 확인되지 않았습니다.'
  });
  model({
    id:'k-exaone-2-5', name:'K-EXAONE 2.5', family:'EXAONE', provider:'LG AI Research', region:'Korea',
    regionTags:['Korea'], category:'reasoning', date:'2026-11-09', announcementDate:'2026-11-09', apiDate:'2026-11-09',
    access:'EXAONE API Platform · API 키 발급 후 무료', license:'EXAONE API 서비스 약관',
    params:'기술 검증 모델', context:'공식 발표 미기재', modality:'텍스트 · 도구 → 텍스트 · 코드',
    highlight:'코딩·장기 추론·워크플로 자동화를 강화한 한국 모델',
    source:src.exaone, sourceLabel:'LG AI연구원 K-EXAONE 2.5 API 발표',
    apiPricing:{status:'no-public-rate',checkedAt,source:src.exaone,note:'개발·연구용 API 키로 무료 이용.'},
    note:'8월 버전에 추가 학습한 기술 검증 모델입니다. LG AI연구원이 11월 9일 무료 API 제공을 발표했습니다.'
  });
  model({
    id:'gemini-robotics-2-5', name:'Gemini Robotics 2.5', family:'Gemini Robotics', provider:'Google DeepMind',
    region:'US', category:'world', date:'2026-11-10', announcementDate:'2026-11-10',
    access:'Google DeepMind 로봇 파트너', license:'파트너 제공 조건', params:'Vision-Language-Action (VLA)',
    context:'다양한 로봇 기종의 실시간 관측', modality:'시각 관측 · 지시 → 로봇 행동',
    highlight:'정밀 물체 조작과 다단계 작업을 수행하는 로봇 행동 모델',
    source:src.geminiRobotics, sourceLabel:'Google DeepMind Gemini Robotics 2.5 공식 발표',
    note:'11월 10일 공개 발표와 파트너 실증을 확인했습니다. 일반 API·가중치 공개일은 기재되지 않았습니다.'
  });
  model({
    id:'runway-praxis-1', name:'Runway Praxis-1', family:'Praxis', provider:'Runway', region:'US',
    category:'world', date:'2026-11-11', announcementDate:'2026-09-30', releaseDate:'2026-11-11', weightsDate:'2026-11-11',
    access:'공개 가중치 · Hugging Face · GitHub · Reactor', accessType:'open-source-license', license:'Apache-2.0',
    params:'27B · MoE diffusion transformer', context:'카메라·로봇 동작 시퀀스',
    modality:'시각 관측 · 지시 → 예측 영상 · 로봇 동작', highlight:'영상과 로봇 행동을 함께 예측하는 월드 액션 모델',
    source:src.praxis, sourceLabel:'Runway Praxis-1 가중치 공개 발표',
    note:'9월 30일 소개 후 11월 11일 가중치와 추론·미세조정 코드를 공개했습니다.'
  });
  model({
    id:'longcat-video-avatar-1-6', name:'LongCat-Video-Avatar 1.6', family:'LongCat-Video', provider:'Meituan LongCat',
    region:'China', regionTags:['China open weights'], category:'video', date:'2026-11-15',
    announcementDate:'2026-11-15', releaseDate:'2026-11-15', weightsDate:'2026-11-15',
    access:'공개 가중치 · Hugging Face · ModelScope', accessType:'open-source-license', license:'MIT',
    params:'LongCat-Video-Avatar · 작업별 LoRA 어댑터', context:'단일·다중 인물 · 영상 연장',
    modality:'오디오 · 텍스트 · 이미지/영상 → 말하는 인물 영상',
    highlight:'음성에 맞춰 얼굴·상체·입술을 움직이는 장편 아바타 영상 모델',
    source:src.avatar, sourceLabel:'Meituan LongCat-Video-Avatar 1.6 모델 카드', sources:[src.avatar, src.avatarCode],
    note:'1.5의 아키텍처를 유지하며 입술 싱크와 장시간 영상의 일관성을 강화한 공개 체크포인트입니다.'
  });
  model({
    id:'pplx-decider-flash-v1-3', name:'Perplexity Decider Flash v1.3', family:'Perplexity Decider', provider:'Perplexity',
    region:'US', category:'multimodal', date:'2026-11-12', weightsDate:'2026-11-12',
    access:'공개 가중치 · Hugging Face', accessType:'open-source-license', license:'Apache-2.0',
    params:'pplx-decider-flash-v1.3 · Qwen3.5-4B 기반', context:'기본 최대 길이 32,768 tokens',
    modality:'텍스트 · 이미지 · 선택지 → 분류 점수 · 원문 위치',
    highlight:'텍스트 생성 없이 선택지를 채점하고 근거 구간을 찾는 경량 모델',
    source:src.deciderFlash, sourceLabel:'Perplexity 공식 모델 카드 및 가중치',
    note:'체크포인트로 선택지를 채점하거나 문서 내 근거 구간을 찾아낼 수 있습니다.'
  });

  model({
    id:'pplx-decider-v1-3', name:'Perplexity Decider v1.3', family:'Perplexity Decider', provider:'Perplexity',
    region:'US', category:'multimodal', date:'2026-11-12', weightsDate:'2026-11-12',
    access:'공개 가중치 · Hugging Face', accessType:'open-source-license', license:'Apache-2.0',
    params:'pplx-decider-v1.3 · Qwen3.8-27B 기반', context:'기본 최대 길이 32,768 tokens',
    modality:'텍스트 · 이미지 · 선택지 → 분류 점수 · 원문 위치',
    highlight:'선택형 판단과 근거 문장 추출을 지원하는 멀티모달 분류 모델',
    source:src.decider, sourceLabel:'Perplexity Decider v1.3 공식 모델 카드',
    note:'Flash v1.3에 지식을 증류하기 전의 상위 체크포인트입니다.'
  });
  model({
    id:'nemotron-labs-sigma-distill-spec-3b', name:'Nemotron Labs Sigma Distill Spec 3B',
    family:'Nemotron Labs Sigma', provider:'NVIDIA', region:'US', category:'llm',
    date:'2026-11-12', weightsDate:'2026-11-12', access:'공개 가중치 · Hugging Face',
    accessType:'open-weights', license:'NVIDIA Nemotron Open Model License',
    params:'약 3B · continuous diffusion', context:'가변 길이 토큰 블록',
    modality:'텍스트 → 후속 토큰 후보', highlight:'speculative decoding용 연구 체크포인트',
    source:src.nemotron, sourceLabel:'NVIDIA 공식 모델 카드 및 가중치',
    note:'대상 언어 모델의 디코딩을 보조하는 speculative draft 모델입니다.'
  });

  const intelligenceSource = {
    benchmark:'aaIntelligenceV5', unit:'점', cohort:aa.intelligenceCohort,
    cohortLabel:'Artificial Analysis v5.0.1 · 모델별 대표 설정 · 2026-11-18 확인',
    benchmarkVersion:'Artificial Analysis Intelligence Index · v5.0.1',
    source:aa.leaderboard, sourceLabel:'Artificial Analysis 공식 리더보드',
    checkedAt, snapshotDate:checkedAt, evaluationDate:null, publishedAt:null,
    sourceType:'independent-leaderboard', rankMode:'reference',
    harness:'Artificial Analysis 독립 9개 평가 구성', tools:'평가별 AA 허용 도구',
    comparisonNote:'기본 리더보드의 모델별 대표 설정 상위 20개. 소수점이 반올림된 표시값입니다.'
  };
  const rowKey = item => [item.modelId,item.benchmark,item.cohort,item.modelVariant || ''].join('|');
  aa.models.forEach(([modelId, , variant, score]) => upsert(rows,{
    ...intelligenceSource, modelId, modelVariant:variant, score,
    reasoningBudget:variant || '별도 설정 미기재'
  },rowKey));

  metrics.aa3DElo = {
    key:'aa3DElo', name:'AA-3D · 브라우저 3D Elo', direction:'higher', rankable:false,
    description:'같은 프롬프트로 만든 인터랙티브 3D 결과물을 사람이 비교한 선호도 Elo.'
  };
  [['gpt-6-2-astra',1318],['claude-fable-5-2',1271],['gpt-6-2-sol',1259]].forEach(([modelId,score],index) =>
    upsert(rows,{
      modelId, benchmark:'aa3DElo', score, unit:' Elo', cohort:aa.threeDCohort,
      cohortLabel:'Artificial Analysis AA-3D · 2026-11-17 발표', rankMode:'official', officialRank:index + 1,
      source:aa.article, sourceLabel:'Artificial Analysis GPT-6.2 출시 분석', sourceType:'independent-leaderboard',
      checkedAt, publishedAt:aa.publishedAt, snapshotDate:null, evaluationDate:null, benchmarkVersion:'Artificial Analysis AA-3D',
      harness:'동일 프롬프트의 인터랙티브 3D 결과물에 대한 블라인드 쌍대 선호 평가',
      tools:'브라우저 3D 결과물', reasoningBudget:'공식 발표에 설정 미기재',
      comparisonNote:'2026-11-17 발표의 AA-3D 상위 3개 점수입니다.'
    },rowKey)
  );
  for (const [key, source, version, snapshotDate, note] of [
    ['aaIntelligenceV5',aa.leaderboard,'v5.0.1',checkedAt,'공식 보드의 모델별 대표 설정 상위 20개.'],
    ['aa3DElo',aa.article,'AA-3D Elo',null,'11월 17일 공식 출시 분석의 3D 선호도 평가.']
  ]) {
    upsert(snapshots,{id:'review-2026-11-18-'+key,key,name:key==="aaIntelligenceV5"?"Artificial Analysis Intelligence Index v5.0.1":metrics[key].name,
      checkedAt,snapshotDate,
      source,sourceLabel:'Artificial Analysis 공식 출처',version,note}, item => item.id);
  }
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>rowKey(a).localeCompare(rowKey(b)));
}
