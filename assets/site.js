  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el=>io.observe(el));
  } else {
    reveals.forEach(el=>el.classList.add('in'));
  }

  // Boost gauge driven by scroll progress
  const gauge = document.getElementById('gauge');
  const fill = document.getElementById('gaugeFill');
  const label = document.getElementById('gaugeLabel');
  const TOTAL = 198; // matches dasharray active length
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateGauge(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(1, Math.max(0, scrollTop / docHeight));
    const offset = TOTAL - (TOTAL * pct);
    fill.style.strokeDashoffset = offset;
    label.textContent = Math.round(pct * 100) + '%';

    // Colour shift toward boost-orange in the "redline" zone
    if(pct > 0.85){
      fill.style.stroke = '#ff4429';
    } else {
      fill.style.stroke = '#3ff0e8';
    }

    if(scrollTop > 80){ gauge.classList.add('show'); }
    else { gauge.classList.remove('show'); }
  }

  if(!reduceMotion){
    window.addEventListener('scroll', updateGauge, { passive:true });
    updateGauge();
  } else {
    gauge.style.display = 'none';
  }
