"use strict"
const totalBasketPrice = document.querySelector('.basketTotalValue');
const basketButton = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');



class Basket {
    constructor(basketBlock) {
        this.block = basketBlock;
        this.purchase = {};
        this._showBasket();
        this._addToBasket();
    }

    _showBasket() {
        document.querySelector('.cart')
            .addEventListener('click', () =>{
                basketButton.classList.toggle('hidden');
            });
    }

    _addToBasket() {
        document.querySelector('.product-board')
            .addEventListener('click', event => {
               if (!event.target.closest('.add-to-cart')) {
                   return;
               }
                const prod = this.getProduct(event);
                if (!(prod.id in this.purchase)) {
                    this.purchase[prod.id] = {
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        count: 0};
                }
                this.purchase[prod.id].count++;
                totalBasketPrice.innerHTML = this.getTotalBasketPrice()
                    .toFixed(2);
                this.renderBasket(prod.id);
            });
    }

    getProduct(event) {
        const featuredItemEl = event.target.closest('.product-item');
        const id = +featuredItemEl.dataset.id;
        const name = featuredItemEl.dataset.name;
        const price = +featuredItemEl.dataset.price;
        return {id,name,price};
    }

    getTotalBasketPrice() {
        return Object.values(this.purchase)
            .reduce((acc, product) => acc + product.price * product.count, 0);
    }

    renderBasket(prodId) {
        const basketRowEl = basketButton
            .querySelector(`.basketRow[data-productId="${prodId}"]`);
        if (!basketRowEl) {
            this.renderProductInBasket(prodId);
            return;
        }
        basketRowEl.querySelector('.prodCount')
            .innerHTML = this.purchase[prodId].count;
        basketRowEl.querySelector('.prodTotal').innerHTML =
            this.purchase[prodId].count * this.purchase[prodId].price;
    }

    renderProductInBasket(prodId) {
        const productRow = `
        <div class="basketRow" data-productId="${prodId}">
            <div class="">${this.purchase[prodId].name}</div>
            <div class="prodCount">${this.purchase[prodId].count}</div>
            <div class="">${this.purchase[prodId].price}</div>
            <div class="prodTotal">${this.purchase[prodId].count
        * this.purchase[prodId].price}</div>
        </div>`
        basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
    }
}

new Basket(basketTotalEl);