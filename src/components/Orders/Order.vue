<template>
    <div>
        <div class="card mt-2" role="button" data-toggle="modal" data-target="#exampleModal">
            <div class="card-header">{{index}} мест: {{placeCount}}</div>
            <div class="card-body">                        
                <p>Получатель: {{reciever}}, тел.: {{phone}}</p>
                <p>К оплате: {{toPay}}</p>                       
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="place in places" v-bind:key="place.id">{{placeDescription(place)}}</li>            
            </ul>     
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{index}} мест: {{placeCount}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-success">Выдать</button>
                    </div>
                </div>
            </div>
        </div>
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
            return order.common ? order.common.places : [];   
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