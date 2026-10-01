'use strict';

// Phase 4: coordinate work should be visual and authentic: read a point or plot a point.

function v4CoordSvg(px=null,py=null,interactive=false){
  const x=v=>180+v*27,y=v=>180-v*27;
  const grid=Array.from({length:11},(_,i)=>{const p=45+i*27;return `<line x1="${p}" y1="45" x2="${p}" y2="315" stroke="#e5eef4"/><line x1="45" y1="${p}" x2="315" y2="${p}" stroke="#e5eef4"/>`}).join('');
  const nums=[-5,-4,-3,-2,-1,1,2,3,4,5].map(v=>`<text x="${x(v)}" y="198" text-anchor="middle" class="coordinate-number">${v}</text><text x="168" y="${y(v)+4}" text-anchor="end" class="coordinate-number">${v}</text>`).join('');
  const hits=interactive?Array.from({length:11},(_,ix)=>Array.from({length:11},(_,iy)=>{const vx=ix-5,vy=5-iy;return `<circle class="coordinate-hit" tabindex="0" role="button" aria-label="Punktur ${vx}, ${vy}" data-cx="${vx}" data-cy="${vy}" cx="${x(vx)}" cy="${y(vy)}" r="11"/>`}).join('')).join(''):'';
  const point=px===null?'':`<circle class="coordinate-target" cx="${x(px)}" cy="${y(py)}" r="8"/>`;
  return `<svg class="${interactive?'coordinate-board':'coordinate-read-graph'}" viewBox="0 0 360 360" role="img" aria-label="Hnitakerfi"><rect x="45" y="45" width="270" height="270" fill="#fff"/>${grid}<line x1="45" y1="180" x2="315" y2="180" stroke="#123c60" stroke-width="2"/><line x1="180" y1="45" x2="180" y2="315" stroke="#123c60" stroke-width="2"/>${nums}<text x="322" y="174" class="coordinate-axis-label">x</text><text x="188" y="48" class="coordinate-axis-label">y</text>${point}${hits}<g id="coordinateSelection"></g></svg>`;
}

