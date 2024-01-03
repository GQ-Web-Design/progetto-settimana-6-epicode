//Dichiaro la mia costante key con la chiave di accesso per il json
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhZjkxODhjOWNlZDAwMTg4MzEwZTciLCJpYXQiOjE3MDM2MDY1NTMsImV4cCI6MTcwNDgxNjE1M30.No8y0kVMKPu4xdRz1SwIWjqu17ji7rYES_bUjiw1_hM";
//Dichiaro la mia costante url con l'indirizzo del server json
const url = "https://striveschool-api.herokuapp.com/api/product/";
//Dichiaro la mia costante type per la dichiarazione di connessione
const type = "application/json";

//Setto un ascoltatore generico sulla pagina per attendere il caricamento totale del DOM
document.addEventListener("DOMContentLoaded", () => {
  // SELETTORE PAGINA
  //A pagina caricata controllo a mezzo dell'IF statement
  // Se è presente il form
  if (document.querySelector("#FormAddPrd")) {
    //Setto un listener sul btn del form e richiamo la funzione di validazione
    document
      .querySelector("#btn-add")
      .addEventListener("click", validateFormAdd);
    //Setto un listener sul btn del form per il reset e richiamo la funzione di reset
    document
      .querySelector("#btn-reset-yes")
      .addEventListener("click", resetFormAdd);
    //Se è presente il div content-list della pagina modifica prodotto
  } else if (document.querySelector("#content-list")) {
    //Richiamo la funzione per creare la lista
    readProductChange();
    document
      .querySelector("#btn-aggiorna")
      .addEventListener("click", validateFormChange);
    document
      .querySelector("#btn-annulla")
      .addEventListener("click", resetFormChange);
    //Se non è soddisfatta nessuna delle condizioni sopracitate vuol dire che siamo nella homepage
  } else {
    //e che quindi mostra l'elenco
    readProductIndex();
  }
});

