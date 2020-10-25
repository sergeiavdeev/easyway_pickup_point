module.exports={
    query: function(params) {
        var query = '/EasyWay/odata/standard.odata/'+ params.table + '?$format=json';

        if (params.filter) {
            query += '&$filter='+ params.filter;
        }

        if (params.fields) {
            query += '&$select=' + params.fields;
        }

        if (params.sort) {
            query += '&$orderby=' + params.sort;
        }

        if (params.count) {
            query += '&$top=' + params.count;
        }

        if (params.expand) {
            query += '&$expand=' + params.expand;
        }

        

        return encodeURI(query);
    }
}