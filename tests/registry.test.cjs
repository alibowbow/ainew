const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'atlas.css'), 'utf8');
const context = vm.createContext({window:{}, location:{hash:'#/catalog'}, console});
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
for (const [, attributes, content] of scripts) {
  const src = attributes.match(/src="([^"]+)"/);
  let code = src ? fs.readFileSync(path.join(root, src[1].split('?')[0]), 'utf8') : content;
  new vm.Script(code); // Check the entire script, including initialization.
  code = code.replace('shell();state.route=routeNow();bind();render();', '');
  vm.runInContext(code, context);
}
const get = code => vm.runInContext(code, context);
const models = get('MODELS'), rows = get('BENCHMARK_ROWS'), metrics = get('METRICS');
assert.equal(new Set(models.map(m=>m.id)).size, models.length, 'duplicate model IDs');
const keys=rows.map(r=>[r.modelId,r.benchmark,r.cohort,r.modelVariant||''].join('|'));
assert.equal(new Set(keys).size,keys.length,'duplicate score records');
for(const row of rows){
  assert(models.some(m=>m.id===row.modelId), 'unknown model '+row.modelId);
  assert(metrics[row.benchmark], 'unknown metric '+row.benchmark);
  assert(Number.isFinite(row.score), 'invalid score');
  assert(row.cohort && row.source && row.benchmarkVersion && row.harness && row.reasoningBudget && row.tools);
}
const before = JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')});
get('applyWeekly20260907(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260914(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260921(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260923(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260928(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applySonnet20260929(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyLaunches20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyAaIndex20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),before,'update must be idempotent');
get('applyWeekly20260921(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260923(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260928(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applySonnet20260929(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyLaunches20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyAaIndex20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),before,'standalone update must be idempotent');
get('applyImageDesign20260927(MODELS,METRICS,BENCHMARK_ROWS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),before,'image-design update must be idempotent');
get('state.route="opensource"');
const openCount=get('catalogList().length');
assert(get('catalogList().every(isOpenModel)'));
get('state.route="catalog"');
assert.equal(get('catalogList().length'),models.length,'open filter leaks across routes');
get('state.catalogRegion="Korea"');
assert.equal(get('catalogList().length'),3);
get('state.catalogRegion="China";state.catalogAccess="open"');
assert(get('catalogList().every(m=>m.region==="China"&&isOpenModel(m))'));
get('state.catalogRegion="all";state.catalogAccess="all";state.catalogQuery="Muse Spark 1.3"');
assert.equal(get('catalogList()[0].id'),'muse-spark-1-3');
get('state.catalogQuery=""');
assert.equal(get('modelById("solar-pro-4").releaseDate'),null);
assert.equal(get('modelById("worldlabs-atlas").apiDate'),null);
assert.equal(get('isOpenModel(modelById("muse-spark-1-3"))'),false);
assert.equal(get('modelById("gemma-4-31b").releaseDate'),'2026-04-02');
assert.equal(get('formatDate("")'),'날짜 미확인');
assert.equal(get('CATEGORY_LABELS["3d"]'),'3D 모델링');
get('state.route="catalog";state.catalogCategory="3d";state.catalogQuery="";state.catalogRegion="all";state.catalogAccess="all"');
assert(get('catalogList().length>=14'));
assert(get('catalogList().every(m=>m.category==="3d")'));
assert.equal(get('modelById("meshy-7").date'),'2026-08-10');
assert.equal(get('modelById("meshy-7").current'),false);
assert.equal(get('modelById("meshy-7-1").releaseDate'),'2026-09-10');
assert.equal(get('modelById("tripo-3-1").apiDate'),'2026-08-06');
assert.equal(get('modelById("trellis-2-4b").license'),'MIT');
assert.equal(get('modelById("hunyuan3d-2-1").accessType'),'open-weights');
assert.equal(get('modelById("deepseek-v4-1-flash").license'),'MIT');
assert.equal(get('modelById("deepseek-v4-1-flash").apiDate'),'2026-09-10');
assert(get('modelById("deepseek-v4-1-flash").regionTags.includes("China open weights")'));
assert.equal(get('isOpenModel(modelById("gpt-image-2-5-flare"))'),false);
assert.equal(get('modelById("gpt-live-1").category'),'voice');
get('state.mediaCategory="all"');
assert(get('mediaView().includes("3D")'));
// Current official AA scores render immediately, independently of remote image availability.
assert.equal(get('state.benchmarkViewMode'),'artificial-analysis');
const aaHome=get('benchmarkView()');
assert(aaHome.includes('2026.10.01 확인'));
assert(aaHome.includes('aa-live-chart'));
assert(aaHome.includes('공식 8위 Gemini 4 Argon high 53점'));
assert(aaHome.includes('공식 11위 GPT-6.1 Sol max 52점'));
assert(aaHome.indexOf('aa-current-table')<aaHome.indexOf('aa-live-chart'));
assert(aaHome.includes('<details class="benchmark-archive"><summary>AA 공식 순위 발췌 · 7개 설정'));
assert.equal((aaHome.match(/id="aa-current-title"/g)||[]).length,1);
assert.equal((aaHome.match(/id="aa-official-current-title"/g)||[]).length,1);
assert(aaHome.includes('data-official-chart src="https://cdn.sanity.io/'));
assert(aaHome.includes('<img data-official-chart src="https://huggingface.co/inclusionAI/Ming-Image-0.1-Design/resolve/main/assets/uiux_leaderboard.webp"'));
assert(aaHome.includes('data-metric="aaImageUiuxDesign"'));
assert(aaHome.includes('2026.09.30'));
assert(aaHome.includes('2026.10.01'));
assert(aaHome.includes('Intelligence Index'));
assert(aaHome.includes('gemini-4-argon-google-top-three-labs'));
assert(!aaHome.includes('id="benchmarkMetric"'));
assert(!aaHome.includes('data:image/'));
get('state.benchmarkViewMode="registered"');
get('state.metric="arena"');
assert(get('benchmarkView().includes("Gemini 3.8 Flash")'));
assert(get('benchmarkView().includes("2026-09-13")'));
get('state.metric="mmmuPro"');
assert(get('benchmarkView().includes("공식 출처 확인 · 2026-10-05")'));
get('state.metric="mmluPro"');
assert(get('benchmarkView().includes("Solar Pro 4")'));
assert(!get('benchmarkView().includes("NaN")'));
assert(get('benchmarkView().includes("공식 출처 확인 · 2026-10-05")'));
get('state.metric="imageArena";state.benchmarkCohort="";state.benchmarkPage=1');
assert(get('benchmarkView().includes("GPT Image 2.5 Sunburst")'));
assert(get('benchmarkView().includes("Preliminary")'));
get('state.metric="terminal21DeepSeek";state.benchmarkCohort=""');
assert(get('benchmarkView().includes("90.6%")'));
assert(get('benchmarkView().includes("DeepSeek Harness Minimal")'));
assert.equal(rows.filter(r=>r.cohort==='arena-2026-09-13').length,28);
assert.equal(rows.filter(r=>r.modelId==='deepseek-v4-1-flash').length,23);
assert.equal(rows.filter(r=>r.benchmark==='sweVerifiedOpenHands').length,2);
assert(rows.filter(r=>r.benchmark==='sweVerifiedOpenHands').every(r=>r.harness.includes('OpenHands')));
assert(!rows.some(r=>r.benchmark==='swe'&&r.harness.includes('OpenHands')));
get('state.route="opensource";state.catalogPage=2');
assert(get('catalogView().includes("model-card")'));
assert.equal(get('benchmarkRank([{s:90},{s:90},{s:80}],1,"reported")'),1);
assert.equal(get('benchmarkRank([{s:90},{s:80}],1,"reference")'),'—');
// Static responsive contracts, not a substitute for viewport/device testing.
assert(/name="viewport"/.test(html));
assert(/@media/.test(css));
assert(/overflow-x\s*:\s*auto/.test(css));
console.log(JSON.stringify({models:models.length,scores:rows.length,openModels:openCount,syntax:'pass',duplicates:'pass',filters:'pass',pagination:'pass',benchmarkViews:'pass',idempotence:'pass',responsiveStatic:'pass',mobileVisual:'not tested'},null,2));

// All-source mode must expose every registered model without inventing a rank.
get('state.metric="gpqa";state.benchmarkCohort="";state.benchmarkPage=1');
let gpqaHtml='';
for(let page=1;page<=Math.ceil(rows.filter(r=>r.benchmark==='gpqa').length/12);page++){
  get('state.benchmarkPage='+page);gpqaHtml+=get('benchmarkView()');
}
for(const r of rows.filter(r=>r.benchmark==='gpqa')) assert(gpqaHtml.includes('data-model="'+r.modelId+'"'),'hidden GPQA model '+r.modelId);
assert(gpqaHtml.includes('통합 순위 없이'));
assert(gpqaHtml.includes('점수 등록 '+new Set(rows.map(r=>r.modelId)).size+' / 전체 '+models.length+'개 모델'));
get('state.metric="arena";state.benchmarkCohort="all"');
let arenaHtml='';
for(let page=1;page<=Math.ceil(rows.filter(r=>r.benchmark==='arena').length/12);page++){
  get('state.benchmarkPage='+page);arenaHtml+=get('benchmarkView()');
}
for(const r of rows.filter(r=>r.benchmark==='arena')) assert(arenaHtml.includes('data-model="'+r.modelId+'"'));
get('state.metric="liveCodeBench";state.benchmarkCohort="";state.benchmarkPage=1');
assert(get('benchmarkView().includes("0개 모델 · 수치 미등록")'));
const comparison=get('comparisonBenchmarks([modelById("gpt-6-astra"),modelById("deepseek-v4-1-flash"),modelById("meshy-7-1")])');
assert(comparison.includes('벤치마크 비교'));
assert(comparison.includes('90.6%'));
assert(comparison.includes('DeepSeek Harness Minimal'));
assert(comparison.includes('수치 미등록'));
assert(!comparison.includes('NaN'));
assert(get('comparisonBenchmarks([modelById("eleven-music-2-5")]).includes("아직 등록되지 않았습니다")'));
console.log('All-source coverage, pagination, empty states and benchmark comparison: pass');

// Weekly additions: no guessed dates, no open-world/open-source confusion.
assert.equal(models.length,204);
assert.equal(rows.length,508);
assert.equal(get('modelById("gpt-6-astra-law").recordType'),'configuration');
assert.equal(get('modelById("gpt-6-astra-law").releaseDate'),null);
assert.equal(get('modelById("gpt-6-astra-law").apiDate'),null);
for(const m of models.filter(m=>m.id.startsWith('happyoyster-'))){
  assert.equal(m.category,'world');assert.equal(m.apiDate,null);
  assert.equal(get('isOpenModel(modelById('+JSON.stringify(m.id)+'))'),false);
  assert.deepEqual([...m.regionTags],['China']);
}
assert.equal(rows.filter(r=>r.cohort.startsWith('gemma4-card-')).length,25);
assert.equal(rows.filter(r=>r.cohort.startsWith('matharena-')).length,18);
assert(rows.filter(r=>r.checkedAt==='2026-09-21').every(r=>r.evaluationDate===null && r.rankMode==='reference'));
get('state.mediaCategory="world";state.mediaPage=1');
assert(get('mediaView().includes("HappyOyster")'));
get('state.metric="arxivMath202608";state.benchmarkCohort="";state.benchmarkPage=1');
const mathHtml=get('benchmarkView()');
assert(mathHtml.includes('85.09 ± 6.54%'));
assert(mathHtml.includes('참고 수치 · 순위 제외'));
assert(mathHtml.indexOf('data-model="gpt-6-astra"')<mathHtml.indexOf('data-model="claude-fable-5-1"'));
assert(mathHtml.indexOf('data-model="claude-fable-5-1"')<mathHtml.indexOf('data-model="deepseek-v4-1-flash"'));
// Protect the user's score sorting, including lower-is-better metrics and cohorts.
for(const direction of ['higher','lower']){
  get('METRICS.arxivMath202608.direction='+JSON.stringify(direction));
  const rendered=get('benchmarkView()');
  const first=direction==='higher'?'gpt-6-astra':'deepseek-v4-1-flash';
  assert.equal(rendered.match(/class="bench-model" data-model="([^"]+)"/)[1],first);
}
get('delete METRICS.arxivMath202608.direction;state.metric="mmluPro";state.benchmarkCohort="gemma4-card-mmluPro"');
const cohortHtml=get('benchmarkView()');
assert(cohortHtml.indexOf('data-model="gemma-4-31b"')<cohortHtml.indexOf('data-model="gemma-4-e2b"'));
assert(get('comparisonBenchmarks([modelById("gemma-4-e2b")]).includes("60%")'));
console.log('Weekly additions, date separation, score ordering, world filters and Gemma coverage: pass');

// New launches, independently measured variants, and provider-reported evaluations.
for(const id of ['gpt-6-sol','gpt-6-luna','claude-opus-5-5','grok-4-7','mimo-v2-6-pro-rl','mimo-v2-6-flash-rl','mimo-v2-6-distill-qwen-9b']){
  assert(get('modelById('+JSON.stringify(id)+')'),'missing '+id);
}
assert.equal(get('modelById("claude-opus-5-5").releaseDate'),'2026-09-22');
assert.equal(get('modelById("gpt-6-sol").apiDate'),'2026-09-22');
for(const id of ['mimo-v2-6-pro-rl','mimo-v2-6-flash-rl','mimo-v2-6-distill-qwen-9b']){
  assert.equal(get('modelById('+JSON.stringify(id)+').apiDate'),null);
  assert.equal(get('modelById('+JSON.stringify(id)+').license'),'MIT');
  assert(get('isOpenModel(modelById('+JSON.stringify(id)+'))'));
  assert(get('modelById('+JSON.stringify(id)+').regionTags.includes("China open weights")'));
}
get('state.route="opensource";state.catalogRegion="all";state.catalogAccess="all";state.catalogCategory="all";state.catalogQuery=""');
assert(get('catalogList().some(m=>m.id==="mimo-v2-6-pro-rl")'));
assert(!get('catalogList().some(m=>m.id==="claude-opus-5-5")'));
get('state.route="catalog"');
assert.equal(get('catalogList().length'),models.length,'open filter leaks after new entries');
assert.equal(rows.filter(r=>r.benchmark==='aaIntelligence432').length,75);
assert(rows.filter(r=>r.benchmark==='aaIntelligence432').every(r=>r.unit==='점'&&r.sourceType==='independent-leaderboard'));
assert.equal(rows.find(r=>r.modelId==='claude-opus-5-5'&&r.benchmark==='aaIntelligence432'&&r.modelVariant==='max · default fallback').score,58);
const aaCurrent=rows.filter(r=>r.cohort==='aa-intelligence-20261001');
assert.equal(aaCurrent.length,7);
assert.deepEqual(Array.from(aaCurrent.sort((a,b)=>a.officialRank-b.officialRank),r=>r.officialRank),[1,3,5,7,8,11,19]);
assert(aaCurrent.every(r=>r.rankMode==='official'&&r.sourceType==='independent-leaderboard'&&r.evaluationDate===null));
assert.equal(aaCurrent.find(r=>r.modelId==='gemini-4-argon').score,53);
assert.equal(aaCurrent.find(r=>r.modelId==='gpt-6-1-sol').score,52);
assert.equal(rows.find(r=>r.modelId==='gpt-6-sol'&&r.benchmark==='deepSWE').score,68.8);
assert.equal(rows.find(r=>r.modelId==='mimo-v2-6-distill-qwen-9b'&&r.benchmark==='sweVerifiedMiMoDistill').score,61.1);
assert(!rows.some(r=>r.benchmark==='swe'&&r.modelId==='mimo-v2-6-distill-qwen-9b'));
get('state.benchmarkViewMode="registered";state.metric="aaIntelligence432";state.benchmarkPage=1;state.benchmarkCohort=""');
const freshBench=get('benchmarkView()');
assert(freshBench.includes('Claude Opus 5.5'));
assert(freshBench.includes('공식 전체 순위 · 등록 모델 발췌'));
assert(freshBench.includes('공식 순위'));
assert(freshBench.includes('Gemini 4 Argon'));
assert(freshBench.includes('GPT-6.1 Sol'));
assert(freshBench.indexOf('data-model="claude-opus-5-5"')<freshBench.indexOf('data-model="gpt-6-1-sol"'));
get('state.benchmarkCohort="aa-v432-checked-20261001"');
assert(get('benchmarkView()').includes('참고 수치 · 순위 제외'));
assert(get('benchmarkView()').includes('공개되지 않은 Sonnet Low 값은 제외'));
console.log('September 23 launches, provider separation, open-source filters and AA scoring: pass');

// The September 23 TTS launch is distinct from Gemini 3.8 Flash text and 3.8 Live.
for(const [id,apiId,languages] of [
  ['gemini-3-8-flash-tts','gemini-3.8-flash-tts','130'],
  ['gemini-3-8-flash-lite-tts','gemini-3.8-flash-lite-tts','101']
]){
  const m=models.find(x=>x.id===id);
  assert(m,'missing TTS model '+id);
  assert.equal(m.params,apiId);
  assert.equal(m.category,'voice');
  assert.equal(m.announcementDate,'2026-09-23');
  assert.equal(m.releaseDate,'2026-09-22');
  assert.equal(m.apiDate,'2026-09-22');
  assert.equal(m.previewDate,null);
  assert.equal(m.accessType,'api-only');
  assert(m.highlight.includes(languages));
  assert(!get('isOpenModel(modelById('+JSON.stringify(id)+'))'));
}
assert.equal(openCount,77);
get('state.route="catalog";state.catalogCategory="voice";state.catalogRegion="all";state.catalogAccess="all";state.catalogQuery=""');
assert(get('catalogList().some(m=>m.id==="gemini-3-8-flash-tts")'));
assert(get('catalogList().some(m=>m.id==="gemini-3-8-flash-lite-tts")'));
get('state.route="opensource";state.catalogCategory="all"');
assert(!get('catalogList().some(m=>m.id==="gemini-3-8-flash-tts")'));
get('state.route="catalog"');
assert.equal(get('catalogList().length'),models.length);
get('state.mediaCategory="voice";state.mediaPage=1');
assert(get('mediaView().includes("Gemini 3.8 Flash TTS")'));
for(const [key,score] of [['humeVoiceDesignOverall',71.4],['humeVoiceDesignAccent',60.8]]){
  const r=rows.find(x=>x.modelId==='gemini-3-8-flash-tts'&&x.benchmark===key);
  assert(r,'missing Hume metric '+key);
  assert.equal(r.score,score);
  assert.equal(r.unit,'점');
  assert.equal(r.sourceType,'provider-reported');
  assert.equal(r.evaluationDate,null);
  assert(r.source.includes('blog.google'));
  get('state.benchmarkViewMode="registered";state.metric='+JSON.stringify(key)+';state.benchmarkCohort=""');
  assert(get('benchmarkView().includes("Gemini 3.8 Flash TTS")'));
}
assert(!rows.some(x=>x.modelId==='gemini-3-8-flash-lite-tts'),'do not guess a Flash-Lite quality score');
console.log('Google TTS model IDs, voice routes, Hume score metadata and missing-score handling: pass');

// September 21–28 official launches, pricing and evaluation conditions.
for(const id of ['aikido-altar-1','qwen-image-2-1','lfm2-5-vl-3b','lfm2-5-vl-3b-dspark','gemini-3-8-live','mercury-2-5']){
  assert(get('modelById('+JSON.stringify(id)+')'),'missing weekly model '+id);
  const m=get('modelById('+JSON.stringify(id)+')');
  assert.equal(m.checkedAt,m.date>='2026-09-01'?'2026-10-01':'2026-09-28');
}
assert.equal(get('modelById("aikido-altar-1").recordType'),'derivative');
assert.equal(get('modelById("aikido-altar-1").apiDate'),null);
assert.equal(get('modelById("qwen-image-2-1").license'),'Qwen Research License Agreement');
assert(get('modelById("qwen-image-2-1").regionTags.includes("China open weights")'));
assert.equal(get('modelById("lfm2-5-vl-3b-dspark").recordType'),'configuration');
assert.equal(get('modelById("gemini-3-8-live").apiDate'),'2026-09-15');
assert.equal(get('modelById("gemini-3-8-live").updates[0].date'),'2026-09-24');
assert.equal(get('modelById("mercury-2-5").apiPricing.rates[0].amount'),0.20);
assert.equal(get('modelById("gemini-3-8-live").apiPricing.rates[5].amount'),1);
assert.equal(rows.find(r=>r.modelId==='qwen-image-2-1'&&r.benchmark==='aaImageOpenWeightsOverall').officialRank,1);
assert.equal(rows.find(r=>r.modelId==='aikido-altar-1'&&r.benchmark==='aikidoCveRecall').score,60.4);
assert.equal(rows.filter(r=>r.modelId==='lfm2-5-vl-3b-dspark').length,6);
assert.equal(rows.find(r=>r.modelId==='lfm2-5-vl-3b'&&r.benchmark==='mmmuPro').score,30.5);
assert.equal(get('BENCHMARK_SNAPSHOTS.filter(s=>s.id&&s.id.startsWith("review-2026-09-28-")).length'),11);
get('state.route="opensource";state.catalogCategory="all";state.catalogRegion="all";state.catalogAccess="all";state.catalogQuery=""');
assert(get('catalogList().some(m=>m.id==="qwen-image-2-1")'));
assert(!get('catalogList().some(m=>m.id==="gemini-3-8-live")'));
get('state.route="catalog"');
assert.equal(get('catalogList().length'),models.length,'weekly open filter leaks into catalogue');
console.log('September 28 launches, lineage, prices, benchmark metadata and filter isolation: pass');

const priceStatuses=new Set(['verified','provider-dependent','no-public-rate','unverified']);
const firstPartyHosts=new Set(['developers.openai.com','platform.claude.com','ai.google.dev','cloud.google.com','api-docs.deepseek.com','docs.x.ai','docs.meshy.ai','docs.z.ai','platform.minimaxi.com','www.upstage.ai','help.aliyun.com','ideogram.ai','fal.ai','www.inceptionlabs.ai','microsoft.ai']);
for(const m of models){
  const p=m.apiPricing;
  assert(p&&priceStatuses.has(p.status), 'missing price status: '+m.id);
  assert(['2026-09-24','2026-09-27','2026-09-28','2026-09-29','2026-10-01','2026-10-05'].includes(p.checkedAt),'unexpected price check date: '+m.id);
  if(p.status==='verified'){
    assert(firstPartyHosts.has(new URL(p.source).hostname),'unofficial price source: '+m.id);
    assert(['USD','CNY','CREDITS'].includes(p.currency) && p.unit && p.rates.length,'incomplete price: '+m.id);
    assert(p.rates.every(r=>r.label && Number.isFinite(r.amount) && r.amount>0),'invalid price: '+m.id);
  } else {
    assert(!p.rates && p.note,'unknown price must not invent rates: '+m.id);
  }
}
assert(models.filter(m=>m.apiPricing.status==='verified').length>=50);
assert.equal(get('modelById("gemini-3-8-flash-tts").apiPricing.rates[1].amount'),9);
assert.equal(get('modelById("gemini-3-8-flash-lite-tts").apiPricing.rates[1].amount'),6);
assert.equal(get('modelById("gpt-6-sol").apiPricing.rates[0].amount'),2);
assert.equal(get('modelById("glm53-flash").apiPricing.rates[0].amount'),0.15);
assert.equal(get('modelById("speech-2-8").apiPricing.currency'),'CNY');
assert.equal(get('modelById("meshy-7-1").apiPricing.currency'),'CREDITS');
assert.equal(get('modelById("gemma-4-31b").apiPricing.status'),'provider-dependent');
assert.equal(get('modelById("minimax-music-2-6").apiPricing.status'),'no-public-rate');
assert(get('apiPriceSummary(modelById("meshy-7-1")).includes("20 크레딧")'));
assert(get('apiPriceDetails(modelById("gpt-6-sol")).includes("공식 요금표")'));
assert(get('card(modelById("gpt-6-sol")).includes("API 요금")'));
assert(get('catalogView().includes("API 요금")'));
assert(css.includes('.model-price{') && css.includes('.pricing-rates{'));
const pricingBefore=JSON.stringify(models.map(m=>m.apiPricing));
get('applyApiPricing20260924(MODELS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyImageDesign20260927(MODELS,METRICS,BENCHMARK_ROWS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260928(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applySonnet20260929(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyLaunches20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify(models.map(m=>m.apiPricing)),pricingBefore,'pricing and image update must be idempotent');
console.log('Pricing coverage, official sources, units, open-weights and price rendering: pass');

// The screenshot and the live independent global table are different cohorts.
const imageIds=['ming-image-0-1-design','ideogram-4-quality','ideogram-4','hunyuan-image-3-instruct',
  'flux-2-dev','flux-2-dev-flash','flux-2-dev-turbo','hidream-o1-image','ideogram-4-instant',
  'hunyuan-image-3','ideogram-4-fast-quality','z-image-turbo','cosmos3-super-text2image','ernie-image'];
for(const id of imageIds)assert(get('modelById('+JSON.stringify(id)+')'),'missing image model '+id);
assert.equal(rows.filter(r=>r.benchmark==='aaImageUiuxDesign').length,13);
assert.equal(rows.filter(r=>r.benchmark==='aaImageOpenWeightsOverall').length,15);
assert.equal(rows.filter(r=>r.benchmark==='aaImageEditOpenWeights').length,5);
assert(!rows.some(r=>r.modelId==='ming-image-0-1-design-layer'),'no invented layer score');
assert(!rows.some(r=>r.modelId==='cosmos3-super-text2image'&&r.benchmark==='aaImageUiuxDesign'),'truncated variant cannot be attributed');
assert.equal(get('modelById("ideogram-4").license'),'Ideogram 4 Non-Commercial Model Agreement');
assert.equal(get('modelById("ming-image-0-1-design").license'),'MIT');
assert.equal(get('modelById("ideogram-4").apiPricing.rates[0].amount'),0.06);
assert.equal(get('modelById("flux-2-dev-turbo").apiPricing.unit'),'메가픽셀');
assert.equal(get('modelById("hunyuan-image-3-instruct").releaseDate'),'2026-01-26');
assert.equal(get('modelById("ming-image-0-1-design").releaseDate'),null);
get('state.route="catalog";state.catalogCategory="image";state.catalogQuery="";state.catalogRegion="all";state.catalogAccess="all"');
assert(imageIds.every(id=>get('catalogList()').some(m=>m.id===id)));
get('state.route="opensource"');
assert(imageIds.every(id=>get('catalogList()').some(m=>m.id===id)));
get('state.route="catalog";state.catalogCategory="all"');
assert.equal(get('catalogList().length'),models.length,'image open filter leaks into catalogue');
get('state.benchmarkViewMode="registered";state.metric="aaImageUiuxDesign";state.benchmarkCohort="";state.benchmarkPage=1');
const designPage=get('benchmarkView()');
assert(designPage.includes('Ming-Image-0.1-Design'));
assert(designPage.includes('참고 수치 · 순위 제외'));
assert(designPage.indexOf('data-model="ming-image-0-1-design"')<designPage.indexOf('data-model="ideogram-4-quality"'));
get('state.metric="aaImageOpenWeightsOverall";state.benchmarkCohort="";state.benchmarkPage=1');
assert(get('benchmarkView()').includes('공식 순위'));
assert(!rows.some(r=>r.benchmark==='aaImageUiuxDesign'&&r.evaluationDate));
console.log('Image card, screenshot provenance, independent overall rank, pricing and filter isolation: pass');

// Sonnet 5.5: launch date, exact pricing, variants and source-separated benchmarks.
const sonnet=models.find(m=>m.id==='claude-sonnet-5-5');
assert.equal(sonnet.releaseDate,'2026-09-28');
assert.equal(sonnet.apiDate,'2026-09-28');
assert.equal(sonnet.checkedAt,'2026-10-01');
assert.equal(sonnet.context,'1M tokens');
assert.equal(sonnet.apiPricing.rates[0].amount,2);
assert.equal(sonnet.apiPricing.rates[1].amount,10);
assert.equal(sonnet.apiPricing.rates[2].amount,0.2);
assert(!get('isOpenModel(modelById("claude-sonnet-5-5"))'));
const sonnetRows=rows.filter(r=>r.modelId===sonnet.id);
assert.equal(sonnetRows.length,29);
assert(sonnetRows.every(r=>r.evaluationDate===null&&['reference','official'].includes(r.rankMode)));
assert.deepEqual(Array.from(sonnetRows.filter(r=>r.benchmark==='aaIntelligence432'&&r.cohort==='aa-v432-checked-20261001'),r=>r.score).sort((a,b)=>b-a),[56,52,47,41]);
assert.equal(sonnetRows.find(r=>r.benchmark==='frontierCode'&&r.modelVariant==='max').score,46.2);
assert.equal(sonnetRows.find(r=>r.benchmark==='frontierCode'&&r.modelVariant==='xhigh').score,52.1);
assert.equal(sonnetRows.find(r=>r.benchmark==='terminal4'&&r.sourceType==='provider-reported').score,70.6);
assert.equal(sonnetRows.find(r=>r.benchmark==='terminal4'&&r.sourceType==='independent-leaderboard').score,64);
assert.equal(sonnetRows.find(r=>r.benchmark==='swePro').score,81.3);
assert.equal(sonnetRows.find(r=>r.benchmark==='hle').score,56.9);
assert(!sonnetRows.some(r=>r.benchmark==='swe'),'do not conflate Pro with Verified');
assert.equal(metrics.aaOmniscienceHallucination.direction,'lower');
get('state.benchmarkViewMode="artificial-analysis"');
assert(get('benchmarkView().includes("Claude Sonnet 5.5")'));
assert(get('benchmarkView()').includes('aa-current-score">56</td>'));
get('state.benchmarkViewMode="registered";state.metric="frontierCode";state.benchmarkCohort="sonnet55-launch-20260928";state.benchmarkPage=1');
const sonnetFrontier=get('benchmarkView()');
assert(sonnetFrontier.indexOf('52.1%')<sonnetFrontier.indexOf('46.2%'));
const sonnetBefore=JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')});
get('applySonnet20260929(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),sonnetBefore);
console.log('Sonnet 5.5 pricing, provider/AA separation, reasoning variants, sorting and idempotence: pass');

// Argon remains limited preview; the audited scores include source-labelled AA results.
const argon=models.find(m=>m.id==='gemini-4-argon');
const sol61=models.find(m=>m.id==='gpt-6-1-sol');
assert.equal(argon.previewDate,'2026-09-30');
assert.equal(argon.releaseDate,null);
assert.equal(argon.apiDate,null);
assert.equal(argon.apiPricing.status,'no-public-rate');
assert.equal(sol61.releaseDate,'2026-09-29');
assert.equal(sol61.apiDate,'2026-09-29');
assert.deepEqual(Array.from(sol61.apiPricing.rates,r=>r.amount),[2,10,0.1,2.5]);
assert(get('card(modelById("gpt-6-1-sol")).includes("입력 $2 · 출력 $10")'));
assert.equal(rows.filter(r=>r.modelId===argon.id).length,23);
assert.equal(rows.filter(r=>r.modelId===sol61.id).length,12);
assert(!rows.some(r=>r.modelId===sol61.id&&r.benchmark==='deepSWE'),'unsupported third-party score');
assert.equal(rows.find(r=>r.modelId===argon.id&&r.benchmark==='deepSWE').score,77.9);
assert.equal(rows.find(r=>r.modelId===sol61.id&&r.benchmark==='solHealthBenchProfessional').score,64.2);
assert(rows.filter(r=>[argon.id,sol61.id].includes(r.modelId)).every(r=>['provider-reported','independent-leaderboard'].includes(r.sourceType)&&['reference','official'].includes(r.rankMode)&&r.evaluationDate===null));
get('state.route="catalog";state.catalogCategory="all";state.catalogRegion="all";state.catalogAccess="all";state.catalogQuery=""');
assert.equal(get('catalogList().length'),models.length);
get('state.route="opensource"');
assert(!get('catalogList().some(m=>m.id==="gemini-4-argon"||m.id==="gpt-6-1-sol")'));
get('state.route="catalog"');
assert.equal(get('catalogList().length'),models.length);
get('state.benchmarkViewMode="artificial-analysis"');
const launchPanel=get('benchmarkView()');
assert(launchPanel.includes('Gemini 4 Argon')&&launchPanel.includes('GPT-6.1 Sol'));
assert(launchPanel.includes('AA Intelligence Index'));
assert(launchPanel.includes('low <b>42</b>'));
assert(launchPanel.includes('max <b>52</b>'));
assert(launchPanel.includes('aa-current-score\">53</td>'));
assert(css.includes('.modal-head{position:sticky;top:0;'));
assert(html.includes('atlas.css?v=20261001-audit-v1'),'stylesheet URL must invalidate old cached CSS');
assert(html.includes('aa-index-2026-10-01.js?v=1'),'score data URL must invalidate old cached JS');
assert(html.includes('launches-2026-10-01.js?v=2'),'launch data URL must invalidate old cached JS');
assert.equal((html.match(/aria-label="(?:상세|비교) 창 닫기">닫기/g)||[]).length,2);
const launchesBefore=JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')});
get('applyLaunches20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),launchesBefore);
console.log('Argon/Sol release status, pricing, official scores, close controls and idempotence: pass');

// October 1 audit: exact efforts, unavailable values and API/checkpoint lineage.
const auditedAA=rows.filter(r=>r.benchmark==='aaIntelligence432');
function effortScores(id){return Object.fromEntries(auditedAA.filter(r=>r.modelId===id).map(r=>[r.modelVariant.split(' · ')[0],r.score]));}
assert.deepEqual(effortScores('gpt-6-1-sol'),{high:50,low:42,max:52,medium:48,xhigh:51});
assert.deepEqual(effortScores('gpt-6-astra'),{high:51,low:46,max:53,medium:50,xhigh:52});
assert.deepEqual(effortScores('gpt-6-luna'),{high:33,low:22,max:38,medium:30,none:18,xhigh:35});
assert.equal(effortScores('gpt-6-sol').high,42);
assert.equal(effortScores('gpt-6-sol').none,29);
assert(!Object.hasOwn(effortScores('claude-sonnet-5-5'),'low'),'Sonnet Low is unpublished');
assert.equal(effortScores('gemini-4-argon').high,53);
assert.equal(effortScores('claude-fable-5-1').max,53,'do not mix old Index versions');
assert.equal(effortScores('muse-spark-1-3').max,48);
assert.equal(effortScores('deepseek-v4-1-flash').max,39);
assert.equal(effortScores('glm53').max,45);
assert.equal(effortScores('step-5-preview')['provider default'],44);
assert.equal(effortScores('ling-3-0-flash-fin')['provider default'],23);
assert.equal(effortScores('ling-3-0-flash-vl')['provider default'],25);
assert.equal(effortScores('k2-horizon-0-9b')['provider default'],3);
assert.equal(effortScores('k2-horizon-3-7b')['provider default'],16);
assert.equal(effortScores('k2-horizon-7b')['provider default'],21);
assert.equal(effortScores('k2-horizon-mova-36b-a4b')['provider default'],25);
assert.equal(effortScores('k2-horizon-375b-a23b')['provider default'],31);
assert.equal(effortScores('minicpm5-2b')['provider default'],12);
assert.equal(effortScores('jt-4-1-flash-236b-a21b').reasoning,34);
assert.equal(effortScores('deepseek-v4-pro').max,36);
assert.equal(effortScores('deepseek-v4-pro')['non-reasoning'],20);
assert.equal(models.find(m=>m.id==='jt-4-1-flash-236b-a21b').releaseDate,null);
assert.equal(models.find(m=>m.id==='jt-4-1-flash-236b-a21b').apiPricing.status,'unverified');
assert(auditedAA.every(r=>['2026-10-01','2026-10-05'].includes(r.checkedAt)&&r.evaluationDate===null&&r.benchmarkVersion.endsWith('v4.3.2')));
assert(!auditedAA.some(r=>r.modelId==='mimo-v2-6-pro-rl'||r.modelId==='mimo-v2-6-flash-rl'));
for(const tier of ['pro','flash']){
  const api=models.find(m=>m.id==='mimo-v2-6-'+tier+'-api');
  assert.equal(api.recordType,'configuration');
  assert.equal(api.baseModelId,'mimo-v2-6-'+tier+'-rl');
  assert.equal(api.releaseDate,null);
  assert(!get('isOpenModel(modelById('+JSON.stringify(api.id)+'))'));
}
assert.equal(rows.filter(r=>r.modelId==='mimo-v2-6-pro-rl').length,17);
assert.equal(rows.filter(r=>r.modelId==='mimo-v2-6-flash-rl').length,16);
assert.equal(rows.filter(r=>r.modelId==='mimo-v2-6-distill-qwen-9b').length,11);
assert.equal(metrics.museStreamingFinalWer.direction,'lower');
assert.equal(rows.find(r=>r.modelId==='muse-voice-transcribe'&&r.benchmark==='museStreamingFinalWer').score,3.1);
assert.equal(rows.find(r=>r.modelId==='gemini-3-8-live-extended-thinking'&&r.benchmark==='aaSpeechToSpeechQuality').score,82.6);
assert.equal(models.find(m=>m.id==='solar-mini-4').apiPricing.rates[0].amount,0.10);
assert.equal(effortScores('solar-mini-4')['provider default'],24);
assert.equal(rows.find(r=>r.modelId==='solar-mini-4'&&r.benchmark==='aaIntelligenceQuoted432').score,24.1);
assert.equal(models.find(m=>m.id==='mercury-voice').category,'reasoning','Mercury Voice is a text LLM in a voice pipeline');
assert.equal(models.find(m=>m.id==='mercury-voice').releaseDate,'2026-09-29');
assert(models.filter(m=>m.date>='2026-09-01').every(m=>m.benchmarkReview&&['2026-10-01','2026-10-05'].includes(m.benchmarkReview.checkedAt)));
assert.equal(models.find(m=>m.id==='gemini-3-8-flash-lite-tts').benchmarkReview.aaStatus,'not-applicable');
assert.equal(models.find(m=>m.id==='decision-model-preview').benchmarkReview.aaStatus,'unconfirmed');
get('state.benchmarkViewMode="artificial-analysis"');
const currentHome=get('benchmarkView()');
assert.equal((currentHome.match(/<tr(?: class="aa-highlight")?><th scope="row">/g)||[]).length,new Set(auditedAA.map(r=>r.modelId)).size);
assert(currentHome.includes('low <b>42</b>')&&currentHome.includes('medium <b>48</b>')&&currentHome.includes('max <b>52</b>'));
assert(currentHome.indexOf('aa-current-title')<currentHome.indexOf('aa-title'),'current scores precede the snapshot graph');
assert(!currentHome.includes('HealthBench Professional · 64.2%'),'different benchmarks stay in model details');
assert(html.includes('benchmarks-audit-2026-10-01.js?v=1'));
assert(get('benchmarkReviewDetails(modelById("claude-sonnet-5-5"))').includes('현재 미공개'));
const auditBefore=JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')});
get('applyBenchmarkAudit20261001(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),auditBefore);
console.log('October 1 efforts, AA version, unavailable score, API lineage, specialist metrics and current view: pass');

// October 5: preserve unknown dates, API-only filters and transcription units.
for(const id of ['mai-transcribe-2-streaming','mai-voice-2-1','mai-voice-2-1-flash']){
 const m=models.find(x=>x.id===id);
 assert.equal(m.releaseDate,null);assert.equal(m.previewDate,'2026-10-01');assert.equal(m.apiDate,'2026-10-01');
 assert.equal(m.accessType,'api-only');assert.equal(m.apiPricing.checkedAt,'2026-10-05');
}
assert.equal(models.find(m=>m.id==='mai-voice-2-1').apiPricing.unit,'100만 문자');
assert.equal(models.find(m=>m.id==='mai-transcribe-2-streaming').apiPricing.rates[0].amount,0.54);
const ling=models.find(m=>m.id==='ling-3-1-flash'),mini=models.find(m=>m.id==='minimax-m3-1-flash-preview');
assert.equal(ling.releaseDate,null);assert.equal(ling.apiDate,'2026-09-30');assert.equal(ling.apiPricing.status,'provider-dependent');
assert.equal(mini.releaseDate,null);assert.equal(mini.previewDate,null);assert.equal(mini.apiDate,null);
assert.equal(mini.apiPricing.status,'no-public-rate');
assert.equal(models.find(m=>m.id==='solar-mini-4').context,'512K tokens');
assert.equal(models.find(m=>m.id==='solar-mini-4').announcementDate,'2026-10-01');
const fresh=rows.filter(r=>r.checkedAt==='2026-10-05');
assert.equal(fresh.length,30);assert(fresh.every(r=>r.evaluationDate===null));
assert.equal(fresh.filter(r=>r.cohort==='aa-streaming-20261005').length,16);
assert.equal(fresh.find(r=>r.modelId==='mai-transcribe-2-streaming'&&r.benchmark==='aaStreamingFinalWer').score,2.5136);
assert.equal(fresh.find(r=>r.modelId==='mai-transcribe-2-streaming'&&r.benchmark==='aaStreamingFinalLatency').score,0.127569);
assert.equal(fresh.find(r=>r.modelId==='grok-4-7').score,42);
get('state.route="opensource";state.catalogCategory="all";state.catalogRegion="all";state.catalogAccess="all";state.catalogQuery=""');
assert(!get('catalogList().some(m=>["ling-3-1-flash","minimax-m3-1-flash-preview","mai-voice-2-1"].includes(m.id))'));
get('state.route="catalog"');assert.equal(get('catalogList().length'),204);
get('state.benchmarkViewMode="registered";state.metric="aaStreamingFinalWer";state.benchmarkCohort="";state.benchmarkPage=1');
let streaming=get('benchmarkView()');
assert.equal(streaming.match(/class="bench-model" data-model="([^"]+)"/)[1],'mai-transcribe-2-streaming');
get('state.metric="aaStreamingFinalLatency"');
streaming=get('benchmarkView()');
assert.equal(streaming.match(/class="bench-model" data-model="([^"]+)"/)[1],'mai-transcribe-2-streaming');
get('state.metric="arena";state.benchmarkCohort="arena-2026-10-02"');
assert(get('benchmarkView()').includes('1525'));
assert(get('benchmarkView()').includes('2026-10-02'));
get('state.benchmarkViewMode="artificial-analysis"');
assert(get('benchmarkView()').includes('Ling 3.1 Flash'));
assert(get('benchmarkView()').includes('음성 인식 오류율'));
const weeklyBefore=JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')});
get('applyWeekly20261005(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),weeklyBefore);
console.log('October 5 sources, dates, preview/API filters, speech units, ordering and idempotence: pass');