function createCardIndex(product) {
  let row = document.querySelector("#content-ecomm");
  let div = document.createElement("div");
  row.appendChild(div);
  div.classList.add(
    "col-12",
    "col-sm-12",
    "col-md-4",
    "col-lg-3",
    "col-xl-3",
    "col-xxl-3",
    "my-2"
  );

  let card = document.createElement("div");
  card.classList.add("card");
  div.appendChild(card);

  let img = document.createElement("img");
  img.classList.add("card-img-top", "img-fluid");
  img.setAttribute("src", `${product.imageUrl}`);
  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = `${product.name}`;
  cardBody.appendChild(cardTitle);

  let cardText = document.createElement("p");
  cardText.classList.add(
    "card-text",
    "badge",
    "rounded-pill",
    "bg-dark",
    "mb-2"
  );
  cardText.innerHTML = `${product.brand}`;
  cardBody.appendChild(cardText);

  let cardPrice = document.createElement("p");
  cardPrice.classList.add("fs-4");
  cardPrice.innerHTML = `${product.price} &euro;`;
  cardBody.appendChild(cardPrice);

  let Dflex = document.createElement("div");
  Dflex.classList.add("d-flex");
  cardBody.appendChild(Dflex);

  let dettagli = document.createElement("a");
  dettagli.classList.add("btn", "btn-outline-success");
  dettagli.setAttribute("href", "dettagli.html");
  dettagli.innerText = "Dettagli";
  Dflex.appendChild(dettagli);

  let acquista = document.createElement("a");
  acquista.classList.add("btn", "btn-success", "ms-1");
  acquista.setAttribute("href", "acquista.html");
  acquista.innerText = "Acquista";
  Dflex.appendChild(acquista);
}
function createCardChange(product) {
  let row = document.querySelector("#content-list");
  let div = document.createElement("div");
  row.appendChild(div);
  div.classList.add(
    "col-12",
    "col-sm-12",
    "col-md-4",
    "col-lg-3",
    "col-xl-3",
    "col-xxl-3",
    "my-2"
  );

  let card = document.createElement("div");
  card.classList.add("card");
  div.appendChild(card);

  let img = document.createElement("img");
  img.classList.add("card-img-top", "img-fluid");
  img.setAttribute("src", `${product.imageUrl}`);
  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = `${product.name}`;
  cardBody.appendChild(cardTitle);

  let cardText = document.createElement("p");
  cardText.classList.add(
    "card-text",
    "badge",
    "rounded-pill",
    "bg-dark",
    "mb-2"
  );
  cardText.innerHTML = `${product.brand}`;
  cardBody.appendChild(cardText);

  let cardId = document.createElement("p");
  cardId.classList.add(
    "card-text",
    "badge",
    "rounded-pill",
    "bg-secondary",
    "mb-2"
  );
  cardId.innerHTML = `ID prodotto:<br>
  ${product._id}`;
  cardBody.appendChild(cardId);

  let cardPrice = document.createElement("p");
  cardPrice.classList.add("fs-4");
  cardPrice.innerHTML = `${product.price} &euro;`;
  cardBody.appendChild(cardPrice);

  let Dflex = document.createElement("div");
  Dflex.classList.add("d-flex");
  cardBody.appendChild(Dflex);

  let modifica = document.createElement("button");
  modifica.classList.add("btn", "btn-outline-success");
  modifica.setAttribute("data-bs-toggle", "modal");
  modifica.setAttribute("data-bs-target", "#staticBackdrop1");
  modifica.setAttribute("title", "Modifica il prodotto");
  modifica.innerText = "Modifica";
  Dflex.appendChild(modifica);

  let elimina = document.createElement("button");
  elimina.classList.add("btn", "btn-outline-danger", "ms-1");
  elimina.setAttribute("data-bs-toggle", "modal");
  elimina.setAttribute("data-bs-target", "#staticBackdrop2");
  elimina.setAttribute("type", "submit");
  elimina.setAttribute("title", "Elimina il prodotto");
  elimina.innerHTML = `<i class="bi bi-trash"></i>`;
  Dflex.appendChild(elimina);

  console.log(`${product._id}`);
  /*  document.querySelector("#btn-elimina").addEventListener("click", () => deletePrd(`${product._id}`));
  document.querySelector("#btn-si").addEventListener("click", () => deletePrd(`${product._id}`)); */
}
function ListPrd(obj) {
  console.log(obj);
  obj.forEach((product) => {
    createCardIndex(product);
  });
}
function ListPrdChange(obj) {
  console.log(obj);
  obj.forEach((product) => {
    createCardChange(product);
  });
}
function readProductIndex() {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: key,
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      console.log(obj);
      ListPrd(obj);
    })
    .catch((error) => console.log("Error!! " + error));
}

function responseAddProduct(product) {
  if (document.querySelector('#alert')) {
    document.querySelector('#containerAlert').remove()
  } else {
    let form = document.querySelector("#FormAddPrd");
    let containerAlert = document.createElement("div");
    containerAlert.classList.add("col-md-12");
    containerAlert.setAttribute("id", "containerAlert");
    form.appendChild(containerAlert);
    let alert = document.createElement("div");
    alert.classList.add(
      "alert",
      "alert-success",
      "alert-dismissible",
      "fade",
      "show",
      "mt-3"
    );
    alert.setAttribute("role", "alert");
    alert.setAttribute("id", "alert");
    alert.innerHTML = `<b>Complimenti!</b> il prodotto ${product._id} è stato inserito correttamente`;
    containerAlert.appendChild(alert); 
  }
}

function readProductChange() {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: key,
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      console.log(obj);
      ListPrdChange(obj);
    })
    .catch((error) => console.log("Error!! " + error));
}

