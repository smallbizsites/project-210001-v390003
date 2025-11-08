document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    // 1. Navigation Toggle
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('open');
    });

    // Close mobile menu on link click
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 2. Theme Toggle (Light/Dark Mode)
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        let newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    });

    // 3. Cookie Consent Logic
    const cookieAccepted = localStorage.getItem('cookieConsent');
    if (cookieAccepted !== 'true') {
        cookieBanner.style.display = 'flex';
    } else {
        cookieBanner.style.display = 'none';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.style.display = 'none';
    });

    // 4. Calendar Link Copy Functionality
    const copyButton = document.querySelector('[data-copy-target]');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const targetId = copyButton.getAttribute('data-copy-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const textToCopy = targetElement.textContent.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Provide accessible feedback
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    copyButton.setAttribute('aria-live', 'assertive');
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.removeAttribute('aria-live');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    }
});