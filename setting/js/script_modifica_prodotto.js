//Setto un ascoltatore generico sulla pagina per attendere il caricamento totale del DOM
document.addEventListener("DOMContentLoaded", () => {
    
    const key =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NjY0MzI2NzYxNDAwMTgzYzJmZDEiLCJpYXQiOjE3MDIzODkzMTUsImV4cCI6MTcwMzU5ODkxNX0.QMXkxjNwLrSOc5T4tfBE71MiqNG551qQ06xFsjwdLZU";
  const url = "https://striveschool-api.herokuapp.com/api/product/";


    function createIndex(obj) {
    obj.forEach((product) => {
      document.querySelector("#content-list").innerHTML += `
      <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 my-2">
            <div class="card">
                <img src="${product.img}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text badge rounded-pill bg-dark mb-2">${product.brand}</p>
                    <p class="fs-4">${product.price} &euro; </p>
                    <div class="d-flex">
                        <button type="button" id="btn-modifica" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Modifica</button>
                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h1 class="modal-title fs-5 fw-bold" id="staticBackdropLabel">Modifica l'elemento</h1>
                                <button type="submit" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <form class="row g-3" id="form-changeprd">
                                    <div class="col-md-6">
                                        <label for="NomeProdotto" class="form-label">Nome Prodotto</label>
                                        <p class="text-danger fw-bold p-error m-0"></p>
                                        <input type="text" class="form-control" id="product-name" placeholder="Nome" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="BrandProdotto" class="form-label">Brand Prodotto</label>
                                        <p class="text-danger fw-bold p-error m-0"></p>
                                    <input type="text" class="form-control" id="product-brand" placeholder="Brand" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="ImmagineProdotto" class="form-label">Immagine Prodotto</label>
                                        <p class="text-danger fw-bold p-error m-0"></p>
                                    <input type="text" class="form-control" id="product-img" placeholder="Url Immagine" required>  
                                    </div>
                                    <div class="col-md-6">
                                        <label for="PrezzoProdotto" class="form-label">Prezzo Prodotto</label>
                                        <p class="text-danger fw-bold p-error m-0"></p>
                                    <input type="number" class="form-control" id="product-price" placeholder="Prezzo" required>
                                    </div>
                                    <div class="col-md-12">
                                        <label for="DescrizioneProdotto" class="form-label">Descrizione Prodotto</label>
                                        <p class="text-danger fw-bold p-error m-0"></p>
                                    <textarea id="product-description" class="form-control" placeholder="Descrizione" rows="4" cols="50" required></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-success" id="btn-aggiorna" data-bs-dismiss="modal" >Aggiorna</button>
                                <button type="button" class="btn btn-danger" id="btn-annulla" data-bs-dismiss="modal">Annulla</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <button type="submit" id="btn-elimina" class="btn btn-outline-danger ms-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Elimina</button>
                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h1 class="modal-title fs-5 text-danger fw-bold" id="staticBackdropLabel2">ATTENZIONE</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                Proseguendo l'elemento appena selezionato verrà eliminato. Continuare?
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-success" id="btn-si" data-bs-dismiss="modal">Si</button>
                                <button type="button" class="btn btn-danger" id="btn-no">No</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `; 
    });
  }
  function readProduct() {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: key,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        createIndex(obj);
      })
      .catch((error) => console.log("Error!! " + error));
  }
  readProduct();


  function resetForm(){
    document.querySelector('#btn-annulla').addEventListener("click", () => {
      document.querySelector('#form-changeprd').reset();
    })
  }
  resetForm()

});
