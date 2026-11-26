/* Community and provider use cases checked 2026-11-26 KST.
 * These are poster-reported examples, not independent benchmark scores.
 */
function applyUses20261126(models) {
  const checkedAt = '2026-11-26';
  const note = '게시자가 직접 적은 사례입니다. 재현하거나 독립 점수로 확인하지 않았습니다.';
  const cases = {
    'claude-fable-5-2': [
      {kind:'community', title:'블렌더로 포르토피노를 한 번에', text:'같은 프롬프트로 두 모델을 비교한 테스트에서 Fable 5.2가 effort low로 블렌더 파이썬 3만 2천 자를 쓰고, 수정 없이 24MB 항구 마을 씬을 만들었다고 했습니다.', source:'https://x.com/MichaelGannotti/status/2120229461282955467', sourceLabel:'@MichaelGannotti · 2026-11-10'},
      {kind:'community', title:'다람쥐 단편, 코드와 사이클스만', text:'텍스트·이미지 투 비디오 없이 블렌더 사이클스와 numpy 소리로 단편을 만들었다고 했습니다. API 환산 약 $34.76, 전체 4시간 15분 중 렌더는 3시간.', source:'https://x.com/DanielZambrini/status/2123360069513302141', sourceLabel:'@DanielZambrini · 2026-11-19'},
      {kind:'community', title:'리그된 고무호스 캐릭터', text:'참고 캐릭터로 1시간 55분 뒤 21만 6천 폴리곤, 뼈 74개, 블렌드셰이프 43개의 애니 모델을 받았다고 했습니다. API 환산 약 $45.', source:'https://x.com/RisingSunInt_/status/2120614239601643665', sourceLabel:'@RisingSunInt_ · 2026-11-11'},
      {kind:'community', title:'실제 스컬프트 브러시 3만 회', text:'Hermes와 블렌더 4.5 기본 브러시로 점토 700개에서 시작해 붓질 3만 2,139번, 정점 52만 2천 개까지 갔다고 했습니다. 1회 약 10.5분, 생성 크레딧 $1.48.', source:'https://x.com/Stefan_3D_AI/status/2125493150517268588', sourceLabel:'@Stefan_3D_AI · 2026-11-25'},
      {kind:'provider', title:'빈 씬과 참고 화면으로 3D', text:'Unity는 빈 상태에서 더 나은 3D 씬을 만들고, 참고 화면을 보고 경험을 다시 구성하며, 어려운 게임 작업에서 멈추지 않는다고 했습니다.', source:'https://www.anthropic.com/claude-fable-and-mythos-5-2', sourceLabel:'Anthropic 공식 발표 · Unity'}
    ],
    'gemini-4-neon': [
      {kind:'community', title:'그림 한 장으로 지중해 월드', text:'스웜 약 92개로 블렌더 메시 138개와 Three.js WebGPU 장면을 만들었다고 했습니다. 물 반사, 바람, 모래, 바다 소리를 에셋 없이 절차적으로 넣었다고 했습니다.', source:'https://x.com/thebuggeddev/status/2123506487792410706', sourceLabel:'@thebuggeddev · 2026-11-19'},
      {kind:'community', title:'앤티그래비티에서 3D 우한', text:'앤티그래비티가 바로 뽑은 3D 우한을 블렌더에서 이어서 고칠 수 있다고 소개했습니다.', source:'https://x.com/canghe/status/2123605437753045466', sourceLabel:'@canghe · 2026-11-20'},
      {kind:'provider', title:'몽블랑 스키 시뮬레이터', text:'앤티그래비티에서 실제 지형, 커스텀 셰이더, 미리 만든 3D 모델 없이 스키 자국과 눈사태를 라이브로 그린다고 소개했습니다.', source:'https://x.com/GoogleDeepMind/status/2123826572385833119', sourceLabel:'@GoogleDeepMind · 2026-11-20'},
      {kind:'provider', title:'사진 한 장을 시트 수식으로', text:'앤티그래비티 /swarm으로 사진 한 장을 이미지·Apps Script 없이 10만 셀 시트로 바꿨다고 했습니다. 가장자리 검출, 깊이, 조명 6종이 수식입니다.', source:'https://x.com/Google/status/2125667315303723011', sourceLabel:'@Google · 2026-11-25'}
    ],
    'gpt-6-2-astra': [
      {kind:'community', title:'브라우저 WebGPU 3D', text:'이미지 참고를 주면 3D가 특히 잘 나온다고 했고, 데스크톱 브라우저 WebGPU에서 돌아가는 데모를 올렸습니다. 작성자는 OpenAI의 Codex 소속입니다.', source:'https://x.com/pvncher/status/2122755434758967623', sourceLabel:'@pvncher · 2026-11-17'},
      {kind:'community', title:'블렌더 테스트는 호불호', text:'같은 날 블렌더 모델링·모션 테스트는 “나쁘진 않지만 고칠 곳이 많고, 놀라게 하는 결과는 아니다”라고 했습니다. 이후 Fable과 같은 과제로 비교하겠다고 했습니다.', source:'https://x.com/AmirMushich/status/2122790354781192518', sourceLabel:'@AmirMushich · 2026-11-17'},
      {kind:'community', title:'3D·게임·슬라이드 나란히 비교', text:'Arena가 3D, 군중·카메라, 게임, 슬라이드, 데이터 시각화, 웹, SVG를 Astra와 Sol로 나눠 보여 주는 비교 영상을 올렸습니다.', source:'https://x.com/arena/status/2123221208619769903', sourceLabel:'@arena · 2026-11-19'},
      {kind:'community', title:'서식은 빠르고, 랜딩은 약하다는 후기', text:'많이 써 본 후기에서 긴 서식 5개를 7분에 채웠고, Fable이 몇 시간 걸린 작업을 더 짧게 끝냈다고 했습니다. 반면 랜딩·웹 디자인은 한 번에 만족하지 못했다고 했습니다.', source:'https://x.com/Da7_Tech/status/2123114103292023019', sourceLabel:'@Da7_Tech · 2026-11-18'},
      {kind:'provider', title:'도면·사진으로 CAD와 조립 안내', text:'공개 사진과 조립 설명서로 RC 버기 부품, 조립 애니메이션, 부품 목록을 만들었다고 했습니다. BenchCAD 2.1 Core는 이전 Astra보다 32% 높다고 했습니다.', source:'https://x.com/OpenAIDevs/status/2122752394002071717', sourceLabel:'@OpenAIDevs · 2026-11-17'}
    ]
  };
  Object.keys(cases).forEach(function (id) {
    const model = models.find(function (item) { return item.id === id; });
    if (!model) return;
    model.uses = cases[id];
    model.usesCheckedAt = checkedAt;
    model.usesNote = note;
  });
}
