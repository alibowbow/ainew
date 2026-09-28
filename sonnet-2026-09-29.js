/* Sonnet 5.5 launch review: checked 2026-09-29 KST, released 2026-09-28.
 * Keep provider reports, independent pre-release tests and effort levels separate.
 */
function applySonnet20260929(models, metrics, rows, snapshots) {
  const checkedAt='2026-09-29', publishedAt='2026-09-28';
  const launch='https://www.anthropic.com/claude-sonnet-5-5';
  const docs='https://platform.claude.com/docs/en/models/sonnet-5-5/overview';
  const card='https://www.anthropic.com/claude-sonnet-5-5-system-card';
  const aa='https://artificialanalysis.ai/changelog';
  const aaReport='https://www.linkedin.com/pulse/anthropic-launches-claude-sonnet-55-artificial-analysis-cxsgc';
  const aaModel='https://artificialanalysis.ai/models/claude-sonnet-5-5';
  const preRelease='출시 전 배포본 평가. 구조화 출력 버그는 정식 출시에서 수정됐으며 AA 재평가 예정입니다.';
  const data={id:'claude-sonnet-5-5',name:'Claude Sonnet 5.5',family:'Claude 5.5',provider:'Anthropic',region:'US',regionTags:[],category:'reasoning',
    date:publishedAt,announcementDate:publishedAt,releaseDate:publishedAt,apiDate:publishedAt,previewDate:null,checkedAt,current:true,
    access:'Closed / API',accessType:'api-only',license:'Anthropic 이용약관',recordType:'model',sourceStatus:'official',
    params:'claude-sonnet-5-5 · 최대 출력 128K',context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',scores:{},
    highlight:'빠른 에이전트 코딩·버그 수정·문서·슬라이드·스프레드시트 제작',source:docs,sourceLabel:'Anthropic Sonnet 5.5 공식 모델 사양',
    note:'2026-09-28 출시. Adaptive thinking 지원, API 기본 High / Claude 앱·Code 기본 Medium. Batch API의 300K 출력은 베타입니다. Sonnet 5 대비 출력 속도 30% 이상 증가·작업당 비용 최대 30% 절감은 Anthropic 자체 평가이며 토큰 단가 인하를 뜻하지 않습니다. '+preRelease+' 발표: '+launch,
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'표준 API',source:'https://platform.claude.com/docs/en/about-claude/pricing',
      rates:[['입력',2],['출력',10],['캐시 읽기',0.2],['캐시 쓰기 · 5분',2.5],['캐시 쓰기 · 1시간',4]].map(([label,amount])=>({label,amount})),
      note:'글로벌 표준 단가. Batch 입력 $1 / 출력 $5. 지역 처리·도구 사용료 등은 별도이며 작업당 비용은 추론 설정과 사용 토큰 수에 따라 달라집니다.'}};
  const old=models.find(m=>m.id===data.id);if(old)Object.assign(old,data);else models.push(data);
  function metric(key,name,description,direction='higher') {metrics[key]={key,name,description,direction,rankable:false};}
  // Version is stable; the metric is no longer limited to September 22 releases.
  metric('aaIntelligence432','Artificial Analysis Intelligence Index · v4.3.2','독립 평가 · 모델별 공개일·effort·fallback 조건을 보존한 발췌 점수');
  metric('gdpvalAa21','GDPval-AA v2.1 · Elo','220개 실무 과제 · AA 독립 평가, 제공사 인용과 AA 직접 보고를 구분');
  metric('aaBriefcase11','AA-Briefcase v1.1 · Elo','장기 지식 업무 · rubric·분석·표현 품질을 결합한 AA Elo');
  metric('osworld21Partial','OSWorld 2.1 · partial','컴퓨터 사용 평가 · partial reward, OSWorld 2.0 및 strict와 별도');
  metric('chartographyNoTools','Chartography · 도구 미사용','Surge AI 차트 이해 평가 · 도구 사용 결과와 별도');
  metric('sweMultimodal','SWE-bench Multimodal','시각 자료를 포함한 코딩 평가 · Pro/Multilingual/Verified와 별도');
  metric('aaAutomationBench','AutomationBench-AA','AA 독립 평가 headline score · 제공사의 원본 AutomationBench와 별도');
  metric('aaOmniscienceAccuracy','AA-Omniscience · 정확도','독립 지식 평가 · 정확도와 환각률은 별도 지표');
  metric('aaOmniscienceHallucination','AA-Omniscience · 환각률','AA 독립 평가의 환각률 · 낮을수록 좋음','lower');
  function add(value) {
    const r=Object.assign({modelId:data.id,checkedAt,publishedAt,evaluationDate:null,snapshotDate:null,unit:'%',rankMode:'reference',
      sourceType:'provider-reported',source:launch,sourceLabel:'Anthropic Sonnet 5.5 공식 발표',methodologySource:card,
      modelVariant:'max',reasoningBudget:'adaptive thinking · max · 평가별 최대 1M 컨텍스트',
      harness:'Anthropic 평가 · 상세 구성은 시스템 카드 참고',tools:'평가별 허용 도구',
      comparisonNote:'동일 이름의 평가도 하니스·추론 설정·출처가 다를 수 있습니다. 통합 순위를 부여하지 않습니다.'},value);
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const previous=rows.find(x=>key(x)===key(r));if(previous)Object.assign(previous,r);else rows.push(r);
  }
  // Launch table: FrontierCode Max and Xhigh must not collapse into a best-only row.
  [
    ['terminal4',70.6,'Terminal-Bench 4.0 · 66 tasks · 5 trials/task','max','Claude Code --bare · 외부 네트워크 차단 · 리소스 사전 캐시','터미널 · safeguards / default fallback'],
    ['frontierCode',46.2,'FrontierCode v1.1 Main','max','Cognition 평가 · 코드 변경 병합 가능성','코딩 에이전트 도구'],
    ['frontierCode',52.1,'FrontierCode v1.1 Main','xhigh','Cognition 평가 · 코드 변경 병합 가능성','코딩 에이전트 도구'],
    ['cursorBench4',55.5,'CursorBench 4.0','max','Cursor 실사용 다중 파일 작업 평가','코딩 에이전트 도구'],
    ['gdpvalAa21',1844,'GDPval-AA v2.1','max','Artificial Analysis · 220 tasks','shell · web browsing',' Elo'],
    ['aaBriefcase11',1811,'AA-Briefcase v1.1','max','Artificial Analysis · 장기 지식 업무','업무 에이전트 도구',' Elo'],
    ['hleTools',64.5,"Humanity's Last Exam · with tools",'max','Anthropic 평가 · 5 trials','도구 사용'],
    ['osworld21Partial',80.1,'OSWorld 2.1 · partial','max','OSWorld 2.1 컴퓨터 사용 환경','컴퓨터 사용'],
    ['chartographyNoTools',61.6,'Chartography · no tools','max','Surge AI Chartography · Anthropic 평가','도구 없음']
  ].forEach(([benchmark,score,benchmarkVersion,modelVariant,harness,tools,unit])=>add({benchmark,score,benchmarkVersion,modelVariant,harness,tools,unit:unit||'%',
    reasoningBudget:'adaptive thinking · '+modelVariant+' · 세부 조건은 시스템 카드 참고',
    cohort:'sonnet55-launch-20260928',cohortLabel:'Anthropic Sonnet 5.5 출시 표 · 2026-09-28',
    comparisonNote:['gdpvalAa21','aaBriefcase11'].includes(benchmark)?'AA 독립 평가를 Anthropic이 인용. '+preRelease:'제공사 발표 수치 · 모델별 effort·도구 조건 구분. 공식 통합 순위가 아닙니다.'}));
  // Additional numeric results in system card Table 8.1.A and section 8.3.
  [
    ['swePro',81.3,'SWE-bench Pro · 5 trials','코딩 에이전트 도구'],
    ['sweMultilingual',90.3,'SWE-bench Multilingual · 300 tasks · 5 trials','코딩 에이전트 도구'],
    ['sweMultimodal',54.3,'SWE-bench Multimodal · 5 trials','코딩 에이전트 · 시각 입력'],
    ['deepSWE',71.0,'DeepSWE v1.1 · 113 tasks · 5 trials','코딩 에이전트 도구'],
    ['hle',56.9,"Humanity's Last Exam · no tools",'도구 없음'],
    ['healthBenchProfessional',69.2,'HealthBench Professional · length-adjusted','도구 미기재'],
    ['automationBench',44.7,'AutomationBench · official API default fallbacks enabled','업무 자동화 도구']
  ].forEach(([benchmark,score,benchmarkVersion,tools])=>add({benchmark,score,benchmarkVersion,tools,source:card,sourceLabel:'Anthropic Sonnet 5.5 시스템 카드',
    cohort:'sonnet55-card-20260928',cohortLabel:'Sonnet 5.5 시스템 카드 · 2026-09-28'}));
  [['gdpvalAa21',1725,'GDPval-AA v2.1'],['aaBriefcase11',1746,'AA-Briefcase v1.1']].forEach(([benchmark,score,benchmarkVersion])=>add({
    benchmark,score,benchmarkVersion,unit:' Elo',modelVariant:'xhigh',reasoningBudget:'adaptive thinking · xhigh',
    harness:'Artificial Analysis 독립 평가 (Anthropic 시스템 카드 인용)',source:card,sourceLabel:'Sonnet 5.5 시스템 카드 §8.14',
    cohort:'sonnet55-card-20260928',cohortLabel:'Sonnet 5.5 시스템 카드 · 2026-09-28',comparisonNote:preRelease}));
  [['max',56],['xhigh',52],['high',47],['medium',41],['low',36]].forEach(([effort,score])=>add({
    benchmark:'aaIntelligence432',score,unit:'점',modelVariant:effort+' · default fallback',reasoningBudget:'adaptive reasoning · '+effort,
    benchmarkVersion:'Artificial Analysis Intelligence Index v4.3.2',harness:'Artificial Analysis 독립 평가',tools:'평가별 허용 도구 · default fallback enabled',
    source:aa,sourceLabel:'Artificial Analysis 공식 변경 기록',sourceType:'independent-leaderboard',methodologySource:aaModel,
    cohort:'aa-sonnet55-20260928',cohortLabel:'Artificial Analysis · Sonnet 5.5 · 2026-09-28',comparisonNote:preRelease}));
  [['terminal4',64,'Terminal-Bench 4.0'],['terminalScience01',53,'Terminal-Bench-Science 0.1'],
    ['aaAutomationBench',71,'AutomationBench-AA · headline score'],['aaOmniscienceAccuracy',54,'AA-Omniscience · factual accuracy'],
    ['aaOmniscienceHallucination',47,'AA-Omniscience · hallucination rate']].forEach(([benchmark,score,benchmarkVersion])=>add({
      benchmark,score,benchmarkVersion,modelVariant:'max · default fallback',reasoningBudget:'adaptive reasoning · max',
      harness:'Artificial Analysis 독립 평가',tools:'평가별 허용 도구 · default fallback enabled',
      source:aaReport,sourceLabel:'Artificial Analysis 공식 Sonnet 5.5 분석',sourceType:'independent-leaderboard',methodologySource:aaModel,
      cohort:'aa-sonnet55-20260928',cohortLabel:'Artificial Analysis · Sonnet 5.5 · 2026-09-28',comparisonNote:'AA 공식 발표에서 반올림해 공개한 수치입니다. '+preRelease}));
  Object.entries({aaIntelligence432:[aa,'Max 56, Xhigh 52, High 47, Medium 41, Low 36. '+preRelease],
    terminal4:[card,'Anthropic 70.6%와 AA 64%는 서로 다른 평가 환경의 수치로 별도 보존.'],
    frontierCode:[launch,'Max 46.2%, Xhigh 52.1%를 별도 기록. Max에서 범위 초과 수정·시간 초과가 점수에 영향을 줄 수 있다는 공식 각주를 확인.']
  }).forEach(([key,[source,note]])=>{
    const value={id:'sonnet55-20260929-'+key,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'Sonnet 5.5 공식 출처 확인',version:'출시 검토',note};
    const existing=snapshots.find(s=>s.id===value.id);if(existing)Object.assign(existing,value);else snapshots.push(value);
  });
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
}
