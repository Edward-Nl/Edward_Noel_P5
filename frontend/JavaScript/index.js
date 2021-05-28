const affichageArticle = document.getElementById('listeArticle');

// Récuperation des données de l'API
fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .then(res => {
      console.log(res);

      // Creation de la varible qui contient les élement
      let carteArticle = '';

      // Creation des cartes article de la page principal
      res.forEach(res => {
        carteArticle += `
        <div class="col mb-5">
        <div class="card" data-id=${res._id}>
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

    // Ajoute mes élement au Html
    affichageArticle.innerHTML = carteArticle;
    })

    .catch(e => {
      console.log(e)
    });


const panier = JSON.parse(localStorage.getItem("panier"));
bagdeDuPanier()