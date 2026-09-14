/* Official-source review: 2026-09-07 through 2026-09-14.
 * Release, preview, API availability, evaluation and observation dates stay independent.
 * This migration is deterministic and idempotent so the browser app and tests share one registry.
 */
function applyWeekly20260914(models, metrics, rows, snapshots) {
  const checkedAt = '2026-09-14';
  const unknown = '미기재';
  const deepseek = 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash';
  const deepseekRelease = 'https://api-docs.deepseek.com/news/news260910/';
  const openaiImage = 'https://openai.com/index/introducing-chatgpt-images-2-5/';
  const openaiFlare = 'https://developers.openai.com/api/docs/models/gpt-image-2.5-flare';
  const openaiSunburst = 'https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst';
  const openaiLive = 'https://openai.com/index/introducing-gpt-live-1-in-the-api/';
  const meshy = 'https://www.meshy.ai/blog/meshy-7-1-launch';
  const eleven = 'https://elevenlabs.io/blog/music-v2-5-model';
  const sakana = 'https://sakana.ai/fugu-max-release/';
  const tripo = 'https://www.tripo3d.ai/research/the-teapot-test-from-showing-to-making';
  const textArena = 'https://arena.ai/leaderboard/text';
  const imageArena = 'https://arena.ai/leaderboard/text-to-image';

  function model(value) {
    const data = Object.assign({current:true, checkedAt, date:'', announcementDate:null, releaseDate:null,
      previewDate:null, apiDate:null, scores:{}, access:'Closed / API', accessType:'api-only',
      license:'제공사 이용약관', params:unknown, context:unknown, modality:'텍스트 → 텍스트',
      sourceStatus:'official'}, value);
    const old = models.find(m => m.id === data.id);
    if (old) Object.assign(old, data); else models.push(data);
  }

  model({id:'deepseek-v4-1-flash',name:'DeepSeek-V4.1-Flash',family:'DeepSeek V4',provider:'DeepSeek',region:'China',category:'multimodal',
    date:'2026-09-10',announcementDate:'2026-09-10',releaseDate:'2026-09-10',apiDate:'2026-09-10',
    access:'Open weights · API',accessType:'open-source-license',license:'MIT',params:'552B total · 8B active prefill · 16B active decode',context:'1M tokens',
    modality:'텍스트 · 이미지 → 텍스트',highlight:'1M 컨텍스트와 1–100 연속 추론 강도 조절을 지원하는 네이티브 멀티모달 MoE',
    source:deepseek,sourceLabel:'DeepSeek V4.1 Flash 공식 모델 카드',
    note:'정식 출시와 API 제공은 2026-09-10입니다. API 식별자는 deepseek-flash이며 공식 저장소와 가중치는 MIT로 공개됐습니다. 출시 공지: '+deepseekRelease});
  model({id:'gpt-image-2-5-flare',name:'GPT Image 2.5 Flare',family:'GPT Image',provider:'OpenAI',region:'US',category:'image',
    date:'2026-09-08',announcementDate:'2026-09-08',releaseDate:'2026-09-08',apiDate:'2026-09-08',
    access:'Closed / API',accessType:'api-only',license:'OpenAI API terms',params:'gpt-image-2.5-flare · snapshot 2026-09-08',context:'quality: low–max · auto',
    modality:'텍스트 · 이미지 → 이미지',highlight:'속도와 품질을 함께 겨냥한 GPT Image 2.5 기본 생성·편집 모델',source:openaiFlare,sourceLabel:'OpenAI Flare API 모델 문서',
    note:'ChatGPT Images 2.5 발표와 같은 날 Image API 및 Responses API에 제공됐습니다. 발표: '+openaiImage});
  model({id:'gpt-image-2-5-sunburst',name:'GPT Image 2.5 Sunburst',family:'GPT Image',provider:'OpenAI',region:'US',category:'image',
    date:'2026-09-08',announcementDate:'2026-09-08',releaseDate:'2026-09-08',apiDate:'2026-09-08',
    access:'Closed / API',accessType:'api-only',license:'OpenAI API terms',params:'gpt-image-2.5-sunburst · snapshot 2026-09-08',context:'quality: low–max · auto',
    modality:'텍스트 · 이미지 → 이미지',highlight:'편집 정밀도를 우선한 GPT Image 2.5 고성능 생성·편집 모델',source:openaiSunburst,sourceLabel:'OpenAI Sunburst API 모델 문서',
    note:'API 문서의 정식 ID와 2026-09-08 날짜 고정 스냅샷을 확인했습니다. 발표: '+openaiImage});
  model({id:'gpt-live-1',name:'GPT-Live-1',family:'GPT Live',provider:'OpenAI',region:'US',category:'voice',
    date:'2026-09-10',announcementDate:'2026-09-10',releaseDate:'2026-09-10',apiDate:'2026-09-10',
    access:'Closed / API',accessType:'api-only',license:'OpenAI API terms',params:'GPT-Live-1 · full-duplex voice agent',context:'실시간 양방향 음성 세션',
    modality:'음성 · 텍스트 ↔ 음성 · 텍스트',highlight:'듣기와 말하기를 동시에 수행하고 백엔드 추론·도구 모델에 위임하는 음성 에이전트',source:openaiLive,sourceLabel:'OpenAI GPT-Live-1 API 발표',
    note:'2026-09-10 API 제공일을 기록했습니다. ChatGPT 최초 도입일은 해당 발표에서 특정되지 않아 추정하지 않습니다.'});
  model({id:'meshy-7-1',name:'Meshy 7.1',family:'Meshy',provider:'Meshy',region:'Global',category:'3d',
    date:'2026-09-10',announcementDate:'2026-09-10',releaseDate:'2026-09-10',apiDate:null,
    access:'Closed / web',accessType:'custom-license',license:'Meshy 이용약관',params:'Ultra 4K · 최대 4096³ geometry · 최대 80M triangles',context:'image-to-3D · single view',
    modality:'이미지 → 고해상도 3D 메쉬',highlight:'고해상도 형상 보존과 후반 제작용 원시 메쉬를 강화한 이미지→3D 모델',source:meshy,sourceLabel:'Meshy 7.1 공식 발표',
    note:'2026-09-10부터 순차 배포됐습니다. Ultra 2K/4K 및 원시 메쉬 다운로드에는 유료 구독이 필요하며 API 최초 제공일은 확인되지 않았습니다.'});
  model({id:'eleven-music-2-5',name:'Eleven Music v2.5',family:'Eleven Music',provider:'ElevenLabs',region:'Global',category:'music',
    date:'2026-09-11',announcementDate:'2026-09-11',releaseDate:'2026-09-11',apiDate:'2026-09-11',
    access:'Closed / web · API',accessType:'api-only',license:'ElevenLabs 이용약관',params:'prompted generation · reference generation',context:'ElevenCreative · API',
    modality:'텍스트 · 참조 음악 → 음악',highlight:'프롬프트·참조 생성의 품질과 제어를 개선한 ElevenLabs 기본 음악 모델',source:eleven,sourceLabel:'ElevenLabs Music v2.5 공식 발표',
    note:'47,885쌍 블라인드 선호 실험은 공개됐지만 정확한 모델별 수치가 없어 점수 행은 만들지 않았습니다.'});
  model({id:'fugu-max',name:'Fugu Max',family:'Fugu',provider:'Sakana AI',region:'Global',category:'reasoning',
    date:'2026-09-11',announcementDate:'2026-09-11',releaseDate:'2026-09-11',apiDate:'2026-09-11',
    access:'Closed / API',accessType:'api-only',license:'Sakana AI API terms',params:'multi-model orchestration · API ID 미기재',context:'작업별 동적 모델 구성',
    modality:'텍스트 · 도구 → 텍스트',highlight:'여러 프런티어 모델을 작업 중 동적으로 조율하는 성능 우선 오케스트레이션 모델',source:sakana,sourceLabel:'Sakana Fugu Max 공식 발표',
    note:'정확한 API 식별자는 공식 발표 본문에 없어 모델명으로 기록했으며 추정하지 않습니다.'});
  model({id:'fugu-ultra-v2',name:'Fugu Ultra v2',family:'Fugu',provider:'Sakana AI',region:'Global',category:'reasoning',
    date:'2026-09-11',announcementDate:'2026-09-11',releaseDate:'2026-09-11',apiDate:'2026-09-11',
    access:'Closed / API',accessType:'api-only',license:'Sakana AI API terms',params:'multi-model orchestration · cost/performance optimized',context:'작업별 동적 모델 구성',
    modality:'텍스트 · 도구 → 텍스트',highlight:'Fugu Max와 같은 핵심 구조에서 비용·성능 균형을 최적화한 오케스트레이션 모델',source:sakana,sourceLabel:'Sakana Fugu Ultra v2 공식 발표'});
  model({id:'tripo-3-1',name:'Tripo 3.1',family:'Tripo',provider:'Tripo AI',region:'Global',category:'3d',
    date:'2026-08-06',announcementDate:'2026-08-06',releaseDate:'2026-08-06',apiDate:'2026-08-06',
    access:'Closed / web · API',accessType:'api-only',license:'Tripo 이용약관',params:'Tripo 3.1 HD · high-precision mesh',context:'image-to-3D · API',
    modality:'이미지 → 고정밀 3D 메쉬 · 텍스처',highlight:'얇은 구조와 실루엣 보존을 강화한 Tripo 고정밀 이미지→3D 계보',source:tripo,sourceLabel:'Tripo 3.1 공식 연구·출시 글',
    note:'이번 주 신작이 아닌 누락 계보 보강입니다. 2026-08-06 Tripo 3.1 HD 공개 및 API 제공 기록을 분리 없이 같은 날짜로 확인했습니다.'});

  ['deepseek-v4-flash','deepseek-v4-flash-vision-exp','meshy-7','tripo-3-0'].forEach(id => {
    const old = models.find(m => m.id === id); if (old) { old.current=false; old.checkedAt=checkedAt; }
  });
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  models.forEach(m=>{m.regionTags=m.region==='China'?['China'].concat(/^open-/.test(m.accessType)?['China open weights']:[]):m.region==='Korea'?['Korea']:[];});

  function metric(key,name,description){metrics[key]={key,name,description,rankable:false};}
  metric('mmluProDeepSeekBase','MMLU-Pro · DeepSeek Base 5-shot','DeepSeek 내부 동일 설정 · Base 모델 · 5-shot exact match. Instruct/API 행과 분리.');
  metric('mmmuProDeepSeekBase','MMMU-Pro · DeepSeek Base 4-shot','DeepSeek 내부 동일 설정 · Base 모델 · 4-shot exact match. Instruct/API 행과 분리.');
  metric('terminal21DeepSeek','Terminal-Bench 2.1 · DeepSeek','DeepSeek Harness Minimal · 1M context · max 500 steps. 다른 하니스와 분리.');
  metric('terminal3DeepSeek','Terminal-Bench 3.0 · DeepSeek','DeepSeek Harness Minimal · 1M context · max 500 steps. 2.1/4.0과 분리.');
  metric('terminal4DeepSeek','Terminal-Bench 4.0 · DeepSeek','DeepSeek Harness Minimal · 1M context · max 500 steps. 제공사별 조건과 분리.');
  metric('chartography','Chartography · 도구 사용','제공사별 오케스트레이션·도구 조건을 cohort로 분리해 순위 없이 표시.');
  metric('babyVision','BabyVision · 도구 사용','DeepSeek 공식 모델 카드의 Claude Code 시각 에이전트 평가.');
  metric('zeroBenchMain','ZeroBench-main · 도구 사용','DeepSeek 공식 모델 카드의 Claude Code 시각 에이전트 평가.');
  metric('detailRichness1024','3D Detail Richness · 1024','Meshy 제공사 평가 · maximum quality · 1024 렌더 해상도.');
  metric('detailRichness2048','3D Detail Richness · 2048','Meshy 제공사 평가 · maximum quality · 2048 렌더 해상도.');
  metric('detailRichness4096','3D Detail Richness · 4096','Meshy 제공사 평가 · maximum quality · 4096 렌더 해상도.');

  function add(value){
    const r=Object.assign({checkedAt,evaluationDate:null,publishedAt:null,snapshotDate:null,unit:'%',sourceType:'provider-reported',rankMode:'reference',
      harness:unknown,tools:unknown,reasoningBudget:unknown,comparisonNote:'제조사 보고 수치. 조건이 다른 평가와 합산하거나 종합 순위를 만들지 않습니다.'},value);
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const old=rows.find(x=>key(x)===key(r)); if(old)Object.assign(old,r);else rows.push(r);
  }
  const dsBase={modelId:'deepseek-v4-1-flash',source:deepseek,sourceLabel:'DeepSeek 공식 모델 카드',publishedAt:'2026-09-10',reasoningBudget:'Base model · reasoning effort 미적용',tools:'없음'};
  add(Object.assign({},dsBase,{benchmark:'mmluProDeepSeekBase',score:74.1,benchmarkVersion:'MMLU-Pro · 5-shot exact match',harness:'DeepSeek 내부 동일 설정',cohort:'deepseek-v41-base-mmlu',cohortLabel:'DeepSeek Base · 2026-09-10'}));
  add(Object.assign({},dsBase,{benchmark:'mmmuProDeepSeekBase',score:56.5,benchmarkVersion:'MMMU-Pro · 4-shot exact match',harness:'DeepSeek 내부 동일 설정',cohort:'deepseek-v41-base-mmmu',cohortLabel:'DeepSeek Base · 2026-09-10'}));
  const ds={modelId:'deepseek-v4-1-flash',source:deepseek,sourceLabel:'DeepSeek 공식 모델 카드',publishedAt:'2026-09-10',reasoningBudget:'reasoning_effort=100 · temperature 1.0 · top_p 0.95'};
  [
    ['gpqa',90.9,'GPQA Diamond · pass@1','DeepSeek 공식 Instruct 평가','없음'],
    ['terminal21DeepSeek',90.6,'Terminal-Bench 2.1 · pass@1','DeepSeek Harness Minimal · N=3 · max 500 steps','터미널 · 네트워크 없음'],
    ['terminal3DeepSeek',30.0,'Terminal-Bench 3.0 · pass@1','DeepSeek Harness Minimal · N=3 · max 500 steps','터미널 · 네트워크 없음'],
    ['terminal4DeepSeek',31.2,'Terminal-Bench 4.0 · pass@1','DeepSeek Harness Minimal · N=3 · max 500 steps','터미널 · 네트워크 없음'],
    ['deepSWE',74.2,'DeepSWE v1.1 · resolved','mini-SWE · N=8 · max 500 steps','코드 실행 · 1M context'],
    ['hle',36.8,'Humanity’s Last Exam · full','DeepSeek 공식 Instruct 평가','없음'],
    ['hleTools',63.9,'Humanity’s Last Exam · tools','DeepSeek 공식 도구 평가','검색 · 코드 실행'],
    ['automationBench',54.8,'AutomationBench','공식 benchmark scaffold','업무 자동화 도구'],
    ['agentsLastExam',31.8,"Agents’ Last Exam",'공식 benchmark scaffold','컴퓨터 사용'],
    ['chartography',78.9,'Chartography · tools','Claude Code · 512K context','시각 도구 · 코드 실행'],
    ['babyVision',89.6,'BabyVision · tools','Claude Code · 512K context','시각 도구 · 코드 실행'],
    ['zeroBenchMain',49.0,'ZeroBench-main · tools','Claude Code · 512K context','시각 도구 · 코드 실행']
  ].forEach(([benchmark,score,benchmarkVersion,harness,tools])=>add(Object.assign({},ds,{benchmark,score,benchmarkVersion,harness,tools,
    cohort:'deepseek-v41-'+benchmark,cohortLabel:'DeepSeek · 2026-09-10 · max effort'})));
  add({modelId:'fugu-ultra-v2',benchmark:'chartography',score:48.3,benchmarkVersion:'Chartography',harness:'Sakana Fugu orchestration · 상세 scaffold 미기재',tools:'오케스트레이션 모델 풀 · 구성 미기재',reasoningBudget:unknown,
    source:sakana,sourceLabel:'Sakana Fugu Max / Ultra v2 공식 발표',publishedAt:'2026-09-11',cohort:'sakana-fugu-chartography',cohortLabel:'Sakana · 2026-09-11'});
  add({modelId:'fugu-ultra-v2',benchmark:'deepSWE',score:74.3,benchmarkVersion:'DeepSWE · 버전 미기재',harness:'Sakana Fugu orchestration · 상세 scaffold 미기재',tools:'코드 실행 · 구성 미기재',reasoningBudget:unknown,
    source:sakana,sourceLabel:'Sakana Fugu Max / Ultra v2 공식 발표',publishedAt:'2026-09-11',cohort:'sakana-fugu-deepswe',cohortLabel:'Sakana · 2026-09-11'});

  const textRows=[
    ['claude-opus-4-6','high',2,1505,4,71993],['claude-opus-4-7','high',3,1502,4,60002],['muse-spark-1-2','xHigh',4,1500,11,3227],
    ['claude-fable-5-1','max',5,1498,8,5783],['claude-opus-4-6','default',6,1497,3,75878],['claude-opus-4-7','default',7,1494,4,61128],
    ['muse-spark-1-3','max',8,1493,9,4723],['gemini-3-8-flash','high · Preliminary',9,1493,9,5076],['claude-opus-5','high',10,1493,4,42617],
    ['muse-spark-1-1','default',11,1493,5,27615],['gemini-3-7-flash','high · Preliminary',12,1490,8,5640],['muse-spark','default',13,1488,6,13565],
    ['claude-opus-5','max',14,1487,5,20706],['gemini-3-1-pro','preview',15,1487,3,106951],['gemini-3-pro','default',16,1485,4,40654],
    ['kimi-k3','max',17,1485,5,20987],['gpt-5-6','Sol xhigh',18,1483,5,27069],['glm53','max',19,1483,6,10960],
    ['gpt-5-5','high',20,1482,4,64924],['claude-opus-4-8','high',21,1481,4,52535],['gpt-6-astra','max',24,1480,12,2693],
    ['glm53-flash','default',29,1475,7,10038],['deepseek-v4-pro','high · 20260813',50,1463,7,9008],['kimi-k2-6','default',52,1460,5,37502],
    ['grok-4-6','high',63,1456,6,15521],['gemma-4-31b','default',68,1451,8,5894],['minimax-m3','default',84,1441,4,48540],
    ['gemma-4-26b-a4b','default',88,1438,8,5804]
  ];
  textRows.filter(x=>models.some(m=>m.id===x[0])).forEach(([modelId,modelVariant,officialRank,score,uncertainty,votes])=>add({
    modelId,modelVariant,officialRank,score,scoreText:score+' ± '+uncertainty,uncertainty,votes,benchmark:'arena',benchmarkVersion:'Text Arena · Overall',
    snapshotDate:'2026-09-13',source:textArena,sourceLabel:'Arena 공식 Text leaderboard',sourceType:'independent-leaderboard',rankMode:'official',
    harness:'블라인드 쌍대 비교 · Arena Elo',tools:'사용자 프롬프트 조건',reasoningBudget:'모델 변형명에 표시된 설정',
    comparisonNote:'2026-09-13 Text Arena 공식 전체 순위에서 등록 모델만 발췌했습니다. 순위는 발췌 목록 재순위가 아닌 공식 전체 순위입니다.',
    cohort:'arena-2026-09-13',cohortLabel:'Text Arena · 2026-09-13 · 8,146,274 votes',unit:''}));
  [['gpt-image-2-5-sunburst',1,1421,13,3149],['gpt-image-2-5-flare',2,1399,13,2856]].forEach(([modelId,officialRank,score,uncertainty,votes])=>add({
    modelId,modelVariant:'Preliminary',officialRank,score,scoreText:score+' ± '+uncertainty+' · Preliminary',uncertainty,votes,benchmark:'imageArena',benchmarkVersion:'Text-to-Image Arena · Overall',
    snapshotDate:'2026-09-07',source:imageArena,sourceLabel:'Arena 공식 Text-to-Image leaderboard',sourceType:'independent-leaderboard',rankMode:'official',
    harness:'블라인드 쌍대 비교 · Arena Elo',tools:'이미지 생성',reasoningBudget:'해당 없음',
    comparisonNote:'2026-09-07 공식 이미지 Arena 스냅샷입니다. 두 모델 모두 표본 수가 적은 Preliminary 상태이며 출시일과 리더보드 스냅샷 날짜를 동일시하지 않습니다.',
    cohort:'image-arena-2026-09-07',cohortLabel:'Image Arena · 2026-09-07 · Preliminary',unit:''}));
  const detail=[['detailRichness1024',53.5,44.8,'1024'],['detailRichness2048',37.4,29.5,'2048'],['detailRichness4096',23.1,17.3,'4096']];
  detail.forEach(([benchmark,meshyScore,tripoScore,resolution])=>[
    ['meshy-7-1',meshyScore,'Meshy 7.1'],['tripo-3-1',tripoScore,'Tripo 3.1']
  ].forEach(([modelId,score,modelVariant])=>add({modelId,modelVariant,benchmark,score,benchmarkVersion:'Detail Richness · '+resolution+' render',harness:'Meshy 제공사 평가 · maximum quality settings',tools:'이미지→3D 생성 후 렌더',reasoningBudget:'해당 없음',
    source:meshy,sourceLabel:'Meshy 7.1 공식 비교표',publishedAt:'2026-09-10',cohort:'meshy-detail-'+resolution,cohortLabel:'Meshy · 2026-09-10 · '+resolution,
    comparisonNote:'Meshy 제공사 평가입니다. 공개된 maximum quality 조건 안에서만 비교하며 독립 리더보드 순위로 해석하지 않습니다.'})));

  const audits={
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','공식 Space는 정적 점수표를 노출하지 않아 신규 독립 수치를 추가하지 않았습니다. DeepSeek Base 5-shot 수치는 별도 지표에 기록했습니다.'],
    gpqa:['https://github.com/idavidrein/gpqa','원 평가 저장소에는 통합 공식 리더보드가 없습니다. DeepSeek GPQA Diamond 제공사 수치를 독립 cohort로 추가했습니다.'],
    aime2026:['https://matharena.ai/','9월 13일 Muse Spark 1.3 및 9월 11일 Mistral Prover 갱신을 확인했지만 AIME 2026 세부 정적 점수는 확인되지 않아 추정하지 않았습니다.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','공식 동적 표가 정적 본문에서 점수를 노출하지 않아 신규 수치를 추가하지 않았습니다.'],
    mmmuPro:['https://mmmu-benchmark.github.io/','공식 사이트의 마지막 갱신 표기는 2025-09-05입니다. DeepSeek Base 4-shot 제공사 수치는 별도 지표로 기록했습니다.'],
    swe:['https://www.swebench.com/','공식 리더보드의 최신 정적 모델 행을 확인하지 못했습니다. DeepSWE 제공사 행과 SWE-bench 점수를 섞지 않았습니다.'],
    terminal:['https://www.tbench.ai/benchmarks','공식 카탈로그의 최신 버전은 Terminal-Bench 4.0으로 유지됩니다. DeepSeek 2.1/3.0/4.0은 하니스별 별도 지표입니다.'],
    arena:[textArena,'2026-09-13 공식 스냅샷 8,146,274표·402개 모델을 반영하고 등록 모델만 공식 전체 순위로 발췌했습니다.'],
    imageArena:[imageArena,'2026-09-07 공식 스냅샷에서 GPT Image 2.5 Sunburst와 Flare의 Preliminary 순위를 반영했습니다.']
  };
  Object.entries(audits).forEach(([key,[source,note]])=>{
    const id='review-2026-09-14-'+key;
    const value={id,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'공식 1차 출처 재확인',note,version:'주간 확인 기록'};
    const old=snapshots.find(x=>x.id===id);if(old)Object.assign(old,value);else snapshots.push(value);
  });
}