function v4WrongCoords(x,y){
  const candidates=[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`,`(${x+(x<5?1:-1)}, ${y})`,`(${x}, ${y+(y<5?1:-1)})`];
  return [...new Set(candidates.filter(v=>v!==`(${x}, ${y})`))].slice(0,3);
}

units[12].intro='Hnit segja nákvæmlega hvar punktur er í hnitakerfi. Fyrri talan er x-hnit og seinni talan er y-hnit. Mikilvægast er að geta bæði lesið hnit af punkti og merkt punkt rétt út frá gefnum hnitum.';
units[12].example=[
  'Ef punktur er merktur á x = 3 og y = 2 eru hnit hans (3, 2).',
  'Ef þú færð hnitin (−2, 4), finnurðu fyrst −2 á x-ás og síðan 4 á y-ás og merkir punktinn þar.'
];
units[12].make=function(){
  let x=rand(-5,5),y=rand(-5,5);if(x===0&&y===0)x=2;
  const answer=`(${x}, ${y})`;
  if(Math.random()<.5){
    return task('Hvaða hnit hefur punkturinn sem er merktur á hnitakerfið?',answer,v4WrongCoords(x,y),`Punkturinn er á x = ${x} og y = ${y}. Því eru hnitin ${answer}.`,{
      skill:'Les hnit af punkti',
      graph:v4CoordSvg(x,y,false),
      hints:['Lestu alltaf x-hnitið fyrst og y-hnitið svo.','Finndu fyrst hvar punkturinn er miðað við x-ásinn. Skoðaðu síðan y-ásinn.',`Punkturinn er á x = ${x} og y = ${y}.`],
      misconceptions:{[`(${y}, ${x})`]:'Víxlaði x- og y-hnitum.',[`(${-x}, ${y})`]:'Ruglaði formerki x-hnits.',[`(${x}, ${-y})`]:'Ruglaði formerki y-hnits.'}
    });
  }
  return task(`Merktu punktinn ${answer} á hnitakerfið.`,answer,v4WrongCoords(x,y),`Rétti staðurinn er þar sem x = ${x} og y = ${y}.`,{
    skill:'Merkir punkt út frá hnitum',
    coordinateMode:'plot',targetX:x,targetY:y,
    hints:['Fyrri talan segir hvar þú ert á x-ásnum. Seinni talan segir hvar þú ert á y-ásnum.',`Finndu fyrst x = ${x}. Farðu síðan lóðrétt þar til þú ert á y = ${y}.`,`Rétti punkturinn er ${answer}.`],
    misconceptions:{'Rangur punktur':'Merkti punkt á röngum stað í hnitakerfinu.'}
  });
};

function v4AdvanceCoordinate(q,firstTry){
  if(firstTry)session.correct++;
  updateSkillStat(q,firstTry,(q.hintLevel||0)>0,q.hadCoordinateError?'Rangur punktur':null);
  session.index++;
  if(session.mode==='free'){
    session.tasks=[generated(session.i)];session.index=0;session.answered=(session.answered||0)+1;
  }
  saveActive();
  const actions=document.querySelector('#practiceActions');actions.innerHTML='';
  add(actions,button(session.mode==='mastery'&&session.index===10?'Sjá niðurstöðu':'Næsta dæmi',()=>{
    if(session.mode==='mastery'&&session.index===10)finishPractice();else practicePage();
  }));
  if(session.mode==='free')add(actions,button('Ljúka æfingu',finishFree,'secondary'));
}

function v4CoordinatePracticePage(q,n,free){
  show(`<section class="card"><span class="pill">Stig ${session.i+1} · ${free?'Frjáls æfing':'Æfing'}</span><h1>${safe(units[session.i].name)}</h1><span class="skill-label">Æfð færni: ${safe(q.skill)}</span><p class="question-number">Dæmi ${n+1}${free?'':' af 10'} · Rétt í fyrstu tilraun: ${session.correct}</p>${free?'<p>Æfðu eins lengi og þú vilt.</p>':`<div class="progress"><span style="width:${n*10}%"></span></div>`}<div class="math">${safe(q.prompt)}</div><div class="coordinate-task"><p class="coordinate-instruction">Smelltu á þann stað þar sem punkturinn á að vera.</p><div class="coordinate-board-wrap">${v4CoordSvg(null,null,true)}</div><p class="coordinate-choice">Valinn punktur: <strong id="coordChoice">enginn</strong></p><p class="coordinate-help">Mundu: fyrri talan er x, seinni talan er y.</p></div><div class="row" id="practiceActions"></div><div id="feedback" aria-live="polite"></div></section>`);
  let selected=null;
  const svg=document.querySelector('.coordinate-board');
  const choose=(el)=>{
    const cx=Number(el.dataset.cx),cy=Number(el.dataset.cy);selected={x:cx,y:cy};
    document.querySelector('#coordChoice').textContent=`(${cx}, ${cy})`;
    const x=v=>180+v*27,y=v=>180-v*27;
    document.querySelector('#coordinateSelection').innerHTML=`<circle class="coordinate-selected" cx="${x(cx)}" cy="${y(cy)}" r="8"/>`;
  };
  svg.querySelectorAll('.coordinate-hit').forEach(el=>{
    el.addEventListener('click',()=>choose(el));
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(el)}});
  });
  add(document.querySelector('#practiceActions'),button('Athuga punkt',()=>{
    if(!selected){document.querySelector('#feedback').innerHTML='<div class="feedback try">Veldu fyrst punkt á hnitakerfinu.</div>';return;}
    const ok=selected.x===q.targetX&&selected.y===q.targetY;
    if(!ok){q.hadCoordinateError=true;saveActive();document.querySelector('#feedback').innerHTML='<div class="feedback try"><strong>Ekki alveg.</strong><br>Skoðaðu x-hnitið fyrst og y-hnitið síðan. Prófaðu aftur eða notaðu vísbendingu.</div>';return;}
    const firstTry=!q.hadCoordinateError;
    svg.querySelectorAll('.coordinate-hit').forEach(el=>{el.style.pointerEvents='none';el.setAttribute('tabindex','-1')});
    document.querySelector('#feedback').innerHTML=`<div class="feedback good"><strong>${firstTry?'Rétt!':'Núna er punkturinn réttur.'}</strong><br>${safe(q.why)}</div>`;
    v4AdvanceCoordinate(q,firstTry);
  }),button('Vísbending',()=>{
    session.hints++;const h=getHint(q);saveActive();document.querySelector('#feedback').innerHTML=`<div class="feedback try"><strong>Vísbending ${h.level} af ${h.total}</strong><br>${safe(h.text)}</div>`;
  },'secondary'));
  if(free)add(document.querySelector('#practiceActions'),button('Ljúka æfingu',finishFree,'secondary'));
}

const v4PreviousPracticePage=practicePage;
practicePage=function(){
  let q=session.tasks[session.index],n=session.index,free=session.mode==='free';
  if(!q){q=generated(session.i);session.tasks[session.index]=q;saveActive()}
  if(q.coordinateMode==='plot')return v4CoordinatePracticePage(q,n,free);
  return v4PreviousPracticePage();
};
