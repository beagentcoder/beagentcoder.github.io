// script.js

// Function to fetch and display projects from the API
async function fetchProjects() {
    const projectGrid = document.getElementById('project-grid'); // Target container

    try {
        const response = await fetch('http://localhost:3200/api/git-repo/?username=beagentcoder');
        if (!response.ok) throw new Error('Failed to fetch projects');

        const projects = await response.json(); // Convert response to JSON

        // Clear the grid before adding new projects 
        projectGrid.innerHTML = '';

        // Iterate over the projects and dynamically generate HTML
        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');

            projectItem.innerHTML = `
                <div class="project-image">
                    <img src="project-thumbnail.png" alt="${project.name}" />
                </div>
                <div class="project-title">${project.name}</div>
                <p>${project.description || 'No description available'}</p>
                <a href="${project.url}" target="_blank">↗ View on GitHub</a>
            `;

            // Append each project item to the grid
            projectGrid.appendChild(projectItem);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        projectGrid.innerHTML = '<p>Unable to load projects at the moment.</p>';
    }
}

// Fetch and display projects when the DOM content is loaded
window.addEventListener('DOMContentLoaded', fetchProjects);
