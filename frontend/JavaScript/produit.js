const detailProduit = document.getElementById('detailProduit');
const alertPanier = document.getElementById('alertPanier');
const variableVide = '';

// Récuperation de l'id du produit 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const url = "http://localhost:3000/api/cameras/"+ id;
console.log('ID de l\'article choisi : ' + id + '. et URL de l\'article choisi : ' + url);


fetch(url)
    .then(res => res.json())
    .then(res => {

        console.log(res);

        // Affichage de l'article choisi 
        detailProduit.innerHTML = `
        <div class="pageArticle row mx-0" data-id=${res._id}>
            <h1 class="col-10 mt-3">${res.name}</h1>
            <img class="col-11 col-lg-5 my-lg-5 mx-auto px-0" src=${res.imageUrl} alt="">
            <div class="col-11 col-lg-6 mx-auto my-5">
                <p class="">${res.description} <br />
                    <span id="prix" class="font-weight-bold">${(res.price/100)}€</span>
                </p>

                <form action="">
                    <label class="my-3" for="option-select" id="lentiles">Lentile : </label>
                    <select class="form-control" id="select">
                    </select>
                    
                </form>
                <button id="ajouter" class="btn btn-primary my-3">Ajouter au Panier</button>
            </div>
        </div>
    `
    ;

        // Crée les option de personalisation de l'article choisi 
        let lenses = res.lenses;
        console.log('longeur de la liste des option : ' + lenses.length + ' lentiles')
    
        for(let i = 0; i < lenses.length; i++) {
        const option = document.createElement("option");
        const select = document.getElementById("select");
        select.appendChild(option);
        option.innerText = lenses[i];
        option.setAttribute("value", lenses[i]);
        };

        

    let btnAdd = document.getElementById('ajouter');

    btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        ajouterAuPanier(res);
    })
    })


    .catch(e => {
        console.log(e)
    });
    


function ajouterAuPanier(res) {

    let panier = [];
      
    const articleChoisi = {
      _id: res._id,
      imageUrl: res.imageUrl,
      name: res.name,
      quantity: 1,
      price: res.price
    }

    let autre = true;
    if(localStorage.getItem('panier') === null) { // Si panier existe pas dans le storage 
        panier.push(articleChoisi);  // j'ajoute l'article au Tableau
        localStorage.setItem('panier', JSON.stringify(panier));  // Et j'ajoute le Tab panier au storage
    } else {

        panier = JSON.parse(localStorage.getItem('panier'));

        panier.forEach((article) => {
            if(res._id === article._id) {
                article.quantity++;
                localStorage.setItem('panier', JSON.stringify(panier));
                console.log(panier)
                autre = false
            }})
        
        if (autre) panier.push(articleChoisi);
        localStorage.setItem('panier', JSON.stringify(panier));
    }

    location.reload();
    
    //alert("Vôtre produit a été ajouter au panier");
    
}

const panier = JSON.parse(localStorage.getItem("panier"));
bagdeDuPanier()