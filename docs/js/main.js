// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar effects on scroll
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Only observe once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all finding cards and fade-in elements
document.querySelectorAll('.finding-card, .fade-in').forEach(element => {
    observer.observe(element);
});

// Pitch Generator Functionality
const stakeholderButtons = document.querySelectorAll('.stakeholder-btn');
const pitchCards = document.querySelectorAll('.pitch-card');

stakeholderButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        stakeholderButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Get stakeholder type
        const stakeholder = this.getAttribute('data-stakeholder');

        // Hide all pitch cards
        pitchCards.forEach(card => card.classList.remove('active'));

        // Show selected pitch card with animation
        const selectedCard = document.getElementById(`pitch-${stakeholder}`);
        if (selectedCard) {
            setTimeout(() => {
                selectedCard.classList.add('active');
            }, 100);
        }
    });
});

// Copy pitch to clipboard with enhanced feedback
function copyPitch(stakeholder) {
    const pitchCard = document.getElementById(`pitch-${stakeholder}`);
    if (!pitchCard) return;

    // Get all text content
    let pitchText = pitchCard.innerText;

    // Remove the "Copy This Pitch" button text
    pitchText = pitchText.replace('Copy This Pitch', '').trim();

    // Copy to clipboard
    navigator.clipboard.writeText(pitchText).then(() => {
        // Show success message
        const button = pitchCard.querySelector('.btn-primary');
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(46, 204, 113, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        const rect = button.getBoundingClientRect();
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy. Please select and copy manually.');
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animated counter for stats
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(easeOutQuart * (end - start) + start);

        element.textContent = value + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger stats animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat-card h2');
            stats.forEach(stat => {
                const text = stat.textContent;
                let suffix = '';
                let number = 0;

                // Extract number and suffix
                if (text.includes('+')) {
                    number = parseInt(text.replace(/\D/g, ''));
                    suffix = '+';
                } else if (text.includes('%')) {
                    number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    suffix = '%';
                } else if (text.includes('x')) {
                    number = parseInt(text.replace(/\D/g, ''));
                    suffix = 'x';
                } else {
                    number = parseInt(text.replace(/\D/g, ''));
                }

                if (!isNaN(number)) {
                    stat.textContent = '0' + suffix;
                    setTimeout(() => {
                        animateValue(stat, 0, number, 2000, suffix);
                    }, 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.key-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Method cards staggered animation
const methodCards = document.querySelectorAll('.method-card');
const methodObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            methodObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

methodCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    methodObserver.observe(card);
});

// Story cards hover effect
document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Challenge items animate in sequence
const challengeItems = document.querySelectorAll('.challenge-item');
const challengeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            challengeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

challengeItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.8s ease';
    challengeObserver.observe(item);
});

// Smooth reveal for finding items
const findingLists = document.querySelectorAll('.finding-text li');
findingLists.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
});

const findingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
            findingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.finding-text').forEach(finding => {
    findingObserver.observe(finding);
});

// Add dynamic cursor effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .stakeholder-btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// Loading state for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


// Interactive Gallery Lightbox
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    const content = document.createElement('div');
    content.id = 'lightbox-content';
    content.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        position: relative;
        animation: zoomIn 0.3s ease;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(220, 20, 60, 0.9);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.5);
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'rotate(90deg) scale(1.1)';
        closeBtn.style.background = 'rgba(220, 20, 60, 1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'rotate(0deg) scale(1)';
        closeBtn.style.background = 'rgba(220, 20, 60, 0.9)';
    });

    lightbox.appendChild(content);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Close on click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.style.display = 'none';
                content.innerHTML = '';
            }, 300);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.click();
        }
    });

    return { lightbox, content };
}

const { lightbox, content } = createLightbox();

