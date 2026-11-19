/* Dates belong to the official boards; checkedAt is the KST verification date. */
const BENCHMARK_CHECKED_20261119 = '2026-11-19';
const CURRENT_BENCHMARKS = [
  {
    key:'terminal41', cohort:'terminal41-checked-20261119', title:'Terminal-Bench 4.1',
    date:'2026-11-19', checkedOnly:true, unit:'%', source:'https://www.tbench.ai/',
    version:'Terminal-Bench 4.1 · resolution rate', tools:'격리 터미널',
    note:'공식 보드의 모델·하니스 조합 발췌. ±는 95% 신뢰구간입니다.',
    entries:[
      ['copilot-fusion','Max',1,71.2,2.9,'GitHub Copilot','3.3B'],
      ['claude-opus-5-5','Max',2,65.8,3.1,'Claude Code','8.0B'],
      ['claude-fable-5-2','Max',2,65.8,2.8,'Claude Code','15.7B'],
      ['gemini-4-carbon','High',4,64.5,3.2,'Antigravity CLI','3.8B'],
      ['claude-sonnet-5-5','Max',5,63.9,3.0,'Claude Code','19.4B'],
      ['gpt-6-2-astra','Max',6,62.1,2.3,'Codex','1.1B'],
      ['gpt-6-2-sol','Max',7,61.5,2.8,'Codex','1.1B'],
      ['gpt-6-1-sol','Max',8,60.9,3.0,'Codex','1.5B'],
      ['gpt-6-astra','Max',9,60.3,2.8,'Codex','1.5B'],
      ['kimi-k3-1-pro','Max',10,59.7,4.2,'Claude Code','3.2B'],
      ['claude-fable-5-1','Xhigh',11,57.6,3.3,'Claude Code','2.3B'],
      ['gemini-4-hydrogen','High',12,56.4,3.0,'Antigravity CLI','3.6B'],
      ['gemini-4-argon','High',13,55.5,2.8,'Antigravity CLI','2.8B'],
      ['gpt-6-1-terra','Max',14,53.3,3.1,'Codex','8.5B'],
      ['muse-wonder','Xhigh',17,47.0,3.8,'Muse Code','5.5B'],
      ['glm53','Max',19,41.2,3.3,'Claude Code','8.7B'],
      ['claude-haiku-5-5','Max',20,40.0,3.6,'Claude Code','12.1B'],
      ['grok-4-7','Xhigh',21,38.8,3.6,'Grok Build','5.5B'],
      ['deepseek-v4-1-flash-1017','Max',22,38.5,3.8,'Claude Code','8.2B'],
      ['hy4','Max',24,37.9,3.5,'Claude Code','5.3B'],
      ['glm53-flash','Max',25,37.0,3.6,'Claude Code','8.2B'],
      ['muse-ember','Xhigh',26,30.6,3.8,'Muse Code','8.1B']
    ]
  },
  {
    key:'codeArenaIndex', cohort:'code-arena-index-20261118', title:'Code Arena · 에이전트',
    date:'2026-11-18', unit:'점', source:'https://arena.ai/leaderboard/agent/code',
    version:'Code Arena · Agentic Coding Index',
    harness:'Arena 실제 코딩 세션 · 모델별 구성', tools:'코딩 에이전트 도구',
    note:'전체 Index 순위와 Index 점수를 조합했습니다. 작업 완료 신호 및 비용 Pareto의 표시 순번은 각각 별도입니다.',
    entries:[
      ['claude-fable-5-2','Max',1,1489],['claude-opus-5-5','Max',2,1373],
      ['gpt-6-2-astra','Max',3,1338],['gemini-4-neon','High',5,1325],
      ['gemini-4-carbon','High',7,1291],['gpt-6-2-sol','Max',9,1288],
      ['gpt-6-1-terra','Max',10,1276]
    ]
  },
  {
    key:'aaCodingAgent21', cohort:'aa-coding-agent21-20261119', title:'AA Coding Agent Index v2.1',
    date:'2026-11-19', checkedOnly:true, unit:'점', mode:'reference',
    source:'https://artificialanalysis.ai/agents/coding-agents/comparisons/codex-vs-claude-code',
    version:'AA Coding Agent Index v2.1', tools:'각 하니스 기본 도구',
    note:'FrontierCode-AA 2.0, Terminal-Bench 4.1, SWE-Atlas-QnA-AA의 합성 점수. 출처에 표시된 하니스 비교 발췌입니다.',
    entries:[
      ['gemini-4-neon','Xhigh',null,58.6,null,'Antigravity CLI',null,NEON_REVIEW.release],
      ['claude-fable-5-2','Xhigh · default fallback',null,58,null,'Claude Code'],
      ['gpt-6-2-astra','Max',null,53,null,'Codex'],['gpt-6-2-astra','Xhigh',null,53,null,'Codex'],
      ['gpt-6-2-astra','High',null,52,null,'Codex'],['gpt-6-2-astra','Medium',null,49,null,'Codex'],
      ['gpt-6-2-astra','Low',null,36,null,'Codex'],
      ['gpt-6-2-sol','Max',null,49,null,'Codex'],['gpt-6-2-sol','Xhigh',null,50,null,'Codex'],
      ['gpt-6-2-sol','High',null,47,null,'Codex'],['gpt-6-2-sol','Medium',null,45,null,'Codex'],
      ['gpt-6-2-sol','Low',null,37,null,'Codex']
    ]
  },
  {
    key:'arena', cohort:'arena-2026-11-18', title:'Text Arena · 대화',
    date:'2026-11-18', unit:' Elo', source:'https://arena.ai/leaderboard/chat/text?styleControl=off',
    version:'Text Arena Overall · 공식 기본 점수', harness:'Arena 블라인드 선호 투표',
    note:'9,191,536표 기준. 전체 모델 순위와 확인 가능한 점수를 함께 표시합니다.',
    entries:[['gemini-4-carbon','High',1,1526],['gemini-4-argon','High',2,1521],
      ['muse-spark-1-3','Max',10,1498],['gemini-3-8-flash','High',11,1497]]
  },
  {
    key:'valsIndex', cohort:'vals-index-22-20261118', title:'Vals Index 2.2',
    date:'2026-11-18', unit:'%', source:'https://www.vals.ai/benchmarks/vals_index',
    version:'Vals Index 2.2 · Accuracy', harness:'Vals AI 공식 평가', tools:'평가 항목별 도구',
    note:'전문 업무 평가의 종합 정확도입니다. 출처 순위를 유지합니다.',
    entries:[
      ['claude-fable-5-2','',1,71.31],['gemini-4-neon','',2,70.87],['claude-sonnet-5-5','',3,70.85],
      ['gemini-4-carbon','',4,70.45],['claude-opus-5-5','',5,70.14],['gemini-4-argon','',6,69.39],
      ['gemini-4-hydrogen','',7,68.49],['gpt-6-2-astra','',8,67.66],['muse-wonder-full','',9,66.79],
      ['gpt-6-2-sol','',10,66.06],['gpt-6-astra','',11,65.02],['muse-wonder','',12,64.88],
      ['gpt-6-1-sol','',13,63.94],['qwen4-max','',14,63.20],['kimi-k3-1-pro','',15,62.52],
      ['deepseek-v4-1-flash-1017','',16,61.26],['gpt-6-1-terra','',17,60.54],['muse-ember','',18,60.48],
      ['glm53','',19,59.85],['hy4','',20,59.35]
    ]
  },
  {
    key:'valsScienceIndex', cohort:'vals-science-20261118', title:'Vals Science Index',
    date:'2026-11-18', unit:'%', source:'https://www.vals.ai/benchmarks/science_index',
    version:'Vals Science Index · Accuracy', harness:'Vals AI 공식 평가', tools:'평가 항목별 도구',
    note:'공식 과학 지수의 종합 정확도이며 구성 평가의 개별 점수와 구분됩니다.',
    entries:[
      ['gpt-6-2-astra','',1,68.44],['gpt-6-astra','',2,65.09],['claude-fable-5-2','',3,63.74],
      ['gemini-4-neon','',4,62.63],['gpt-6-1-sol','',5,59.63],['claude-sonnet-5-5','',6,59.12],
      ['claude-opus-5-5','',7,58.65],['gpt-6-2-sol','',8,57.76],['gemini-4-argon','',9,55.36],['muse-wonder-full','',10,48.54]
    ]
  },
  {
    key:'mathArenaArxiv202610', cohort:'matharena-arxivmath-202610', title:'ArXivMath · 10월',
    date:'2026-11-18', unit:'%', source:'https://matharena.ai/?comp=arxiv--arxivmath',
    version:'MathArena ArXivMath · 2026-10', harness:'MathArena 공식 설정', tools:'공식 모델 실행 설정 참조',
    note:'10월 과제에서 두 모델 모두 공식 공동 1위입니다.',
    entries:[['gpt-6-2-astra','Max',1,95.74,5.77,null,null,'https://matharena.ai/models/openai_gpt_62_astra'],
      ['gpt-6-2-sol','Max',1,95.74,5.77,null,null,'https://matharena.ai/models/openai_gpt_62_sol']]
  },
  {
    key:'mathArenaBroken202610', cohort:'matharena-brokenarxiv-202610', title:'BrokenArXiv · 10월',
    date:'2026-11-18', unit:'%', source:'https://matharena.ai/?comp=arxiv--arxivmath',
    version:'MathArena BrokenArXiv · 2026-10', harness:'MathArena 공식 설정', tools:'공식 모델 실행 설정 참조',
    note:'오류가 있는 수학 증명을 식별하는 10월 공식 과제 성능입니다.',
    entries:[['gpt-6-2-astra','Max',1,93.83,6.42,null,null,'https://matharena.ai/models/openai_gpt_62_astra'],
      ['gpt-6-2-sol','Max',2,88.89,8.38,null,null,'https://matharena.ai/models/openai_gpt_62_sol']]
  },
  {
    key:'mathArenaLean202609', cohort:'matharena-arxivlean-202609', title:'ArXivLean · 9월',
    date:'2026-11-18', unit:'%', source:'https://matharena.ai/?comp=arxiv--arxivmath',
    version:'MathArena ArXivLean · 2026-09', harness:'MathArena 공식 설정', tools:'Lean 증명 검증',
    note:'9월 과제에 대한 두 모델의 결과가 11월 18일 공개됐습니다.',
    entries:[['gpt-6-2-astra','Max',1,79.25,10.92,null,null,'https://matharena.ai/models/openai_gpt_62_astra'],
      ['gpt-6-2-sol','Max',2,71.70,12.13,null,null,'https://matharena.ai/models/openai_gpt_62_sol']]
  },
  {
    key:'imageArena', cohort:'image-arena-2026-11-16', title:'Arena · 이미지 생성',
    date:'2026-11-16', unit:' Elo', source:'https://arena.ai/leaderboard/image/text-to-image',
    version:'Text-to-Image Arena · Overall', harness:'Arena 블라인드 선호 투표', tools:'텍스트로 이미지 생성',
    note:'전체 순위 발췌. 2위 점수는 공식 페이지에 표시된 1위 1,428점에서 격차 18점을 뺀 값입니다.',
    entries:[['gpt-image-2-5-sunburst','Sunburst',1,1428],['gpt-image-2-6-sunburst','Medium',2,1410],['gpt-image-2-5-flare','Flare',3,1400],['gpt-image-2-6-flare','Medium',6,1375],['muse-image','',13,1266]]
  },
  {
    key:'imageEditArena', cohort:'arena-single-image-edit-20261116', title:'Arena · 이미지 편집',
    date:'2026-11-16', unit:' Elo', source:'https://arena.ai/leaderboard/image/image-edit/single-image',
    version:'Image Edit Arena · Single Image · Overall', harness:'Arena 블라인드 선호 투표', tools:'단일 이미지 편집',
    note:'공식 전체 순위를 보존한 단일 이미지 편집 점수입니다.',
    entries:[['gpt-image-2-5-sunburst','Sunburst',1,1519],['gpt-image-2-5-flare','Flare',2,1484],
      ['gpt-image-2-6-sunburst','Medium',3,1481],['gpt-image-2-6-flare','Medium',6,1461]]
  },
  {
    key:'videoTextArena', cohort:'arena-text-to-video-20261108', title:'Arena · 텍스트→영상',
    date:'2026-11-08', unit:' Elo', source:'https://arena.ai/leaderboard/video/text-to-video',
    version:'Text-to-Video Arena · Overall', harness:'Arena 블라인드 선호 투표', tools:'텍스트로 영상 생성',
    note:'공식 페이지의 공개 스냅샷 날짜는 11월 8일입니다.',
    entries:[['gemini-omni-1-2-flash','',1,1540],['gemini-omni-1-1-flash','',2,1513]]
  },
  {
    key:'videoImageArena', cohort:'arena-image-to-video-20261108', title:'Arena · 이미지→영상',
    date:'2026-11-08', unit:' Elo', source:'https://arena.ai/leaderboard/video/image-to-video?rankBy=models',
    version:'Image-to-Video Arena · Overall', harness:'Arena 블라인드 선호 투표', tools:'이미지로 영상 생성',
    note:'공식 페이지의 공개 스냅샷 날짜는 11월 8일입니다.',
    entries:[['gemini-omni-1-2-flash','',1,1503]]
  },
  {
    key:'aaWer22', cohort:'aa-wer22-20261119', title:'AA-WER v2.2 · 음성 인식',
    date:'2026-11-19', checkedOnly:true, unit:'%', direction:'lower', mode:'reference',
    source:'https://artificialanalysis.ai/speech-to-text/non-streaming/',
    version:'AA-WER v2.2 · Non-streaming', harness:'Artificial Analysis ASR 평가',
    tools:'AA-AgentTalk · VoxPopuli-Cleaned-AA · Earnings22-Cleaned-AA',
    note:'3개 데이터셋의 비스트리밍 단어 오류율. 등록 모델의 공급자별 발췌입니다.',
    entries:[['scribe-v3','ElevenLabs',null,1.9],['nemotron-3-5-transcribe-30b-a4b','DeepInfra',null,3.4]]
  }
];

