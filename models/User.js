class User {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.datatime = user.datatime;
    this.specialRequeriments = user.specialrequeriments;
    console.log(user);
  }
}

class NewsLatter {
  constructor(emailNewsLetter) {
    this.emailNewsLetter = emailNewsLetter;
    console.log(this.emailNewsLetter);
  }
}

class Contact {
  constructor(contact) {
    this.userContact = contact;
    console.log(this.userContact);
  }
}

class Products {
  constructor() {
    this.productsAll = [
      {
        id: 0,
        name: "Black Eyes Beans",
        description:
          "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
        imageUrl: "img/food-9-300x280.jpg",
        price: 80.0,
      },

      {
        id: 1,
        name: "Skillet Steak",
        description:
          "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
        imageUrl: "img/food-4-300x280.jpg",
        price: 90.0,
      },

      {
        id: 2,
        name: "Chickpeas",
        description:
          "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
        imageUrl: "img/food-5-300x280.jpg",
        price: 50.0,
      },

      {
        id: 3,
        name: "Gourmet Pizza",
        description:
          "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
        imageUrl: "img/food-6-300x280.jpg",
        price: 100.0,
      },

      {
        id: 4,
        name: "Mixed Drink",
        description:
          "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
        imageUrl: "img/food-10-300x280.jpg",
        price: 25.0,
      },

      {
        id: 5,
        name: "Fava Bean",
        description:
          "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
        imageUrl: "img/food-8-300x280.jpg",
        price: 25.0,
      },
    ];

    this.productsInCart = [];
  }
}
