
# Project Setup and Installation

Follow these steps to get your local development environment up and running.

## Prerequisites
Make sure you have the following installed on your system:
* **Node.js** (v16.x or higher) and **npm**
* **Python** (v3.8 or higher) and **pip**
* **Git**

---

## 1. Local Setup Instructions

### Clone the Repository
Open terminal or VS Code and run:
```bash
git clone [https://github.com/ajzamora29/fsh-cenral-luzon.git](https://github.com/ajzamora29/fsh-cenral-luzon.git)
cd fsh-cenral-luzon
```

### Frontend Setup
> **Note:** This project uses **React** (Create React App), not Vite.

1. Open a terminal and navigate to the frontend folder:

   ```bash
   cd frontend


2. Install the required Node packages (includes **React**, **D3.js**, and other project dependencies):

```bash
npm install

```


*(Optional: If setting up from scratch, install D3 manually with: `npm install d3`)*

3. Start the frontend development server:
```bash
npm start

```



---

### Backend Setup

1. Open a second terminal window and navigate to the backend folder:
```bash
cd backend

```


2. *(Optional, but recommended)* Create and activate a virtual environment:
* **macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate

```


* **Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate

```




3. Install dependencies:
```bash
pip install -r requirements.txt

```


4. Run the Python backend server:
```bash
python app.py

```



---

## How to Update Code on GitHub

When you make changes to the application and want to push updates to your repository, follow these steps:

1. **Pull latest changes** from GitHub (to prevent merge conflicts):
```bash
git pull origin main

```


*(Replace `main` with your target branch name if different)*
2. **Check changed files:**
```bash
git status

```


3. **Stage your changes:**
```bash
git add .

```


4. **Commit your updates** (following Semantic Versioning):
```bash
git commit -m "feat: release version vX.Y.Z - updated frontend/backend"

```


5. **Push updates to GitHub:**
```bash
git push origin main

```



---

## Versioning Format (`vX.Y.Z`)

This project follows **Semantic Versioning 2.0.0** (`vX.Y.Z` format):

* **`X` (MAJOR version):** Incremented when you make incompatible API changes or breaking updates.
* *Example:* `v1.0.0` ➔ `v2.0.0`


* **`Y` (MINOR version):** Incremented when you add new functionality in a backward-compatible manner.
* *Example:* `v1.0.0` ➔ `v1.1.0`


* **`Z` (PATCH version):** Incremented when you make backward-compatible bug fixes or minor tweaks.
* *Example:* `v1.0.0` ➔ `v1.0.1`



### Git Tagging Example (Optional)

To explicitly release a new version tag on GitHub:

```bash
git tag -a v1.0.0 -m "Release Version 1.0.0"
git push origin v1.0.0

```
