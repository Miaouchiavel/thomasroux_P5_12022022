//Initialisation du local storage on récupère les items du local storage
let localCart = JSON.parse(localStorage.getItem("cart"));
console.table(localCart);

init();

function init() {
    getCart();
    totals();
}


// selection de la position pour le panier vide 
// getCart();

function getCart() {
    // si le local storage est vide 
    if (localCart === null || localCart == 0) {
        const positionEmptyCart = document.querySelector("#cart__items");
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

//getCart();

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


    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;





}
//totals();


// suppression d'un product

function deleteProduct() {
    const btnDelete = document.querySelectorAll('.deleteItem');

    btnDelete.forEach((btn) => {
        console.log(btn);
        btn.addEventListener('click', () => {
            //utilisation du document closest pour récuperer les data set stocké dans article colo et id 
            const article = btn.closest('article');
            const articleID = article.dataset.id;
            const articleColor = article.dataset.color;
            // boucle for dans le local storage 
            for (let j = 0; j < localCart.length; j++) {
                // condition if pour vérifier que l'objet supprimer dans le localstorage correspond a l'objet sur la page 
                if (articleID === localCart[j].idProduit && articleColor === localCart[j].colorChoice) {
                    // utilisation de splice qui  supprime l'élément a l'index j qui correspond a la condition if 
                    localCart.splice(j, 1);
                    // on remet l'array modifier dans le local storage 
                    localStorage.setItem("cart", JSON.stringify(localCart));
                }

                // refresh
                location.reload();


            }
        })
    });
};
deleteProduct();







// Modification d'une quantité de produit

let qttModif = document.querySelectorAll(".itemQuantity");

// for (let k = 0; k < qttModif.length; k++) {
qttModif.forEach(element => {
    element.addEventListener("change", (event) => {
        event.preventDefault();

        //Selection de l'element à modifier en fonction de son id  et sa couleur 
        let article = element.closest('article');
        let produitData = {

            articleID: article.dataset.id,
            articleColor: article.dataset.color,
            articleQuantity: parseInt(article.querySelector("input").value)

        }
        console.log(produitData)
        addCartProduct(produitData);
        // recalcule totals
        totals()
    })

});

function addCartProduct(produitData) {

    //Si le panier du localStorage n'est pas vide
    localCart.forEach(element => {
        if (element.idProduit === produitData.articleID && element.colorChoice === produitData.articleColor) {

            element.quantity = produitData.articleQuantity;

        }
    });
    localStorage.setItem("cart", JSON.stringify(localCart));

}







//formulaire 

// selction de l'id du form 
let form = document.querySelector(".cart__order__form");


//Création des expressions régulières avec regexp 
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("([0-9]*) ?([a-zA-Z,\. ]*)");





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
        return true;
    } else {
        firstNameErrorMsg.innerHTML = 'Renseigner votre prénom .';
    }
};

//validation du nom
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
        return true;
    } else {
        lastNameErrorMsg.innerHTML = 'Renseigner votre nom.';
    }
};

//validation de l'adresse
const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;



    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
        return true;
    } else {
        addressErrorMsg.innerHTML = 'Renseigner votre adresse.';
    }
};


console.log(validAddress);


//validation de la ville
const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
        return true;
    } else {
        cityErrorMsg.innerHTML = 'Renseigner votre ville.';
    }
};

//validation de l'email
const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
        return true;
    } else {
        emailErrorMsg.innerHTML = 'Renseigner un email valide.';
    }
};






// envoi au local storage de la cmd
const btnCmd = document.getElementById('order');
// écoute du bouton order

btnCmd.addEventListener('click', (event) => {

    event.preventDefault();
    event.stopPropagation();

    if ((validFirstName(form.firstName) &&

            validLastName(form.lastName) &&
            validAddress(form.address) &&
            validCity(form.city) &&
            validEmail(form.email))) {





        //Construction d'un array depuis le local storage qui récupère tout les produits
        let products = [];
        // boucle for pour récuperer les id du local storage 
        for (let i = 0; i < localCart.length; i++) {
            products.push(localCart[i].idProduit);
        }
        console.log(products);



        // création d'un array order qui récupère les éléments du form & et les idproduct

        const order = {
            contact: {
                firstName: document.getElementById("firstName"),
                lastName: document.getElementById("lastName"),
                address: document.getElementById("address"),
                city: document.getElementById("city"),
                email: document.getElementById("email"),
            },
            products: products,
        };



        // fetch pour la méthode post envoye des infos sur l'api 
        fetch("http://localhost:3000/api/products/order", {
                // method utilisé 
                method: 'POST',
                // contenue du post 
                body: JSON.stringify(order),
                headers: {
                    "Accept": "application / json ",
                    "Content-Type": "application/json",
                },

            })
            // response 
            .then((response) => response.json())
            // reponse de l'api et envoye a la page confirmation cmd
            .then((data) => {
                console.log(data);
                console.log('oui')
                    // renvoi sur la page confirmation  avec l'orderid comme idhtml
                document.location.href = `confirmation.html?id=${data.orderId}`;
            })
            .catch(((error) => {
                console.log(error.message);
            }));

    };
})