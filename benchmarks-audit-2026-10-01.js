/* Primary-source model and benchmark audit, checked 2026-10-01.
 * Apply after the dated launch updates. Unknown scores never become zero.
 */
function applyBenchmarkAudit20261001(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-01';
  const aa='https://artificialanalysis.ai/';
  const method=aa+'evaluations/artificial-analysis-intelligence-index';
  const qwen='https://docs.qwencloud.com/changelog/models';
  const live='https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/';
  const solar='https://www.upstage.ai/blog/en/solar-mini-4';
  function upsert(model) {
    const old=models.find(m=>m.id===model.id);
    if(old)Object.assign(old,model);else models.push(model);
  }
  function metric(key,name,description,direction='higher') {
    metrics[key]={key,name,description,direction,rankable:false};
  }
  function add(row) {
    const key=r=>[r.modelId,r.benchmark,r.cohort,r.modelVariant||''].join('|');
    const old=rows.find(r=>key(r)===key(row));
    if(old)Object.assign(old,row);else rows.push(row);
  }
  function model(data) {
    return Object.assign({current:true,checkedAt,announcementDate:data.date||null,releaseDate:data.date||null,
      previewDate:null,apiDate:null,scores:{},recordType:'model',sourceStatus:'official',regionTags:[],
      access:'Closed / API',accessType:'api-only',license:'제공사 서비스 약관',params:'세부 사양 미확인',context:'미확인',
      apiPricing:{status:'unverified',checkedAt,source:data.source,note:'이 모델의 표준 API 요금 원문을 확인하지 못했습니다.'}},data);
  }

  // These are API evaluations, not a measurement of a downloaded RL checkpoint.
  for(const tier of ['pro','flash']) {
    const baseId='mimo-v2-6-'+tier+'-rl',base=models.find(m=>m.id===baseId);
    upsert(model({id:'mimo-v2-6-'+tier+'-api',name:'MiMo-V2.6-'+(tier==='pro'?'Pro':'Flash')+' · API 평가',
      family:'MiMo V2.6',provider:'Xiaomi MiMo',region:'China',regionTags:['China'],category:'multimodal',date:'2026-09-21',
      announcementDate:null,releaseDate:null,apiDate:null,recordType:'configuration',baseModelId:baseId,
      sourceStatus:'independent',source:aa+'models/mimo-v2-6-'+tier,sourceLabel:'Artificial Analysis API 평가',
      params:base.params,context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',
      highlight:'Artificial Analysis가 평가한 Xiaomi API 제공 설정',
      note:'9월 21일은 AA 페이지에 기록된 모델 출시일입니다. 최초 API 제공일과 공개 RL 가중치의 정확한 체크포인트 일치는 미확인으로, API 평가 설정을 따로 표시합니다.'}));
  }
  upsert(model({id:'solar-mini-4',name:'Solar Mini 4',family:'Solar 4',provider:'Upstage',region:'Korea',regionTags:['Korea'],
    category:'llm',date:'2026-09-22',announcementDate:null,releaseDate:'2026-09-22',apiDate:null,
    access:'API / 별도 계약 온프레미스',accessType:'custom-license',license:'Upstage API / 별도 계약',
    params:'35B total / 3B active · 최대 출력 262K',context:'1M tokens',modality:'텍스트 → 텍스트',
    highlight:'반복적인 에이전트 작업을 위한 소형 MoE',source:solar,sourceLabel:'Upstage Solar Mini 4 공식 발표',
    note:'출시일은 AA 모델 페이지(2026-09-22)를 따릅니다. 공식 발표에 최초 API 제공일은 없어 미기재입니다. 공개 가중치 모델로 분류하지 않습니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API · 할인 전',
      source:'https://www.upstage.ai/pricing/api',rates:[{label:'입력',amount:0.10},{label:'출력',amount:0.40},{label:'캐시 입력',amount:0.01}],
      note:'UTC 2026-10-11 00:00 전까지 입력 $0.03 / 출력 $0.12 / 캐시 $0.003, 이후 10-23 00:00 전까지 $0.05 / $0.20 / $0.005. 가격표의 기간별 단가를 따릅니다.'}}));
  const solarPro=models.find(m=>m.id==='solar-pro-4');
  solarPro.apiPricing={status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API',source:'https://www.upstage.ai/pricing/api',
    rates:[{label:'입력',amount:0.30},{label:'출력',amount:1.20},{label:'캐시 입력',amount:0.06}],note:'출시 프로모션이 끝난 표준 단가. 별도 계약 온프레미스 요금은 포함하지 않습니다.'};

  [
    ['qwen3-8-max-0902','Qwen3.8 Max (0902)','2026-09-02','reasoning','1M tokens','텍스트 · 이미지 → 텍스트','장기 코딩·도구 사용·시각 이해를 강화한 0902 스냅샷'],
    ['qwen3-8-omni-flash-realtime','Qwen3.8 Omni Flash Realtime','2026-09-21','voice','미확인','음성 · 영상 → 텍스트 · 음성','실시간 멀티채널 음성·영상과 원격 MCP 도구'],
    ['qwen-audio-3-1-realtime-plus','Qwen Audio 3.1 Realtime Plus','2026-09-20','voice','262,144 tokens','음성 → 음성','양방향 대화·도구 호출·검색·음성 복제'],
    ['decision-model-preview','Qwen Decision Model Preview','2026-09-24','llm','미확인','텍스트 · 업무 문맥 → 분류 · 확률 · 점수','업무 라우팅·검증을 위한 병렬 의사결정 프리뷰']
  ].forEach(([id,name,date,category,context,modality,highlight])=>upsert(model({id,name,date,category,context,modality,highlight,
    family:'Qwen',provider:'Alibaba / Qwen',region:'China',regionTags:['China'],source:qwen,sourceLabel:'Qwen 공식 출시 기록',
    apiDate:date,releaseDate:id==='decision-model-preview'?null:date,previewDate:id==='decision-model-preview'?date:null,
    access:id==='decision-model-preview'?'API 프리뷰':'Closed / API',
    params:id==='qwen3-8-max-0902'?'qwen3.8-max-0902 · qwen3.8-max-2026-09-02':id.replace(/qwen3-8/,'qwen3.8').replace(/3-1/,'3.1'),
    note:'QwenCloud 제공일을 확인했습니다. 공개 가중치·라이선스나 평가 점수를 추정하지 않습니다.'})));
  // QwenCloud availability is not a new underlying Vidu model release.
  [
    ['viduq3-mix-reference2video','Vidu Q3 Mix · QwenCloud','video','참조 이미지 · 텍스트 → 영상'],
    ['viduq3-ad-reference2video','Vidu Q3 Ad · QwenCloud','video','상품 이미지 · 텍스트 → 영상 · 음성'],
    ['viduq3-drama-reference2video','Vidu Q3 Drama · QwenCloud','video','참조 이미지 · 텍스트 → 영상'],
    ['viduq2-pro-fast-img2video','Vidu Q2 Pro Fast · QwenCloud','video','이미지 · 텍스트 → 720p/1080p 영상'],
    ['vidu-image-reference2image','Vidu Image · QwenCloud','image','참조 이미지 · 텍스트 → 이미지']
  ].forEach(([id,name,category,modality])=>upsert(model({id,name,category,modality,family:'Vidu',provider:'ShengShu / QwenCloud',
    region:'China',regionTags:['China'],date:'2026-09-14',announcementDate:null,releaseDate:null,apiDate:'2026-09-14',
    recordType:'configuration',source:qwen,sourceLabel:'QwenCloud Vidu 서비스 제공 기록',
    highlight:'QwenCloud의 Vidu API 제공 설정',note:'2026-09-14는 QwenCloud에서 제공을 시작한 날짜입니다. 기반 모델의 최초 출시일은 미확인입니다.'})));
  upsert(model({id:'gemini-3-8-live-extended-thinking',name:'Gemini 3.8 Live Extended Thinking',family:'Gemini 3.8 Audio',
    provider:'Google DeepMind',region:'US',category:'voice',date:'2026-09-15',apiDate:'2026-09-15',
    context:'공식 Live API 사양 참조',params:'gemini-3.8-live-extended-thinking',modality:'텍스트 · 이미지 · 영상 · 음성 → 텍스트 · 음성',
    source:live,sourceLabel:'Google Gemini 3.8 Live 공식 발표',highlight:'대화 중 병렬 추론과 복잡한 비동기 작업 수행',
    access:'Gemini API / Enterprise private preview',note:'9월 15일 개발자 API 제공. Enterprise의 비공개 프리뷰와 소비자 제품 롤아웃을 구분합니다.'}));
  const liveBase=models.find(m=>m.id==='gemini-3-8-live');
  Object.assign(liveBase,{source:live,sourceLabel:'Google Gemini 3.8 Live 공식 발표',
    highlight:'실시간 대화·시각 문맥·비동기 도구 호출',
    note:'기반 모델은 2026-09-15 Gemini API 제공. Live Avatar는 2026-09-24 Enterprise에서 GA된 기능으로 updates에 표시합니다.'});
  const mercuryVoice='https://www.inceptionlabs.ai/blog/introducing-mercury-voice';
  upsert(model({id:'mercury-voice',name:'Mercury Voice',family:'Mercury',provider:'Inception Labs',region:'US',category:'reasoning',
    date:'2026-09-29',previewDate:'2026-09-08',releaseDate:'2026-09-29',apiDate:'2026-09-29',
    access:'Enterprise API · 접근 신청',params:'diffusion LLM · low/medium/high · 최대 출력 50K',context:'128K tokens',
    modality:'텍스트 → 텍스트 · 음성 에이전트의 LLM 단계',source:mercuryVoice,sourceLabel:'Inception Mercury Voice 공식 발표',
    highlight:'음성 에이전트를 위한 낮은 응답 지연의 추론 LLM',
    note:'9월 29일 기업 고객 대상 GA. 음성 입력·출력 모델로 오인하지 않도록 LLM 처리 단계를 명시합니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API · 할인 전',source:mercuryVoice,
      rates:[{label:'입력',amount:0.40},{label:'출력',amount:1.50}],note:'출시 시 50% 할인: 입력 $0.20 / 출력 $0.75. 종료일은 미기재입니다.'}}));
  upsert(model({id:'mercury-router-preview',name:'Mercury Router Preview',family:'Mercury',provider:'Inception Labs',region:'US',
    category:'llm',date:'2026-09-08',releaseDate:null,previewDate:'2026-09-08',apiDate:null,recordType:'configuration',
    access:'프리뷰 · 일반 API 제공일 미확인',modality:'텍스트 프롬프트 → 모델 라우팅',
    highlight:'프롬프트의 품질·속도·비용 조건에 따른 모델 선택',source:'https://www.inceptionlabs.ai/blog/introducing-mercury-2-5',
    sourceLabel:'Inception Mercury 2.5·Router 공식 발표',note:'9월 8일 프리뷰 발표. 정확한 일반 API 제공일과 가격은 미확인입니다.'}));
  const argon=models.find(m=>m.id==='gemini-4-argon');
  argon.context='1M tokens · AA 확인';
  argon.note='9월 30일 발표와 Fairwind 제한 접근을 구분합니다. AA는 1M 입력 컨텍스트를 기록했습니다. 공개 API·모델 ID·최초 API 제공일은 미발표입니다.';

  // September releases found by reviewing the complete AA change log.
  upsert(model({id:'step-5-preview',name:'Step 5 Preview',family:'Step 5',provider:'StepFun',region:'China',regionTags:['China'],
    category:'reasoning',date:'2026-09-18',releaseDate:null,previewDate:'2026-09-18',apiDate:null,
    context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',access:'API 프리뷰 · 최초 API 제공일 미확인',
    source:aa+'models/step-5',sourceLabel:'Artificial Analysis Step 5 Preview 평가',sourceStatus:'independent',
    highlight:'StepFun의 멀티모달 추론 프리뷰',note:'프리뷰 날짜·입출력·컨텍스트는 AA 모델 페이지 기준입니다. 제공사 요금 원문은 미확인입니다.'}));
  [
    ['ling-3-0-flash-fin','Ling-3.0-flash-Fin','2026-09-11','reasoning','5.1B','텍스트 → 텍스트','금융 조사·도구 사용·스프레드시트 작업'],
    ['ling-3-0-flash-vl','Ling-3.0-flash-VL','2026-09-10','multimodal','5.5B','텍스트 · 이미지 · 영상 → 텍스트','시각 문맥과 추론·행동·검증 결합']
  ].forEach(([id,name,date,category,active,modality,highlight])=>{
    const source='https://huggingface.co/inclusionAI/'+name;
    upsert(model({id,name,date,category,modality,highlight,family:'Ling 3.0',provider:'Ant Group / InclusionAI',
      region:'China',regionTags:['China','China open weights'],params:'124B total / '+active+' active',context:'256K tokens',
      access:'Open weights / MIT',accessType:'open-source-license',license:'MIT',source,sourceLabel:'InclusionAI 공식 모델 카드',
      note:'사양·라이선스는 공식 카드, 출시일은 AA 모델 페이지 기준입니다. 최초 API 제공일은 미확인입니다.',
      apiPricing:{status:'provider-dependent',checkedAt,source,note:'공개 가중치. 직접 호스팅 비용과 선택한 API 공급자의 단가는 별도입니다.'}}));
  });
  [
    ['k2-horizon-0-9b','K2 Horizon 0.9B','K2-Horizon-0.9B','0.9B','131,072 tokens'],
    ['k2-horizon-3-7b','K2 Horizon 3.7B','K2-Horizon-3.7B','3.7B','524,288 tokens'],
    ['k2-horizon-7b','K2 Horizon 7B','K2-Horizon-7B','7B','524,288 tokens'],
    ['k2-horizon-mova-36b-a4b','K2 Horizon MoVA 36B A4B','K2-Horizon-MoVA-36B-A4B','36B total / 4B active','524,288 tokens']
  ].forEach(([id,name,repo,params,context])=>{
    const source='https://huggingface.co/IFM/'+repo;
    upsert(model({id,name,params,context,date:'2026-09-03',family:'K2 Horizon',provider:'IFM',region:'Global',category:'reasoning',
      modality:'텍스트 → 텍스트',access:'Open weights / Apache-2.0',accessType:'open-source-license',license:'Apache-2.0',
      source,sourceLabel:'IFM 공식 모델 카드',highlight:'K2 Horizon의 소형·중형 공개 가중치 모델',
      note:'최종 가중치는 공개되어 있습니다. 출시일은 AA 모델 페이지 기준이며 학습 코드·중간 체크포인트의 향후 공개를 완료로 표시하지 않습니다.',
      apiPricing:{status:'provider-dependent',checkedAt,source,note:'공개 가중치. 직접 호스팅 비용과 선택한 API 공급자의 단가는 별도입니다.'}}));
  });
  const k2Large=models.find(m=>m.id==='k2-horizon-375b-a23b');
  Object.assign(k2Large,{date:'2026-09-03',releaseDate:'2026-09-03',
    note:'최종 가중치 공개 확인. 출시일은 AA 모델 페이지 기준입니다. 학습 코드·중간 체크포인트의 향후 공개를 완료로 표시하지 않습니다. 지역은 미확인입니다.'});
  const miniSource='https://huggingface.co/openbmb/MiniCPM5-2B';
  upsert(model({id:'minicpm5-2b',name:'MiniCPM5-2B',family:'MiniCPM5',provider:'OpenBMB',region:'China',regionTags:['China','China open weights'],
    category:'llm',date:'2026-09-07',params:'2.6B total · AA 사양',context:'131K tokens',modality:'텍스트 → 텍스트',
    access:'Open weights / Apache-2.0',accessType:'open-source-license',license:'Apache-2.0',source:miniSource,sourceLabel:'OpenBMB 공식 모델 카드',
    highlight:'소형 공개 가중치 언어 모델',note:'출시일·총 파라미터 수는 AA 모델 페이지 기준입니다. 최초 API 제공일은 미확인입니다.',
    apiPricing:{status:'provider-dependent',checkedAt,source:miniSource,note:'공개 가중치. 직접 호스팅 비용과 선택한 API 공급자의 단가는 별도입니다.'}}));
  upsert(model({id:'jt-4-1-flash-236b-a21b',name:'JT-4.1 Flash 236B A21B',family:'JT 4.1',provider:'China Mobile',
    region:'China',regionTags:['China'],category:'reasoning',date:'',announcementDate:null,releaseDate:null,
    params:'236B A21B · 모델 명칭',context:'262K tokens',modality:'텍스트 → 텍스트',source:aa+'models/jt236b',
    sourceStatus:'independent',sourceLabel:'Artificial Analysis JT-4.1 Flash 평가',highlight:'9월 29일 AA가 새로 게시한 추론 평가',
    note:'AA는 2026년 7월 출시로 표기하지만 정확한 날짜는 미확인입니다. AA의 $0 표시는 제공사 무료 API 요금으로 확정하지 않습니다.'}));
  for(const id of ['fugu-max','fugu-ultra-v2'])models.find(m=>m.id===id).recordType='configuration';

  // Replace stale/unsupported AA records rather than leaving duplicate snapshots.
  // Dates of model release and of methodology changes are not evaluation dates.
  const specs=[
    ['gpt-6-1-sol','gpt-6-1-sol',[['low',42],['medium',48],['high',50],['xhigh',51],['max',52]],'2026-09-29'],
    ['gemini-4-argon','gemini-4-argon',[['high',53]],'2026-09-30'],
    ['gpt-6-astra','gpt-6-astra',[['low',46],['medium',50],['high',51],['xhigh',52],['max',53]],'2026-09-03'],
    ['claude-fable-5-1','claude-fable-5-1',[['low',47],['medium',49],['high',51],['xhigh',53],['max',53]],'2026-09-01'],
    ['gemini-3-8-flash','gemini-3-8-flash',[['low',33],['medium',40],['high',41]],'2026-09-02'],
    ['muse-spark-1-3','muse-spark-1-3',[['xhigh',45],['max',48]],'2026-09-02'],
    ['deepseek-v4-1-flash','deepseek-v4-1-flash',[['non-reasoning',25],['max',39]],null],
    ['glm53','glm-5-3',[['low',34],['max',45]],null],
    ['kimi-k3','kimi-k3',[['max',44]],null],
    ['qwen3-8-max-0902','qwen3-8-max',[['provider default',45]],'2026-09-15'],
    ['solar-mini-4','solar-mini4',[['provider default',24]],'2026-09-30'],
    ['mimo-v2-6-pro-api','mimo-v2-6-pro',[['provider default',46]],'2026-09-21'],
    ['mimo-v2-6-flash-api','mimo-v2-6-flash',[['provider default',38]],'2026-09-27'],
    ['gpt-6-sol','gpt-6-sol',[['none',29],['low',34],['medium',40],['high',42],['xhigh',44],['max',48]],'2026-09-22'],
    ['gpt-6-luna','gpt-6-luna',[['none',18],['low',22],['medium',30],['high',33],['xhigh',35],['max',38]],'2026-09-22'],
    ['claude-opus-5-5','claude-opus-5-5',[['low',42],['medium',51],['high',54],['xhigh',56],['max',58]],'2026-09-22'],
    ['claude-sonnet-5-5','claude-sonnet-5-5',[['medium',41],['high',47],['xhigh',52],['max',56]],'2026-09-28'],
    ['grok-4-7','grok-4-7',[['high',46],['xhigh',46]],'2026-09-22'],
    ['mercury-2-5','mercury-2-5',[['provider default',12]],'2026-09-23'],
    ['step-5-preview','step-5',[['provider default',44]],'2026-09-18'],
    ['ling-3-0-flash-fin','ling-3-0-flash-fin',[['provider default',23]],'2026-09-16'],
    ['ling-3-0-flash-vl','ling-3-0-flash-vl',[['provider default',25]],'2026-09-10'],
    ['k2-horizon-0-9b','k2-horizon-0-9b',[['provider default',3]],'2026-09-13'],
    ['k2-horizon-3-7b','k2-horizon-3-7b',[['provider default',16]],'2026-09-13'],
    ['k2-horizon-7b','k2-horizon-7b',[['provider default',21]],'2026-09-13'],
    ['k2-horizon-mova-36b-a4b','k2-horizon-mova-36b-a4b',[['provider default',25]],'2026-09-13'],
    ['k2-horizon-375b-a23b','k2-horizon-375b-a23b',[['provider default',31]],'2026-09-03'],
    ['minicpm5-2b','minicpm5-2b',[['provider default',12]],'2026-09-07'],
    ['jt-4-1-flash-236b-a21b','jt236b',[['reasoning',34]],'2026-09-29'],
    ['deepseek-v4-pro','deepseek-v4-pro',[['max',36],['non-reasoning',20]],null]
  ];
  const replaced=new Set(specs.map(s=>s[0]).concat('mimo-v2-6-pro-rl'));
  for(let i=rows.length-1;i>=0;i--)if(rows[i].benchmark==='aaIntelligence432'&&replaced.has(rows[i].modelId)&&rows[i].cohort!=='aa-intelligence-20261001')rows.splice(i,1);
  specs.forEach(([id,slug,scores,publishedAt])=>scores.forEach(([effort,score])=>{
    if(!models.some(m=>m.id===id))throw new Error('Unknown audited AA model '+id);
    const fallback=id.startsWith('claude-');
    // The release landing page exposes every effort in one verified table.
    add({modelId:id,benchmark:'aaIntelligence432',score,unit:'점',modelVariant:effort+(fallback?' · default fallback':''),
      cohort:'aa-v432-checked-20261001',cohortLabel:'AA v4.3.2 · 2026-10-01 확인 · 등록 모델 발췌',checkedAt,
      publishedAt:publishedAt&&publishedAt>='2026-09-19'?publishedAt:null,firstListedAt:publishedAt,
      evaluationDate:null,snapshotDate:null,rankMode:'reference',sourceType:'independent-leaderboard',
      source:aa+'models/'+slug,sourceLabel:'Artificial Analysis 모델 평가',methodologySource:method,
      benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',
      harness:'Artificial Analysis 독립 평가 · 평가별 하니스는 방법론 참조',tools:'평가별 허용 도구'+(fallback?' · default fallback enabled':''),
      reasoningBudget:'effort '+effort+' · 세부 토큰 예산 미기재',
      comparisonNote:'현재 v4.3.2 모델 페이지의 점수입니다. effort·fallback 차이를 유지하며 전체 리더보드 공식 순위를 뜻하지 않습니다.'});
  }));
  const sonnet=models.find(m=>m.id==='claude-sonnet-5-5');
  sonnet.benchmarkCaveat='AA Low 점수는 현재 미공개로, 이전에 등록된 36점은 제외했습니다. 출시 전 구조화 출력 버그가 있던 배포본 평가이며 재평가 여부는 원문을 확인하세요.';

  [
    ['programBench','ProgramBench · MiMo','Xiaomi 모델 카드 · 코드 에이전트'],
    ['mimoCodeBench','MiMo Code Bench','Xiaomi 자체 코드 평가'],
    ['mimoCyberBench','MiMo Cyber Bench','Xiaomi 자체 보안 평가'],
    ['mimoVisualCoding','MiMo VisualCoding','Xiaomi 자체 시각 코딩 평가'],
    ['osworldVerifiedMiMo','OSWorld-Verified · MiMo','Xiaomi 모델 카드'],
    ['cyberGymMiMo','CyberGym · MiMo','Xiaomi 모델 카드'],
    ['mimoCodeMini','MiMo Code (mini)','Xiaomi 내부 평가 · avg@3'],
    ['mimoCyberMini','MiMo Cyber (mini)','Xiaomi 내부 평가 · avg@3'],
    ['mimoGeneralMini','MiMo General (mini)','Xiaomi 내부 평가 · avg@1'],
    ['mimoVisualCodingMini','MiMo Visual Coding (mini)','Xiaomi 내부 평가 · avg@1'],
    ['officeQaMiMo','OfficeQA · MiMo SFT','Xiaomi 모델 카드 · avg@1'],
    ['aaBriefcaseRubric','AA-Briefcase v1.1 · rubric','Artificial Analysis · 독립 평가'],
    ['aaOmniscienceIndex','AA-Omniscience Index','정답·환각·거절을 반영한 지표'],
    ['aaGdpPdfAllPass','GDP.pdf · all-pass','Artificial Analysis · 독립 평가'],
    ['aaLcrSolar','AA-LCR · Upstage 인용','장문 추론 · 세부 버전 미기재'],
    ['sciCodeSolar','SciCode · Upstage 인용','Upstage가 인용한 AA 평가'],
    ['aaIntelligenceQuoted432','AA Intelligence Index v4.3.2 · 제공사 인용','정밀 수치 제공사 인용 · 독립 페이지 점수와 별도'],
    ['tau3BankingSolar','τ³-Banking · Upstage','별도 도구 사용 평가'],
    ['aaSpeechToSpeechQuality','AA Speech to Speech Quality Index','Google 공식 발표 인용'],
    ['tauVoiceGoogle','τ-Voice · Google','Google 공식 발표'],
    ['tauVoiceBankingGoogle','Sierra τ-Voice-banking · Google','Google 공식 발표'],
    ['bigBenchAudioGoogle','Big Bench Audio · Google','Google 공식 발표']
  ].forEach(args=>metric(...args));
  metric('museStreamingFinalWer','Streaming final-transcription WER · Muse','Meta 공식 발표의 AA 결과 인용','lower');
  metric('museDiarizationDer','Diarization DER · Muse','AMI-IHM · AMI-SDM · VoxConverse 평균','lower');
  metric('mercuryVoiceTtfatP50','Mercury Voice TTFAT · p50','실제 고객 서비스 프롬프트 · 낮을수록 좋음','lower');
  metric('mercuryVoiceTtfatP95','Mercury Voice TTFAT · p95','실제 고객 서비스 프롬프트 · 낮을수록 좋음','lower');
  function reported(id,benchmark,score,version,source,variant,unit='%',sourceType='provider-reported',publishedAt=null) {
    const previous=rows.find(r=>r.modelId===id&&r.benchmark===benchmark&&r.source===source&&r.sourceType===sourceType);
    const data={modelId:id,benchmark,score,unit,source,sourceLabel:sourceType==='independent-leaderboard'?'Artificial Analysis 독립 분석':'제공사 공식 평가 자료',
      modelVariant:variant,benchmarkVersion:version,cohort:previous?previous.cohort:'audit-20261001-'+id+'-'+benchmark,
      cohortLabel:(sourceType==='independent-leaderboard'?'AA 독립 평가':'제공사 보고')+' · 2026-10-01 확인',checkedAt,publishedAt,
      evaluationDate:null,snapshotDate:null,rankMode:'reference',sourceType,
      harness:sourceType==='independent-leaderboard'?'Artificial Analysis 평가 · 세부 하니스는 원문 참조':'공식 모델 카드/발표의 평가 · 상세 하니스 미기재',
      tools:'평가별 도구 · 원문 참조',reasoningBudget:variant+' · 세부 토큰 예산 미기재',
      comparisonNote:'평가 버전·하니스·추론 설정을 유지한 참고 수치. 다른 출처의 점수와 통합 순위를 매기지 않습니다.'};
    if(previous)Object.assign(previous,data);else add(data);
  }
  const mimoTable=[
    ['deepSWE',71.9,67.9,'DeepSWE v1.1'],['programBench',26.5,26.0,'ProgramBench'],['mimoCodeBench',63.2,61.2,'MiMo Code Bench'],
    ['automationBench',53.1,52.3,'AutomationBench v1.0.6'],['toolathlonVerifiedMiMo',76.9,73.6,'Toolathlon-Verified'],
    ['gdpvalAa21',1673,null,'GDPval-AA 2.1','Elo'],['agentsLastExam',31.6,27.6,'Agents’ Last Exam'],
    ['terminal4',34.9,28.8,'Terminal Bench 4.0'],['terminal21Provider',89.9,87.6,'Terminal Bench 2.1'],
    ['osworldVerifiedMiMo',82.0,80.8,'OSWorld-Verified'],['jobBench',62.0,61.2,'JobBench'],['cyberGymMiMo',94.0,95.1,'CyberGym'],
    ['mimoCyberBench',80.2,77.2,'MiMo Cyber Bench'],['exploitGym',17.8,6.0,'ExploitGym'],['exploitBench',47.9,25.3,'ExploitBench'],
    ['secBenchPro',66.3,47.5,'SEC Bench Pro'],['mimoVisualCoding',72.3,71.5,'MiMo VisualCoding']
  ];
  for(const [tier,column] of [['pro',1],['flash',2]]) {
    const id='mimo-v2-6-'+tier+'-rl',source=models.find(m=>m.id===id).source;
    mimoTable.forEach(item=>{if(item[column]!==null)reported(id,item[0],item[column],item[3],source,'설정 미기재',item[4]||'%','provider-reported','2026-09-22');});
  }
  const distill='mimo-v2-6-distill-qwen-9b',distillSource=models.find(m=>m.id===distill).source;
  [
    ['swePro',44.6,'SWE Pro','avg@3'],['mimoCodeMini',51.6,'MiMo Code (mini) · 내부 평가','avg@3'],
    ['mimoCyberMini',31.3,'MiMo Cyber (mini) · 내부 평가','avg@3'],['automationBench',30.3,'AutomationBench v1.0.6','avg@1'],
    ['toolathlonVerifiedMiMo',35.2,'Toolathlon-Verified','avg@1'],['officeQaMiMo',19.5,'OfficeQA','avg@1'],
    ['jobBench',18.3,'JobBench','avg@1'],['mimoGeneralMini',62.2,'MiMo General (mini) · 내부 평가','avg@1'],
    ['mimoVisualCodingMini',64.0,'MiMo Visual Coding (mini) · 내부 평가','avg@1']
  ].forEach(([key,score,version,average])=>reported(distill,key,score,version,distillSource,'SFT · '+average,'%','provider-reported','2026-09-22'));
  const muse=models.find(m=>m.id==='muse-voice-transcribe');
  reported(muse.id,'museStreamingFinalWer',3.1,'AA streaming final-transcription WER · Meta 인용',muse.source,'streaming final transcription');
  reported(muse.id,'museDiarizationDer',17.5,'AMI-IHM · AMI-SDM · VoxConverse 평균 DER',muse.source,'streaming diarization');
  reported('mercury-voice','mercuryVoiceTtfatP50',320,'Time to first answer token · p50',mercuryVoice,'low','ms','provider-reported','2026-09-29');
  reported('mercury-voice','mercuryVoiceTtfatP95',750,'Time to first answer token · p95',mercuryVoice,'low','ms','provider-reported','2026-09-29');
  [
    ['aaSpeechToSpeechQuality',82.6,'AA Speech to Speech Quality Index','점'],['tauVoiceGoogle',68.6,'τ-Voice','%'],
    ['tauVoiceBankingGoogle',35.1,'Sierra τ-Voice-banking','%'],['bigBenchAudioGoogle',97.7,'Big Bench Audio','%']
  ].forEach(([key,score,version,unit])=>reported('gemini-3-8-live-extended-thinking',key,score,version,live,'Extended Thinking',unit,'provider-reported','2026-09-15'));
  [
    ['aaIntelligenceQuoted432',24.1,'AA Intelligence Index v4.3.2','점'],['aaLcrSolar',83.3,'AA-LCR · 세부 버전 미기재','%'],
    ['sciCodeSolar',47.6,'SciCode','%'],['hle',19.6,'Humanity’s Last Exam','%'],['aaAutomationBench',22.3,'AutomationBench-AA','%'],
    ['tau3BankingSolar',47.2,'τ³-Banking','점']
  ].forEach(([key,score,version,unit])=>reported('solar-mini-4',key,score,version,solar,'Upstage 인용 · 설정 미기재',unit));
  const argonArticle=aa+'articles/gemini-4-argon-google-top-three-labs';
  [
    ['aaAutomationBench',78,'AutomationBench-AA','%'],['terminal4',57,'Terminal-Bench 4.0','%'],
    ['aaBriefcase11',1494,'AA-Briefcase v1.1','Elo'],['aaBriefcaseRubric',65,'AA-Briefcase v1.1 · rubric','%'],
    ['aaOmniscienceAccuracy',50,'AA-Omniscience Accuracy','%'],['aaOmniscienceHallucination',15,'AA-Omniscience Hallucination Rate','%'],
    ['aaOmniscienceIndex',42,'AA-Omniscience Index','점']
  ].forEach(([key,score,version,unit])=>reported('gemini-4-argon',key,score,version,argonArticle,'high',unit,'independent-leaderboard','2026-09-30'));
  [
    ['terminal4',59,'Terminal-Bench 4.0','%'],['aaAutomationBench',69,'AutomationBench-AA','%'],['aaGdpPdfAllPass',31,'GDP.pdf · all-pass','%'],
    ['aaOmniscienceAccuracy',63,'AA-Omniscience Accuracy','%'],['aaOmniscienceHallucination',51,'AA-Omniscience Hallucination Rate','%'],
    ['aaOmniscienceIndex',43,'AA-Omniscience Index','점']
  ].forEach(([key,score,version,unit])=>reported('gpt-6-astra',key,score,version,argonArticle,'max',unit,'independent-leaderboard','2026-09-30'));

  // The review scope includes September launches and service configurations.
  // Missing AA scores for text models mean unconfirmed, never a zero score.
  const specialist=new Set(['image','video','music','voice','world','3d']);
  models.filter(m=>(m.date||'')>='2026-09-01').forEach(m=>{
    const measured=rows.some(r=>r.modelId===m.id&&r.benchmark==='aaIntelligence432');
    m.checkedAt=checkedAt;
    m.benchmarkReview={checkedAt,source:m.source,aaStatus:measured?'verified':specialist.has(m.category)?'not-applicable':'unconfirmed',
      note:measured?'AA v4.3.2 점수·추론 설정 확인':specialist.has(m.category)?'일반 텍스트 지능 지표 적용 대상 아님 · 해당 분야 평가 참조':'현재 공개 AA v4.3.2 점수 미확인'};
  });
  specs.forEach(([id,slug])=>{
    const m=models.find(m=>m.id===id);
    if((m.date||'')<'2026-09-01')m.benchmarkReview={checkedAt,scope:'benchmark-only',source:aa+'models/'+slug,aaStatus:'verified',note:'AA v4.3.2 점수·추론 설정 확인'};
  });
  const snapshot={id:'aa-review-20261001',key:'aaIntelligence432',name:metrics.aaIntelligence432.name,checkedAt,snapshotDate:null,
    source:method,sourceLabel:'Artificial Analysis v4.3.2 방법론',version:'v4.3.2 · 2026-10-01 원문 확인',
    note:'등록 모델 발췌. 점수와 effort/fallback을 원문 대조했으며 공개되지 않은 Sonnet Low 값은 제외했습니다.'};
  const oldSnapshot=snapshots.find(s=>s.id===snapshot.id);
  if(oldSnapshot)Object.assign(oldSnapshot,snapshot);else snapshots.push(snapshot);
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
