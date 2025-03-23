// Sample projects data
let projects = [
    {
        id: 1,
        name: 'Modern Villa Construction',
        client: 'John Doe',
        startDate: '2024-01-15',
        endDate: '2024-06-15',
        status: 'ongoing',
        progress: 45,
        description: 'Construction of modern villa with 3 bedrooms'
    },
    {
        id: 2,
        name: 'Office Complex Renovation',
        client: 'Tech Corp',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        status: 'planning',
        progress: 10,
        description: 'Renovation of existing office complex'
    }
];

// Initialize projects page
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    updateProjectStats();
});

// Load projects into table
function loadProjects() {
    const tableBody = document.getElementById('projectsTableBody');
    tableBody.innerHTML = '';

    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.client}</td>
            <td>${formatDate(project.startDate)}</td>
            <td><span class="status-badge ${project.status}">${project.status}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.progress}%"></div>
                    <span>${project.progress}%</span>
                </div>
            </td>
            <td>
                <button class="btn btn-small" onclick="viewProject(${project.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-small" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update project statistics
function updateProjectStats() {
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('ongoingProjects').textContent = 
        projects.filter(project => project.status === 'ongoing').length;
    document.getElementById('completedProjects').textContent = 
        projects.filter(project => project.status === 'completed').length;
}

// Filter projects
function filterProjects() {
    const searchText = document.querySelector('.table-filters input').value.toLowerCase();
    const filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(searchText) ||
               project.client.toLowerCase().includes(searchText);
    });
    renderFilteredProjects(filteredProjects);
}

// Filter by status
function filterProjectStatus() {
    const status = document.querySelector('.table-filters select').value;
    const filteredProjects = status === 'all' 
        ? projects 
        : projects.filter(project => project.status === status);
    renderFilteredProjects(filteredProjects);
}

// Render filtered projects
function renderFilteredProjects(filteredProjects) {
    const tableBody = document.getElementById('projectsTableBody');
    tableBody.innerHTML = '';

    filteredProjects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.client}</td>
            <td>${formatDate(project.startDate)}</td>
            <td><span class="status-badge ${project.status}">${project.status}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.progress}%"></div>
                    <span>${project.progress}%</span>
                </div>
            </td>
            <td>
                <button class="btn btn-small" onclick="viewProject(${project.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-small" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Handle adding new project
async function handleAddProject(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newProject = {
        id: projects.length + 1,
        name: formData.get('name'),
        client: formData.get('client'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        status: formData.get('status'),
        progress: 0,
        description: formData.get('description')
    };

    projects.push(newProject);
    loadProjects();
    updateProjectStats();
    closeAddProjectModal();
    showNotification('Project added successfully', 'success');
}

// View project details
function viewProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        // Implement view functionality
        alert(`Viewing project: ${project.name}\n\nClient: ${project.client}\nDescription: ${project.description}`);
    }
}

// Edit project
function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        // Implement edit functionality
        alert(`Editing project: ${project.name}`);
    }
}

// Delete project
function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(project => project.id !== projectId);
        loadProjects();
        updateProjectStats();
        showNotification('Project deleted successfully', 'success');
    }
}

// Modal functions
function openAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'block';
}

function closeAddProjectModal() {
    document.getElementById('addProjectModal').style.display = 'none';
    document.getElementById('addProjectForm').reset();
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addProjectModal');
    if (event.target === modal) {
        closeAddProjectModal();
    }
}
