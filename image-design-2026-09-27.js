/* Image-design catalogue review, 2026-09-27. Keep the provider's UI/UX
 * screenshot distinct from Artificial Analysis's independently published
 * overall open-weight leaderboard; a date checked is not an evaluation date.
 */
function applyImageDesign20260927(models, metrics, rows) {
  const checkedAt='2026-09-27';
  const aa='https://artificialanalysis.ai/image/leaderboard/text-to-image/open-weights';
  const design='https://huggingface.co/inclusionAI/Ming-Image-0.1-Design';
  const citations={
    layer:'https://huggingface.co/inclusionAI/Ming-Image-0.1-Design-Layer',
    ideogram:'https://ideogram.ai/news/ideogram-4.0/',
    ideogramRates:'https://ideogram.ai/models/4.0/',
    flux:'https://huggingface.co/black-forest-labs/FLUX.2-dev',
    fal:'https://huggingface.co/fal/FLUX.2-dev-Turbo',
    hiDream:'https://huggingface.co/HiDream-ai/HiDream-O1-Image',
    hunyuan:'https://huggingface.co/tencent/HunyuanImage-3.0-Instruct',
    zImage:'https://huggingface.co/Tongyi-MAI/Z-Image-Turbo',
    cosmos:'https://huggingface.co/nvidia/Cosmos3-Super-Text2Image',
    ernie:'https://huggingface.co/baidu/ERNIE-Image'
  };
  function model(record) {
    const existing=models.find(m=>m.id===record.id);
    if (existing) {
      if(existing.apiPricing && existing.apiPricing.checkedAt < checkedAt)
        existing.apiPricing={status:'provider-dependent',checkedAt,source:existing.source,
          note:'가중치 직접 실행과 API 요금은 별개입니다. 사용한 호스팅 업체의 공식 단가를 확인하세요.'};
      return;
    }
    const m=Object.assign({category:'image',current:true,releaseDate:null,previewDate:null,
      apiDate:null,checkedAt,access:'Open weights',accessType:'open-weights',
      modality:'텍스트 → 이미지',context:'해당 없음',scores:{},sourceStatus:'official',recordType:'model'},record);
    m.regionTags=m.region==='China'?['China','China open weights']:[];
    m.apiPricing={status:'provider-dependent',checkedAt,source:m.source,
      note:'가중치 직접 실행과 API 요금은 별개입니다. 사용한 호스팅 업체의 공식 단가를 확인하세요.'};
    if(m.id==='ming-image-0-1-design'||m.id==='ming-image-0-1-design-layer')models.unshift(m);
    else models.push(m);
  }
  model({id:'ming-image-0-1-design',name:'Ming-Image-0.1-Design',family:'Ming Image',provider:'InclusionAI',region:'China',date:'2026-09',
    access:'Open weights / MIT',accessType:'open-source-license',license:'MIT',params:'6B',
    highlight:'UI·포스터·인포그래픽 생성, 투명 배경 RGBA 지원',source:design,sourceLabel:'InclusionAI 공식 모델 카드',
    note:'Artificial Analysis에는 2026년 9월 공개로 표시됩니다. 정식 공개일(일 단위)과 최초 API 제공일은 확인되지 않았습니다. UI/UX 스크린샷의 점수는 별도 평가에 기록합니다.'});
  model({id:'ming-image-0-1-design-layer',name:'Ming-Image-0.1-Design-Layer',family:'Ming Image',provider:'InclusionAI',region:'China',date:'2026-09',
    access:'Open weights / MIT',accessType:'open-source-license',license:'MIT',params:'6B',
    modality:'이미지 · 레이어 계획 → 편집 가능한 RGBA 이미지 레이어',
    highlight:'평면 디자인을 개별 투명 레이어로 분리',source:citations.layer,sourceLabel:'InclusionAI 레이어 모델 카드',
    note:'UI/UX 이미지 생성 점수는 Design 본체의 점수입니다. 레이어 분해 모델에 같은 점수를 부여하지 않습니다. 정확한 공개일은 미확인.'});

  const ideogram={family:'Ideogram 4.0',provider:'Ideogram',region:'US',date:'2026-06-03',releaseDate:'2026-06-03',
    access:'Open weights / 비상업 커스텀 라이선스',accessType:'open-weights',license:'Ideogram 4 Non-Commercial Model Agreement',
    params:'9.3B (fp8 공개 가중치)',highlight:'고품질 텍스트·레이아웃·브랜드 디자인 이미지',
    source:citations.ideogram,sourceLabel:'Ideogram 공식 발표',
    note:'가중치는 연구·개인 사용 조건으로 공개, 상업 배포는 별도 계약. API 이용약관 및 가격과 가중치 사용권은 별개입니다.'};
  model(Object.assign({},ideogram,{id:'ideogram-4',name:'Ideogram 4.0',apiDate:'2026-06-03'}));
  model(Object.assign({},ideogram,{id:'ideogram-4-quality',name:'Ideogram 4.0 (Quality)',recordType:'configuration',baseModelId:'ideogram-4',
    highlight:'Ideogram 4.0 고품질 생성 설정',note:ideogram.note+' 모델 설정이므로 별도 기반 모델이 아닙니다.'}));
  model(Object.assign({},ideogram,{id:'ideogram-4-instant',name:'Ideogram 4.0 Instant',date:'2026-07',releaseDate:null,apiDate:null,
    recordType:'configuration',baseModelId:'ideogram-4',highlight:'Ideogram 4.0의 빠른 추론 설정',
    note:'Artificial Analysis에는 2026년 7월부터 표시됩니다. 정확한 제공일·설정의 별도 API 가격은 공식 자료에서 확인되지 않았습니다.'}));
  model(Object.assign({},ideogram,{id:'ideogram-4-fast-quality',name:'Ideogram 4.0 Fast (Quality)',date:'2026-07',releaseDate:null,apiDate:null,
    recordType:'configuration',baseModelId:'ideogram-4',highlight:'Fal 제공 Ideogram 4.0 Fast의 Quality 설정',
    note:'Fal 호스팅 설정입니다. Ideogram 공식 Quality API 단가를 Fal 상품에 그대로 적용하지 않습니다.'}));

  model({id:'hunyuan-image-3-instruct',name:'HunyuanImage 3.0 Instruct',family:'HunyuanImage 3.0',provider:'Tencent',region:'China',
    date:'2026-01-26',releaseDate:'2026-01-26',access:'Open weights / Tencent Community',
    license:'Tencent Hunyuan Community License',params:'80B total / 13B active',
    modality:'텍스트 · 이미지 → 이미지',highlight:'추론 기반 프롬프트 강화·이미지 편집',
    source:citations.hunyuan,sourceLabel:'Tencent 공식 모델 카드',
    note:'2026-01-26 공개. UI/UX 평가의 Fal 실행 결과는 이 가중치를 호스팅한 별도 설정으로 표기합니다.'});
  const base=models.find(m=>m.id==='hunyuan-image-3');
  if(base && base.license==='공식 저장소 라이선스')base.license='Tencent Hunyuan Community License';

  model({id:'flux-2-dev',name:'FLUX.2 [dev]',family:'FLUX.2',provider:'Black Forest Labs',region:'Europe',
    date:'2025-11-25',releaseDate:'2025-11-25',access:'Open weights / 비상업 커스텀 라이선스',
    license:'FLUX [dev] Non-Commercial License',params:'32B',modality:'텍스트 · 이미지 → 이미지',
    highlight:'텍스트 이미지 생성·참조 이미지 편집',source:citations.flux,sourceLabel:'Black Forest Labs 공식 모델 카드',
    note:'가중치 라이선스는 비상업 조건입니다. Fal 상업용 호스팅 가격은 별도 API 이용 조건입니다.'});
  [['flux-2-dev-flash','FLUX.2 [dev] Flash','flash','빠른 추론 설정'],
   ['flux-2-dev-turbo','FLUX.2 [dev] Turbo','turbo','8단계 증류 LoRA']].forEach(([id,name,endpoint,highlight])=>model({
    id,name,family:'FLUX.2',provider:'Fal / Black Forest Labs',region:'Europe',date:'2025-12',
    access:'Open weights / 비상업 커스텀 라이선스',license:'FLUX [dev] Non-Commercial License',
    recordType:'configuration',baseModelId:'flux-2-dev',params:'FLUX.2 [dev] 기반 '+highlight,
    highlight,source:citations.fal,sourceLabel:'Fal FLUX.2 [dev] Turbo 모델 카드',
    note:'공개된 FLUX.2 [dev] 기반 Fal 설정. 공식 독립 공개일은 확인되지 않아 월만 기록. 호스팅 API 상업 사용권과 다운로드 가중치의 비상업 조건을 구분합니다.',endpoint
  }));
  model({id:'hidream-o1-image',name:'HiDream-O1-Image',family:'HiDream O1',provider:'HiDream.ai',region:'China',
    date:'2026-05-08',releaseDate:'2026-05-08',access:'Open weights / MIT',accessType:'open-source-license',license:'MIT',params:'8B',
    modality:'텍스트 · 이미지 → 이미지',highlight:'이미지 생성·편집·주체 맞춤, 최대 2048²',
    source:citations.hiDream,sourceLabel:'HiDream 공식 모델 카드',
    note:'모델 카드의 2026-05-08 공개 기록. 추론용 프롬프트 에이전트의 제3자 모델 라이선스는 별도로 확인해야 합니다.'});
  model({id:'z-image-turbo',name:'Z-Image Turbo',family:'Z-Image',provider:'Alibaba Tongyi',region:'China',date:'2025-12',
    access:'Open weights / Apache 2.0',accessType:'open-source-license',license:'Apache-2.0',params:'6B',
    highlight:'빠른 텍스트 이미지 생성',source:citations.zImage,sourceLabel:'Tongyi 공식 모델 카드',
    note:'Artificial Analysis에는 2025년 12월 공개로 표시됩니다. 출시일의 일 단위와 공식 API 출시일은 확인되지 않았습니다.'});
  model({id:'cosmos3-super-text2image',name:'Cosmos3-Super-Text2Image',family:'Cosmos 3',provider:'NVIDIA',region:'US',
    date:'2026-05-31',releaseDate:'2026-05-31',access:'Open weights / OpenMDW 1.1',license:'OpenMDW 1.1',params:'64B',
    highlight:'Cosmos 3 기반 물리 AI용 텍스트 이미지 생성',source:citations.cosmos,sourceLabel:'NVIDIA 공식 모델 카드',
    note:'공식 카드의 Hugging Face 공개일 2026-05-31. 첨부 화면의 모델명은 줄임표로 잘려 변형 설정이 불명확하여 UI/UX 점수 926은 연결하지 않았습니다.'});
  model({id:'ernie-image',name:'ERNIE Image',family:'ERNIE Image',provider:'Baidu',region:'China',date:'2026-04',
    access:'Open weights / Apache 2.0',accessType:'open-source-license',license:'Apache-2.0',params:'8B',
    highlight:'텍스트 이미지 생성·레이아웃',source:citations.ernie,sourceLabel:'Baidu 공식 모델 카드',
    note:'Artificial Analysis 공개 월 표기 2026년 4월, 정확한 출시일과 공식 API 첫 제공일은 확인되지 않았습니다.'});

  const pricing=(id,currency,unit,amount,source,note)=>{
    const m=models.find(x=>x.id===id);
    m.apiPricing={status:'verified',currency,unit,tier:'명시한 공급자 표준 API',
      rates:[{label:'이미지 생성',amount}],source,checkedAt,note};
  };
  pricing('ideogram-4','USD','이미지',0.06,citations.ideogramRates,'Ideogram 공식 Default 설정. 로컬 실행/가중치 라이선스 비용 아님.');
  pricing('ideogram-4-quality','USD','이미지',0.10,citations.ideogramRates,'Ideogram 공식 Quality 설정. Fal Fast (Quality)의 별도 요금과 혼동하지 마세요.');
  [['flux-2-dev',0.012,'https://fal.ai/models/fal-ai/flux-2'],
   ['flux-2-dev-flash',0.005,'https://fal.ai/learn/devs/flux-2-flash-developer-guide'],
   ['flux-2-dev-turbo',0.008,'https://fal.ai/learn/devs/flux-2-turbo-developer-guide']]
    .forEach(([id,amount,source])=>pricing(id,'USD','메가픽셀',amount,source,'Fal 상업용 호스팅 텍스트→이미지 생성 기준. 로컬 가중치 라이선스는 별도.'));

  metrics.aaImageUiuxDesign={key:'aaImageUiuxDesign',name:'AA Image Arena · UI/UX 디자인 (제공사 캡처)',
    direction:'higher',rankable:false,description:'InclusionAI 모델 카드에 삽입된 UI/UX Design 오픈 웨이트 스크린샷. 원본 평가일과 설정은 미공개. 현재 전체 순위와 섞지 않습니다.'};
  metrics.aaImageOpenWeightsOverall={key:'aaImageOpenWeightsOverall',name:'AA Image Arena · 이미지 전체 (오픈 웨이트)',
    direction:'higher',rankable:true,description:'Artificial Analysis 공식 전체 이미지 생성 오픈 웨이트 순위. 2026-09-27 확인한 표에서 첨부 화면의 모델만 발췌.'};
  const add=(r)=>{const key=x=>[x.modelId,x.benchmark,x.cohort,x.modelVariant||''].join('|');
    if(!rows.some(x=>key(x)===key(r)))rows.push(r)};
  const shared={checkedAt,evaluationDate:null,unit:' Elo',tools:'이미지 생성 · 블라인드 선호도 투표',
    reasoningBudget:'모델별 생성 단계·추론 예산 미공개'};
  const screenshot=[
    ['ming-image-0-1-design',1082],['ideogram-4-quality',1052],['ideogram-4',1015],
    ['hunyuan-image-3-instruct',1005,'Fal 호스팅'],['flux-2-dev',1000],
    ['flux-2-dev-flash',999,'Fal Flash'],['flux-2-dev-turbo',994,'Fal Turbo'],
    ['hidream-o1-image',987],['ideogram-4-instant',973,'Fal Instant'],
    ['hunyuan-image-3',965,'Fal 호스팅'],['ideogram-4-fast-quality',956,'Fal Fast Quality'],
    ['z-image-turbo',946],['ernie-image',914]
  ];
  screenshot.forEach(([modelId,score,modelVariant])=>add(Object.assign({},shared,{
    modelId,modelVariant,benchmark:'aaImageUiuxDesign',score,rankMode:'reference',
    cohort:'inclusionai-uiux-card-20260927',cohortLabel:'InclusionAI 공개 모델 카드의 AA UI/UX 이미지 · 2026-09-27 확인',
    benchmarkVersion:'Image Arena · Text to Image · UI/UX Design · Open Weights',
    harness:'AA 블라인드 투표 · 원본 카테고리 스냅샷의 평가일·세부 설정 미기재',
    source:design,sourceLabel:'InclusionAI 모델 카드의 AA 스크린샷',sourceType:'provider-reported',methodologySource:aa,
    comparisonNote:'제조사가 게시한 평가 화면의 점수입니다. 스크린샷 원래 촬영일과 세부 모델 설정은 미기재. 현재 공식 전체 순위와 직접 비교할 수 없습니다.'
  })));
  // Rank is AA's global *overall* open-weight rank, not the screenshot's UI/UX rank.
  const official=[
    ['ming-image-0-1-design',996,7,8],['ideogram-4-quality',1010,2,7],['ideogram-4',1003,3,8],
    ['hunyuan-image-3-instruct',963,16,9,'Fal 호스팅'],['flux-2-dev',1000,4,0],
    ['flux-2-dev-flash',984,11,9,'Fal Flash'],['flux-2-dev-turbo',999,5,9,'Fal Turbo'],
    ['hidream-o1-image',979,13,8],['ideogram-4-instant',982,12,9,'Fal Instant'],
    ['hunyuan-image-3',945,17,9,'Fal 호스팅'],['ideogram-4-fast-quality',985,9,9,'Fal Fast Quality'],
    ['z-image-turbo',940,18,9],['cosmos3-super-text2image',985,10,8],['ernie-image',912,21,8]
  ];
  official.forEach(([modelId,score,officialRank,uncertainty,modelVariant])=>add(Object.assign({},shared,{
    modelId,modelVariant,benchmark:'aaImageOpenWeightsOverall',score,officialRank,uncertainty,
    rankMode:'official',sourceType:'independent-leaderboard',snapshotDate:checkedAt,
    cohort:'aa-image-open-weights-overall-20260927',cohortLabel:'Artificial Analysis 전체 이미지 · 오픈 웨이트 · 2026-09-27 확인',
    benchmarkVersion:'Image Arena · Text to Image · All categories · Open Weights',
    harness:'Artificial Analysis 독립 블라인드 이미지 투표',
    source:aa,sourceLabel:'Artificial Analysis 공식 전체 이미지 순위',
    comparisonNote:'UI/UX 디자인 카테고리가 아닌 전체 범주 점수입니다. 표시 순위는 전체 원본 순위이며 이 목록은 선택 모델만 발췌했습니다.'
  })));
  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
}
