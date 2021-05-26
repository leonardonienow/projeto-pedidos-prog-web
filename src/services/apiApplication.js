const api = require('./api')

module.exports = {
    async get(rotaApi, param)
    {
        switch (rotaApi) {
            case '/pedidos':

                let body = {
                };

                let response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                    },
                });

                if (response.data.message !== undefined && response.data.message.length > 0)
                    return response.data.message;

                return [];
                break;
            case '/pedidos/pedido_id':

                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                        id: param[1],
                    },
                });

                if (response.data.message !== undefined && response.data.message.length > 0)
                    return response.data.message;

                return false;
                break;
            case '/pedidos_itens':
                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                        pedido_id: param[1],
                    },
                });

                if (response.data.message !== undefined && response.data.message.length > 0)
                    return response.data.message;

                return [];
                break;
            case '/pedidos_itens/pedido_item_id':
                break;
            case '/produtos':
                body = {
                };

                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                    },
                });

                if (response.data.message !== undefined && response.data.message.length > 0)
                    return response.data.message;

                return false;
                break;
            case '/produtos/produto_id':
                break;
            case '/controles_genericos/controles_genericos_id':
                body = {
                };

                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                        tipo: param[1],
                    },
                });

                if (response.data.message !== undefined)
                    return response.data.message;

                return [];
                break;
            case '/retorna_por_cliente':
                body = {
                };

                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                        dataIni: param[1],
                        dataFim: param[2],
                    },
                });

                if (response.data.message !== undefined)
                    return response.data.message;

                return [];
                break;
            case '/retorna_por_pagamento':
                body = {
                };

                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                        dataIni: param[1],
                        dataFim: param[2],
                    },
                });

                if (response.data.message !== undefined)
                    return response.data.message;

                return [];
                break;
            case '/retorna_por_produto':
                body = {
                };

                response = await api.get(rotaApi, {
                    params: {
                        database_name: param[0],
                        dataIni: param[1],
                        dataFim: param[2],
                    },
                });

                if (response.data.message !== undefined)
                    return response.data.message;

                return [];
                break;
        }
    },
    async post(rotaApi, param)
    {
        let database = '';

        switch (rotaApi) {
            case '/login':

                let body = {
                    usuario: param[0],
                    senha: param[1],
                };

                let response = await api.post(rotaApi, body);

                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return response.data.message[0];
                }

                return false;
                break;
            case '/pedidos':
                body = {
                    database_name: param[0],
                    pedido: param[1],
                };
                response = await api.post(rotaApi, body);
                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return response.data.message;
                }
                return false;
                break;
            case '/pedidos_itens':
                body = {
                    database_name: param[0],
                    pedidoItem: param[1],
                    pedido: param[2],
                };
                response = await api.post(rotaApi, body);
                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return response.data.message;
                }
                return false;
                break;
        }
    },
    async put(rotaApi, param)
    {
        switch (rotaApi) {
            case '/pedidos':
                let body = {
                    database_name: param[0],
                    pedido: param[1],
                };

                let response = await api.put(rotaApi, body);
                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return true;
                }
                return false;
                break;
            case '/pedidos_itens':
                body = {
                    database_name: param[0],
                    pedidoItem: param[1],
                };
                response = await api.put(rotaApi, body);

                if (response.data.message == true) {
                    return true;
                }
                return false;
                break;
            case '/pedidos/marcar_entregue':
                body = {
                    database_name: param[0],
                    pedido: param[1],
                };

                response = await api.put(rotaApi, body);
                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return true;
                }
                return false;
                break;
        }
    },
    async del(rotaApi, param)
    {
        switch (rotaApi) {
            case '/pedidos':
                let body = {
                    pedido: param[0],
                    database_name: param[1],
                };

                let response = await api.delete(rotaApi, {
                    data: body
                });
                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return true;
                }
                return false;
                break;
            case '/pedidos_itens':
                body = {
                    pedidoItem: param[0],
                    database_name: param[1],
                };

                response = await api.delete(rotaApi, {
                    data: body
                });

                if (response.data.message !== undefined && response.data.message.length > 0) {
                    return true;
                }
                return false;
                break;
        }
    }
}