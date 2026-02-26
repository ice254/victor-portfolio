/**
 * Victor Nakhungu Makokha - Portfolio JavaScript
 * Software Developer & Web Developer
 */

// ===== MOBILE MENU TOGGLE =====
window.toggleMobileMenu = function() {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('mobile-nav-open');
};

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navbar');
    nav.classList.remove('mobile-nav-open');
  });
});

// ===== SKILLS DATA =====
const skills = [
  { name: 'JavaScript/TypeScript', icon: 'fab fa-js' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Node.js', icon: 'fab fa-node' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'HTML5/CSS3', icon: 'fab fa-html5' },
  { name: 'Vue.js', icon: 'fab fa-vuejs' },
  { name: 'Django', icon: 'fab fa-python' },
  { name: 'MongoDB', icon: 'fas fa-database' },
  { name: 'PostgreSQL', icon: 'fas fa-database' },
  { name: 'Git', icon: 'fab fa-git-alt' },
  { name: 'Docker', icon: 'fab fa-docker' },
  { name: 'AWS', icon: 'fab fa-aws' }
];

// ===== PROJECTS DATA =====
const projects = [
  {
    name: 'TaskFlow Pro',
    desc: 'Enterprise task management with real-time updates',
    icon: 'fa-tasks',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB']
  },
  {
    name: 'MediTrack',
    desc: 'Healthcare patient management system',
    icon: 'fa-hospital',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'JWT']
  },
  {
    name: 'EcoMart',
    desc: 'E-commerce platform for sustainable products',
    icon: 'fa-shopping-cart',
    tags: ['Next.js', 'Stripe', 'Tailwind', 'Prisma']
  },
  {
    name: 'DevConnect',
    desc: 'Social network for developers',
    icon: 'fa-users',
    tags: ['React', 'Firebase', 'Material-UI', 'Redux']
  },
  {
    name: 'Portfolio Hub',
    desc: 'Customizable portfolio generator for devs',
    icon: 'fa-laptop-code',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Cloudinary']
  },
  {
    name: 'API Gateway',
    desc: 'Microservices API management tool',
    icon: 'fa-network-wired',
    tags: ['Go', 'Docker', 'Kubernetes', 'GraphQL']
  }
];

// ===== TESTIMONIALS DATA =====
const testimonials = [
  {
    text: 'Victor is an exceptional developer. He delivered our platform ahead of schedule and the code quality was outstanding.',
    author: '— Sarah Kimani, CTO at TechFlow'
  },
  {
    text: 'One of the best full-stack developers I\'ve worked with. His problem-solving skills and attention to detail are impressive.',
    author: '— James Omondi, Lead Developer at Safaricom'
  },
  {
    text: 'Victor transformed our outdated website into a modern, fast, and user-friendly application. Highly recommended!',
    author: '— Mary Wambui, Product Manager at KCB Bank'
  },
  {
    text: 'His expertise in both frontend and backend made our project seamless. A true professional who communicates well.',
    author: '— Dr. Peter Mwangi, Founder at HealthTech Kenya'
  }
];

// ===== RENDER SKILLS =====
function renderSkills() {
  const skillsContainer = document.getElementById('skillsContainer');
  if (!skillsContainer) return;
  
  skills.forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip';
    chip.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
    skillsContainer.appendChild(chip);
  });
}

// ===== RENDER PROJECTS =====
function renderProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Create tags HTML
    const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
    
    card.innerHTML = `
      <div class="project-icon"><i class="fas ${project.icon}"></i></div>
      <h3>${project.name}</h3>
      <p style="color:#446688;">${project.desc}</p>
      <div class="project-tags">
        ${tagsHTML}
      </div>
      <a href="#" class="project-link">View project <i class="fas fa-arrow-right"></i></a>
    `;
    
    projectsGrid.appendChild(card);
  });
}

// ===== TESTIMONIAL SLIDER =====
class TestimonialSlider {
  constructor() {
    this.currentIndex = 0;
    this.quoteEl = document.getElementById('quoteText');
    this.authorEl = document.getElementById('quoteAuthor');
    this.dotsContainer = document.getElementById('sliderDots');
    this.interval = null;
    
    this.init();
  }
  
  init() {
    if (!this.quoteEl || !this.authorEl || !this.dotsContainer) return;
    
    // Create dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = `dot ${index === 0 ? 'active-dot' : ''}`;
      dot.dataset.index = index;
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
    
    // Show first testimonial
    this.updateSlide(0);
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause on hover
    const slider = document.querySelector('.quote-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => this.stopAutoplay());
      slider.addEventListener('mouseleave', () => this.startAutoplay());
    }
  }
  
  updateSlide(index) {
    if (!this.quoteEl || !this.authorEl) return;
    
    // Fade out
    this.quoteEl.style.opacity = '0';
    
    setTimeout(() => {
      this.quoteEl.textContent = testimonials[index].text;
      this.authorEl.textContent = testimonials[index].author;
      this.quoteEl.style.opacity = '1';
    }, 150);
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
    
    this.currentIndex = index;
  }
  
  goToSlide(index) {
    this.stopAutoplay();
    this.updateSlide(index);
    this.startAutoplay();
  }
  
  nextSlide() {
    const next = (this.currentIndex + 1) % testimonials.length;
    this.updateSlide(next);
  }
  
  startAutoplay() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.nextSlide(), 5000);
  }
  
  stopAutoplay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
function initNavigationHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  function highlightNav() {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  window.addEventListener('load', highlightNav);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  new TestimonialSlider();
  initNavigationHighlight();
  initSmoothScroll();
  
  // Add year to footer
  const footer = document.querySelector('.footer p');
  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = `© ${year} Victor Nakhungu Makokha · Software & Web Developer`;
  }
});

// ===== ADDITIONAL UTILITIES =====
// Handle contact form (if you add one later)
function handleContactSubmit(event) {
  event.preventDefault();
  // Add your form submission logic here
  console.log('Form submitted');
}

// Export for use in HTML if needed
window.handleContactSubmit = handleContactSubmit;