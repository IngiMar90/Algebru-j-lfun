'use strict';

// Kennslufræðilegar viðbætur fyrir algebruþjálfun.
// Skráin er hlaðin á eftir app.js og byggir ofan á núverandi virkni án þess að breyta gagnasniði eldri nemenda.

function stepTask(prompt, answer, wrong, why, extra={}){
  return task(prompt,answer,wrong,why,{...extra,workMode:'steps'});
}

function fmtSigned(n){return n<0?`− ${Math.abs(n)}`:`+ ${n}`}

// Stig 8: fleiri undirhæfniþættir en áður.
units[7].intro='Jafna er eins og jafnvægisvog. Markmiðið er að fá x eitt og sér. Gerðu alltaf sömu aðgerð báðum megin við jafnaðarmerkið.';
units[7].example=[
  'x + 5 = 12: Dragðu 5 frá báðum megin. Þá fæst x = 7.',
  '4x = 20: Deildu báðum megin með 4. Þá fæst x = 5.',
  'x ÷ 3 = 6: Margfaldaðu báðar hliðar með 3. Þá fæst x = 18.'
];
units[7].make=function(){
  const kind=pick(['add','subtract','multiply','divide']);
  const x=rand(2,20);
  if(kind==='add'){
    const a=rand(2,18),v=x+a;
    return stepTask(`x + ${a} = ${v}`,x,[v,x+a,x-1],`Dragðu ${a} frá báðum hliðum. Þá fæst x = ${x}.`,{
      skill:'Samlagning í jöfnu',
      steps:[{label:`x = ${v} − ${a}`,answer:String(x),prefix:'x = '}],
      hints:[`Hvaða tala er lögð við x? Reyndu að losna við + ${a}.`,`Notaðu öfuga aðgerð: dragðu ${a} frá báðum hliðum.`,`x = ${v} − ${a} = ${x}`],
      misconceptions:{[String(v)]:'Tók hægri hliðina sem svar án þess að einangra x.',[String(x+a)]:'Lagði töluna við í stað þess að draga hana frá.'}
    });
  }
  if(kind==='subtract'){
    const a=rand(2,18),v=x-a;
    return stepTask(`x − ${a} = ${v}`,x,[v,x-a,x+a+1],`Leggðu ${a} við báðar hliðar. Þá fæst x = ${x}.`,{
      skill:'Frádráttur í jöfnu',
      steps:[{label:`x = ${v} + ${a}`,answer:String(x),prefix:'x = '}],
      hints:[`Hvaða tala er dregin frá x?`,`Notaðu öfuga aðgerð: leggðu ${a} við báðar hliðar.`,`x = ${v} + ${a} = ${x}`],
      misconceptions:{[String(v)]:'Tók hægri hliðina sem svar án þess að einangra x.',[String(x-a)]:'Dró aftur frá í stað þess að nota öfuga aðgerð.'}
    });
  }
  if(kind==='multiply'){
    const a=rand(2,10),v=a*x;
    return stepTask(`${a}x = ${v}`,x,[v,a,x+1],`Deildu báðum hliðum með ${a}. Þá fæst x = ${v} ÷ ${a} = ${x}.`,{
      skill:'Margföldun í jöfnu',
      steps:[{label:`x = ${v} ÷ ${a}`,answer:String(x),prefix:'x = '}],
      hints:[`Talan ${a} er margfölduð með x. Hvaða aðgerð er öfug við margföldun?`,`Deildu báðum hliðum með ${a}.`,`x = ${v} ÷ ${a} = ${x}`],
      misconceptions:{[String(v)]:'Tók hægri hliðina sem svar.',[String(a)]:'Valdi stuðulinn við x sem svar.'}
    });
  }
  const a=rand(2,9),v=x;
  const numerator=x*a;
  return stepTask(`x ÷ ${a} = ${v}`,numerator,[v,a,numerator-a],`Margfaldaðu báðar hliðar með ${a}. Þá fæst x = ${numerator}.`,{
    skill:'Deiling í jöfnu',
    steps:[{label:`x = ${v} × ${a}`,answer:String(numerator),prefix:'x = '}],
    hints:[`x er deilt með ${a}. Hvaða aðgerð er öfug við deilingu?`,`Margfaldaðu báðar hliðar með ${a}.`,`x = ${v} × ${a} = ${numerator}`],
    misconceptions:{[String(v)]:'Tók hægri hliðina sem svar.',[String(a)]:'Valdi deilinn sem svar.'}
  });
};

