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



    if (produitData.quantity > 0 && produitData.colorChoice) {
        addCartProduct(produitData)
    } else {
        alert("merci de choisir ")
    }
}))

function addCartProduct(produitData) {
    //Initialisation du local storage Json.parse convertie les données en objet JS
    let cart = JSON.parse(localStorage.getItem("cart"));
    let localCart = []
    if (cart) {
        console.log(localCart)
        cart.forEach(el => {
            if (el.idProduit == produitData.idProduit && el.colorChoice == produitData.colorChoice) {
                el.quantity += produitData.quantity
                localCart.push(el)
                console.log("oui")
            } else {
                localCart.push(produitData);
            }
        })
        console.log(localCart);
        localCart.push(produitData);
        localStorage.setItem("cart", JSON.stringify(localCart));



    } else {
        localCart.push(produitData);
        localStorage.setItem("cart", JSON.stringify(localCart))
        console.log(localCart)

    }
    // console.log(cart);

    // let produitLocalStorage = JSON.parse(localStorage.getItem("cart"));
    // console.log(produitLocalStorage)

    // // si il y a déjà des produits dans local storage 
    // if (produitLocalStorage) {
    //     // ajouter condition if idProduct === idProduct && color choice ==== color choice then quantity ++ quantity  else ce qui a écrit en dessous new array 

    //     produitLocalStorage.push(produitData);
    //     localStorage.setItem("cart", JSON.stringify(produitLocalStorage))

    // }
    // // si il n'y a  aucun produit dans le local storage
    // else {
    //     produitLocalStorage = []
    //     produitLocalStorage.push(produitData);
    //     // ajoute au local storage le produit sous form JSON avec le stringify

    // }

}