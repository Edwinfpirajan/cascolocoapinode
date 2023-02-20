e.getStock=function(t,e){
    var n=t.commit,
    i=window.data.apiStockUrl;
    r.default.http.get(i,{params:{
        order:e.order,
        page_size:e.page_size,
        page_index:e.page_index,
        keywords:e.keywords?e.keywords:[],
        supplier_id:e.suppliers?e.suppliers:[],
        category_id:e.categories?e.categories:[],
        active:"null"!==e.active?e.active:[],
        low_stock:e.low_stock}}).then((function(t){
            n(o.LOADING_STATE,!1),
            n(o.SET_TOTAL_PAGES,
                t.headers.get("Total-Pages")),
                n(o.ADD_PRODUCTS,t.body)}),
                (
                    function(t){
                        (0,a.showGrowl)("error",t.statusText)}))},
                        e.getSuppliers = function(t){
                            var e=t.commit,
                            n=window.data.suppliersUrl;
                            r.default.http.get(n).then((function(t){e(o.SET_SUPPLIERS,t.body)}),
                            (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                            e.getCategories=function(t){
                                var e=t.commit,
                                n=window.data.categoriesUrl;
                                r.default.http.get(n).then((function(t){e(o.SET_CATEGORIES,t.body)}),
                                (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                e.getMovements=function(t,e){
                                    var n=t.commit,
                                    i=window.data.apiMovementsUrl;
                                    r.default.http.get(i,{
                                        params:{
                                            order:e.order,
                                            page_size:e.page_size,
                                            page_index:e.page_index,
                                            keywords:e.keywords?e.keywords:[],
                                            supplier_id:e.suppliers?e.suppliers:[],
                                            category_id:e.categories?e.categories:[],
                                            id_stock_mvt_reason:e.id_stock_mvt_reason?e.id_stock_mvt_reason:[],
                                            id_employee:e.id_employee?e.id_employee:[],
                                            date_add:e.date_add?e.date_add:[]}}).then((function(t){n(o.LOADING_STATE,!1),
                                                n(o.SET_TOTAL_PAGES,t.headers.get("Total-Pages")),
                                                n(o.SET_MOVEMENTS,t.body)}),
                                                (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                                e.getTranslations=function(t){
                                                    var e=t.commit,
                                                    n=window.data.translationUrl; 
                                                    r.default.http.get(n).then((function(t){e(o.SET_TRANSLATIONS,t.body),
                                                        e(o.APP_IS_READY)}),
                                                        (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                                        e.getEmployees=function(t){
                                                            var e=t.commit,n=window.data.employeesUrl;
                                                            r.default.http.get(n).then((function(t){e(o.SET_EMPLOYEES_LIST,t.body)}),
                                                            (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                                            e.getMovementsTypes=function(t){
                                                                var e=t.commit,
                                                                n=window.data.movementsTypesUrl;
                                                                r.default.http.get(n).then((function(t){e(o.SET_MOVEMENTS_TYPES,t.body)}),
                                                                (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                                                e.updateOrder=function(t,e){(0,t.commit)(o.UPDATE_ORDER,e)},
                                                                e.updatePageIndex=function(t,e){(0,t.commit)(o.SET_PAGE_INDEX,e)},
                                                                e.updateKeywords=function(t,e){(0,t.commit)(o.UPDATE_KEYWORDS,e)},
                                                                e.isLoading=function(t){(0,t.commit)(o.LOADING_STATE,!0)},
                                                                e.updateProductQty=function(t,e){(0,t.commit)(o.UPDATE_PRODUCT_QTY,e)},
                                                                e.updateQtyByProductId=function(t,e){
                                                                    var n=t.commit,i=e.url,
                                                                    u=e.delta;
                                                                    r.default.http.post(i,{delta:u}).then((function(t){n(o.UPDATE_PRODUCT,t.body),
                                                                        s.EventBus.$emit("displayBulkAlert","success")}),
                                                                        (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                                                        e.updateQtyByProductsId=function(t){
                                                                            var e=t.commit,n=t.state,i=n.editBulkUrl,
                                                                            u=n.productsToUpdate;
                                                                            r.default.http.post(i,u).then((function(t){e(o.UPDATE_PRODUCTS_QTY,t.body),
                                                                                s.EventBus.$emit("displayBulkAlert","success")}),
                                                                                (function(t){(0,a.showGrowl)("error",t.statusText)}))},
                                                                                e.updateBulkEditQty=function(t,e){(0,t.commit)(o.UPDATE_BULK_EDIT_QTY,e)},
                                                                                e.addProductToUpdate=function(t,e){(0,t.commit)(o.ADD_PRODUCT_TO_UPDATE,e)},
                                                                                e.removeProductToUpdate=function(t,e){(0,t.commit)(o.REMOVE_PRODUCT_TO_UPDATE,e)},
                                                                                e.addSelectedProduct=function(t,e){(0,t.commit)(o.ADD_SELECTED_PRODUCT,e)},
                                                                                e.removeSelectedProduct=function(t,e){(0,t.commit)(o.REMOVE_SELECTED_PRODUCT,e)}},
                                                                                17701:(t,e,n)=>{"use strict";
                                                                                Object.defineProperty(e,"__esModule",{value:!0});
                                                                                var 
                                                                                r=u(n(72100)),
                                                                                i=u(n(20629)),
                                                                                o=u(n(96486)),
                                                                                a=function(t){if(t&&t.__esModule)
                                                                                    return t;
                                                                                    var e={};
                                                                                    if(null!=t)
                                                                                    for(var n in t)
                                                                                    Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
                                                                                    return e.default=t,e}(n(4855)),
                                                                                    s=u(n(4088));
                                                                                    function u(t){return t&&t.__esModule?t:{default:t}}r.default.use(i.default);
