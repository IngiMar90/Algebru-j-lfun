'use strict';

// Phase 3: concepts that are easier to understand visually get a matching visual model.

function v3NumberLine(start,move){
  const end=start+move,min=-6,max=6,x=v=>42+(v-min)*28;
  const ticks=Array.from({length:max-min+1},(_,k)=>{const v=min+k,p=x(v);return `<line x1="${p}" y1="55" x2="${p}" y2="67" stroke="#526d82"/><text x="${p}" y="84" text-anchor="middle" font-size="11" fill="#526d82">${v}</text>`}).join('');
  return `<svg class="visual-svg" viewBox="0 0 420 110" role="img" aria-label="Talnalína frá ${start} til ${end}"><line x1="42" y1="61" x2="378" y2="61" stroke="#123c60" stroke-width="3"/>${ticks}<circle cx="${x(start)}" cy="61" r="7" fill="#d76b30"/><circle cx="${x(end)}" cy="61" r="7" fill="#16a07b"/><line x1="${x(start)}" y1="32" x2="${x(end)}" y2="32" stroke="#d76b30" stroke-width="3"/><polygon points="${x(end)},32 ${x(end)-(move>=0?9:-9)},26 ${x(end)-(move>=0?9:-9)},38" fill="#d76b30"/><text x="${x(start)}" y="20" text-anchor="middle" font-size="11">byrjun</text><text x="${x(end)}" y="20" text-anchor="middle" font-size="11">niðurstaða</text></svg>`;
}

function v3FractionBar(on,total){return `<div class="fraction-bar" aria-label="${on} af ${total} hlutum litaðir">${Array.from({length:total},(_,i)=>`<span class="fraction-cell ${i<on?'on':''}"></span>`).join('')}</div>`}

function v3LikeTerms(){
  const tiles=n=>Array.from({length:n},()=>'<span class="x-tile">x</span>').join('');
  return `<div class="concept-visual"><h3>Sjáðu eins liði</h3><div class="visual-card"><div class="x-tiles">${tiles(3)}<span class="plus-symbol">+</span>${tiles(2)}<span class="equals-symbol">=</span>${tiles(5)}</div><p class="visual-note"><strong>3x + 2x = 5x.</strong> Þú ert að leggja saman þrjá x-hluti og tvo x-hluti. Venjuleg tala, eins og +4, er ekki x-hlutur og helst því sér.</p></div></div>`;
}

function v3CoordinatePlane(){
  const x=v=>180+v*27,y=v=>180-v*27;
  const grid=Array.from({length:11},(_,i)=>{const p=45+i*27;return `<line x1="${p}" y1="45" x2="${p}" y2="315" stroke="#e5eef4"/><line x1="45" y1="${p}" x2="315" y2="${p}" stroke="#e5eef4"/>`}).join('');
  const nums=[-5,-4,-3,-2,-1,1,2,3,4,5].map(v=>`<text x="${x(v)}" y="198" text-anchor="middle" font-size="10" fill="#526d82">${v}</text><text x="168" y="${y(v)+4}" text-anchor="end" font-size="10" fill="#526d82">${v}</text>`).join('');
  return `<div class="concept-visual"><h3>Hnitakerfið myndrænt</h3><div class="visual-grid"><div class="visual-card"><svg class="visual-svg" viewBox="0 0 360 360" role="img" aria-label="Hnitakerfi með punktunum 3,2 og mínus 2,1">${grid}<line x1="45" y1="180" x2="315" y2="180" stroke="#123c60" stroke-width="2"/><line x1="180" y1="45" x2="180" y2="315" stroke="#123c60" stroke-width="2"/>${nums}<text x="322" y="174" class="axis-label">x</text><text x="188" y="48" class="axis-label">y</text><circle cx="${x(3)}" cy="${y(2)}" r="7" fill="#d76b30"/><text x="${x(3)+10}" y="${y(2)-9}" class="point-label">(3, 2)</text><circle cx="${x(-2)}" cy="${y(1)}" r="7" fill="#16a07b"/><text x="${x(-2)-8}" y="${y(1)-10}" text-anchor="end" class="point-label">(−2, 1)</text></svg></div><div class="visual-card"><h4>Hvernig les ég punkt?</h4><p><strong>(3, 2)</strong></p><p>1. Fyrri talan er <strong>x</strong>: farðu 3 til hægri.</p><p>2. Seinni talan er <strong>y</strong>: farðu 2 upp.</p><p><strong>(−2, 1)</strong></p><p>Farðu fyrst 2 til vinstri og síðan 1 upp.</p><p class="visual-note">Mundu: <strong>x fyrst, y svo.</strong></p></div></div></div>`;
}

