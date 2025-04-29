function toggleFaqModal() {
    const modal = document.getElementById('faqModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function updateIcon(container) {
const icon = container.querySelector('.faq-question i');
if (!icon) return;

if (container.classList.contains('active')) {
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
} else {
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
}
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const container = element.parentElement;
    const isOpen = answer.style.maxHeight;

    // Close all other answers
    document.querySelectorAll('.faq-answer').forEach(item => {
        item.style.maxHeight = null;
        item.parentElement.classList.remove('active');
        updateIcon(item.parentElement);
    });

    // Toggle the clicked answer
    if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        container.classList.add('active');
    }
    updateIcon(container);
}