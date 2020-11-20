<template>
    <div>
        <div class="card mt-2">
            <div class="card-header" role="button" data-toggle="modal" data-target="#orderModal">{{index}} мест: {{placeCount}}</div>
            <div class="card-body" v-if="ordersTab != 3" role="button" data-toggle="modal" data-target="#orderModal">                        
                <p>Получатель: {{reciever}}, тел.: {{phone}}</p>
                <p>К оплате: {{toPay}}</p>                       
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="place in places" v-bind:key="place.id">
                    <p v-if="ordersTab != 3">{{placeDescription(place)}}</p>
                    <div class="form-check" v-if="ordersTab == 3">
                        <input class="form-check-input" type="checkbox" :value="place.id" :id=place.id v-model="checkPlaces" @change="placeCheck">
                        <label class="form-check-label" :for=place.id>
                            {{placeDescription(place)}}
                        </label>
                    </div>
                </li>            
            </ul>              
        </div>

        <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="orderModalLabel">{{index}} мест: {{placeCount}}</h5>
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
import {mapGetters, mapActions} from 'vuex';

export default {
    name: "Order",
    props: {
        order: null
    },  
    data: function (){
        return {
            checkPlaces: []
        }
    },  
    computed: {
        ...mapGetters(["ordersTab"]),
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
        ...mapActions(["ordersSetCheck"]),
        placeDescription: function(place) {      
            return "ШК: " + place.barcode + ", вес: " + place.weight + ", (ДхШхВ): " + 
                place.length + "x" + place.width + "x" + place.height;
        },
        placeCheck: function() {
            let newPlaces = this.order.common.places.slice();
            let checked = this.checkPlaces;

            newPlaces.map(function(place) {
                let i = checked.indexOf(place.id);
                
                if (place.id == checked[i]) {
                    place.checked = true;
                } else {
                    place.checked = false;
                }
            });

            this.ordersSetCheck({order: this.order, places: newPlaces});
        }    
    },
    mounted() {

    } 
}
</script>

<style scoped>

</style>