// Stig 9: nemandinn vinnur jöfnuna niður í tveimur sýnilegum skrefum.
units[8].make=function(){
  const x=rand(2,15),a=rand(2,9),b=rand(2,18),plus=Math.random()<.65;
  const rhs=plus?a*x+b:a*x-b;
  const middle=a*x;
  const sign=plus?'+':'−';
  const undo=plus?`− ${b}`:`+ ${b}`;
  return stepTask(`${a}x ${sign} ${b} = ${rhs}`,x,[middle,rhs,x+1],`Fyrst ${plus?'dragðu':'leggðu'} ${b} ${plus?'frá':'við'} báðar hliðar. Þá fæst ${a}x = ${middle}. Deildu svo með ${a}: x = ${x}.`,{
    skill:'Jafna í tveimur skrefum',
    steps:[
      {label:`${a}x = ${rhs} ${undo}`,answer:String(middle),prefix:`${a}x = `},
      {label:`x = ${middle} ÷ ${a}`,answer:String(x),prefix:'x = '}
    ],
    hints:[
      `Byrjaðu á tölunni ${b}. Markmiðið er að fá ${a}x eitt og sér.`,
      `${plus?'Dragðu':'Leggðu'} ${b} ${plus?'frá':'við'} báðar hliðar. Þá færðu ${a}x = ${middle}.`,
      `Deildu svo báðum hliðum með ${a}: x = ${middle} ÷ ${a} = ${x}.`
    ],
    misconceptions:{[String(middle)]:'Stoppaði eftir fyrsta skref og gleymdi að deila með stuðlinum.',[String(rhs)]:'Tók hægri hliðina sem lokasvar.'}
  });
};

// Stig 10: þrjú skref og x beggja megin.
units[9].make=function(){
  const x=rand(2,12),right=rand(1,5),diff=rand(2,5),left=right+diff,b=rand(1,12),c=diff*x+b;
  return stepTask(`${left}x + ${b} = ${right}x + ${c}`,x,[c-b,diff,x+1],`Dragðu ${right}x frá báðum hliðum: ${diff}x + ${b} = ${c}. Dragðu ${b} frá: ${diff}x = ${c-b}. Deildu með ${diff}: x = ${x}.`,{
    skill:'x beggja megin',
    steps:[
      {label:`Dragðu ${right}x frá báðum megin`,answer:`${diff}x + ${b} = ${c}`,prefix:''},
      {label:`${diff}x = ${c} − ${b}`,answer:String(c-b),prefix:`${diff}x = `},
      {label:`x = ${c-b} ÷ ${diff}`,answer:String(x),prefix:'x = '}
    ],
    hints:[
      `Byrjaðu á x-liðunum. Færðu ${right}x yfir þannig að x-liðirnir séu öðrum megin.`,
      `Dragðu ${right}x frá báðum hliðum. Þá fæst ${diff}x + ${b} = ${c}.`,
      `Dragðu ${b} frá og deildu svo með ${diff}. Lokaniðurstaðan er x = ${x}.`
    ],
    misconceptions:{[String(c-b)]:'Stoppaði áður en deilt var með stuðlinum.',[String(diff)]:'Tók stuðulinn við x sem lokasvar.'}
  });
};

function getHint(q){
  q.hintLevel=(q.hintLevel||0)+1;
  const hints=q.hints&&q.hints.length?q.hints:[units[session.i].intro,units[session.i].example[0],q.why];
  const idx=Math.min(q.hintLevel-1,hints.length-1);
  return {text:hints[idx],level:idx+1,total:hints.length};
}

