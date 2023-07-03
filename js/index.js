// let works = [];
let travaux = [];

fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then((works) => 
{
    let id = 0;
    travaux = works;
    displayWorks(works)
});

fetch("http://localhost:5678/api/categories")
.then(reponse => reponse.json())
.then((categories) => 
{
    displayCategories(categories)
});

function displayWorks(works)
{
    let gallery = document.querySelector(".gallery").innerHTML = '';
    gallery = document.querySelector(".gallery");
    works.forEach(work => 
    {
            const figure = document.createElement("figure");
            gallery.appendChild(figure);
        
            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;
            figure.appendChild(img);

            const caption = document.createElement("figcaption");
            caption.innerHTML = work.title;
            figure.appendChild(caption);
    });
};

function displayCategories (categories)
{
    const filterListButtons = document.querySelector(".myprojects");
    const button = createFilterButtons(0, "Tous");
    filterListButtons.appendChild(button);

    categories.forEach(category => 
    {        
        const button = createFilterButtons(category.id, category.name);                
        filterListButtons.appendChild(button);
    });
};

function createFilterButtons(id, name)
{
    const button = document.createElement("button");
    
    button.classList = "button-myprojects";
    button.innerText = name;
    button.dataset.id = id;
    createListener (button)
    return button;            
};

function createListener(button)
{
    button.addEventListener("click", function (event)
    {
        const ident = event.target.dataset.id;
        let worksFiltered = travaux;
        console.log("ident")
        console.log(ident)
        console.log(travaux)
        if (ident != 0)
        {
            for(let i = travaux.length -1; i>=0; i--)
            {
                if (travaux[i].categoryId != ident) {
                    worksFiltered.splice(i,1)
                }
            }
        };
        console.log(worksFiltered)
        displayWorks(worksFiltered)
    });
};
