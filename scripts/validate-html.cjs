#!/usr/bin/env node

/**
 * Validates public/Live_track_db_manager.html
 * - Checks file existence and integrity
 * - Extracts and syntax-checks embedded JavaScript
 * - Confirms essential UI containers and version elements are present
 */

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../public/Live_track_db_manager.html');

console.log('[HTML Validator] Checking:', filePath);

if (!fs.existsSync(filePath)) {
  console.error('[HTML Validator] Error: File does not exist:', filePath);
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');

// 1. Verify required DOM elements
const requiredIdentifiers = [
  'id="calendarGrid"',
  'id="selectMonth"',
  'id="selectYear"',
  'id="btnRefresh"',
  'id="btnDeleteMonth"',
  'id="btnAuthHeader"',
  'id="authDrawer"',
  'id="authDrawerHandle"',
  'id="detailsModal"',
  'id="modalLeafletMap"',
  'id="historyTableBody"',
  'id="footer"',
  'id="version"'
];

let missing = [];
for (const id of requiredIdentifiers) {
  if (!html.includes(id)) {
    missing.push(id);
  }
}

if (missing.length > 0) {
  console.error('[HTML Validator] Missing required UI identifiers:', missing);
  process.exit(1);
}

// 2. Extract and syntax check embedded script
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('[HTML Validator] Error: No embedded <script> tag found.');
  process.exit(1);
}

try {
  new Function(scriptMatch[1]);
  console.log('[HTML Validator] Embedded JavaScript syntax: VALID');
} catch (err) {
  console.error('[HTML Validator] JavaScript syntax error:', err.message);
  process.exit(1);
}

// 3. Verify version is present
const versionMatch = html.match(/id="version">([^<]+)<\/span>/);
if (versionMatch) {
  console.log('[HTML Validator] Application Version:', versionMatch[1]);
} else {
  console.warn('[HTML Validator] Warning: Could not parse version span');
}

console.log('[HTML Validator] All checks passed successfully!');
process.exit(0);
