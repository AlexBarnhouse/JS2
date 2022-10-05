"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container= '.product-board') {
        this.container = container;
        this.goods = [];
        this._fetchProducts()
            .then(data => { //data - объект js
                this.goods = data;
                 console.log(data);
                this.render()
            });
    }
    _fetchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.image = product.image;
        this.price = product.price;
        this.image = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}" 
                                          data-price="${this.price}"
                                          data-name="${this.title}">
                <img src="${this.image}" alt="#" class="product-item-img">
                <div class="product-item-title">${this.title}</div>
                <span class="product-item-price">${this.price}</span>
                    <div class="button-wrap">
                        <button class="add-to-cart">
                            Купить
                        </button>
                    </div>
            </div>`
    }
}

let list = new ProductList();