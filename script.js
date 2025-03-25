        // Efecto de luz dinámico
        document.addEventListener('mousemove', (e) => {
            const luz = document.querySelector('.luz');
            const x = e.clientX;
            const y = e.clientY;

            // Ajustar la posición de la luz
            luz.style.setProperty('--x', `${x}px`);
            luz.style.setProperty('--y', `${y}px`);
        });

        // Permitir scroll en el lado derecho aunque el ratón esté en la izquierda
        document.addEventListener('wheel', (e) => {
            const scrollContainer = document.getElementById('scroll-container');
            scrollContainer.scrollTop += e.deltaY;
            e.preventDefault();
        });

    document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links li");
    
    // Hacer que el scroll sea suave al hacer clic en los enlaces
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            // Eliminar la clase 'active' de todos los elementos
            navItems.forEach(i => i.classList.remove("active"));

            // Añadir la clase 'active' al item seleccionado
            item.classList.add("active");

            const targetId = item.querySelector("a").getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Detectar la sección más visible y mover la estrella
    function highlightNavItem() {
    let maxVisibleHeight = 0;
    let activeSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // Calcular el porcentaje de visibilidad de la sección
            const totalHeight = rect.height;
            const visibleHeight = Math.max(0, Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top));
            const visiblePercentage = (visibleHeight / totalHeight) * 100; // Porcentaje de visibilidad

            if (visiblePercentage > 51 && visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                activeSection = section;
            }
        });

        if (activeSection) {
            navItems.forEach(item => {
                item.classList.remove("active");
                const estrella = item.querySelector(".estrella");
                estrella.style.opacity = "0"; // Ocultar la estrella cuando no está activa
            });

            const activeItem = document.querySelector(`.nav-links a[href="#${activeSection.id}"]`).parentElement;
            if (activeItem) {
                activeItem.classList.add("active");
                const estrella = activeItem.querySelector(".estrella");

                // Mostrar la estrella y moverla hacia la izquierda del li
                estrella.style.opacity = "1"; // Hacer visible la estrella
            }
        }
    }

    // Detectar scroll y actualizar la navegación
    document.querySelector(".lado-derecho").addEventListener("scroll", highlightNavItem);
    window.addEventListener("resize", highlightNavItem);

    // Llamar a la función al cargar la página
    highlightNavItem();
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Cuando la sección entra en vista, llenamos las barras de progreso
            document.getElementById("html-progress").style.width = "60%"; // Cambia al valor que desees para HTML
            document.getElementById("css-progress").style.width = "60%"; // Cambia al valor que desees para CSS
            document.getElementById("javascript-progress").style.width = "40%"; // Cambia al valor que desees para CSS
            document.getElementById("php-progress").style.width = "70%";
            document.getElementById("symfony-progress").style.width = "70%";
            document.getElementById("sql-progress").style.width = "70%";
            document.getElementById("xml-progress").style.width = "50%";
            document.getElementById("xhtml-progress").style.width = "30%";
            observer.unobserve(entry.target); // Detener la observación después de la animación
        }
    });
}, { threshold: 0.5 }); // El 50% de la sección debe ser visible

// Seleccionar la sección de lenguajes para observarla
const section = document.querySelector(".cards-container-lenguajes");
observer.observe(section);
