Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: '/img/',
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :imgProduct="imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'imgProduct'],

    data() {
        let prod_img = this.imgProduct + this.product.id_product + ".png"
        return {
            prod_img,
        }
    },

    template: `
            <div class="product-item">
                    <a href="#" class="item-link">
                        <img :src="this.prod_img" alt="item" class="item-img">
                        <div class="item-txt">
                            <p class="item-name">{{product.product_name}}</p>
                            <p class="item-price">{{product.price}}</p>
                        </div>
                    </a>
                    <div class="cart-box">
                        <button @click="$emit('add-product', product)">
                            <img src="img/cart-link.png" alt="cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
    `
})