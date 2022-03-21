//Initialisation du local storage on récupère les items du local storage
let localCart = JSON.parse(localStorage.getItem("cart"));
console.table(localCart);

// selection de la position pour le panier vide 
const positionEmptyCart = document.querySelector("#cart__items");

// si le local storage est vide 
if (localCart === null || localCart == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {
    // utilisation de for in qui cible l'item cart du localstorage stocker dans local cart
    for (cart in localCart) {
        // recréation de la structure du DOM

        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', localCart[cart].idProduit);
        productArticle.setAttribute('data-color', localCart[cart].colorChoice);

        console.log(productArticle)

        // Insertion de l'élément "div" pour l'image produit
        let divImg = document.createElement("div");
        divImg.className = "cart__item__img";
        // img src alt
        let productImg = document.createElement("img");
        divImg.appendChild(productImg);
        productImg.src = localCart[cart].imgProduit;
        productImg.alt = localCart[cart].altImg;
        productArticle.appendChild(divImg);

        // Insertion de l'élément "div" contenant la description et les settings
        let cartItemContent = document.createElement("div");
        productArticle.appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";


        // Insertion de l'élément "div" pour la description produit
        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.className = "cart__item__content__titlePrice";

        // Insertion du titre h3
        let productTitle = document.createElement("h2");
        cartItemContentDescription.appendChild(productTitle);
        productTitle.innerHTML = localCart[cart].nameProduit;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        cartItemContentDescription.appendChild(productColor);
        productColor.innerHTML = localCart[cart].colorChoice;
        productColor.style.fontSize = "20px";

        // Insertion du prix
        let productPrice = document.createElement("p");
        cartItemContentDescription.appendChild(productPrice);
        productPrice.innerHTML = localCart[cart].prixProduit + " €";


        // Insertion "div" settings
        let cartItemSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemSettings);
        cartItemSettings.className = "cart__item__content__settings";

        // Insertion "div"  quantity 
        let cartItemSettingsQty = document.createElement("div");
        cartItemSettings.appendChild(cartItemSettingsQty);
        cartItemSettingsQty.className = "cart__item__content__settings__quantity";

        // Insertion du "p" "Qté : "
        let productQty = document.createElement("p");
        cartItemSettingsQty.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Insertion de l'imput quantité 
        let productQuantity = document.createElement("input");
        cartItemSettingsQty.appendChild(productQuantity);
        productQuantity.value = localCart[cart].quantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Insertion section supprimer un item

        let itemDelete = document.createElement("div");
        cartItemSettings.appendChild(itemDelete);
        itemDelete.className = "cart__item__content__settings__delete";

        let productDelete = document.createElement("p");
        itemDelete.appendChild(productDelete);
        productDelete.className = "deleteItem";
        productDelete.innerHTML = "Supprimer";
        productDelete.addEventListener("click", (event) => {
            event.preventDefault;

            // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let idDelete = localCart[cart].idProduit;
            let colorDelete = localCart[cart].couleurProduit;

            // utilisation du filtre pour supprimer du local storage les éelements 
            localCart = localCart.filter(el => el.idProduit == idDelete || el.couleurProduit !== colorDelete)
            console.log(localCart);
            localStorage.setItem("cart", JSON.stringify(localCart));


            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })




    }
}
// total Prix et Qty 

function totals() {

    // Récupération du total des quantités
    var elemsQty = document.getElementsByClassName('itemQuantity');
    totalQty = 0;
    totalPrice = 0;
    // boucle for avec i comme iterration dans les quantités pour sommer et pour le prix multiplie la quantité par la valeur d'un produit 
    for (var i = 0; i < elemsQty.length; ++i) {
        totalQty += elemsQty[i].valueAsNumber;
        totalPrice += (elemsQty[i].valueAsNumber * localCart[i].prixProduit);
    }

    let TotalQty = document.getElementById('totalQuantity');
    TotalQty.innerHTML = totalQty;
    console.log(totalQty);

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}

totals()