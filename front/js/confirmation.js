const idCmd = document.getElementById("orderId");
idCmd.innerHTML = new URL(window.location.href).searchParams.get("id");