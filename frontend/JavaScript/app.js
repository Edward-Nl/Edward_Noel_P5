// Fonction qui affiche le nopmbre d'article dans le panier
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
        App.setItemLocalSt('panier', panier)
    } else {

        panier = JSON.parse(App.getItemLocalStorage('panier'));

        panier.forEach((article) => {
            if(res._id === article._id) {
                article.quantity++;
                App.setItemLocalSt('panier', panier)
                console.log(panier)
                bool = false
            }})
        
        if (bool) panier.push(articleChoisi);
        App.setItemLocalSt('panier', panier)
    }
    location.reload();
}

// Contient le set Item et le get Item
class App{
    static getParamsId() {
        let paramId = new URLSearchParams(document.location.search).get('id');
        return paramId;
    };
    static setItemLocalSt(nom, val) {
        localStorage.setItem(nom, JSON.stringify(val));
    };
    static getItemLocalStorage(nom) {
        return localStorage.getItem(nom)
        
    };
};

// Contient les Regex
class ValidForm{
    static textValide(value) {
        const re = /^[A-Za-z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
        return re.test(value);
    };
    static mailValide(value) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
        return re.test(value);
    };
};


