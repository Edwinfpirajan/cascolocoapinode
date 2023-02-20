const fetch = require("node-fetch");
const axios = require('axios');
const { XMLParser } = require("fast-xml-parser");
const { response } = require("express");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
};
const uri = process.env.uri;
const key = process.env.key;

//const uri = `https://${key}@serverpruebas.tk/api/`
const getProducts = async (req, res) => {
    try {
        const schema = await axios.get(`${uri}addresses?schema=blank&ws_key=${key}`);
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
        console.log(combinations);

        let producto = [];
        products.map(({ id, price, name, associations }) => {
            if (associations && associations.stock_availables) {
                for (let stock_available of associations.stock_availables) {
                    let finalName = name;
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
        console.log(error);
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

const updateProduct = async (product) => {

    const {
        id,
        name,
        price,
        quantity,
        position_in_category
    } = product

    
    const res = await axios.path(
        `https://serverpruebas.tk/api/products?output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`, xmlString,
        {
            headers: {
                'Content-Type': 'text/xml',
            }
        }
    );
    return res.data
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}