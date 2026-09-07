const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = vm.createContext({window:{}, location:{hash:'#/catalog'}, console});
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
for (const [, attributes, content] of scripts) {
  const src = attributes.match(/src="([^"]+)"/);
  let code = src ? fs.readFileSync(path.join(root, src[1]), 'utf8') : content;
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
assert.equal(JSON.stringify({models,rows,snapshots:get('BENCHMARK_SNAPSHOTS')}),before,'update must be idempotent');
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
get('state.metric="arena"');
assert(get('benchmarkView().includes("Gemini 3.8 Flash")'));
assert(get('benchmarkView().includes("2026-09-02")'));
get('state.metric="mmmuPro"');
assert(get('benchmarkView().includes("새 점수 확인 미완료")'));
get('state.metric="mmluPro"');
assert(get('benchmarkView().includes("Solar Pro 4")'));
assert(!get('benchmarkView().includes("NaN")'));
get('state.route="opensource";state.catalogPage=2');
assert(get('catalogView().includes("model-card")'));
assert.equal(get('benchmarkRank([{s:90},{s:90},{s:80}],1,"reported")'),1);
assert.equal(get('benchmarkRank([{s:90},{s:80}],1,"reference")'),'—');
// Static responsive contracts, not a substitute for viewport/device testing.
assert(/name="viewport"/.test(html));
assert(/@media/.test(html));
assert(/overflow-x\s*:\s*auto/.test(html));
console.log(JSON.stringify({models:models.length,scores:rows.length,openModels:openCount,syntax:'pass',duplicates:'pass',filters:'pass',pagination:'pass',benchmarkViews:'pass',idempotence:'pass',responsiveStatic:'pass',mobileVisual:'not tested'},null,2));
