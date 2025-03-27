document.addEventListener("DOMContentLoaded", () => {
  /*fetching categories */
  let categories;
  fetch("http://localhost:3000/categories")
    .then((resp) => resp.json())
    .then((cats) => {
      categories = cats;
      fetch("http://localhost:3000/activities")
        .then((resp) => resp.json())
        .then((activities) => {
          placingCategories(cats, activities);
          console.log("Activities:", activities);
          console.log("Categories:", categories);
          console.log("Activities:", activities);
          console.log("First activity's categoryId:", activities[0].categoryId);
          placingCategories(categories, activities);
          return activities;
        })

        .catch((error) => console.log("Error when fetching categories", error));
    });

  function placingCategories(categories, allActivities) {
    const categoryMainConatiner = document.querySelector("#Activities_planned");
    categoryMainConatiner.innerHTML = "";

    categories.forEach((category) => {
      const categoryContainer = document.createElement("div");
      categoryContainer.className = "category-item";

      const categoryName = document.createElement("h3");
      categoryName.textContent = category.name;

      categoryContainer.appendChild(categoryName);
      console.log("string123",allActivities)
      /* find activities for this category*/
      const categoryActivities = allActivities.filter(
        (activity) => activity.categoryId == category.id
      );
      console.log(categoryActivities);
      /*Creating list for activities */
      const activitiesList = document.createElement("ul");

      categoryActivities.forEach((activity) => {
        const activityItem = document.createElement("li");
        activityItem.innerHTML = `
                <strong>${activity.name}</strong>
                Date:${activity.date}<br>
                ${activity.description}`;
        activitiesList.appendChild(activityItem);
      });
      categoryContainer.appendChild(activitiesList);

      categoryMainConatiner.appendChild(categoryContainer);
    });
  }
});
