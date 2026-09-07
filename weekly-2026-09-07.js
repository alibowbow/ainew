/* Official-source review: 2026-08-31 through 2026-09-07.
 * Keep source dates, observation dates and release milestones independent.
 * This deterministic, idempotent migration is shared by the app and tests.
 */
function applyWeekly20260907(models, metrics, rows, snapshots) {
  const checkedAt = '2026-09-07';
  const google = 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/';
  const meta = 'https://research.meta.ai/blog/introducing-muse-spark-1-3';
  const voice = 'https://research.meta.ai/blog/introducing-muse-voice-transcribe';
  const methodology = 'https://research.meta.ai/static/muse-spark-1-3-multimodal-evaluation-methodology';
  const solar = 'https://www.upstage.ai/blog/ko/solar-pro-4';
  const ifm = 'https://huggingface.co/IFM/K2-Horizon-375B-A23B';
  const unknown = '미기재';
  function model(value) {
    const data = Object.assign({current:true, checkedAt, date:'', announcementDate:null, releaseDate:null,
      previewDate:null, apiDate:null, scores:{}, access:'Closed / API', accessType:'api-only',
      license:'제공사 이용약관', params:unknown, context:unknown, modality:'텍스트 · 이미지 → 텍스트',
      sourceStatus:'official'}, value);
    const existing = models.find(m => m.id === data.id);
    if (existing) Object.assign(existing, data); else models.push(data);
  }
  model({id:'gemini-3-8-flash',name:'Gemini 3.8 Flash',family:'Gemini',provider:'Google DeepMind',region:'US',category:'reasoning',
    date:'2026-09-02',announcementDate:'2026-09-02',releaseDate:'2026-09-02',apiDate:'2026-09-02',context:'1M tokens',
    highlight:'장기 코딩·도구 실행·전문 분야 추론을 강화한 Flash',source:google,sourceLabel:'Google 3.8 Flash 공식 발표'});
  model({id:'gemini-3-8-flash-cyber',name:'Gemini 3.8 Flash Cyber',family:'Gemini',provider:'Google DeepMind',region:'US',category:'reasoning',
    date:'2026-09-02',announcementDate:'2026-09-02',access:'제한 제공 · Fairwind Program',accessType:'custom-license',
    highlight:'검증된 방어자 대상 보안 특화 모델',source:google,sourceLabel:'Google 3.8 Flash Cyber 공식 발표',
    note:'2026-09-02 제한 제공 발표. 일반 공개 및 공개 API 최초 제공일은 확인되지 않았습니다.'});
  model({id:'muse-spark-1-3',name:'Muse Spark 1.3',family:'Muse',provider:'Meta',region:'US',category:'reasoning',
    date:'2026-09-02',announcementDate:'2026-09-02',releaseDate:'2026-09-02',apiDate:'2026-09-02',params:'max reasoning',
    highlight:'장기 에이전트·코딩·지시 이행 강화',source:meta,sourceLabel:'Meta Muse Spark 1.3 공식 발표',
    note:'현재 Muse Code 및 Meta Model API 제공. 오픈 웨이트는 향후 계획이며 아직 공개된 것으로 분류하지 않습니다.'});
  model({id:'muse-voice-transcribe',name:'Muse Voice Transcribe',family:'Muse Voice',provider:'Meta',region:'US',category:'voice',
    date:'2026-09-01',announcementDate:'2026-09-01',releaseDate:'2026-09-01',apiDate:'2026-09-01',
    modality:'스트리밍 음성 → 텍스트 · 화자 구분',context:'1시간 이상 음성 · 20+ 화자',params:'25개 언어 검증',
    highlight:'실시간 전사·화자 분리·발화 종료 감지',source:voice,sourceLabel:'Meta Muse Voice Transcribe 공식 발표'});
  model({id:'claude-mythos-5-1',name:'Claude Mythos 5.1',family:'Claude',provider:'Anthropic',region:'US',category:'reasoning',
    date:'2026-09-01',announcementDate:'2026-09-01',access:'제한 제공 · trusted access',accessType:'custom-license',
    highlight:'Fable 5.1과 동일 기반 모델 · 보안·생명과학용 별도 safeguards',source:'https://www.anthropic.com/claude-fable-and-mythos-5-1',
    sourceLabel:'Anthropic Fable / Mythos 5.1 공식 발표',
    note:'별도 학습 계보가 아닌 safeguards 변형입니다. 일반 출시로 표시하지 않으며 Fable 점수를 복제하지 않습니다.'});
  model({id:'gwm-worlds-2',name:'GWM Worlds 2',family:'Runway GWM',provider:'Runway',region:'US',category:'world',
    date:'2026-09-03',announcementDate:'2026-09-03',previewDate:'2026-09-03',access:'Research preview',accessType:'custom-license',
    license:'가중치 라이선스 미공개',modality:'이미지 · 텍스트 행동 · 카메라 → 영상 · 사운드',context:'720p · 24fps · 48kHz 오디오',
    highlight:'카메라·행동 입력에 반응하는 실시간 시청각 월드 모델',source:'https://runway.com/research/introducing-gwm-worlds-2',sourceLabel:'Runway GWM Worlds 2 연구 프리뷰'});
  model({id:'runway-solaris',name:'Solaris',family:'Runway',provider:'Runway',region:'US',category:'world',
    date:'2026-09-01',announcementDate:'2026-09-01',access:'Research paper',accessType:'custom-license',license:'모델 가중치 라이선스 미공개',
    modality:'마우스 행동 · 사용자 의도 → UI 프레임',highlight:'사용자 행동에 따라 인터페이스를 프레임 단위로 생성',
    source:'https://arxiv.org/abs/2609.00776',sourceLabel:'Solaris 논문 · arXiv v1',note:'논문 제출일을 출시일이나 API 제공일로 대체하지 않습니다.'});
  model({id:'worldlabs-atlas',name:'Atlas',family:'World Labs',provider:'World Labs',region:'US',category:'world',
    date:'2026-09-01',announcementDate:'2026-09-01',access:'연구 공개 · early access 신청',accessType:'custom-license',license:'모델 가중치 라이선스 미공개',
    modality:'텍스트 · 이미지 · 영상 · 3D → 이미지 · 영상 · 3D',context:'최대 1분 · 1440p 영상',
    highlight:'공간 일관성을 유지하는 생성·재구성·시뮬레이션 모델',source:'https://www.worldlabs.ai/blog/atlas',sourceLabel:'World Labs Atlas 공식 발표',
    note:'향후 Marble 등에 적용될 모델입니다. 기존 Marble API 제공일을 Atlas API 제공일로 재사용하지 않습니다.'});
  model({id:'solar-open-2',name:'Solar Open 2',family:'Solar',provider:'Upstage',region:'Korea',category:'llm',date:'2026-07-22',releaseDate:'2026-07-22',
    access:'Open weights',accessType:'open-weights',license:'상업 이용 가능 · 정확한 라이선스명 추가 확인 필요',params:'250B total · 15B active',
    context:'1M tokens',modality:'텍스트 · 도구 → 텍스트',highlight:'한국어·영어·일본어 업무와 에이전트 실행용 오픈 웨이트',
    source:'https://www.upstage.ai/blog/ko/solar-open-2',sourceLabel:'Upstage Solar Open 2 공식 발표',note:'이번 주 신작이 아닌 누락 계보 보강입니다.'});
  model({id:'solar-pro-4',name:'Solar Pro 4',family:'Solar',provider:'Upstage',region:'Korea',category:'reasoning',
    access:'API / 별도 계약 온프레미스',accessType:'custom-license',license:'Upstage API / 별도 계약',context:'512K · 최대 출력 128K',
    params:'solar-pro4',modality:'텍스트 · 도구 → 텍스트',highlight:'문서·터미널·다단계 도구 사용에 특화된 한국 에이전트 모델',
    source:solar,sourceLabel:'Upstage Solar Pro 4 공식 발표',note:'제공은 확인했으나 공식 페이지에 정확한 출시일·API 최초 제공일이 없어 미기재로 유지합니다.'});
  model({id:'muse-spark',name:'Muse Spark',family:'Muse',provider:'Meta',region:'US',category:'multimodal',date:'2026-04-08',releaseDate:'2026-04-08',
    access:'Meta AI / private API preview',highlight:'Muse 계열의 첫 네이티브 멀티모달 추론 모델',
    source:'https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/',sourceLabel:'Meta Muse Spark 최초 발표',
    note:'누락 계보 보강. API는 선택된 파트너의 private preview 계획이며 최초 제공일은 미기재입니다.'});
  model({id:'k2-horizon-375b-a23b',name:'K2 Horizon 375B-A23B',family:'K2 Horizon',provider:'IFM',region:'Global',category:'reasoning',
    access:'Open weights',accessType:'open-source-license',license:'Apache-2.0',params:'375B total · 23B active',context:'524,288 tokens',
    modality:'텍스트 · 도구 → 텍스트',highlight:'장기 도구 실행·코딩용 MoE 오픈 웨이트',source:ifm,sourceLabel:'IFM 공식 모델 카드',
    note:'최종 체크포인트 공개 확인. 학습 데이터·코드·중간 체크포인트는 카드에 향후 공개로 적혀 있어 완료로 표시하지 않습니다. 정확한 최초 공개일과 지역은 추가 확인 필요.'});
  ['gemma-4-e2b','gemma-4-e4b','gemma-4-26b-a4b','gemma-4-31b'].forEach(id => {
    const m = models.find(x => x.id === id);
    Object.assign(m,{date:'2026-04-02',releaseDate:'2026-04-02',checkedAt,license:'Apache-2.0',accessType:'open-source-license',
      source:'https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/',sourceLabel:'Google Gemma 4 공식 출시 발표'});
  });
  ['gpt-6-astra','claude-fable-5-1'].forEach(id => {models.find(m=>m.id===id).checkedAt=checkedAt;});
  const flash37=models.find(m=>m.id==='gemini-3-7-flash');
  flash37.updates=[{date:'2026-09-01',type:'capability',note:'Agentic video understanding 제공',source:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/'}];
  // Unknown dates sort last; observation dates must never masquerade as releases.
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  models.forEach(m=>{m.regionTags=m.region==='China'?['China'].concat(/^open-/.test(m.accessType)?['China open weights']:[]):m.region==='Korea'?['Korea']:[];});
  function metric(key,name,description){metrics[key]={key,name,description,rankable:false};}
  metric('liveCodeBenchUnspecified','LiveCodeBench · 버전 미기재','문제 기간·버전이 미기재인 제조사 수치. v2와 분리하고 순위를 부여하지 않습니다.');
  metric('terminal21Meta','Terminal-Bench 2.1 · Meta','Meta native harness 평가. 4.0 및 다른 하니스와 분리합니다.');
  metric('terminal21Solar','Terminal-Bench 2.1 · Upstage','Upstage 발표 수치. 하니스·예산 미기재로 순위 제외.');
  metric('terminal21Ifm','Terminal-Bench 2.1 · IFM','IFM 모델 카드 수치. 하니스·예산 미기재로 순위 제외.');
  metric('gdpvalMetaElo','GDPval-AA v2 · Elo','Stirrup harness · Elo. 백분율·다른 버전과 합치지 않습니다.');
  metric('jobBench','JobBench','65개 작업 · rubric mean. Meta 발표 수치.');
  metric('deepSearchQA','DeepSearchQA · F1','900개 질문 · 동일 search backend와 browser harness.');
  metric('sweAtlasQnaMeta','SWE-Atlas Codebase QnA · Meta','124개 작업 · public QnA · mini-swe-agent. strict와 별도.');
  metric('osworldMetaPartial','OSWorld 2.0 · Meta partial','08.08 버전 · 내부 공통 framework. offline 및 Anthropic 수정판과 분리.');
  metric('osworldMetaBinary','OSWorld 2.0 · Meta binary','08.08 버전 · binary completion. partial과 분리.');
  metric('cweBench','CWE-Bench · pass@1','Google 3.8 Flash Cyber 공식 발표의 Collinear 평가 수치.');
  metrics.mmluPro.description='MMLU-Pro 공식 Space 확인 및 제공사 보고를 구분합니다. 하니스·추론 예산 미공개 행은 순위 제외.';
  function add(value){
    const r=Object.assign({checkedAt,evaluationDate:null,publishedAt:null,snapshotDate:null,unit:'%',sourceType:'provider-reported',
      rankMode:'reference',harness:unknown,tools:unknown,reasoningBudget:unknown,
      comparisonNote:'제조사 보고 수치. 조건이 다른 평가와 합산하거나 순위를 만들지 않습니다.'},value);
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const old=rows.find(x=>key(x)===key(r)); if(old)Object.assign(old,r);else rows.push(r);
  }
  const arenaBase=rows.find(r=>r.cohort==='arena-2026-09-02');
  add(Object.assign({},arenaBase,{modelId:'gemini-3-8-flash',modelVariant:'high',officialRank:8,score:1494,scoreText:'1494 ± 9 · Preliminary',uncertainty:9,votes:5125,reasoningBudget:'high',checkedAt}));
  add(Object.assign({},arenaBase,{modelId:'muse-spark',modelVariant:'대표 모델',officialRank:13,score:1488,scoreText:'1488 ± 6',uncertainty:6,votes:13572,reasoningBudget:unknown,checkedAt}));
  rows.filter(r=>r.cohort==='arena-2026-09-02'||r.cohort==='image-arena-2026-09-04').forEach(r=>r.checkedAt=checkedAt);
  const metaScores=[
    ['gdpvalMetaElo',1754,'GDPval-AA v2','Artificial Analysis Stirrup','shell · web browsing',' Elo'],
    ['jobBench',64.9,'JobBench · 65 tasks','OpenCode · file-aware rubric grader','작업 도구','%'],
    ['osworldMetaPartial',66.9,'OSWorld 2.0 · 08.08 · partial','Meta common internal framework','GUI computer control','%'],
    ['osworldMetaBinary',32,'OSWorld 2.0 · 08.08 · binary','Meta common internal framework','GUI computer control','%'],
    ['deepSearchQA',90.3,'DeepSearchQA · 900 questions · F1','동일 search backend / browser harness','search · open · find','%'],
    ['automationBench',49.6,'AutomationBench public v3 · pass@1','Meta / official end-state assertions','benchmark automation tools','%'],
    ['mrcr256',98.5,'MRCR v2 · 8-needle · 256K–512K · 100 examples','o200k_base re-bin · sequence matcher','없음','%'],
    ['mrcr512',98.1,'MRCR v2 · 8-needle · 512K–1M · 100 examples','o200k_base re-bin · sequence matcher','없음','%'],
    ['deepSWE',75.4,'DeepSWE v1.1 · 113 tasks','mini-swe-agent','코드 실행 · 외부 인터넷 없음','%'],
    ['sweAtlasQnaMeta',59.4,'SWE-Atlas public QnA · 124 tasks','mini-swe-agent','코드 실행 · 외부 인터넷 없음','%'],
    ['terminal21Meta',88.8,'Terminal-Bench 2.1 · 89 tasks','Muse Code · Meta internal framework','터미널 · 격리 sandbox','%']
  ];
  metaScores.forEach(([benchmark,score,benchmarkVersion,harness,tools,unit])=>add({modelId:'muse-spark-1-3',modelVariant:'max',benchmark,score,benchmarkVersion,harness,tools,unit,
    reasoningBudget:'max · 토큰 상한 미기재',source:meta,sourceLabel:'Meta 공식 점수표',methodologySource:methodology,publishedAt:'2026-09-02',
    cohort:'meta-spark13-'+benchmark,cohortLabel:'Meta · 2026-09-02 · max'}));
  add({modelId:'gemini-3-8-flash',benchmark:'hleVerified',score:54.9,benchmarkVersion:'HLE-Verified',source:google,sourceLabel:'Google 공식 발표',publishedAt:'2026-09-02',cohort:'google38-hle',cohortLabel:'Google · 2026-09-02'});
  add({modelId:'gemini-3-8-flash-cyber',benchmark:'cweBench',score:47.2,benchmarkVersion:'CWE-Bench · pass@1',source:google,sourceLabel:'Google 공식 발표 · Collinear 평가',publishedAt:'2026-09-02',cohort:'google38-cwe',cohortLabel:'Google · 2026-09-02 · Cyber'});
  // All six pairs are from the same Solar Pro 4 table. Unspecified settings remain explicit.
  [['terminal21Solar',43.2,57,'Terminal-Bench v2.1'],['swe',69.2,70.6,'SWE-bench Verified'],['gpqa',85.6,89,'GPQA Diamond'],
    ['mmluPro',86.2,86.3,'MMLU-Pro'],['liveCodeBenchUnspecified',87,87.8,'LiveCodeBench · 버전/기간 미기재'],['aime2026',95.7,95.3,'AIME 2026']]
    .forEach(([benchmark,open,pro,benchmarkVersion])=>[['solar-open-2',open],['solar-pro-4',pro]].forEach(([modelId,score])=>add({modelId,benchmark,score,benchmarkVersion,
      harness:benchmark==='swe'?'OpenHands · 버전 미기재':'Upstage 발표 · 상세 하니스 미기재',source:solar,sourceLabel:'Upstage Solar Pro 4 비교표',
      cohort:'solar-pro4-'+benchmark,cohortLabel:'Upstage · 확인 2026-09-07 · 평가일 미기재'})));
  [['gpqa',87.3,'GPQA Diamond'],['terminal21Ifm',70.2,'Terminal-Bench 2.1']].forEach(([benchmark,score,benchmarkVersion])=>add({
    modelId:'k2-horizon-375b-a23b',benchmark,score,benchmarkVersion,source:ifm,sourceLabel:'IFM 공식 모델 카드',cohort:'ifm-horizon-'+benchmark,cohortLabel:'IFM · 확인 2026-09-07 · 평가일 미기재'}));
  const audit={
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','공식 Space의 정적 점수 미노출. Upstage 보고 수치만 별도 추가.'],
    gpqa:['https://github.com/idavidrein/gpqa','원 평가 저장소 확인. 제공사별 GPQA Diamond 조건을 분리.'],
    aime2026:['https://matharena.ai/','9/3 Gemini, 9/5 Astra 업데이트 확인. 모델 상세에서 AIME 2026 수치를 확인하지 못해 추정하지 않음. Upstage 보고는 별도.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','공식 동적 표는 Loading 상태. 최신 버전/점수 확인 미완료. Upstage의 버전 미기재 점수를 별도 지표로 분리.'],
    mmmuPro:['https://mmmu-benchmark.github.io/','공식 표의 마지막 갱신 표기는 2025-09-05. 새 점수 확인 미완료.'],
    swe:['https://www.swebench.com/','공식 동적 리더보드 정적 수치 미노출. OpenHands 제조사 수치를 별도 보관.'],
    terminal:['https://www.tbench.ai/benchmarks','공식 버전 목록 재확인. 2.1 / 3.0 / 4.0 및 하니스를 분리.'],
    arena:['https://arena.ai/leaderboard/text','표시 스냅샷 2026-09-02 유지. Gemini 3.8 Flash high와 Muse Spark 누락 행 추가.'],
    imageArena:['https://arena.ai/leaderboard/text-to-image','표시 스냅샷 2026-09-04 유지. 이번 확인일을 스냅샷 날짜로 덮어쓰지 않음.']
  };
  Object.entries(audit).forEach(([key,[source,note]])=>{
    const id='review-2026-09-07-'+key;
    const value={id,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'공식 1차 출처 재확인',note,version:'주간 확인 기록'};
    const previous=snapshots.find(x=>x.id===id);if(previous)Object.assign(previous,value);else snapshots.push(value);
  });
}
