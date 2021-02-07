import { Util } from "./util";

// TODO: cartItem for item elements?
interface CartItem {
  removeButton: HTMLElement;
  addButton: HTMLElement;
  minusButton: HTMLElement;
  
  itemPrice: HTMLElement;
  quantity: HTMLElement;
}

// TODO: Code needs cleaning, Fix types
// a class for cart/checkout page
class Cart {
  
  // tax is essential
  private static GST: number = 1.05;
  private static HST: number = 1.07;

  // cart checkout variables
  static subTotal = document.querySelector(".subtotal-price");
  static tax = document.querySelector(".tax-price");
  static total = document.querySelector(".total-price"); 

  // apply event listeners to buttons
  listen(): void {
    for (let item of document.querySelectorAll('.item')) {
      Util.searchNode(item.children, 'remove-button').addEventListener('click', this.removeItem);
      Util.searchNode(item.children, 'add-button').addEventListener('click', (self: Event) => {
        this.changeQuantity(self, "+");
      });
      Util.searchNode(item.children, 'minus-button').addEventListener('click', (self: Event) => {
        this.changeQuantity(self, "-");
      });
    }

    Cart.updatePrice();
  }

  // apply change in quantity
  changeQuantity(event: any, button: string) {
    let siblings: HTMLCollection = event.target.parentNode.children;

    let sibling = Util.searchNode(siblings, "quantity");
    if (button == "-") {
      if (parseInt(sibling.textContent) <= 1) {
        return;
      }
      sibling.textContent = `${parseInt(sibling.textContent) - 1}`;
    } else {
      sibling.textContent = `${parseInt(sibling.textContent) + 1}`;
    }

    Cart.updatePrice();
  }

  // remove an item from cart
  removeItem(event: any): void {
    event.target.parentNode.remove();
    Cart.updatePrice();
  }

  // update prices on cart
  static updatePrice(): void {
    let itemList = document.querySelectorAll(".item");
    console.log(itemList);
    // update subtotal
    let subtotal: number = 0;
    for (let item of itemList) {
      subtotal += parseInt(Util.searchNode(item.children, "item-price").textContent)
      * parseInt(Util.searchNode(item.children, "quantity").textContent);
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
}

console.log("cart prototype");
let cart = new Cart();
cart.listen();