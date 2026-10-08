const yearsGrid=document.getElementById('yearsGrid');
const yearNames=['الأولى','الثانية','الثالثة','الرابعة'];
const firstYearSubjects={
  1:['مبادئ الاقتصاد','إدارة الأعمال','مبادئ القانون','محاسبة مالية','لغة إنجليزية (1)'],
  2:[]
};
let selectedYear=1;
yearNames.forEach((name,i)=>{yearsGrid.innerHTML+=`<button class="year-card" data-year="${i+1}"><span class="num">0${i+1}</span><span class="ico">🎓</span><h3>الفرقة ${name}</h3><p>قسم نظم المعلومات</p><b>ترمان دراسيان ←</b></button>`});
document.querySelectorAll('.year-card').forEach(c=>c.onclick=()=>{
  selectedYear=+c.dataset.year;
  document.getElementById('selectedYearLabel').textContent='الفرقة '+yearNames[selectedYear-1];
  const subjects=document.getElementById('subjects');
  subjects.classList.add('hidden');
  document.getElementById('termPanel').classList.remove('hidden');
  document.querySelector('.terms').classList.toggle('hidden',selectedYear!==1);
  if(selectedYear!==1){
    subjects.innerHTML=`<div class="empty-card"><div>🚧</div><h3>المحتوى سيُضاف قريبًا</h3><p>خانة الفرقة ${yearNames[selectedYear-1]} موجودة وجاهزة، وسيتم إضافة المواد لاحقًا.</p></div>`;
    subjects.classList.remove('hidden');
  }
  document.getElementById('termPanel').scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('.term-card').forEach(c=>c.onclick=()=>{
  const t=c.dataset.term;
  const subjects=document.getElementById('subjects');
  if(t==='2'){
    subjects.innerHTML='<div class="empty-card"><div>🚧</div><h3>سيتم إضافة مواد الترم الثاني قريبًا</h3><p>مواد الفرقة الأولى للترم الثاني غير مضافة حاليًا.</p></div>';
    subjects.classList.remove('hidden');
    return;
  }
  subjects.innerHTML='<h3>مقررات الترم الأول</h3>'+firstYearSubjects[1].map(x=>`<div class="subject-row"><i>📘</i><b>${x}</b><button class="open-subject" data-subject="${x}">فتح المادة</button></div>`).join('');
  subjects.classList.remove('hidden');
  subjects.querySelectorAll('.open-subject').forEach(btn=>btn.onclick=()=>{
    const subject=btn.dataset.subject;
    if(subject==='محاسبة مالية'){
      window.location.href='course.html?subject=accounting';
    }else{
      alert('سيتم إضافة محتوى هذه المادة قريبًا');
    }
  });
});
document.getElementById('closePanel').onclick=()=>document.getElementById('termPanel').classList.add('hidden');
document.getElementById('menuBtn').onclick=()=>document.getElementById('nav').classList.toggle('open');
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('obis-theme',document.body.classList.contains('dark')?'dark':'light')};
if(localStorage.getItem('obis-theme')==='dark')document.body.classList.add('dark');
const form=document.getElementById('scheduleForm'),list=document.getElementById('scheduleList');
let items=JSON.parse(localStorage.getItem('obis-schedule')||'[]');
function render(){list.innerHTML=items.length?items.map((x,i)=>`<div class="schedule-item"><span>🕒</span><b>${x.subject}</b><span>${x.day}</span><span>${x.time}</span><button class="delete" onclick="removeItem(${i})">حذف</button></div>`).join(''):'<div class="empty-card"><p>جدولك فارغ حاليًا.</p></div>'}
window.removeItem=i=>{items.splice(i,1);localStorage.setItem('obis-schedule',JSON.stringify(items));render()};
form.onsubmit=e=>{e.preventDefault();items.push({subject:subjectInput.value,day:dayInput.value,time:timeInput.value});localStorage.setItem('obis-schedule',JSON.stringify(items));form.reset();render()};
render();document.getElementById('yearNow').textContent=new Date().getFullYear();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
