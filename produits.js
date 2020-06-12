let params = new URL(document.location).searchParams;
let idArticle = params.get("id");

//creation et envoie objet requete
let request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/cameras/" + idArticle);
request.send();

//attente reponse et appel fonction de retour
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let product = JSON.parse(this.responseText);
    showDetailsProduct(product);
    addProduct(product);
  }
  if (this.readyState != XMLHttpRequest.DONE && this.status != 200) {
    alert("Désolé, le id du produit n'est pas valide");
    location.href = "index.html";
  }
  if (idArticle == 0) {
    alert("Désolé, le id du produit n'est pas valide");
    location.href = "index.html";
  }
};

// fonction pour montrer la liste des produits
const showDetailsProduct = (article) => {
  // ajout image
  const img = document.getElementById("img-article");
  img.src = article.imageUrl;

  // ajout nom du produit
  const name = document.getElementById("h3-article");
  name.innerHTML = article.name;

  // ajout prix
  const price = document.getElementById("price-article");
  price.innerHTML = article.price + " €";

  // ajout description
  const description = document.getElementById("description-article");
  description.innerHTML = article.description;

  // ajout menu deroulant
  const lenses = article.lenses;
  for (let lens of lenses) {
    const option = document.createElement("option");
    const parent = document.getElementById("lentilles");
    parent.appendChild(option);
    option.innerHTML = lens;
  }
};

// fonction pour ajouter des produits au panier
const addProduct = (article) => {
  const btnAdd = document.getElementById("btn-add");
  btnAdd.addEventListener("click", function () {
    event.preventDefault(); // pour enlever les fonctions par défaut du bouton

    // si le local storage existe
    if (localStorage.getItem("cart")) {
      let array = localStorage.getItem("cart"); // je récupère le local storage
      let arrayJS = JSON.parse(array); // je transforme le contenu JSON en JS
      arrayJS.push(article); // je push dedans un nouveau article
      localStorage.setItem("cart", JSON.stringify(arrayJS)); // je mets le nouveau array en localStorage

      console.log("si il y est deja" + localStorage.getItem("cart")); // test

      // sinon (si le local storage est vide)
    } else {
      let array = []; // je crée un array vide
      array.push(article); // je push dedans un nouveau article
      localStorage.setItem("cart", JSON.stringify(array)); // je mets l'array en localStorage

      console.log("si il y est pas" + localStorage.getItem("cart")); // test
    }
  });
};
