const fetch = require("node-fetch");
const axios = require('axios');
/** 
 * @var Parameter :\"RappiPaymentHasFinished\", \"addresses\", \"attachments\", \"carriers\", \"cart_rules\",\"carts\",
 * \"categories\", \"combinations\", \"configurations\", \"contacts\", \"content_management_system\", \"countries\", 
 * \"currencies\", \"customer_messages\", \"customer_threads\", \"customers\", \"customizations\", \"deliveries\", 
 * \"employees\", \"groups\", \"guests\", \"image_types\", \"images\", \"languages\", \"manufacturers\", \"messages\", 
 * \"order_carriers\", \"order_cart_rules\", \"order_details\", \"order_histories\", \"order_invoices\", \"order_payments\", 
 * \"order_slip\", \"order_states\", \"orders\", \"price_ranges\", \"product_customization_fields\", \"product_feature_values\", 
 * \"product_features\", \"product_option_values\", \"product_options\", \"product_suppliers\", \"products\", \"search\", \"shop_groups\", 
 * \"shop_urls\", \"shops\", \"specific_price_rules\", \"specific_prices\", \"states\", \"stock_availables\", \"stock_movement_reasons\", 
 * \"stock_movements\", \"stocks\", \"stores\", \"suppliers\", \"supply_order_details\", \"supply_order_histories\", 
 * \"supply_order_receipt_histories\", \"supply_order_states\", \"supply_orders\", \"tags\", \"tax_rule_groups\", \"tax_rules\", 
 * \"taxes\", \"translated_configurations\", \"warehouse_product_locations\", \"warehouses\", \"weight_ranges\", \"zones\""
     */
const uri = process.env.uri+'stock_availables';
const key = '&ws_key='+process.env.key;
const keyJS = '&output_format=JSON&ws_key='+key;
const filterParameter = "=>[2023-00-00%2024:00:00]"
// Info XML from Prestashop
const getStockSchema = async (req, res) => {
    try {
        const schema = await axios.get(`${uri}?schema=blank${key}`);
        console.log(schema);
        return res.json(schema.data);
    } catch (error) {
        return res.json(error);
    }
};
const getStock = async (req, res) => {
    let schema=[];
    try {
        const nlimit=5;
        const offset=9;
        const display ='?display=full'
        const filter ="&filter[date_add]"+filterParameter;
        // const sort= "&sort=[date_add_DESC]&date=1"
        const limit = '&limit='+offset+','+nlimit
        const schema = await axios.get(`${uri}${display}${limit}${keyJS}`);
        console.log("Logro",schema);
        return res.json(schema.data);
    } catch (error) {
        //console.log('errores:', error);
        return res.status(error.response.status).json(error.response.data.errors);
    }
};

module.exports = {
    getStockSchema,
    getStock
}