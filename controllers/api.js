const fetch = require("node-fetch");
const axios = require('axios');
const { XMLParser } = require("fast-xml-parser");
const { response } = require("express");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
};
const parser = new XMLParser(options);

// const getProducts = async () => {
//     try {
//         const res = await fetch(
//             'https://serverpruebas.tk/api/products?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH'
//         );
//         const data = await res.text();
//         let jsonObj = parser.parse(data);
//         let products = jsonObj.prestashop.products.product;
//         let producto = []
//         let text = '#text'
//         products.map(({ id, price, quantity, name, reference, associations}) => {
//             producto.push({ id, price: price * 1.19, quantity: quantity[text], name: name.language[text], reference, associations: associations.stock_availables.stock_available.id_product_attribute})
//         })
//         console.log(producto)
//         return producto
//     } catch (error) {
//         console.log(error);
//     }
// };

// const getProducts = async () => {
//     try {
//         const { data: response } = await axios.get(
//             `https://serverpruebas.tk/api/products?display=[id,price,name,reference,stock_availables[id,id_product_attribute]]&output_format=JSON&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`
//         );
//         const { data: response2 } = await axios.get(
//             `https://serverpruebas.tk/api/products?display=[id, id_product,quantity,reference,product_option_values[id]]&output_format=JSON&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`
//         );
//         const { data: response3 } = await axios.get(
//             `https://serverpruebas.tk/api/products?display=[id,name]&output_format=JSON&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`
//         );

//         let producto = [];
//         response.products.map(({ id, price, name, associations }) => {
//             if (associations && associations.stock_availables) {
//                 for (let item of associations.stock_availables) {
//                     let finalName = name;
//                     let data_product = response2.combinations.find((i) => i.id == item.id_product_attribute);

//                     if (data_product && data_product.associations && data_product.associations.product_option_values) {
//                         for (let combine of data_product.associations.product_option_values) {
//                             let data_product_option = response3.product_option_values.find((c) => c.id == combine.id);
//                             finalName += `${data_product_option.name}`;
//                         }
//                     }
//                     producto.push({
//                         id,
//                         price: price * 1.19,
//                         quantity: data_product ? data_product.quantity : 0,
//                         name: finalName,
//                         reference: data_product ? data_product.reference : 0,
//                         associations: item.id_product_attribute
//                     });
//                 }
//             }
//         });
//         return producto

//     } catch (error) {
//         console.log(error);
//     }
// };

const getProducts = async () => {
    try {
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
        return producto;
    } catch (error) {
        console.log(error);
    }
};
// const getProduct = async (id) => {
//     try {
//         const { data: response } = await axios.get(
//             `https://serverpruebas.tk/api/products/${id}?display=[id,price,name,reference,stock_availables[id,id_product_attribute]]&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
//         );
//         const { data: response2 } = await axios.get(
//             `https://serverpruebas.tk/api/combinations/${id}?display=[id, id_product,quantity,reference,product_option_values[id]]&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
//         );
//         const { data: response3 } = await axios.get(
//             `https://serverpruebas.tk/api/product_option_values/${id}?display=[id,name]&output_format=JSON&ws_key=S7UVTH5XIPYEPRWRHD5SUZNVZKT8SU1I`
//         );

//         const { products } = response;
//         const { combinations } = response2;
//         const { product_option_values } = response3;

//         let producto = [];
//         products.map(({ id, price, name, associations }) => {
//             if (associations && associations.stock_availables) {
//                 for (let stock_available of associations.stock_availables) {
//                     let finalName = name;
//                     const data_product = combinations.find(
//                         (combination) => combination.id == stock_available.id_product_attribute
//                     );

//                     if (data_product && data_product.associations && data_product.associations.product_option_values) {
//                         for (let combine of data_product.associations.product_option_values) {
//                             const data_product_option = product_option_values.find(
//                                 (product_option) => product_option.id == combine.id
//                             );
//                             finalName += `${data_product_option.name}`;
//                         }
//                     }
//                     producto.push({
//                         id,
//                         price: price * 1.19,
//                         quantity: data_product ? data_product.quantity : 0,
//                         name: finalName,
//                         reference: data_product ? data_product.reference : 0,
//                         associations: stock_available.id_product_attribute,
//                     });
//                 }
//             }
//         });
//         return producto;
//     } catch (error) {
//         console.log(error);
//     }
// };

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
        quantity
    } = product

    const xmlString = `
    <prestashop>
      <product>
        <id>${id}</id>
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
    const res = await axios.put(
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







