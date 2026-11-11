/* Milton Lens chart page renderer.
   A page sets window.CHART = {title, kicker, subtitle, type:'waterfall'|'stacked'|'line', unit, ...}
   and includes this script after Chart.js. */
(function(){
  const C = window.CHART, P = {navy:'#0E2340', gold:'#B8A57A', grey:'#9AA0A6', red:'#8B2E2E', light:'#D9DCE1'};
  const fmt = v => (C.unitPrefix||'') + Number(v).toLocaleString('en-US',{minimumFractionDigits:C.decimals??2,maximumFractionDigits:C.decimals??2}) + (C.unitSuffix||'');
  document.title = C.title + ' | Milton Lens charts';
  const el = id => document.getElementById(id);
  el('kicker').textContent = C.kicker || '';
  el('title').textContent = C.title;
  el('subtitle').textContent = C.subtitle || '';
  let cfg;
  if (C.type === 'waterfall') {
    let run = 0; const bars = [], colors = [];
    C.steps.forEach(s => {
      if (s.kind === 'total') { bars.push([0, s.value]); colors.push(s.color ? P[s.color] : P.navy); run = s.value; }
      else { const a = run, b = run + s.value; bars.push([Math.min(a,b), Math.max(a,b)]); colors.push(s.value < 0 ? (s.color ? P[s.color] : P.grey) : P.gold); run = b; }
    });
    cfg = {type:'bar', data:{labels:C.steps.map(s=>s.label), datasets:[{data:bars, backgroundColor:colors, borderWidth:0, barPercentage:.8}]},
      options:{maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{callbacks:{label:ctx=>{const s=C.steps[ctx.dataIndex]; return (s.kind==='total'?'':(s.value>0?'+':''))+fmt(s.value);}}}},
        scales:{y:{beginAtZero:true, title:{display:true,text:C.yLabel||''}, grid:{color:'#eee'}}, x:{grid:{display:false}, ticks:{autoSkip:false, maxRotation:0, callback:function(v){const l=this.getLabelForValue(v); return l.length>14? l.split(' ').reduce((acc,w)=>{const last=acc[acc.length-1]; if(last && (last+' '+w).length<=14) acc[acc.length-1]=last+' '+w; else acc.push(w); return acc;},[]) : l;}}}}}};
  } else if (C.type === 'stacked' || C.type === 'line') {
    cfg = {type: C.type==='stacked'?'bar':'line', data:{labels:C.labels, datasets:C.series.map(s=>({label:s.name, data:s.values, backgroundColor:P[s.color]||s.color, borderColor:P[s.color]||s.color, borderWidth: C.type==='line'?2:0, pointRadius: C.type==='line'?2:0, tension:.15}))},
      options:{maintainAspectRatio:false, interaction:{mode:'index', intersect:false}, plugins:{legend:{position:'bottom'}, tooltip:{callbacks:{label:ctx=>ctx.dataset.label+': '+fmt(ctx.parsed.y)}}},
        scales:{x:{stacked:C.type==='stacked', grid:{display:false}}, y:{stacked:C.type==='stacked', beginAtZero:true, title:{display:true,text:C.yLabel||''}, grid:{color:'#eee'}}}}};
  }
  new Chart(el('chart'), cfg);
  // data table + CSV
  const rows = C.table.rows, head = C.table.columns;
  el('table').innerHTML = '<thead><tr>' + head.map((h,i)=>`<th class="${i?'num':''}">${h}</th>`).join('') + '</tr></thead><tbody>' +
    rows.map(r=>'<tr>'+r.map((c,i)=>`<td class="${i?'num':''}">${c}</td>`).join('')+'</tr>').join('') + '</tbody>';
  const csv = [head, ...rows].map(r => r.map(c => /[",]/.test(String(c)) ? '"'+String(c).replace(/"/g,'""')+'"' : c).join(',')).join('\n');
  const a = el('csv'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = (C.slug||'chart') + '.csv';
  el('notes').innerHTML = (C.notes||[]).map(n=>`<p>${n}</p>`).join('');
  el('sources').innerHTML = (C.sources||[]).map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>${s.detail?' — '+s.detail:''}</li>`).join('');
  if (C.article) el('article').innerHTML = `From the Milton Lens article <a href="${C.article.url}">${C.article.title}</a>.`;
  el('updated').textContent = C.updated ? 'Data as of ' + C.updated + '.' : '';
})();
