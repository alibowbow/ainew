/* Official-source review: 2026-10-19–2026-10-26, checked 2026-10-26 KST.
 * Release, preview, API, weight-publication, evaluation and retrieval dates remain separate.
 */
function applyWeekly20261026(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-26';
  const kimi='https://www.kimi.ai/blog/kimi-k3-1-pro';
  const kimiApi='https://platform.kimi.ai/';
  const nemotron='https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB';
  const nemotronResearch='https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/';
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

  model({id:'kimi-k3-1-pro',name:'Kimi K3.1 Pro',family:'Kimi K3.1',provider:'Moonshot AI',region:'China',category:'reasoning',
    regionTags:['China','China API','China planned open weights'],date:'2026-10-23',announcementDate:'2026-10-23',releaseDate:'2026-10-23',apiDate:'2026-10-23',
    access:'Kimi.ai · Kimi Work · Kimi Code · Kimi API',accessType:'api-only',license:'Kimi API 서비스 약관 · 가중치 라이선스 미공개',
    params:'3T-class · kimi-k3.1-pro / kimi-k3.1-pro-highspeed',context:'1M tokens',modality:'텍스트 · 이미지 · 영상 · 도구 → 텍스트 · 코드',
    highlight:'장기 코딩·3D 제작·금융 리서치·멀티모달 에이전트 작업을 강화한 K3 후속 모델',source:kimi,sourceLabel:'Moonshot AI Kimi K3.1 Pro 공식 기술 블로그',
    sources:[kimi,kimiApi],plannedWeightsDate:'2026-11-04',
    note:'10월 23일 제품·API가 정식 제공됐습니다. 전체 가중치는 11월 4일까지 공개 예정일 뿐 아직 배포되지 않아 현재 접근 유형은 API 전용이며, weightsDate와 라이선스는 미확인으로 남겼습니다. Highspeed는 동일 지능의 2–3배 속도 API 변형입니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'Kimi API',source:kimiApi,rates:[
      {label:'Pro 입력',amount:2},{label:'Pro 출력',amount:10},{label:'Pro 캐시 쓰기',amount:2},{label:'Pro 캐시 적중',amount:0.2},
      {label:'Highspeed 입력',amount:4},{label:'Highspeed 출력',amount:20},{label:'Highspeed 캐시 쓰기',amount:4},{label:'Highspeed 캐시 적중',amount:0.2}],
      note:'공식 Kimi API 페이지 확인값입니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:kimi,aaStatus:'unconfirmed',note:'Moonshot 제공사 평가를 max effort·하니스별 코호트로 등록. 독립 리더보드 점수와 합산하지 않음'}});

  model({id:'nemotron-3-5-bolt-e4b-4gb',name:'Nemotron 3.5 Bolt E4B 4GB',family:'Nemotron 3.5 / Gemma 4',provider:'NVIDIA',region:'US',category:'llm',
    date:'2026-10-23',announcementDate:'2026-10-23',releaseDate:'2026-10-23',apiDate:'2026-10-23',weightsDate:'2026-10-23',
    access:'Open weights · Hugging Face · Build.NVIDIA.com',accessType:'open-weights',license:'OpenMDW-1.1 · Gemma 4 기반 Apache-2.0 조건',
    params:'8B total / 4B effective · Gemma-4-E4B · Q4_K_M (약 4GB) / BF16',context:'64K input · 64K output',modality:'텍스트 → 텍스트 · 도구',
    highlight:'로컬 음성·디바이스 보조와 멀티턴 도구 사용을 위한 저메모리 Gemma 4 파생 모델',source:nemotron,sourceLabel:'NVIDIA 공식 모델 카드',
    sources:[nemotron,nemotronResearch],note:'Hugging Face 가중치와 Build.NVIDIA.com 제공일은 모두 10월 23일입니다. Q4_K_M와 BF16 점수는 정밀도 조건을 분리해 기록했습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:nemotron,note:'오픈 웨이트 모델이며 Build.NVIDIA.com의 공식 종량 단가는 확인되지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:nemotron,aaStatus:'unconfirmed',note:'NVIDIA NeMo Gym 동일 하니스의 BF16·Q4_K_M 결과를 변형별로 분리 등록'}});

  metric('officeQaProV2','OfficeQA Pro v2','이미지로 렌더링한 재무 PDF 묶음의 검색·교차 검증·수치 추론 평가.');
  metric('gdpvalAaV21Elo','GDPval-AA v2.1 · Elo','Artificial Analysis GDPval-AA v2.1 Elo. 정확도 지표와 분리.');
  metric('hleFullTools','Humanity\'s Last Exam Full · tools','HLE 전체 2,500문항 도구 사용 정확도.');
  metric('kimiCodeBench30Long','Kimi Code Bench 3.0 Long-horizon','Moonshot 내부 장기 코딩 에이전트 평가.');
  metric('benchCadTools','BenchCAD Vision2Code · tools','1,000-case 표본의 CAD 코드 생성 Voxel IoU · 도구 사용.');
  metric('osworld21KimiAgent','OSWorld V2.1 · Kimi Agent','Kimi Agent 하니스의 OSWorld V2.1 평가.');
  metric('gdpPdfStrict','GDP.pdf · strict pass','페이지 이미지와 추출 텍스트 입력의 엄격 통과율.');
  metric('multiChallenge','MultiChallenge','다회전 대화 지시 준수 평가.');
  metric('roleMrc','RoleMRC','역할 기반 장문 독해 평가.');
  metric('bfclV3','BFCL v3','Berkeley 함수 호출 평가 v3.');
  metric('when2CallMulti','When2Call Multi-Turn','다회전 도구 호출 시점 평가.');
  metric('toolSandbox','ToolSandbox','상태 기반 다회전 도구 사용 평가.');
  metric('tau2Aggregate','τ²-bench · aggregate','NVIDIA 모델 카드의 τ²-bench 집계 결과.');
  metric('ruler64k','RULER · 64K','64K 장문 컨텍스트 평가.');
  metric('longBench2_48k','LongBench v2 · 48K','48K 장문 추론 평가.');
  metric('relyToolBench','RelyToolBench','신뢰 가능한 도구 사용 평가.');

  const kimiRows=[
    ['terminal4',65.7,'%','Terminal-Bench 4.0','Claude Code','터미널 도구'],
    ['terminalScience01',38.1,'%','Terminal-Bench-Science 0.1','Claude Code','과학 터미널 도구'],
    ['agentsLastExam',43.2,'%','Agents\' Last Exam v1.1 · 122 tasks','Kimi Code','86 CLI tasks 포함'],
    ['officeQaProV2',64.4,'점','OfficeQA Pro v2','Claude Code · PDF 전부 이미지로 제공','문서·코드 도구'],
    ['gdpvalAaV21Elo',1846,'Elo','GDPval-AA v2.1','Artificial Analysis 평가','평가별 AA 도구'],
    ['hleFullTools',70.0,'%','Humanity\'s Last Exam Full · 2,500 questions','Moonshot 공식 평가','도구 사용'],
    ['chartographyTools',90.2,'%','ChartoGraphy · five-run average','Moonshot 공식 평가','도구 사용'],
    ['sweMarathon',51.7,'%','SWE-Marathon v1.1','Claude Code','저장소 도구'],
    ['kimiCodeBench30Long',61.2,'%','Kimi Code Bench 3.0 Long-horizon','Claude Code','코딩 도구'],
    ['benchCadTools',92.7,'%','BenchCAD Vision2Code · 1,000-case subset · Voxel IoU','Claude Code','CAD·코드 도구'],
    ['valsFinanceV2',58.6,'%','Frontier Finance · finance agent v2','공식 finance agent v2','금융 도구'],
    ['osworld21KimiAgent',79.6,'%','OSWorld V2.1','Kimi Agent · official OSWorld v2 repo','컴퓨터 사용'],
    ['gdpPdfStrict',34.6,'%','GDP.pdf · strict pass','Gemini 3.5 Flash Medium judge · official prompt','Python · 문서 도구'],
    ['zeroBenchTools',63.0,'%','ZeroBench_main · pass@5','Moonshot 공식 평가 · five-run average','도구 사용'],
    ['mmmuPro',84.1,'%','MMMU-Pro · official protocol','원본 입력 순서 · 이미지를 텍스트 앞에 배치','도구 없음']
  ];
  for(const [benchmark,score,unit,benchmarkVersion,harness,tools] of kimiRows)add({modelId:'kimi-k3-1-pro',modelVariant:'max',score,unit,benchmark,
    cohort:'moonshot-kimi-k31-pro-20261023-'+benchmark,cohortLabel:'Moonshot Kimi K3.1 Pro 공식 평가 · 2026-10-23',source:kimi,sourceLabel:'Moonshot AI 공식 기술 블로그',
    publishedAt:'2026-10-23',benchmarkVersion,harness,tools,reasoningBudget:'max · temperature 1.0 · top_p 0.95 · 세부 토큰 상한은 평가별 원문 참조'});

  const nemotronRows=[
    ['multiChallenge',53.10,55.60],['roleMrc',80.63,79.12],['bfclV3',68.51,67.31],['when2CallMulti',63.36,60.50],
    ['toolSandbox',68.77,74.13],['tau2Aggregate',55.10,52.32],['ifBench',63.79,64.00],['ruler64k',86.99,85.76],
    ['longBench2_48k',50.50,48.67],['relyToolBench',63.16,69.29]
  ];
  for(const [benchmark,bf16,q4] of nemotronRows){
    add({modelId:'nemotron-3-5-bolt-e4b-4gb',modelVariant:'BF16 · reasoning',score:bf16,unit:'%',benchmark,
      cohort:'nvidia-nemotron35-bolt-e4b-bf16-20261023',cohortLabel:'NVIDIA Nemotron 3.5 Bolt E4B 공식 카드 · BF16',source:nemotron,sourceLabel:'NVIDIA 공식 모델 카드',
      publishedAt:'2026-10-23',benchmarkVersion:metrics[benchmark].name,harness:'NVIDIA NeMo Gym 동일 하니스',tools:'평가별 원문 조건',reasoningBudget:'reasoning mode · runtime budget 수치 미공개'});
    add({modelId:'nemotron-3-5-bolt-e4b-4gb',modelVariant:'Q4_K_M · reasoning',score:q4,unit:'%',benchmark,
      cohort:'nvidia-nemotron35-bolt-e4b-q4-20261023',cohortLabel:'NVIDIA Nemotron 3.5 Bolt E4B 4GB 공식 카드 · Q4_K_M',source:nemotron,sourceLabel:'NVIDIA 공식 모델 카드',
      publishedAt:'2026-10-23',benchmarkVersion:metrics[benchmark].name,harness:'NVIDIA NeMo Gym 동일 하니스',tools:'평가별 원문 조건',reasoningBudget:'reasoning mode · runtime budget 수치 미공개'});
  }

  const checks={
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','공식 MMLU-Pro 공간을 확인했으나 기간 내 신규 모델의 비교 가능한 동일 하니스 수치는 확인하지 못해 추정값을 추가하지 않음.'],
    gpqa:['https://github.com/idavidrein/gpqa','GPQA 원 데이터·공식 코드와 이번 주 모델 카드를 점검. 신규 두 모델의 GPQA Diamond 공식 수치는 확인되지 않음.'],
    aime2026:['https://matharena.ai/?comp=aime--aime_2026','MathArena AIME 2026을 확인. 이번 주 신규 두 모델의 공식 결과가 없어 기존 코호트를 유지.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','LiveCodeBench 공식 보드를 확인. 신규 두 모델의 버전·하니스가 명시된 공식 결과가 없어 미등록.'],
    mmmuPro:[kimi,'Kimi K3.1 Pro 84.1%를 official protocol·원본 순서·image-first 조건으로 별도 제공사 코호트에 등록.'],
    swe:['https://www.swebench.com/','SWE-bench 공식 보드를 확인. Kimi 발표의 SWE-Marathon v1.1은 SWE-bench와 합치지 않고 별도 지표로 유지.'],
    terminal4:['https://www.tbench.ai/','공개 Terminal-Bench 4.0 보드와 Moonshot 제공사 평가를 확인. Kimi 65.7%는 Claude Code·max 제공사 코호트로 분리.'],
    arena:['https://arena.ai/leaderboard/chat/text','공식 Text Arena 스냅샷은 2026-10-22 · 8,946,356 votes · 418 models. Kimi는 10월 23일 공개라 이 스냅샷에 없음.']
  };
  for(const [key,[source,note]] of Object.entries(checks))upsert(snapshots,{id:'review-2026-10-26-'+key,key,name:metrics[key].name,checkedAt,
    snapshotDate:key==='arena'?'2026-10-22':null,source,sourceLabel:'공식 1차 출처 확인',version:key==='arena'?'Text Arena · 2026-10-22':'수시 확인 기록',note},x=>x.id);

  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
