// carousel-component.js

export function createCourseCarousel({ 
  trackId, 
  buttonContainerId, 
  courses, 
  defaultCategory = null 
}) {
  const track = document.getElementById(trackId);
  const buttonContainer = document.getElementById(buttonContainerId);

  // Get all unique categories
  const categorySet = new Set(courses.map(c => c.category));
  const categories = Array.from(categorySet);

  // Create filter buttons
  buttonContainer.innerHTML = '';
  categories.forEach((category, index) => {
    const btn = document.createElement('button');
    btn.className = 'course-btn btn btn-outline-primary m-1';
    btn.innerText = category;
    if (index === 0 || category === defaultCategory) {
      btn.classList.add('active');
    }
    buttonContainer.appendChild(btn);

    btn.addEventListener('click', () => {
      document.querySelectorAll(`#${buttonContainerId} .course-btn`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCarousel(category);
    });
  });

  // Function to update carousel items
  function updateCarousel(selectedCategory) {
    track.innerHTML = '';
    courses
      .filter(course => course.category === selectedCategory)
      .forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
          <a href="${course.link}" class="text-decoration-none" style="color: inherit;">
            <img src="${course.image}" alt="${course.title}">
            <p>${course.title}</p>
          </a>
        `;
        track.appendChild(card);
      });

    // Reset scroll
    track.closest('.multi-course-carousel-wrapper').scrollTo({ left: 0, behavior: 'smooth' });
  }

  // Initialize
  updateCarousel(defaultCategory || categories[0]);
}
