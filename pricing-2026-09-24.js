// First-party pay-as-you-go rates checked 2026-09-24. An unlisted model has no inferred price.
function applyApiPricing20260924(models) {
  const checkedAt = '2026-09-24';
  const prices = Object.create(null);
  const sources = {
    openai: 'https://developers.openai.com/api/docs/pricing',
    anthropic: 'https://platform.claude.com/docs/en/about-claude/pricing',
    google: 'https://ai.google.dev/gemini-api/docs/pricing',
    deepseek: 'https://api-docs.deepseek.com/quick_start/pricing/',
    xai: 'https://docs.x.ai/developers/pricing',
    meshy: 'https://docs.meshy.ai/en/api/pricing',
    glm: 'https://docs.z.ai/guides/overview/pricing',
    minimax: 'https://platform.minimaxi.com/docs/guides/pricing-paygo',
    aliyun: 'https://help.aliyun.com/en/model-studio/model-pricing'
  };
  function add(id, currency, unit, rates, source, note) {
    if (prices[id]) throw Error('Duplicate pricing: ' + id);
    prices[id] = {status:'verified', currency:currency, unit:unit, tier:'표준 API', rates:rates.map(function(r){return {label:r[0], amount:r[1]}}), source:source, checkedAt:checkedAt, note:note||''};
  }
  function tokens(ids, input, output, source, note, extra) {
    ids.split(' ').forEach(function(id) {
      add(id,'USD','100만 토큰', [['입력',input],['출력',output]].concat(extra||[]),source,note);
    });
  }
  tokens('gpt-6-astra',10,50,sources.openai,'단문 컨텍스트·표준 처리 기준. 장문은 입력 $20 / 출력 $75, 캐시 읽기와 쓰기·도구·지역 처리 비용은 별도.');
  tokens('gpt-6-sol',2,10,sources.openai,'단문 컨텍스트·표준 처리 기준. 장문은 입력 $4 / 출력 $15. 캐시·도구·지역 처리 비용 별도.');
  tokens('gpt-6-luna',0.1,0.5,sources.openai,'단문 컨텍스트·표준 처리 기준. 장문은 입력 $0.20 / 출력 $0.75. 캐시·도구·지역 처리 비용 별도.');
  tokens('gpt-5-6',4,20,'https://developers.openai.com/api/docs/models/gpt-5.6-sol','표준 처리, 272K 입력 토큰 이하. 장문은 입력 $8 / 출력 $30. 판촉 가격은 최소 2026-11-21까지 적용.');
  tokens('gpt-5-5',5,30,'https://developers.openai.com/api/docs/models/gpt-5.5','표준 처리, 272K 입력 토큰 이하. 장문에서는 입력 2배·출력 1.5배.');
  tokens('gpt-5-4',2.5,15,'https://developers.openai.com/api/docs/models/gpt-5.4','표준 처리, 272K 입력 토큰 이하. 장문에서는 입력 2배·출력 1.5배.');
  tokens('gpt-5-3-codex gpt-5-2',1.75,14,sources.openai,'표준 처리. 배치·캐시·도구 사용료 별도.');
  tokens('gpt-4-1',2,8,'https://developers.openai.com/api/docs/models/gpt-4.1','표준 처리. 캐시·배치 요금 별도.');
  tokens('o3',2,8,'https://developers.openai.com/api/docs/models/o3','표준 처리. 추론 출력 토큰 포함, 캐시·배치 요금 별도.');
  add('gpt-live-1','USD','분',[['음성 세션',0.05]],sources.openai,'실제 사용 시간을 초 단위로 계산. 도구 호출·통신 비용은 별도.');
  ['gpt-image-2-5-flare','gpt-image-2-5-sunburst'].forEach(function(id){add(id,'USD','100만 토큰',[['이미지 입력',8],['이미지 출력',30],['텍스트 입력',5]],'https://developers.openai.com/api/docs/guides/image-generation','해상도·품질에 따라 한 장에 쓰이는 토큰 수가 달라짐. 이미지 출력 토큰 단가를 한 장 가격으로 해석하지 말 것.');});
  add('gpt-image-1-5','USD','100만 토큰',[['이미지 입력',8],['이미지 출력',32],['텍스트 입력',5]],'https://developers.openai.com/api/docs/models/gpt-image-1.5','생성 해상도·품질에 따라 이미지당 실제 청구액이 달라짐.');
  const anthropic=sources.anthropic;
  tokens('claude-fable-5-1',10,50,anthropic,'글로벌 기본 단가. 캐시 쓰기·읽기, 배치, 지정 지역 처리 등 별도.');
  tokens('claude-opus-5-5',4,20,anthropic,'글로벌 기본 단가. 캐시·Fast 모드·지역 처리 별도.');
  tokens('claude-sonnet-5',2,10,anthropic,'글로벌 기본 단가. 캐시·배치·지역 처리 별도.');
  tokens('claude-opus-5 claude-opus-4-8 claude-opus-4-7 claude-opus-4-6 claude-opus-4-5',5,25,anthropic,'글로벌 기본 단가. 캐시·배치·지역 처리 별도.');
  tokens('claude-opus-4',15,75,anthropic,'레거시 모델의 공식 기본 단가. 현재 사용 가능 여부는 공급자 확인 필요.');
  const google=sources.google;
  tokens('gemini-3-8-flash gemini-3-7-flash',0.75,3.75,google,'2026-12-31까지 적용되는 표준 유료 요금. 2027-01-01부터 입력 $1.50 / 출력 $7.50; 캐시·검색 별도.');
  tokens('gemini-3-1-pro',2,12,google,'200K 입력 토큰 이하의 표준 유료 요금. 초과 시 입력 $4 / 출력 $18. 캐시·검색 별도.');
  tokens('gemini-2-5-pro',1.25,10,google,'200K 입력 토큰 이하의 표준 유료 요금. 초과 시 입력 $2.50 / 출력 $15. 캐시·검색 별도.');
  add('gemini-3-8-flash-tts','USD','100만 토큰',[['텍스트 입력',0.5],['음성 출력',9]],google,'표준 유료 요금, 2026-12-31까지 적용. 2027-01-01부터 입력 $1 / 음성 출력 $18. 음성 토큰은 초당 25개 기준.');
  add('gemini-3-8-flash-lite-tts','USD','100만 토큰',[['텍스트 입력',0.5],['음성 출력',6]],google,'표준 유료 요금, 2026-12-31까지 적용. 2027-01-01부터 입력 $1 / 음성 출력 $12. 음성 토큰은 초당 25개 기준.');
  add('gemini-3-5-transcribe','USD','100만 토큰',[['음성 입력',2],['텍스트 출력',12]],google,'음성 입력과 텍스트 출력을 각각 과금.');
  add('gemini-3-5-transcribe-live','USD','100만 토큰',[['음성 입력',3.5],['텍스트 출력',21]],google,'실시간 음성 입력과 텍스트 출력을 각각 과금.');
  add('gemini-omni-1-1-flash','USD','100만 토큰',[['멀티모달 입력',1.5],['텍스트 출력',9],['영상 출력',17.5]],google,'표준 유료 요금. 영상 출력은 720p 기준 약 $0.10/초(토큰 소비량에 따라 결정).');
  add('veo-3-1','USD','초',[['영상+음성 720/1080p',0.4],['영상+음성 4K',0.6]],google,'Veo 3.1 Standard 기준. Fast·Lite는 별도 모델/단가. 성공적으로 생성된 영상에 대해 과금.');
  add('lyria-3-pro','USD','곡',[['전체 곡',0.08]],google,'Lyria 3 Pro Preview의 생성 요청당 유료 요금.');
  const deepseek=sources.deepseek;
  tokens('deepseek-v4-1-flash',0.15,0.6,deepseek,'비혼잡 시간·캐시 미적중 기준. 혼잡 시간은 입력 $0.30 / 출력 $1.20. 캐시 적중은 $0.003~0.006/100만 토큰.');
  tokens('deepseek-v4-pro',0.66,1.98,deepseek,'비혼잡 시간·캐시 미적중 기준. 혼잡 시간은 입력 $1.32 / 출력 $3.96. 캐시 적중은 $0.022~0.044/100만 토큰.');
  // Legacy aliases currently route to V4.1 Flash; these are not prices for the retired versions.
  tokens('deepseek-v4-flash deepseek-v4-flash-vision-exp',0.15,0.6,deepseek,'구형 별칭으로 호출 시 V4.1 Flash로 라우팅되는 현재 API 단가. 원래 버전의 과거 가격이 아님. 혼잡 시간은 입력 $0.30 / 출력 $1.20.');
  tokens('grok-4-6',2,6,'https://docs.x.ai/developers/models/grok-4.6','표준 API·200K 이하 기준. 200K 초과·지역 및 도구 과금은 공식 가격표 확인.');
  tokens('grok-4-7',2,6,'https://docs.x.ai/developers/models/grok-4.7','표준 API·200K 이하 기준. 200K 초과·지역 및 도구 과금은 공식 가격표 확인.');
  tokens('glm53-flash',0.15,0.5,sources.glm,'Z.AI API 요금. 오픈 웨이트 배포 비용과 별개. 캐시 입력 $0.03/100만 토큰.');
  tokens('glm53',1.4,4.4,sources.glm,'Z.AI API 요금. 캐시 입력 $0.26/100만 토큰.');
  add('minimax-m25','CNY','100만 토큰',[['입력',2.1],['출력',8.4]],sources.minimax,'MiniMax API 위안화 요금. 오픈 웨이트 직접 호스팅 비용과 별개.');
  add('speech-2-8','CNY','입력 1만 자',[['2.8 HD',3.5],['2.8 Turbo',2]],sources.minimax,'MiniMax API 위안화 요금. 한자 1자는 2자로 계산하며, 입력 문자 수로 과금.');
  add('hailuo-2-3','CNY','영상 1개',[['768p · 6초',2],['768p · 10초',4],['1080p · 6초',3.5]],sources.minimax,'일반 Hailuo 2.3 모델의 MiniMax API 위안화 요금. Fast 모델 가격과 구분.');
  add('qwen3-8-omni-flash','CNY','100만 토큰',[['입력',0.8],['출력',2.7]],sources.aliyun,'Alibaba Cloud Model Studio 베이징 리전의 표준 요금. 싱가포르는 입력 ¥1.094 / 출력 ¥3.427, 캐시·지역 차이 별도.');
  add('qwen3-8-livetranslate-flash-realtime','CNY','100만 토큰',[['음성 입력',40],['이미지 입력',3.3],['텍스트 출력',100],['음성 출력',160]],'https://help.aliyun.com/en/model-studio/qwen3-8-livetranslate-flash-realtime','Alibaba Cloud Model Studio 베이징 리전 정가. 싱가포르 리전은 별도 요금; 음성·이미지·텍스트는 실제 사용 토큰별로 각각 청구.');
  add('wan-3-0','CNY','영상 1초',[['480p',0.3],['720p',0.6],['1080p',1.2]],sources.aliyun,'Alibaba Cloud Model Studio 베이징 리전 정가. 한시 30% 할인이 표시되므로 실제 결제액 확인. 입력 영상 길이와 출력 영상 길이를 합산하여 과금.');
  ['meshy-7','meshy-7-1'].forEach(function(id){add(id,'CREDITS','생성',[['텍스트→3D',20],['이미지→3D (텍스처 없음)',20]],sources.meshy,'미국 달러 가격이 아닌 Meshy API 크레딧. 텍스처 포함 이미지→3D는 30크레딧, 고해상도 지오메트리는 +5크레딧.');});
  const ids=new Set(models.map(function(m){return m.id}));
  Object.keys(prices).forEach(function(id){if(!ids.has(id))throw Error('Pricing refers to missing model: '+id)});
  models.forEach(function(m){
    if(prices[m.id]){m.apiPricing=prices[m.id];return}
    if(m.id==='minimax-music-2-6'){
      m.apiPricing={status:'no-public-rate',checkedAt:checkedAt,source:sources.minimax,note:'2026-08-20부터 신규 사용자는 유료 음악 생성 API를 이용할 수 없습니다. 기존 유료 이용자의 호출 가능 여부와 계약 요금은 공급자에 확인하세요.'};
      return;
    }
    const open=m.accessType==='open-weights'||m.accessType==='open-source-license';
    const product=/web|제품|Research|research|연구|coming soon/i.test(m.access||'') && m.accessType!=='api-only';
    m.apiPricing={status:open?'provider-dependent':product?'no-public-rate':'unverified',checkedAt:checkedAt,source:m.source||'',note:open?'공개 가중치·라이선스와 API 사용료는 별개입니다. 직접 호스팅 비용이나 선택한 API 공급자의 모델별 요금을 확인하세요.':product?'공개된 동일 모델의 표준 API 사용 단가를 확인하지 못했습니다. 제품 구독료와 API 단가를 혼동하지 마세요.':'공식 자료에서 이 모델의 현재 표준 API 단가를 확인하지 못했습니다. 공급자의 가격표를 확인하세요.'};
  });
}
