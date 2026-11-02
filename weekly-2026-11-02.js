/* Official-source review: 2026-10-26–2026-11-02, checked 2026-11-02 KST.
 * Availability dates are not inferred from page update timestamps. In particular,
 * Tripo 3.0's 2026-10-31 page update is not treated as a new model release.
 */
function applyWeekly20261102(models, metrics, rows, snapshots) {
  const checkedAt='2026-11-02';
  const src={
    rosalind:'https://help.openai.com/en/articles/9624314-model-release-notes',
    rosalindDocs:'https://help.openai.com/en/articles/20001193-gpt-rosalind-for-life-sciences-research',
    rosalindApi:'https://developers.openai.com/api/docs/changelog',
    rosalindCard:'https://deploymentsafety.openai.com/gpt-rosalind-6',
    particle:'https://particle.ai/blog/introducing-particle-1',
    particlePricing:'https://particle.ai/pricing',
    nemotron:'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B-FP8',
    samPart:'https://www.meshy.ai/blog/sam3d-part-interactive-part-generation',
    samPartCode:'https://github.com/Jiahao620/sam3d-part',
    ideogram:'https://ideogram.ai/models/vector/',
    ideogramDocs:'https://developer.ideogram.ai/api-reference/vectors/generate-svg',
    ideogramRunway:'https://docs.dev.runwayml.com/api-details/api_changelog/',
    carbonEvals:'https://deepmind.google/models/gemini/',
    arena:'https://arena.ai/leaderboard/chat/text'
  };
  function upsert(list,value,key) {const old=list.find(x=>key(x)===key(value));if(old)Object.assign(old,value);else list.push(value);}
  function model(value) {
    upsert(models,Object.assign({current:true,checkedAt,date:'',announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      weightsDate:null,scores:{},sourceStatus:'official',recordType:'model',regionTags:[],accessType:'api-only',license:'제공사 서비스 약관',
      benchmarkReview:{checkedAt,scope:'benchmark-only',source:value.source,aaStatus:'unconfirmed',note:'공식 수치와 조건이 확인된 평가만 등록'}},value),x=>x.id);
  }
  function metric(key,name,description,direction) {
    metrics[key]=Object.assign({},metrics[key]||{},{key,name,description,direction:direction||'higher',rankable:false});
  }
  function add(value) {
    upsert(rows,Object.assign({checkedAt,evaluationDate:null,snapshotDate:null,publishedAt:null,rankMode:'reference',sourceType:'provider-reported',
      tools:'원문 평가 조건 참조',reasoningBudget:'세부 토큰 예산 미공개',comparisonNote:'동일 출처·버전·설정 안에서만 비교합니다.'},value),
      x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|'));
  }

  model({id:'gpt-6-rosalind-research',name:'GPT-6 Rosalind Research',family:'GPT-Rosalind',provider:'OpenAI',region:'US',category:'reasoning',
    date:'2026-10-30',announcementDate:'2026-10-30',releaseDate:'2026-10-30',previewDate:'2026-10-30',apiDate:'2026-10-30',
    recordType:'configuration',baseModelId:'gpt-6-astra',access:'Trusted access · 승인된 Research 고객의 Work·Codex·API · Enterprise 2주 Admin Preview',
    accessType:'api-only',license:'OpenAI 서비스 약관 · Rosalind Research 승인 필요',params:'gpt-6-rosalind · GPT-6 Astra와 동일 가중치',
    context:'공식 모델 카탈로그 참조',modality:'텍스트 · 과학 데이터 · 도구 → 텍스트 · 코드',
    highlight:'생물학·신약개발·중개의학 연구를 위한 GPT-6 Astra 기반 신뢰 접근 구성',source:src.rosalindCard,
    sourceLabel:'OpenAI GPT-Rosalind-6 시스템 카드',sources:[src.rosalind,src.rosalindDocs,src.rosalindApi,src.rosalindCard],
    note:'10월 30일 승인된 Research 고객에게 Work·Codex·API로 제한 출시됐습니다. Enterprise의 2주 Admin Preview도 같은 날 시작했으므로 프리뷰일을 별도로 보존합니다. 시스템 카드에 따라 GPT-6 Astra와 같은 가중치를 쓰며 추가 학습·포스트트레이닝은 없어 독립 기반 모델이 아닌 구성으로 집계합니다.',
    apiPricing:{status:'unverified',checkedAt,source:src.rosalindDocs,note:'접근 등급별 요금 문서는 연결되지만 공개 단일 토큰 단가를 확인하지 못해 수치를 등록하지 않았습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.rosalindCard,aaStatus:'not-applicable',note:'생물학 평가 수치는 시스템 카드 조건 전용이며 일반 지능 종합 순위로 합치지 않음'}});

  model({id:'particle-1',name:'Particle-1',family:'Particle',provider:'Particle',region:'US',category:'reasoning',
    date:'2026-10-28',announcementDate:'2026-10-28',releaseDate:'2026-10-28',apiDate:'2026-10-28',
    access:'Particle API · model id particle-1',accessType:'api-only',license:'Particle Terms of Service · 가중치 비공개',
    params:'DeepSeek V4.1 Flash 포스트트레이닝 · 소프트웨어 엔지니어링 특화',context:'1M tokens',modality:'텍스트 · 코드 · 도구 → 텍스트 · 코드',
    highlight:'정확도를 유지하면서 추론·도구 호출 출력 토큰을 줄이는 코딩 에이전트 모델',source:src.particle,
    sourceLabel:'Particle-1 공식 출시 발표',sources:[src.particle,src.particlePricing],
    note:'10월 28일 API로 동시 출시됐습니다. DeepSeek V4.1 Flash에서 포스트트레이닝됐지만 공개 가중치나 오픈소스 라이선스는 발표되지 않았습니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',source:src.particle,rates:[
      {label:'입력',amount:0.30},{label:'캐시 입력',amount:0.006},{label:'출력',amount:1.20}],note:'출력에는 reasoning 토큰이 포함됩니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.particle,aaStatus:'unconfirmed',note:'Terminus 2·512K·temperature 1·top_p 0.95·max reasoning 조건과 일반 평가를 분리 등록'}});

  model({id:'nemotron-3-5-transcribe-30b-a4b',name:'NVIDIA Nemotron 3.5 Transcribe 30B-A4B',family:'Nemotron 3.5',provider:'NVIDIA',region:'US',category:'voice',
    date:'2026-10-28',announcementDate:'2026-10-28',releaseDate:'2026-10-28',apiDate:'2026-10-28',weightsDate:'2026-10-28',
    access:'Open weights · BF16/FP8/NVFP4 · Hugging Face/NGC/GitHub · build.nvidia.com',accessType:'open-weights',license:'OpenMDW-1.1',
    params:'34B total · 4.3B active(오디오 인코더 포함) · Mamba-2/Transformer MoE',context:'65,536 tokens · 최대 1시간 녹음',
    modality:'오디오 · 텍스트 → 전사 · 번역 · 화자 분리 · 타임스탬프 · 오디오 질의응답',
    highlight:'40개 언어와 장문·다화자 전사를 지원하는 상용 이용 가능 오픈 웨이트 음성 모델',source:src.nemotron,
    sourceLabel:'NVIDIA 공식 Nemotron Transcribe 모델 카드',sources:[src.nemotron],
    note:'10월 28일 Build.NVIDIA.com·GitHub·Hugging Face·NGC에 함께 공개됐습니다. 아래 평가 수치는 모두 BF16 체크포인트로 10월 12일 측정됐으며 FP8/NVFP4에 그대로 귀속하지 않습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:src.nemotron,note:'Build.NVIDIA.com 제공은 확인했지만 공개 고정 토큰 단가는 모델 카드에 없습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.nemotron,aaStatus:'not-applicable',note:'BF16 카드의 WER/cpWER만 정밀도·평가군별 별도 행으로 등록'}});

  model({id:'sam3d-part',name:'SAM3D-Part',family:'SAM 3D',provider:'Meshy AI · CUHK-Shenzhen',region:'China',regionTags:['China open weights'],category:'3d',
    date:'2026-10-26',announcementDate:'2026-10-26',releaseDate:'2026-10-26',weightsDate:'2026-10-26',
    access:'Open weights · GitHub · Hugging Face',accessType:'open-weights',license:'SAM License · 혼합 제3자 라이선스',
    params:'2단계 sparse 3D generation · stage-1 DiT 7.2GB · 80GB GPU 권장',context:'기존 3D mesh · 한 번 또는 여러 번 클릭',
    modality:'3D 메쉬 · 렌더 뷰 클릭 → 독립 부품 메쉬 · 원본 좌표 정렬',
    highlight:'기존 3D 객체의 선택 부위를 완전한 독립 부품 메쉬로 생성하는 연구 모델',source:src.samPartCode,
    sourceLabel:'SAM3D-Part 공식 코드·가중치 저장소',sources:[src.samPart,src.samPartCode],
    note:'10월 26일 논문·코드·가중치가 공개됐습니다. 자체 stage-1 체크포인트는 SAM 3D Objects의 파생물이어서 SAM License를 따르며, 포함된 TRELLIS.2·Hunyuan3D 구성요소의 별도 라이선스도 적용됩니다. 약 72% Chamfer Distance 감소는 반올림된 제공사 요약이라 정밀 점수 행으로 등록하지 않았습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:src.samPartCode,note:'로컬 연구 릴리스이며 공식 호스팅 API 단가는 없습니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.samPart,aaStatus:'not-applicable',note:'500-asset 시험의 반올림 상대 개선만 공개돼 수치 행 미등록'}});

  model({id:'ideogram-vector-1',name:'Ideogram Vector',family:'Ideogram',provider:'Ideogram',region:'US',category:'image',
    date:'2026-10-28',announcementDate:null,releaseDate:null,apiDate:'2026-10-28',access:'Ideogram API · Runway Dev API',accessType:'api-only',
    license:'Ideogram/Runway API 이용약관 · 가중치 비공개',params:'ideogram-vector-1 · low/medium/high · 최대 5개 참조 이미지',context:'프롬프트 최대 9,500자',
    modality:'텍스트 · 이미지 → 편집 가능한 SVG',highlight:'프롬프트 생성과 이미지 벡터화를 지원하는 SVG 전용 이미지 모델',source:src.ideogram,
    sourceLabel:'Ideogram Vector 공식 모델·가격 페이지',sources:[src.ideogram,src.ideogramDocs,src.ideogramRunway],
    note:'Runway Dev의 10월 28일 API 제공 기록을 확인 가능한 날짜로 사용했습니다. Ideogram 자체 API의 최초 공개일과 별도 정식 출시일은 공식 페이지에 없어 추정하지 않았습니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'SVG 1장',source:src.ideogram,rates:[
      {label:'텍스트→벡터 low',amount:0.13},{label:'텍스트→벡터 medium',amount:0.16},{label:'텍스트→벡터 high',amount:0.20},
      {label:'high + 참조 이미지',amount:0.32},{label:'이미지→벡터',amount:0.10}],note:'Ideogram 직접 API 공식 페이지 기준. Runway 크레딧 가격과 분리합니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:src.ideogram,aaStatus:'unconfirmed',note:'공식 비교 평가 수치 미공개'}});

  metric('mmluStandard','MMLU · Standard','MMLU-Pro와 다른 Standard MMLU 제공사 평가입니다. 두 지표를 합치지 않습니다.');
  metric('tauAirlines','τ-bench Airlines','항공 업무 도구 사용 평가. 제공사 조건별로만 비교합니다.');
  metric('babyVisionTools','BabyVision · with tools','도구를 사용하는 시각 평가. 도구 없는 조건과 분리합니다.');
  metric('nemotronCpWer','Nemotron Transcribe · multi-speaker cpWER','AMI·CALLHOME·Mixer 6·NOTSOFAR-1 전체 세션 평균 cpWER. 낮을수록 좋습니다.','lower');
  metric('nemotronPreferenceWerDefault','Preference-ASR WER · default','기본 스타일 전사의 WER. 낮을수록 좋습니다.','lower');
  metric('nemotronPreferenceWerInstructed','Preference-ASR WER · instructed','지시 스타일 전사의 WER. 낮을수록 좋습니다.','lower');
  metric('nemotronOpenAsrWer','Open ASR · 9 public sets mean WER','공개 영어 ASR 9개 세트 평균 WER. 낮을수록 좋습니다.','lower');
  metric('nemotronLongFormWer','Open ASR · long-form mean WER','장문 ASR 평균 WER. 낮을수록 좋습니다.','lower');
  metric('nemotronMultilingualWer','Multilingual Open ASR · 7-language mean WER','7개 언어 평균 WER. 낮을수록 좋습니다.','lower');

  [['deepSWE',72.57,'DeepSWE 1.1','소프트웨어 저장소·테스트 도구'],['gpqa',90.40,'GPQA Diamond','도구 없음'],
   ['mmluStandard',86.08,'Standard MMLU','도구 없음'],['tauAirlines',86.00,'τ-bench Airlines','항공 업무 도구'],
   ['babyVisionTools',89.18,'BabyVision · with tools','시각 도구']].forEach(([benchmark,score,benchmarkVersion,tools])=>add({
    modelId:'particle-1',modelVariant:benchmark==='deepSWE'?'max reasoning · Terminus 2':'provider default',benchmark,score,unit:'%',
    cohort:benchmark==='deepSWE'?'particle1-coding-20261028':'particle1-general-20261028',cohortLabel:'Particle-1 공식 출시 평가 · 2026-10-28',
    source:src.particle,sourceLabel:'Particle-1 공식 출시 발표',publishedAt:'2026-10-28',benchmarkVersion,
    harness:benchmark==='deepSWE'?'Terminus 2 · 512K limit · temperature 1 · top_p 0.95 · 16 rollouts/task':'Particle 제공사 평가 · 세부 하니스 미공개',
    tools,reasoningBudget:benchmark==='deepSWE'?'max reasoning · 평균 출력 59,580 tokens':'세부 예산 미공개',
    comparisonNote:benchmark==='deepSWE'?'동일 표의 DeepSeek V4.1 Flash 71.15%, GLM 5.3 Flash 66.82%와만 비교합니다.':'제공사 일반 평가이며 다른 하니스 행과 합치지 않습니다.'}));

  [['nemotronCpWer',15.80,'AMI·CALLHOME·Mixer 6·NOTSOFAR-1 full sessions','화자 분리·전사'],
   ['nemotronPreferenceWerDefault',7.56,'Preference-ASR · default','전사'],['nemotronPreferenceWerInstructed',6.16,'Preference-ASR · instructed','지시 기반 전사'],
   ['nemotronOpenAsrWer',4.71,'Open ASR Leaderboard · 9 public sets','전사'],['nemotronLongFormWer',10.98,'Open ASR Leaderboard · long-form','장문 전사'],
   ['nemotronMultilingualWer',4.62,'Multilingual Open ASR · 7 languages','다국어 전사']].forEach(([benchmark,score,benchmarkVersion,tools])=>add({
    modelId:'nemotron-3-5-transcribe-30b-a4b',modelVariant:'BF16 · reasoning off',benchmark,score,unit:'%',
    cohort:'nvidia-nemotron-transcribe-bf16-20261012',cohortLabel:'NVIDIA Nemotron Transcribe BF16 · 2026-10-12 측정',source:src.nemotron,
    sourceLabel:'NVIDIA 공식 모델 카드',publishedAt:'2026-10-28',evaluationDate:'2026-10-12',benchmarkVersion,
    harness:'NVIDIA 모델 카드 공식 평가 · BF16',tools,reasoningBudget:'transcription 권장 설정 · temperature 0 · thinking off',
    comparisonNote:'BF16 결과입니다. FP8/NVFP4 체크포인트 점수로 재사용하지 않습니다.'}));

  add({modelId:'gemini-4-carbon',modelVariant:'highest thinking',benchmark:'terminal4',score:65.2,unit:'%',cohort:'google-carbon-evals-20261028',
    cohortLabel:'Google Gemini 4 Carbon 공식 모델 평가 · 2026-10-28',source:src.carbonEvals,sourceLabel:'Google DeepMind Gemini 4 Carbon 공식 평가',
    publishedAt:'2026-10-28',benchmarkVersion:'Terminal-Bench 4.0 (AA)',harness:'Google 공식 모델 페이지 평가',tools:'터미널 도구',
    reasoningBudget:'highest thinking · 세부 토큰 예산 미공개',comparisonNote:'Google 모델 페이지의 65.2%입니다. AA 출시 분석의 Antigravity CLI 64% 행과 별도 코호트로 유지합니다.'});

  [
    ['gemini-4-carbon','high',1,1528,9,4403,true],['gemini-4-argon','high',2,1520,6,11889,false],
    ['claude-opus-5-5','high',3,1509,7,11415,false],['muse-wonder','max',4,1507,7,7749,false],
    ['claude-fable-5-1','max',5,1504,6,17178,false],['gpt-6-1-sol','max',27,1481,7,9367,false],
    ['gpt-6-astra','max',37,1476,6,15038,false]
  ].forEach(([modelId,modelVariant,officialRank,score,uncertainty,votes,preliminary])=>add({modelId,modelVariant,officialRank,score,uncertainty,votes,
    benchmark:'arena',unit:' Elo',rankMode:'official',status:preliminary?'Preliminary':'Published',publishedAt:'2026-10-27',snapshotDate:'2026-10-27',
    cohort:'arena-2026-10-27',cohortLabel:'Text Arena Overall · 2026-10-27',source:src.arena,sourceLabel:'Text Arena 공식 Overall 리더보드',
    sourceType:'independent-leaderboard',benchmarkVersion:'Text Arena Overall · 2026-10-27 · 조정 없음',harness:'Arena 블라인드 사용자 선호 투표',
    tools:'대화 평가 · 도구 조건 미기재',reasoningBudget:modelVariant+' · 세부 예산 미기재',
    comparisonNote:'2026-10-27 공식 스냅샷(9,003,272 votes · 419 models)의 등록 모델 발췌입니다.'}));

  const checks={
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro',null,'공식 Space를 확인했으나 이번 기간 신규 모델의 동일 하니스 MMLU-Pro 수치는 확인되지 않았습니다. Particle의 Standard MMLU는 별도 지표로 등록했습니다.'],
    gpqa:[src.particle,null,'Particle-1의 제공사 GPQA Diamond 90.40%를 별도 코호트로 등록했습니다. 공식 GPQA 원 데이터에는 동적 모델 순위가 없습니다.'],
    aime2026:['https://matharena.ai/?comp=aime--aime_2026',null,'MathArena AIME 2026을 확인했으나 이번 주 신규 모델의 공식 결과가 없어 기존 코호트를 유지했습니다.'],
    liveCodeBench:['https://livecodebench.github.io/',null,'공식 보드를 확인했으나 이번 주 신규 모델의 버전·하니스가 명시된 비교 가능한 결과를 확인하지 못했습니다.'],
    mmmuPro:['https://github.com/MMMU-Benchmark/MMMU',null,'MMMU-Pro 공식 저장소와 신규 발표를 확인했으나 정확한 신규 수치를 찾지 못해 추정하지 않았습니다.'],
    swe:['https://www.swebench.com/verified',null,'공식 Verified/Bash-only 보드를 확인했습니다. mini-SWE-agent 1.x와 2.x는 직접 비교하지 않으며 이번 주 신규 모델 행은 확인되지 않았습니다.'],
    terminal4:['https://www.tbench.ai/','2026-10-28','Carbon 65.2%(Google 공식 모델 페이지)와 기존 64%(AA Antigravity CLI)를 별도 코호트로 보존했습니다. Particle의 2.1은 4.0과 합치지 않았습니다.'],
    arena:[src.arena,'2026-10-27','9,003,272 votes · 419 models 스냅샷에서 등록 모델 7개 설정을 발췌했습니다. Carbon 1528±9는 Preliminary입니다.']
  };
  for(const [key,[source,snapshotDate,note]] of Object.entries(checks))upsert(snapshots,{id:'review-2026-11-02-'+key,key,name:metrics[key].name,checkedAt,
    snapshotDate,source,sourceLabel:'공식 1차 출처 확인',version:'수시 확인 기록',note},x=>x.id);

  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
