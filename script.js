document.addEventListener('DOMContentLoaded', function() {
  // Set current year in the footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      // Toggle the menu icon between ≡ and ✕
      const menuIcon = this.querySelector('.menu-icon');
      if (menuIcon) {
        menuIcon.textContent = mobileNav.classList.contains('active') ? '✕' : '≡';
      }
    });
  }
  
  // Header scroll effect
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          if (mobileMenuBtn.querySelector('.menu-icon')) {
            mobileMenuBtn.querySelector('.menu-icon').textContent = '≡';
          }
        }
        
        // Scroll to the element
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Render Team Members
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid && window.teamMembers) {
    teamGrid.innerHTML = window.teamMembers.map(member => {
      // Generate social links HTML
      const socialLinksHtml = Object.entries(member.socialLinks).map(([platform, url]) => {
        let icon;
        
        switch(platform) {
          case 'linkedin':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>';
            break;
          case 'twitter':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>';
            break;
          case 'github':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>';
            break;
          case 'instagram':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>';
            break;
          case 'email':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>';
            break;
          default:
            icon = '';
        }
        
        return `<a href="${url}" aria-label="${platform}" class="team-social-link">${icon}</a>`;
      }).join('');
      
      return `
        <div class="team-card">
          <img src="${member.image}" alt="${member.name}" class="team-card-image">
          <div class="team-card-content">
            <h3>${member.name}</h3>
            <p class="team-card-role">${member.role}</p>
            <p>${member.bio}</p>
            <div class="team-social">
              ${socialLinksHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Render Achievements
  const achievementsGrid = document.querySelector('.achievements-grid');
  if (achievementsGrid && window.achievements) {
    achievementsGrid.innerHTML = window.achievements.map(achievement => {
      let iconHtml;
      
      switch(achievement.icon) {
        case 'award':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>';
          break;
        case 'trophy':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>';
          break;
        case 'medal':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.004V22.507"></path><path d="M8 15.842a7 7 0 1 0 8 0"></path><path d="M8.5 9.54 6 3.5l5 1L12 2l1 2.5 5-1-2.5 6.34"></path></svg>';
          break;
        case 'users':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>';
          break;
        default:
          iconHtml = '';
      }
      
      return `
        <div class="achievement-card">
          <div class="achievement-icon">
            ${iconHtml}
          </div>
          <div>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            <p class="achievement-location">${achievement.location}</p>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Render Projects
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid && window.projects) {
    projectsGrid.innerHTML = window.projects.map(project => {
      return `
        <div class="project-card">
          <img src="${project.image}" alt="${project.title}" class="project-image">
          <div class="project-content">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="project-footer">
              <span class="project-category">${project.category}</span>
              <a href="${project.link}" class="project-link">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Render Gallery
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid && window.galleryImages) {
    galleryGrid.innerHTML = window.galleryImages.map(image => {
      return `
        <div class="gallery-item ${image.size === 'large' ? 'large' : ''}" data-id="${image.id}">
          <img src="${image.src}" alt="${image.alt}" class="gallery-image">
        </div>
      `;
    }).join('');
    
    // Gallery modal functionality
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    
    function openModal(index) {
      currentImageIndex = index;
      updateModalImage();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    function updateModalImage() {
      const image = galleryImages[currentImageIndex];
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalCaption.textContent = image.alt;
    }
    
    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateModalImage();
    }
    
    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateModalImage();
    }
    
    // Add click event to gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.addEventListener('click', () => openModal(index));
    });
    
    // Modal controls
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalPrev) modalPrev.addEventListener('click', prevImage);
    if (modalNext) modalNext.addEventListener('click', nextImage);
    
    // Close modal when clicking outside image
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
    }
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
      if (!modal.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  }
  
  // Render News Items
  const newsGrid = document.querySelector('.news-grid');
  if (newsGrid && window.newsItems) {
    newsGrid.innerHTML = window.newsItems.map(item => {
      return `
        <div class="news-card">
          <img src="${item.image}" alt="${item.title}" class="news-image">
          <div class="news-content">
            <div class="news-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              ${item.date}
            </div>
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <a href="${item.link}" class="link-arrow">
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: this.elements.name.value,
        email: this.elements.email.value,
        subject: this.elements.subject.value,
        message: this.elements.message.value
      };
      
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Simulate form submission
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.elements['newsletter-email'].value;
      
      // Validate email
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      showToast('Thank you for subscribing to our newsletter!', 'success');
      
      // Reset form
      newsletterForm.reset();
    });
  }
  
  // Toast notification system
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' 
      ? '<span class="toast-icon">✓</span>' 
      : '<span class="toast-icon">✕</span>';
    
    const title = type === 'success' ? 'Success' : 'Error';
    
    toast.innerHTML = `
      ${icon}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    // Add close button functionality
    toast.querySelector('.toast-close').addEventListener('click', function() {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    });
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      if (toast.parentNode === toastContainer) {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
          if (toast.parentNode === toastContainer) {
            toastContainer.removeChild(toast);
          }
        }, 300);
      }
    }, 5000);
    
    toastContainer.appendChild(toast);
  }
});
