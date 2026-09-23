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
get('applyWeekly20260914(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260921(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260923(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),before,'update must be idempotent');
get('applyWeekly20260921(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
get('applyWeekly20260923(MODELS,METRICS,BENCHMARK_ROWS,BENCHMARK_SNAPSHOTS)');
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),before,'standalone update must be idempotent');
get('state.route="opensource"');
const openCount=get('catalogList().length');
assert(get('catalogList().every(isOpenModel)'));
get('state.route="catalog"');
assert.equal(get('catalogList().length'),models.length,'open filter leaks across routes');
get('state.catalogRegion="Korea"');
assert.equal(get('catalogList().length'),2);
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
// Official AA images are the default; do not ship a local copy or a data URL.
assert.equal(get('state.benchmarkViewMode'),'artificial-analysis');
const aaHome=get('benchmarkView()');
assert(aaHome.includes('data-official-chart src="https://cdn.sanity.io/'));
assert(aaHome.includes('2026.09.22'));
assert(aaHome.includes('Intelligence Index'));
assert(aaHome.includes('gpt-6-sol-and-luna-push-the-cost-efficiency-frontier'));
assert(!aaHome.includes('id="benchmarkMetric"'));
assert(!aaHome.includes('data:image/'));
get('state.benchmarkViewMode="registered"');
get('state.metric="arena"');
assert(get('benchmarkView().includes("Gemini 3.8 Flash")'));
assert(get('benchmarkView().includes("2026-09-13")'));
get('state.metric="mmmuPro"');
assert(get('benchmarkView().includes("마지막 갱신 표기는 2025-09-05")'));
get('state.metric="mmluPro"');
assert(get('benchmarkView().includes("Solar Pro 4")'));
assert(!get('benchmarkView().includes("NaN")'));
assert(get('benchmarkView().includes("공식 출처 확인 · 2026-09-23")'));
get('state.metric="imageArena";state.benchmarkCohort="";state.benchmarkPage=1');
assert(get('benchmarkView().includes("GPT Image 2.5 Sunburst")'));
assert(get('benchmarkView().includes("Preliminary")'));
get('state.metric="terminal21DeepSeek";state.benchmarkCohort=""');
assert(get('benchmarkView().includes("90.6%")'));
assert(get('benchmarkView().includes("DeepSeek Harness Minimal")'));
assert.equal(rows.filter(r=>r.cohort==='arena-2026-09-13').length,28);
assert.equal(rows.filter(r=>r.modelId==='deepseek-v4-1-flash').length,20);
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
assert.equal(models.length,150);
assert.equal(rows.length,279);
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
assert.equal(rows.filter(r=>r.benchmark==='aaIntelligence432').length,20);
assert(rows.filter(r=>r.benchmark==='aaIntelligence432').every(r=>r.unit==='점'&&r.sourceType==='independent-leaderboard'));
assert.equal(rows.find(r=>r.modelId==='claude-opus-5-5'&&r.benchmark==='aaIntelligence432'&&r.modelVariant==='max').score,58);
assert.equal(rows.find(r=>r.modelId==='gpt-6-sol'&&r.benchmark==='deepSWE').score,68.8);
assert.equal(rows.find(r=>r.modelId==='mimo-v2-6-distill-qwen-9b'&&r.benchmark==='sweVerifiedMiMoDistill').score,61.1);
assert(!rows.some(r=>r.benchmark==='swe'&&r.modelId==='mimo-v2-6-distill-qwen-9b'));
get('state.benchmarkViewMode="registered";state.metric="aaIntelligence432";state.benchmarkPage=1;state.benchmarkCohort=""');
const freshBench=get('benchmarkView()');
assert(freshBench.includes('Claude Opus 5.5'));
assert(freshBench.includes('참고 수치 · 순위 제외'));
assert(freshBench.indexOf('data-model="claude-opus-5-5"')<freshBench.indexOf('data-model="gpt-6-sol"'));
console.log('September 23 launches, provider separation, open-source filters and AA scoring: pass');
