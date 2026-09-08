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
  // Keep 3D model records in the same idempotent weekly registry as other modalities.
  [{"current":true,"checkedAt":"2026-09-07","date":"2026-08-10","announcementDate":"2026-08-10","releaseDate":"2026-08-10","previewDate":null,"apiDate":null,"scores":{},"access":"Closed / web · API","accessType":"api-only","license":"Meshy 이용약관","params":"Meshy-7 · image-to-3D · 20 credits/API mesh","context":"single-view · multi-view","modality":"이미지 · 텍스트 → 3D 메쉬 · PBR","sourceStatus":"official","id":"meshy-7","name":"Meshy 7","family":"Meshy","provider":"Meshy","region":"Global","category":"3d","highlight":"입력 이미지와 생성 형상의 정합성을 중시하는 Meshy 최신 이미지→3D 모델","source":"https://www.meshy.ai/blog/meshy-7-image-to-3d-geometry-alignment","sourceLabel":"Meshy 7 공식 발표","note":"2026년 8월 10일 출시. Meshy API에는 Meshy-7·Meshy-6·Smart Topology가 함께 표시되며 텍스트·이미지·다중 이미지 생성, 텍스처링, 리깅을 지원합니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-08-20","announcementDate":"2025-08-20","releaseDate":"2025-08-20","previewDate":null,"apiDate":null,"scores":{},"access":"Closed / web · API","accessType":"api-only","license":"Tripo 이용약관","params":"Algorithm 3.0 · Ultra 최대 2M polygons","context":"Standard · Ultra","modality":"텍스트 · 이미지 · 스케치 → 3D 메쉬 · PBR","sourceStatus":"official","id":"tripo-3-0","name":"Tripo 3.0","family":"Tripo","provider":"Tripo AI","region":"Global","category":"3d","highlight":"정밀 형상·토폴로지·텍스처·리깅을 한 흐름에서 다루는 3D 생성 모델","source":"https://www.tripo3d.ai/blog/introducing-tripo-new-algorithm3","sourceLabel":"Tripo 3.0 공식 발표","note":"2025년 8월 발표. Standard와 Ultra 모드를 분리해 사용하며, 최신 제품 페이지에는 Smart Mesh·자동 리깅·3D 프린팅 흐름이 함께 제공됩니다."},{"current":true,"checkedAt":"2026-09-07","date":"2026-02-09","announcementDate":"2026-02-09","releaseDate":"2026-02-09","previewDate":null,"apiDate":null,"scores":{},"access":"Closed / web · API","accessType":"api-only","license":"Hyper3D 이용약관","params":"Gen-2 · text-to-3D · image-to-3D · editing","context":"API tier dependent","modality":"텍스트 · 이미지 → 고품질 메쉬 · PBR","sourceStatus":"official","id":"rodin-gen-2","name":"Rodin Gen-2","family":"Rodin","provider":"Hyper3D","region":"Global","category":"3d","highlight":"고품질 메쉬 생성과 편집·텍스처·파이프라인 연동에 초점을 둔 3D 모델","source":"https://hyper3d.ai/blog/rodin-gen-2","sourceLabel":"Hyper3D Rodin Gen-2 공식 발표","note":"Hyper3D의 Gen-2 엔진과 API를 하나의 서비스형 모델 항목으로 기록했습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-06-13","announcementDate":"2025-06-13","releaseDate":"2025-06-13","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights · community license","accessType":"open-weights","license":"Tencent Hunyuan 3D 2.1 Community License","params":"shape · texture · PBR · training code","context":"local inference · GPU dependent","modality":"이미지 → 고해상도 3D 자산 · PBR","sourceStatus":"official","id":"hunyuan3d-2-1","name":"Hunyuan3D 2.1","family":"Hunyuan3D","provider":"Tencent Hunyuan","region":"China","category":"3d","highlight":"형상 생성과 PBR 텍스처 합성을 함께 공개한 Tencent의 3D 자산 생성 모델","source":"https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1","sourceLabel":"Tencent Hunyuan3D 2.1 공식 저장소","note":"전체 가중치와 학습 코드가 공개됐지만 OSI 라이선스로 단순 분류하지 않습니다. 공식 커뮤니티 라이선스의 지역·상업 이용 조건을 반드시 확인해야 합니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-01-21","announcementDate":"2025-01-21","releaseDate":"2025-01-21","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights · community license","accessType":"open-weights","license":"Tencent Hunyuan 3D Community License","params":"Hunyuan3D-DiT · Hunyuan3D-Paint","context":"local inference · GPU dependent","modality":"이미지 → 텍스처 3D 자산","sourceStatus":"official","id":"hunyuan3d-2-0","name":"Hunyuan3D 2.0","family":"Hunyuan3D","provider":"Tencent Hunyuan","region":"China","category":"3d","highlight":"Hunyuan3D 2.1로 이어진 고해상도 텍스처 3D 자산 생성 계보","source":"https://github.com/Tencent-Hunyuan/Hunyuan3D-2","sourceLabel":"Tencent Hunyuan3D 2.0 공식 저장소","note":"2.1 이전 계보를 보존하기 위한 기록입니다. 2.1과 동일 모델로 합치지 않습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-09-25","announcementDate":"2025-09-25","releaseDate":null,"previewDate":null,"apiDate":null,"scores":{},"access":"Open research repository","accessType":"custom-license","license":"Repository terms · checkpoint availability 확인 필요","params":"unified control encoder","context":"point cloud · voxel · skeleton · bounding box","modality":"이미지 · 포인트클라우드 · 복셀 · 스켈레톤 → 제어 가능한 3D 자산","sourceStatus":"official","id":"hunyuan3d-omni","name":"Hunyuan3D-Omni","family":"Hunyuan3D","provider":"Tencent Hunyuan","region":"China","category":"3d","highlight":"점군·복셀·스켈레톤·바운딩박스 조건을 통합한 제어형 3D 생성 연구 프레임워크","source":"https://github.com/Tencent-Hunyuan/Hunyuan3D-Omni","sourceLabel":"Tencent Hunyuan3D-Omni 공식 저장소","note":"Hunyuan3D 2.1과 같은 계보지만 추가 제어 입력을 위한 연구 프레임워크로 별도 기록합니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-12-16","announcementDate":"2025-12-16","releaseDate":"2025-12-16","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights","accessType":"open-source-license","license":"MIT","params":"4B parameters · O-Voxel · 512³–1536³","context":"Linux · NVIDIA GPU 24GB+ recommended","modality":"이미지 → 텍스처 3D 자산 · PBR","sourceStatus":"official","id":"trellis-2-4b","name":"TRELLIS.2-4B","family":"TRELLIS.2","provider":"Microsoft","region":"US","category":"3d","highlight":"복잡한 위상과 PBR 재질을 지원하는 Microsoft의 고해상도 이미지→3D 모델","source":"https://github.com/microsoft/TRELLIS.2","sourceLabel":"Microsoft TRELLIS.2 공식 저장소","note":"4B 사전학습 가중치·코드·MIT 라이선스를 공식 저장소에서 확인했습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2024-08-01","announcementDate":"2024-08-01","releaseDate":"2024-08-01","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights · API","accessType":"open-weights","license":"Stability AI Community License","params":"single image · UV mesh · optional quad/triangle remesh","context":"약 0.5초 · GPU/API","modality":"이미지 → UV 언랩 메쉬 · 재질 파라미터","sourceStatus":"official","id":"stable-fast-3d","name":"Stable Fast 3D","family":"Stable 3D","provider":"Stability AI","region":"US","category":"3d","highlight":"단일 이미지에서 빠르게 UV 메쉬와 재질 파라미터를 생성하는 3D 모델","source":"https://stability.ai/news-updates/introducing-stable-fast-3d","sourceLabel":"Stability AI Stable Fast 3D 공식 발표","note":"가중치·코드·API가 제공되지만 Community License의 사용 범위를 함께 표시합니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-01-08","announcementDate":"2025-01-08","releaseDate":"2025-01-08","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights · API","accessType":"open-weights","license":"Stability AI Community License","params":"point-aware reconstruction · 0.7s/object","context":"single image · real-time editing","modality":"이미지 → 포인트클라우드 · 완전 구조 메쉬","sourceStatus":"official","id":"spar3d","name":"SPAR3D","family":"Stable 3D","provider":"Stability AI","region":"US","category":"3d","highlight":"단일 이미지에서 숨은 면과 구조까지 복원하고 실시간 편집을 지원하는 3D 모델","source":"https://stability.ai/news-updates/stable-point-aware-3d","sourceLabel":"Stability AI SPAR3D 공식 발표","note":"공식 발표에서 가중치·코드·API와 상업·비상업 사용 조건을 확인했습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-11-19","announcementDate":"2025-11-19","releaseDate":"2025-11-19","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights · SAM License","accessType":"open-weights","license":"SAM License","params":"shape · texture · layout reconstruction","context":"single image · masked object · multi-object","modality":"이미지 · 마스크 → 3D 형상 · 텍스처 · 레이아웃","sourceStatus":"official","id":"sam-3d-objects","name":"SAM 3D Objects","family":"SAM 3D","provider":"Meta","region":"US","category":"3d","highlight":"가림·복잡한 자연 이미지에서 객체의 형상·텍스처·배치를 복원하는 Meta 모델","source":"https://github.com/facebookresearch/sam-3d-objects","sourceLabel":"Meta SAM 3D Objects 공식 저장소","note":"코드·가중치·온라인 데모가 공개됐지만 MIT/Apache가 아닌 SAM License로 구분했습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2024-11","announcementDate":"2024-11","releaseDate":null,"previewDate":null,"apiDate":null,"scores":{},"access":"Research / enterprise service","accessType":"custom-license","license":"NVIDIA Edify service / research terms","params":"multi-view diffusion · Transformer reconstruction · 4K textures","context":"텍스트·참조 이미지 · 약 2분","modality":"텍스트 · 이미지 → 3D 메쉬 · UV · PBR","sourceStatus":"official","id":"edify-3d","name":"Edify 3D","family":"Edify","provider":"NVIDIA","region":"US","category":"3d","highlight":"멀티뷰 확산과 재구성으로 UV·4K 텍스처·PBR 자산을 만드는 NVIDIA 연구·서비스 계열","source":"https://research.nvidia.com/labs/cosmos-lab/edify-3d/","sourceLabel":"NVIDIA Edify 3D 공식 연구 페이지","note":"공식 연구 페이지는 기능을 설명하지만 공개 체크포인트/API 최초 제공일을 확정하지 않아 연구·서비스 항목으로 남겼습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2024-07-02","announcementDate":"2024-07-02","releaseDate":null,"previewDate":null,"apiDate":null,"scores":{},"access":"Research publication","accessType":"custom-license","license":"Research publication · public weights 미기재","params":"3D AssetGen · 3D TextureGen · PBR","context":"텍스트 → 3D · retexturing · 1분 이내 연구 결과","modality":"텍스트 → 3D 형상 · 텍스처 · PBR","sourceStatus":"official","id":"meta-3d-gen","name":"Meta 3D Gen","family":"3DGen","provider":"Meta","region":"US","category":"3d","highlight":"형상 생성과 텍스트 기반 재텍스처링을 결합한 Meta의 3D 생성 연구 파이프라인","source":"https://ai.meta.com/research/publications/meta-3d-gen/","sourceLabel":"Meta 3D Gen 공식 연구 페이지","note":"연구 발표이며 공개 API·체크포인트 제공 모델로 분류하지 않습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2024-03-04","announcementDate":"2024-03-04","releaseDate":"2024-03-04","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights","accessType":"open-source-license","license":"MIT","params":"single image · feed-forward reconstruction","context":"약 0.5초/A100 · 약 6GB VRAM","modality":"이미지 → 빠른 3D 재구성 메쉬","sourceStatus":"official","id":"triposr","name":"TripoSR","family":"Tripo","provider":"VAST AI Research · Stability AI","region":"Global","category":"3d","highlight":"단일 이미지에서 빠르게 3D 객체를 재구성하는 대표적인 공개 모델","source":"https://github.com/VAST-AI-Research/TripoSR","sourceLabel":"VAST AI Research TripoSR 공식 저장소","note":"Tripo AI와 Stability AI가 공동 개발한 공개 모델이며 MIT 라이선스를 확인했습니다."},{"current":true,"checkedAt":"2026-09-07","date":"2025-03","announcementDate":"2025-03","releaseDate":"2025-03","previewDate":null,"apiDate":null,"scores":{},"access":"Open weights","accessType":"open-source-license","license":"MIT","params":"1.5B · rectified flow · SDF/VAE","context":"이미지 조건 · 최소 8GB VRAM","modality":"이미지 · 스크리블+프롬프트 → 3D 형상","sourceStatus":"official","id":"triposg","name":"TripoSG","family":"Tripo","provider":"VAST AI Research","region":"Global","category":"3d","highlight":"고충실도 형상과 복잡한 구조를 목표로 한 Tripo의 공개 3D 생성 파운데이션 모델","source":"https://github.com/VAST-AI-Research/TripoSG","sourceLabel":"VAST AI Research TripoSG 공식 저장소","note":"공식 README의 2025년 3월 1.5B 모델·VAE 공개 기록을 기준으로 입력과 하드웨어 요구를 기록했습니다."}] .forEach(value => model(value));
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
  metric('sweVerifiedOpenHands','SWE-bench Verified · OpenHands','Upstage OpenHands 평가. 공식 Bash-only 하니스와 별도 지표입니다.');
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
  [['terminal21Solar',43.2,57,'Terminal-Bench v2.1'],['sweVerifiedOpenHands',69.2,70.6,'SWE-bench Verified'],['gpqa',85.6,89,'GPQA Diamond'],
    ['mmluPro',86.2,86.3,'MMLU-Pro'],['liveCodeBenchUnspecified',87,87.8,'LiveCodeBench · 버전/기간 미기재'],['aime2026',95.7,95.3,'AIME 2026']]
    .forEach(([benchmark,open,pro,benchmarkVersion])=>[['solar-open-2',open],['solar-pro-4',pro]].forEach(([modelId,score])=>add({modelId,benchmark,score,benchmarkVersion,
      harness:benchmark==='sweVerifiedOpenHands'?'OpenHands · 버전 미기재':'Upstage 발표 · 상세 하니스 미기재',source:solar,sourceLabel:'Upstage Solar Pro 4 비교표',
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
