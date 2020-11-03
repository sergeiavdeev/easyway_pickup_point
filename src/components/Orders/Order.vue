<template>
    <div class="card mt-2">
        <div class="card-header">{{index}} мест: {{placeCount}}</div>
        <div class="card-body">                        
            <p>Получатель: {{reciever}}, тел.: {{phone}}</p>
            <p>К оплате: {{toPay}}</p>                       
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="item in places" v-bind:key="item.id">{{placeDescription(item)}}</li>            
        </ul> 
    </div>    
</template>

<script>
export default {
    name: "Order",
    props: {
        order: null
    },    
    computed: {
        index: function() {
            let order = this.order;
            return order.common ? order.common.cargoIndex : "";
        },

        placeCount: function() {
            let order = this.order;
            return order.common ? order.common.placeCount : "";    
        },

        reciever: function() {
            let order = this.order;
            return order.contact ? order.contact.name : "";    
        },

        phone: function() {
            let order = this.order;
            if(order.contact && order.contact.contacts.length > 0) {
                return order.contact.contacts[0].value;    
            }    
            return "";
        },

        toPay: function() {
            let order = this.order;
            return order.common ? order.common.total : 0;    
        },

        places: function() {
            let order = this.order;
            return order.common ? order.common.places : 0;   
        }
    },
    methods: {
        placeDescription: function(place) {
            return "ШК: " + place.barcode + ", вес: " + place.weight + ", (ДхШхВ): " + 
                place.length + "x" + place.width + "x" + place.height;
        }
    },
    mounted() {

    } 
}
</script>

<style scoped>

</style>