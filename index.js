document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const slideWidth = track.getBoundingClientRect().width / 3; // Ajuste para 3 elementos visibles

  const navLinks = document.querySelectorAll(".nav-link"); // Todos los enlaces del menú
  const sections = document.querySelectorAll("section"); // Todas las secciones
  const navLinksContainer = document.querySelector(".nav-links"); // Contenedor del menú
  const navButton = document.querySelector(".nav-button"); // Botón "Cotiza"

  // Seleccionar el ícono del menú y el menú desplegable
  const menuIcon = document.querySelector('.menu-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Alternar el menú desplegable al hacer clic
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que cierre inmediatamente al hacer clic en el ícono
    dropdownMenu.classList.toggle('active');
  });

  // Cerrar el menú desplegable al hacer clic fuera
  document.addEventListener('click', () => {
    if (dropdownMenu.classList.contains('active')) {
      dropdownMenu.classList.remove('active');
    }
  });

  // Colocar los slides en su posición inicial
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
  });

  // Mover al siguiente slide
  const moveToSlide = (track, currentSlide, targetSlide) => {
    const amountToMove = targetSlide.style.left;
    track.style.transform = `translateX(-${amountToMove})`;
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  };

  // Inicializar la primera diapositiva como activa
  slides[0].classList.add("current-slide");

  // Animación automática del carrusel
  let autoSlideInterval;
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      const currentSlide = track.querySelector(".current-slide") || slides[0];
      const nextSlide = currentSlide.nextElementSibling || slides[0];
      moveToSlide(track, currentSlide, nextSlide);
    }, 3000); // Cambia cada 3 segundos
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Iniciar la animación automática
  startAutoSlide();

  // Pausar la animación al pasar el mouse sobre el carrusel
  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  // Cambiar clase activa en el menú de navegación
  const changeActiveLink = () => {
    let currentSection = ""; // Por defecto ninguna sección activa

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150; // Ajuste para la altura del navbar
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  };

  // Escuchar el evento de scroll para actualizar el enlace activo
  window.addEventListener("scroll", changeActiveLink);

  // Cambiar clase activa al hacer clic en los enlaces
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      navLinks.forEach((link) => link.classList.remove("active"));
      event.target.classList.add("active");
    });
  });

  // Mostrar y ocultar el menú hamburguesa
  menuIcon.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    navButton.classList.toggle("active");
  });
});
