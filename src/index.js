document.addEventListener("DOMContentLoaded",()=>{
 /*fetching categories */
    fetch('http://localhost:3000/categories')
    .then (resp=>resp.json())
    .then (data=>placingCategories(data))
    .catch(() => {
            return console.log("Error when fetching categories");
        })

    function placingCategories(categories){
        const categoryMainConatiner=document.querySelector('#Activities_planned')
        categoryMainConatiner.innerHTML=''
        categories.forEach(category => {
            const categoryContainer=document.createElement('div')
            categoryContainer.className='category-item';
            categoryContainer.textContent=category.name;
            categoryMainConatiner.appendChild(categoryContainer);
            
        });

    }

    
})