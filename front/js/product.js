// récupération de l'URL 
const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct);

// crréation de l'image produit 
let productImg = document.createElement("img");

getProduct();
// récuperer l'API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        // reponse de l'api sous JSON
        .then(response => response.json())
        // dispatch de la promesse product dans le DOM 
        .then(product => {
            console.table(product)
                // Insertion de l'image
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = product.imageUrl;
            productImg.alt = product.altTxt;
            // Modification du titre 
            let productName = document.getElementById('title');
            productName.innerHTML = product.name;
            // Modification du prix
            let productPrice = document.getElementById('price');
            productPrice.innerHTML = product.price;
            // Modification de la description
            let productDescription = document.getElementById('description');
            productDescription.innerHTML = product.description;
            // choix des couleurs dans option avec une boucle For basé sur la taille (lenght) et donc le nombre de couleur contenue dans l'objet couleur 
            for (let i = 0; i < product.colors.length; i++) {
                let colorsProduct = document.getElementById("colors");
                let color = document.createElement("option");
                color.setAttribute("value", product.colors[i]);
                color.innerHTML = product.colors[i];
                colorsProduct.appendChild(color);


            }

        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}

// selection du boutton dans le dom 

const envoyerPanier = document.querySelector("#addToCart");

// écouter le bouton et envoyer le panier 

envoyerPanier.addEventListener("click", (event => {

    //récuperer les valeurs du produit
    let produitData = {
        idProduit: idProduct,
        nameProduit: document.querySelector("#title").textContent,
        imgProduit: productImg.src,
        altImg: productImg.alt,
        quantity: parseInt(document.querySelector("#quantity").value),
        colorChoice: document.querySelector("#colors").value,
        prixProduit: document.querySelector("#price").textContent,

    }


    // on conditionne l'écoute on ajoute a produit data seulement si les quantité est non nul & la couleur choisite 
    if (produitData.quantity > 0 && produitData.colorChoice) {
        addCartProduct(produitData)
        window.location.href = "cart.html"

        // sinon message d'alerte 
    } else {
        alert("merci de choisir une couleur et une quantité non null  ")

    }
}))




function addCartProduct(produitData) {
    //Récupération du panier dans le localStorage
    let localCart = [];
    if (localStorage.cart) {
        localCart = JSON.parse(localStorage.cart);
    }
    //Si le panier du localStorage n'est pas vide
    if (localCart.length) {
        let modified = false;
        localCart.forEach(element => {
            // vérification  de la condition couleur et id 
            if (element.idProduit === produitData.idProduit && element.colorChoice === produitData.colorChoice) {
                // on ajoute la quantité du produit data a l'élément dans le local cart 

                element.quantity += produitData.quantity;
                modified = true;
            }
        });

        if (!modified) {
            localCart.push(produitData);
        }
        // si il est vide on push 
    } else {
        localCart.push(produitData);

    }
    // push dans le local storage 
    localStorage.setItem("cart", JSON.stringify(localCart));
}