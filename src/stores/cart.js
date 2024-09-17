import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const products = ref([
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
  ]);

  const cartItems = ref(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const countCartItems = computed(() => {
    return cartItems.value.length;
  });
  const totalCartItems = computed(() => {
    if (cartItems.value.length === 0) return 0;
    const total = cartItems.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    return total;
  });
  const getProductDetails = computed(() => {
    return (id) => products.value.find((p) => p.id === id);
  });

  const addToCart = (item) => {
    const index = cartItems.value.findIndex((c) => item.id === c.id);

    if (index !== -1) {
      cartItems.value[index].quantity += 1;
    } else {
      item.quantity = 1;
      cartItems.value.push(item);
    }
    saveToStorage();
  };

  const removeToCart = (id) => {
    const itemIndex = cartItems.value.findIndex((c) => c.id === id);
    cartItems.value.splice(itemIndex, 1);
    saveToStorage();
  };

  const increaseQuantity = (id) => {
    const itemIndex = cartItems.value.findIndex((c) => c.id === id);
    cartItems.value[itemIndex].quantity += 1;
    saveToStorage();
  };

  const decreaseQuantity = (id) => {
    const itemIndex = cartItems.value.findIndex((c) => c.id === id);
    if (cartItems.value[itemIndex].quantity > 1) {
      cartItems.value[itemIndex].quantity -= 1;
    } else {
      removeToCart(id);
    }
    saveToStorage();
  };

  const clearAllItems = () => {
    cartItems.value = [];
    saveToStorage();
  };

  const saveToStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  };

  return {
    products,
    cartItems,
    countCartItems,
    totalCartItems,
    getProductDetails,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
    clearAllItems,
    saveToStorage,
  };
});
