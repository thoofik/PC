// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const programSections = document.querySelectorAll('.program-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            programSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Scroll to top of the program section
            document.getElementById(targetTab).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// Copy code to clipboard functionality
function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    const codeText = codeElement.textContent;
    
    // Create a temporary textarea to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = codeText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('Code copied to clipboard! ✓');
    } catch (err) {
        showToast('Failed to copy code', 'error');
    }
    
    document.body.removeChild(textarea);
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    if (type === 'error') {
        toast.style.background = '#ef4444';
    }
    
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const activeIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
    
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        tabButtons[activeIndex - 1].click();
    } else if (e.key === 'ArrowRight' && activeIndex < tabButtons.length - 1) {
        tabButtons[activeIndex + 1].click();
    }
});

