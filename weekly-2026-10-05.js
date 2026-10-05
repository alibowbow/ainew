/* Official-source review: 2026-09-28–2026-10-04, checked 2026-10-05 KST.
 * Keep publication, preview, API, evaluation and retrieval dates separate.
 */
function applyWeekly20261005(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-05';
  const ms='https://microsoft.ai/news/our-first-streaming-transcription-model/';
  const ling='https://vercel.com/changelog/ling-3-1-flash-is-now-available-on-ai-gateway';
  const mini='https://platform.minimax.io/docs/guides/text-generation';
  const aa='https://artificialanalysis.ai/';
  function upsert(list,value,key) {const old=list.find(x=>key(x)===key(value));if(old)Object.assign(old,value);else list.push(value);}
  function model(value) {
    upsert(models,Object.assign({current:true,checkedAt,date:'',announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      scores:{},sourceStatus:'official',recordType:'model',regionTags:[],accessType:'api-only',license:'제공사 서비스 약관',
      benchmarkReview:{checkedAt,scope:'benchmark-only',source:value.source,aaStatus:'unconfirmed',note:'검증한 수치만 별도 평가로 등록'}},value),x=>x.id);
  }
  function pricing(amount,unit,note) {return {status:'verified',checkedAt,currency:'USD',unit,tier:'공식 API',source:ms,rates:[{label:'처리',amount}],note};}
  model({id:'mai-transcribe-2-streaming',name:'MAI-Transcribe-2-Streaming',family:'MAI Transcribe',provider:'Microsoft AI',region:'US',category:'voice',
    date:'2026-10-01',announcementDate:'2026-10-01',previewDate:'2026-10-01',apiDate:'2026-10-01',
    access:'API · public preview',license:'Microsoft Azure preview terms',params:'MAI-Transcribe-2-Streaming',context:'실시간 스트리밍 · 60개 언어',
    modality:'음성 → 텍스트',highlight:'부분·최종 전사와 연속 언어 감지를 지원하는 스트리밍 음성 인식',source:ms,sourceLabel:'Microsoft AI 공식 발표',
    note:'Microsoft Learn에서 public preview로 명시하므로 GA일은 미기재입니다.',
    sources:[ms,'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-transcribe-2-streaming'],
    apiPricing:pricing(0.54,'음성 1시간','2026년 말까지 출시 단가. 이후 단가는 미발표입니다.')});
  [['mai-voice-2-1','MAI-Voice-2.1',22],['mai-voice-2-1-flash','MAI-Voice-2.1-Flash',15]].forEach(([id,name,amount])=>model({
    id,name,family:'MAI Voice',provider:'Microsoft AI',region:'US',category:'voice',date:'2026-10-01',announcementDate:'2026-10-01',previewDate:'2026-10-01',apiDate:'2026-10-01',
    access:'API · public preview',license:'Microsoft Azure preview terms',params:name,context:'23개 언어 · 26개 로케일',modality:'텍스트 · 참조 음성 → 음성',
    highlight:id.endsWith('flash')?'낮은 지연과 대량 처리를 위한 다국어 음성 합성':'긴 발화에서도 화자 일관성을 유지하는 다국어 음성 합성',
    source:ms,sourceLabel:'Microsoft AI 공식 발표',note:'Azure Speech 문서상 public preview. GA일과 독립 품질 점수는 미확인입니다.',
    sources:[ms,'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/mai-voices'],apiPricing:pricing(amount,'100만 문자','토큰이 아닌 입력 문자 기준 단가입니다.')}));
  model({id:'ling-3-1-flash',name:'Ling 3.1 Flash',family:'Ling 3.1',provider:'InclusionAI',region:'China',regionTags:['China'],category:'reasoning',
    date:'2026-09-30',apiDate:'2026-09-30',access:'API · 공개 가중치 확인 대기',license:'호스팅 약관 · 가중치 라이선스 미확인',
    params:'560B total / 25B active',context:'262K tokens · Vercel AI Gateway',modality:'텍스트 · 도구 → 텍스트',highlight:'코딩·장문 분석·도구 사용을 위한 하이브리드 추론 MoE',
    source:ling,sourceLabel:'Vercel 공식 API 제공 발표',
    note:'9월 30일은 Gateway 제공일입니다. AA는 10월 1일 출시·1M 컨텍스트·open weights로 표시하지만 공식 가중치와 라이선스는 직접 확인하지 못했습니다. 오픈소스 필터에는 포함하지 않습니다.',
    apiPricing:{status:'provider-dependent',checkedAt,source:ling,note:'Vercel Gateway는 2026-10-13까지 무료. 일반 ID는 종료 후 과금, -free ID는 제공 중단. 영구 무료 또는 제공사 표준 단가로 표시하지 않습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aa+'models/ling-3-1-flash',aaStatus:'verified',note:'AA v4.3.2 41점 · 10월 3일 게시'}});
  model({id:'minimax-m3-1-flash-preview',name:'MiniMax M3.1 Flash Preview',family:'MiniMax M3.1',provider:'MiniMax',region:'China',regionTags:['China'],category:'reasoning',
    access:'API 프리뷰',params:'MiniMax-M3.1-Flash-Preview',context:'1,000,000 tokens',modality:'텍스트 · 이미지 · 영상 → 텍스트 · 코드',
    highlight:'5단계 추론 강도를 지원하는 코딩·에이전트 프리뷰',source:mini,sourceLabel:'MiniMax 공식 모델 호출 문서',
    note:'API 제공은 공식 문서로 확인했습니다. 최초 프리뷰·출시·API 날짜는 미기재이며 익명 모델의 정체를 추정하지 않습니다. 기본 effort=max, thinking 비활성화 불가.',
    apiPricing:{status:'no-public-rate',checkedAt,source:mini,note:'이 프리뷰의 공식 토큰당 표준 단가는 확인되지 않았습니다. 구독 크레딧을 API 단가로 환산하지 않습니다.'}});

  const solar=models.find(m=>m.id==='solar-mini-4');
  Object.assign(solar,{checkedAt,announcementDate:'2026-10-01',context:'512K tokens',params:'35B total / 3B active · 최대 출력 128K',
    note:'10월 1일 공식 발표의 512K 컨텍스트·128K 최대 출력으로 정정했습니다. 기존 9월 22일 출시 기록과 발표일을 분리하며 최초 API 제공일은 미확인입니다.'});
  solar.apiPricing.checkedAt=checkedAt;
  function add(value) {upsert(rows,Object.assign({checkedAt,evaluationDate:null,snapshotDate:null,publishedAt:null,rankMode:'reference',sourceType:'independent-leaderboard',
    tools:'평가별 허용 도구 · 원문 방법론 참조',reasoningBudget:'세부 토큰 예산 미공개',comparisonNote:'동일 평가·설정별 발췌. 다른 버전·하니스와 통합 순위를 만들지 않습니다.'},value),x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|'));}
  [['ling-3-1-flash','provider default',41,'2026-10-03'],['grok-4-7','low',42,'2026-10-01']].forEach(([modelId,modelVariant,score,publishedAt])=>add({
    modelId,modelVariant,score,publishedAt,benchmark:'aaIntelligence432',unit:'점',cohort:'aa-v432-checked-20261005',cohortLabel:'AA v4.3.2 · 10월 1–3일 신규 평가',
    source:aa+'changelog',sourceLabel:'Artificial Analysis 공식 변경 기록',benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',
    harness:'Artificial Analysis 독립 평가 · 10개 평가 구성',reasoningBudget:modelVariant+' · 세부 토큰 예산 미공개'}));

  // Arena public Overall table, publication date preserved independently of retrieval.
  [
    ['gemini-4-argon','high',1,1525,9,4932,true],['claude-opus-5-5','high',4,1504,9,4552,false],
    ['claude-fable-5-1','max',6,1501,6,11800,false],['gemini-3-8-flash','high',8,1495,5,26298,true],
    ['muse-spark-1-3','max',9,1494,6,12343,false],['kimi-k3','max',16,1488,5,28280,false],
    ['gpt-6-1-sol','max',21,1483,11,3071,false],['mimo-v2-6-pro-api','API default',26,1480,9,4056,false],
    ['glm53','max',27,1478,6,17857,false],['gpt-6-astra','max',29,1477,7,9156,false],
    ['deepseek-v4-1-flash','max',38,1474,7,8728,false],['claude-sonnet-5-5','xhigh',45,1471,10,3145,false]
  ].forEach(([modelId,modelVariant,officialRank,score,uncertainty,votes,preliminary])=>add({modelId,modelVariant,officialRank,score,uncertainty,votes,
    benchmark:'arena',unit:' Elo',rankMode:'official',status:preliminary?'Preliminary':'Published',publishedAt:'2026-10-02',snapshotDate:'2026-10-02',
    cohort:'arena-2026-10-02',cohortLabel:'Text Arena Overall · 2026-10-02',source:'https://arena.ai/leaderboard/text',sourceLabel:'Text Arena 공식 Overall 리더보드',
    benchmarkVersion:'Text Arena Overall · 2026-10-02 · 조정 없음',harness:'Arena 블라인드 사용자 선호 투표',tools:'대화 평가 · 도구 조건 미기재',reasoningBudget:modelVariant+' · 세부 예산 미기재'}));

  // AA streaming data is supplied from a checked-in, source-linked small excerpt.
  const streamMetrics=[['aaStreamingFinalWer','AA Streaming · 최종 전사 오류율','aaWerStreamingIndex','%',100],
    ['aaStreamingPartialWer','AA Streaming · 첫 부분 전사 오류율','aaWerStreamingFirstPartialAfterSpeechEnd','%',100],
    ['aaStreamingFinalLatency','AA Streaming · 최종 전사 지연','timeToFinalTranscriptSeconds','초',1],
    ['aaStreamingPartialLatency','AA Streaming · 첫 부분 전사 지연','timeToFirstPartialTranscriptSeconds','초',1]];
  for(const [key,name] of streamMetrics)metrics[key]={key,name,direction:'lower',rankable:false,description:'AA-AgentTalk 50% · VoxPopuli 25% · Earnings22 25%. 발화 종료 후 전사. Non-streaming과 별도.'};
  for(const item of AA_STREAMING_20261005)for(const [benchmark,,field,unit,factor] of streamMetrics)add({modelId:item.modelId,modelVariant:item.name,
    benchmark,score:Number((item[field]*factor).toFixed(unit==='%'?4:6)),unit,snapshotDate:checkedAt,cohort:'aa-streaming-20261005',cohortLabel:'AA Streaming · 2026-10-05 확인',
    source:aa+'speech-to-text/streaming',sourceLabel:'Artificial Analysis 공식 스트리밍 평가',benchmarkVersion:'AA-WER Streaming · 3 datasets',
    harness:'실시간 청크 입력 · AA-AgentTalk 50% / VoxPopuli 25% / Earnings22 25%',tools:'음성 스트리밍 전사 API',reasoningBudget:'해당 없음 · endpoint 설정은 모델 구성명 참조'});
  const checks={
    aaIntelligence432:[aa+'changelog','Ling 3.1 Flash 41점 및 Grok 4.7 low 42점 추가. 기존 10월 1일 확인값은 확인일을 그대로 유지.'],
    arena:['https://arena.ai/leaderboard/text','10월 2일 Overall 공식 순위 중 12개 모델 설정·오차·표본 수 발췌.'],
    aaStreamingFinalWer:[aa+'speech-to-text/streaming','4개 카탈로그 모델의 최종/부분 전사 오류율 및 지연 총 16건. 수집일과 미공개 평가일 분리.'],
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','공식 동적 리더보드 확인. 이번 기간 새 비교 가능 점수는 검증하지 못함.'],
    gpqa:['https://github.com/idavidrein/gpqa','공식 데이터/코드 확인. 새 모델의 기간 내 GPQA Diamond 실행 조건·수치는 미확인.'],
    aime2026:['https://matharena.ai/','AIME 2026 탭 확인. 이번 기간 신규 모델별 공식 수치를 검증하지 못함.'],
    liveCodeBench:['https://livecodebench.github.io/','공식 사이트 확인. 기간 내 동일 버전·하니스 신규 점수 미확인.'],
    mmmuPro:['https://github.com/MMMU-Benchmark/MMMU','MMMU-Pro 공식 평가 코드 확인. 이번 기간 신규 공식 모델 점수 미확인.'],
    swe:['https://www.swebench.com/','공식 사이트 확인. 기간 내 동일 하니스·버전 신규 수치 미확인.'],
    terminal4:['https://www.tbench.ai/benchmarks','공식 벤치마크 목록 확인. 신규 공통 조건 수치 미확인. 기존 제공사별 수치 유지.']
  };
  for(const [key,[source,note]] of Object.entries(checks))upsert(snapshots,{id:'review-2026-10-05-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'공식 1차 출처 확인',version:'수시 확인 기록',note},x=>x.id);
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
