const idCmd = document.getElementById("orderId");
// ajout de l'id cmd dans le html on le récupère via la barre url 
idCmd.innerHTML = new URL(window.location.href).searchParams.get("id");
localStorage.clear();