/* aggiungi prodotto */
function resetFormAdd() {
  document.querySelectorAll(".form-label").forEach((label) => {
    if (label.querySelector(".p-error")) {
      label.querySelector(".p-error").remove();
    }
  });
  document.querySelector("#FormAddPrd").reset();
}
function resetFormChange() {
  document.querySelectorAll(".form-label").forEach((label) => {
    if (label.querySelector(".p-error")) {
      label.querySelector(".p-error").remove();
    }
  });
  document.querySelector("#form-changeprd").reset();
}
function ValidationURL(url) {
  // Regular expression for URL validation
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

//Inizializzo e dichiaro la mia funzione validateForn() per validare i campi del form ed eventualmente mostrare errori a video se un campo non soddisfa la condizione
function validateFormAdd(e) {
  //Imposto un IF Statement per la verifica dei campi del form HTML e verifico se ogni campo soddisfa la condizione di essere maggiore di 2
  if (
    document.querySelector("#product-name").value.trim().length >= 2 &&
    document.querySelector("#product-brand").value.trim().length >= 2 &&
    parseInt(document.querySelector("#product-price").value) >= 2 &&
    document.querySelector("#product-description").value.trim().length >= 2 &&
    ValidationURL(document.querySelector("#product-img").value.trim())
  ) {
    //Richiamo la mia funzione declareProduct per inviare successivamente i dati tramite json al server
    declareAndAddProduct();

    /* responseAddProduct(); */

    // Clear existing error messages
    document.querySelectorAll(".form-label").forEach((label) => {
      const error = label.querySelector(".p-error");
      if (error) {
        error.remove();
      }
    });
    // Your other logic if validation passes
  } else {
    document.querySelectorAll(".form-label").forEach((label) => {
      const error = label.querySelector(".p-error");
      if (!error) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "text-danger fw-bold m-0 p-error";
        errorMessage.innerText = `Il Campo ${label.textContent} è compilato in maniera sbagliata. Ricontrolla`;
        label.appendChild(errorMessage); // Append the error message after the label
      }
    });
  }

  e.preventDefault();
}

//Inizializzo e dichiaro la mia funzione validateForn() per validare i campi del form ed eventualmente mostrare errori a video se un campo non soddisfa la condizione
function validateFormChange(e) {
  //Imposto un IF Statement per la verifica dei campi del form HTML e verifico se ogni campo soddisfa la condizione di essere maggiore di 2
  if (
    document.querySelector("#product-name").value.trim().length >= 2 &&
    document.querySelector("#product-brand").value.trim().length >= 2 &&
    parseInt(document.querySelector("#product-price").value) >= 2 &&
    document.querySelector("#product-description").value.trim().length >= 2 &&
    ValidationURL(document.querySelector("#product-img").value.trim())
  ) {
    //Richiamo la mia funzione declareProduct per inviare successivamente i dati tramite json al server
    declareAndAddProduct();

    // Clear existing error messages
    document.querySelectorAll(".form-label").forEach((label) => {
      const error = label.querySelector(".p-error");
      if (error) {
        error.remove();
      }
    });

    // Your other logic if validation passes
  } else {
    document.querySelectorAll(".form-label").forEach((label) => {
      const error = label.querySelector(".p-error");
      if (!error) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "text-danger fw-bold m-0 p-error";
        errorMessage.innerText = `Il Campo ${label.textContent} è compilato in maniera sbagliata. Ricontrolla`;
        label.appendChild(errorMessage); // Append the error message after the label
      }
    });
  }

  e.preventDefault();
}

function deletePrd(id) {
  fetch(url + id, {
    method: "DELETE",
    headers: {
      Authorization: key,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      ListPrdChange(json);
      ListPrd(json);
    })
    .catch((error) => console.log("Error!! " + error));
}

function sendProduct(prd) {
  fetch(url, {
    headers: {
      "Content-Type": type, // il tipo del contenuto che sto inviando
      Authorization: key,
    },
    // Chiamata di tipo POST
    method: "POST", // Method della chiamata - Salvataggio di una risorsa
    body: JSON.stringify(prd), // nel body della richiesta invio il dato al server
  })
    .then((json) => responseAddProduct(json))
    .catch((error) => console.log("Error!! " + error));
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
}
