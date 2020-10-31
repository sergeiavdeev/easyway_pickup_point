
const API_PATH = "http://10.1.27.171:8081/v2/";

export default {

    async getOrders(apiKey) {
        
        let orders = [];

        const res = await fetch(API_PATH + 'orders?apiKey=' + apiKey);
        const result = await res.json();

        if (!result.isError) {        
            
            orders = result.data;            
                        
            await Promise.all(orders.map(async el => {
                await this.getCommon(el);
                return Promise.all([
                    this.getContact(el), 
                    this.getPlace(el)
                ]);                               
            }));                    
            
            console.log('Заказы получены');
            return orders;
        }    
        
        return result.errors;
    },

    async getCommon(order) {

        const res = await fetch(API_PATH + 'order?id=' + order.id);
        const result = await res.json();

        if (!result.isError) {        
            order.common = result.data;
            return order;
        } 

        order.common = result.errors;
        return order;
    },

    async getContact(order) {

        const res = await fetch(API_PATH + 'contact?id=' + order.common.recieverId);
        const result = await res.json();

        if (!result.isError) {        
            order.contact = result.data;
            return order;
        } 

        order.contact = result.errors;
        return order;
    },

    async getPlace(order) {

        order.common.places.map(async el => {
            const res = await fetch(API_PATH + 'place?id=' + el.id);
            const result = await res.json();   
            
            if (!result.isError) {
                let place = result.data;
                Object.assign(el, place);
            }
            return el;
        });        

        return order;
    }
}