function applyBenchmarkRefresh20261119(models, metrics, rows, snapshots) {
  const checkedAt = BENCHMARK_CHECKED_20261119;
  const fusionSource = 'https://github.blog/changelog/2026-11-17-github-copilot-fusion-updates-more-availability-benchmarks-and-models/';
  function upsert(list, item, key) {
    const index = list.findIndex(previous => key(previous) === key(item));
    if (index < 0) list.push(item);
    else list[index] = item;
  }
  const fusion = {
    id:'copilot-fusion', name:'GitHub Copilot Fusion', family:'GitHub Copilot Fusion', provider:'GitHub',
    region:'US', regionTags:[], current:true, category:'reasoning', recordType:'configuration',
    date:'2026-11-17', announcementDate:'2026-11-17', releaseDate:null, previewDate:null, apiDate:null, weightsDate:null,
    checkedAt, source:fusionSource, sourceLabel:'GitHub Copilot 공식 변경 기록', sourceStatus:'official', sources:[fusionSource],
    access:'GitHub Copilot · Fusion Max / Standard', accessType:'api-only', license:'GitHub Copilot 서비스 약관',
    params:'GitHub Copilot 모델 라우팅 구성', context:'선택된 구성에 따라 달라짐', modality:'텍스트 · 코드 · 도구 → 코드',
    highlight:'GitHub Copilot에서 사용하는 코딩 에이전트 구성',
    note:'11월 17일 Max 구성의 공개 Terminal-Bench 4.1 첫 등록을 확인했습니다.',
    apiPricing:{status:'provider-dependent',checkedAt,source:fusionSource,note:'GitHub Copilot 플랜과 제공 조건을 따릅니다.'},
    benchmarkReview:{checkedAt,scope:'benchmark-only',source:'https://www.tbench.ai/',aaStatus:'unconfirmed',note:'공식 Terminal-Bench 4.1의 Fusion Max 결과.'},
    scores:{}
  };
  upsert(models, fusion, item => item.id);

  const keyFor = row => [row.modelId,row.benchmark,row.cohort,row.modelVariant || ''].join('|');
  for (const data of CURRENT_BENCHMARKS) {
    const {key,cohort,title,date,unit,source,version,note} = data;
    const snapshotDate = data.checkedOnly ? null : date;
    if (!metrics[key]) metrics[key] = {key,name:title,direction:data.direction||'higher',description:note,rankable:false};
    const cohortLabel = title+' · '+date+(data.checkedOnly?' 확인':'');
    for (const [modelId,modelVariant,officialRank,score,uncertainty,harness,tokens,entrySource] of data.entries) {
      upsert(rows, {
        modelId,modelVariant,benchmark:key,score,unit,cohort,cohortLabel,checkedAt,snapshotDate,
        evaluationDate:null,publishedAt:null,rankMode:data.mode||'official',officialRank,uncertainty,
        source:entrySource||source,sourceLabel:entrySource===NEON_REVIEW.release?'Google 공식 발표 (AA 측정 인용)':title+' 공식 자료',
        sourceType:'independent-leaderboard',benchmarkVersion:version,harness:harness||data.harness,
        tools:data.tools||'공식 평가 조건 참조',
        reasoningBudget:tokens?modelVariant+' · '+tokens+' total tokens':modelVariant||'세부 추론 설정 미기재',
        comparisonNote:note
      },keyFor);
    }
    upsert(snapshots,{id:'bench-refresh-'+cohort,key,name:title,checkedAt,snapshotDate,
      source,sourceLabel:title+' 공식 자료',version,note},item=>item.id);
  }
  const neonTerminalSource = 'https://storage.googleapis.com/deepmind-media/gemini/gemini_4_neon_model_evaluation.pdf';
  upsert(rows,{
    modelId:'gemini-4-neon',modelVariant:'Xhigh',benchmark:'terminal41',score:65.2,unit:'%',
    cohort:'terminal41-aa-neon-20261118',cohortLabel:'Terminal-Bench 4.1 · Neon 별도 평가',
    checkedAt,snapshotDate:null,evaluationDate:null,publishedAt:'2026-11-18',rankMode:'reference',
    source:neonTerminalSource,sourceLabel:'Google 공식 평가 문서 (AA 측정 인용)',sourceType:'independent-leaderboard',
    benchmarkVersion:'Terminal-Bench 4.1 · cheating-adjusted accuracy',harness:'Antigravity CLI 1.5.9',
    tools:'격리 터미널',reasoningBudget:'Xhigh',comparisonNote:'Google 평가 보고서가 인용한 AA 실측입니다. 공개 공식 보드 순위는 부여하지 않습니다.'
  },keyFor);
  upsert(snapshots,{
    id:'bench-refresh-swe-verified',key:'swe',name:'SWE-bench Verified',checkedAt,snapshotDate:null,
    source:'https://www.swebench.com/verified',sourceLabel:'SWE-bench 공식 리더보드',version:'Verified',
    note:'공개 Verified 보드에서 GPT-6.2와 Gemini 4 Neon의 비교 가능한 신규 행을 확인하지 못했습니다.'
  },item=>item.id);

  models.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.name.localeCompare(b.name));
  rows.sort((a,b)=>keyFor(a).localeCompare(keyFor(b)));
}
