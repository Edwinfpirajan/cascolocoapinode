const fetch = require("node-fetch");
const axios = require('axios');
const { XMLParser } = require("fast-xml-parser");
const { response } = require("express");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
};

const uri = process.env.uri;
const key = '&ws_key='+process.env.key;
const keyJS = '&output_format=JSON&ws_key='+key;
const filterParameter = "=>[2023-00-00%2024:00:00]"
// Consume products to front
/** (details : array (\n  0 => 'display=full',\n))\". However, these are available
 * @var images : id, id_manufacturer, id_supplier, id_category_default, new, cache_default_attribute, id_default_image, id_default_combination, id_tax_rules_group, position_in_category, manufacturer_name, quantity, type, id_shop_default, reference, supplier_reference, location, width, height, depth, weight, quantity_discount, ean13, isbn, upc, mpn, cache_is_pack, cache_has_attachments, is_virtual, state, additional_delivery_times, delivery_in_stock, delivery_out_stock, product_type, on_sale, online_only, ecotax, minimal_quantity, low_stock_threshold, low_stock_alert, price, wholesale_price, unity, unit_price_ratio, additional_shipping_cost, customizable, text_fields, uploadable_files, active, redirect_type, id_type_redirected, available_for_order, available_date, show_condition, condition, show_price, indexed, visibility, advanced_stock_management, date_add, date_upd, pack_stock_type, meta_description, meta_keywords, meta_title, link_rewrite, name, description, description_short, available_now, available_later" */
const getProducts = async (req, res) => {
    const { step, since } = req.body;
    console.log(req);
    try {
        const nlimit=step? step :5;
        const offset=since? since :9;
        const display ='?display=[id,price,name,reference,stock_availables[id,id_product_attribute],images[id ]'
        const filter ="&filter[date_add]"+filterParameter;
        const sort= "&sort=[quantity_DESC]"
        const limit = '&limit='+offset+','+nlimit
        const schema = await axios.get(`${uri}/products?schema=blank${key}`);
        console.log(schema.data);
        const { data: response } = await axios.get(
            `https://serverpruebas.tk/api/products?display=[id,price,name,reference,stock_availables[id,id_product_attribute]]&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
        );
        const { data: response2 } = await axios.get(
            `https://serverpruebas.tk/api/combinations?display=[id, id_product,quantity,reference,product_option_values[id]]&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
        );
        const { data: response3 } = await axios.get(
            `https://serverpruebas.tk/api/product_option_values?display=[id,name]&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
        );

        const { products } = response;
        const { combinations } = response2;
        const { product_option_values } = response3;

        let producto = [];
        products.map(({ id, price, name, associations }) => {
            if (associations && associations.stock_availables) {
                for (let stock_available of associations.stock_availables) {
                    let finalName = name;
                    console.log(associations);
                    const data_product = combinations.find(
                        (combination) => combination.id == stock_available.id_product_attribute
                    );

                    if (data_product && data_product.associations && data_product.associations.product_option_values) {
                        for (let combine of data_product.associations.product_option_values) {
                            const data_product_option = product_option_values.find(
                                (product_option) => product_option.id == combine.id
                            );
                            finalName += `${data_product_option.name}`;
                        }
                    }
                    producto.push({
                        id,
                        price: price * 1.19,
                        quantity: data_product ? data_product.quantity : 0,
                        name: finalName,
                        reference: data_product ? data_product.reference : 0,
                        associations: stock_available.id_product_attribute,
                    });
                }
            }
        });
        return res.json(producto);
    } catch (error) {
        console.log("Errores",error);
        return res.status(error.response.status).json(error.response.data.errors);
    }
};

const getProduct = async (id) => {
    try {
        const res = await fetch(
            `https://serverpruebas.tk/api/products/${id}?display=full&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
        );
        // const data = await res.text();
        // let jsonObj = parser.parse(data);
        // let text1 = "#text"
        // let products = jsonObj.prestashop.product;
        // let producto = []
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (product) => {
    console.log('producto',product);
    
    const {
        name,
        price,
        quantity
    } = product
    const xmlString = `
        <prestashop>
          <product>
            <name>
               <language id="1">${name}</language>
            </name>
            <price>${price}</price>
            <stock_availables nodeType="stock_available" api="stock_availables">
               <stock_available >
                   <id>
                    ${quantity}
                   </id>
            <id_product_attribute>
            <![CDATA[ 0 ]]>
            </id_product_attribute>
        </stock_available>
        </stock_availables>
        </product>
        </prestashop>
        `

        try {
            const res = await axios.post(
                'https://serverpruebas.tk/api/products?output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I', xmlString,
                {
                    headers: {
                        'Content-Type': 'text/xml',
                    }
                }
            );
            return res.data
            
        } catch (error) {
            console.log('error',error);
        }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, position_in_category } = req.body;

    const bodyXml = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
                        <product>
                           <price>
                              <![CDATA[ ${price} ]]>
                           </price>
                           <name>
                             <language id="1" xlink:href="https://tienda.scsintercom.com/api/languages/1">
                                <![CDATA[ ${name} ]]>
                             </language>
                           </name>
                          </product>
                     </prestashop>`
                     //https://tienda.scsintercom.com/api/products/88?display=full&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I

    try {
        const response = await axios.patch(`${uri}products/${id}?display=full&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`, bodyXml, {
            headers: {
                'Content-Type': 'text/xml',
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// const updateProduct = async (product) => {

//     const {
//         id,
//         name,
//         price,
//         quantity,
//         position_in_category
//     } = product

    
//     const res = await axios.path(
//         `https://serverpruebas.tk/api/products/${product}?output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`, xmlString,
//         {
//             headers: {
//                 'Content-Type': 'text/xml',
//             }
//         }
//     );
//     return res.data
// };

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}