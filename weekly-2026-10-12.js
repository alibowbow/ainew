/* Official-source review: 2026-10-05–2026-10-11, checked 2026-10-12 KST.
 * Release, preview, API, evaluation and retrieval dates remain separate.
 */
function applyWeekly20261012(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-12';
  const beam='https://reflection.ai/blog/introducing-beam';
  const mistral='https://docs.mistral.ai/models/mistral-large-4-0';
  const aaMistral='https://artificialanalysis.ai/articles/mistral-large-4-france-ai';
  const haiku='https://www.anthropic.com/claude-haiku-5-5';
  const haikuDocs='https://platform.claude.com/docs/en/models/haiku-5-5/overview';
  const aaHaiku='https://artificialanalysis.ai/articles/claude-haiku-5-5';
  const aaHarvey='https://artificialanalysis.ai/articles/harvey-lab-aa-v1-1';
  const arena='https://arena.ai/leaderboard/chat/text';
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

  model({id:'reflection-beam',name:'Beam',family:'Beam',provider:'Reflection AI',region:'US',category:'reasoning',
    date:'2026-10-05',announcementDate:'2026-10-05',previewDate:'2026-10-05',releaseDate:null,apiDate:null,
    access:'제한 조기 접근 · 가중치 공개 예정',accessType:'custom-license',license:'조기 접근 약관 · Apache-2.0 예정',
    params:'501B total / 23B active · sparse MoE',context:'1M effective · RL max 256K',modality:'텍스트 · 도구 → 텍스트 · 코드',
    highlight:'코딩·추론·에이전트 작업을 위한 고효율 MoE 프리뷰',source:beam,sourceLabel:'Reflection Beam 공식 발표',
    note:'10월 5일 발표된 선택형 조기 접근 프리뷰입니다. 10월 중 가중치·모델 카드·기술 보고서와 Apache 2.0 공개를 예고했지만 확인일 현재 실제 가중치는 공개 전이므로 오픈 웨이트 필터에 포함하지 않습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:beam,note:'공식 공개 API 단가가 발표되지 않았습니다.'}});

  model({id:'mistral-large-4-preview',name:'Mistral Large 4 Preview',family:'Mistral Large 4',provider:'Mistral AI',region:'Europe',category:'multimodal',
    date:'2026-10-06',announcementDate:'2026-10-06',previewDate:'2026-10-06',releaseDate:null,apiDate:'2026-10-06',
    access:'API · Research Public Preview',accessType:'api-only',license:'Mistral API terms · 가중치 라이선스 공개 대기',
    params:'1.05T total / 52B active · 1.6B vision encoder · mistral-large-4',context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',
    highlight:'네이티브 멀티모달·에이전트·사이버 작업용 대형 MoE 프리뷰',source:mistral,sourceLabel:'Mistral Large 4 공식 모델 문서',
    sources:[mistral,aaMistral],note:'10월 6일 API 공개 프리뷰입니다. Mistral 문서는 open-weight 모델로 소개하지만 실제 가중치 공개는 10월 말 예정으로 안내되어 확인일 현재 오픈 웨이트 필터에 포함하지 않습니다. 모델 문서의 1M 컨텍스트와 AA 평가 구성의 512K를 구분합니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'출시 할인',source:mistral,rates:[
      {label:'입력',amount:0.68},{label:'출력',amount:2.09},{label:'캐시 입력',amount:0.07}],
      standardRates:[{label:'입력',amount:1.36},{label:'출력',amount:4.18},{label:'캐시 입력',amount:0.14}],
      note:'현재 공식 모델 문서의 50% 출시 할인. 표준 단가는 입력 $1.36·출력 $4.18·캐시 입력 $0.14입니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaMistral,aaStatus:'verified',note:'AA Intelligence 38 · Cyber 50 · GDP.pdf 19%'}});

  model({id:'claude-haiku-5-5',name:'Claude Haiku 5.5',family:'Claude 5.5',provider:'Anthropic',region:'US',category:'reasoning',
    date:'2026-10-07',announcementDate:'2026-10-07',releaseDate:'2026-10-07',previewDate:null,apiDate:'2026-10-07',
    access:'Closed / API',accessType:'api-only',license:'Anthropic 이용약관',params:'claude-haiku-5-5 · 최대 출력 128K',
    context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',highlight:'고속·대량·비용 민감 작업과 서브에이전트용 소형 Claude',
    source:haikuDocs,sourceLabel:'Anthropic Haiku 5.5 공식 모델 사양',sources:[haiku,haikuDocs],
    note:'10월 7일 모든 지원 플랫폼과 API에 정식 공개됐습니다. Adaptive thinking 기본 medium이며 Batch API의 최대 300K 출력은 베타입니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'프롬프트 길이별',source:haikuDocs,rates:[
      {label:'입력 ≤100K',amount:0.10},{label:'출력 ≤100K',amount:0.50},{label:'입력 >100K',amount:0.50},{label:'출력 >100K',amount:2.50},
      {label:'캐시 읽기 ≤100K',amount:0.01},{label:'캐시 읽기 >100K',amount:0.05},{label:'캐시 쓰기 5분 ≤100K',amount:0.125},{label:'캐시 쓰기 1시간 ≤100K',amount:0.20}],
      note:'100K 초과 프롬프트는 5배 장문 단가. Batch 입력·출력은 50% 할인입니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaHaiku,aaStatus:'verified',note:'AA v4.3.2 effort별 29–43점 · 독립 Terminal-Bench 4.0 33점'}});

  const sonnet=models.find(m=>m.id==='claude-sonnet-5-5');
  if(sonnet){sonnet.apiPricing={status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API',source:'https://platform.claude.com/docs/en/about-claude/pricing',
    rates:[{label:'입력',amount:2},{label:'출력',amount:10},{label:'캐시 읽기',amount:0.10},{label:'캐시 쓰기 · 5분',amount:2.5},{label:'캐시 쓰기 · 1시간',amount:4}],
    note:'글로벌 표준 단가. 2026-10-07부터 캐시 읽기 $0.10/MTok. Batch 입력 $1 / 출력 $5; 지역 처리·도구 사용료 별도.'};sonnet.checkedAt=checkedAt;}
  const rolloutNote='10월 7일 ChatGPT 전면 롤아웃 발표에서 기존 GPT-6 Sol·Luna가 각각 유료·Free/Go 기본 계열로 확대됐습니다. 별도 신규 기반 모델로 중복 등록하지 않습니다.';
  for(const id of ['gpt-6-sol','gpt-6-luna']){const m=models.find(x=>x.id===id);if(m){m.checkedAt=checkedAt;m.availabilityUpdateDate='2026-10-07';if(!String(m.note||'').includes(rolloutNote))m.note=((m.note||'')+' '+rolloutNote).trim();}}

  metric('sweProV2Hard','SWE-bench Pro v2-Hard · provider','Reflection 공식 발표의 v2-Hard 제공사 수치. 다른 SWE-bench 변형과 분리.');
  metric('sweProV1','SWE-bench Pro v1 · provider','Reflection 공식 발표의 v1 제공사 수치. v2-Hard와 분리.');
  metric('sweAtlasQnaReflection','SWE-Atlas Codebase QnA · Reflection','Reflection 발표의 제공사 실행 결과. 다른 하니스와 통합하지 않음.');
  metric('sweVerifiedReflection','SWE-bench Verified · Reflection','Reflection 발표의 제공사 하니스 결과. Bash/OpenHands와 별도.');
  metric('sciCodeReflection','SciCode · Reflection','Reflection 발표의 제공사 실행 결과.');
  metric('mcpAtlas','MCP Atlas · provider','도구 호출 평가. 제공사별 하니스·예산을 보존.');
  metric('tau3Banking','τ³-Banking · provider','은행 업무 에이전트 평가. 제공사별 하니스와 설정을 보존.');
  metric('aaLcrReflection','AA-LCR · Reflection','Reflection 발표의 장문 추론 수치.');
  metric('longBench2','LongBench v2 · provider','장문 벤치마크 v2 제공사 결과.');
  metric('ifBench','IFBench · provider','지시 이행 벤치마크 제공사 결과.');
  metric('aaOmnisciencePublic','AA Omniscience · public split','공개 split만 사용한 제공사 결과.');
  metric('aaCyberIndexV1','Artificial Analysis Cyber Index · v1','AA 독립 사이버 평가 복합 지수. 공개·제한 접근 상태를 구분.');
  metric('cyberGymE2eAa','CyberGym-E2E-AA','AA 독립 사이버 에이전트 평가.');
  metric('aaGdpPdf','GDP.pdf · all-pass','문서·이미지 기반 전문 업무의 AA 독립 all-pass 비율.');
  metric('harveyLabAa11','Harvey LAB-AA v1.1 · hallucination-gated all-pass','120개 법률 작업·Stirrup agent harness·material hallucination gate.', 'higher');

  const beamRows=[
    ['deepSWE',44.4,'DeepSWE v1.1','에이전트 코딩'],['sweProV2Hard',77.2,'SWE-bench Pro v2-Hard','코딩 에이전트'],
    ['sweProV1',65.5,'SWE-bench Pro v1','코딩 에이전트'],['terminal21Provider',80.1,'Terminal-Bench 2.1','터미널'],
    ['sweAtlasQnaReflection',34.6,'SWE-Atlas Codebase QnA','코드베이스 탐색'],['sweMultilingual',78.0,'SWE-bench Multilingual','다국어 코딩'],
    ['sweVerifiedReflection',80.9,'SWE-bench Verified','코딩 에이전트'],['aime2026',97.8,'AIME 2026','도구 없음'],
    ['hle',36.2,"Humanity's Last Exam · no tools",'도구 없음'],['sciCodeReflection',49.7,'SciCode','과학 코딩'],
    ['gpqa',90.5,'GPQA Diamond','도구 없음'],['automationBench',37.0,'AutomationBench public','업무 자동화 도구'],
    ['mcpAtlas',78.7,'MCP Atlas','MCP 도구'],['tau3Banking',38.0,'τ³-Banking','은행 도구'],
    ['browse',77.4,'BrowseComp · context management','웹 검색·컨텍스트 관리'],['deepSearchQA',80.1,'DeepSearchQA · context management','웹 검색·컨텍스트 관리'],
    ['aaLcrReflection',79.3,'AA-LCR','장문 컨텍스트'],['longBench2',65.5,'LongBench v2','장문 컨텍스트'],
    ['ifBench',79.7,'IFBench','도구 없음'],['aaOmnisciencePublic',13.0,'AA Omniscience · public split','도구 없음']
  ];
  for(const [benchmark,score,benchmarkVersion,tools] of beamRows)add({modelId:'reflection-beam',modelVariant:'official preview',score,unit:'%',benchmark,
    cohort:'reflection-beam-20261008',cohortLabel:'Reflection Beam 공식 표 · 2026-10-08 갱신',source:beam,sourceLabel:'Reflection Beam 공식 발표',
    publishedAt:'2026-10-05',snapshotDate:'2026-10-08',benchmarkVersion,harness:'Reflection 공식 프리뷰 평가',tools,
    reasoningBudget:'reasoning effort·세부 토큰 예산 미공개',comparisonNote:'10월 8일 갱신된 Beam 제공사 보고 수치. 독립 리더보드와 합치지 않습니다.'});

  const haikuOfficial=[
    ['gdpvalAa21',1620,'GDPval-AA v2.1',' Elo','knowledge work'],['aaBriefcase11',1578,'AA-Briefcase v1.1',' Elo','knowledge work'],
    ['osworld21Partial',72.4,'OSWorld 2.1 · offline subset','%','컴퓨터 사용'],['hle',45.9,"Humanity's Last Exam · no tools",'%','도구 없음'],
    ['hleTools',57.4,"Humanity's Last Exam · with tools",'%','도구 사용'],['terminal4',39.2,'Terminal-Bench 4.0','%','터미널'],
    ['frontierCode',46.4,'FrontierCode 1.1 Main','%','코딩 에이전트'],['chartographyNoTools',46.4,'Chartography · no tools','%','도구 없음']
  ];
  for(const [benchmark,score,benchmarkVersion,unit,tools] of haikuOfficial)add({modelId:'claude-haiku-5-5',modelVariant:'Anthropic launch evaluation',score,unit,benchmark,
    cohort:'anthropic-haiku55-20261007-'+benchmark,cohortLabel:'Anthropic Haiku 5.5 발표 · 2026-10-07',source:haiku,sourceLabel:'Anthropic Haiku 5.5 공식 발표',
    publishedAt:'2026-10-07',benchmarkVersion,harness:'Anthropic 공식 출시 평가',tools,reasoningBudget:'발표 표 설정 · 세부 토큰 예산 미공개'});

  [['low',29],['medium',34],['high',38],['xhigh',41],['max',43]].forEach(([modelVariant,score])=>add({modelId:'claude-haiku-5-5',modelVariant,score,unit:'점',
    benchmark:'aaIntelligence432',cohort:'aa-v432-checked-20261012',cohortLabel:'AA v4.3.2 · 2026-10-07 신규 평가',source:aaHaiku,sourceLabel:'Artificial Analysis Haiku 5.5 독립 평가',
    sourceType:'independent-leaderboard',rankMode:'reference',publishedAt:'2026-10-07',benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',
    harness:'Artificial Analysis 독립 평가 · 10개 평가 구성',tools:'평가별 AA 허용 도구',reasoningBudget:modelVariant+' · 세부 토큰 예산 미공개'}));
  add({modelId:'claude-haiku-5-5',modelVariant:'max · AA independent',score:33,unit:'%',benchmark:'terminal4',cohort:'aa-haiku55-terminal4-20261007',
    cohortLabel:'AA 독립 평가 · 2026-10-07',source:aaHaiku,sourceLabel:'Artificial Analysis Haiku 5.5 독립 평가',sourceType:'independent-leaderboard',
    rankMode:'reference',publishedAt:'2026-10-07',benchmarkVersion:'Terminal-Bench 4.0',harness:'Artificial Analysis 독립 agent harness',tools:'터미널',
    reasoningBudget:'max · 약 162K output tokens/index task는 지능 지수 기준',comparisonNote:'Anthropic 제공사 수치 39.2와 하니스가 달라 별도 cohort로 유지합니다.'});

  [['aaIntelligence432',38,'점','Artificial Analysis Intelligence Index · v4.3.2'],['aaCyberIndexV1',50,'점','Artificial Analysis Cyber Index · v1'],
    ['cyberGymE2eAa',82,'%','CyberGym-E2E-AA'],['aaGdpPdf',19,'%','GDP.pdf · all-pass']].forEach(([benchmark,score,unit,benchmarkVersion])=>add({
      modelId:'mistral-large-4-preview',modelVariant:'API preview · AA configuration',score,unit,benchmark,cohort:benchmark==='aaIntelligence432'?'aa-v432-checked-20261012':'aa-mistral4-20261006-'+benchmark,
      cohortLabel:'Artificial Analysis Mistral Large 4 · 2026-10-06',source:aaMistral,sourceLabel:'Artificial Analysis Mistral Large 4 독립 평가',
      sourceType:'independent-leaderboard',rankMode:'reference',publishedAt:'2026-10-06',benchmarkVersion,harness:'Artificial Analysis 독립 평가 · 512K 구성',
      tools:'평가별 AA 허용 도구',reasoningBudget:'API 기본 설정 · 세부 토큰 예산 미공개'}));

  [
    ['grok-4-7','xhigh',9.4],['muse-spark-1-3','max',8.9],['gpt-6-astra','max',8.6],['gpt-6-1-sol','max',6.9],
    ['claude-fable-5-1','max · fallback',6.4],['kimi-k3','max',5.3],['claude-opus-5-5','max · fallback',4.2],['gpt-6-sol','max',3.6],['claude-sonnet-5-5','max',2.8]
  ].forEach(([modelId,modelVariant,score])=>add({modelId,modelVariant,score,unit:'%',benchmark:'harveyLabAa11',cohort:'harvey-lab-aa-v11-20261008',
    cohortLabel:'Harvey LAB-AA v1.1 · 2026-10-08',source:aaHarvey,sourceLabel:'Artificial Analysis Harvey LAB-AA v1.1',sourceType:'independent-leaderboard',rankMode:'official',
    publishedAt:'2026-10-08',benchmarkVersion:'Harvey LAB-AA v1.1 · hallucination-gated all-pass',harness:'Stirrup agent · 120 private legal tasks · three-judge panel',
    tools:'간단한 코드 실행 · Harvey custom tools 제외',reasoningBudget:modelVariant+' · 세부 토큰 예산 미공개',comparisonNote:'v1.1 headline metric. v1.0 또는 near-pass rate와 비교하지 않습니다.'}));

  [
    ['gemini-4-argon','high',1,1525,9,4892,true],['claude-opus-5-5','high',2,1507,8,6272,false],['claude-fable-5-1','max',6,1501,6,13063,false],
    ['gemini-3-8-flash','high',8,1497,5,31437,true],['muse-spark-1-3','max',9,1494,6,14694,false],['kimi-k3','max',16,1488,5,30351,false],
    ['gpt-6-1-sol','max',21,1484,9,4512,false],['mimo-v2-6-pro-api','API default',26,1480,9,4069,false],['glm53','max',27,1478,5,20049,false],
    ['claude-sonnet-5-5','xhigh',32,1476,9,4838,false],['gpt-6-astra','max',35,1475,7,10536,false],['deepseek-v4-1-flash','max',39,1475,7,10872,false],
    ['mistral-large-4-preview','API default',115,1429,9,4179,false]
  ].forEach(([modelId,modelVariant,officialRank,score,uncertainty,votes,preliminary])=>add({modelId,modelVariant,officialRank,score,uncertainty,votes,
    benchmark:'arena',unit:' Elo',rankMode:'official',status:preliminary?'Preliminary':'Published',publishedAt:'2026-10-08',snapshotDate:'2026-10-08',
    cohort:'arena-2026-10-08',cohortLabel:'Text Arena Overall · 2026-10-08',source:arena,sourceLabel:'Text Arena 공식 Overall 리더보드',sourceType:'independent-leaderboard',
    benchmarkVersion:'Text Arena Overall · 2026-10-08 · 조정 없음',harness:'Arena 블라인드 사용자 선호 투표',tools:'대화 평가 · 도구 조건 미기재',reasoningBudget:modelVariant+' · 세부 예산 미기재'}));

  const checks={
    aaIntelligence432:[aaHaiku,'Haiku 5.5 effort별 29–43점과 Mistral Large 4 38점 추가. 각 게시일·설정을 보존.'],
    aaCyberIndexV1:[aaMistral,'Mistral Large 4 50점. GPT-6 Sol Daybreak Blue는 제한 접근 리더이나 공개된 절대 점수를 확인하지 못해 행 미등록.'],
    harveyLabAa11:[aaHarvey,'v1.1 hallucination-gated all-pass 9개 모델 설정 기록. near-pass와 v1.0 분리.'],
    arena:[arena,'10월 8일 Overall 공식 순위 13개 등록 모델 설정·오차·투표수 발췌.'],
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','기간 내 신규 모델의 동일 하니스 공식 수치 미확인.'],
    gpqa:[beam,'Beam 90.5 제공사 수치 추가. 다른 하니스와 통합하지 않음.'],
    aime2026:[beam,'Beam 97.8 제공사 수치 추가. MathArena 독립 수치로 재표기하지 않음.'],
    liveCodeBench:['https://livecodebench.github.io/','기간 내 동일 버전·하니스 신규 공식 스냅샷 미확인.'],
    mmmuPro:['https://github.com/MMMU-Benchmark/MMMU','기간 내 신규 공식 모델 점수 미확인.'],
    swe:[beam,'Beam의 SWE-bench 변형 5종을 버전·하니스별 별도 지표로 등록.'],
    terminal4:[haiku,'Haiku 제공사 39.2와 AA 독립 33을 별도 cohort로 등록. Beam은 Terminal-Bench 2.1로 분리.']
  };
  for(const [key,[source,note]] of Object.entries(checks))upsert(snapshots,{id:'review-2026-10-12-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,
    source,sourceLabel:'공식 1차 출처 확인',version:'수시 확인 기록',note},x=>x.id);
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
