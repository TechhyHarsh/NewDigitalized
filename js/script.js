// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Animate on Scroll

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-up, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = "thankyou.html";
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
    }
  });



  document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll(".portfolio-categories li");
    const portfolioGroups = document.querySelectorAll(".portfolio-group");
    const searchInput = document.getElementById("portfolio-search");

    // ==== Filter by Category ====
    categoryItems.forEach(item => {
      item.addEventListener("click", () => {
        categoryItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const selected = item.getAttribute("data-category");

        portfolioGroups.forEach(group => {
          if (selected === "all" || group.getAttribute("data-category") === selected) {
            group.style.display = "block";
          } else {
            group.style.display = "none";
          }
        });
      });
    });

    // ==== Real-Time Search ====
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();

      portfolioGroups.forEach(group => {
        const items = group.querySelectorAll(".portfolio-item");
        let groupVisible = false;

        items.forEach(item => {
          const text = item.querySelector("p").textContent.toLowerCase();
          const match = text.includes(query);
          item.style.display = match ? "block" : "none";
          if (match) groupVisible = true;
        });

        group.style.display = groupVisible ? "block" : "none";
      });
    });

    // ==== Carousel Drag Scroll ====
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach(carousel => {
      let isDown = false;
      let startX;
      let scrollLeft;

      carousel.addEventListener("mousedown", e => {
        isDown = true;
        carousel.classList.add("dragging");
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener("mouseleave", () => {
        isDown = false;
        carousel.classList.remove("dragging");
      });

      carousel.addEventListener("mouseup", () => {
        isDown = false;
        carousel.classList.remove("dragging");
      });

      carousel.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // scroll speed
        carousel.scrollLeft = scrollLeft - walk;
      });
    });
  });




  const pricingPlans = [
    {
      name: "Business Website",
      price: "₹2999",
      features: [
        "5 pages",
        "Responsive Design",
        "SEO Setup",
        "Contact Form",
        "Hosting Guidance"
      ]
    },
    {
      name: "Professional Resume",
      price: "₹499",
      features: [
        "ATS-Friendly Format",
        "PDF + DOCX files",
        "1-on-1 Revision",
        "Delivery in 48hrs"
      ]
    },
    {
      name: "Instagram Reels Editing",
      price: "₹499",
      features: [
        "Up to 60s duration",
        "Trending music + effects",
        "1 revision",
        "Reel Optimization"
      ]
    },
    {
      name: "Thumbnail Design",
      price: "₹399",
      features: [
        "Custom YouTube thumbnails",
        "High CTR Design",
        "Multiple drafts",
        "Delivery in 24 hrs"
      ]
    },
    {
      name: "Business Logo",
      price: "₹499",
      features: [
        "3 concepts",
        "All file formats",
        "Brand guidelines",
        "Free mockup"
      ]
    },
    {
      name: "LinkedIn Profile Optimization",
      price: "₹1099",
      features: [
        "Profile rewriting",
        "Banner + Bio Setup",
        "SEO Optimized",
        "PDF Tips Guide"
      ]
    }
  ];
  
  function renderPricingCards(plans = pricingPlans) {
    const container = document.getElementById("pricingCards");
    container.innerHTML = "";
  
    plans.forEach(plan => {
      const card = document.createElement("div");
      card.className = "pricing-card";
  
      const featuresHTML = plan.features.map(item => `<li>${item}</li>`).join("");
  
      card.innerHTML = `
        <h3>${plan.name}</h3>
        <ul>${featuresHTML}</ul>
        <div class="price">${plan.price}</div>
        <a href="#contact" class="cta">Get This</a>
      `;
  
      container.appendChild(card);
    });
  }
  
  renderPricingCards();
  
  document.getElementById("pricingSearch").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = pricingPlans.filter(plan =>
      plan.name.toLowerCase().includes(query)
    );
    renderPricingCards(filtered);
  });

  
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

