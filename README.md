# NodeJS Basics

## 1. Understand Node.js

Node.js is a JS runtime built on the V8 JS engine. The V8 engine runs JS inside a browser, surrounded by the browser's DOM context. Node.js takes V8 out of the browser and puts it in a richer environment that gives access to system resources — memory, file system, I/O, network, etc.

---

## 2. Setup, Write and Execute Code

**Installation**
- Download the LTS (Long-term Support) version for stability, or Current for the latest features.
- npm is installed alongside Node into your local bin, which is on your system `PATH`.

**PATH** — an environment variable listing directories where the OS looks for executable programs.
- Lets you run commands from anywhere without typing the full file path.
- When you type a command, the OS searches each directory in PATH until it finds a match.

**Node Version Manager (nvm)** — useful when working on projects with different Node version requirements:
1. Run the install script
2. Create `~/.bashrc` and paste the nvm loader command
3. If `nvm -v` is not found, run `source ~/.bashrc`
4. Install a specific version: `nvm install <version>` or `nvm install node` for the latest

**REPL (Read-Evaluate-Print-Loop)** — type `node` in the terminal to open an interactive JS prompt.

**When to use Node.js**

Node.js is single-threaded and processes events from a queue.

| Characteristic | Description |
|---|---|
| Non-blocking | The event loop picks up and executes events one at a time. Network callbacks are queued and run as soon as the call completes — this is what makes async/await work. |
| Event-driven | Excels at web servers, real-time apps, schema-less data models, and SPA build tools. Not good for heavy CPU tasks, complex math, or blocking operations. |
| Data-intensive | Optimised for streaming and high-throughput data, but not CPU-bound calculations. |
| I/O-intensive | Handles many simultaneous I/O operations efficiently thanks to its non-blocking nature. |

---

## 3. Node.js Module System

- Use `require()` to import and execute another file.
- Each file is **encapsulated** — imported functions are not accessible unless explicitly exported.

---

## 4. Code Organisation — Exports and Imports

To share code between files, use `module.exports`:

```js
// Exporting
module.exports = add;                          // single export
module.exports = { add, subtract };            // multiple exports

// Importing
const add = require('./add.js');
const { add, subtract } = require('./add.js');
```

**`exports` shorthand** — `exports` is an alias for `module.exports`:
```js
exports.add = add;       // ✅ works
exports = add;           // ❌ breaks the reference — do not use
```

Two safe patterns:
1. `exports.add = add`
2. `module.exports = add`

---

## 5. Starting a Web Server

- Use built-in Node APIs: `fs.writeFileSync`, `readline.createInterface`
- Third-party packages are hosted on npm's registry. `npm install` reads `package.json`, downloads the listed dependencies, and makes them available in the project.

---

## 6. Writing a Command Line Utility

- `npm init` — initialises a new project and creates `package.json`
- Add a `"start"` script to `package.json` to run the project with `npm start`
- For custom script names, run with `npm run <script-name>`

## SIMPLE-NODE EXAMPLE

A simple HTTP server built using only Node.js core modules — no Express or third-party frameworks.

### Steps to build

**1. Set up the project**
- Added `"type": "module"` to `package.json` to enable ES Module `import/export` syntax
- Added a `"start"` script so the server can be run with `npm start`

**2. Create the HTTP server (`server/server.js`)**
- Used `http.createServer()` from Node's built-in `node:http` module
- The server listens on port `9000`
- Requests to `/api` are handled as API routes; all other requests are served as static files

**3. Handle API requests (`utils/routeHandlers.js`)**
- `handleGet()` reads data from a local JSON file (`data/data.json`) using `fs/promises`
- Incoming query parameters (e.g. `?age=30`) are parsed from the URL using the built-in `URL` class
- Data is filtered based on those query params before being sent back

**4. Filter data (`utils/getFilteredData.js`)**
- `getFilteredData(data, queryObj)` loops through each query key-value pair and filters the data array to only include matching objects
- Values are parsed with `JSON.parse` so types like booleans and numbers match correctly

**5. Serve static files (`utils/serveStatic.js`)**
- Non-API requests (e.g. `/`, `/index.js`) are mapped to files inside the `frontend/` folder
- Files are read with `fs.readFile` and sent as-is (Buffer) to the browser
- Missing files return a `404 Not Found` response

**6. Detect content type (`utils/getContentType.js`)**
- File extensions (`.js`, `.css`, `.json`, `.png`, etc.) are mapped to their correct MIME types
- Defaults to `text/html` if the extension is unrecognised

**7. Send responses (`utils/sendResponse.js`)**
- A single `sendResponse(res, contentType, status, payload)` utility handles all responses
- Automatically handles three payload types:
  - `Buffer` (static files) → sent as-is
  - `string` (error messages) → sent as-is
  - `object/array` (API data) → serialised with `JSON.stringify`
- CORS headers (`Access-Control-Allow-Origin: *`) are added to every response

