// a class for cart/checkout page
var Cart = /** @class */ (function () {
    function Cart() {
        // cart item's elements that need to be changed
        this.removeButton = document.querySelector(".remove-button");
        this.addButton = document.querySelector(".add-button");
        this.minusButton = document.querySelector(".minus-button");
        this.itemPrice = document.querySelector(".item-price");
        this.quantity = document.querySelector(".quantity");
        this.subTotal = document.querySelector(".subtotal-price");
        this.tax = document.querySelector(".tax-price");
        this.total = document.querySelector(".total-price");
    }
    // apply event listeners to buttons
    Cart.prototype.listen = function () {
        var _this = this;
        var _a, _b, _c;
        (_a = this.removeButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.removeItem);
        (_b = this.addButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (self) {
            _this.changeQuantity(self, "+");
        });
        (_c = this.minusButton) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (self) {
            _this.changeQuantity(self, "-");
        });
    };
    // apply change in quantity
    Cart.prototype.changeQuantity = function (event, button) {
        var siblings = event.target.parentNode.children;
        var sibling = this.searchNode(siblings, "quantity");
        if (button == "-") {
            if (parseInt(sibling.textContent) <= 1) {
                return;
            }
            sibling.textContent = "" + (parseInt(sibling.textContent) - 1);
        }
        else {
            sibling.textContent = "" + (parseInt(sibling.textContent) + 1);
        }
        this.updatePrice();
    };
    // remove an item from cart
    Cart.prototype.removeItem = function (event) {
        event.target.parentNode.style.display = "none";
    };
    // update prices on cart
    Cart.prototype.updatePrice = function () {
        var itemList = document.querySelectorAll(".item");
        // update subtotal
        var subtotal = 0;
        for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
            var item = itemList_1[_i];
            subtotal += parseInt(this.searchNode(item.children, "item-price").textContent)
                * parseInt(this.searchNode(item.children, "quantity").textContent);
        }
        if (this.subTotal != null) {
            this.subTotal.textContent = "" + subtotal;
        }
        // update tax
        if (this.tax != null) {
            this.tax.textContent = "" + (subtotal * 0.05 + subtotal * 0.07).toFixed(3);
        }
        // update total
        if (this.total != null) {
            this.total.textContent = "" + (subtotal * 1.05 + subtotal * 0.07).toFixed(3);
        }
    };
    // search for nodeName under nodes' DOM
    Cart.prototype.searchNode = function (nodes, nodeName) {
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            console.log(node.textContent);
            if (node.classList.contains("" + nodeName)) {
                console.log(node.textContent);
                return node;
            }
            else if (node.children.length != 0) {
                var answer = this.searchNode(node.children, nodeName);
                if (answer != undefined) {
                    return answer;
                }
            }
        }
    };
    // tax is essential
    Cart.GST = 1.05;
    Cart.HST = 1.07;
    return Cart;
}());
console.log("cart prototype");
var cart = new Cart();
cart.listen();
