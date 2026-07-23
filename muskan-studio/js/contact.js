/* ============================================
   MUSKAN STUDIO — Contact Form
   ============================================ */

(function() {
    'use strict';

    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');

    if (!form) return;

    // Validation rules
    const validators = {
        name: {
            validate: function(value) { return value.trim().length >= 2; },
            message: 'Please enter your name (min 2 characters).'
        },
        email: {
            validate: function(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); },
            message: 'Please enter a valid email address.'
        },
        subject: {
            validate: function(value) { return value.trim().length >= 2; },
            message: 'Please enter a subject.'
        },
        message: {
            validate: function(value) { return value.trim().length >= 10; },
            message: 'Please enter at least 10 characters.'
        }
    };

    function validateField(input) {
        const name = input.getAttribute('name');
        const value = input.value;
        const errorEl = input.parentElement.querySelector('.form-error');
        const validator = validators[name];

        if (!validator) return true;

        if (!validator.validate(value)) {
            input.classList.add('error');
            if (errorEl) errorEl.textContent = validator.message;
            return false;
        } else {
            input.classList.remove('error');
            if (errorEl) errorEl.textContent = '';
            return true;
        }
    }

    // Real-time validation on blur
    form.querySelectorAll('.form-input').forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        form.querySelectorAll('.form-input').forEach(function(input) {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(function() {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            form.reset();
            successMessage.classList.add('show');

            setTimeout(function() {
                successMessage.classList.remove('show');
            }, 5000);
        }, 1500);
    });

})();