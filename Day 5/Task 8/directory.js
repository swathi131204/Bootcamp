const fs = require('fs');
const path = require('path');

function traverseDirectory(dir, indent = '') {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);
            
            console.log(indent + (stats.isDirectory() ? '[DIR] ' : '[FILE] ') + file);
            
            if (stats.isDirectory()) {
                traverseDirectory(fullPath, indent + '  ');
            }
        });
    } catch (error) {
        console.error('Error reading directory:', error.message);
    }
}

const startDir = process.argv[2] || __dirname; // Default to current directory if no argument is provided
console.log('Traversing directory:', startDir);
traverseDirectory(startDir);
