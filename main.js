import { createCourseCarousel } from './carousel-component.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('courses.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not OK');
      return response.json();
    })
    .then(allCourses => {
      const popularCourses = allCourses.filter(c =>
        ['Computer Science', 'Finances', 'Languages'].includes(c.category)
      );
      const recentCourses = allCourses.filter(c =>
        ['History', 'Programming'].includes(c.category)
      );

      if (
        document.getElementById('carousel-track-popular') &&
        document.getElementById('category-buttons-popular')
      ) {
        createCourseCarousel({
          trackId: 'carousel-track-popular',
          buttonContainerId: 'category-buttons-popular',
          courses: popularCourses,
          defaultCategory: 'Computer Science'
        });
      }

      if (
        document.getElementById('carousel-track-recent') &&
        document.getElementById('category-buttons-recent')
      ) {
        createCourseCarousel({
          trackId: 'carousel-track-recent',
          buttonContainerId: 'category-buttons-recent',
          courses: recentCourses,
          defaultCategory: 'History'
        });
      }

      if (document.getElementById('search-input') && document.getElementById('search-results')) {
        setupSearch(allCourses);
      }
    })
    .catch(err => {
      console.error('Failed to load courses:', err);
    });
});

function setupSearch(allCourses) {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (!query) {
      resultsContainer.style.display = 'none';
      return;
    }

    const matches = allCourses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      (course.keywords && course.keywords.some(k => k.toLowerCase().includes(query)))
    );

    if (matches.length === 0) {
      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = '<li class="dropdown-item text-muted">No courses found.</li>';
      return;
    }

    matches.forEach(course => {
      const item = document.createElement('li');
      item.className = 'dropdown-item';
      item.innerHTML = `<a href="${course.link}" class="text-decoration-none text-dark d-block">${course.title}</a>`;
      resultsContainer.appendChild(item);
    });

    resultsContainer.style.display = 'block';
  });

  document.addEventListener('click', e => {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer.contains(e.target)) {
      resultsContainer.style.display = 'none';
    }
  });
}
