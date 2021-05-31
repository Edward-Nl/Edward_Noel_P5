const badgeArticle = document.getElementById('badgeArticle')
const bagdeDuPanier = function() {
    try {
        let total = 0;
    for (let i = 0; i < panier.length; i++) {
    total += Number(panier[i].quantity)
    console.log(total);
    badgeArticle.innerText = total;
    }
    }
    
    catch(e) {
        console.log('Le Panier est vide ! ');
    }
    };

// Fonction d'ajout d'un article au panier 
const ajouterAuPanier = function(res) {
    let panier = [];
      
    const articleChoisi = {
      _id: res._id,
      imageUrl: res.imageUrl,
      name: res.name,
      quantity: 1,
      price: res.price
    }

    let bool = true;
    if(localStorage.getItem('panier') === null) { 
        panier.push(articleChoisi);
        localStorage.setItem('panier', JSON.stringify(panier));
    } else {

        panier = JSON.parse(localStorage.getItem('panier'));

        panier.forEach((article) => {
            if(res._id === article._id) {
                article.quantity++;
                localStorage.setItem('panier', JSON.stringify(panier));
                console.log(panier)
                bool = false
            }})
        
        if (bool) panier.push(articleChoisi);
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    location.reload();
}

    



