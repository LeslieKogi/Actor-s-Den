document.addEventListener("DOMContentLoaded", () => {
    let categories;
    let activities = [];

    fetch("http://localhost:3000/categories")
        .then((resp) => resp.json())
        .then((cats) => {
            categories = cats;
            return fetch("http://localhost:3000/activities");
        })
        .then((resp) => resp.json())
        .then((data) => {
            activities = data;
            displayCategories(categories, activities);
        })
        .catch((error) => console.log("Error fetching data:", error));

    function displayCategories(categories, allActivities) {
        const categoryContainer = document.querySelector("#Activities_planned");
        categoryContainer.innerHTML = "";

        categories.forEach((category) => {
            const categoryDiv = document.createElement("div");
            categoryDiv.className = "category-item";
            categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

            const activityList = document.createElement("ul");

            const categoryActivities = allActivities.filter(
                (activity) => activity.categoryId == category.id
            );

            categoryActivities.forEach((activity) => {
                const activityItem = document.createElement("li");
                activityItem.innerHTML = `
                    <strong>${activity.name}</strong> - ${activity.date}<br>
                    ${activity.description}
                    <button class="edit-btn" data-id="${activity.id}">Edit</button>
                    <button class="delete-btn" data-id="${activity.id}">Delete</button>
                `;

                activityItem.querySelector(".edit-btn").addEventListener("click", () => openEditForm(activity));
                activityItem.querySelector(".delete-btn").addEventListener("click", () => deleteActivity(activity.id));

                activityList.appendChild(activityItem);
            });

            const addButton = document.createElement("button");
            addButton.textContent = "Add+";
            addButton.addEventListener("click", () => openAddForm(category.id));

            categoryDiv.appendChild(activityList);
            categoryDiv.appendChild(addButton);
            categoryContainer.appendChild(categoryDiv);
        });
    }

    function openEditForm(activity) {
        document.querySelector("#edit-id").value = activity.id;
        document.querySelector("#edit-name").value = activity.name;
        document.querySelector("#edit-date").value = activity.date;
        document.querySelector("#edit-description").value = activity.description;
        document.querySelector("#editform").style.display = "block";
    }

    function openAddForm(categoryId) {
        document.querySelector("#add-categoryId").value = categoryId;
        document.querySelector("#addform").style.display = "block";
    }

    document.querySelector("#editform").addEventListener("submit", (e) => {
        e.preventDefault();
        const activityId = document.querySelector("#edit-id").value;
        const updatedActivity = {
            name: document.querySelector("#edit-name").value,
            date: document.querySelector("#edit-date").value,
            description: document.querySelector("#edit-description").value
        };

        fetch(`http://localhost:3000/activities/${activityId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedActivity)
        })
        .then((resp) => resp.json())
        .then(() => {
            document.querySelector("#editform").style.display = "none"; // 🔹 Hide form after submission
            location.reload();
        });
    });

    document.querySelector("#addform").addEventListener("submit", (e) => {
        e.preventDefault();
        const newActivity = {
            name: document.querySelector("#add-name").value,
            date: document.querySelector("#add-date").value,
            description: document.querySelector("#add-description").value,
            categoryId: parseInt(document.querySelector("#add-categoryId").value)
        };

        fetch("http://localhost:3000/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newActivity)
        })
        .then((resp) => resp.json())
        .then(() => {
            document.querySelector("#addform").style.display = "none"; // 🔹 Hide form after adding activity
            location.reload();
        });
    });

    function deleteActivity(activityId) {
        fetch(`http://localhost:3000/activities/${activityId}`, {
            method: "DELETE"
        })
        .then(() => location.reload());
    }

    // Cancel Button Functionalities
    document.querySelectorAll(".cancel-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelector("#editform").style.display = "none";
            document.querySelector("#addform").style.display = "none";
        });
    });
});
