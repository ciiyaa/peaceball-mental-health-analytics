document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

let lastScroll = 0;
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.finding-card, .fade-in').forEach(el => observer.observe(el));

const stakeholderButtons = document.querySelectorAll('.stakeholder-btn');
const pitchCards = document.querySelectorAll('.pitch-card');

stakeholderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        stakeholderButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const stakeholder = this.getAttribute('data-stakeholder');
        pitchCards.forEach(card => card.classList.remove('active'));
        const selected = document.getElementById(`pitch-${stakeholder}`);
        if (selected) selected.classList.add('active');
    });
});

function copyPitch(stakeholder) {
    const card = document.getElementById(`pitch-${stakeholder}`);
    if (!card) return;

    let text = card.innerText.replace('Copy This Pitch', '').trim();

    navigator.clipboard.writeText(text).then(() => {
        const btn = card.querySelector('.btn-primary');
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';

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
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        btn.style.position = 'relative';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('Failed to copy. Please select and copy manually.');
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { width: 200px; height: 200px; opacity: 0; }
    }
`;
document.head.appendChild(style);

function animateValue(el, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.floor(eased * (end - start) + start) + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-card h2').forEach(stat => {
                const text = stat.textContent;
                let suffix = '';
                let number = 0;

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
                    setTimeout(() => animateValue(stat, 0, number, 2000, suffix), 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.key-stats');
if (statsSection) statsObserver.observe(statsSection);

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

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

document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

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

document.querySelectorAll('.challenge-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.8s ease';
    challengeObserver.observe(item);
});

document.querySelectorAll('.finding-text li').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `all 0.5s ease ${i * 0.1}s`;
});

const findingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('li').forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
            findingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.finding-text').forEach(f => findingObserver.observe(f));

document.querySelectorAll('.btn-primary, .btn-secondary, .stakeholder-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        this.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        this.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

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

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.style.display = 'none';
                content.innerHTML = '';
            }, 300);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') lightbox.click();
    });

    return { lightbox, content };
}

const { lightbox, content } = createLightbox();

const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    #lightbox-content img, #lightbox-content video {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    }
`;
document.head.appendChild(lightboxStyle);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const img = this.querySelector('img');
        const video = this.querySelector('video');

        if (img) {
            const lb = document.createElement('img');
            lb.src = img.src;
            lb.alt = img.alt;
            content.innerHTML = '';
            content.appendChild(lb);
            lightbox.style.display = 'flex';
            lightbox.style.animation = 'fadeIn 0.3s ease';
        } else if (video) {
            const lbVid = document.createElement('video');
            lbVid.src = video.querySelector('source').src;
            lbVid.controls = true;
            lbVid.autoplay = true;
            lbVid.style.maxWidth = '100%';
            lbVid.style.maxHeight = '90vh';
            content.innerHTML = '';
            content.appendChild(lbVid);
            lightbox.style.display = 'flex';
            lightbox.style.animation = 'fadeIn 0.3s ease';
        }

        triggerCelebration();
    });
});

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
        const piece = document.createElement('div');
        piece.innerHTML = ['⚽', '🎉', '✨', '⭐'][Math.floor(Math.random() * 4)];
        piece.style.cssText = `
            position: absolute;
            font-size: 20px;
            animation: burst 1s ease-out forwards;
            animation-delay: ${i * 0.02}s;
        `;
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 200 + 100;
        piece.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        piece.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        burst.appendChild(piece);
    }

    setTimeout(() => burst.remove(), 1500);
}

const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burst {
        0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
        100% { transform: translate(var(--x), var(--y)) scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(burstStyle);

function animateStories() {
    document.querySelectorAll('.story-featured blockquote').forEach(quote => {
        const orig = quote.textContent;
        quote.textContent = '';
        quote.style.opacity = '1';

        let i = 0;
        function type() {
            if (i < orig.length) {
                quote.textContent += orig.charAt(i);
                i++;
                setTimeout(type, 20);
            }
        }

        const qObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(type, 300);
                    qObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        qObserver.observe(quote);
    });

    document.querySelectorAll('.story-card').forEach((card, index) => {
        const title = card.querySelector('h4');
        const text = card.querySelector('p:not(.story-meta)');
        const meta = card.querySelector('.story-meta');

        if (title && text) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-10px)';
            text.style.opacity = '0';
            text.style.transform = 'translateY(10px)';
            if (meta) meta.style.opacity = '0';

            const cObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            title.style.transition = 'all 0.6s ease';
                            title.style.opacity = '1';
                            title.style.transform = 'translateY(0)';
                        }, index * 200);
                        setTimeout(() => {
                            text.style.transition = 'all 0.6s ease';
                            text.style.opacity = '1';
                            text.style.transform = 'translateY(0)';
                        }, index * 200 + 300);
                        if (meta) {
                            setTimeout(() => {
                                meta.style.transition = 'all 0.6s ease';
                                meta.style.opacity = '1';
                            }, index * 200 + 600);
                        }
                        cObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            cObserver.observe(card);
        }
    });

    document.querySelectorAll('.story-card').forEach(card => {
        const text = card.querySelector('p:not(.story-meta)');
        card.addEventListener('mouseenter', function() {
            text.style.transition = 'all 0.3s ease';
            text.style.transform = 'scale(1.02)';
            text.style.color = '#1a1a1a';
        });
        card.addEventListener('mouseleave', function() {
            text.style.transform = 'scale(1)';
            text.style.color = '';
        });
    });

    document.querySelectorAll('.story-featured .quote-author').forEach(author => {
        author.style.opacity = '0';
        author.style.transform = 'translateX(-20px)';

        const aObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        author.style.transition = 'all 0.8s ease';
                        author.style.opacity = '1';
                        author.style.transform = 'translateX(0)';
                    }, 1500);
                    aObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        aObserver.observe(author);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStories);
} else {
    animateStories();
}

function createCharts() {
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
                        labels: { font: { size: 14, weight: 'bold' }, padding: 15 }
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
                        ticks: { font: { size: 12 } },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        ticks: { font: { size: 12 } },
                        grid: { display: false }
                    }
                },
                animation: { duration: 2000, easing: 'easeOutQuart' }
            }
        });
    }

    const communityCtx = document.getElementById('communityChart');
    if (communityCtx) {
        new Chart(communityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Support Football Program', 'Do Not Support'],
                datasets: [{
                    data: [93.5, 6.5],
                    backgroundColor: ['rgba(220, 20, 60, 0.8)', 'rgba(224, 224, 224, 0.8)'],
                    borderColor: ['rgba(220, 20, 60, 1)', 'rgba(200, 200, 200, 1)'],
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
                        labels: { font: { size: 14, weight: 'bold' }, padding: 15 }
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
                animation: { animateRotate: true, animateScale: true, duration: 2000, easing: 'easeOutQuart' }
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCharts);
} else {
    createCharts();
}

console.log('%c⚽ PEACEBALL', 'color: #DC143C; font-size: 24px; font-weight: bold;');
console.log('%cFootball • Hope • Data', 'color: #666; font-size: 14px;');
