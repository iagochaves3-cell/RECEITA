const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {install, lock} = require('../prescription-integration.js');
function fixture() {
  const inputs = [{disabled:false}, {disabled:false}];
  const actions = [{disabled:false, addEventListener(name, cb){ this[name]=cb; }}];
  const form = {querySelectorAll:()=>inputs, setAttribute(){}, addEventListener(name, cb){this[name]=cb;}};
  const output = {style:{display:'block'}, querySelectorAll:()=>actions};
  const content = {textContent:'STALE DOSE'};
  const status = {};
  const elements = {prescriptionForm:form, 'resultadoPrescrição':output, resultadoConteudo:content, prescriptionUnavailable:status};
  const document = {getElementById:id=>elements[id], addEventListener(name, cb){this[name]=cb;}};
  return {document, form, output, content, inputs, actions, status};
}
test('startup disables inputs/exports and clears residual results',()=>{
  const f=fixture(); install(f.document);
  assert.ok(f.inputs.every(x=>x.disabled)); assert.ok(f.actions[0].disabled);
  assert.equal(f.content.textContent,''); assert.equal(f.output.hidden,true);
});
for(const action of ['submit','copy','print']) test(`${action} cannot bypass denial`,()=>{
  const f=fixture(); install(f.document);
  let prevented=false, stopped=false;
  f.content.textContent='INJECTED'; f.output.style.display='block';
  const event={preventDefault(){prevented=true;},stopImmediatePropagation(){stopped=true;}};
  if(action==='submit') f.form.submit(event); else f.actions[0].click(event);
  assert.ok(prevented&&stopped); assert.equal(f.content.textContent,'');
  assert.equal(f.output.style.display,'none');
});
test('input change invalidates any residual result',()=>{
  const f=fixture(); install(f.document); f.content.textContent='STALE'; f.document.input();
  assert.equal(f.content.textContent,'');
});
test('missing DOM nodes fail closed without throwing',()=>lock({getElementById:()=>null}));
test('HTML stays closed without JavaScript and native printing hides output',()=>{
  const html=fs.readFileSync('index.html','utf8'); const css=fs.readFileSync('styles.css','utf8');
  assert.match(html,/<fieldset disabled/); assert.match(html,/prescription-integration.js/);
  assert.match(css,/@media print\s*{\s*#prescriptionForm, #resultadoPrescrição { display: none !important;/);
});
