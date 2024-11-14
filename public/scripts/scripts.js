document.getElementById('menu-toggle').addEventListener('click', function(e) {
    e.preventDefault(); 
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden'); 
  });
  