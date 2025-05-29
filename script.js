// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
});
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || '';
        const el = counter.querySelector("div");

        let count = 0;
        const step = target / 200;

        const updateCount = () => {
            count += step;
            if (count < target) {
                el.innerText = Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target + suffix;
            }
        };

        updateCount();
    });
});
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const count = +counter.querySelector('div').innerText;
        const increment = target / speed;

        if (count < target) {
            counter.querySelector('div').innerText = Math.ceil(count + increment) + suffix;
            setTimeout(animateCounters, 1);
        } else {
            counter.querySelector('div').innerText = target + suffix;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter')) {
                animateCounters();
            }

            // Add animation classes when element is in view
            if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('opacity-100');
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-up, .scale-in, .counter').forEach(el => {
    observer.observe(el);
});

// Contact form submission to WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form mengirim data secara default

        // Ganti dengan nomor WhatsApp Anda (gunakan kode negara, tanpa + atau 00)
        // Contoh: 6281234567890 untuk Indonesia
        const whatsappNumber = '6285700498174'; // GANTI DENGAN NOMOR WHATSAPP ANDA

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const serviceSelect = document.getElementById('service');
        const service = serviceSelect.options[serviceSelect.selectedIndex].text;
        const message = document.getElementById('message').value;

        if (!name || !phone || !message) {
            alert('Mohon isi semua field yang wajib (Nama, Nomor Telepon, dan Detail Proyek).');
            return;
        }

        let text = `Halo Daycomp Percetakan,\n\nSaya ingin mengajukan permintaan:\n\n`;
        text += `Nama: ${name}\n`;
        text += `Nomor Telepon: ${phone}\n`;
        if (service && service !== "Pilih Layanan") {
            text += `Layanan: ${service}\n`;
        }
        text += `Detail Proyek: ${message}\n\n`;
        text += `Mohon informasinya. Terima kasih.`;

        const encodedText = encodeURIComponent(text);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // Buka WhatsApp di tab baru
        window.open(whatsappURL, '_blank');

        // Opsional: Reset form setelah submit
        // contactForm.reset();
    });
}