// Add lightbox animations
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    #lightbox-content img, #lightbox-content video {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    }
`;
document.head.appendChild(lightboxStyle);

// Add click handlers to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', function(e) {
        e.preventDefault();

        const img = this.querySelector('img');
        const video = this.querySelector('video');

        if (img) {
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            content.innerHTML = '';
            content.appendChild(lightboxImg);
            lightbox.style.display = 'flex';
            lightbox.style.animation = 'fadeIn 0.3s ease';
        } else if (video) {
            const lightboxVideo = document.createElement('video');
            lightboxVideo.src = video.querySelector('source').src;
            lightboxVideo.controls = true;
            lightboxVideo.autoplay = true;
            lightboxVideo.style.maxWidth = '100%';
            lightboxVideo.style.maxHeight = '90vh';
            content.innerHTML = '';
            content.appendChild(lightboxVideo);
            lightbox.style.display = 'flex';
            lightbox.style.animation = 'fadeIn 0.3s ease';
        }

        // Celebration effect
        triggerCelebration();
    });
});

// Celebration particle burst
function triggerCelebration() {
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(burst);

    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['⚽', '🎉', '✨', '⭐'][Math.floor(Math.random() * 4)];
        confetti.style.cssText = `
            position: absolute;
            font-size: 20px;
            animation: burst 1s ease-out forwards;
            animation-delay: ${i * 0.02}s;
        `;

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 200 + 100;
        confetti.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        confetti.style.setProperty('--y', Math.sin(angle) * velocity + 'px');

        burst.appendChild(confetti);
    }

    setTimeout(() => burst.remove(), 1500);
}

const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burst {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x), var(--y)) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Stories Section Quote Animations
function animateStories() {
    // Typewriter effect for ALL featured quotes
    const featuredQuotes = document.querySelectorAll('.story-featured blockquote');
    featuredQuotes.forEach((featuredQuote) => {
        const originalText = featuredQuote.textContent;
        featuredQuote.textContent = '';
        featuredQuote.style.opacity = '1';

        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                featuredQuote.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 20);
            }
        }

        // Observer to trigger when scrolled into view
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 300);
                    quoteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        quoteObserver.observe(featuredQuote);
    });

    // Animated reveal for story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
        const title = card.querySelector('h4');
        const text = card.querySelector('p:not(.story-meta)');
        const meta = card.querySelector('.story-meta');

        if (title && text) {
            // Hide initially
            title.style.opacity = '0';
            title.style.transform = 'translateY(-10px)';
            text.style.opacity = '0';
            text.style.transform = 'translateY(10px)';
            if (meta) {
                meta.style.opacity = '0';
            }

            // Animate on scroll
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Title appears first
                        setTimeout(() => {
                            title.style.transition = 'all 0.6s ease';
                            title.style.opacity = '1';
                            title.style.transform = 'translateY(0)';
                        }, index * 200);

                        // Text appears second
                        setTimeout(() => {
                            text.style.transition = 'all 0.6s ease';
                            text.style.opacity = '1';
                            text.style.transform = 'translateY(0)';
                        }, index * 200 + 300);

                        // Meta appears last
                        if (meta) {
                            setTimeout(() => {
                                meta.style.transition = 'all 0.6s ease';
                                meta.style.opacity = '1';
                            }, index * 200 + 600);
                        }

                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            cardObserver.observe(card);
        }
    });

    // Highlight effect on hover for story cards
    storyCards.forEach(card => {
        const text = card.querySelector('p:not(.story-meta)');

        card.addEventListener('mouseenter', function() {
            // Add subtle pulse to text
            text.style.transition = 'all 0.3s ease';
            text.style.transform = 'scale(1.02)';
            text.style.color = '#1a1a1a';
        });

        card.addEventListener('mouseleave', function() {
            text.style.transform = 'scale(1)';
            text.style.color = '';
        });
    });

    // Animated quote authors for ALL featured stories
    const quoteAuthors = document.querySelectorAll('.story-featured .quote-author');
    quoteAuthors.forEach((quoteAuthor) => {
        quoteAuthor.style.opacity = '0';
        quoteAuthor.style.transform = 'translateX(-20px)';

        const authorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        quoteAuthor.style.transition = 'all 0.8s ease';
                        quoteAuthor.style.opacity = '1';
                        quoteAuthor.style.transform = 'translateX(0)';
                    }, 1500);
                    authorObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        authorObserver.observe(quoteAuthor);
    });
}

// Initialize story animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStories);
} else {
    animateStories();
}

// Data Visualization Charts
function createCharts() {
    // Chart 1: Wellbeing Comparison
    const wellbeingCtx = document.getElementById('wellbeingChart');
    if (wellbeingCtx) {
        new Chart(wellbeingCtx, {
            type: 'bar',
            data: {
                labels: ['WHO-5 Wellbeing', 'Social Support', 'Self-Confidence'],
                datasets: [{
                    label: 'Participants',
                    data: [82, 4.3, 4.2],
                    backgroundColor: 'rgba(220, 20, 60, 0.8)',
                    borderColor: 'rgba(220, 20, 60, 1)',
                    borderWidth: 2
                }, {
                    label: 'Non-Participants',
                    data: [41, 2.0, 2.1],
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    borderColor: 'rgba(102, 102, 102, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: { size: 14, weight: 'bold' },
                            padding: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Program Impact on Wellbeing Measures',
                        font: { size: 16, weight: 'bold' },
                        padding: 20
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: { size: 12 }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: { size: 12 }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Chart 2: Community Support
    const communityCtx = document.getElementById('communityChart');
    if (communityCtx) {
        new Chart(communityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Support Football Program', 'Do Not Support'],
                datasets: [{
                    data: [93.5, 6.5],
                    backgroundColor: [
                        'rgba(220, 20, 60, 0.8)',
                        'rgba(224, 224, 224, 0.8)'
                    ],
                    borderColor: [
                        'rgba(220, 20, 60, 1)',
                        'rgba(200, 200, 200, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: { size: 14, weight: 'bold' },
                            padding: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Community Support for Football Program',
                        font: { size: 16, weight: 'bold' },
                        padding: 20
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// Initialize charts when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCharts);
} else {
    createCharts();
}

// Console message
console.log('%c⚽ PEACEBALL', 'color: #DC143C; font-size: 24px; font-weight: bold;');
console.log('%cFootball • Hope • Data', 'color: #666; font-size: 14px;');
console.log('Website loaded successfully with animated stories and data visualizations!');
