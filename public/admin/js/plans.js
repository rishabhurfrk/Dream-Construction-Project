// Plans Management JavaScript

// Global variables
let plans = [
    {
        id: 1,
        name: 'Modern Villa',
        type: 'residential',
        price: 2500,
        status: 'active',
        featured: true,
        description: 'Modern 3-bedroom villa design'
    },
    {
        id: 2,
        name: 'Office Complex',
        type: 'commercial',
        price: 5000,
        status: 'active',
        featured: false,
        description: 'Contemporary office space design'
    }
];

// Initialize plans page
document.addEventListener('DOMContentLoaded', function() {
    loadPlans();
    updatePlanStats();
});

// Load plans into table
function loadPlans() {
    const tableBody = document.getElementById('plansTableBody');
    tableBody.innerHTML = '';

    plans.forEach(plan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plan.name}</td>
            <td>${plan.type}</td>
            <td>$${plan.price}</td>
            <td><span class="status-badge ${plan.status}">${plan.status}</span></td>
            <td>
                <button class="btn btn-small" onclick="viewPlan(${plan.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-small" onclick="editPlan(${plan.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deletePlan(${plan.id})">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-small ${plan.featured ? 'btn-primary' : ''}" 
                        onclick="toggleFeatured(${plan.id})">
                    <i class="fas fa-star"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update plan statistics
function updatePlanStats() {
    document.getElementById('totalPlans').textContent = plans.length;
    document.getElementById('activePlans').textContent = 
        plans.filter(plan => plan.status === 'active').length;
    document.getElementById('featuredPlans').textContent = 
        plans.filter(plan => plan.featured).length;
}

// Filter plans
function filterPlans() {
    const searchText = document.querySelector('.table-filters input').value.toLowerCase();
    const filteredPlans = plans.filter(plan => {
        return plan.name.toLowerCase().includes(searchText) ||
               plan.description.toLowerCase().includes(searchText);
    });
    renderFilteredPlans(filteredPlans);
}

// Filter by type
function filterPlanType() {
    const type = document.querySelector('.table-filters select').value;
    const filteredPlans = type === 'all' 
        ? plans 
        : plans.filter(plan => plan.type === type);
    renderFilteredPlans(filteredPlans);
}

// Render filtered plans
function renderFilteredPlans(filteredPlans) {
    const tableBody = document.getElementById('plansTableBody');
    tableBody.innerHTML = '';

    filteredPlans.forEach(plan => {
        // Similar to loadPlans() rendering
    });
}

// Modal functions
function openAddPlanModal() {
    document.getElementById('addPlanModal').style.display = 'block';
}

function closeAddPlanModal() {
    document.getElementById('addPlanModal').style.display = 'none';
}

// Handle adding new plan
async function handleAddPlan(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newPlan = {
        id: plans.length + 1,
        name: formData.get('name'),
        type: formData.get('type'),
        price: parseFloat(formData.get('price')),
        status: 'active',
        featured: false,
        description: formData.get('description')
    };

    plans.push(newPlan);
    loadPlans();
    updatePlanStats();
    closeAddPlanModal();
    showNotification('Plan added successfully', 'success');
}

// View plan details
function viewPlan(planId) {
    const plan = plans.find(p => p.id === planId);
    // Implement view functionality
    console.log('View plan:', plan);
}

// Edit plan
function editPlan(planId) {
    // Implement edit functionality
    console.log('Edit plan:', planId);
}

// Delete plan
function deletePlan(planId) {
    if (confirm('Are you sure you want to delete this plan?')) {
        plans = plans.filter(plan => plan.id !== planId);
        loadPlans();
        updatePlanStats();
        showNotification('Plan deleted successfully', 'success');
    }
}

// Toggle featured status
function toggleFeatured(planId) {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
        plan.featured = !plan.featured;
        loadPlans();
        updatePlanStats();
        showNotification(
            `Plan ${plan.featured ? 'marked as featured' : 'removed from featured'}`,
            'success'
        );
    }
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
