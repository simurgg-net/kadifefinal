function v2ToggleChat(){const box=document.getElementById('v2Chat'),body=document.getElementById('v2ChatBody'),btn=document.getElementById('v2ChatToggle');if(!box||!body||!btn)return;const open=body.hidden;body.hidden=!open;box.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));if(open){const input=document.getElementById('v2ChatInput');if(input)input.focus();}}
function v2SendChat(e){e.preventDefault();const input=document.getElementById('v2ChatInput'),list=document.getElementById('v2ChatMessages');if(!input||!list||!input.value.trim())return;const empty=list.querySelector('.v2-chat-empty');if(empty)empty.remove();const msg=document.createElement('div');msg.className='v2-chat-msg';const body=document.createElement('span');body.textContent=input.value.trim();const time=document.createElement('time');time.textContent=new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'});msg.append(body,time);list.appendChild(msg);list.scrollTop=list.scrollHeight;input.value='';}


// Skor tablosu daima görünür; ayrıntılı oyuncu bilgileri isteğe bağlı açılır.
window.v2PlayerPanelOpen = window.v2PlayerPanelOpen ?? false;
function v2TogglePlayers(){
  window.v2PlayerPanelOpen = !window.v2PlayerPanelOpen;
  const panel=document.getElementById('v2PlayerDetails');
  const btn=document.getElementById('v2PlayerToggle');
  if(panel) panel.hidden=!window.v2PlayerPanelOpen;
  if(btn){btn.setAttribute('aria-expanded',String(window.v2PlayerPanelOpen));const caret=btn.querySelector('.v2-player-caret');if(caret)caret.textContent=window.v2PlayerPanelOpen?'⌃':'⌄';}
}
function v2RenderPlayers(players,state,lobby,me){
  const root=document.getElementById('pl'); if(!root)return;
  const open=!!window.v2PlayerPanelOpen;
  const resourceNames={wood:'Odun',brick:'Tuğla',sheep:'Koyun',wheat:'Buğday',ore:'Maden'};
  const resourceIcons={wood:'🪵',brick:'🧱',sheep:'🐑',wheat:'🌾',ore:'⛰️'};
  const scores=players.map((p,i)=>`<div class="pl ${!lobby&&i===state.turn?'cur':''}"><i class="dot" style="background:${p.col}"></i><span class="v2-player-name">${p.name}${i===me?' (sen)':''}${p.hasDice?' 🎲':''}</span><span class="v2-player-score">👑 ${p.vp} · 🛣️ ${p.road}${p.longest?' ⭐':''} · 🃏 ${p.n}</span></div>`).join('');
  const details=players.map((p,i)=>{
    const resources=Object.keys(resourceNames).map(k=>`<span class="v2-resource-pill" title="${resourceNames[k]}">${resourceIcons[k]} ${p.res?.[k]||0}</span>`).join('');
    return `<div class="v2-player-detail"><div class="v2-detail-name"><i class="dot" style="background:${p.col}"></i>${p.name}${i===me?' · SEN':''}</div><div class="v2-detail-resources">${resources}</div><div class="v2-detail-meta">Gelişim kartı: <b>${p.n||0}</b> <span>Şövalye: <b>${p.knights||0}</b></span></div></div>`;
  }).join('');
  root.innerHTML=`<section class="v2-player-panel" aria-label="Oyuncu paneli"><div class="v2-scoreboard"><div class="v2-score-title">🏆 SKOR TABLOSU</div>${scores||'<small>Oyuncular katıldığında skorlar burada görünecek.</small>'}</div><button id="v2PlayerToggle" class="v2-player-toggle" type="button" aria-expanded="${open}" aria-controls="v2PlayerDetails" onclick="v2TogglePlayers()"><span>OYUNCU AYRINTILARI</span><span class="v2-player-caret">${open?'⌃':'⌄'}</span></button><div id="v2PlayerDetails" class="v2-player-details" ${open?'':'hidden'}>${details||'<small>Henüz oyuncu yok.</small>'}</div></section>`;
}
