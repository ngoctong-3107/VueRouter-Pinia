import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    products: [
      {
        id: 1,
        name: "Tv LG",
        price: 300,
        image:
          "https://www.lg.com/content/dam/channel/wcms/vn/images/tivi/43lm5750ptc_atv_eavh_vn_c/gallery/1100_1.jpg",
        description:
          "LG 55-inch OLED 4K TV with vibrant colors and high contrast for an immersive viewing experience.",
      },
      {
        id: 2,
        name: "Samsung Refrigerator",
        price: 500,
        image:
          "https://www.cnet.com/a/img/resize/1be4ceb5058ce3c094ddedc21edc48fbdd37f841/hub/2016/07/15/bda3c418-740a-4183-93fc-3b95d5a1cc58/samsung-family-hub-refrigerator-promo.jpg?auto=webp&fit=crop&height=1200&width=1200",
        description:
          "Samsung 800L refrigerator with sleek design, spacious compartments, and energy-efficient cooling.",
      },
      {
        id: 3,
        name: "Sony PlayStation 5",
        price: 499,
        image:
          "https://www.tncstore.vn/media/product/9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg",
        description:
          "Sony PlayStation 5 gaming console with next-gen performance, stunning graphics, and ultra-fast load times.",
      },
      {
        id: 4,
        name: "Apple iPhone 14",
        price: 999,
        image: "https://www.tncstore.vn/media/product/250-7522-4.jpg",
        description:
          "Apple iPhone 14 with A15 Bionic chip, 6.1-inch display, advanced dual-camera system, and long battery life.",
      },
      {
        id: 5,
        name: "Dell XPS 13 Laptop",
        price: 1200,
        image:
          "https://product.hstatic.net/1000331874/product/dell_xps_9320_722c6227ecc04c648c670f1bbb7b7cfd.jpg",
        description:
          "Dell XPS 13-inch laptop with 11th Gen Intel Core processors, ultra-thin design, and stunning display quality.",
      },
    ],
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  }),
  getters: {
    countCartItems() {
      return this.cartItems.length;
    },

    totalCartItems() {
      if (this.cartItems.length === 0) return 0;
      const total = this.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      return total;
    },
  },
  actions: {
    addToCart(item) {
      const index = this.cartItems.findIndex((c) => item.id === c.id);

      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      } else {
        item.quantity = 1;
        this.cartItems.push(item);
      }
      this.saveToStorage();
    },

    removeToCart(id) {
      const itemIndex = this.cartItems.findIndex((c) => c.id === id);
      this.cartItems.splice(itemIndex, 1);
      this.saveToStorage();
    },

    increaseQuantity(id) {
      const itemIndex = this.cartItems.findIndex((c) => c.id === id);
      this.cartItems[itemIndex].quantity += 1;
      this.saveToStorage();
    },

    decreaseQuantity(id) {
      const itemIndex = this.cartItems.findIndex((c) => c.id === id);
      if (this.cartItems[itemIndex].quantity > 1) {
        this.cartItems[itemIndex].quantity -= 1;
      } else {
        this.removeToCart(id);
      }
      this.saveToStorage();
    },

    saveToStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },

    getProductDetails(id) {
      return this.products.find((p) => p.id === id);
    },
  },
});
