function copyContent(button) {
  try {
      const copyText = button.getAttribute("data-link");
      navigator.clipboard.writeText(copyText);

      button.classList.add("copied");

      const copiedTextElement = document.createElement("div");
      copiedTextElement.classList.add("copiedText");
      copiedTextElement.textContent = "Lien copié dans le presse-papier !";

      document.body.appendChild(copiedTextElement);

      setTimeout(function () {
          copiedTextElement.classList.add("fadeIn");
      }, 10);

      setTimeout(function () {
          button.classList.remove("copied");
          
          copiedTextElement.classList.remove("fadeIn");
          copiedTextElement.classList.add("fadeOut");

          setTimeout(function () {
              document.body.removeChild(copiedTextElement);
          }, 1000);
      }, 2000);
  } catch (err) {
      console.error("Échec de la copie : ", err);
  }
}

// Importe les fonctions dont tu as besoin depuis les SDK que tu utilises
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Ta configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD6H-C0LC8z_tKYD0eiSdrQoCEdDzLYicY",
    authDomain: "bingobase-cec19.firebaseapp.com",
    projectId: "bingobase-cec19",
    storageBucket: "bingobase-cec19.appspot.com",
    messagingSenderId: "34684341563",
    appId: "1:34684341563:web:33fb3f395ab0fbd2dd3b1e",
    measurementId: "G-9ZL44EV6VW"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Fonction pour enregistrer un pseudo
function enregistrerPseudo() {
    const pseudo = document.getElementById('pseudo').value;

    // Ajoute le pseudo à la collection 'pseudos'
    db.collection('pseudos').add({
        pseudo: pseudo,
    });
}

// Fonction pour rechercher un pseudo
function rechercherPseudo() {
    const pseudoRecherche = document.getElementById('pseudoRecherche').value;
    const resultatsDiv = document.getElementById('resultats');

    // Recherche le pseudo dans la collection 'pseudos'
    db.collection('pseudos').where('pseudo', '==', pseudoRecherche).get()
        .then(querySnapshot => {
            const count = querySnapshot.size;
            resultatsDiv.innerHTML = `Le pseudo ${pseudoRecherche} apparaît ${count} fois.`;
        });
}
