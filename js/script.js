/* ==================================================================
   NAWA SHALIHAH — BIRTHDAY GIFT — script.js
   Vanilla JS. No frameworks. No backend.
   ================================================================== */
(function(){
  "use strict";

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- LOADER ---------------- */
  window.addEventListener('load', function(){
    setTimeout(function(){
      var loader = document.getElementById('loader');
      if(loader){ loader.classList.add('hidden'); }
      revealHero();
    }, 900);
  });

  function revealHero(){
    document.querySelectorAll('#hero .reveal-line, #hero .reveal-fade, #hero .reveal-word').forEach(function(el, i){
      setTimeout(function(){ el.classList.add('in'); }, 150 * i);
    });
    var moon = document.getElementById('hero-moon');
    if(moon){ setTimeout(function(){ moon.classList.add('risen'); }, 600); }
  }

  /* ---------------- DYNAMIC GREETING ---------------- */
  (function dynamicGreeting(){
    var el = document.getElementById('dynamic-greeting');
    if(!el) return;
    var h = new Date().getHours();
    var msg;
    if(h < 5) msg = "Semoga malammu tenang, Nawa.";
    else if(h < 11) msg = "Selamat pagi, semoga harimu penuh berkah.";
    else if(h < 15) msg = "Selamat siang, semoga Allah mudahkan langkahmu.";
    else if(h < 18) msg = "Selamat sore, semoga hatimu selalu tenang.";
    else msg = "Selamat malam, semoga mimpimu indah.";
    el.textContent = msg;
  })();

  document.getElementById('footer-year').textContent = new Date().getFullYear();

  /* ---------------- SCROLL PROGRESS ---------------- */
  var progressBar = document.getElementById('scroll-progress');
  var backToTop = document.getElementById('back-to-top');
  function onScroll(){
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if(progressBar) progressBar.style.width = pct + '%';
    if(backToTop){
      if(scrollTop > 600) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
    updateTimelineFill();
    updateCursorGlowFallback();
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  backToTop && backToTop.addEventListener('click', function(){
    window.scrollTo({top:0, behavior: reducedMotion ? 'auto' : 'smooth'});
  });

  /* ---------------- CURSOR GLOW ---------------- */
  var glow = document.getElementById('cursor-glow');
  if(glow && !reducedMotion && matchMedia('(hover:hover)').matches){
    document.addEventListener('mousemove', function(e){
      glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });
  } else if(glow){
    glow.style.display = 'none';
  }
  function updateCursorGlowFallback(){}

  /* ---------------- SCROLL REVEAL (IntersectionObserver) ---------------- */
  var revealTargets = document.querySelectorAll('.reveal-fade, .reveal-line, .reveal-word');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    revealTargets.forEach(function(el){
      if(!el.closest('#hero')) io.observe(el);
    });
  } else {
    revealTargets.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------------- HERO STARS ---------------- */
  (function makeStars(container, count){
    if(!container) return;
    for(var i=0;i<count;i++){
      var s = document.createElement('span');
      s.style.left = Math.random()*100 + '%';
      s.style.top = Math.random()*70 + '%';
      s.style.animationDelay = (Math.random()*4) + 's';
      s.style.width = s.style.height = (Math.random()*1.6+1) + 'px';
      container.appendChild(s);
    }
  })(document.getElementById('hero-stars'), 60);

  (function makeStars(container, count){
    if(!container) return;
    for(var i=0;i<count;i++){
      var s = document.createElement('span');
      s.style.left = Math.random()*100 + '%';
      s.style.top = Math.random()*90 + '%';
      s.style.animationDelay = (Math.random()*4) + 's';
      s.style.width = s.style.height = (Math.random()*2+1) + 'px';
      container.appendChild(s);
    }
  })(document.getElementById('closing-stars'), 110);

  /* ---------------- TIMELINE SCROLL FILL + ACTIVE ITEMS ---------------- */
  var timelineFill = document.getElementById('timeline-fill');
  var timelineItems = document.querySelectorAll('.timeline-item');
  var timelineSection = document.getElementById('timeline');
  function updateTimelineFill(){
    if(!timelineSection || !timelineFill) return;
    var rect = timelineSection.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height;
    var scrolled = Math.min(Math.max(vh - rect.top, 0), total);
    var pct = total > 0 ? (scrolled/total)*100 : 0;
    timelineFill.style.height = pct + '%';
  }
  if('IntersectionObserver' in window && timelineItems.length){
    var tio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting) entry.target.classList.add('active');
      });
    }, {threshold:0.4});
    timelineItems.forEach(function(el){ tio.observe(el); });
  } else {
    timelineItems.forEach(function(el){ el.classList.add('active'); });
  }

  /* ==================================================================
     SECTION 3 — DUA GARDEN (15 duas)
     ================================================================== */
  var duas = [
    {ar:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", tr:"Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari siksa neraka."},
    {ar:"رَبِّ زِدْنِي عِلْمًا", tr:"Ya Tuhanku, tambahkanlah ilmu kepadaku."},
    {ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", tr:"Ya Allah, aku memohon kepada-Mu ampunan dan keselamatan."},
    {ar:"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ", tr:"Ya Tuhanku, ampunilah aku dan kedua orang tuaku."},
    {ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا", tr:"Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat."},
    {ar:"رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", tr:"Ya Tuhanku, lapangkanlah dadaku dan mudahkanlah urusanku."},
    {ar:"حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ", tr:"Cukuplah Allah bagi kami, dan Dia sebaik-baik pelindung."},
    {ar:"اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا", tr:"Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan."},
    {ar:"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ", tr:"Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan yang menyejukkan hati."},
    {ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الْخَاتِمَةِ", tr:"Ya Allah, aku memohon kepada-Mu akhir hidup yang baik."},
    {ar:"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", tr:"Ya Tuhanku, tuntunlah aku untuk selalu bersyukur atas nikmat-Mu."},
    {ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ", tr:"Ya Allah, aku memohon kepada-Mu surga."},
    {ar:"رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا", tr:"Ya Tuhan kami, janganlah Engkau condongkan hati kami setelah Engkau beri petunjuk."},
    {ar:"اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي", tr:"Ya Allah, berilah aku petunjuk dan bimbinglah aku ke jalan yang lurus."},
    {ar:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", tr:"Tiada daya dan kekuatan kecuali dengan pertolongan Allah."}
  ];

  var gardenEl = document.getElementById('dua-garden');
  if(gardenEl){
    duas.forEach(function(d, i){
      var flower = document.createElement('button');
      flower.className = 'flower';
      flower.type = 'button';
      flower.setAttribute('aria-label', 'Buka doa ' + (i+1));
      flower.innerHTML = '<span class="bud">🌷</span>';
      flower.addEventListener('click', function(){
        flower.classList.add('bloomed');
        flower.querySelector('.bud').textContent = '🌸';
        openDuaOverlay(d);
      });
      gardenEl.appendChild(flower);
    });
  }

  var duaOverlay;
  function ensureDuaOverlay(){
    if(duaOverlay) return duaOverlay;
    duaOverlay = document.createElement('div');
    duaOverlay.className = 'dua-overlay';
    duaOverlay.innerHTML =
      '<div class="dua-overlay-card">' +
        '<button class="dua-overlay-close" aria-label="Tutup">✕</button>' +
        '<p class="dua-overlay-arabic" dir="rtl"></p>' +
        '<p class="dua-overlay-translation"></p>' +
      '</div>';
    document.body.appendChild(duaOverlay);
    duaOverlay.addEventListener('click', function(e){
      if(e.target === duaOverlay) closeDuaOverlay();
    });
    duaOverlay.querySelector('.dua-overlay-close').addEventListener('click', closeDuaOverlay);
    return duaOverlay;
  }
  function openDuaOverlay(d){
    var ov = ensureDuaOverlay();
    ov.querySelector('.dua-overlay-arabic').textContent = d.ar;
    ov.querySelector('.dua-overlay-translation').textContent = '"' + d.tr + '"';
    ov.classList.add('open');
  }
  function closeDuaOverlay(){ if(duaOverlay) duaOverlay.classList.remove('open'); }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeDuaOverlay(); });

  /* ==================================================================
     SECTION 4 — NIGHT SKY (20 messages)
     ================================================================== */
  var nightMessages = [
    "Kesabaran adalah cahaya yang tak pernah padam.",
    "Setiap kebaikan kecil, sekecil apapun, tidak pernah sia-sia di sisi-Nya.",
    "Hati yang bersyukur akan selalu menemukan alasan untuk bahagia.",
    "Doa adalah senjata orang yang beriman, jangan pernah berhenti berdoa.",
    "Ilmu yang bermanfaat adalah warisan yang tak pernah habis.",
    "Allah tidak membebani seseorang melebihi kesanggupannya.",
    "Senyum yang tulus adalah sedekah yang ringan namun bernilai.",
    "Ketenangan hati datang dari mengingat Allah.",
    "Kesulitan hari ini adalah cara-Nya menempa kita menjadi lebih kuat.",
    "Rezeki tidak akan tertukar, maka jangan pernah lelah berikhtiar.",
    "Silaturahmi melapangkan rezeki dan memanjangkan keberkahan usia.",
    "Setiap langkah menuntut ilmu adalah jalan menuju surga.",
    "Jangan pernah meremehkan doa orang tua untuk anaknya.",
    "Sabar bukan berarti diam, tapi tetap tenang saat berjuang.",
    "Allah selalu dekat dengan hamba yang berbaik sangka kepada-Nya.",
    "Kebahagiaan sejati lahir dari hati yang ikhlas.",
    "Waktu yang hilang tak akan kembali, gunakan sebaik-baiknya dalam kebaikan.",
    "Menjaga lisan adalah bagian dari menjaga iman.",
    "Setiap ujian membawa hikmah yang baru akan terlihat di kemudian hari.",
    "Husnuzhan kepada Allah adalah kunci hati yang damai."
  ];

  var starsField = document.getElementById('interactive-stars');
  var starCard = document.getElementById('star-message-card');
  var starText = document.getElementById('star-message-text');
  var starClose = document.getElementById('star-message-close');

  if(starsField){
    nightMessages.forEach(function(msg, i){
      var star = document.createElement('span');
      star.className = 'interactive-star';
      star.style.left = (4 + (i % 10) * 9.5 + Math.random()*4) + '%';
      star.style.top = (8 + Math.floor(i/10) * 35 + Math.random()*20) + '%';
      star.style.animationDelay = (Math.random()*4) + 's';
      star.setAttribute('role','button');
      star.setAttribute('tabindex','0');
      star.setAttribute('aria-label','Bintang pengingat ' + (i+1));
      function trigger(){
        starText.textContent = msg;
        starCard.classList.add('show');
      }
      star.addEventListener('click', trigger);
      star.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); trigger(); } });
      starsField.appendChild(star);
    });
  }
  starClose && starClose.addEventListener('click', function(){ starCard.classList.remove('show'); });

  /* ==================================================================
     SECTION 5 — 99 NAMES OF ALLAH CAROUSEL
     ================================================================== */
  var names99 = [
    ["الله","Allah","Yang Memiliki Nama Teragung"],["الرَّحْمَٰن","Ar-Rahman","Yang Maha Pengasih"],
    ["الرَّحِيم","Ar-Rahim","Yang Maha Penyayang"],["الْمَلِك","Al-Malik","Yang Maha Merajai"],
    ["الْقُدُّوس","Al-Quddus","Yang Maha Suci"],["السَّلَام","As-Salam","Yang Maha Memberi Kesejahteraan"],
    ["الْمُؤْمِن","Al-Mu'min","Yang Maha Memberi Keamanan"],["الْمُهَيْمِن","Al-Muhaymin","Yang Maha Pemelihara"],
    ["الْعَزِيز","Al-Aziz","Yang Maha Perkasa"],["الْجَبَّار","Al-Jabbar","Yang Maha Kuasa"],
    ["الْمُتَكَبِّر","Al-Mutakabbir","Yang Maha Megah"],["الْخَالِق","Al-Khaliq","Yang Maha Pencipta"],
    ["الْبَارِئ","Al-Bari","Yang Maha Mengadakan"],["الْمُصَوِّر","Al-Musawwir","Yang Maha Membentuk Rupa"],
    ["الْغَفَّار","Al-Ghaffar","Yang Maha Pengampun"],["الْقَهَّار","Al-Qahhar","Yang Maha Menundukkan"],
    ["الْوَهَّاب","Al-Wahhab","Yang Maha Pemberi Karunia"],["الرَّزَّاق","Ar-Razzaq","Yang Maha Pemberi Rezeki"],
    ["الْفَتَّاح","Al-Fattah","Yang Maha Membuka Pintu Rahmat"],["اَلْعَلِيْم","Al-'Alim","Yang Maha Mengetahui"],
    ["الْقَابِض","Al-Qabid","Yang Maha Menyempitkan"],["الْبَاسِط","Al-Basit","Yang Maha Melapangkan"],
    ["الْخَافِض","Al-Khafid","Yang Maha Merendahkan"],["الرَّافِع","Ar-Rafi'","Yang Maha Meninggikan"],
    ["الْمُعِز","Al-Mu'izz","Yang Maha Memuliakan"],["الْمُذِل","Al-Mudzil","Yang Maha Menghinakan"],
    ["السَّمِيع","As-Sami'","Yang Maha Mendengar"],["الْبَصِير","Al-Basir","Yang Maha Melihat"],
    ["الْحَكَم","Al-Hakam","Yang Maha Menetapkan Hukum"],["الْعَدْل","Al-'Adl","Yang Maha Adil"],
    ["اللَّطِيف","Al-Latif","Yang Maha Lembut"],["الْخَبِير","Al-Khabir","Yang Maha Waspada"],
    ["الْحَلِيم","Al-Halim","Yang Maha Penyantun"],["الْعَظِيم","Al-'Azim","Yang Maha Agung"],
    ["الْغَفُور","Al-Ghafur","Yang Maha Pengampun"],["الشَّكُور","Asy-Syakur","Yang Maha Mensyukuri"],
    ["الْعَلِيّ","Al-'Aliyy","Yang Maha Tinggi"],["الْكَبِير","Al-Kabir","Yang Maha Besar"],
    ["الْحَفِيظ","Al-Hafiz","Yang Maha Memelihara"],["الْمُقِيت","Al-Muqit","Yang Maha Pemberi Kecukupan"],
    ["الْحسِيب","Al-Hasib","Yang Maha Membuat Perhitungan"],["الْجَلِيل","Al-Jalil","Yang Maha Mulia"],
    ["الْكَرِيم","Al-Karim","Yang Maha Pemurah"],["الرَّقِيب","Ar-Raqib","Yang Maha Mengawasi"],
    ["الْمُجِيب","Al-Mujib","Yang Maha Mengabulkan"],["الْوَاسِع","Al-Wasi'","Yang Maha Luas"],
    ["الْحَكِيم","Al-Hakim","Yang Maha Bijaksana"],["الْوَدُود","Al-Wadud","Yang Maha Mengasihi"],
    ["الْمَجِيد","Al-Majid","Yang Maha Mulia"],["الْبَاعِث","Al-Ba'its","Yang Maha Membangkitkan"],
    ["الشَّهِيد","Asy-Syahid","Yang Maha Menyaksikan"],["الْحَقّ","Al-Haqq","Yang Maha Benar"],
    ["الْوَكِيل","Al-Wakil","Yang Maha Memelihara Penyerahan"],["الْقَوِيّ","Al-Qawiyy","Yang Maha Kuat"],
    ["الْمَتِين","Al-Matin","Yang Maha Kokoh"],["الْوَلِيّ","Al-Waliyy","Yang Maha Melindungi"],
    ["الْحَمِيد","Al-Hamid","Yang Maha Terpuji"],["الْمُحْصِي","Al-Muhsi","Yang Maha Menghitung"],
    ["الْمُبْدِئ","Al-Mubdi'","Yang Maha Memulai"],["الْمُعِيد","Al-Mu'id","Yang Maha Mengembalikan"],
    ["الْمُحْيِي","Al-Muhyi","Yang Maha Menghidupkan"],["اَلْمُمِيت","Al-Mumit","Yang Maha Mematikan"],
    ["الْحَيّ","Al-Hayy","Yang Maha Hidup"],["الْقَيُّوم","Al-Qayyum","Yang Maha Berdiri Sendiri"],
    ["الْوَاجِد","Al-Wajid","Yang Maha Kaya"],["الْمَاجِد","Al-Majid","Yang Maha Mulia"],
    ["الْواحِد","Al-Wahid","Yang Maha Tunggal"],["اَلاَحَد","Al-Ahad","Yang Maha Esa"],
    ["الصَّمَد","As-Samad","Yang Maha Dibutuhkan"],["الْقَادِر","Al-Qadir","Yang Maha Kuasa"],
    ["الْمُقْتَدِر","Al-Muqtadir","Yang Maha Berkuasa"],["الْمُقَدِّم","Al-Muqaddim","Yang Maha Mendahulukan"],
    ["الْمُؤَخِّر","Al-Mu'akhkhir","Yang Maha Mengakhirkan"],["الأوَّل","Al-Awwal","Yang Maha Awal"],
    ["الآخِر","Al-Akhir","Yang Maha Akhir"],["الظَّاهِر","Az-Zahir","Yang Maha Nyata"],
    ["الْبَاطِن","Al-Batin","Yang Maha Tersembunyi"],["الْوَالِي","Al-Wali","Yang Maha Memerintah"],
    ["الْمُتَعَالِي","Al-Muta'ali","Yang Maha Tinggi"],["الْبَرّ","Al-Barr","Yang Maha Penderma Kebajikan"],
    ["التَّوَّاب","At-Tawwab","Yang Maha Penerima Tobat"],["الْمُنْتَقِم","Al-Muntaqim","Yang Maha Penyiksa"],
    ["الْعَفُوّ","Al-'Afuww","Yang Maha Pemaaf"],["الرَّؤُوف","Ar-Ra'uf","Yang Maha Pengasuh"],
    ["مَالِكُ الْمُلْك","Malikul Mulk","Yang Maha Penguasa Kerajaan"],["ذُوالْجَلَالِ وَالإكْرَام","Dzul Jalali wal Ikram","Yang Maha Pemilik Kebesaran dan Kemuliaan"],
    ["الْمُقْسِط","Al-Muqsit","Yang Maha Adil"],["الْجَامِع","Al-Jami'","Yang Maha Mengumpulkan"],
    ["الْغَنِيّ","Al-Ghaniyy","Yang Maha Kaya"],["الْمُغْنِي","Al-Mughni","Yang Maha Pemberi Kekayaan"],
    ["الْمَانِع","Al-Mani'","Yang Maha Mencegah"],["الضَّار","Ad-Darr","Yang Maha Pemberi Derita"],
    ["النَّافِع","An-Nafi'","Yang Maha Pemberi Manfaat"],["النُّور","An-Nur","Yang Maha Bercahaya"],
    ["الْهَادِي","Al-Hadi","Yang Maha Pemberi Petunjuk"],["الْبَدِيع","Al-Badi'","Yang Maha Pencipta Tiada Bandingan"],
    ["البَاقِي","Al-Baqi","Yang Maha Kekal"],["الْوَارِث","Al-Warith","Yang Maha Pewaris"],
    ["الرَّشِيد","Ar-Rasyid","Yang Maha Pandai"],["الصَّبُور","As-Sabur","Yang Maha Sabar"]
  ];

  var namesCarousel = document.getElementById('names-carousel');
  if(namesCarousel){
    names99.forEach(function(n){
      var card = document.createElement('div');
      card.className = 'name-card glass';
      card.innerHTML =
        '<div class="arabic">' + n[0] + '</div>' +
        '<div class="translit">' + n[1] + '</div>' +
        '<div class="meaning">' + n[2] + '</div>' +
        '<div class="reflection">Semoga engkau senantiasa mengenal-Nya lewat nama ini.</div>';
      namesCarousel.appendChild(card);
    });
  }
  var namesPrev = document.getElementById('names-prev');
  var namesNext = document.getElementById('names-next');
  function scrollNames(dir){
    if(!namesCarousel) return;
    namesCarousel.scrollBy({left: dir * 260, behavior: reducedMotion ? 'auto' : 'smooth'});
  }
  namesPrev && namesPrev.addEventListener('click', function(){ scrollNames(-1); });
  namesNext && namesNext.addEventListener('click', function(){ scrollNames(1); });

  var namesProgress = document.getElementById('names-progress');
  if(namesCarousel && namesProgress){
    var afterEl = null;
    namesCarousel.addEventListener('scroll', function(){
      var max = namesCarousel.scrollWidth - namesCarousel.clientWidth;
      var pct = max > 0 ? (namesCarousel.scrollLeft / max) * 100 : 0;
      namesProgress.style.setProperty('--w', pct + '%');
      namesProgress.style.background =
        'linear-gradient(90deg, var(--gold) ' + pct + '%, rgba(13,92,99,0.12) ' + pct + '%)';
    });
  }

  /* ---------------- SOUND TOGGLE ---------------- */
  var soundBtn = document.getElementById('sound-toggle');
  var audioEl = document.getElementById('ambience');
  var playing = false;
  soundBtn && soundBtn.addEventListener('click', function(){
    if(!audioEl) return;
    if(playing){
      audioEl.pause();
      soundBtn.classList.add('muted');
    } else {
      audioEl.volume = 0.35;
      audioEl.play().catch(function(){ /* file may be missing; fail silently */ });
      soundBtn.classList.remove('muted');
    }
    playing = !playing;
  });
  soundBtn && soundBtn.classList.add('muted');

  /* ---------------- INIT ---------------- */
  onScroll();
})();
