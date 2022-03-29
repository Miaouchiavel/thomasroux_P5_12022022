//Initialisation du local storage on récupère les items du local storage
let localCart = JSON.parse(localStorage.getItem("cart"));
console.table(localCart);


// selection de la position pour le panier vide 
const positionEmptyCart = document.querySelector("#cart__items");

function getCart() {
    // si le local storage est vide 
    if (localCart === null || localCart == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        // utilisation de for in qui cible l'item cart du localstorage stocker dans local cart
        for (let cart in localCart) {
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



        }
    }
}

getCart();

function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = localCart[j].idProduit;
            let colorDelete = localCart[j].colorChoice;

            localCart = localCart.filter(el => el.colorChoice !== colorDelete && el.idProduit !== idDelete);

            localStorage.setItem("cart", JSON.stringify(localCart));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();






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

totals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id 
            let quantityModif = localCart[k].quantity;
            let qttModifValue = qttModif[k].valueAsNumber;
            // cherche l'element du array ayant le même id  même et une quantité différent 
            const resultFind = localCart.find((el) => el.qttModifValue !== quantityModif && el.idProduit == localCart[k].idProduit);
            console.log(resultFind);


            resultFind.quantity = qttModifValue;
            localCart[k].quantity = resultFind.quantity;

            localStorage.setItem("cart", JSON.stringify(localCart));

            // recalcule totals
            totals()
        })
    }
}
modifyQtt();

console.log(modifyQtt());







//formulaire 

// selction de l'id du form 
let form = document.querySelector(".cart__order__form");


//Création des expressions régulières avec regexp 
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Ecoute de la modification du prénom
form.firstName.addEventListener('change', function() {
    validFirstName(this);
});
console.log(form.firstName);

// Ecoute de la modification du nom
form.lastName.addEventListener('change', function() {
    validLastName(this);
});

// Ecoute de la modification de l'adresse
form.address.addEventListener('change', function() {
    validAddress(this);
});

// Ecoute de la modification de la ville 
form.city.addEventListener('change', function() {
    validCity(this);
});

// Ecoute de la modification du mail
form.email.addEventListener('change', function() {
    validEmail(this);
});

//validation du prénom
const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
};

//validation du nom
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
};

//validation de l'adresse
const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
};
console.log(validAddress);

//validation de la ville
const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
};

//validation de l'email
const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
};

// envoi au local storage de la cmd

function postCmd() {
    // récupération de l'order 
    const btnCmd = document.getElementById('order');

    btnCmd.addEventListener("click", () => {


        //Construction d'un array depuis le local storage qui récupère tout les produits
        let products = [];
        for (let i = 0; i < localCart.length; i++) {
            products.push(localCart[i].idProduit);
        }
        console.log(products);




        const order = {
            contact: {
                firstName: document.getElementById("firstName"),
                lastName: document.getElementById("lastName"),
                address: document.getElementById("address"),
                city: document.getElementById("city"),
                email: document.getElementById("email"),
            },
            product: products,
        };
        console.log(order);


        fetch("http://localhost:3000/api/products/order", {
                // method utilisé 
                method: 'POST',
                // contenue du post 
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((dataSend) => {
                console.log(dataSend);
                localStorage.setItem("orderID", JSON.stringify(dataSend));
                document.location.href = "confirmation.html";
            })
            .catch(((error) => {
                alert(error.message);
            }));

    })
}
postCmd();