function v3LineExample(a,b){
  return `<div class="concept-visual"><h3>Línan myndrænt</h3><div class="visual-grid"><div class="visual-card">${graph(a,b)}</div><div class="visual-card"><h4>y = ${a}x ${b<0?'− '+Math.abs(b):'+ '+b}</h4><p><strong>${a}</strong> er hallatalan. Hún segir hversu mikið y breytist þegar x færist um 1.</p><p><strong>${b}</strong> er skurðpunkturinn við y-ásinn, því þegar x = 0 er y = ${b}.</p><p class="visual-note">Fylgdu línunni frá skurðpunktinum og skoðaðu hvernig hún hækkar eða lækkar.</p></div></div></div>`;
}

function v3Rectangle(kind){
  const area=kind==='area';
  return `<div class="concept-visual"><h3>Formúlan myndrænt</h3><div class="visual-card"><div class="shape-box"><span class="top-label">l = 5</span><span class="side-label">b = 3</span><span class="inside-label">${area?'A = l × b':'P = 2l + 2b'}</span></div><p class="visual-note">${area?'Flatarmál er plássið inni í rétthyrningnum: 5 × 3 = 15.':'Ummál er leiðin allan hringinn utan um formið: 5 + 3 + 5 + 3 = 16.'}</p></div></div>`;
}

function v3Multiplication(){return `<div class="concept-visual"><h3>Margföldun sem hópar</h3><div class="visual-card"><div class="x-tiles"><span class="x-tile">●●●</span><span class="x-tile">●●●</span><span class="x-tile">●●●</span><span class="x-tile">●●●</span></div><p class="visual-note"><strong>4 × 3 = 12</strong>: fjórir jafnstórir hópar og þrír í hverjum hópi.</p></div></div>`}

function v3VisualForUnit(i){
  if(i===1)return v3Multiplication();
  if(i===2)return `<div class="concept-visual"><h3>Neikvæðar tölur á talnalínu</h3><div class="visual-grid"><div class="visual-card"><h4>−3 + 5 = 2</h4>${v3NumberLine(-3,5)}</div><div class="visual-card"><h4>2 − 5 = −3</h4>${v3NumberLine(2,-5)}</div></div></div>`;
  if(i===4)return `<div class="concept-visual"><h3>Brot myndrænt</h3><div class="visual-grid"><div class="visual-card"><h4>1/4 af 20</h4>${v3FractionBar(1,4)}<p class="visual-note">20 skipt í 4 jafna hluta gefur 5 í hverjum hluta. Því er 1/4 af 20 = 5.</p></div><div class="visual-card"><h4>3/4 af 20</h4>${v3FractionBar(3,4)}<p class="visual-note">Þrír af fjórum hlutum: 3 × 5 = 15.</p></div></div></div>`;
  if(i===5)return `<div class="concept-visual"><h3>Hvað merkir x?</h3><div class="visual-card"><div class="x-tiles"><span class="x-tile">x</span><span class="equals-symbol">=</span><span class="x-tile">4</span></div><div class="x-tiles"><span class="x-tile">x</span><span class="x-tile">x</span><span class="equals-symbol">=</span><span class="x-tile">8</span></div><p class="visual-note">Ef x = 4, þá merkir 2x tvo eins x-hluti: 4 + 4 = 8.</p></div></div>`;
  if(i===6)return v3LikeTerms();
  if(i===10)return v3Rectangle('perimeter');
  if(i===11)return v3Rectangle('area');
  if(i===12)return v3CoordinatePlane();
  if(i===13)return v3LineExample(2,3);
  if(i===14)return v3LineExample(2,3);
  if(i===15)return v3LineExample(3,2);
  return '';
}

function v3InjectVisual(where){
  if(!session)return;
  const html=v3VisualForUnit(session.i);
  if(!html||document.querySelector('.phase3-visual'))return;
  const target=where==='lesson'?document.querySelector('.lead'):document.querySelector('.example');
  if(!target)return;
  const wrap=document.createElement('div');wrap.className='phase3-visual';wrap.innerHTML=html;target.insertAdjacentElement('afterend',wrap);
}

const v3LessonPage=lessonPage;
lessonPage=function(){v3LessonPage();v3InjectVisual('lesson')};

const v3ExamplesPage=examplesPage;
examplesPage=function(){v3ExamplesPage();v3InjectVisual('examples')};
