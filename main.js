// Fetch publications data from JSON file
async function loadPublications() {
    try {
        const response = await fetch('./data/publications.json');
        const data = await response.json();
        displayPublications(data.publications);
    } catch (error) {
        console.error('Error loading publications:', error);
        const publicationsList = document.getElementById('publicationsList');
        publicationsList.innerHTML = '<li class="loading">Error loading publications. Please try again.</li>';
    }
}

// Function to format and display publications
function displayPublications(publicationsData) {
    const publicationsList = document.getElementById('publicationsList');
    publicationsList.innerHTML = '';

    publicationsData.forEach((pub, index) => {
        const publicationItem = document.createElement('li');
        publicationItem.className = 'publication-item';
        publicationItem.innerHTML = `
            <div class="title">${pub.title}</div>
            <div class="authors">${pub.authors} (${pub.year})</div>
            <div class="details">${pub.venue}</div>
            <div style="margin-top: 10px; font-size: 0.95em; color: #555; line-height: 1.6;">${pub.details}</div>
            <span class="type">${pub.type}</span>
        `;
        publicationsList.appendChild(publicationItem);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Load publications when page loads
window.addEventListener('DOMContentLoaded', loadPublications);

// Add animation on scroll for interest cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.interest-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});