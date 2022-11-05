// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: '/img/',
          showCart: false,
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: `<li class="header-right-item">
                   <button class="btn-cart" type="button" @click="showCart = !showCart"><img src="img/cart.svg" alt="cart"></button>
                       <div class="basket" v-show="showCart">
                           <cart-item v-for="item of cartItems" 
                           :key="item.id_product" 
                           :imgCart="imgCart" 
                           :cart-item="item" 
                           @remove="remove">
                           </cart-item>
                       </div>
               </li>
    `
});

Vue.component('cart-item', {
    props: ['imgCart', 'cartItem'],

    data() {
        let cart_img = this.imgCart + this.cartItem.id_product + ".png"
        return {
            cart_img,
        }
    },

    template: `
    <div class="basket-item">
        <img :src="this.cart_img" alt="cart-item"
             class="basket-item-img">
        <div class="basket-item-txt">
            <a href="product.html" class="purchase-item-name">{{ cartItem.product_name }}</a>
            <p class="basket-item-info">Quantity: <span class="basket-item-info-other">{{ cartItem.quantity }}</span></p>
            <p class="basket-item-info">Price each: <span class="basket-item-info-price">{{ cartItem.price }}</span></p>
            <p class="basket-item-info">Price total: <span class="basket-item-info-price">{{cartItem.quantity*cartItem.price}}</span></p>
        </div>
        <button class="basket-item-delete" @click="$emit('remove', cartItem)"><img src="img/purchase-delete.svg" alt="cross"></button>
    </div>
    `
})