const affichageArticle = document.getElementById('listeArticle');
const panier = JSON.parse(localStorage.getItem("panier"));
let carteArticle = '';
// Récuperation des données de l'API
fetch("http://localhost:3000/api/cameras")
  .then(res => res.json())
  .then(res => {
      console.log(res);
      // Boucle les article ....
      res.forEach(res => {
        carteArticle += `
        <div class="col mb-5" data-id=${res._id}>
        <div class="card" >
          <img class="card-img-top" src=${res.imageUrl} alt="Image Camera Vintage">
          <div class="card-body">
            <h5 class="card-title">${res.name}</h5>
            <p class="card-text">${res.description}</p>
            <p id="prix" class="card-text font-weight-bold text-right">${(res.price/100)}€</p>
            <a href="./frontend/html/ArticleDetail.html?id=${res._id}" class="btn btn-outline-info col-12 my-3">Voir en detail</a>
          </div>
        </div>
        </div>
        <hr>
            `  
    });
    // .... et les ajoute au HTML 
    affichageArticle.innerHTML = carteArticle;    
    })
    .catch(e => {
      console.log(e)
    });
bagdeDuPanier()
