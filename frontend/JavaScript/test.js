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
    }
    



