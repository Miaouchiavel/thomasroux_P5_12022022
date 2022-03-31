main()



async function main() {
    //recupere les données des produits depuis l'API
    const articles = await getArticles()
        //creer les elemens HTML et insertion pour chasue produit dans la section #items
    displayArticles(articles)
}

// recupération des articles sur  l'api 

function getArticles() {
    return fetch("http://localhost:3000/api/Products")
        .then(function(response) {
            return response.json()
        })
        .then(function(articles) {
            return articles

        })

}

// display article //

function displayArticles(articles) {
    //on fait une iteration sur les articles recus en parametres
    articles.forEach(function(article) {
        //pour chaque produit du tableau articles recus => chaque produit vaut article
        // on appel la function createProductHtml qui va créer les élements HTML du produits et retourner l'élement
        let productHtml = createProductHtml(article);

        //on insere dans la section items chaque produit a chaque itération
        document.getElementById("items").appendChild(productHtml);

    })

}


function createProductHtml(article) {

    // créeation du lien "a"
    let link = document.createElement("a");
    link.href = "./product.html?id=" + article._id
    console.log(link)

    let articleHtml = document.createElement("article");
    // créer l'element img
    let imageHtml = document.createElement("img");
    // va chercher la source de l'image dans l'api
    imageHtml.src = article.imageUrl;
    imageHtml.alt = article.altTxt;

    let titleHtml = document.createElement("h3");
    titleHtml.innerHTML = article.name;
    titleHtml.classList.add("productName");

    // créetion de "p" et ajout de la description
    let pHtml = document.createElement("p");
    pHtml.innerHTML = article.description;
    pHtml.classList.add("productDescription");
    //ajout des élements au lien 
    articleHtml.appendChild(imageHtml);
    articleHtml.appendChild(titleHtml);
    articleHtml.appendChild(pHtml);

    link.appendChild(articleHtml);

    return link;


}