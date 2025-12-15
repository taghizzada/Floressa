window.addEventListener("DOMContentLoaded", () => {
  // Sticky navbar logic
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 50);

    const scrollBtn = document.getElementById("scrollToTop");
    if (scrollBtn) {
      if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    }
  });

  // Scroll to top function
  window.scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Shopping Cart Modal Logic
  const modal = document.getElementById("productModal");
  const modalProductName = document.getElementById("modalProductName");
  const modalPrice = document.getElementById("modalPrice");
  const modalImage = document.getElementById("modalImage");
  const quantityInput = document.getElementById("quantity");
  const buyButton = document.getElementById("buyButton");
  const closeButton = document.querySelector(".close-button");
  const decreaseQty = document.getElementById("decreaseQty");
  const increaseQty = document.getElementById("increaseQty");

  let basePrice = 0;

  document.querySelectorAll(".product-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const name = this.dataset.productName;
      const priceText = this.dataset.productPrice;
      const imageSrc = this.querySelector("img").getAttribute("src");

      basePrice = parseFloat(priceText.replace("$", ""));
      quantityInput.value = 1;

      modalProductName.textContent = name;
      modalPrice.textContent = `$${basePrice.toFixed(2)}`;
      modalImage.src = imageSrc;

      buyButton.classList.remove("success");
      buyButton.textContent = "Add to Cart";
      modal.style.display = "block";
    });
  });

  function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = basePrice * quantity;
    modalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  increaseQty.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateTotalPrice();
  });

  decreaseQty.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
      updateTotalPrice();
    }
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  buyButton.addEventListener("click", () => {
    buyButton.classList.add("success");
    buyButton.textContent = "Order Successful!";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});
