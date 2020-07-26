class LuxuryController {
  constructor() {
    this.formEl = document.querySelector("#form-reservation");
    this.newsLetterBtn = document.querySelector("#btn-email");
    this.submitForm = document.querySelector("#enviar-reserva");
    this.cartEl = document.querySelector(".shopping-cart-list");
    this.emptyCartEl = document.querySelector(".empty-cart-btn");
    this.cartCheckoutEl = document.querySelector(".cart-checkout");
    this.productsEl = document.querySelector(".shop-items");
    this.videoAbout = document.querySelector("#about > img");
    this.formContactBtn = document.querySelector("#send-contact");
    this.products = new Products();
    this.tudo = 0;
    this.map;
    this.newsLetter();
    this.onReservation();
    this.openMenu();
    this.slideArrow();
    this.generateProductsList();
    this.setupListeners();
    this.maskPhone();
    this.cardHoverStaff();
    this.videoClickError();
    this.OnContactFomr();
  }

  inputError(element) {
    element.classList.add("input-error");
  }

  inputSucess(element) {
    element.classList.remove("input-error");
  }

  slideArrow() {
    let arrowSlide = document.querySelectorAll(".arrow-slide");
    this.slideHome(arrowSlide);
  }

  slideHome(element) {
    if (!element) return false;

    [...element].forEach((arrow, index) => {
      arrow.addEventListener("click", (event) => {
        this.slideItemChange();
      });
    });
  }

  slideItemChange() {
    let img = document.querySelector("#food-img");
    let img2 = document.querySelector("#food-img2");
    let slideText = document.querySelector(".content-slide");
    let slideText2 = document.querySelector(".content-slide2");

    if (img.style.display === "block") {
      img2.style.display = "block";
      slideText2.style.display = "block";
      img.style.display = "none";
      slideText.style.display = "none";
    } else {
      img2.style.display = "none";
      slideText2.style.display = "none";
      img.style.display = "block";
      slideText.style.display = "block";
    }
  }

  cardHoverStaff() {
    let card = document.querySelectorAll(".card-staff");

    if (!card) return false;

    [...card].forEach((element, index) => {
      let el = element.querySelector(
        ".img-staff > .card-staff-social > .icons-staff"
      );

      element.addEventListener("mouseover", (event) => {
        el.classList.add("opacity-none");
      });

      element.addEventListener("mouseout", (event) => {
        el.classList.remove("opacity-none");
      });
    });
  }

  newsLetter() {
    if (!this.newsLetterBtn) return false;

    this.newsLetterBtn.addEventListener("click", (event) => {
      event.preventDefault();

      let formNewsLetter = document.querySelector(".newsletter");

      let values = this.formValidate(formNewsLetter);

      if (values) this.sendNewsLetter(values);
    });
  }

  sendNewsLetter(email) {
    let emailSucess = document.querySelector("#email-sucess");
    let emailError = document.querySelector("#email-error");

    if (JSON.stringify(email) === "{}") {
      emailError.style.display = "block";
      emailSucess.style.display = "none";
    } else {
      document.querySelector(".newsletter").reset();
      emailSucess.style.display = "block";
      emailError.style.display = "none";
      this.newsLetterBtn.disabled = true;
      return new NewsLatter(email);
    }
  }

  OnContactFomr() {
    if (!this.formContactBtn) return false;

    this.formContactBtn.addEventListener("click", (event) => {
      event.preventDefault();

      let formContactEl = document.querySelector(".contact-messege");

      let values = this.formValidate(formContactEl);

      let errorForm = document.querySelector("#errormsg");
      let successForm = document.querySelector("#successmsg");

      if (values.name && values.email && values.yourmessege) {
        successForm.style.display = "block";
        errorForm.style.display = "none";
        return new Contact(values);
      } else {
        successForm.style.display = "none";
        errorForm.style.display = "block";
      }
    });
  }

  openMenu() {
    let menu = document.querySelector(".menu");

    document
      .querySelector(".menu-bar > label")
      .addEventListener("click", (event) => {
        switch (menu.className) {
          case "menu block":
            menu.classList.remove("block");
            //menu.classList.remove("scale-up-ver-top");
            break;

          case "menu":
            menu.classList.add("block");
            //menu.classList.add("scale-up-ver-top");
            break;
        }
      });
  }

  onReservation() {
    if (!this.submitForm) return false;

    this.submitForm.addEventListener("click", (event) => {
      event.preventDefault();
      let values = this.formValidate(this.formEl);

      if (!values) return false;

      this.saveUsers(values);
    });
  }

  maskPhone() {
    let phoneEl = document.getElementById("phone");

    if (!phoneEl) return false;

    phoneEl.addEventListener("input", function (e) {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? x[3] : "");
    });
  }

  formValidate(formEl) {
    // função para validar e pegar valores do formulario de reservar lugares.

    let user = {};

    [...formEl].forEach((filds, index) => {
      if (filds.type == "submit") {
        // perde o elemento, no caso o submit.
      } else {
        if (filds.name === "specialrequeriments" && filds.value == "") {
        } else {
          if (filds.value == "") {
            // se um ou mais elementos que não foram perdidos forem vazios.
            this.inputError(filds);
          } else {
            if (filds.name === "email") {
              let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              let email = re.test(String(filds.value).toLowerCase());

              if (email === false) {
                this.inputError(filds);
              } else {
                user[filds.name] = filds.value.toLowerCase();

                this.inputSucess(filds);
              }
            } else if (filds.name === "phone") {
              let phone = filds.value
                .toString()
                .replace("(", "")
                .replace(")", "").length;

              if (phone < 9) {
                this.inputError(filds);
              } else {
                this.inputSucess(filds);
                filds = user[filds.name] = filds.value;
              }
            } else {
              this.inputSucess(filds);
              filds = user[filds.name] = filds.value;
            }
          }
        }
      }
    });

    return user;
  }

  saveUsers(user) {
    // validação final, todos esses dados devem ser preenchidos.

    let errorForm = document.querySelector("#errormsg");
    let successForm = document.querySelector("#successmsg");

    if (user.name && user.email && user.phone && user.datatime) {
      errorForm.style.display = "none";
      successForm.style.display = "block";
      return new User(user);
    } else {
      successForm.style.display = "none";
      errorForm.style.display = "block";
    }
  }

  generateProductsList() {
    if (!this.productsEl) return false;

    this.products.productsAll.forEach((element, index) => {
      let productEl = document.createElement("div");
      productEl.className = "item-shop";
      productEl.innerHTML = `
           <a href="#"><img src="${element.imageUrl}"></a>
           <a href="#"><h2>${element.name}</h2></a>
           <p><a href="#">$${element.price}</a></p>
           <button id="btn-orange" class="add-to-cart" data-id="${element.id}">Add to cart</button>
           `;
      this.productsEl.appendChild(productEl);
    });

    this.generateCartButtons();
  }

  generateCartlist() {
    this.cartEl.innerHTML = "";

    this.products.productsInCart.forEach((element, index) => {
      let li = document.createElement("li");
      li.innerHTML = ` <img class="img-cart-item" src="${
        element.product.imageUrl
      }"> ${element.quantity} ${element.product.name} - $${
        element.product.price * element.quantity
      }`;
      this.cartEl.appendChild(li);
    });

    let productQuantityEl = document.querySelector(".products-quantity");

    productQuantityEl.innerHTML = this.products.productsInCart.length;

    this.generateCartButtons();
  }

  generateCartButtons() {
    let totalPriceEl = document.querySelector(".total-price");
    let total = document.querySelector(".total-cart");

    if (this.products.productsInCart.length > 0) {
      this.emptyCartEl.style.display = "block";
      this.cartCheckoutEl.style.display = "block";
      this.calculateTotalPrice();
      total.innerHTML = "Total Price: $" + this.tudo;
      total.style.display = "block";
    } else {
      this.emptyCartEl.style.display = "none";
      this.cartCheckoutEl.style.display = "none";
      total.style.display = "none";
    }
  }

  setupListeners() {
    if (!this.productsEl) return false;

    this.productsEl.addEventListener("click", (event) => {
      let el = event.target;

      if (el.classList.contains("add-to-cart")) {
        let elId = el.dataset.id;
        this.addToCart(elId);
      }
    });

    this.emptyCartEl.addEventListener("click", (event) => {
      if (confirm("Tem certeza Que deseja excluir ?")) {
        this.products.productsInCart = [];
      }

      this.generateCartlist();
    });
  }

  addToCart(id) {
    let obj = this.products.productsAll[id];

    if (
      this.products.productsInCart.length === 0 ||
      this.productsFound(obj.id) === undefined
    ) {
      this.products.productsInCart.push({ product: obj, quantity: 1 });
    } else {
      this.products.productsInCart.forEach((element) => {
        if (element.product.id === obj.id) {
          element.quantity++;
        }
      });
    }

    this.generateCartlist();
  }

  productsFound(productId) {
    return this.products.productsInCart.find((item) => {
      return item.product.id === productId;
    });
  }

  calculateTotalPrice() {
    this.products.productsInCart.reduce((total, item) => {
      this.tudo = total + item.product.price * item.quantity;

      return this.tudo;
    }, 0);
  }

  videoClickError() {
    if (!this.videoAbout) return false;

    this.videoAbout.addEventListener("click", (event) => {
      window.alert("Error video offiline");
    });
  }
}
