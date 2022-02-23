main()



async function main() {
    const articles = await getArticles()
    console.log(articles)

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

// for (let i = 0; i < arcitcles.lenght; i++) {

// }