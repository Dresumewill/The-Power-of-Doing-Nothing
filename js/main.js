document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const backToTop = document.getElementById('back-to-top');
    const yearEl = document.getElementById('year');
    const leadForm = document.getElementById('lead-form');
    const feedbackEl = document.querySelector('.form__feedback');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navList.classList.toggle('is-open');
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Back to top visibility
    const toggleBackToTop = () => {
        if (!backToTop) return;
        if (window.scrollY > 350) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lead form submission handler
    if (leadForm) {
        leadForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!feedbackEl) return;

            const formData = new FormData(leadForm);
            const submission = Object.fromEntries(formData.entries());

            feedbackEl.textContent = 'Sending your toolkit...';
            leadForm.classList.add('is-submitting');
            leadForm.querySelector('button[type="submit"]').disabled = true;

            try {
                const response = await fetch('tables/book_leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission)
                });

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                leadForm.reset();
                feedbackEl.textContent = "You're on the list! Check your inbox for the toolkit.";
                feedbackEl.classList.remove('is-error');
                feedbackEl.classList.add('is-success');
            } catch (error) {
                feedbackEl.textContent = 'Something went wrong. Please try again in a moment.';
                feedbackEl.classList.remove('is-success');
                feedbackEl.classList.add('is-error');
                console.error('Lead form submission error:', error);
            } finally {
                leadForm.classList.remove('is-submitting');
                leadForm.querySelector('button[type="submit"]').disabled = false;
            }
        });
    }
});
