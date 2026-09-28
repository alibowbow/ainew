/* Official-source review 2026-09-21–28. Dates, licenses, prices and evaluation
 * conditions are deliberately kept separate. Reapplying is idempotent.
 */
function applyWeekly20260928(models, metrics, rows, snapshots) {
  const checkedAt='2026-09-28', unknown='미기재';
  const urls={
    altar:'https://huggingface.co/AikidoSec/altar-1',
    altarPost:'https://www.aikido.dev/blog/aikido-altar-open-weight-ai-sovereign-security',
    qwenImage:'https://huggingface.co/Qwen/Qwen-Image-2.1',
    qwenRepo:'https://github.com/QwenLM/Qwen-Image-2.1',
    lfm:'https://huggingface.co/LiquidAI/LFM2.5-VL-3B',
    dspark:'https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark',
    dsparkPost:'https://www.liquid.ai/blog/lfm2-5-vl-dspark',
    geminiLive:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/',
    geminiLiveDocs:'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api',
    geminiPricing:'https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing',
    geminiChangelog:'https://ai.google.dev/gemini-api/docs/changelog',
    mercury:'https://www.inceptionlabs.ai/blog/introducing-mercury-2-5',
    mercuryDocs:'https://docs.inceptionlabs.ai/get-started',
    mercuryPricing:'https://www.inceptionlabs.ai/models',
    aa:'https://artificialanalysis.ai/changelog',
    aaImage:'https://artificialanalysis.ai/image/leaderboard/text-to-image/open-weights',
    aaEdit:'https://artificialanalysis.ai/image/leaderboard/editing/open-weights'
  };
  function pricing(status, source, note, rates, unit, currency) {
    const p={status,checkedAt,source,note};
    if(rates){p.currency=currency||'USD';p.unit=unit;p.tier='표준 API';p.rates=rates.map(x=>({label:x[0],amount:x[1]}));}
    return p;
  }
  function model(value) {
    const data=Object.assign({current:true,checkedAt,announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      scores:{},sourceStatus:'official',recordType:'model'},value);
    data.regionTags=data.region==='China'?['China'].concat(/^open-/.test(data.accessType)?['China open weights']:[]):data.region==='Korea'?['Korea']:[];
    const old=models.find(m=>m.id===data.id);if(old)Object.assign(old,data);else models.push(data);
  }

  model({id:'aikido-altar-1',name:'Aikido Altar-1',family:'GLM-5.3',provider:'Aikido Security',region:'Europe',category:'reasoning',
    date:'2026-09-21',announcementDate:'2026-09-21',releaseDate:'2026-09-21',apiDate:null,
    access:'Open weights / custom license',accessType:'open-weights',license:'GLM-5.3 license (inherited)',
    params:'504B total · 약 40B active · W4A16 · 328GB',context:'128K serving configuration',
    modality:'텍스트 · 코드 · 도구 → 텍스트',highlight:'GLM-5.3 전문가 프루닝 기반 온프레미스 보안 추론 모델',
    source:urls.altar,sourceLabel:'Aikido 공식 모델 카드',
    note:'GLM-5.3에서 전문가 34.4%를 제거한 168/256-expert 파생 모델입니다. 새로 사전학습한 기반 모델이 아니라 보안 업무용 압축 체크포인트이며 라이선스는 기반 모델 조건을 상속합니다.',
    baseModelId:'glm53',recordType:'derivative',
    apiPricing:pricing('provider-dependent',urls.altar,'공개 가중치이며 표준 호스팅 API 단가는 없습니다. 4×H200 기준 직접 호스팅 비용은 인프라에 따라 달라집니다.')});

  model({id:'qwen-image-2-1',name:'Qwen-Image-2.1',family:'Qwen Image',provider:'Qwen',region:'China',category:'image',
    date:'2026-09-20',announcementDate:'2026-09-20',releaseDate:'2026-09-20',apiDate:null,
    access:'Open weights / research license',accessType:'open-weights',license:'Qwen Research License Agreement',params:'7B visual generator · 32-layer Single-Stream DiT',context:'최대 10개 참조 이미지 · 2K/RGBA',
    modality:'텍스트 · 이미지 · 마스크 → 이미지 · 투명 RGBA',highlight:'생성·편집·주체 추출·투명 이미지 생성을 통합한 Qwen 이미지 모델',
    source:urls.qwenImage,sourceLabel:'Qwen 공식 모델 카드',
    note:'공식 저장소의 2026-09-20 공개 기록을 사용했습니다. Apache 2.0이 아니라 Qwen Research License이므로 오픈소스 라이선스로 분류하지 않습니다.',
    apiPricing:pricing('no-public-rate',urls.qwenImage,'Artificial Analysis는 공식 API 없음으로 표시합니다. 공개 가중치 직접 실행 비용과 제3자 호스팅 요금은 별도입니다.')});

  model({id:'lfm2-5-vl-3b',name:'LFM2.5-VL-3B',family:'LFM2.5',provider:'Liquid AI',region:'US',category:'multimodal',
    date:'2026-08-12',announcementDate:'2026-08-12',releaseDate:'2026-08-12',apiDate:null,
    access:'Open weights / LFM license',accessType:'open-weights',license:'LFM Open License v1.0',params:'3.1B · SigLIP2 NaFlex 400M',context:'32,768 tokens',
    modality:'텍스트 · 이미지 → 텍스트 · 도구 호출',highlight:'OCR·화면 이해·그라운딩에 맞춘 온디바이스 VLM',
    source:urls.lfm,sourceLabel:'Liquid AI 공식 모델 카드',
    note:'DSpark의 대상 모델 계보를 완성하기 위해 기존 2026-08-12 모델을 함께 등록했습니다.',
    apiPricing:pricing('provider-dependent',urls.lfm,'공개 가중치 직접 호스팅 또는 Liquid AI와의 별도 계약이 필요하며 공개 표준 API 단가는 확인되지 않았습니다.')});

  model({id:'lfm2-5-vl-3b-dspark',name:'LFM2.5-VL-3B-DSpark',family:'LFM2.5',provider:'Liquid AI',region:'US',category:'multimodal',
    date:'2026-09-24',announcementDate:'2026-09-24',releaseDate:'2026-09-24',apiDate:null,
    access:'Open weights / LFM license',accessType:'open-weights',license:'LFM Open License v1.0',params:'279.5M BF16 draft model',context:'LFM2.5-VL-3B target · block 8/9',
    modality:'텍스트 · 이미지 → 텍스트 가속',highlight:'VLM 출력 품질을 유지하며 추측 디코딩을 가속하는 실험적 drafter',
    source:urls.dspark,sourceLabel:'Liquid AI 공식 DSpark 모델 카드',recordType:'configuration',baseModelId:'lfm2-5-vl-3b',
    note:'독립 품질 모델이 아니라 LFM2.5-VL-3B에 연결하는 speculative-decoding drafter입니다. 품질 점수는 기반 모델에, 속도 배수는 이 설정에 연결합니다.',
    apiPricing:pricing('provider-dependent',urls.dspark,'가속용 공개 가중치이며 독립 API 상품이 아닙니다. 대상 모델과 실행 하드웨어 비용은 별도입니다.')});

  model({id:'gemini-3-8-live',name:'Gemini 3.8 Live',family:'Gemini 3.8 Audio',provider:'Google DeepMind',region:'US',category:'voice',
    date:'2026-09-15',announcementDate:'2026-09-15',releaseDate:'2026-09-15',previewDate:null,apiDate:'2026-09-15',
    access:'Closed / API',accessType:'api-only',license:'Google Cloud terms',params:'gemini-3.8-live · stateful WebSocket',context:'공식 Live API 사양 참조',
    modality:'텍스트 · 이미지 · 영상 · 음성 → 텍스트 · 음성 · Avatar 영상',highlight:'실시간 대화·비동기 도구 호출·97개 언어 Live Avatar',
    source:urls.geminiLive,sourceLabel:'Google Gemini 3.8 Live with Live Avatar 발표',
    note:'기반 Live API는 2026-09-15 GA, Live Avatar 기능은 2026-09-24 Gemini Enterprise에서 GA되었습니다. Avatar를 별도 기반 모델로 중복 집계하지 않습니다.',
    updates:[{date:'2026-09-24',source:urls.geminiLive,note:'Live Avatar GA · 오디오와 비디오 출력에 SynthID 적용'}],
    apiPricing:pricing('verified',urls.geminiPricing,'Google Cloud non-global on-demand 기준. 모달리티별 토큰을 각각 과금합니다.',[
      ['텍스트 입력',0.75],['이미지·영상 입력',1],['음성 입력',3],['텍스트 출력',4.5],['음성 출력',12],['Avatar 영상 출력',1]
    ],'100만 토큰','USD')});

  model({id:'mercury-2-5',name:'Mercury 2.5',family:'Mercury',provider:'Inception',region:'US',category:'reasoning',
    date:'2026-09-08',announcementDate:'2026-09-08',releaseDate:'2026-09-08',apiDate:'2026-09-08',
    access:'Closed / API',accessType:'api-only',license:'Inception API terms',params:'mercury-2.5 · diffusion LLM · 1,107 tok/s reported',context:'260K tokens',
    modality:'텍스트 · 도구 → 텍스트',highlight:'고속 확산형 추론 LLM·병렬 도구 호출·구조화 출력',
    source:urls.mercury,sourceLabel:'Inception 공식 Mercury 2.5 발표',
    note:'출시는 9월 8일이지만 9월 23일 Artificial Analysis 독립 평가가 새로 공개돼 누락 계보와 함께 등록했습니다.',
    apiPricing:pricing('verified',urls.mercuryPricing,'공식 표준 단가. 출시 프로모션 $0.04/$0.15 MTok은 종료 시점이 명시되지 않아 기본 단가를 기록합니다.',[
      ['입력',0.20],['캐시 입력',0.02],['출력',0.75]
    ],'100만 토큰','USD')});

  // Google announced the TTS models on Sep 23, while the API changelog records GA on Sep 22.
  ['gemini-3-8-flash-tts','gemini-3-8-flash-lite-tts'].forEach(id=>{
    const m=models.find(x=>x.id===id);if(!m)return;
    m.announcementDate='2026-09-23';m.releaseDate='2026-09-22';m.apiDate='2026-09-22';m.date='2026-09-22';m.checkedAt=checkedAt;
    if(m.apiPricing)m.apiPricing.checkedAt=checkedAt;
    const dateNote='공식 발표일(9월 23일)과 Gemini API GA 기록일(9월 22일)을 분리했습니다.';
    if(!(m.note||'').includes(dateNote))m.note=((m.note||'')+' '+dateNote).trim();
  });

  function metric(key,name,description,direction,rankable) {metrics[key]={key,name,description,direction:direction||'higher',rankable:rankable!==false};}
  function add(value) {
    const r=Object.assign({checkedAt,evaluationDate:null,snapshotDate:null,unit:'%',rankMode:'reference',sourceType:'provider-reported',
      harness:unknown,tools:unknown,reasoningBudget:unknown,
      comparisonNote:'모델·도구·하니스·추론 예산이 다를 수 있어 이 점수로 공식 통합 순위를 만들지 않습니다.'},value);
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const old=rows.find(x=>key(x)===key(r));if(old)Object.assign(old,r);else rows.push(r);
  }

  // Current independent benchmark updates published Sep 23–24.
  [['mercury-2-5','provider default',12,'2026-09-23'],['glm53','low',34,'2026-09-24'],['deepseek-v4-1-flash','non-reasoning',25,'2026-09-24']]
    .forEach(([modelId,modelVariant,score,publishedAt])=>add({modelId,modelVariant,benchmark:'aaIntelligence432',score,unit:'점',publishedAt,
      benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',harness:'Artificial Analysis 독립 평가 · 세부 도구별 환경은 방법론 참고',
      tools:'방법론별 허용 도구',reasoningBudget:modelVariant+' · 세부 토큰 예산 미공개',source:urls.aa,sourceLabel:'Artificial Analysis 공식 변경 기록',
      sourceType:'independent-leaderboard',cohort:'aa-index-v432-20260923-24',cohortLabel:'Artificial Analysis · 2026-09-23–24 신규 결과',
      comparisonNote:'독립 지표의 신규 결과입니다. effort와 non-reasoning 설정을 별도 행으로 유지합니다.'}));

  add({modelId:'qwen-image-2-1',benchmark:'aaImageOpenWeightsOverall',score:1035,officialRank:1,uncertainty:10,votes:5151,unit:' Elo',
    snapshotDate:checkedAt,rankMode:'official',sourceType:'independent-leaderboard',benchmarkVersion:'Image Arena · Text to Image · All categories · Open Weights',
    harness:'Artificial Analysis 독립 블라인드 이미지 투표',tools:'이미지 생성 · 블라인드 선호도 투표',reasoningBudget:'생성 단계·추론 예산 미공개',
    source:urls.aaImage,sourceLabel:'Artificial Analysis 공식 오픈 웨이트 이미지 순위',
    cohort:'aa-image-open-weights-overall-20260927',cohortLabel:'Artificial Analysis 전체 이미지 · 오픈 웨이트 · 2026-09-27 확인',
    comparisonNote:'공식 전체 오픈 웨이트 순위의 점수·95% 신뢰구간·표본 수를 그대로 기록했습니다.'});

  metric('aaImageEditOpenWeights','AA Image Arena · 이미지 편집 (오픈 웨이트)','Artificial Analysis 이미지 편집 오픈 웨이트 공식 순위의 확인 가능한 모델 발췌. 원본 전체 순위를 보존합니다.','higher',true);
  [
    ['qwen-image-2-1',1071,1,10,5283],['hunyuan-image-3-instruct',1028,2,9,4414,'Fal'],
    ['flux-2-dev',1000,6,0,7608],['flux-2-dev-turbo',1000,5,8,4881,'Fal Turbo'],['flux-2-dev-flash',996,7,8,4962,'Fal Flash']
  ].forEach(([modelId,score,officialRank,uncertainty,votes,modelVariant])=>add({modelId,modelVariant,benchmark:'aaImageEditOpenWeights',score,officialRank,uncertainty,votes,unit:' Elo',
    snapshotDate:checkedAt,rankMode:'official',sourceType:'independent-leaderboard',benchmarkVersion:'Image Arena · Image Editing · Open Weights',
    harness:'Artificial Analysis 독립 블라인드 이미지 편집 투표',tools:'이미지 편집 · 블라인드 선호도 투표',reasoningBudget:'모델별 생성 단계·추론 예산 미공개',
    source:urls.aaEdit,sourceLabel:'Artificial Analysis 공식 이미지 편집 순위',cohort:'aa-image-edit-open-weights-20260928',
    cohortLabel:'Artificial Analysis 이미지 편집 · 오픈 웨이트 · 2026-09-28 확인',comparisonNote:'전체 표 중 레지스트리에 있는 모델만 발췌했으며 officialRank는 원본 전체 순위를 유지합니다.'}));

  add({modelId:'lfm2-5-vl-3b',benchmark:'mmmuPro',score:30.5,unit:'%',publishedAt:'2026-08-12',modelVariant:'10-choice multiple-choice',
    benchmarkVersion:'MMMU-Pro · 10-choice multiple-choice',harness:'Liquid AI · vLLM 0.26.0 · 권장 생성 파라미터 · non-reasoning',tools:'도구 없음',reasoningBudget:'직접 응답 · non-reasoning',
    source:urls.lfm,sourceLabel:'Liquid AI 공식 LFM2.5-VL-3B 평가 표',cohort:'liquid-lfm25-vl3b-mmmupro',cohortLabel:'Liquid AI 모델 카드 · 2026-08-12',
    comparisonNote:'제공사 보고 점수이며 10-choice 변형과 실행 조건을 다른 MMMU-Pro 행과 분리합니다.'});

  metric('vlDsparkDecodeSpeedup','LFM2.5-VL DSpark · 디코딩 가속','동일한 LFM2.5-VL-3B 출력에 대한 COCO 워크로드 디코딩 처리량 배수. 하드웨어별 조건 분리.','higher',false);
  metric('vlDsparkEndToEndSpeedup','LFM2.5-VL DSpark · E2E 가속','동일한 LFM2.5-VL-3B 출력에 대한 COCO 워크로드 종단간 처리량 배수. 하드웨어별 조건 분리.','higher',false);
  [['1×H100 · SGLang block 9',2.66,2.27,'BF16'],['Apple M5 Max · MLX-VLM block 8',3.13,2.59,'FP16'],['Apple M3 Ultra · llama.cpp block 8',2.14,1.77,'FP16']]
    .forEach(([modelVariant,decode,e2e,precision])=>[['vlDsparkDecodeSpeedup',decode],['vlDsparkEndToEndSpeedup',e2e]].forEach(([benchmark,score])=>add({
      modelId:'lfm2-5-vl-3b-dspark',modelVariant,benchmark,score,unit:'×',publishedAt:'2026-09-24',benchmarkVersion:'COCO · DSpark measured speedup',
      harness:modelVariant+' · batch 1 · temperature 0 · '+precision,tools:'LFM2.5-VL-3B target + DSpark drafter',reasoningBudget:'최대 2,048 출력 토큰',
      source:urls.dspark,sourceLabel:'Liquid AI 공식 DSpark 성능 표',cohort:'liquid-dspark-coco-'+benchmark,cohortLabel:'Liquid AI DSpark · COCO · 2026-09-24',
      comparisonNote:'동일 대상 모델 대비 처리량 배수이며 품질 점수나 서로 다른 하드웨어 간 종합 순위가 아닙니다.'})));

  metric('aikidoCveRecall','Aikido CVE 재발견 · 평균 recall','32개 알려진 취약점·30개 저장소·케이스당 3회 실행의 제공사 내부 보안 평가.','higher',false);
  metric('aikidoCveCoverage','Aikido CVE 재발견 · 3회 coverage','3회 중 한 번 이상 재발견한 CVE 수. 평균 recall과 별도.','higher',false);
  [['aikidoCveRecall',60.4,'평균 recall','%'],['aikidoCveCoverage',23,'3회 중 재발견',' / 32']].forEach(([benchmark,score,modelVariant,unit])=>add({
    modelId:'aikido-altar-1',modelVariant,benchmark,score,unit,publishedAt:'2026-09-21',benchmarkVersion:'Aikido internal CVE benchmark · 32 CVEs / 30 repos / 3 runs',
    harness:'Aikido AI Code Analysis harness · targeted CVE rediscovery',tools:'코드 분석 파이프라인 · 주변 단계에 다른 모델 사용',reasoningBudget:'케이스당 3회 · 세부 토큰 예산 미공개',
    source:urls.altarPost,sourceLabel:'Aikido Altar 공식 기술 발표',cohort:'aikido-altar-cve-20260921',cohortLabel:'Aikido 내부 CVE 평가 · 2026-09-21',
    comparisonNote:'블라인드 전체 코드베이스 탐색이나 익스플로잇 검증이 아닌 targeted rediscovery 평가입니다.'}));

  const audits={
    aaIntelligence432:[urls.aa,'9월 23–24일 Mercury 2.5, GLM-5.3 low, DeepSeek V4.1 Flash non-reasoning 신규 결과를 추가. effort별 조건 유지.'],
    aaImageOpenWeightsOverall:[urls.aaImage,'Qwen-Image-2.1 공식 오픈 웨이트 전체 1위 1035 ±10, 5,151표를 추가.'],
    aaImageEditOpenWeights:[urls.aaEdit,'2026-09-28 확인. 전체 순위 중 레지스트리에 연결 가능한 모델만 공식 순위와 표본 수를 보존해 발췌.'],
    mmmuPro:[urls.lfm,'LFM2.5-VL-3B의 10-choice MMMU-Pro 30.5를 non-reasoning/vLLM 조건으로 추가.'],
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','이번 기간 신규 공식 스냅샷 수치 확인되지 않아 기존 점수 유지.'],
    gpqa:['https://github.com/idavidrein/gpqa','이번 기간 신규 공식 GPQA Diamond 스냅샷 수치 확인되지 않아 기존 점수 유지.'],
    aime2026:['https://matharena.ai/','이번 기간 비교 가능한 신규 공식 AIME 2026 결과를 확인하지 못해 추정값을 추가하지 않음.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','공식 리더보드가 동적이며 이번 기간의 검증 가능한 새 정적 스냅샷 수치를 확인하지 못해 기존 상태 유지.'],
    swe:['https://www.swebench.com/','이번 기간 동일 하니스·동일 버전으로 추가할 신규 공식 점수를 확인하지 못함.'],
    terminal4:['https://www.tbench.ai/benchmarks','제공사 발표의 하니스 차이를 유지했으며 이번 기간 새 공식 공통 스냅샷은 확인되지 않음.'],
    arena:['https://arena.ai/leaderboard/text','새 공식 Text Arena 정적 스냅샷 수치를 확인하지 못해 2026-09-13 등록 순위를 유지.']
  };
  Object.entries(audits).forEach(([key,[source,note]])=>{
    if(!metrics[key])return;
    const value={id:'review-2026-09-28-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'공식 1차 출처 확인',note,version:'수시 확인 기록'};
    const old=snapshots.find(x=>x.id===value.id);if(old)Object.assign(old,value);else snapshots.push(value);
  });
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
}
