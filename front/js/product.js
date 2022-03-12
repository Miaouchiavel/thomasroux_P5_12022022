// récupération de l'URL 
const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct);

getProduct();
// récuperer l'API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        // reponse de l'api sou JSON
        .then(response => response.json())
        // dispatch de la promesse product dans le DOM 
        .then(product => {
            console.table(product)
                // Insertion de l'image
            let productImg = document.createElement("img");
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
                console.log(color)

            }

        })
}