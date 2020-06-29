const btnValidate = document.getElementById("btn-validate");
const surname = document.getElementById("surname");
const name = document.getElementById("name");
const date = document.getElementById("date");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let array = localStorage.getItem("cart");
let arrayJS = JSON.parse(array);

// fonction pour ajouter les articles dans le panier
const addProductToList = () => {
  for (i = 0; i < arrayJS.length; i++) {
    // ajout des div
    const div = document.createElement("div"); //creation de la div
    div.className = "block-article"; // ajout de la class

    const parent = document.getElementById("list-cart"); // ou je vais appliquer la div
    parent.appendChild(div); // ajout de la div dans l'element parent

    // ajout des images
    const img = document.createElement("img");
    img.className = "block-article__img";
    img.src = arrayJS[i].imageUrl;
    div.appendChild(img);

    // ajout de name
    const h3 = document.createElement("h3");
    div.appendChild(h3);
    h3.innerHTML = arrayJS[i].name;

    // ajout de price
    const p = document.createElement("p");
    div.appendChild(p);
    p.innerHTML = "Prix de l'article : " + arrayJS[i].price + " €";

    // ajout du btn effacer
    const btn = document.createElement("button");
    btn.className = "remove";
    div.appendChild(btn);
    btn.innerHTML = "Effacer article";
  }
};

// fonction pour calculer la somme du totale du panier
const totalCost = () => {
  let totalCount = 0; // je crée une variable initialisé à zéro
  for (let i in arrayJS) {
    // pour chaque produit présent dans le panier
    let array = localStorage.getItem("cart"); // je récupère le price depuis le local storage
    let arrayJS = JSON.parse(array); // je le transforme en nombre
    totalCount += arrayJS[i].price; //je rajoute chaque produit à la variable totalCount
  }
  return totalCount; // totalCount me retourne la Somme de tous les price des produits
};
const resultTotalCost = totalCost();

// fonction pour montrer la somme du total du panier
const showTotalCost = () => {
  const divTotal = document.getElementById("total");
  divTotal.innerHTML = "<span>Totale : " + resultTotalCost + " €</span>";
  localStorage.setItem("totalCost", resultTotalCost);
};
showTotalCost();

// pour vérifier les données de l'utilisateur
const validForm = async (id, regex, label, key) => {
  if (regex.test(label.value)) {
    const result = await localStorage.setItem(key, label.value); // je sauvegarde l'info en local storage
    console.log("code valide");
    btnValidate.removeAttribute("disabled", "");
    btnValidate.style.opacity = 1;
    const help = document.getElementById(id);
    help.textContent = "";
  } else {
    console.log("CODE INVALIDE !!!!!");
    btnValidate.setAttribute("disabled", "");
    btnValidate.style.opacity = 0.5;
    const help = document.getElementById(id);
    help.textContent = "Cela n'est pas valide, veuillez saisir l'information correctement";
  }
};

// si il y a l'info dans local storage je l'affiche par default
const showLocalStorage = (label, key) => {
  if (localStorage.getItem(key)) {
    label.setAttribute("value", localStorage.getItem(key));
  }
};

// expressions régulières
const regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+( |,|.|'|-)*[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]$/s;
const regSurname = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+( |,|.|'|-)*[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]$/s;
const regAddress = /^\d{1,5}.*/i;
const regCity = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+( |,|.|'|-)*[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]$/s;
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/i;

name.addEventListener("input", (e) => {
  validForm("help-name", regName, name, "name");
});
showLocalStorage(name, "name");

surname.addEventListener("input", (e) => {
  validForm("help-surname", regSurname, surname, "surname");
});
showLocalStorage(surname, "surname");

address.addEventListener("input", (e) => {
  validForm("help-address", regAddress, address, "address");
});
showLocalStorage(address, "address");

city.addEventListener("input", (e) => {
  validForm("help-city", regCity, city, "city");
});
showLocalStorage(city, "city");

email.addEventListener("input", (e) => {
  validForm("help-email", regEmail, email, "email");
});
showLocalStorage(email, "email");


// fonction pour envoyer la commande
const sendOrder = () => {
  btnValidate.addEventListener("click", () => {
    let userName = localStorage.getItem("name");
    let userSurname = localStorage.getItem("surname");
    let userAddress = localStorage.getItem("address");
    let userCity = localStorage.getItem("city");
    let userEmail = localStorage.getItem("email");

    // creation de l'array produits
    const products = [];
    // si le local storage existe
    if (localStorage.getItem("cart")) {
      for (let i in arrayJS) {
        let array = localStorage.getItem("cart"); // je récupère le local storage
        let arrayJS = JSON.parse(array); // je transforme le contenu JSON en JS
        let idProducts = arrayJS[i]._id;
        products.push(idProducts);
        localStorage.setItem("arrayId", products);
      }
    }

    // creation de l' objet contenant les info de l'utilisateur
    const contact = {
      firstName: userName,
      lastName: userSurname,
      address: userAddress,
      city: userCity,
      email: userEmail,
    };

    // order pour l'evoie de la requete
    const order = {
      contact,
      products,
    };
    console.log(order);

    const send = (event) => {
      const ajax = new Ajax();
      ajax.post("http://localhost:3000/api/cameras/order", order)
        .then((response) => {
          console.log(response)
          localStorage.setItem("order", JSON.stringify(response));
          location.href = "order-confirmation.html";
          console.log(response);
        }, () => {
          alert("Veuillez remplir le formulaire avant de valider votre commande");
        })
    };
    send(); // appel de la fonction pour l'envoye de la commande
  });
};

// fonction pour vérifier si le panier est rempli ou vide
const checkCartContents = () => {
  // si le panier est rempli
  if (typeof array != "undefined" && array != null && array.length != null && array.length > 0 && array != "[]") {
    addProductToList(); // appel de la fonction pour ajouter les produit au panier
    removeProduct(); // appel de la fonction pour effacer un produit
    sendOrder(); // appel de fonction pour envoyer la commande

    // sinon (si le panier est vide)
  } else {
    const cartEmpty = document.getElementById("list-cart");
    cartEmpty.innerHTML = "<span>Votre panier est vide !</span>"; // j'affiche un message
    btnValidate.setAttribute("value", "Votre panier est vide");
    btnValidate.addEventListener("click", () => {
      alert("Avant de valider votre commande veuillez ajouter des produits au panier");
      location.href = "index.html";
    });
  }
};

// fonction pour effacer un produit
const removeProduct = () => {
  const btnRemove = document.querySelectorAll(".remove"); // j'appelle tous les boutons pour effacer les produits

  for (let i = 0; i < btnRemove.length; i++) {
    btnRemove[i].addEventListener("click", (e) => {
      let array = localStorage.getItem("cart"); // je récupère l'array en local storage
      let arrayJS = JSON.parse(array); // je transforme le contenu JSON en JS
      arrayJS.splice([i], 1); // j'efface un élément de l'array => splice([indice de départ], nombre d'éléments à enlever)
      localStorage.setItem("cart", JSON.stringify(arrayJS)); // je mets le nouveau array en localStorage
      document.location.reload(true); // pour rafraîchir la page à la fin de la fonction
    });
  }
};

checkCartContents(); // appel de la fonction pour vérifier si le panier est rempli ou vide
