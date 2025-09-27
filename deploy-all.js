#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_URL = 'https://github.com/RJayanth/machine-coding.git';
const GH_PAGES_BRANCH = 'gh-pages';

const rootDir = process.cwd();

fs.readdirSync(rootDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const projectDir = path.join(rootDir, dirent.name);
    const packageJsonPath = path.join(projectDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      console.log(`\n🚀 Deploying project: ${dirent.name}`);

      try {
        // Install dependencies if node_modules doesn't exist
        if (!fs.existsSync(path.join(projectDir, 'node_modules'))) {
          console.log('Installing dependencies...');
          execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
        }

        // Build the project
        console.log('Building project...');
        execSync('npm run build', { cwd: projectDir, stdio: 'inherit' });

        // Deploy to gh-pages under subfolder
        console.log('Deploying to gh-pages...');
        execSync(
          `npx gh-pages -d build -b ${GH_PAGES_BRANCH} -r ${REPO_URL} -f --dest ${dirent.name}`,
          { cwd: projectDir, stdio: 'inherit' }
        );

        console.log(`✅ Successfully deployed ${dirent.name}`);
      } catch (err) {
        console.error(`❌ Failed to deploy ${dirent.name}`);
        console.error(err.message);
      }
    }
  });

console.log('\n🎉 All deployable projects processed!');
