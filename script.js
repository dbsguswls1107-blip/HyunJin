/**
 * Video Editor Portfolio Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 헤더 스크롤 비주얼 강화
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
        } else {
            header.style.boxShadow = 'none';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        }
    });

    // 2. 모바일 메뉴 토글 및 클릭 이벤트
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // 3. 타임라인 프로그레스 바 및 실시간 타임코드 연동
    const progressBar = document.getElementById('progressBar');
    const timecodeDisplay = document.getElementById('timecodeDisplay');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // 스크롤바 길이 제어
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }

        // 스크롤 위치 기반 타임코드 계산 (30fps 기준)
        if (timecodeDisplay) {
    timecodeDisplay.innerText = `${Math.floor(scrollPercent)}%`;
      }
    });

    // 4. ★ 스크롤 위치 기반 현재 선택된 메뉴 (Active Link) 자동 인식 ★
    const sections = document.querySelectorAll('section[id]');

    const updateActiveNav = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // 상단 헤더 높이 감안한 오프셋
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // 초기 진입 시 실행

    // 5. 스크롤 인터랙션 요소 등장 애니메이션 (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
    const cards = document.querySelectorAll('.video-card, .gallery-card, .about-grid, .contact-box');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(card);
    });
});
