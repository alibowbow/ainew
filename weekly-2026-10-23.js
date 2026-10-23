/* Official-source review: 2026-10-19–2026-10-23, checked 2026-10-23 KST.
 * Release, preview, API, evaluation and retrieval dates remain separate.
 */
function applyWeekly20261023(models, metrics, rows, snapshots) {
  const checkedAt='2026-10-23';
  const blog='https://www.minimax.io/blog/minimax-m31f';
  const docs='https://platform.minimax.io/docs/guides/text-generation';
  const aaFlash='https://artificialanalysis.ai/models/minimax-m3-1-flash';
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

  model({id:'minimax-m3-1-flash',name:'MiniMax M3.1 Flash',family:'MiniMax M3.1',provider:'MiniMax',region:'China',category:'reasoning',
    date:'2026-10-19',announcementDate:'2026-10-19',releaseDate:'2026-10-19',apiDate:'2026-10-19',
    access:'MiniMax API · M Plan · MiniMax Code',accessType:'api-only',license:'MiniMax 서비스 약관',params:'MiniMax-M3.1-Flash · 파라미터 비공개',
    context:'1M tokens',modality:'텍스트 · 이미지 → 텍스트',highlight:'에이전트·코딩·컴퓨터 사용·보안 성능을 높이고 비용을 낮춘 Flash 모델',
    source:blog,sourceLabel:'MiniMax M3.1 Flash 공식 발표',sources:[blog,docs,aaFlash],
    note:'10월 19일 정식 출시됐고, 익명으로 운영되던 Space Bunny가 초기 버전이었습니다. 모델 가중치는 "추후 공개"로만 안내돼 공개일을 기록하지 않았습니다.',
    apiPricing:{status:'verified',checkedAt,currency:'USD',unit:'100만 토큰',tier:'Flat pricing',source:blog,rates:[
      {label:'캐시 입력',amount:0.015},{label:'입력',amount:0.15},{label:'출력',amount:0.60}],
      note:'공식 발표 기준 단일 요금입니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:aaFlash,aaStatus:'verified',note:'AA Intelligence Index 43점(AA 모델 페이지). AA의 X 게시물은 42로 표기하며 지수 버전은 페이지에 명시되지 않음'}});

  metric('bankerToolBench','BankerToolBench','금융 업무의 다단계 계획·문서 일관성·도구 연쇄 호출 평가.');
  metric('deepSweV11','DeepSWE v1.1','독립적으로 코드를 이해하고 기능 구현·수정·테스트하는 소프트웨어 과제 평가 v1.1.');
  metric('osworldV2','OSWorld V2','컴퓨터 조작과 앱 간 작업 수행 평가.');
  metric('cyberGym','CyberGym','취약점 발견·검증 평가.');

  const rowsFlash=[['bankerToolBench',76.2,'점'],['deepSweV11',73.7,'%'],['osworldV2',61.7,'점'],['agentsLastExam',29.6,'점'],['cyberGym',82,'%']];
  for(const [benchmark,score,unit] of rowsFlash)add({modelId:'minimax-m3-1-flash',modelVariant:'official',score,unit,benchmark,
    cohort:'minimax-m31-flash-20261019-'+benchmark,cohortLabel:'MiniMax M3.1 Flash 공식 발표 · 2026-10-19',source:blog,sourceLabel:'MiniMax 공식 발표',
    publishedAt:'2026-10-19',benchmarkVersion:metrics[benchmark].name,harness:'MiniMax 공식 발표 · 제공사 보고',tools:'평가별 원문 조건',reasoningBudget:'세부 토큰 예산 미공개'});

  add({modelId:'minimax-m3-1-flash',modelVariant:'AA default',score:43,unit:'점',benchmark:'aaIntelligence432',
    cohort:'aa-v432-checked-20261023',cohortLabel:'Artificial Analysis Intelligence Index · 2026-10-19 공개',source:aaFlash,sourceLabel:'Artificial Analysis 독립 평가',
    sourceType:'independent-leaderboard',rankMode:'reference',publishedAt:'2026-10-19',benchmarkVersion:'Artificial Analysis Intelligence Index · v4.3.2',
    comparisonNote:'AA 모델 페이지에 지수 버전이 표기되지 않아 기존 v4.3.2와 같다고 가정한 값입니다. AA의 X 게시물은 42점으로 표기합니다.',
    harness:'Artificial Analysis 독립 10개 평가 구성',tools:'평가별 AA 허용 도구',reasoningBudget:'AA default'});

  const snapshot={id:'review-2026-10-23-aaIntelligence432',key:'aaIntelligence432',name:metrics.aaIntelligence432?metrics.aaIntelligence432.name:'AA Intelligence Index',checkedAt,snapshotDate:null,
    source:aaFlash,sourceLabel:'공식 1차 출처 확인',version:'수시 확인 기록',
    note:'MiniMax M3.1 Flash 43점을 추가. 그 밖의 제공사 신규 모델은 이번 기간 공식 출처로 확인하지 못함.'};
  upsert(snapshots,snapshot,x=>x.id);
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>[a.modelId,a.benchmark,a.cohort,a.modelVariant||''].join('|').localeCompare([b.modelId,b.benchmark,b.cohort,b.modelVariant||''].join('|')));
}