function updateSkillStat(q,ok,usedHint=false,misconception=null){
  if(!q.skill)return;
  const s=student();
  s.skillStats=s.skillStats||{};
  const stat=s.skillStats[q.skill]||(s.skillStats[q.skill]={correct:0,total:0,hints:0,errors:{}});
  stat.total++;
  if(ok)stat.correct++;
  if(usedHint)stat.hints++;
  if(misconception){stat.errors[misconception]=(stat.errors[misconception]||0)+1;}
}

const baseAnswerPractice=answerPractice;
answerPractice=function(v){
  const q=session.tasks[session.index];
  const ok=v===q.answer;
  const issue=!ok&&q.misconceptions?q.misconceptions[String(v)]:null;
  updateSkillStat(q,ok,(q.hintLevel||0)>0,issue);
  baseAnswerPractice(v);
};

function normalizeWorkAnswer(v){return String(v).trim().replace(/−/g,'-').replace(/\s+/g,' ').toLowerCase()}

function checkStepWork(){
  const q=session.tasks[session.index];
  const inputs=[...document.querySelectorAll('[data-work-step]')];
  let all=true;
  inputs.forEach((input,idx)=>{
    const expected=normalizeWorkAnswer(q.steps[idx].answer);
    const actual=normalizeWorkAnswer(input.value);
    const ok=actual===expected;
    input.classList.toggle('work-correct',ok);
    input.classList.toggle('work-wrong',!ok);
    input.setAttribute('aria-invalid',String(!ok));
    if(!ok)all=false;
  });
  if(!all){
    q.hadWorkError=true;
    document.querySelector('#feedback').innerHTML='<div class="feedback try"><strong>Ekki alveg enn.</strong><br>Skoðaðu rauðu reitina. Reyndu að laga eitt skref í einu eða notaðu vísbendingu.</div>';
    saveActive();
    return;
  }
  const firstTry=!q.hadWorkError;
  if(firstTry)session.correct++;
  updateSkillStat(q,firstTry,(q.hintLevel||0)>0,q.hadWorkError?'Mistök í milliskrefum':null);
  inputs.forEach(i=>i.disabled=true);
  document.querySelector('#checkWork').disabled=true;
  document.querySelector('#practiceActions').innerHTML='';
  document.querySelector('#feedback').innerHTML=`<div class="feedback good"><strong>${firstTry?'Rétt!':'Núna er þetta rétt.'}</strong><br>${safe(q.why)}${firstTry?'':'<br><span class="small">Dæmið telst ekki með sem rétt í fyrstu tilraun, en þú leiðréttir aðferðina sjálf(ur).</span>'}</div>`;
  session.index++;
  if(session.mode==='free'){
    session.tasks=[generated(session.i)];
    session.index=0;
    session.answered=(session.answered||0)+1;
  }
  saveActive();
  add(document.querySelector('#practiceActions'),button(session.mode==='mastery'&&session.index===10?'Sjá niðurstöðu':'Næsta dæmi',()=>{
    if(session.mode==='mastery'&&session.index===10)finishPractice();else practicePage();
  }));
  if(session.mode==='free')add(document.querySelector('#practiceActions'),button('Ljúka æfingu',finishFree,'secondary'));
}

