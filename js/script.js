document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('#header'),menu=document.querySelector('#menuToggle'),nav=document.querySelector('#nav');
  const links=[...document.querySelectorAll('.nav a')],sections=[...document.querySelectorAll('main section[id]')];
  document.querySelector('#currentYear').textContent=new Date().getFullYear();
  const close=()=>{nav.classList.remove('active');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú')};
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('active');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
  links.forEach(link=>link.addEventListener('click',close));window.addEventListener('resize',()=>{if(innerWidth>900)close()});
  const onScroll=()=>{header.classList.toggle('scrolled',scrollY>30);const y=scrollY+160;sections.forEach(section=>{if(y>=section.offsetTop&&y<section.offsetTop+section.offsetHeight)links.forEach(link=>link.classList.toggle('active',link.hash===`#${section.id}`))})};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});items.forEach(item=>observer.observe(item))}else items.forEach(item=>item.classList.add('visible'));

  const carousel=document.querySelector('#heroCarousel');
  if(carousel){
    const slides=[...carousel.querySelectorAll('.carousel-slide')],dots=[...carousel.querySelectorAll('.carousel-dots button')];
    const track=carousel.querySelector('.carousel-track'),progress=carousel.querySelector('.carousel-progress span');
    const prev=carousel.querySelector('.prev'),next=carousel.querySelector('.next');let current=0,timer;
    const restartProgress=()=>{progress.classList.remove('running');void progress.offsetWidth;progress.classList.add('running')};
    const show=index=>{current=(index+slides.length)%slides.length;track.style.transform=`translate3d(-${current*100}%,0,0)`;slides.forEach((slide,i)=>{const active=i===current;slide.classList.toggle('active',active);slide.setAttribute('aria-hidden',String(!active));dots[i].classList.toggle('active',active);dots[i].setAttribute('aria-selected',String(active))});restartProgress()};
    const stop=()=>{clearInterval(timer);progress.classList.remove('running')},play=()=>{stop();if(!matchMedia('(prefers-reduced-motion: reduce)').matches){restartProgress();timer=setInterval(()=>show(current+1),4800)}};
    prev.addEventListener('click',()=>{show(current-1);play()});next.addEventListener('click',()=>{show(current+1);play()});dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);play()}));
    carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){show(current-1);play()}if(event.key==='ArrowRight'){show(current+1);play()}});
    carousel.addEventListener('mouseenter',stop);carousel.addEventListener('mouseleave',play);carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',play);
    document.addEventListener('visibilitychange',()=>document.hidden?stop():play());play();
  }
});
