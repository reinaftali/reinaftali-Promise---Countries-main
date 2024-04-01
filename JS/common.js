document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.querySelector('.theme-toggle');
    const body = document.body;
  
    themeToggleButton.addEventListener('click', toggleTheme);
  
    function toggleTheme() {
      body.classList.toggle('dark-theme');
      updateThemeIcon();
    }
  
    function updateThemeIcon() {
      const themeIcon = themeToggleButton.querySelector('.theme-icon');
      if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  
    // Set initial theme based on user preference or default
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        body.classList.add('dark-theme');
        updateThemeIcon();
        }
        
        // Scroll to top button
        const scrollTopButton = document.querySelector('.scroll-top');
        
        window.addEventListener('scroll', () => {
        const scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollHeight > 300) {
        scrollTopButton.classList.add('show');
        } else {
        scrollTopButton.classList.remove('show');
        }
        });
        
        scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Loader
        const loader = document.querySelector('.loader');
        window.addEventListener('load', () => {
        loader.classList.add('close');
        });
    });