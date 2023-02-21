const fetch = require("node-fetch");
const axios = require('axios');
const uri = process.env.uri+'orders';
const key = '&ws_key='+process.env.key;
const keyJS = '&output_format=JSON&ws_key='+key;
// ToDO hacer fucionar el filter 
const filterParameter = "=>[2023-00-00%2024:00:00]"
// Info XML from Prestashop
const getOrdersSchema = async (req, res) => {
    try {
        const schema = await axios.get(`${uri}?schema=blank${key}`);
        console.log(schema);
        return res.json(schema.data);
    } catch (error) {
        console.log(error);
    }
};
const getOrders = async (req, res) => {
    try {
        const nlimit=5;
        const offset=9;
        const display ='?display=full'
        const filter ="&filter[date_add]"+filterParameter;
        const sort= "&sort=[date_add_DESC]&date=1"
        const limit = '&limit='+offset+','+nlimit
        const schema = await axios.get(`${uri}${display}${sort}${limit}${keyJS}`);
        console.log(schema.data.orders[1]);
        let pedidos = [];
        pedidos=schema.data.orders.map(({id, date_upd, associations}) => ({key: id, fecha: date_upd, Productos: associations.order_rows}));
        return res.json(pedidos);
    } catch (error) {
        console.log(error);
        return res.status(error.response.status).json(error.response.data.errors);
    }
};
module.exports = {
    getOrdersSchema,
    getOrders
}