'use strict';

// Phase 2: adaptive diagnostic, visual balance model, and richer teacher details.

function adaptiveDiagnostic(){
  screen='diagnostic';
  quiz={unit:0,results:[],responses:[],task:units[0].make(),chosen:null,questions:0};
  adaptiveQuizPage();
}

function adaptiveQuizPage(){
  const i=quiz.unit,q=quiz.task;
  const answered=quiz.results.length;
  show(`<section class="card"><span class="pill">Upphafskönnun</span><h1>Hvar byrjum við?</h1><p>Könnunin aðlagast svörunum þínum. Ef svar er rangt færðu annað dæmi úr sama hæfniþætti svo eitt mistak ráði ekki niðurstöðunni.</p><p class="question-number">Hæfni ${i+1} af ${units.length} · ${safe(units[i].name)}</p><div class="progress"><span style="width:${answered/units.length*100}%"></span></div><div class="math">${safe(q.prompt)}</div><div class="options" id="quizOptions"></div><div id="quizActions" class="row"></div><p class="small muted">Ef þú þekkir ekki aðferðina skaltu velja „Veit ekki“.</p></section>`);
  const box=document.querySelector('#quizOptions');
  [...q.options,'Veit ekki'].forEach((v,j)=>add(box,button(v,()=>{
    quiz.chosen=j===3?null:v;
    box.querySelectorAll('button').forEach(b=>b.disabled=true);
    const ok=quiz.chosen===q.answer;
    document.querySelector('#quizActions').append(button('Áfram',()=>adaptiveRecordAnswer(ok)));
  },'option')));
}

function adaptiveRecordAnswer(ok){
  quiz.questions++;
  quiz.responses.push(ok);
  const r=quiz.responses;
  let decided=null;
  if(r.length===1 && r[0]===true) decided=true;
  else if(r.length===2 && r[0]===false && r[1]===false) decided=false;
  else if(r.length===3) decided=r.filter(Boolean).length>=2;

  if(decided===null){
    quiz.task=units[quiz.unit].make();
    adaptiveQuizPage();
    return;
  }
  quiz.results.push(decided);
  quiz.responses=[];
  quiz.unit++;
  if(quiz.unit>=units.length){adaptiveFinishDiagnostic();return;}
  quiz.task=units[quiz.unit].make();
  adaptiveQuizPage();
}

function adaptiveFinishDiagnostic(){
  const s=student();
  let at=quiz.results.findIndex(x=>!x);
  if(at<0)at=units.length-1;
  s.placement=at;
  s.diagnostic={date:new Date().toISOString(),correct:quiz.results.filter(Boolean).length,total:units.length,answers:quiz.results,adaptive:true,questions:quiz.questions};
  save();
  quiz=null;screen='placement';
  show(`<section class="card"><h1>Könnun lokið</h1><p>Hæfni staðfest: <strong>${s.diagnostic.correct} af ${units.length}</strong>.</p><p>Þú svaraðir <strong>${s.diagnostic.questions}</strong> dæmum. Við gáfum aukadæmi þar sem niðurstaðan var óviss.</p><p class="lead">Tillaga: byrja á <strong>stigi ${at+1}: ${safe(units[at].name)}</strong>.</p><p class="muted">Tillagan byggir á fyrsta hæfniþættinum sem ekki var staðfestur og er ekki einkunn.</p><div class="row" id="placeActions"></div></section>`);
  add(document.querySelector('#placeActions'),button('Byrja á stiginu',()=>lesson(at)),button('Skoða öll stig',dashboard,'secondary'));
}

diagnostic=adaptiveDiagnostic;

function balanceVisual(equation){
  const parts=String(equation).split('=');
  if(parts.length!==2)return '';
  const left=safe(parts[0].trim()),right=safe(parts[1].trim());
  return `<div class="balance-wrap" role="img" aria-label="Jafnvægisvog: vinstri hlið ${left}, hægri hlið ${right}"><div class="balance-note">Jafnan þarf að haldast í jafnvægi — gerðu sömu aðgerð báðum megin.</div><div class="balance"><div class="balance-pan"><span>${left}</span></div><div class="balance-center"><div class="balance-beam"></div><div class="balance-post"></div><div class="balance-base"></div></div><div class="balance-pan"><span>${right}</span></div></div></div>`;
}

function injectBalance(){
  if(!session||session.i<7||session.i>9)return;
  const math=document.querySelector('.math');
  if(!math||document.querySelector('.balance-wrap'))return;
  const q=session.tasks?.[session.index];
  const equation=q?.prompt||math.textContent;
  math.insertAdjacentHTML('afterend',balanceVisual(equation));
}

const phase1PracticePage=practicePage;
practicePage=function(){phase1PracticePage();injectBalance();};

const phase1ExamplesPage=examplesPage;
examplesPage=function(){
  phase1ExamplesPage();
  if(session&&session.i>=7&&session.i<=9){
    const example=document.querySelector('.example');
    const sample=session.i===7?'x + 4 = 9':session.i===8?'2x + 4 = 10':'3x + 2 = x + 10';
    if(example)example.insertAdjacentHTML('afterend',balanceVisual(sample));
  }
};

const phase1LessonPage=lessonPage;
lessonPage=function(){
  phase1LessonPage();
  if(session&&session.i>=7&&session.i<=9){
    const lead=document.querySelector('.lead');
    if(lead)lead.insertAdjacentHTML('afterend',`<div class="balance-mini"><strong>Hugsaðu um jafnvægisvog:</strong> ef þú tekur 4 af vinstri hlið þarftu líka að taka 4 af hægri hlið.</div>`);
  }
};

const phase1Teacher=teacher;
teacher=function(){
  phase1Teacher();
  const records=Object.values(db.students);
  if(!records.length)return;
  const section=document.createElement('section');
  section.className='card';
  section.innerHTML=`<h2>Nánara nemendayfirlit</h2><p class="small muted">Smelltu á nemanda til að sjá hæfni, vísbendinganotkun og algeng mistök.</p><div class="student-detail-grid">${records.map((s,idx)=>`<button class="secondary student-detail-btn" data-student-detail="${idx}">${safe(s.name)}</button>`).join('')}</div><div id="studentDetailPanel"></div>`;
  app.append(section);
  section.querySelectorAll('[data-student-detail]').forEach(btn=>btn.addEventListener('click',()=>{
    const s=records[Number(btn.dataset.studentDetail)],stats=s.skillStats||{};
    const rows=Object.entries(stats).map(([skill,st])=>{
      const pct=st.total?Math.round(st.correct/st.total*100):0;
      const errors=Object.entries(st.errors||{}).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([e,c])=>`${safe(e)} (${c}×)`).join('<br>')||'—';
      return `<tr><td>${safe(skill)}</td><td>${st.correct}/${st.total} (${pct}%)</td><td>${st.hints||0}</td><td>${errors}</td></tr>`;
    }).join('');
    document.querySelector('#studentDetailPanel').innerHTML=`<div class="student-detail-panel"><h3>${safe(s.name)}</h3>${rows?`<div class="table-wrap"><table><thead><tr><th>Hæfni</th><th>Rétt</th><th>Vísbendingar</th><th>Algeng mistök</th></tr></thead><tbody>${rows}</tbody></table></div>`:'<p>Engin hæfnigögn komin enn.</p>'}</div>`;
  }));
};
