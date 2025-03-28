# Activity Planner

A web-based Activity Planner that allows users to **add, edit, and delete activities** within different categories. This project interacts with a local JSON server (`db.json`) to persist data.

---

## Features
- **View Activities** categorized properly.
- **Add New Activities** using the `Add+` button.
- **Edit Existing Activities** via the `Edit` button.
- **Delete Activities** using the `Delete` button.
- **Cancel Edit/Add Form** functionality for a smooth user experience.

---

## Technologies Used
- **HTML, CSS** - For structure & styling.
- **JavaScript (ES6)** -Handles dynamic behavior & API interactions.
- **JSON Server** -Acts as a simple backend (`db.json` file).

---

##  Project Structure
index.html 
db.json
README.md
style.css
index.js

## 🚀 How to Run the Project
### 1️ Install JSON Server
Make sure you have **Node.js** installed, then install JSON Server globally:
```sh
npm install -g json-server
```

### 2️ Start the JSON Server
Run the following command to start the backend:
```sh
json-server --watch db.json --port 3000
```

### 3️ Open the Project
Simply open `index.html` in your browser, and the app will fetch data from `db.json`.

---

## API Endpoints
This project interacts with the following API endpoints:
- **GET `/categories`** - Fetch all categories.
- **GET `/activities`** - Retrieve all activities.
- **POST `/activities`** - Add a new activity.
- **PATCH `/activities/:id`** -Update an existing activity.
- **DELETE `/activities/:id`** - Remove an activity.

---

##  Functionality Breakdown
### 1 Add New Activity
1. Click the Add+ button under a category.
2. A form appears allowing you to input activity details.
3. Click submit, and the activity is added to db.json.

### Edit an Activity
1. Click the Edit button next to an activity.
2. The form pre-fills with the existing details.
3. Make your changes and click Submit to update.
4. Click Cancel to close the form without changes.

### Delete an Activity
1. Click the Delete button next to an activity.
2. The activity is immediately removed from db.json.

---

##  UI Design
- The activity list is grouped by category.
- Forms open beside the activity categories.
- Smooth user experience with intuitive buttons.

---

## Contributing
If you'd like to improve this project, feel free to submit a pull request or report issues.

---

##  License
This project is open-source under the MIT License.