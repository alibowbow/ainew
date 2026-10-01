/* Official launch review checked 2026-10-01 KST. Reapplication is idempotent. */
function applyLaunches20261001(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-01';
  const google='https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/';
  const googleMethod='https://deepmind.google/models/evals-methodology/gemini-4-argon';
  const sol='https://openai.com/index/introducing-gpt-6-1-sol/';
  const solDocs='https://developers.openai.com/api/docs/models/gpt-6.1-sol';
  const solCard='https://deploymentsafety.openai.com/gpt-6-1-sol';
  function upsertModel(model) {
    const old=models.find(m=>m.id===model.id);
    if(old)Object.assign(old,model);else models.push(model);
  }
  upsertModel({id:'gemini-4-argon',name:'Gemini 4 Argon',family:'Gemini 4',provider:'Google DeepMind',region:'US',regionTags:[],category:'reasoning',
    date:'2026-09-30',announcementDate:'2026-09-30',previewDate:'2026-09-30',releaseDate:null,apiDate:null,checkedAt,current:true,
    access:'Fairwind 제한 접근 · 공개 API 예정',accessType:'api-only',license:'Google 서비스 약관',recordType:'model',sourceStatus:'official',
    params:'공개 API 모델 ID 미발표 · 최대 출력 1M 토큰',context:'입력 컨텍스트 공식 확인 필요',modality:'텍스트 · 이미지 · 영상 등 멀티모달 → 텍스트',scores:{},
    highlight:'장기 코딩·전문 업무·방어적 보안 작업을 위한 Gemini 4 제한 공개',source:google,sourceLabel:'Google Gemini 4 Argon 공식 발표',
    note:'9월 30일 발표와 Fairwind 보안 파트너 대상 제한 제공을 구분했습니다. 일반 개발자 API와 소비자 제품은 출시 예정이므로 정식 공개일·API 제공일·모델 ID를 추정하지 않습니다.',
    apiPricing:{status:'no-public-rate',checkedAt,source:google,note:'일반 API는 아직 제공되지 않습니다. Google이 예고한 출시 도입가는 입력 $2, 출력 $10 / 100만 토큰이며, 캐시 입력은 입력가 대비 95% 할인 예정입니다. 도입 기간 종료 후 $4/$20로 안내됐으나 시작일·종료일은 미기재입니다.'}});
  upsertModel({id:'gpt-6-1-sol',name:'GPT-6.1 Sol',family:'GPT-6.1',provider:'OpenAI',region:'US',regionTags:[],category:'reasoning',
    date:'2026-09-29',announcementDate:'2026-09-29',previewDate:null,releaseDate:'2026-09-29',apiDate:'2026-09-29',checkedAt,current:true,
    access:'Closed / API',accessType:'api-only',license:'OpenAI API terms',recordType:'model',sourceStatus:'official',
    params:'gpt-6.1-sol · 최대 출력 128K · low/medium/high/xhigh/max',context:'1.05M tokens',modality:'텍스트 · 이미지 → 텍스트',scores:{},
    highlight:'Astra에 근접한 코딩·컴퓨터 사용 성능과 낮은 캐시 입력 비용',source:solDocs,sourceLabel:'OpenAI GPT-6.1 Sol 공식 모델 사양',
    note:'9월 29일 API·Codex·ChatGPT Work에 제공. 일반 Chat 대화창 제공은 출시 발표에 포함되지 않습니다. 272K를 초과하는 입력은 전체 요청에 다른 단가가 적용됩니다. 발표: '+sol,
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API · 입력 272K 이하',source:solDocs,
      rates:[['입력',2],['캐시 입력',0.1],['캐시 쓰기',2.5],['출력',10]].map(([label,amount])=>({label,amount})),
      note:'입력 272K 초과 요청은 전체 입력·캐시 단가 2배, 출력 단가 1.5배. Fast 2배, Batch/Flex 50% 할인, 지역 처리 추가 요금은 별도.'}});
  function metric(key,name,description,direction='higher') {
    metrics[key]={key,name,description,direction,rankable:false};
  }
  [
    ['valsIndex','Vals Index · 지식 업무','Google 발표의 Vals AI 지식 업무 평가'],
    ['frontierSWE2','FrontierSWE v2','Proximal 독립 리더보드 인용'],
    ['postTrainBench11','PostTrainBench v1.1','OpenCode · H100 10시간'],
    ['graphWalks128','GraphWalks · 128K 이하 BFS','650문항 · F1'],
    ['graphWalksLong','GraphWalks · 256K–1M BFS','200문항 · F1'],
    ['lvBenchGoogle','LVBench · Google 평가','도구 없음 · 영상 프레임 제한 상이'],
    ['cweBench1','CWE-bench v1','공식 리더보드의 취약점 수정 pass@1'],
    ['solHealthBenchProfessional','HealthBench Professional · 길이 보정','OpenAI 시스템 카드'],
    ['solHealthBench','HealthBench · 길이 보정','OpenAI 시스템 카드'],
    ['solHealthBenchHard','HealthBench Hard · 길이 보정','OpenAI 시스템 카드'],
    ['solHealthBenchConsensus','HealthBench Consensus · 길이 보정','OpenAI 시스템 카드'],
    ['solFactualityError','GPT-6.1 Sol · 사실 오류 응답률','오류를 지적한 대화에서 선별된 어려운 질문 · 낮을수록 좋음','lower']
  ].forEach(([key,name,description,direction])=>metric(key,name,description,direction));
  function add(data) {
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const previous=rows.find(r=>key(r)===key(data));
    if(previous)Object.assign(previous,data);else rows.push(data);
  }
  // Google results are reported in its own evaluation table. The comparison
  // models use different settings and harnesses; no cross-provider rank is implied.
  [
    ['valsIndex',68.9,'Vals Index','Vals AI 공식 평가 인용','평가별 업무 도구','최고 thinking · 세부 예산 미공개'],
    ['automationBench',51.3,'AutomationBench · private set','Zapier 공식 리더보드 인용','47개 업무 도구','최고 thinking · 세부 예산 미공개'],
    ['deepSWE',77.9,'DeepSWE v1.1','Google mini-swe agent harness','코딩 에이전트','최고 thinking · pass@1'],
    ['frontierSWE2',55,'FrontierSWE v2','Proximal 공식 리더보드 인용','코딩 에이전트','최고 thinking · 세부 예산 미공개'],
    ['terminal4',57.4,'Terminal-Bench 4.0','Google 자체 평가','터미널','최고 thinking · pass@1'],
    ['terminalScience01',57.6,'Terminal-Bench Science 0.1 · 6× verifier timeout','Google 자체 평가','코드 · 터미널','최고 thinking · 검증기 시간 6배'],
    ['postTrainBench11',45.3,'PostTrainBench v1.1','OpenCode · NVIDIA H100 · 10시간','학습·코딩 도구','최고 thinking · H100 10시간'],
    ['graphWalks128',99.7,'GraphWalks · BFS F1 · 128K 이하 650문항','Google 자체 평가','도구 없음','최고 thinking · F1'],
    ['graphWalksLong',84.2,'GraphWalks · BFS F1 · 256K–1M 200문항','Google 자체 평가','도구 없음','최고 thinking · F1'],
    ['agentsLastExam',39.5,"Agent's Last Exam · binary pass rate",'ALE-Claw 기본 하니스 · 5시간 · 안전 필터','컴퓨터 사용','최고 thinking · 5시간'],
    ['osworld2Offline',69.2,'OSWorld 2.0 · offline · partial','공식 평가기 · 1080p · 최대 500단계 · 3회 중 최고','pyautogui · 스크린샷 · 병렬 도구','최고 thinking · 3회 각각 단일 시도'],
    ['lvBenchGoogle',91.7,'LVBench · 1FPS','Google 자체 평가 · API별 영상 프레임 수 상이','도구 없음','최고 thinking · pass@1'],
    ['cweBench1',68,'CWE-bench v1 · pass@1','공식 리더보드 인용','코드 수정 도구','최고 thinking · pass@1']
  ].forEach(([benchmark,score,benchmarkVersion,harness,tools,reasoningBudget])=>add({
    modelId:'gemini-4-argon',benchmark,score,unit:'%',modelVariant:'highest thinking',cohort:'google-argon-launch-20260930',
    cohortLabel:'Google Gemini 4 Argon 발표 · 2026-09-30',publishedAt:'2026-09-30',checkedAt,evaluationDate:null,snapshotDate:null,
    rankMode:'reference',sourceType:'provider-reported',source:google,sourceLabel:'Google 공식 평가 표',methodologySource:googleMethod,
    benchmarkVersion,harness,tools,reasoningBudget,
    comparisonNote:'Google 발표 표의 수치입니다. 다른 모델의 수치는 출처·설정·하니스가 달라 동일 조건 순위로 합치지 않습니다.'}));
  [
    ['solHealthBenchProfessional',64.2,'HealthBench Professional · length-adjusted','시스템 카드','도구 조건 미기재','평가 예산 미기재',solCard],
    ['solHealthBench',58.5,'HealthBench · length-adjusted','시스템 카드','도구 조건 미기재','평가 예산 미기재',solCard],
    ['solHealthBenchHard',36.2,'HealthBench Hard · length-adjusted','시스템 카드','도구 조건 미기재','평가 예산 미기재',solCard],
    ['solHealthBenchConsensus',96,'HealthBench Consensus · length-adjusted','시스템 카드','도구 조건 미기재','평가 예산 미기재',solCard],
    ['solFactualityError',7.7,'Flagged-error conversations · factual error rate','low','도구 조건 미기재','오류 유발 질문 선별 · 일반 사용 대표 아님',sol]
  ].forEach(([benchmark,score,benchmarkVersion,modelVariant,tools,reasoningBudget,source])=>add({
    modelId:'gpt-6-1-sol',benchmark,score,unit:'%',modelVariant,cohort:'openai-sol61-20260929',cohortLabel:'OpenAI GPT-6.1 Sol 발표 · 2026-09-29',
    publishedAt:'2026-09-29',checkedAt,evaluationDate:null,snapshotDate:null,rankMode:'reference',sourceType:'provider-reported',
    source,sourceLabel:source===solCard?'OpenAI GPT-6.1 Sol 시스템 카드':'OpenAI GPT-6.1 Sol 발표',
    benchmarkVersion,harness:'OpenAI 평가 · 상세 하니스는 원문 참조',tools,reasoningBudget,
    comparisonNote:'제공사 보고 점수입니다. 추론 설정·평가 버전·하니스 차이를 유지하며 통합 순위를 매기지 않습니다.'}));
  [['deepSWE',googleMethod,'Argon 77.9%는 Google 평가. Sol의 공식 본문에는 비교할 절대 수치가 없어 점수를 등록하지 않았습니다.'],
   ['osworld2Offline',googleMethod,'Argon 69.2%는 Google 평가. 서로 다른 도구·평가 조건의 수치를 합치지 않습니다.'],
   ['terminal4',googleMethod,'Argon 57.4%는 Google 자체 평가; 다른 출처의 Terminal-Bench 수치와 분리.']]
    .forEach(([key,source,note])=>{
      const value={id:'launch-2026-10-01-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'공식 평가 방법론',version:'2026-09-29–30 출시',note};
      const previous=snapshots.find(s=>s.id===value.id);if(previous)Object.assign(previous,value);else snapshots.push(value);
    });
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
}
