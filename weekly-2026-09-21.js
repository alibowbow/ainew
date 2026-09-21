/* Official-source review: 2026-09-14–21 (Asia/Seoul).
 * Publication, observation, benchmark edition and evaluation dates are independent.
 * Rerunning the complete migration chain or this migration alone is idempotent.
 */
function applyWeekly20260921(models, metrics, rows, snapshots) {
  const checkedAt='2026-09-21', unknown='미기재';
  const qwen='https://docs.qwencloud.com/changelog/models';
  const world='https://docs.qwencloud.com/developer-guides/getting-started/world-model/happyoyster-guide';
  const law='https://openai.com/index/astra-for-law/';
  const suno='https://suno.com/blog/introducing-v6';
  const gemma='https://ai.google.dev/gemma/docs/core/model_card_4';
  function model(value){
    const data=Object.assign({current:true,checkedAt,date:'',announcementDate:null,releaseDate:null,previewDate:null,apiDate:null,
      scores:{},access:'Closed / API',accessType:'api-only',license:'제공사 이용약관',params:unknown,context:unknown,
      modality:'텍스트 → 텍스트',sourceStatus:'official',recordType:'model'},value);
    const old=models.find(m=>m.id===data.id);if(old)Object.assign(old,data);else models.push(data);
  }
  model({id:'qwen3-8-omni-flash',name:'Qwen3.8 Omni Flash',family:'Qwen3.8',provider:'Alibaba / Qwen',region:'China',category:'multimodal',
    date:'2026-09-18',announcementDate:'2026-09-18',releaseDate:'2026-09-18',apiDate:'2026-09-18',context:'1M tokens',
    params:'qwen3.8-omni-flash',modality:'텍스트 · 이미지 · 음성 · 영상 → 텍스트',
    highlight:'시청각 이해와 에이전트 작업을 결합한 네이티브 멀티모달 모델',source:qwen,sourceLabel:'Qwen 공식 출시 기록',
    note:'DashScope/OpenAI 호환 API 제공. Flash-Next 기반이라는 설명만으로 공개 가중치를 추정하지 않습니다.'});
  model({id:'qwen3-8-livetranslate-flash-realtime',name:'Qwen3.8 LiveTranslate Flash Realtime',family:'Qwen LiveTranslate',provider:'Alibaba / Qwen',region:'China',category:'voice',
    date:'2026-09-17',announcementDate:'2026-09-17',releaseDate:'2026-09-17',apiDate:'2026-09-17',params:'qwen3.8-livetranslate-flash-realtime',
    context:'실시간 WebSocket 세션',modality:'음성 · 이미지 → 텍스트 · 음성',highlight:'다국어 실시간 번역·화자 분리·전사',source:qwen,sourceLabel:'Qwen 공식 출시 기록'});
  [['adventure','Adventure','탐색·이동·카메라 조작'],['directing','Directing','실시간 장면 연출·분기'],['acting','Acting','캐릭터 역할극·대화']].forEach(([id,label,feature])=>model({
    id:'happyoyster-1-0-'+id,name:'HappyOyster 1.0 '+label,family:'HappyOyster',provider:'Alibaba / Qwen',region:'China',category:'world',
    date:'2026-09-18',announcementDate:'2026-09-18',releaseDate:'2026-09-18',apiDate:null,
    access:'Closed / web',accessType:'custom-license',params:'happyoyster-1.0-'+id,context:'실시간 인터랙티브 세션',
    modality:'텍스트 · 이미지 → 인터랙티브 영상',highlight:feature,source:world,sourceLabel:'HappyOyster 공식 사용 가이드',
    note:'출시 기록: '+qwen+' · 웹 체험은 확인했으나 API 최초 제공일은 미확인. Open-world는 오픈소스라는 뜻이 아닙니다. 메쉬 출력 모델과도 구분합니다.'}));
  model({id:'gpt-6-astra-law',name:'Astra for Law · 시스템 구성',family:'GPT-6 Astra',provider:'OpenAI',region:'US',category:'reasoning',
    date:'2026-09-17',announcementDate:'2026-09-17',previewDate:'2026-09-17',releaseDate:null,apiDate:null,
    recordType:'configuration',baseModelId:'gpt-6-astra',access:'Limited / Trusted Access',accessType:'custom-license',license:'OpenAI 이용약관',
    params:'GPT-6 Astra + 법률 검색·지침',context:'세부 구성 미기재',modality:'법률 질의 · 검색 → 텍스트',
    highlight:'기존 Astra에 법률 검색과 지침을 결합한 제한 제공 구성',source:law,sourceLabel:'OpenAI Astra for Law 발표',
    note:'별도 학습된 기반 모델로 집계하지 않습니다. 선택된 법률 회사에 우선 제공; API gpt-6-astra-law는 예정이며 제공일은 미확인.'});
  [['suno-v6','Suno v6','Pro / Premier · 기본'],['suno-v6-wild','Suno v6 Wild','Pro / Premier · 탐색형'],['suno-v6-mini','Suno v6 Mini','전체 사용자 · 경량']].forEach(([id,name,tier])=>model({
    id,name,family:'Suno v6',provider:'Suno',region:'US',category:'music',date:'2026-09-09',announcementDate:'2026-09-09',releaseDate:'2026-09-09',
    access:'Closed / web',accessType:'custom-license',license:'Suno 이용약관',params:tier,context:'음악 생성·부분 편집',
    modality:'텍스트 · 오디오 · 이미지 · 영상 → 음악',highlight:'다중 입력 음악 생성과 부분 편집',source:suno,sourceLabel:'Suno v6 공식 발표',
    note:'이번 주 신작이 아닌 누락 계보 보강. 9월 9일 출시 후 순차 배포. 공식 API 최초 제공일 및 가중치 공개는 미확인.'}));

  function metric(key,name,description){metrics[key]={key,name,description,rankable:false};}
  function add(value){
    const r=Object.assign({checkedAt,evaluationDate:null,publishedAt:null,snapshotDate:null,unit:'%',rankMode:'reference',
      sourceType:'provider-reported',harness:unknown,tools:unknown,reasoningBudget:unknown,
      comparisonNote:'조건별 참고 수치입니다. 서로 다른 도구·하니스·추론 예산을 통합 순위로 만들지 않습니다.'},value);
    const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    const old=rows.find(x=>key(x)===key(r));if(old)Object.assign(old,r);else rows.push(r);
  }
  const mathModels=[
    {id:'gpt-6-astra',slug:'openai_gpt_6_astra_low',variant:'low',publishedAt:'2026-09-19',harness:'Codex 0.153.3 · OpenRouter / OpenAI · no fallback',budget:'effort low · context 1,050,000',
      broken:[[88.50,6.25],[97.69,2.84],[74.70,8.05]],arxiv:[[88.75,6.92],[84.38,7.26],[85.09,6.54]]},
    {id:'claude-fable-5-1',slug:'anthropic_fable_51_low',variant:'low',publishedAt:'2026-09-19',harness:'Claude 2.1.267 · OpenRouter / Anthropic · no fallback',budget:'effort low · max output 128,000',
      broken:[[78.00,8.12],[86.57,6.43],[77.98,10.85]],arxiv:[[51.25,10.95],[38.54,9.74],[78.95,10.58]]},
    {id:'deepseek-v4-1-flash',slug:'deepseek_deepseek_v41_flash',variant:'max',publishedAt:'2026-09-18',harness:'DeepCode 0.3.1 · OpenRouter / Fireworks · 4 CPU / 12GB · no fallback',budget:'effort max · max tokens 384,000 · temperature 1 · top_p 1',
      broken:[[28.50,8.85],[39.35,9.21],[54.76,9.43]],arxiv:[[58.33,8.82],[57.64,9.78],[43.86,9.11]]}
  ];
  [['08',2],['06',1],['05',0]].forEach(([month,index])=>{
    [['arxiv','ArXivMath'],['broken','BrokenArXiv']].forEach(([field,label])=>{
      const key=field+'Math2026'+month;
      metric(key,label+' · 2026-'+month,'MathArena 월별 관측 정확도. IRT Expected Performance와 월간 종합은 제외.');
      mathModels.forEach(m=>{
        const [score,uncertainty]=m[field][index];
        add({modelId:m.id,modelVariant:m.variant,benchmark:key,score,uncertainty,scoreText:score.toFixed(2)+' ± '+uncertainty.toFixed(2),
          benchmarkVersion:label+' · 2026-'+month,publishedAt:m.publishedAt,harness:m.harness,reasoningBudget:m.budget,
          tools:'에이전트 컨테이너 · 세부 도구 허용 범위 미기재',source:'https://matharena.ai/models/'+m.slug,sourceLabel:'MathArena 공식 모델별 관측 결과',
          sourceType:'independent-leaderboard',methodologySource:'https://matharena.ai/',cohort:'matharena-'+key+'-'+m.slug,
          cohortLabel:label+' · '+m.harness+' · '+m.variant,
          comparisonNote:'월별 실측 정확도와 출처의 ± 범위입니다. 모델별 하니스·추론 예산이 달라 순위는 부여하지 않습니다. 공개일과 실행일은 다르며 실행일은 미기재입니다.'});
      });
    });
  });
  metric('legalResearchValidation','Legal Research Bench · 비공개 검증 200문항','OpenAI 보고 · 미국 법률 질의 · 도구 구성이 다른 시스템 비교');
  [['gpt-6-astra-law',54.0,'법률 검색 인덱스 · 법률 지침'],['gpt-6-astra',38.7,'웹 검색만']].forEach(([modelId,score,tools])=>add({
    modelId,score,benchmark:'legalResearchValidation',benchmarkVersion:'Vals AI Legal Research Bench · private validation · 200 US questions',
    modelVariant:'highest reasoning effort',publishedAt:'2026-09-17',harness:'OpenAI 내부 시스템 평가 · 상세 하니스 미기재',tools,
    reasoningBudget:'highest reasoning effort · 토큰 예산 미기재',source:law,sourceLabel:'OpenAI 공식 시스템 비교',
    cohort:'openai-law-'+modelId,cohortLabel:'OpenAI · '+tools,
    comparisonNote:'전체 정답 여부를 통과한 비율. 같은 200문항이지만 검색 도구·지침이 다른 시스템이므로 기반 모델 순위로 해석하지 않습니다.'}));

  // Restore verified scores stranded in legacy model.scores into the actual UI registry.
  // This is historical coverage, NOT a new September benchmark release.
  const gemmaIds=['gemma-4-31b','gemma-4-26b-a4b','gemma-4-12b-unified','gemma-4-e4b','gemma-4-e2b'];
  metric('liveCodeBenchV6Gemma','LiveCodeBench v6 · Gemma 공식 카드','버전 미기재 LiveCodeBench와 분리한 제공사 보고 결과');
  const gemmaScores=[
    ['mmluPro','MMLU-Pro',[85.2,82.6,77.2,69.4,60.0]],
    ['aime2026','AIME 2026 · no tools',[89.2,88.3,77.5,42.5,37.5]],
    ['liveCodeBenchV6Gemma','LiveCodeBench v6',[80,77.1,72,52,44]],
    ['gpqa','GPQA Diamond',[84.3,82.3,78.8,58.6,43.4]],
    ['mmmuPro','MMMU-Pro',[76.9,73.8,69.1,52.6,44.2]]
  ];
  gemmaScores.forEach(([benchmark,benchmarkVersion,values])=>gemmaIds.forEach((modelId,i)=>add({
    modelId,benchmark,benchmarkVersion,score:values[i],modelVariant:'instruction-tuned',source:gemma,sourceLabel:'Google Gemma 4 공식 모델 카드',
    sourceUpdatedAt:'2026-07-30',harness:'Google 모델 카드 · 상세 하니스/샷 수 미기재',
    tools:benchmark==='aime2026'?'없음':'평가별 허용 도구 미기재',reasoningBudget:'평가별 토큰 예산 미기재',
    cohort:'gemma4-card-'+benchmark,cohortLabel:'Gemma 4 공식 카드 · 확인 2026-09-21',
    comparisonNote:'기존 모델 카드의 누락 점수 보강. 문서 갱신일은 2026-07-30이나 평가일/점수 최초 공개일은 미기재. 세부 하니스가 불명확해 순위 제외.'})));
  gemmaIds.forEach(id=>{
    const m=models.find(x=>x.id===id);if(!m)return;
    m.benchmarkCheckedAt=checkedAt;
    m.benchmarkSource=gemma;
    // Preserve the existing launch announcement date while exposing the conflicting release log.
    if(id!=='gemma-4-12b-unified')m.dateDiscrepancy={announcement:'2026-04-02',releaseLog:'2026-03-31',source:'https://ai.google.dev/gemma/docs/releases',checkedAt};
  });
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  models.forEach(m=>{m.regionTags=m.region==='China'?['China'].concat(/^open-/.test(m.accessType)?['China open weights']:[]):m.region==='Korea'?['Korea']:[];});
  const audits={
    mmluPro:['https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro','공식 Space의 신규 독립 점수는 확인하지 못했습니다. Google 공식 카드에서 Gemma 4 5종의 누락 제공사 점수를 복구했습니다.'],
    gpqa:['https://github.com/idavidrein/gpqa','원 평가 저장소에 통합 공식 리더보드는 없습니다. Google 공식 카드의 Gemma 4 5종을 조건별 참고 수치로 보강했습니다.'],
    aime2026:['https://matharena.ai/','9월 18–19일 갱신은 ArXivMath/BrokenArXiv로 AIME가 아닙니다. AIME 2026은 Google 카드의 도구 없는 Gemma 점수만 별도로 복구했습니다.'],
    liveCodeBench:['https://livecodebench.github.io/leaderboard.html','공식 동적 표의 최신 행은 확인하지 못했습니다. Google 공식 LiveCodeBench v6 점수는 버전별 별도 지표에 추가했습니다.'],
    mmmuPro:['https://mmmu-benchmark.github.io/','공식 사이트의 마지막 갱신 표기는 2025-09-05입니다. Google 카드의 Gemma 4 제공사 수치를 복구했습니다.'],
    swe:['https://www.swebench.com/','공식 최신 동적 점수 행을 추출하지 못해 신규 수치를 추가하지 않았습니다. DeepSWE 및 하니스가 다른 수치와 합치지 않습니다.'],
    terminal:['https://www.tbench.ai/benchmarks','공식 카탈로그는 2026-08-28 Terminal-Bench 4.0을 최신 버전으로 표시합니다. 새로운 동일 조건 점수는 확인하지 못했습니다.'],
    arena:['https://arena.ai/leaderboard/text','확인한 공식 표는 2026-09-13 스냅샷입니다. 확인일을 새 평가일로 바꾸거나 같은 점수를 중복 추가하지 않았습니다.'],
    imageArena:['https://arena.ai/leaderboard/text-to-image','확인한 공식 표는 2026-09-07 스냅샷입니다. 기존 이미지 순위와 Preliminary 표시를 유지합니다.']
  };
  Object.keys(metrics).filter(k=>/^(arxiv|broken)Math2026/.test(k)).forEach(k=>{audits[k]=['https://matharena.ai/','2026-09-18–19 공개 결과. 월별 관측값만 등록; IRT 기대 성능·추정 순위·전체 혼합 점수는 제외했습니다.'];});
  audits.legalResearchValidation=[law,'2026-09-17 공개 시스템 비교. 도구 구성을 분리하고 실제 평가일은 미기재로 유지합니다.'];
  audits.liveCodeBenchV6Gemma=[gemma,'신규 발표가 아닌 누락 점수 보강. LiveCodeBench v6 · instruction-tuned · 평가일 및 토큰 예산 미기재.'];
  Object.entries(audits).forEach(([key,[source,note]])=>{
    const id='review-2026-09-21-'+key,value={id,key,name:metrics[key].name,checkedAt,snapshotDate:null,source,sourceLabel:'공식 1차 출처 확인',note,version:'주간 확인 기록'};
    const old=snapshots.find(x=>x.id===id);if(old)Object.assign(old,value);else snapshots.push(value);
  });
}
