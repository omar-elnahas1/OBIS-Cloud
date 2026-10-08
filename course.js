const tabs=['المحاضرات','تسجيلات المحاضرة','السكاشن','مصادر خارجية','التكليفات','حلول التكليفات','امتحانات ومراجعات','ملخصات'];
const courseTabs=document.getElementById('courseTabs');
const courseContent=document.getElementById('courseContent');
function showTab(index){
  document.querySelectorAll('.course-tab').forEach((x,i)=>x.classList.toggle('active',i===index));
  if(index===0){
    courseContent.innerHTML=`<article class="file-card"><div class="file-icon">📄</div><div class="file-info"><h3>شرح المحاضرة الأولى والثانية</h3><p>PDF • محاسبة مالية • 18 صفحة</p></div><div class="file-actions"><a class="view-file" target="_blank" rel="noopener" href="شامل محاضره اولى وتانيه محاسبه.pdf">عرض الملف</a><a class="download-file" download href="شامل محاضره اولى وتانيه محاسبه.pdf">تحميل</a></div></article>`;
  }else if(index===1){
    courseContent.innerHTML=`<article class="file-card"><div class="file-icon">🎬</div><div class="file-info"><h3>فيديو شرح المحاضرة الأولى والثانية</h3><p>تسجيل محاضرة • Google Drive</p></div><div class="file-actions"><a class="view-file" target="_blank" rel="noopener" href="https://drive.google.com/file/d/1QeWpXmAEw37YrDhCkZsCNKKh7tJFC-vK/view?usp=sharing">مشاهدة الفيديو</a></div></article>`;
  }else{
    courseContent.innerHTML=`<div class="empty-course"><div style="font-size:44px">📂</div><h3>لا توجد مواد بعد.</h3></div>`;
  }
}
courseTabs.innerHTML=tabs.map((x,i)=>`<button class="course-tab ${i===0?'active':''}" data-i="${i}">${x}</button>`).join('');
document.querySelectorAll('.course-tab').forEach(x=>x.onclick=()=>showTab(+x.dataset.i));showTab(0);
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('obis-theme',document.body.classList.contains('dark')?'dark':'light')};if(localStorage.getItem('obis-theme')==='dark')document.body.classList.add('dark');
document.getElementById('menuBtn').onclick=()=>document.getElementById('nav').classList.toggle('open');
document.getElementById('shareBtn').onclick=async()=>{const data={title:'محاسبة مالية | OBIS Cloud',url:location.href};if(navigator.share){await navigator.share(data).catch(()=>{});}else{await navigator.clipboard.writeText(location.href);alert('تم نسخ رابط المادة');}};
document.getElementById('offlineBtn').onclick=()=>{alert('سيتم حفظ ملفات الصفحة الأساسية تلقائيًا بعد أول زيارة. حمّل ملف المحاضرة للاحتفاظ به على جهازك.');};
