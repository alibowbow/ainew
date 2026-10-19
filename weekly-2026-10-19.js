/* Official-source review: 2026-10-12–2026-10-18, checked 2026-10-19 KST.
 * Release, preview, API, evaluation and retrieval dates remain separate.
 */
function applyWeekly20261019(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-19';
  const museWonder='https://research.meta.ai/blog/muse-wonder';
  const museWonderCard='https://research.meta.ai/static/muse-wonder-model-card';
  const musePricing='https://dev.meta.ai/docs/pricing-rate-limits';
  const museOpen='https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B';
  const aaWonder='https://artificialanalysis.ai/models/muse-wonder';
  const aaWonderFull='https://artificialanalysis.ai/models/muse-wonder-full';
  const deepseek='https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017';
  const deepseekNews='https://api-docs.deepseek.com/news/news261017/';
  const deepseekPricing='https://api-docs.deepseek.com/quick_start/pricing/';
  const bolt='https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16';
  const superVl='https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16';
  const aaNemotron='https://artificialanalysis.ai/articles/nemotron-3-5-super-and-bolt';
  const jais='https://ifm.ai/blog/jais3/';
  const meshy='https://docs.meshy.ai/en/api/changelog';
  const meshyPricing='https://docs.meshy.ai/en/api/pricing';
  const live='https://help.openai.com/en/articles/6825453-chatgpt-release-notes';
  const beamRelease='https://reflection.ai/blog/beam-is-available';
  const aaBeam='https://artificialanalysis.ai/articles/reflection-beam';
  function upsert(list,value,key) {const old=list.find(x=>key(x)===key(value));if(old)Object.assign(old,value);else list.push(value);}
  function model(value) {
    upsert(models,Object.assign({current:true,checkedAt,date:'',announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      scores:{},sourceStatus:'official',recordType:'model',regionTags:[],accessType:'api-only',license:'제공사 서비스 약관',
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

  model({id:'muse-wonder',name:'Muse Wonder',family:'Muse Wonder',provider:'Meta',region:'US',category:'multimodal',
    date:'2026-10-12',announcementDate:'2026-10-12',releaseDate:'2026-10-12',apiDate:'2026-10-12',
    access:'Meta Model API · Muse Code',accessType:'api-only',license:'Meta Model API Terms',params:'muse-wonder-1.0 · 파라미터 비공개',
    context:'1M tokens',modality:'텍스트 · 이미지 · 영상 · 오디오 → 텍스트',highlight:'메모리·장기 집중·전문 업무 에이전트를 위한 멀티모달 프런티어 모델',
    source:museWonderCard,sourceLabel:'Meta Muse Wonder 공식 모델 카드',sources:[museWonder,museWonderCard,musePricing,aaWonder],
    note:'10월 12일 정식 출시와 API 제공이 동시에 시작됐습니다. Muse Wonder Full과 별도 배포 모델입니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'Standard mode',source:musePricing,rates:[
      {label:'캐시 입력',amount:0.20},{label:'입력',amount:4},{label:'출력',amount:20}],
      note:'Contributor mode는 제공되지 않습니다. 웹 검색은 1,000회당 $2.50이 별도 부과됩니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaWonder,aaStatus:'verified',note:'AA Intelligence Index v4.3 52점 · max'}});

  model({id:'muse-wonder-full',name:'Muse Wonder Full',family:'Muse Wonder',provider:'Meta',region:'US',category:'reasoning',
    date:'2026-10-12',announcementDate:'2026-10-12',releaseDate:'2026-10-12',apiDate:null,
    access:'Muse Code 구독 전용',accessType:'custom-license',license:'Muse Supplemental Terms',params:'파라미터 비공개',context:'1M tokens',
    modality:'텍스트 · 이미지 · 영상 · 오디오 → 텍스트',highlight:'Muse Wonder 계열의 최고 성능 구독형 에이전트 모델',
    source:museWonderCard,sourceLabel:'Meta Muse Wonder 공식 모델 카드',sources:[museWonder,museWonderCard,aaWonderFull],
    note:'Muse Code 구독자에게 공개됐으며 Meta Model API의 공개 종량 단가는 없습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:musePricing,note:'Muse Code 구독 전용이며 공개 API 종량 단가는 확인되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaWonderFull,aaStatus:'verified',note:'AA Intelligence Index v4.3 56점 · max'}});

  model({id:'muse-spark-open',name:'Muse Spark Open',family:'Muse Spark',provider:'Meta',region:'US',category:'multimodal',
    date:'2026-10-15',announcementDate:'2026-10-15',releaseDate:'2026-10-15',apiDate:null,
    access:'Open weights · third-party inference',accessType:'open-weights',license:'Muse Model License',params:'816B total / 42B active · MoE',
    context:'1M tokens',modality:'텍스트 · 이미지 · 영상 · 오디오 → 텍스트',highlight:'코딩·멀티에이전트·장기 작업을 위한 Meta 오픈 웨이트 멀티모달 모델',
    source:museOpen,sourceLabel:'Meta Muse Spark Open 공식 모델 카드',
    note:'BF16·NVFP4 가중치를 공개했습니다. Meta Model API가 아니라 자체 호스팅 또는 제3자 추론 제공자를 사용합니다.',
    apiPricing:{status:'provider-dependent',checkedAt,source:museOpen,note:'Meta의 자사 API 단가는 없으며 제3자 추론 제공자별 가격이 다릅니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:museOpen,aaStatus:'verified',note:'공식 카드의 AA Intelligence 39 및 제공사 평가를 조건별 등록'}});

  model({id:'deepseek-v4-1-flash-1017',name:'DeepSeek-V4.1-Flash-1017',family:'DeepSeek V4.1',provider:'DeepSeek',region:'China',category:'multimodal',
    regionTags:['China open weights'],date:'2026-10-17',announcementDate:'2026-10-17',releaseDate:'2026-10-17',apiDate:'2026-10-17',
    access:'Open weights · DeepSeek API',accessType:'open-source-license',license:'MIT',params:'공식 V4.1 sparse MoE checkpoint',context:'1M tokens · 최대 출력 384K',
    modality:'텍스트 · 이미지 · 도구 → 텍스트 · 코드',highlight:'추론·코딩·에이전트·비전 성능과 실행 비용을 개선한 1017 업데이트',
    source:deepseek,sourceLabel:'DeepSeek V4.1 Flash 1017 공식 모델 카드',sources:[deepseek,deepseekNews,deepseekPricing],
    note:'웹·앱·API의 V4.1 Flash가 1017로 교체됐습니다. 이전 별칭은 이 버전으로 라우팅됩니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'평일 피크/오프피크',source:deepseekPricing,rates:[
      {label:'캐시 적중 · 오프피크',amount:0.003},{label:'캐시 적중 · 피크',amount:0.006},{label:'입력 · 오프피크',amount:0.15},
      {label:'입력 · 피크',amount:0.30},{label:'출력 · 오프피크',amount:0.60},{label:'출력 · 피크',amount:1.20}],
      note:'피크는 월–금 01:00–04:00·06:00–10:00 UTC. Search/Fetch는 2026-11-01부터 1,000회당 $0.75 예정입니다.'}});
  const oldDeepseek=models.find(m=>m.id==='deepseek-v4-1-flash');
  if(oldDeepseek){oldDeepseek.current=false;oldDeepseek.checkedAt=checkedAt;oldDeepseek.successorId='deepseek-v4-1-flash-1017';}

  model({id:'nemotron-3-5-bolt-74b-a9b',name:'Nemotron 3.5 Bolt 74B-A9B',family:'Nemotron 3.5',provider:'NVIDIA',region:'US',category:'multimodal',
    date:'2026-10-15',announcementDate:'2026-10-15',releaseDate:'2026-10-15',apiDate:null,access:'Open weights',accessType:'open-weights',
    license:'OpenMDW-1.1',params:'74B total / 9B active · Mamba-2–Transformer LatentMoE',context:'256K tokens',
    modality:'텍스트 · 이미지 · 영상 → 텍스트',highlight:'로컬 에이전트 작업과 24GB 양자화 배포를 겨냥한 비전-언어 모델',
    source:bolt,sourceLabel:'NVIDIA 공식 모델 카드',note:'BF16과 네이티브 2-bit 24GB 변형이 공개됐습니다. 자사 공개 API 단가는 없습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:bolt,note:'자체 호스팅용 공개 가중치이며 NVIDIA 자사 종량 API 단가는 확인되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaNemotron,aaStatus:'verified',note:'AA Intelligence Index 21.4점'}});

  model({id:'nemotron-3-5-super-vl-120b-a12b',name:'Nemotron 3.5 Super VL 120B-A12B',family:'Nemotron 3.5',provider:'NVIDIA',region:'US',category:'multimodal',
    date:'2026-10-15',announcementDate:'2026-10-15',releaseDate:'2026-10-15',apiDate:null,access:'Open weights',accessType:'open-weights',
    license:'OpenMDW-1.1',params:'120B total / 12B active · Mamba-2–Transformer MoE',context:'1M tokens',
    modality:'텍스트 · 이미지 · 영상 → 텍스트',highlight:'추론·코딩·문서·영상 이해와 도구 사용을 지원하는 NVIDIA 오픈 VLM',
    source:superVl,sourceLabel:'NVIDIA 공식 모델 카드',note:'BF16 기준 모델 카드 수치이며 NVFP4 배포 결과와 혼합하지 않습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:superVl,note:'자체 호스팅용 공개 가중치이며 NVIDIA 자사 종량 API 단가는 확인되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaNemotron,aaStatus:'verified',note:'AA Intelligence Index 26.5점 · BF16'}});

  const jaisModels=[
    ['jais-3-0-9b','Jais 3 0.9B','0.9B dense','128K tokens','https://huggingface.co/inception42/Jais-3-0.9B'],
    ['jais-3-3-7b','Jais 3 3.7B','3.7B dense','512K tokens','https://huggingface.co/inception42/Jais-3-3.7B'],
    ['jais-3-7b','Jais 3 7B','7B dense','512K tokens','https://huggingface.co/inception42/Jais-3-7B'],
    ['jais-3-32b','Jais 3 32B','32B dense','512K tokens','https://huggingface.co/inception42/Jais-3-32B'],
    ['jais-3-mova-36b-a4b','Jais 3 MoVA 36B-A4B','36B total / 4B active · MoE + MoVA','512K tokens','https://huggingface.co/inception42/Jais-3-MoVA-36B-A4B'],
    ['jais-3-375b-a23b','Jais 3 375B-A23B','375B total / 23B active · MoE','512K tokens','https://huggingface.co/inception42/Jais-3-375B-A23B']
  ];
  for(const [id,name,params,context,source] of jaisModels)model({id,name,family:'Jais 3',provider:'Institute of Foundation Models',region:'UAE',category:'reasoning',
    date:'2026-10-15',announcementDate:'2026-10-15',releaseDate:'2026-10-15',apiDate:null,access:'Open source · Open weights',
    accessType:'open-source-license',license:'Apache-2.0',params,context,modality:'텍스트 · 도구 → 텍스트 · 코드',
    highlight:'아랍어·방언·도구 사용·파일 작업에 특화된 Jais 3 오픈 모델',source,sourceLabel:'Jais 3 공식 모델 카드',sources:[jais,source],
    note:'Jais 3 여섯 크기 중 하나입니다. 공식 블로그의 동일 하니스 결과만 별도 cohort로 기록합니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:jais,note:'오픈 웨이트 자체 호스팅 모델이며 공식 종량 API 단가는 발표되지 않았습니다.'}});

  model({id:'meshy-t2-5',name:'Meshy T2.5',family:'Meshy T',provider:'Meshy',region:'US',category:'3d',date:'2026-10-15',
    announcementDate:'2026-10-15',releaseDate:'2026-10-15',apiDate:'2026-10-15',access:'Meshy API',accessType:'api-only',license:'Meshy API Terms',
    params:'meshy-t2.5 · Smart Topology',context:'100–30,000 triangles · default 15,000',modality:'텍스트 · 이미지 → 3D mesh',
    highlight:'게임 에셋의 세부 표현과 삼각형 토폴로지를 개선한 Text/Image-to-3D 모델',source:meshy,sourceLabel:'Meshy API 공식 변경 기록',
    note:'Text to 3D·Image to 3D에 추가됐으며 Multi-Image to 3D는 지원하지 않습니다.',
    apiPricing:{status:'verified',checkedAt,currency:'CREDITS',unit:'생성 작업',tier:'Smart Topology',source:meshyPricing,rates:[
      {label:'텍스처 없음',amount:5},{label:'텍스처 포함',amount:15},{label:'8K 텍스처',amount:20}],note:'Meshy T2와 동일한 공식 크레딧 단가입니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:meshy,aaStatus:'not-applicable',note:'비교 가능한 공식 3D 벤치마크 수치 미공개'}});

  for(const [id,name,highlight] of [
    ['gpt-live-1-1','GPT-Live-1.1','더 자연스러운 다국어 억양과 검색 안내를 지원하는 ChatGPT Voice 업데이트'],
    ['gpt-live-1-1-quip','GPT-Live-1.1 Quip','GPT-Live-1.1의 경량 음성 대화 변형']
  ])model({id,name,family:'GPT-Live',provider:'OpenAI',region:'US',category:'voice',date:'2026-10-15',announcementDate:'2026-10-15',
    releaseDate:'2026-10-15',previewDate:null,apiDate:null,access:'ChatGPT Voice rollout',accessType:'custom-license',license:'OpenAI 서비스 약관',
    params:'공개 사양 참조',context:'ChatGPT Voice',modality:'음성 · 텍스트 · 이미지 → 음성 · 텍스트',highlight,source:live,sourceLabel:'OpenAI ChatGPT 공식 릴리스 노트',
    note:'ChatGPT Voice 롤아웃만 확인됐습니다. API 모델 ID·제공일·종량 단가는 추정하지 않았습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:live,note:'ChatGPT 제품 내 제공이며 별도 API 종량 단가는 공개되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:live,aaStatus:'unconfirmed',note:'비교 가능한 공식 음성 품질 수치 미공개'}});

  const beam=models.find(m=>m.id==='reflection-beam');
  if(beam){Object.assign(beam,{date:'2026-10-16',releaseDate:'2026-10-16',apiDate:'2026-10-16',current:true,checkedAt,
    access:'Open weights · Reflection API',accessType:'open-source-license',license:'Apache-2.0',source:beamRelease,sourceLabel:'Reflection Beam 정식 공개',
    sources:[beamRelease,'https://reflection.ai/beam-model-card','https://developers.reflection.ai/quickstart',aaBeam],
    note:'10월 5일 조기 접근 발표 뒤 10월 16일 Apache 2.0 가중치와 Reflection API가 정식 공개됐습니다. 공개 API 단가는 확인되지 않았습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:'https://developers.reflection.ai/quickstart',note:'API 사용 경로는 공개됐지만 공식 종량 단가는 확인되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaBeam,aaStatus:'verified',note:'AA Intelligence 30 · Cyber Index 34 · Coding Agent Index 28'}});}

  metric('personalSuperintelligenceMeta','Personal Superintelligence Index · Meta','Meta 내부 개인·전문 에이전트 복합 평가. 외부 지표와 분리.');
  metric('harveyLabAa11','Harvey LAB-AA v1.1','환각 검사 포함 all-pass 비율.');
  metric('valsFinanceV2','Vals Finance Agent V2','민간 금융 에이전트 정확도.');
  metric('healthBenchProMeta','HealthBench Pro · Meta','525개 전문 의료 문항의 길이 정규화 점수.');
  metric('osworld21Meta','OSWorld 2.1 · Meta','Meta 발표의 partial·binary 결과를 별도 표기.');
  metric('memoryBenchMeta','MemoryBench · Meta','Meta 발표의 메모리 평가.');
  metric('sweMarathon','SWE-Marathon','장기 소프트웨어 프로젝트 pass@1.');
  metric('programBench','ProgramBench','mini-swe-agent clean-room 프로그램 재구성.');
  metric('jobBench','JobBench','제공사 보고 업무 에이전트 평가.');
  metric('gdpvalAaV2Elo','GDPval-AA v2 · Elo','Elo 척도의 GDPval-AA v2. 정확도 비율과 분리.');
  metric('hleDiamond','HLE-Diamond · no tools','도구 없는 HLE-Diamond 제공사 평가.');
  metric('aaOmniscienceAccuracy','AA Omniscience · accuracy','정답률. hallucination rate·net index와 분리.');
  metric('zeroBenchTools','ZeroBench · tools','도구 사용 조건의 ZeroBench.');
  metric('babyVisionTools','BabyVision · tools','도구 사용 조건의 BabyVision.');
  metric('simpleVqaTools','SimpleVQA · tools','도구 사용 조건의 SimpleVQA.');
  metric('nl2RepoBench','NL2Repo-Bench','자연어 요구에서 저장소 수준 구현을 평가.');
  metric('apexBench11','Apex Bench v1.1','에이전트 업무 평가 v1.1.');
  metric('chartographyTools','Chartography · tools','도구 사용 차트 추론 평가.');
  metric('gdpvalAaV2Accuracy','GDPval-AA v2 · accuracy','정확도 척도. Elo 결과와 분리.');
  metric('aaLcr11','AA-LCR v1.1','Artificial Analysis 장문 추론 v1.1.');
  metric('aaOmniscienceNonHallucination','AA Omniscience · non-hallucination','비환각률. accuracy·index와 분리.');
  metric('pinchBench','PinchBench','제공사 모델 카드 결과.');
  metric('webArenaVision','WebArena · vision','비전 웹 에이전트 평가.');
  metric('mmluProX','MMLU-ProX','MMLU-ProX 제공사 카드 결과.');
  metric('aaOmniscienceHallucination','AA Omniscience · hallucination rate','낮을수록 좋은 환각률.', 'lower');
  metric('aaOmniscienceIndex','AA Omniscience · index','정확도와 환각을 결합한 지수.');
  metric('critPt','CritPt','Artificial Analysis CritPt 평가.');
  metric('apexShortlist','APEX shortlist','APEX shortlist 평가.');
  metric('liveCodeBenchV6','LiveCodeBench v6','공식 모델 카드의 v6 결과. 다른 release와 분리.');
  metric('sciCodeSubtask','SciCode · subtask','SciCode subtask 결과.');
  metric('graphWalks','GraphWalks','그래프 추론 평가.');
  metric('arenaV3Proxy','LMArena v3 proxy','제공사 proxy 평가. 공식 Text Arena와 분리.');
  metric('wmt24pp','WMT24++','번역 평가.');
  metric('tau2Retail','τ²-bench retail','소매 에이전트 평가.');
  metric('tau2Airline','τ²-bench airline','항공 에이전트 평가.');
  metric('tau2Telecom','τ²-bench telecom','통신 에이전트 평가.');
  metric('arabicAverage','Jais Arabic average','IFM의 감사된 아랍어 평가 묶음 평균.');
  metric('agenticAverageJais','Jais agentic average','IFM 동일 하니스 9개 에이전트 평가 평균.');
  metric('gdpval75','GDPval · 75% threshold','IFM의 75% 임계 정확도. Elo와 분리.');
  metric('mcpMark','MCPMark · pass@1','MCP 도구 사용 pass@1.');

  const wonderRows={
    'muse-wonder':[['personalSuperintelligenceMeta',54.3],['harveyLabAa11',10.0],['valsFinanceV2',56.6],['healthBenchProMeta',60.5],['automationBench',39.1],['memoryBenchMeta',85.6],['terminal4',52.0],['deepSWE',78.8],['sweMarathon',53.1],['programBench',50.0]],
    'muse-wonder-full':[['personalSuperintelligenceMeta',59.1],['harveyLabAa11',13.1],['valsFinanceV2',59.1],['healthBenchProMeta',62.3],['automationBench',45.4],['memoryBenchMeta',85.5],['terminal4',57.1],['deepSWE',79.0],['sweMarathon',57.5],['programBench',59.0]]
  };
  for(const [modelId,data] of Object.entries(wonderRows))for(const [benchmark,score] of data)add({modelId,modelVariant:'max',score,unit:'%',benchmark,
    cohort:'meta-muse-wonder-20261012-'+benchmark,cohortLabel:'Meta Muse Wonder 모델 카드 · 2026-10-12',source:museWonderCard,sourceLabel:'Meta 공식 모델 카드',
    publishedAt:'2026-10-12',benchmarkVersion:metrics[benchmark].name,harness:'Meta 모델 카드에 명시된 출처·평가 하니스',tools:'평가별 원문 조건',reasoningBudget:'max · 세부 토큰 예산 미공개'});

  [
    ['muse-wonder-full','max',56,aaWonderFull,'약 140M output tokens / 전체 지수'],
    ['muse-wonder','max',52,aaWonder,'약 130M output tokens / 전체 지수'],
    ['muse-spark-open','xhigh',39,museOpen,'xhigh · temperature 1 · top_p 1 · top_k disabled'],
    ['reflection-beam','AA default',30,aaBeam,'약 26K output tokens / task'],
    ['nemotron-3-5-super-vl-120b-a12b','BF16 · thinking',26.5,aaNemotron,'약 46K output tokens / task'],
    ['nemotron-3-5-bolt-74b-a9b','BF16 · thinking',21.4,aaNemotron,'약 82K output tokens / task']
  ].forEach(([modelId,modelVariant,score,source,reasoningBudget])=>add({modelId,modelVariant,score,unit:'점',benchmark:'aaIntelligence432',
    cohort:'aa-v432-checked-20261019',cohortLabel:'Artificial Analysis Intelligence Index · 2026-10-12–16 공개',source,sourceLabel:'Artificial Analysis 최신 독립 평가',
    sourceType:'independent-leaderboard',rankMode:'reference',publishedAt:models.find(m=>m.id===modelId).releaseDate,benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',
    harness:'Artificial Analysis 독립 10개 평가 구성',tools:'평가별 AA 허용 도구',reasoningBudget}));

  [['aaCyberIndexV1',34,'Artificial Analysis Cyber Index v1'],['aaCodingAgent15',28,'Artificial Analysis Coding Agent Index v1.5']]
    .forEach(([benchmark,score,benchmarkVersion])=>add({modelId:'reflection-beam',modelVariant:'AA default',score,unit:'점',benchmark,
      cohort:'aa-reflection-beam-20261016-'+benchmark,cohortLabel:'Artificial Analysis Reflection Beam 독립 평가 · 2026-10-16',
      source:aaBeam,sourceLabel:'Artificial Analysis 독립 평가',sourceType:'independent-leaderboard',rankMode:'reference',publishedAt:'2026-10-16',
      benchmarkVersion,harness:'Artificial Analysis 독립 에이전트 평가',tools:'평가별 AA 허용 도구',reasoningBudget:'약 26K output tokens / task'}));

  const sparkRows=[['jobBench',61.8,'%'],['mcpAtlas',89.2,'%'],['gdpvalAaV2Elo',1401,' Elo'],['hleDiamond',26.1,'%'],['sciCodeReflection',58.5,'%'],
    ['aaOmniscienceAccuracy',25,'%'],['terminal21Provider',76.4,'%'],['deepSWE',60,'%'],['zeroBenchTools',50.0,'%'],['babyVisionTools',80.2,'%'],['simpleVqaTools',73.6,'%']];
  for(const [benchmark,score,unit] of sparkRows)add({modelId:'muse-spark-open',modelVariant:'xhigh',score,unit,benchmark,cohort:'meta-muse-spark-open-20261015',
    cohortLabel:'Meta Muse Spark Open 공식 모델 카드',source:museOpen,sourceLabel:'Meta 공식 모델 카드',publishedAt:'2026-10-15',benchmarkVersion:metrics[benchmark].name,
    harness:'Meta 공개 카드 · preferred/self-reported harness 보존',tools:/zero|baby|simple/i.test(benchmark)?'도구 사용':'평가별 원문 조건',reasoningBudget:'xhigh · temperature 1 · top_p 1 · top_k disabled'});

  const dsRows=[['hle',42.6],['terminal4',42.3],['deepSWE',77.0],['programBench',29.1],['nl2RepoBench',68.2],['automationBench',60.5],
    ['agentsLastExam',35.4],['apexBench11',72.1],['chartographyTools',83.0],['babyVisionTools',92.5],['zeroBenchTools',51.0]];
  for(const [benchmark,score] of dsRows)add({modelId:'deepseek-v4-1-flash-1017',modelVariant:'official 1017',score,unit:'%',benchmark,
    cohort:'deepseek-v41-flash-1017-'+benchmark,cohortLabel:'DeepSeek V4.1 Flash 1017 공식 모델 카드',source:deepseek,sourceLabel:'DeepSeek 공식 모델 카드',
    publishedAt:'2026-10-17',benchmarkVersion:metrics[benchmark].name,harness:benchmark==='terminal4'?'Claude Code harness':benchmark==='deepSWE'?'Mini-SWE-V2':'DeepSeek 공식 평가',
    tools:/Tools|agents|automation/i.test(benchmark)?'도구 사용':'원문 조건',reasoningBudget:'공식 1017 설정 · 세부 토큰 예산 미공개'});

  const boltRows=[['gdpvalAaV2Accuracy',31.13],['terminal21Provider',53.93],['tau3Banking',17.01],['hle',28.73],['aaOmniscienceAccuracy',21.80],
    ['sciCodeReflection',44.49],['gpqa',88.83],['aaLcr11',67.38],['aaOmniscienceNonHallucination',56.14],['pinchBench',90.35],['mcpAtlas',55.60],['browse',70.00],['webArenaVision',50.25]];
  for(const [benchmark,score] of boltRows)add({modelId:'nemotron-3-5-bolt-74b-a9b',modelVariant:'BF16 · thinking',score,unit:'%',benchmark,
    cohort:'nvidia-nemotron35-bolt-20261015',cohortLabel:'NVIDIA Nemotron 3.5 Bolt 공식 카드 · BF16',source:bolt,sourceLabel:'NVIDIA 공식 모델 카드',
    publishedAt:'2026-10-15',benchmarkVersion:metrics[benchmark].name,harness:'NVIDIA 공식 BF16 모델 카드 평가',tools:'평가별 원문 조건',reasoningBudget:'thinking on · 세부 토큰 예산 미공개'});

  const superRows=[['gpqa',89.52,'%'],['hle',31.79,'%'],['mmluProX',76.91,'%'],['aaOmniscienceAccuracy',26.20,'%'],['aaOmniscienceHallucination',30.0,'%'],
    ['aaOmniscienceIndex',4.03,'점'],['critPt',10.86,'%'],['apexShortlist',88.36,'%'],['liveCodeBenchV6',88.22,'%'],['sciCodeSubtask',47.13,'%'],
    ['aaLcr11',68.62,'%'],['graphWalks',89.71,'%'],['ifBench',70.86,'%'],['arenaV3Proxy',52.67,'%'],['wmt24pp',84.80,'%'],
    ['tau2Retail',69.24,'%'],['tau2Airline',76.50,'%'],['tau2Telecom',73.19,'%'],['tau3Banking',18.88,'%'],['gdpvalAaV2Elo',1211,' Elo'],
    ['browse',78,'%'],['sweVerifiedReflection',71.10,'%'],['sweMultilingual',67.72,'%'],['swePro',51.78,'%'],['terminal21Provider',60.67,'%']];
  for(const [benchmark,score,unit] of superRows)add({modelId:'nemotron-3-5-super-vl-120b-a12b',modelVariant:'BF16 · thinking',score,unit,benchmark,
    cohort:'nvidia-nemotron35-super-vl-20261015',cohortLabel:'NVIDIA Nemotron 3.5 Super VL 공식 카드 · BF16',source:superVl,sourceLabel:'NVIDIA 공식 모델 카드',
    publishedAt:'2026-10-15',benchmarkVersion:metrics[benchmark].name,harness:'NVIDIA 공식 BF16 모델 카드 평가',tools:'평가별 원문 조건',reasoningBudget:'thinking on · 권장 sampling · 세부 토큰 예산 미공개'});

  const jaisScores={
    'jais-3-0-9b':[68.5,null,null,null,null,null],
    'jais-3-3-7b':[78.1,44.5,41.2,54.5,30.7,68.0],
    'jais-3-7b':[79.4,49.5,46.4,60.5,49.6,70.2],
    'jais-3-32b':[83.1,60.0,63.7,75.5,66.1,72.4],
    'jais-3-mova-36b-a4b':[82.5,57.4,67.3,67.7,69.3,72.8],
    'jais-3-375b-a23b':[84.0,60.2,73.8,73.2,68.5,70.2]
  };
  const jaisKeys=['arabicAverage','agenticAverageJais','terminal21Provider','gdpval75','mcpMark','sweVerifiedReflection'];
  for(const [modelId,scores] of Object.entries(jaisScores))scores.forEach((score,i)=>{if(score!==null)add({modelId,modelVariant:'high reasoning',score,unit:'%',benchmark:jaisKeys[i],
    cohort:'ifm-jais3-20261015-'+jaisKeys[i],cohortLabel:'IFM Jais 3 공식 동일 하니스 평가',source:jais,sourceLabel:'IFM Jais 3 공식 발표',publishedAt:'2026-10-15',
    benchmarkVersion:metrics[jaisKeys[i]].name,harness:'IFM 공통 generation-based 평가 · 공식 비교 표',tools:i>0?'에이전트 하니스 · 항목별 도구':'없음',reasoningBudget:'high · 최소 32,768 output tokens 권장'});});

  const checks={
    aaIntelligence432:[aaWonder,'Muse Wonder 52·Full 56, Muse Spark Open 39, Beam 30, Nemotron Super 26.5·Bolt 21.4를 최신 AA cohort로 추가.'],
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','기간 내 동일 하니스 신규 공식 MMLU-Pro 점수 미확인. Nemotron의 MMLU-ProX는 별도 지표로 등록.'],
    gpqa:[superVl,'Nemotron Super VL 89.52·Bolt 88.83과 Muse Spark Open 89.0 제공사 조건을 분리 등록.'],
    aime2026:['https://huggingface.co/datasets/MathArena/aime_2026','기간 내 신규 공식 AIME 2026 점수 미확인. 추정값 미등록.'],
    liveCodeBench:[superVl,'Nemotron Super VL의 LiveCodeBench v6 88.22를 기존 v2와 별도 지표로 등록.'],
    mmmuPro:['https://github.com/MMMU-Benchmark/MMMU','기간 내 비교 가능한 신규 공식 MMMU-Pro 수치 미확인.'],
    swe:[jais,'Jais 3 제공사 동일 하니스 SWE-bench Verified와 Nemotron 변형을 별도 cohort로 등록.'],
    terminal4:[deepseek,'DeepSeek 1017 42.3과 AA Muse Wonder 결과를 하니스별 분리 등록.'],
    arena:['https://arena.ai/leaderboard/chat/text','10월 18일까지 신규 모델의 안정된 공식 Text Arena 전체 스냅샷을 확인하지 못해 기존 10월 8일 순위를 유지.']
  };
  for(const [key,[source,note]] of Object.entries(checks))upsert(snapshots,{id:'review-2026-10-19-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,
    source,sourceLabel:'공식 1차 출처 확인',version:'수시 확인 기록',note},x=>x.id);
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
