const orderId = JSON.parse(localStorage.getItem("orderId"));
const contact = JSON.parse(localStorage.getItem("contact"));
const panier = JSON.parse(localStorage.getItem("panier"));
console.log(orderId);
console.log(contact);
console.log(panier)

const numero = document.getElementById('numero');
const form = document.getElementById('form')
const contenuPanier = document.getElementById('contenuPanier')

numero.innerHTML = `
    <H1 class="h1 my-3">Commande effectué ! </H1>
    <p class="">Merci pour votre achat sur Orinoco <br>
        Votre commande porte le numero : ${orderId}
    </p>
`
form.innerHTML = `
    <h2 class="h2 mt-5 my-3">Vos Coordonnées :</h2>
    <p>${contact.lastName} ${contact.firstName}<br>
        ${contact.address}<br>
        ${contact.city}<br>
        ${contact.email}</p>
`;
let liste = ''

function ajoutDesArticleAuPanier() {
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
    // Affiche le panier 
    contenuPanier.innerHTML = liste;
    };

ajoutDesArticleAuPanier()


const nombreArticle = document.getElementById('nombreArticle');
const prixTotal = document.getElementById('PrixTotal')

let totalPrix = 0;
const prixTotalPanier = function() {
        for (let i = 0; i < panier.length; i++) {
            totalPrix += Number((panier[i].price/100) * panier[i].quantity)
            console.log(totalPrix);
            prixTotal.innerText = totalPrix + ' €';
        }
    
};
prixTotalPanier();
console.log(totalPrix)
// Fonction qui calcule et affiche le nombre d'article au Panier 
const nombreArticleDuPanier = function() {
        let total = 0;
        for (let i = 0; i < panier.length; i++) {
        total += Number(panier[i].quantity)
        console.log(total);
        nombreArticle.innerText = total + ' Article(s)';
        }
};
nombreArticleDuPanier()

const retour = document.getElementById('retour');

retour.onclick= () => {
    localStorage.clear()
    window.location.replace("../../index.html");
}