//Setto un ascoltatore generico sulla pagina per attendere il caricamento totale del DOM
document.addEventListener("DOMContentLoaded", () => {
  //Inizializzo e dichiaro la mia funzione CreateFormProduct() per stampare a video nel DOM il form HTML
  function CreateFormProduct() {
    //Seleziono a mezzo di querySelector il mio row nell'HTML e inietto dell'codice HTML
  
  }

  //Richiamo la mia funzione
  CreateFormProduct();

  function resetForm(){
    document.querySelector('#btn-reset-yes').addEventListener("click", () => {
      document.querySelector('#form-addprd').reset();
    })
  }
  resetForm()

  //Inizializzo e dichiaro la mia funzione validateForn() per validare i campi del form ed eventualmente mostrare errori a video se un campo non soddisfa la condizione
  function validateForm() {
    //Seleziono a mezzo di querySelector il bottone del form HTML e setto un ascoltatore sul Click
    document.querySelector("#btn-add").addEventListener("click", (e) => {
      //Imposto un IF Statement per la verifica dei campi del form HTML e verifico se ogni campo soddisfa la condizione di essere maggiore di 2
      if (
        document.querySelector("#product-name").value.trim().length >= 2 &&
        document.querySelector("#product-brand").value.trim().length >= 2 &&
        parseInt(document.querySelector("#product-price").value) >= 2 &&
        document.querySelector("#product-description").value.trim().length >=
          2 &&
        document.querySelector("#product-img").value.trim().length >= 2
      ) {
        //Ciclo la NodeList dei paragrafi e se soddisfa la condizione sopra riportata non mostra nessun errore
        for (let i = 0; i < document.querySelectorAll(".p-error").length; i++) {
          document.querySelectorAll(".p-error")[i].innerText = " ";
        }
        //Richiamo la mia funzione declareProduct per inviare successivamente i dati tramite json al server
        declareAndAddProduct();
      } else {
        //Ciclo la NodeList dei paragrafi e se NON SODDISFA la condizione sopra riportata MOSTRO L'ERRORE
        for (let i = 0; i < document.querySelectorAll(".p-error").length; i++) {
          document.querySelectorAll(".p-error")[i].innerText =
            "ATTENZIONE: Il campo non può essere lasciato vuoto o il valore non è valido.";
        }
      }
      e.preventDefault();
    });
  }
  //Richiamo la mia funzione validateForm() per validare appunto il form
  validateForm();
  const key =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjY0MzI2NzYxNDAwMTgzYzJmZDEiLCJpYXQiOjE3MDIzODkzMTUsImV4cCI6MTcwMzU5ODkxNX0.QMXkxjNwLrSOc5T4tfBE71MiqNG551qQ06xFsjwdLZU";
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const type = "application/json";

  function sendProduct(prd) {
    console.log(prd);
    fetch(url, {
      headers: {
        "Content-Type": type, // il tipo del contenuto che sto inviando
        Authorization: key,
      },
      // Chiamata di tipo POST
      method: "POST", // Method della chiamata - Salvataggio di una risorsa
      body: JSON.stringify(prd), // nel body della richiesta invio il dato al server
    });
  }
  //Dichiaro la mia funzione declareProduct per creare un oggetto da trasmettere a mezzo POST con json
  function declareAndAddProduct() {
    //Creo l'oggetto
    let prd = {
      name: document.querySelector("#product-name").value.trim(),
      brand: document.querySelector("#product-brand").value.trim(),
      imageUrl: document.querySelector("#product-img").value.trim(),
      price: parseInt(document.querySelector("#product-price").value),
      description: document.querySelector("#product-description").value.trim(),
    };
    sendProduct(prd);
    console.log(prd);
  }

/*   function readProduct() {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: key,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
      })
      .catch((error) => console.log("Error!! " + error));
  }
  readProduct(); */
});
