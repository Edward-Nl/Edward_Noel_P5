// Récupère le LocalStorage
const orderId = JSON.parse(localStorage.getItem("orderId"));
const contact = JSON.parse(localStorage.getItem("contact"));
const panier = JSON.parse(localStorage.getItem("panier"));
console.log('N de commande : ' + orderId)
console.log(contact);
console.log(panier)
//Création des differente Const
const numero = document.getElementById('numero');
const form = document.getElementById('form');
const contenuPanier = document.getElementById('contenuPanier');
const retour = document.getElementById('retour');
const nombreArticle = document.getElementById('nombreArticle');
const prixTotal = document.getElementById('PrixTotal');
let totalPrix = 0;
let totalArticle = 0;
let liste = '';

const affichageDeLaPage = function () {
    // Affichage du Numero de Commande 
    numero.innerHTML = `
    <H1 class="h1 my-3">Commande effectué ! </H1>
    <p class="">Merci pour votre achat sur Orinoco <br>
        Votre commande porte le numero :<strong> ${orderId}</strong>
    </p>
    `;
    // Affichage des Coordonnées de l'acheteur 
    form.innerHTML = `
    <h2 class="h2 mt-5 my-3">Vos Coordonnées :</h2>
    <p>${contact.lastName} ${contact.firstName}<br>
        ${contact.address}<br>
        ${contact.city}<br>
        ${contact.email}</p>
    `;
    // Affichage du pannier 
    panier.forEach((element) => {
        liste += `
        <tr>
            <th scope="col"> ${element.name}</th>
            <td class="apercu"><img class="img-fluid" width="120" height="65" src="${element.imageUrl}" alt=""></td>
            <td>${element.quantity}</td>
            <td class="prixParArticle">${(element.price / 100) * element.quantity} €  </td>
        </tr>
        `
        }); 
    contenuPanier.innerHTML = liste;
    // Affichage du prix Total
    for (let i = 0; i < panier.length; i++) {
        totalPrix += Number((panier[i].price / 100) * panier[i].quantity)
        prixTotal.innerText = totalPrix + ' €';
    }
    // Affichage du total d'Articles
    for (let i = 0; i < panier.length; i++) {
        totalArticle += Number(panier[i].quantity)
        nombreArticle.innerText = totalArticle + ' Article(s)';
    }
}
// Appel de la fonction 
affichageDeLaPage();
// Bouton de retour, envoi vers la page d'accueil et vide le LocalStorage 
retour.onclick = () => {
    localStorage.clear()
    window.location.replace("../../index.html");
}