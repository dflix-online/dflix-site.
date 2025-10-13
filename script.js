// Carousel controls: arrows, keyboard, drag to scroll
(function(){
  const carousel = document.getElementById('carousel');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  function scrollByCard(direction){
    const card = carousel.querySelector('.card');
    if(!card) return;
    const scrollAmount = card.offsetWidth + 16; // gap
    carousel.scrollBy({left: direction * scrollAmount, behavior: 'smooth'});
  }

  prev.addEventListener('click', ()=> scrollByCard(-1));
  next.addEventListener('click', ()=> scrollByCard(1));

  // keyboard nav
  carousel.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') scrollByCard(-1);
    if(e.key === 'ArrowRight') scrollByCard(1);
  });

  // make carousel draggable
  let isDown = false, startX, scrollLeft;
  carousel.addEventListener('mousedown', (e)=>{
    isDown = true; carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', ()=>{ isDown = false; carousel.classList.remove('dragging'); });
  carousel.addEventListener('mouseup', ()=>{ isDown = false; carousel.classList.remove('dragging'); });
  carousel.addEventListener('mousemove', (e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
  });
})();