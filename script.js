document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Request Sent!';
                btn.style.background = 'var(--success)';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .testimonial, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Customer Reviews & Photo Submission
    const openReviewModalBtn = document.getElementById('open-review-modal-btn');
    const closeReviewModalBtn = document.getElementById('close-review-modal-btn');
    const reviewModal = document.getElementById('review-modal');
    const reviewForm = document.getElementById('review-form');
    const reviewPhotosInput = document.getElementById('review-photos');
    const photoDropzone = document.getElementById('photo-dropzone');
    const photoPreviewsContainer = document.getElementById('photo-previews');
    const starBtns = document.querySelectorAll('.star-btn');
    const reviewRatingInput = document.getElementById('review-rating');
    const ratingText = document.getElementById('rating-text');
    const testimonialsGrid = document.getElementById('testimonials-grid');
    const reviewFeedback = document.getElementById('review-form-feedback');

    // Lightbox Elements
    const lightboxModal = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');

    let uploadedPhotos = []; // Array of base64 image strings

    function openReviewModal() {
        if (reviewModal) {
            reviewModal.classList.add('active');
            reviewModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (reviewFeedback) {
                reviewFeedback.className = 'review-form-feedback';
                reviewFeedback.style.display = 'none';
                reviewFeedback.textContent = '';
            }
        }
    }

    function closeReviewModal() {
        if (reviewModal) {
            reviewModal.classList.remove('active');
            reviewModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openReviewModalBtn) {
        openReviewModalBtn.addEventListener('click', openReviewModal);
    }

    if (closeReviewModalBtn) {
        closeReviewModalBtn.addEventListener('click', closeReviewModal);
    }

    if (reviewModal) {
        const backdrop = reviewModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeReviewModal);
        }
    }

    // Interactive Star Rating
    function setRating(rating) {
        if (reviewRatingInput) reviewRatingInput.value = rating;
        if (ratingText) ratingText.textContent = `${rating}.0 / 5 Stars`;
        starBtns.forEach(btn => {
            const r = parseInt(btn.getAttribute('data-rating'), 10);
            if (r <= rating) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    starBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'), 10);
            setRating(rating);
        });

        btn.addEventListener('mouseenter', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'), 10);
            starBtns.forEach(b => {
                const r = parseInt(b.getAttribute('data-rating'), 10);
                if (r <= hoverRating) {
                    b.classList.add('hover');
                } else {
                    b.classList.remove('hover');
                }
            });
        });

        btn.addEventListener('mouseleave', function() {
            starBtns.forEach(b => b.classList.remove('hover'));
        });
    });

    // Helper: compress and resize image for local storage & fast loading
    function processImageFile(file) {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith('image/')) {
                reject(new Error('Selected file is not an image'));
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const maxDim = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > maxDim || height > maxDim) {
                        if (width > height) {
                            height = Math.round((height * maxDim) / width);
                            width = maxDim;
                        } else {
                            width = Math.round((width * maxDim) / height);
                            height = maxDim;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(compressedDataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function renderPhotoPreviews() {
        if (!photoPreviewsContainer) return;
        photoPreviewsContainer.innerHTML = '';
        uploadedPhotos.forEach((photoData, index) => {
            const item = document.createElement('div');
            item.className = 'photo-preview-item';
            item.innerHTML = `
                <img src="${photoData}" alt="Uploaded preview ${index + 1}">
                <button type="button" class="photo-preview-remove" data-index="${index}" aria-label="Remove photo">&times;</button>
            `;
            const removeBtn = item.querySelector('.photo-preview-remove');
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                uploadedPhotos.splice(index, 1);
                renderPhotoPreviews();
            });
            photoPreviewsContainer.appendChild(item);
        });
    }

    async function handleFiles(files) {
        for (const file of files) {
            try {
                const dataUrl = await processImageFile(file);
                uploadedPhotos.push(dataUrl);
            } catch (err) {
                console.error('Error processing photo:', err);
            }
        }
        renderPhotoPreviews();
    }

    if (reviewPhotosInput) {
        reviewPhotosInput.addEventListener('change', function() {
            if (this.files && this.files.length) {
                handleFiles(this.files);
                this.value = ''; // Reset input so same file can be selected if needed
            }
        });
    }

    if (photoDropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            photoDropzone.addEventListener(eventName, function(e) {
                e.preventDefault();
                e.stopPropagation();
                photoDropzone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            photoDropzone.addEventListener(eventName, function(e) {
                e.preventDefault();
                e.stopPropagation();
                photoDropzone.classList.remove('dragover');
            });
        });

        photoDropzone.addEventListener('drop', function(e) {
            const dt = e.dataTransfer;
            if (dt && dt.files && dt.files.length) {
                handleFiles(dt.files);
            }
        });
    }

    // Lightbox functionality
    function openLightbox(src, caption) {
        if (lightboxModal && lightboxImage) {
            lightboxImage.src = src;
            if (lightboxCaption) lightboxCaption.textContent = caption || 'Project Photo';
            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            if (!reviewModal || !reviewModal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }
    }

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        const backdrop = lightboxModal.querySelector('.lightbox-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeLightbox);
        }
    }

    // Keyboard navigation (Escape key closes modals)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (lightboxModal && lightboxModal.classList.contains('active')) {
                closeLightbox();
            } else if (reviewModal && reviewModal.classList.contains('active')) {
                closeReviewModal();
            }
        }
    });

    function attachPhotoClickListeners(container) {
        const thumbs = container.querySelectorAll('.review-photo-thumb');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const src = this.getAttribute('src');
                const caption = this.getAttribute('alt');
                openLightbox(src, caption);
            });
        });
    }

    function buildStarsHtml(rating) {
        const fullStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(Math.max(0, 5 - rating));
        return `<div class="stars">${fullStars}${emptyStars}</div>`;
    }

    function createReviewElement(review) {
        const article = document.createElement('article');
        article.className = 'testimonial';
        article.style.animation = 'fadeIn 0.6s ease-out';

        let photosHtml = '';
        if (review.photos && review.photos.length) {
            photosHtml = `
                <div class="testimonial-photos">
                    ${review.photos.map((src, i) => `
                        <img src="${src}" alt="Work photo by ${review.name} (${i + 1})" class="review-photo-thumb" loading="lazy">
                    `).join('')}
                </div>
            `;
        }

        article.innerHTML = `
            <div class="testimonial-header">
                ${buildStarsHtml(review.rating || 5)}
                <span class="verified-badge">✓ Verified Customer</span>
            </div>
            ${review.service ? `<span class="testimonial-service">${review.service}</span>` : ''}
            <p>"${review.comment}"</p>
            ${photosHtml}
            <footer>
                <strong>${review.name}</strong>
                <span>Homeowner, ${review.location || 'Columbus'} &bull; ${review.date || 'Recent'}</span>
            </footer>
        `;

        attachPhotoClickListeners(article);
        return article;
    }

    // Load saved customer reviews from localStorage
    function loadSavedReviews() {
        if (!testimonialsGrid) return;
        try {
            const saved = localStorage.getItem('blangos_customer_reviews');
            if (saved) {
                const reviews = JSON.parse(saved);
                if (Array.isArray(reviews)) {
                    // Prepend saved reviews in reverse order so newest is at the top
                    reviews.forEach(review => {
                        const el = createReviewElement(review);
                        testimonialsGrid.insertBefore(el, testimonialsGrid.firstChild);
                    });
                }
            }
        } catch (e) {
            console.error('Error loading saved reviews:', e);
        }
    }

    loadSavedReviews();

    // Attach click listeners to any initial photos
    if (testimonialsGrid) {
        attachPhotoClickListeners(testimonialsGrid);
    }

    // Review form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-review-btn');
            const nameInput = document.getElementById('review-name');
            const locationInput = document.getElementById('review-location');
            const serviceInput = document.getElementById('review-service');
            const commentInput = document.getElementById('review-text');

            const name = nameInput ? nameInput.value.trim() : '';
            const location = locationInput ? locationInput.value.trim() : 'Columbus, OH';
            const service = serviceInput ? serviceInput.value : 'Electrical Service';
            const rating = parseInt(reviewRatingInput ? reviewRatingInput.value : '5', 10);
            const comment = commentInput ? commentInput.value.trim() : '';

            if (!name || !comment) {
                if (reviewFeedback) {
                    reviewFeedback.className = 'review-form-feedback error';
                    reviewFeedback.textContent = 'Please provide both your name and review text.';
                }
                return;
            }

            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting Review...';

            const newReview = {
                id: 'review_' + Date.now(),
                name,
                location,
                service,
                rating,
                comment,
                photos: [...uploadedPhotos],
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };

            // Save to localStorage
            try {
                const existing = JSON.parse(localStorage.getItem('blangos_customer_reviews') || '[]');
                existing.unshift(newReview);
                localStorage.setItem('blangos_customer_reviews', JSON.stringify(existing));
            } catch (err) {
                console.warn('Could not save to localStorage (storage full):', err);
            }

            // Prepend new review card to the grid
            if (testimonialsGrid) {
                const el = createReviewElement(newReview);
                testimonialsGrid.insertBefore(el, testimonialsGrid.firstChild);
            }

            if (reviewFeedback) {
                const photoMsg = uploadedPhotos.length ? ` with ${uploadedPhotos.length} photo${uploadedPhotos.length > 1 ? 's' : ''}` : '';
                reviewFeedback.className = 'review-form-feedback success';
                reviewFeedback.textContent = `Thank you, ${name}! Your review${photoMsg} has been posted.`;
            }

            setTimeout(() => {
                reviewForm.reset();
                uploadedPhotos = [];
                renderPhotoPreviews();
                setRating(5);
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                closeReviewModal();

                // Smooth scroll to the reviews section
                const reviewsSection = document.getElementById('reviews');
                if (reviewsSection) {
                    const headerEl = document.querySelector('.header');
                    const offset = headerEl ? headerEl.offsetHeight + 10 : 80;
                    const targetPosition = reviewsSection.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 1800);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerEl = document.querySelector('.header');
                const offset = headerEl ? headerEl.offsetHeight + 10 : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});