/* Official-source review 2026-09-21–23. Source date and evaluation date are distinct.
 * Reapplying this migration does not duplicate models, scores or audit snapshots.
 */
function applyWeekly20260923(models, metrics, rows, snapshots) {
  const checkedAt='2026-09-23', unknown='미기재';
  const urls={
    openai:'https://developers.openai.com/api/docs/changelog',
    openaiScores:'https://openai.com/index/introducing-gpt-6-sol-and-luna/',
    opus:'https://platform.claude.com/docs/en/models/opus-5-5/overview',
    opusScores:'https://www.anthropic.com/claude-opus-5-5',
    grok:'https://docs.x.ai/developers/grok-4-7',
    grokScores:'https://x.ai/news/grok-4-7',
    pro:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL',
    flash:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL',
    distill:'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B',
    aa:'https://artificialanalysis.ai/changelog',
    aaMethod:'https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index',
    googleTts:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/',
    googleFlashTts:'https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts',
    googleLiteTts:'https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-lite-tts'
  };
  function model(value){
    const data=Object.assign({current:true,checkedAt,announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      scores:{},sourceStatus:'official',recordType:'model'},value);
    const old=models.find(m=>m.id===data.id);if(old)Object.assign(old,data);else models.push(data);
  }
  [['gpt-6-sol','GPT-6 Sol','복잡한 코딩·에이전트 작업'],['gpt-6-luna','GPT-6 Luna','대량의 저비용 작업']].forEach(([id,name,highlight])=>model({
    id,name,family:'GPT-6',provider:'OpenAI',region:'US',category:'reasoning',date:'2026-09-22',
    announcementDate:'2026-09-22',releaseDate:'2026-09-22',apiDate:'2026-09-22',
    access:'Closed / API',accessType:'api-only',license:'OpenAI 이용약관',params:id,context:'1,050,000 tokens',
    modality:'텍스트 · 이미지 → 텍스트',highlight,source:urls.openai,sourceLabel:'OpenAI API 출시 기록',
    note:'최대 출력 128,000 tokens. ChatGPT/ Codex 제공 시점과 API 출시일을 혼동하지 않습니다.'}));
  model({id:'claude-opus-5-5',name:'Claude Opus 5.5',family:'Claude 5.5',provider:'Anthropic',region:'US',category:'reasoning',
    date:'2026-09-22',announcementDate:'2026-09-22',releaseDate:'2026-09-22',apiDate:'2026-09-22',
    access:'Closed / API',accessType:'api-only',license:'Anthropic 이용약관',params:'claude-opus-5-5',context:'1M tokens',
    modality:'텍스트 · 이미지 → 텍스트',highlight:'장기 코딩 에이전트·지식 작업',source:urls.opus,sourceLabel:'Anthropic Claude Platform 모델 사양',
    note:'최대 출력 128K tokens. Fast mode는 같은 모델의 서비스 속도 옵션이며 별도 모델로 집계하지 않습니다.'});
  model({id:'grok-4-7',name:'Grok 4.7',family:'Grok 4',provider:'SpaceXAI',region:'US',category:'reasoning',
    date:'2026-09-21',announcementDate:'2026-09-21',releaseDate:'2026-09-21',apiDate:'2026-09-21',
    access:'Closed / API',accessType:'api-only',license:'SpaceXAI 이용약관',params:'grok-4.7',context:'500,000 tokens',
    modality:'텍스트 · 이미지 → 텍스트',highlight:'코딩·에이전트·지식 작업',source:urls.grok,sourceLabel:'SpaceXAI Grok API 문서',
    note:'Grok 4.7 Fast는 동일 모델의 빠른 제공 옵션; 공개 API에는 별도 제공되지 않습니다.'});
  [["mimo-v2-6-pro-rl",'MiMo-V2.6-Pro-RL','1.02T total / 42B active','플래그십 멀티모달 에이전트',urls.pro],
   ["mimo-v2-6-flash-rl",'MiMo-V2.6-Flash-RL','309B total / 15B active','고효율 멀티모달 에이전트',urls.flash]].forEach(([id,name,params,highlight,source])=>model({
    id,name,family:'MiMo V2.6',provider:'Xiaomi MiMo',region:'China',category:'multimodal',
    date:'2026-09-22',announcementDate:'2026-09-22',releaseDate:'2026-09-22',apiDate:null,
    access:'Open weights / MIT',accessType:'open-source-license',license:'MIT',params,context:'1M tokens',
    modality:'텍스트 · 이미지 · 영상 · 음성 → 텍스트',highlight,source,sourceLabel:'Xiaomi MiMo 공식 모델 카드',
    note:'공식 가중치와 MIT 라이선스 확인. Xiaomi API 소개는 확인했으나 해당 체크포인트의 최초 API 제공일은 별도 확인하지 못했습니다.'}));
  model({id:'mimo-v2-6-distill-qwen-9b',name:'MiMo-V2.6-Distill-Qwen-9B',family:'MiMo V2.6',provider:'Xiaomi MiMo',region:'China',category:'multimodal',
    date:'2026-09-22',announcementDate:'2026-09-22',releaseDate:'2026-09-22',apiDate:null,
    access:'Open weights / MIT',accessType:'open-source-license',license:'MIT',params:'9B · Qwen3.5-9B 기반 SFT',context:unknown,
    modality:'텍스트 · 이미지 → 텍스트',highlight:'에이전트 연구를 위한 공개 증류 체크포인트',source:urls.distill,sourceLabel:'Xiaomi MiMo 공식 증류 모델 카드',
    note:'MiMo-V2.6-Pro/Flash와 별개인 9B SFT 모델. API 최초 제공일과 컨텍스트 한도는 확인되지 않았습니다.'});
  [
    ['gemini-3-8-flash-tts','Gemini 3.8 Flash TTS','gemini-3.8-flash-tts',urls.googleFlashTts,
      '130개 언어 · 창작용 음성 디자인·2인 대화',
      'Hume Voice Design 전체 71.4, 악센트 60.8은 Google 발표 수치입니다. Voice Arena의 언어별 순위는 숫자가 공개되지 않아 추가하지 않았습니다.'],
    ['gemini-3-8-flash-lite-tts','Gemini 3.8 Flash-Lite TTS','gemini-3.8-flash-lite-tts',urls.googleLiteTts,
      '101개 언어 · 대량 제작용 음성 합성',
      'Google 발표에서 Hume 음성 품질 지수 2위로 소개했지만 점수는 공개하지 않아 수치를 등록하지 않았습니다.']
  ].forEach(([id,name,params,source,highlight,note])=>model({
    id,name,family:'Gemini 3.8 Audio',provider:'Google DeepMind',region:'US',category:'voice',
    date:'2026-09-23',announcementDate:'2026-09-23',releaseDate:'2026-09-23',previewDate:null,apiDate:'2026-09-23',
    access:'Closed / API',accessType:'api-only',license:'Google Gemini API 이용약관',params,context:'8,192 tokens (입력)',
    modality:'텍스트 → 음성',highlight,source,sourceLabel:'Google Gemini API 모델 사양',
    note:note+' 출시일부터 Gemini API·AI Studio 단계적 제공; 기업용 Gemini Enterprise API는 추후 예정.'
  }));

  function metric(key,name,description){metrics[key]={key,name,description,rankable:false};}
  function add(value){
    const r=Object.assign({checkedAt,evaluationDate:null,snapshotDate:null,unit:'%',rankMode:'reference',sourceType:'provider-reported',
      harness:unknown,tools:unknown,reasoningBudget:unknown,
      comparisonNote:'모델·도구·하니스·추론 예산이 다를 수 있어 이 점수로 공식 통합 순위를 만들지 않습니다.'},value);
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const old=rows.find(x=>key(x)===key(r));if(old)Object.assign(old,r);else rows.push(r);
  }
  metric('aaIntelligence432','Artificial Analysis Intelligence Index · 2026-09-22','독립 평가 · v4.3.2 방법론 · 공개된 모델/effort만 발췌');
  // The changelog is an official benchmark source, not a model-provider comparison.
  // Scores are rounded index points, not percentages. Variants are separate rows.
  [
    ['claude-opus-5-5',[["max",58],["xhigh",56],["high",54],["medium",51],["low",42]],'2026-09-22','default fallback enabled'],
    ['gpt-6-sol',[["max",48],["xhigh",44],["high",43],["medium",40],["low",34],["none",28]],'2026-09-22','fallback 미기재'],
    ['gpt-6-luna',[["max",37],["xhigh",34],["high",32],["medium",29],["low",21],["none",18]],'2026-09-22','fallback 미기재'],
    ['grok-4-7',[["xhigh",46],["high",46]],'2026-09-21','fallback 미기재'],
    ['mimo-v2-6-pro-rl',[["provider default",46]],'2026-09-21','fallback 미기재']
  ].forEach(([modelId,variants,publishedAt,fallback])=>variants.forEach(([effort,score])=>add({
    modelId,modelVariant:effort,benchmark:'aaIntelligence432',score,unit:'점',publishedAt,
    benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2 (2026-09-19 방법론 개정)',
    harness:'Artificial Analysis 독립 평가 · 세부 도구별 환경은 방법론 참고',tools:'방법론별 허용 도구 · '+fallback,
    reasoningBudget:'effort '+effort+' · 세부 토큰 예산 미공개',source:urls.aa,sourceLabel:'Artificial Analysis 공식 변경 기록',
    sourceType:'independent-leaderboard',methodologySource:urls.aaMethod,
    cohort:'aa-index-v432-20260921-22',cohortLabel:'Artificial Analysis · 2026-09-21–22 · 등록 점수 발췌',
    comparisonNote:'독립 지표의 발췌 점수입니다. 모델별 effort·fallback 차이를 구분하며 전체 리더보드 공식 순위는 아닙니다.'
  })));

  function providerScores(modelId,publishedAt,source,sourceLabel,items){
    items.forEach(([benchmark,score,version,effort,harness,tools,unit])=>add({
      modelId,modelVariant:effort,benchmark,score,unit:unit||'%',publishedAt,benchmarkVersion:version,
      harness,tools,reasoningBudget:effort+' · 세부 토큰 예산 미기재',source,sourceLabel,
      cohort:'review-20260923-'+modelId+'-'+benchmark+'-'+sourceLabel.split(' ')[0],
      cohortLabel:sourceLabel+' · '+publishedAt+' · '+effort
    }));
  }
  providerScores('gpt-6-sol','2026-09-22',urls.openaiScores,'OpenAI 공식 발표',[
    ['automationBench',33.2,'AutomationBench 1.0.6','xhigh','OpenAI · Zapier workflow · 상세 에이전트 하니스 미기재','47 workflow tools'],
    ['deepSWE',68.8,'DeepSWE v1.1','max','OpenAI 코딩 에이전트 · 상세 하니스 미기재','코딩 에이전트 도구'],
    ['agentsLastExam',56.4,"Agents’ Last Exam V1",'max','OpenAI 에이전트 · 상세 하니스 미기재','컴퓨터 작업 도구'],
    ['osWorld2Offline',60.5,'OSWorld 2.0 · offline v2026.08.08 · partial reward','xhigh','OpenAI 컴퓨터 사용 에이전트 · offline subset','컴퓨터 사용']
  ]);
  metric('osWorld2Offline','OSWorld 2.0 · offline partial','2026-08-08 offline subset의 partial reward; 다른 OSWorld 평가와 분리');
  providerScores('gpt-6-luna','2026-09-22',urls.openaiScores,'OpenAI 공식 발표',[
    ['deepSWE',66.6,'DeepSWE v1.1','max','OpenAI 코딩 에이전트 · 상세 하니스 미기재','코딩 에이전트 도구']
  ]);
  providerScores('claude-opus-5-5','2026-09-22',urls.opusScores,'Anthropic 공식 발표',[
    ['terminal4',66.4,'Terminal-Bench 4.0 · 5 trials/task','xhigh','Claude Code · 5 trials/task · Anthropic 재현 환경','터미널 · Claude Code'],
    ['frontierCode',54.4,'FrontierCode v1.1 Main','max','Anthropic 발표 평가 · 상세 하니스 미기재','코딩 에이전트 도구'],
    ['cursorBench4',57.8,'CursorBench 4.0','max','Anthropic 발표 평가 · 상세 하니스 미기재','코딩 에이전트 도구'],
    ['terminalScience01',58.7,'Terminal-Bench-Science 0.1 · 3 trials/task','max','Claude Code · 3 trials/task · Anthropic 재현 환경','과학 터미널 작업 도구']
  ]);
  metric('cursorBench4','CursorBench 4.0','제공사별 하니스가 다른 코딩 에이전트 평가');
  metric('terminalScience01','Terminal-Bench-Science 0.1','3 trials/task · Claude Code 하니스 평가');
  providerScores('grok-4-7','2026-09-21',urls.grokScores,'SpaceXAI 공식 발표',[
    ['cursorBench4',46.3,'CursorBench 4.0','xhigh','SpaceXAI 발표 · Grok Build 상세 구성 미기재','코딩 에이전트 도구'],
    ['deepSWE',71.0,'DeepSWE v1.1','high','SpaceXAI 발표 · 세부 하니스 미기재','코딩 에이전트 도구'],
    ['terminal4',37.6,'Terminal-Bench 4.0','xhigh','SpaceXAI 발표 · 세부 하니스 미기재','터미널 작업 도구']
  ]);
  [
    ['mimo-v2-6-pro-rl',urls.pro,[71.9,53.1,34.9,76.9]],
    ['mimo-v2-6-flash-rl',urls.flash,[67.9,52.3,28.8,73.6]]
  ].forEach(([id,source,scores])=>providerScores(id,'2026-09-22',source,'Xiaomi 공식 카드',[
    ['deepSWE',scores[0],'DeepSWE v1.1','설정 미기재','Xiaomi 공식 카드 · 하니스 미기재','코딩 에이전트 도구'],
    ['automationBench',scores[1],'AutomationBench v1.0.6','설정 미기재','Xiaomi 공식 카드 · 하니스 미기재','업무 자동화 도구'],
    ['terminal4',scores[2],'Terminal-Bench 4.0','설정 미기재','Xiaomi 공식 카드 · 하니스 미기재','터미널 도구'],
    ['toolathlonVerifiedMiMo',scores[3],'Toolathlon-Verified','설정 미기재','Xiaomi 공식 카드 · 하니스 미기재','에이전트 도구']
  ]));
  metric('toolathlonVerifiedMiMo','Toolathlon-Verified · Xiaomi','Xiaomi 공식 카드 제공사 보고 점수; 조건 미공개');
  providerScores('mimo-v2-6-distill-qwen-9b','2026-09-22',urls.distill,'Xiaomi 공식 카드',[
    ['sweVerifiedMiMoDistill',61.1,'SWE-bench Verified · avg@3','SFT · avg@3','Xiaomi 증류 모델 카드 · 하니스 미기재','코딩 에이전트 도구'],
    ['terminal21MiMoDistill',37.1,'Terminal-Bench 2.1 · avg@1','SFT · avg@1','Xiaomi 증류 모델 카드 · 하니스 미기재','터미널 도구']
  ]);
  metric('sweVerifiedMiMoDistill','SWE-bench Verified · MiMo SFT','Xiaomi 증류 체크포인트 avg@3; 다른 SWE-bench 조건과 분리');
  metric('terminal21MiMoDistill','Terminal-Bench 2.1 · MiMo SFT','Xiaomi 증류 체크포인트 avg@1; 4.0과 분리');
  metric('humeVoiceDesignOverall','Hume Voice Design · 전체','Google의 2026-09-23 발표에 인용된 음성 디자인 평가. 백분율이 아닌 공개 원문 수치.');
  metric('humeVoiceDesignAccent','Hume Voice Design · 악센트','Google의 2026-09-23 발표에 인용된 악센트 모델링 평가. 백분율이 아닌 공개 원문 수치.');
  [['humeVoiceDesignOverall',71.4,'전체'],['humeVoiceDesignAccent',60.8,'악센트']].forEach(([benchmark,score,label])=>add({
    modelId:'gemini-3-8-flash-tts',benchmark,score,unit:'점',publishedAt:'2026-09-23',
    benchmarkVersion:'Hume AI Voice Design Benchmark · Google 2026-09-23 발표',
    harness:'Google 공식 발표에 상세 평가 실행 환경 미기재',tools:'미기재 · TTS 음성 생성',
    reasoningBudget:'해당 없음 · 음성 합성',source:urls.googleTts,sourceLabel:'Google Gemini 3.8 TTS 발표',
    cohort:'google-tts-20260923-'+benchmark,cohortLabel:'Google 공식 발표 · Hume Voice Design '+label,
    comparisonNote:'Google이 인용한 Hume 평가의 제공사 보고 수치입니다. 평가 실행일·원시 데이터·세부 하니스는 미공개이며 다른 음성 순위와 합치지 않습니다.'
  }));
  metric('aaCodingAgent15','Artificial Analysis Coding Agent Index · 2026-09-22','독립 에이전트 지표 v1.5 · 네이티브 하니스 차이');
  [['gpt-6-sol',57,'max','Codex',urls.openaiScores,'2026-09-22'],
   ['gpt-6-luna',41,'max','Codex',urls.openaiScores,'2026-09-22'],
   ['grok-4-7',56,'xhigh','Grok Build','https://artificialanalysis.ai/articles/benchmarking-grok-4-7','2026-09-21']].forEach(([modelId,score,effort,harness,source,publishedAt])=>add({
    modelId,modelVariant:effort,benchmark:'aaCodingAgent15',score,unit:'점',publishedAt,benchmarkVersion:'Artificial Analysis Coding Agent Index v1.5',
    harness,tools:'해당 제공사 코딩 에이전트 도구',reasoningBudget:'effort '+effort+' · 토큰 예산 미기재',
    source:modelId==='grok-4-7'?source:'https://artificialanalysis.ai/articles/gpt-6-sol-and-luna-push-the-cost-efficiency-frontier',
    sourceLabel:'Artificial Analysis 공식 평가',sourceType:'independent-leaderboard',
    cohort:'aa-coding-20260921-22-'+harness,cohortLabel:'Artificial Analysis · '+harness+' · '+publishedAt,
    comparisonNote:'네이티브 코딩 하니스가 달라 모델 단독 성능이나 통합 순위로 해석하지 않습니다.'
  }));

  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  models.forEach(m=>{m.regionTags=m.region==='China'?['China'].concat(/^open-/.test(m.accessType)?['China open weights']:[]):m.region==='Korea'?['Korea']:[];});
  const audit={
    aaIntelligence432:[urls.aa,'9월 19일 방법론 v4.3.2 업데이트, 21–22일 모델별 결과. 새 모델과 effort별 공식 발췌만 등록; 전체 순위가 아님.'],
    aaCodingAgent15:['https://artificialanalysis.ai/agents/coding-agents','제공사별 네이티브 코딩 하니스가 달라 별도 조건으로 유지.'],
    humeVoiceDesignOverall:[urls.googleTts,'Gemini 3.8 Flash TTS 71.4; Google 발표 인용. Flash-Lite의 Hume 음성 품질 2위는 숫자가 없어 점수 행을 등록하지 않음.'],
    humeVoiceDesignAccent:[urls.googleTts,'Gemini 3.8 Flash TTS 악센트 모델링 60.8; Google 발표 인용. 실행일·상세 하니스는 확인되지 않음.'],
    terminal4:['https://www.tbench.ai/benchmarks','제공사별 4.0 점수는 하니스/effort가 다르므로 출처별로 분리.'],
    sweVerifiedMiMoDistill:[urls.distill,'증류 SFT 모델 avg@3 61.1%; 에이전트 하니스 미공개.'],
    arena:['https://arena.ai/leaderboard/text','이번 검토에서 새 독립 Text Arena 스냅샷 수치를 확인하지 못해 기존 순위를 유지.'],
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','신규 공식 수치 확인되지 않아 변경 없음.'],
    gpqa:['https://github.com/idavidrein/gpqa','신규 공식 수치 확인되지 않아 변경 없음.'],
    aime2026:['https://matharena.ai/','신규 공식 AIME 2026 수치 확인되지 않아 변경 없음.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','신규 공식 수치 확인되지 않아 변경 없음.'],
    mmmuPro:['https://mmmu-benchmark.github.io/','공식 사이트 마지막 갱신 표기는 2025-09-05. 새 검증 수치가 없어 기존 점수를 유지.']
  };
  Object.entries(audit).forEach(([key,[source,note]])=>{
    const value={id:'review-2026-09-23-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,
      source,sourceLabel:'공식 1차 출처 확인',note,version:'수시 확인 기록'};
    const old=snapshots.find(x=>x.id===value.id);if(old)Object.assign(old,value);else snapshots.push(value);
  });
}
