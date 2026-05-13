// Automated Testing Script for TaskMate
// Run: node tests/app.test.js

const fs = require('fs');
const path = require('path');

// Test Results Tracker
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(category, name, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ [${category}] ${name}`);
  } else {
    testResults.failed++;
    console.log(`❌ [${category}] ${name}`);
    if (details) console.log(`   Details: ${details}`);
  }
  testResults.tests.push({ category, name, passed, details });
}

console.log('🧪 TaskMate Automated Testing\n');
console.log('='.repeat(50));

// ============================================================================
// 8.2 NAVIGATION TESTING - File Structure Validation
// ============================================================================
console.log('\n📱 8.2 Navigation Testing - File Structure');
console.log('-'.repeat(50));

const navFiles = [
  'app/_layout.tsx',
  'app/login.tsx',
  'app/(tabs)/_layout.tsx',
  'app/(tabs)/index.tsx',
  'app/(tabs)/explore.tsx',
  'app/task/[id].tsx'
];

navFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  logTest('Navigation', `File exists: ${file}`, exists);
  
  if (exists) {
    const content = fs.readFileSync(filePath, 'utf8');
    logTest('Navigation', `${file} has content`, content.length > 0);
    
    // Check for navigation imports
    if (file.includes('_layout')) {
      const hasStack = content.includes('Stack') || content.includes('Tabs');
      logTest('Navigation', `${file} has navigator`, hasStack);
    }
  }
});

// ============================================================================
// 8.3 CRUD OPERATIONS - Code Validation
// ============================================================================
console.log('\n📝 8.3 CRUD Operations Testing - Code Validation');
console.log('-'.repeat(50));

const contextFile = path.join(__dirname, '..', 'src/context/TaskContext.tsx');
if (fs.existsSync(contextFile)) {
  const content = fs.readFileSync(contextFile, 'utf8');
  
  logTest('CRUD', 'addTask function exists', content.includes('addTask'));
  logTest('CRUD', 'updateTask function exists', content.includes('updateTask'));
  logTest('CRUD', 'deleteTask function exists', content.includes('deleteTask'));
  logTest('CRUD', 'AsyncStorage integration', content.includes('AsyncStorage'));
  logTest('CRUD', 'STORAGE_KEY defined', content.includes('STORAGE_KEY'));
}

// ============================================================================
// 8.4 STATE MANAGEMENT - Reducer Validation
// ============================================================================
console.log('\n🔄 8.4 State Management Testing - Reducer Validation');
console.log('-'.repeat(50));

const reducerFile = path.join(__dirname, '..', 'src/context/taskReducer.ts');
if (fs.existsSync(reducerFile)) {
  const content = fs.readFileSync(reducerFile, 'utf8');
  
  const actions = ['ADD_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'FETCH_TASKS', 'SET_LOADING', 'SET_ERROR'];
  actions.forEach(action => {
    logTest('State', `Action ${action} defined`, content.includes(action));
  });
  
  logTest('State', 'taskReducer function exists', content.includes('taskReducer'));
  logTest('State', 'TypeScript types defined', content.includes('TaskState') && content.includes('TaskAction'));
}

// ============================================================================
// 8.5 UI/UX - Component Validation
// ============================================================================
console.log('\n🎨 8.5 UI/UX Testing - Component Validation');
console.log('-'.repeat(50));

const uiFiles = [
  { path: 'src/components/TaskCard.tsx', name: 'TaskCard component' },
  { path: 'src/constants/theme.ts', name: 'Theme constants' },
  { path: 'app/login.tsx', name: 'Login screen' },
  { path: 'app/(tabs)/index.tsx', name: 'Task List screen' },
  { path: 'app/task/[id].tsx', name: 'Task Detail screen' }
];

uiFiles.forEach(({ path: filePath, name }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  logTest('UI/UX', `${name} exists`, exists);
  
  if (exists) {
    const content = fs.readFileSync(fullPath, 'utf8');
    logTest('UI/UX', `${name} has JSX/TSX`, content.includes('return') && (content.includes('<') || content.includes('View')));
  }
});

// ============================================================================
// 8.6 PERFORMANCE - Bundle Size Check
// ============================================================================
console.log('\n⚡ 8.6 Performance Testing - File Size Check');
console.log('-'.repeat(50));

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

const sizeChecks = [
  { path: 'app/_layout.tsx', maxSize: 10000, name: 'Root layout' },
  { path: 'src/context/TaskContext.tsx', maxSize: 15000, name: 'TaskContext' },
  { path: 'src/context/taskReducer.ts', maxSize: 10000, name: 'Reducer' }
];

sizeChecks.forEach(({ path: filePath, maxSize, name }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  const size = getFileSize(fullPath);
  const passed = size > 0 && size < maxSize;
  logTest('Performance', `${name} size OK (${size} bytes)`, passed, 
    passed ? '' : `Size ${size} exceeds ${maxSize}`);
});

// ============================================================================
// 8.7 ERROR HANDLING - Validation Check
// ============================================================================
console.log('\n🛡️ 8.7 Error Handling Testing - Code Validation');
console.log('-'.repeat(50));

const errorHandlingFiles = [
  'src/context/TaskContext.tsx',
  'app/login.tsx'
];

errorHandlingFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    logTest('Error Handling', `${file} has try-catch`, content.includes('try') && content.includes('catch'));
    logTest('Error Handling', `${file} has error state`, content.includes('error') || content.includes('Error'));
  }
});

// ============================================================================
// DATA INTEGRITY - Dummy Data Validation
// ============================================================================
console.log('\n💾 Data Integrity Testing - Dummy Data Validation');
console.log('-'.repeat(50));

const dummyDataPath = path.join(__dirname, '..', 'dummy-tasks.json');
if (fs.existsSync(dummyDataPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(dummyDataPath, 'utf8'));
    logTest('Data', 'Dummy data is valid JSON', true);
    logTest('Data', 'Has 30 tasks', data.length === 30);
    
    const hasRequiredFields = data.every(task => 
      task.id && task.title && task.status && task.priority
    );
    logTest('Data', 'All tasks have required fields', hasRequiredFields);
    
    const statuses = ['pending', 'in_progress', 'completed'];
    const validStatuses = data.every(task => statuses.includes(task.status));
    logTest('Data', 'All statuses are valid', validStatuses);
    
    const priorities = ['low', 'medium', 'high'];
    const validPriorities = data.every(task => priorities.includes(task.priority));
    logTest('Data', 'All priorities are valid', validPriorities);
  } catch (e) {
    logTest('Data', 'Dummy data is valid JSON', false, e.message);
  }
}

// ============================================================================
// DOCUMENTATION - File Validation
// ============================================================================
console.log('\n📚 Documentation Testing - File Validation');
console.log('-'.repeat(50));

const docs = [
  { path: 'README.md', minSize: 1000, name: 'README' },
  { path: 'REFLECTION.md', minSize: 300, name: 'REFLECTION' },
  { path: 'LAPORAN_UTS.md', minSize: 1000, name: 'LAPORAN_UTS' }
];

docs.forEach(({ path: filePath, minSize, name }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  logTest('Documentation', `${name} exists`, exists);
  
  if (exists) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const wordCount = content.split(/\s+/).length;
    logTest('Documentation', `${name} has sufficient content (${wordCount} words)`, 
      content.length >= minSize);
  }
});

// ============================================================================
// TYPESCRIPT - Type Safety Check
// ============================================================================
console.log('\n🔷 TypeScript Testing - Type Safety Check');
console.log('-'.repeat(50));

const tsFiles = [
  'src/context/taskReducer.ts',
  'src/hooks/useTasks.ts',
  'src/constants/theme.ts'
];

tsFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    logTest('TypeScript', `${file} has type definitions`, 
      content.includes('interface') || content.includes('type '));
    logTest('TypeScript', `${file} has exports`, content.includes('export'));
  }
});

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(50));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${testResults.total}`);
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(2)}%`);

// Save results to JSON
const resultsPath = path.join(__dirname, 'test-results.json');
fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
console.log(`\n📄 Results saved to: ${resultsPath}`);

// Exit with appropriate code
process.exit(testResults.failed > 0 ? 1 : 0);