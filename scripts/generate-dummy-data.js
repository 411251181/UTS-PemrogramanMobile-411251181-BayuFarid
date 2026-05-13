// Script untuk generate dummy data tasks
// Run: node scripts/generate-dummy-data.js

const fs = require('fs');
const path = require('path');

const titles = [
  'Setup CI/CD Pipeline',
  'Implement User Authentication',
  'Design Database Schema',
  'Create API Documentation',
  'Fix Memory Leak Issue',
  'Optimize Query Performance',
  'Add Unit Tests',
  'Update Dependencies',
  'Refactor Legacy Code',
  'Implement Dark Mode',
  'Add Push Notifications',
  'Create Admin Dashboard',
  'Integrate Payment Gateway',
  'Setup Monitoring System',
  'Implement Caching Layer',
  'Add Internationalization',
  'Create Mobile App',
  'Setup Load Balancer',
  'Implement Rate Limiting',
  'Add Analytics Tracking',
  'Create User Onboarding',
  'Fix Security Vulnerabilities',
  'Optimize Bundle Size',
  'Add E2E Tests',
  'Implement WebSocket',
  'Create Backup System',
  'Add Search Functionality',
  'Implement File Upload',
  'Create Email Templates',
  'Add Social Login',
];

const descriptions = [
  'Implement automated deployment pipeline with GitHub Actions',
  'Add JWT-based authentication with refresh tokens',
  'Design normalized database schema for better performance',
  'Create comprehensive API documentation using Swagger',
  'Investigate and fix memory leak in production',
  'Optimize slow database queries using indexes',
  'Add comprehensive unit tests for critical functions',
  'Update all dependencies to latest stable versions',
  'Refactor old codebase to modern patterns',
  'Implement dark mode theme with user preference',
  'Add push notification support for mobile apps',
  'Create admin dashboard for system management',
  'Integrate Stripe payment gateway for subscriptions',
  'Setup monitoring with Prometheus and Grafana',
  'Implement Redis caching for frequently accessed data',
  'Add multi-language support with i18n',
  'Develop mobile application using React Native',
  'Setup load balancer for high availability',
  'Implement API rate limiting to prevent abuse',
  'Add Google Analytics and custom event tracking',
  'Create smooth user onboarding experience',
  'Fix identified security vulnerabilities from audit',
  'Optimize JavaScript bundle size for faster loading',
  'Add end-to-end tests using Cypress',
  'Implement real-time communication with WebSocket',
  'Create automated backup system for database',
  'Add full-text search functionality',
  'Implement secure file upload with validation',
  'Create responsive email templates',
  'Add OAuth login with Google and Facebook',
];

const assignees = [
  'Bayu Farid',
  'Andi Wijaya',
  'Siti Nurhaliza',
  'Budi Santoso',
  'Dewi Lestari',
  'Eko Prasetyo',
  'Fitri Handayani',
  'Gunawan Setiawan',
];

const statuses = ['pending', 'in_progress', 'completed'];
const priorities = ['low', 'medium', 'high'];

function generateDummyTasks(count = 30) {
  const tasks = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const createdDate = new Date(now);
    createdDate.setDate(now.getDate() - Math.floor(Math.random() * 30));

    const dueDate = new Date(createdDate);
    dueDate.setDate(createdDate.getDate() + Math.floor(Math.random() * 14) + 1);

    const task = {
      id: `task_${Date.now()}_${i}`,
      title: titles[i % titles.length],
      description: descriptions[i % descriptions.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      dueDate: dueDate.toISOString().split('T')[0],
      createdAt: createdDate.toISOString(),
    };

    tasks.push(task);
  }

  return tasks;
}

// Generate 30 tasks
const dummyTasks = generateDummyTasks(30);

// Save to JSON file
const outputPath = path.join(__dirname, '..', 'dummy-tasks.json');
fs.writeFileSync(outputPath, JSON.stringify(dummyTasks, null, 2));

console.log(`✅ Generated ${dummyTasks.length} dummy tasks`);
console.log(`📁 Saved to: ${outputPath}`);
console.log('\nSummary:');
console.log(`- Pending: ${dummyTasks.filter(t => t.status === 'pending').length}`);
console.log(`- In Progress: ${dummyTasks.filter(t => t.status === 'in_progress').length}`);
console.log(`- Completed: ${dummyTasks.filter(t => t.status === 'completed').length}`);
console.log(`\n- Low Priority: ${dummyTasks.filter(t => t.priority === 'low').length}`);
console.log(`- Medium Priority: ${dummyTasks.filter(t => t.priority === 'medium').length}`);
console.log(`- High Priority: ${dummyTasks.filter(t => t.priority === 'high').length}`);