practicePage=function(){
  let q=session.tasks[session.index],n=session.index,free=session.mode==='free';
  if(!q){q=generated(session.i);session.tasks[session.index]=q;saveActive()}
  const skill=q.skill?`<span class="skill-label">Æfð færni: ${safe(q.skill)}</span>`:'';
  const work=q.workMode==='steps'&&Array.isArray(q.steps);
  const workHtml=work?`<div class="work-area" aria-label="Reiknaðu dæmið niður">${q.steps.map((s,idx)=>`<label class="work-row"><span>${safe(s.label)}</span><span class="work-input-wrap">${safe(s.prefix||'')}<input inputmode="text" autocomplete="off" data-work-step="${idx}" aria-label="Skref ${idx+1}"></span></label>`).join('')}<button id="checkWork" class="primary" type="button">Athuga skrefin</button></div>`:'';
  show(`<section class="card"><span class="pill">Stig ${session.i+1} · ${free?'Frjáls æfing':'Æfing'}</span><h1>${safe(units[session.i].name)}</h1>${skill}<p class="question-number">Dæmi ${n+1}${free?'':' af 10'} · Rétt í fyrstu tilraun: ${session.correct}</p>${free?'<p>Æfðu eins lengi og þú vilt. Ný dæmi koma áfram þar til þú lýkur æfingunni.</p>':`<div class="progress"><span style="width:${n*10}%"></span></div>`}<div class="math">${safe(q.prompt)}</div>${q.graph||''}<p class="muted small">${work?'Reiknaðu niður línu fyrir línu. Þú getur fengið vísbendingu ef þú þarft.':'Veldu svarið. Þú getur fengið vísbendingu ef þú þarft.'}</p>${work?workHtml:'<div class="options" id="practiceOptions"></div>'}<div class="row" id="practiceActions"></div><div id="feedback" aria-live="polite"></div></section>`);
  if(work){
    document.querySelector('#checkWork').addEventListener('click',checkStepWork);
    const first=document.querySelector('[data-work-step]');if(first)first.focus();
  }else{
    const box=document.querySelector('#practiceOptions');
    q.options.forEach(v=>add(box,button(v,()=>answerPractice(v),'option')));
  }
  add(document.querySelector('#practiceActions'),button('Vísbending',()=>{
    session.hints++;
    const h=getHint(q);
    saveActive();
    document.querySelector('#feedback').innerHTML=`<div class="feedback try"><strong>Vísbending ${h.level} af ${h.total}</strong><br>${safe(h.text)}</div>`;
  },'secondary'));
  if(free)add(document.querySelector('#practiceActions'),button('Ljúka æfingu',finishFree,'secondary'));
};

const baseTeacher=teacher;
teacher=function(){
  baseTeacher();
  const records=Object.values(db.students);
  if(!records.length)return;
  const skills=[...new Set(records.flatMap(s=>Object.keys(s.skillStats||{})))];
  if(!skills.length)return;
  const section=document.createElement('section');
  section.className='card table-wrap';
  const status=(stat)=>{
    if(!stat||stat.total<2)return '<span class="status-dot status-none">—</span>';
    const pct=stat.correct/stat.total;
    if(pct>=.8)return `<span class="status-dot status-good" title="${stat.correct}/${stat.total}">●</span>`;
    if(pct>=.5)return `<span class="status-dot status-mid" title="${stat.correct}/${stat.total}">●</span>`;
    return `<span class="status-dot status-low" title="${stat.correct}/${stat.total}">●</span>`;
  };
  section.innerHTML=`<h2>Hæfnikort – jöfnur</h2><p class="small muted">Grænt = ≥80% rétt í fyrstu tilraun, gult = 50–79%, rautt = undir 50%. Smelltu eða haltu yfir punkti til að sjá rétt/heild.</p><table><thead><tr><th>Nemandi</th>${skills.map(k=>`<th>${safe(k)}</th>`).join('')}</tr></thead><tbody>${records.map(s=>`<tr><td>${safe(s.name)}</td>${skills.map(k=>`<td>${status(s.skillStats?.[k])}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  app.append(section);

  const errorRows=[];
  records.forEach(s=>Object.entries(s.skillStats||{}).forEach(([skill,stat])=>Object.entries(stat.errors||{}).forEach(([err,count])=>errorRows.push({name:s.name,skill,err,count}))));
  if(errorRows.length){
    const err=document.createElement('section');err.className='card';
    err.innerHTML=`<h2>Algeng mistök</h2><div class="error-list">${errorRows.sort((a,b)=>b.count-a.count).slice(0,12).map(r=>`<p><strong>${safe(r.name)}</strong> · ${safe(r.skill)}: ${safe(r.err)} <span class="muted">(${r.count}×)</span></p>`).join('')}</div>`;
    app.append(err);
  }
};
