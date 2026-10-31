/* Official-source review: 2026-10-26–2026-10-31, checked 2026-10-31 KST.
 * Release, preview, API, weight-publication, evaluation and retrieval dates remain separate.
 * Artificial Analysis Intelligence Index v5 (2026-10-27) is stored as its own metric and is
 * never merged with v4.3.2 rows: the two versions use different evaluation sets.
 */
function applyWeekly20261031(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-31';
  const src={
    terra:'https://openai.com/index/introducing-gpt-6-1-terra/',
    terraDocs:'https://developers.openai.com/api/docs/models/gpt-6.1-terra',
    terraCommunity:'https://community.openai.com/t/gpt-6-1-terra-delivering-fast-and-capable-computer-use-at-a-lower-price/1409900',
    terraAa:'https://artificialanalysis.ai/articles/gpt-6-1-terra-pushes-the-cost-efficiency-frontier',
    carbon:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/',
    carbonAa:'https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1',
    genie:'https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/',
    genieBlog:'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-genie-4/',
    argonChangelog:'https://ai.google.dev/gemini-api/docs/changelog',
    argonPricing:'https://ai.google.dev/gemini-api/docs/pricing',
    mistral:'https://mistral.ai/news/mistral-large-4-oss/',
    mistralHf:'https://huggingface.co/blog/mistral-large4',
    mistralDocs:'https://docs.mistral.ai/models/mistral-large-4-0',
    lfm3:'https://huggingface.co/blog/LiquidAI/lfm3',
    aaV5:'https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5',
    aaV5Board:'https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index'
  };
  function upsert(list,value,key) {const old=list.find(x=>key(x)===key(value));if(old)Object.assign(old,value);else list.push(value);}
  function model(value) {
    upsert(models,Object.assign({current:true,checkedAt,date:'',announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      weightsDate:null,scores:{},sourceStatus:'official',recordType:'model',regionTags:[],accessType:'api-only',license:'제공사 서비스 약관',
      benchmarkReview:{checkedAt,scope:'benchmark-only',source:value.source,aaStatus:'unconfirmed',note:'검증한 수치만 조건별 평가로 등록'}},value),x=>x.id);
  }
  function metric(key,name,description,direction) {
    metrics[key]=Object.assign({},metrics[key]||{},{key,name,description,direction:direction||'higher',rankable:false});
  }
  function add(value) {
    upsert(rows,Object.assign({checkedAt,evaluationDate:null,snapshotDate:null,publishedAt:null,rankMode:'reported',sourceType:'provider-reported',
      tools:'원문 평가 조건 참조',reasoningBudget:'세부 토큰 예산 미공개',comparisonNote:'동일 출처·버전·설정 안에서만 비교합니다.'},value),
      x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|'));
  }

  // OpenAI GPT-6.1 Terra — product, Codex and API launch on the same day.
  model({id:'gpt-6-1-terra',name:'GPT-6.1 Terra',family:'GPT-6.1',provider:'OpenAI',region:'US',category:'reasoning',
    date:'2026-10-26',announcementDate:'2026-10-26',releaseDate:'2026-10-26',apiDate:'2026-10-26',
    access:'ChatGPT Work · Codex (Plus/Pro/Enterprise/Edu) · OpenAI API · Microsoft Foundry',accessType:'api-only',license:'OpenAI API terms',
    params:'gpt-6.1-terra · 최대 입력 922K · 최대 출력 128K · none/low/medium/high/xhigh/max · 지식 기준일 2026-06-01',context:'1.05M tokens',
    modality:'텍스트 · 이미지 → 텍스트 · 도구 · 컴퓨터 사용',
    highlight:'GPT-5.6 Terra를 대체하는 중간 등급 모델. 컴퓨터 사용·시각 추론·업무 문서 작성을 Sol의 절반 가격에 제공',
    source:src.terraDocs,sourceLabel:'OpenAI GPT-6.1 Terra 공식 모델 사양',sources:[src.terra,src.terraDocs,src.terraCommunity,src.terraAa],
    note:'10월 26일 ChatGPT Work·Codex와 API에 동시 제공됐습니다. OpenAI는 Sol·Astra보다 작업 완료 속도가 3배 이상 빠르다고 밝혔지만, 가장 복잡한 코딩 작업에는 GPT-6.1 Sol·GPT-6 Astra를 권장합니다. 입력 272K를 초과하는 요청은 전체 요청에 장문 단가가 적용됩니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API · 입력 272K 이하',source:src.terraDocs,rates:[
      {label:'입력',amount:1},{label:'출력',amount:5},{label:'캐시 입력',amount:0.05},{label:'캐시 쓰기 · 30분',amount:1.25},{label:'캐시 쓰기 · 12시간',amount:2.5}],
      note:'입력 272K 초과 요청은 전체 입력·캐시 단가 2배, 출력 1.5배. Batch/Flex 50% 할인, Fast 2배는 별도.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.terraAa,aaStatus:'verified',note:'OpenAI 발표 Terminal-Bench 4.0과 AA 출시 분석(v4.3.2 48점·환각률 38%)을 분리 등록. AA v5 점수는 확인하지 못해 미등록'}});

  // Google DeepMind Gemini 4 Carbon — announced, limited to vetted cyber defenders.
  model({id:'gemini-4-carbon',name:'Gemini 4 Carbon',family:'Gemini 4',provider:'Google DeepMind',region:'US',category:'reasoning',
    date:'2026-10-28',announcementDate:'2026-10-28',previewDate:'2026-10-28',
    access:'사이버 방어 파트너 제한 제공 · 일반 API 일정 미발표',accessType:'api-only',license:'Google 서비스 약관',
    params:'공개 API 모델 ID 미발표',context:'공식 확인 필요',modality:'텍스트 · 이미지 등 멀티모달 → 텍스트 · 코드',
    highlight:'장기 코딩과 방어적 사이버보안에 초점을 둔 Google의 최상위 Gemini 4 모델',
    source:src.carbon,sourceLabel:'Google Gemini 4 Carbon 공식 발표',sources:[src.carbon,src.carbonAa],
    note:'10월 28일 발표 후 검증된 사이버 방어 인력에게 먼저 제공됐습니다. 개발자·기업·일반 사용자 제공 일정은 공개되지 않아 정식 출시일과 API 제공일은 비워 뒀습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:src.carbon,note:'일반 API는 아직 제공되지 않습니다. Google은 Argon과 같은 도입가(입력 $2 · 출력 $10 / 100만 토큰, 캐시 입력 95% 할인)로 출시할 예정이라고 밝혔습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.carbonAa,aaStatus:'verified',note:'Google 발표 사이버·장문 평가와 AA Intelligence Index v5 59점(high)을 출처별로 분리 등록'}});

  // Google DeepMind Genie 4 — world model research preview.
  model({id:'genie-4',name:'Genie 4',family:'Genie',provider:'Google DeepMind',region:'US',category:'world',
    date:'2026-10-27',announcementDate:'2026-10-27',previewDate:'2026-10-27',
    access:'Research preview · 신뢰 테스터 · Project Genie/Gemini API 예정',accessType:'custom-license',license:'연구 프리뷰 약관 · 가중치 비공개',
    params:'미기재',context:'실시간 상호작용 시뮬레이션',modality:'텍스트 · 이미지 프롬프트 → 실시간 월드 · 네이티브 오디오',
    highlight:'자연어로 실시간 조종하며 배경음·음악·대화를 함께 생성하는 월드 모델',
    source:src.genie,sourceLabel:'Google DeepMind Genie 4 공식 발표',sources:[src.genie,src.genieBlog],
    note:'10월 27일 신뢰 테스터 대상 연구 프리뷰로 공개됐습니다. Google AI Ultra의 Project Genie와 Gemini API·AI Studio 조기 파트너 제공은 "곧" 예정이라고만 밝혀 날짜를 기록하지 않았습니다. 메시를 출력하는 3D 모델과 구분합니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:src.genie,note:'공개 API와 요금이 발표되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.genie,aaStatus:'not-applicable',note:'일반 텍스트 지능 지표 적용 대상 아님 · 해당 분야 평가 참조'}});

  // Mistral Large 4 — improved checkpoint published as open weights on 2026-10-29.
  model({id:'mistral-large-4',name:'Mistral Large 4',family:'Mistral Large 4',provider:'Mistral AI',region:'Europe',category:'multimodal',
    date:'2026-10-29',announcementDate:'2026-10-29',releaseDate:'2026-10-29',apiDate:'2026-10-29',weightsDate:'2026-10-29',
    access:'Open weights · Hugging Face (FP8 / NVFP4) · Mistral API',accessType:'open-weights',
    license:'Mistral Ecosystem Open-Weight License · 수정 MIT · 타인에게 모델을 서비스로 제공할 때 별도 상용 계약',
    params:'약 1T (1.05T) total / 49B active 전문가 · 임베딩 포함 52B · low/medium/high 추론',context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',
    highlight:'10월 6일 프리뷰 이후 RL을 추가해 코딩·방어적 보안을 개선한 1T MoE 오픈 웨이트 모델',
    source:src.mistral,sourceLabel:'Mistral Large 4 오픈 웨이트 공식 발표',sources:[src.mistral,src.mistralHf,src.mistralDocs],
    note:'10월 29일 개선된 체크포인트의 FP8·NVFP4 가중치가 Hugging Face에 공개됐습니다. 프리뷰 API 기록(10월 6일)은 별도 항목으로 보존합니다. 라이선스는 가중치 사용·미세조정·상용 제품을 허용하지만 모델을 타인에게 서비스로 제공하려면 Mistral과 별도 계약이 필요하므로 OSI 오픈소스로 분류하지 않습니다.',
    apiPricing:{status:'unverified',checkedAt,source:src.mistralDocs,note:'보도에 따르면 API 단가가 입력 $0.70 · 출력 $2.10 / 100만 토큰으로 내려갔지만, 공식 가격 페이지에서 직접 확인하지 못해 검증값으로 등록하지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.mistral,aaStatus:'verified',note:'Mistral 발표 Terminal-Bench 4.0·FrontierCode 2.0·AA Cyber와 AA v5 26점(high)을 분리 등록'}});
  const preview=models.find(m=>m.id==='mistral-large-4-preview');
  if(preview){
    const supersededNote='10월 29일 개선 체크포인트의 가중치가 공개되어 현재 항목은 Mistral Large 4(mistral-large-4)입니다.';
    preview.current=false;
    if(!String(preview.note||'').includes(supersededNote))preview.note=((preview.note||'')+' '+supersededNote).trim();
  }

  // Liquid AI LFM3 — six open-weight 2B-class models on one LFM3-1.7B-Base backbone.
  const lfmCommon={provider:'Liquid AI',family:'LFM3',region:'US',date:'2026-10-27',announcementDate:'2026-10-27',releaseDate:'2026-10-27',weightsDate:'2026-10-27',
    access:'Open weights · Hugging Face',accessType:'open-weights',license:'LFM Open License v1.0',source:src.lfm3,sourceLabel:'Liquid AI LFM3 공식 발표',
    apiPricing:{status:'no-public-rate',checkedAt,source:src.lfm3,note:'오픈 웨이트 모델이며 공식 종량 API 단가는 확인되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.lfm3,aaStatus:'unconfirmed',note:'제공사 29개 평가 평균만 공개되어 개별 조건별 행은 등록하지 않음'}};
  [
    ['lfm3-1-7b','LFM3-1.7B','llm','1.73B · tri-hybrid · 16개 언어','256K tokens','텍스트 → 텍스트 · 도구','로컬 에이전트·도구 호출·구조화 출력을 위한 온디바이스 텍스트 모델','https://huggingface.co/LiquidAI/LFM3-1.7B'],
    ['lfm3-vl-2b','LFM3-VL-2B','multimodal','2B-class · 자체 비전 인코더','모델 카드 참조','텍스트 · 이미지 · 영상 → 텍스트','영상 입력을 처음 지원하는 LFM3 비전-언어 모델','https://huggingface.co/LiquidAI/LFM3-VL-2B'],
    ['lfm3-audio-2b','LFM3-Audio-2B','voice','2B-class','모델 카드 참조','오디오 · 텍스트 → 텍스트 · 음성','온디바이스 음성 이해·생성 모델','https://huggingface.co/LiquidAI/LFM3-Audio-2B'],
    ['lfm3-omni-2b','LFM3-Omni-2B','multimodal','2B-class · end-to-end omni','모델 카드 참조','텍스트 · 이미지 · 영상 · 오디오 → 텍스트 · 음성','ASR·VLM·LLM·TTS를 한 모델로 대체하는 Liquid AI의 첫 옴니 모델','https://huggingface.co/LiquidAI/LFM3-Omni-2B'],
    ['lfm3-d1-2b','d1-2B','reasoning','2B-class · decision model','모델 카드 참조','텍스트 · 이미지 · 영상 → 결정','텍스트·이미지·영상 입력으로 판단을 내리는 LFM3 결정 모델','https://huggingface.co/LiquidAI/d1-2B'],
    ['lfm3-d1-omni-2b','d1-Omni-2B','reasoning','2B-class · decision model','모델 카드 참조','텍스트 · 이미지 · 영상 · 오디오 → 결정','d1-2B에 오디오 입력을 더한 결정 모델','https://huggingface.co/LiquidAI/d1-Omni-2B']
  ].forEach(([id,name,category,params,context,modality,highlight,card])=>model(Object.assign({},lfmCommon,{id,name,category,params,context,modality,highlight,
    sources:[src.lfm3,card],note:'10월 27일 공개된 LFM3 1차 릴리스 6종 중 하나로, 모두 LFM3-1.7B-Base에서 학습됐습니다. 미세조정용 Base 체크포인트는 별도 모델로 집계하지 않습니다.'})));

  // Gemini 4 Argon general availability (2026-10-13) — previously recorded only as a limited preview.
  const argon=models.find(m=>m.id==='gemini-4-argon');
  if(argon){
    Object.assign(argon,{checkedAt,releaseDate:'2026-10-13',apiDate:'2026-10-13',availabilityUpdateDate:'2026-10-13',
      access:'유료 Gemini API · AI Studio · Vertex AI · Gemini 앱',params:'gemini-4-argon · 최대 출력 1M 토큰',
      apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'도입가 · 2026-11-30까지',source:src.argonPricing,rates:[
        {label:'입력',amount:2},{label:'출력',amount:10}],standardRates:[{label:'입력',amount:4},{label:'출력',amount:20}],
        note:'공식 가격 페이지 기준 12월 1일부터 입력 $4 · 출력 $20로 인상. 캐시 입력은 입력가 대비 95% 할인.'}});
    const gaNote='10월 13일 유료 Gemini API·Vertex AI 등에 정식 제공(GA)됐습니다.';
    if(!String(argon.note||'').includes(gaNote))argon.note=((argon.note||'')+' '+gaNote).trim();
    argon.sources=Array.from(new Set([].concat(argon.sources||[argon.source],[src.argonChangelog,src.argonPricing])));
  }

  metric('aaIntelligenceV5','Artificial Analysis Intelligence Index · v5','2026-10-27 개편. 60%가 비공개 테스트셋·정답 비공개 평가. v4.3.2 점수와 합치지 않습니다.');
  metric('frontierCode20','FrontierCode 2.0','Cognition이 만든 비공개 실저장소 코딩 에이전트 평가. 병합 가능 여부로 채점.');
  metric('terraFactualityError','GPT-6.1 Terra · 사실 오류 응답률','OpenAI 오류 유도 프롬프트 · low effort · 낮을수록 좋음','lower');

  // OpenAI-reported launch numbers.
  add({modelId:'gpt-6-1-terra',modelVariant:'max',benchmark:'terminal4',score:50.3,unit:'%',
    cohort:'openai-terra61-20261026',cohortLabel:'OpenAI GPT-6.1 Terra 발표 · 2026-10-26',source:src.terra,sourceLabel:'OpenAI GPT-6.1 Terra 공식 발표',
    publishedAt:'2026-10-26',benchmarkVersion:'Terminal-Bench 4.0',harness:'OpenAI 공식 출시 평가',tools:'터미널 도구',reasoningBudget:'effort max',
    comparisonNote:'OpenAI 발표 수치입니다. 같은 발표의 GPT-5.6 Terra는 21.5%이며 공개 보드 행과 합치지 않습니다.'});
  add({modelId:'gpt-6-1-terra',modelVariant:'low',benchmark:'terraFactualityError',score:16.7,unit:'%',
    cohort:'openai-terra61-20261026',cohortLabel:'OpenAI GPT-6.1 Terra 발표 · 2026-10-26',source:src.terra,sourceLabel:'OpenAI GPT-6.1 Terra 공식 발표',
    publishedAt:'2026-10-26',benchmarkVersion:'OpenAI 오류 유도 프롬프트 세트',harness:'OpenAI 내부 평가',tools:'도구 없음',reasoningBudget:'effort low',
    comparisonNote:'같은 조건의 GPT-5.6 Terra 53.6%와 비교한 제공사 수치입니다. 다른 사실성 평가와 합치지 않습니다.'});
  // Artificial Analysis launch-day analysis (published before the v5 switch).
  add({modelId:'gpt-6-1-terra',modelVariant:'max',benchmark:'aaIntelligence432',score:48,unit:'점',rankMode:'reference',sourceType:'independent-leaderboard',
    cohort:'aa-v432-checked-20261031',cohortLabel:'Artificial Analysis Intelligence Index · 2026-10-26 공개',source:src.terraAa,sourceLabel:'Artificial Analysis GPT-6.1 Terra 출시 분석',
    publishedAt:'2026-10-26',benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',harness:'Artificial Analysis 독립 10개 평가 구성',tools:'평가별 AA 허용 도구',
    reasoningBudget:'effort max · 평가 중 130M 출력 토큰',comparisonNote:'v5 개편(10월 27일) 하루 전 출시 분석 점수입니다. v5 점수와 합치지 않습니다.'});
  add({modelId:'gpt-6-1-terra',modelVariant:'max',benchmark:'aaOmniscienceHallucination',score:38,unit:'%',rankMode:'reference',sourceType:'independent-leaderboard',
    cohort:'aa-terra61-20261026-aaOmniscienceHallucination',cohortLabel:'Artificial Analysis GPT-6.1 Terra · 2026-10-26',source:src.terraAa,sourceLabel:'Artificial Analysis GPT-6.1 Terra 출시 분석',
    publishedAt:'2026-10-26',benchmarkVersion:'AA-Omniscience · hallucination rate',harness:'Artificial Analysis 비공개 지식 평가',tools:'도구 없음',reasoningBudget:'effort max',
    comparisonNote:'모를 때 추측한 비율입니다. 같은 분석의 GPT-5.6 Terra는 88%입니다.'});

  // Google-reported Gemini 4 Carbon numbers (same table style as the Argon launch).
  [['secBenchPro',88.2,'SEC-bench Pro','취약점 탐지'],['exploitGym',54.8,'ExploitGym','익스플로잇 검증'],['cweBench1',71.0,'CWE-bench v1','취약점 패치'],
   ['graphWalksLong',96.2,'GraphWalks · BFS F1 · 256K–1M','도구 없음']].forEach(([benchmark,score,benchmarkVersion,tools])=>add({
    modelId:'gemini-4-carbon',modelVariant:'highest thinking',benchmark,score,unit:'%',cohort:'google-carbon-launch-20261028',
    cohortLabel:'Google Gemini 4 Carbon 발표 · 2026-10-28',source:src.carbon,sourceLabel:'Google Gemini 4 Carbon 공식 발표',publishedAt:'2026-10-28',
    benchmarkVersion,harness:'Google 공식 출시 평가',tools,reasoningBudget:'최고 thinking · 세부 예산 미공개',rankMode:'reference',
    comparisonNote:'Google 발표 표의 수치입니다. 다른 모델의 수치는 출처·설정·하니스가 달라 동일 조건 순위로 합치지 않습니다.'}));
  add({modelId:'gemini-4-carbon',modelVariant:'high',benchmark:'terminal4',score:64,unit:'%',rankMode:'reference',sourceType:'independent-leaderboard',
    cohort:'aa-carbon-20261028-terminal4',cohortLabel:'Artificial Analysis Gemini 4 Carbon · 2026-10-28',source:src.carbonAa,sourceLabel:'Artificial Analysis Gemini 4 Carbon 분석',
    publishedAt:'2026-10-28',benchmarkVersion:'Terminal-Bench 4.0 (AA)',harness:'Antigravity CLI',tools:'터미널 도구',reasoningBudget:'high',
    comparisonNote:'AA 독립 실행 수치로 Google 발표 표와 합치지 않습니다.'});

  // Mistral-reported open-weight checkpoint numbers.
  [['terminal4',41,'%','Terminal-Bench 4.0','터미널 도구'],['frontierCode20',19.7,'%','FrontierCode 2.0','저장소 도구'],
   ['aaCyberIndexV1',51,'점','Artificial Analysis Cyber Index · v1 (Mistral 인용)','사이버 평가 도구']].forEach(([benchmark,score,unit,benchmarkVersion,tools])=>add({
    modelId:'mistral-large-4',modelVariant:'open-weight release',benchmark,score,unit,cohort:'mistral-ml4-oss-20261029',
    cohortLabel:'Mistral Large 4 오픈 웨이트 발표 · 2026-10-29',source:src.mistral,sourceLabel:'Mistral 공식 발표',publishedAt:'2026-10-29',
    benchmarkVersion,harness:'Mistral 공식 발표 평가',tools,reasoningBudget:'추론 모드별 원문 참조',rankMode:'reference',
    comparisonNote:'Mistral 발표 수치입니다. 10월 6일 프리뷰 수치·독립 보드 행과 합치지 않습니다.'}));

  // Artificial Analysis Intelligence Index v5 — registered models only, not the full ranking.
  [['gemini-4-carbon','high',59,src.carbonAa,'2026-10-28'],
   ['claude-opus-5-5','max · default fallback',58,src.aaV5Board,'2026-10-27'],
   ['claude-opus-5-5','xhigh · default fallback',57,src.aaV5Board,'2026-10-27'],
   ['gpt-6-astra','AA 대표 설정',57,src.carbonAa,'2026-10-28'],
   ['gemini-4-argon','AA 대표 설정',50,src.carbonAa,'2026-10-28'],
   ['mistral-large-4','high',26,src.aaV5Board,'2026-10-29'],
   ['mistral-large-4-preview','API preview',25,src.aaV5,'2026-10-27']
  ].forEach(([modelId,modelVariant,score,source,publishedAt])=>add({modelId,modelVariant,benchmark:'aaIntelligenceV5',score,unit:'점',
    rankMode:'reference',sourceType:'independent-leaderboard',cohort:'aa-v5-checked-20261031',cohortLabel:'Artificial Analysis Intelligence Index v5 · 2026-10-27–29',
    source,sourceLabel:'Artificial Analysis Intelligence Index v5',publishedAt,benchmarkVersion:'Artificial Analysis Intelligence Index · v5.0',
    harness:'Artificial Analysis v5 평가 구성 · 60% 비공개 세트',tools:'평가별 AA 허용 도구',reasoningBudget:modelVariant,
    comparisonNote:'등록 모델 발췌이며 전체 공식 순위가 아닙니다. v4.3.2 점수와 평가 구성이 달라 합치지 않습니다.'}));

  const checks={
    aaIntelligenceV5:[src.aaV5,'10월 27일 v5 개편 확인. Gemini 4 Carbon 59(high), Opus 5.5 58(max), Astra 57 등 등록 모델 발췌만 반영. GPT-6.1 Terra의 v5 점수는 1차 출처에서 확인하지 못해 미등록.'],
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','공식 MMLU-Pro 공간 점검. 이번 기간 신규 모델의 동일 하니스 공식 수치는 확인하지 못해 추가하지 않음.'],
    gpqa:['https://github.com/idavidrein/gpqa','GPQA 원 데이터와 이번 주 발표를 점검. 신규 모델의 GPQA Diamond 공식 수치를 확인하지 못함.'],
    aime2026:['https://matharena.ai/?comp=aime--aime_2026','MathArena AIME 2026 확인. 이번 주 신규 모델 결과가 없어 기존 코호트 유지.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','LiveCodeBench 공식 보드 확인. 버전·하니스가 명시된 신규 모델 결과 없음.'],
    mmmuPro:[src.terra,'OpenAI는 Terra가 모든 effort에서 GPT-5.6 Terra보다 높다고 밝혔지만 effort별 수치를 1차 출처에서 확인하지 못해 미등록.'],
    swe:['https://www.swebench.com/','SWE-bench 공식 보드 확인. 이번 주 신규 모델의 공식 SWE-bench 행은 확인하지 못함.'],
    terminal4:['https://www.tbench.ai/','Terra 50.3%(OpenAI·max), Mistral Large 4 41%(Mistral), Carbon 64%(AA·Antigravity CLI)를 출처별 코호트로 분리.'],
    arena:['https://arena.ai/leaderboard/chat/text','공식 Text Arena 페이지를 점검했으나 이번 확인일의 스냅샷 날짜·투표 수를 직접 확인하지 못해 새 순위 행을 추가하지 않음.']
  };
  for(const [key,[source,note]] of Object.entries(checks))upsert(snapshots,{id:'review-2026-10-31-'+key,key,name:metrics[key].name,checkedAt,
    snapshotDate:null,source,sourceLabel:'공식 1차 출처 확인',version:'수시 확인 기록',note},x=>x.id);

  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
