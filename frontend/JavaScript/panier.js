// AFFICHAGE DU PANIER
const affichageDuPanier = document.getElementById('contenuPanier');
const prixTotal = document.getElementById('PrixTotal');
const nombreArticle = document.getElementById('nombreArticle');
const panier = JSON.parse(localStorage.getItem("panier"));
let liste = "";
console.log(panier);
// Fonction qui affiche un panier vide ou les articles choisi
function affichageDesArticleAuPanier() {
    if(localStorage.getItem('panier') === null) {
        affichageDuPanier.innerHTML = `
            <h2 class="text-center text-danger my-3"> Le panier est vide </h2>`;
    } else {
            panier.forEach((element, index) => {
        console.log(element)
        liste += `
        <tr>
            <th scope="col"> ${element.name}</th>
            <td class="apercu"><img class="img-fluid" width="120" height="65" src="${element.imageUrl}" alt=""></td>
            <td>${element.quantity}</td>
            <td class="prixParArticle">${(element.price/ 100) * element.quantity} €  </td>
            <td><button onclick="deleteItem(${index})"  class="btn btn-outline-danger btn-sm ">X</button></td>
        </tr>
        `
    });
    affichageDuPanier.innerHTML = liste;
    };
};

// Fontion qui calcule et affiche le prix total du panier
let totalPrix = 0;
const prixTotalPanier = function() {
    if(localStorage.getItem('panier') === null) {
        prixTotal.innerText = 0 + ' €';
    } else {
        for (let i = 0; i < panier.length; i++) {
            totalPrix += Number((panier[i].price/100) * panier[i].quantity);
            prixTotal.innerText = totalPrix + ' €';
        };
    }
};

// Fonction qui calcule et affiche le nombre d'article au Panier 
const nombreArticleDuPanier = function() {
    if(localStorage.getItem('panier') === null) {
        nombreArticle.innerText = 0 + ' Article(s)';
    } else {
        let total = 0;
        for (let i = 0; i < panier.length; i++) {
        total += Number(panier[i].quantity);
        nombreArticle.innerText = total + ' Article(s)';
        };
    }
};
//Fontion suppression de l'article choisi
const deleteItem = function(index){
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    location.reload();
};
//Fontion suppression de tout les article
const SupressionAll = function() {
    localStorage.clear('panier');
    location.reload();
}
// Appelle des fonction 
affichageDesArticleAuPanier();
prixTotalPanier();
nombreArticleDuPanier();
bagdeDuPanier();




// DONNées DE CONTACT ET ENVOI DU PANIER AU SERVEUR 
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

const conteneur = document.getElementById('contenuPanier');
// Crée un tableau qui contient les id des articles au panier
let products = []
let panierId = function() {
   for (let i = 0; i < panier.length; i++) {
        let result = panier[i]._id;
        products.push(result)                     
    }; 
};

// Requete Post 
function requetePost(envoiContact) {
    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: envoiContact
    }).then(res => {
        console.log(res);
        return res.json();
    }).then(res =>  {
        localStorage.setItem('orderId', JSON.stringify(res.orderId));
        localStorage.setItem('contact', JSON.stringify(res.contact));
        window.location.replace("./confirmation.html");
    }).catch((e) => {
        console.log(e);
    });
};
// Envoi les données id des article et contact
bouton.onclick = (event) =>{
    event.preventDefault();
    panierId()
    //Récup les données de contact
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    // Controle la validité du formulaire 
    if((ValidForm.textValide(firstName.value) == true) && (ValidForm.textValide(lastName.value) == true) &&
    (ValidForm.textValide(city.value) == true)) {
        if((ValidForm.mailValide(email.value) == true)) {
            let envoiContact = JSON.stringify({contact, products});
            console.log(envoiContact);
            requetePost(envoiContact);
            } else {
                document.querySelector('div.alert').style.display = "block";
                document.querySelector('div.alert strong').textContent = 'Veulliez indiquer une adresse mail valide';
            };    
    } else {
        document.querySelector('div.alert').style.display = "block";
        document.querySelector('div.alert strong').textContent = 'Veulliez remplir les champs correctement';
    };
    
};

