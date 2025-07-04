document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".modal-content");
  const modalCloseBtn = modal.querySelector(".modal-close");

  // Filtering function
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all buttons
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projects.forEach((project) => {
        if (filter === "all" || project.dataset.category === filter) {
          project.style.display = "block";
          project.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          project.style.display = "none";
        }
      });
    });
  });

  // Modal open
  projects.forEach((project) => {
    project.querySelector(".view-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(project);
    });
    // Also open modal on project-card keyboard focus + Enter
    project.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        openModal(project);
      }
    });
  });

  // Close modal
  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  function openModal(project) {
  const youtubeURL = project.getAttribute("data-video");
  if (youtubeURL) {
    modalContent.innerHTML = `
      <iframe width="100%" height="500" src="${youtubeURL}?autoplay=1&rel=0"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    return;
  }

  const media = project.querySelector("img, video");
  modalContent.innerHTML = "";
  let clone;
  if (media.tagName.toLowerCase() === "video") {
    clone = document.createElement("video");
    clone.src = media.src;
    clone.controls = true;
    clone.autoplay = true;
    clone.loop = media.loop;
    clone.muted = true;
    clone.playsInline = true;
    clone.style.maxHeight = "80vh";
    clone.style.maxWidth = "90vw";
    modalContent.appendChild(clone);
    clone.play().catch((err) => {});
  } else if (media.tagName.toLowerCase() === "img") {
    clone = document.createElement("img");
    clone.src = media.src;
    clone.alt = media.alt || "Project Image";
    modalContent.appendChild(clone);
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}


  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";
  }
});

const track = document.querySelector('.testimonial-track');

let isDown = false;
let startX;
let scrollLeft;

const carousel = document.querySelector('.testimonial-carousel');

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.style.transform ? parseFloat(track.style.transform.match(/-?[\d\.]+/)[0]) : 0;
  track.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
  track.style.animationPlayState = 'running';
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
  track.style.animationPlayState = 'running';
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1; //scroll-fastness multiplier
  track.style.transform = `translateX(${scrollLeft + walk}px)`;
});

// For touch devices
carousel.addEventListener('touchstart', (e) => {
  track.style.animationPlayState = 'paused';
});

carousel.addEventListener('touchend', (e) => {
  track.style.animationPlayState = 'running';
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const toggle = item.querySelector('.faq-toggle');

  toggle.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach(i => i.classList.remove('active'));

    if (!isActive) item.classList.add('active');
  });
});

const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
