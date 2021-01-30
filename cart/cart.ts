// a class for cart/checkout page
class Cart {
  
  // tax is essential
  private static GST: number = 1.05;
  private static HST: number = 1.07;

  // cart item's elements that need to be changed
  removeButton = document.querySelector(".remove-button");
  addButton = document.querySelector(".add-button");
  minusButton = document.querySelector(".minus-button");

  itemPrice = document.querySelector(".item-price");
  quantity = document.querySelector(".quantity");
  subTotal = document.querySelector(".subtotal-price");
  tax = document.querySelector(".tax-price");
  total = document.querySelector(".total-price");

  // apply event listeners to buttons
  listen(): void {
    this.removeButton?.addEventListener('click', this.removeItem);
    this.addButton?.addEventListener('click', (self) => {
      this.changeQuantity(self, "+");
    });
    this.minusButton?.addEventListener('click', (self) => {
      this.changeQuantity(self, "-");
    });
  }

  // apply change in quantity
  changeQuantity(event: any, button: string) {
    let siblings = event.target.parentNode.children;

    let sibling = this.searchNode(siblings, "quantity");
    if (button == "-") {
      if (parseInt(sibling.textContent) <= 1) {
        return;
      }
      sibling.textContent = `${parseInt(sibling.textContent) - 1}`;
    } else {
      sibling.textContent = `${parseInt(sibling.textContent) + 1}`;
    }

    this.updatePrice();
  }

  // remove an item from cart
  removeItem(event: any): void {
    event.target.parentNode.style.display = "none";
  }

  // update prices on cart
  updatePrice(): void {
    let itemList: any = document.querySelectorAll(".item");

    // update subtotal
    let subtotal: number = 0;
    for (let item of itemList) {
      subtotal += parseInt(this.searchNode(item.children, "item-price").textContent)
      * parseInt(this.searchNode(item.children, "quantity").textContent);
    }
    if (this.subTotal != null) {
      this.subTotal.textContent = `${subtotal}`;
    }

    // update tax
    if (this.tax != null) {
      this.tax.textContent = `${(subtotal * 0.05 + subtotal * 0.07).toFixed(3)}`;
    }

    // update total
    if (this.total != null) {
      this.total.textContent = `${(subtotal * 1.05 + subtotal * 0.07).toFixed(3)}`;
    }
  }

  // search for nodeName under nodes' DOM
  searchNode(nodes: any, nodeName: string): any {
    for (let node of nodes) {
      console.log(node.textContent);
      if (node.classList.contains(`${nodeName}`)) {
        console.log(node.textContent);
        return node;
      } else if (node.children.length != 0) {
        let answer = this.searchNode(node.children, nodeName);
        if (answer != undefined) {
          return answer;
        }
      }
    }
  }
}

console.log("cart prototype");
let cart = new Cart();
cart.listen();