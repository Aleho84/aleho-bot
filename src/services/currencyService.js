import NodeCache from 'node-cache';
import { dolar_euroFunction, btc_ethFunction } from '../utils/currency.js';
import logger from '../utils/logger.js';

const cache = new NodeCache({ stdTTL: 600 }); // TTL de 10 minutos (600 segundos)

export const getDolarInfo = async () => {
    try {
        const cacheKey = 'dolar_euro_data';
        let data = cache.get(cacheKey);

        if (!data) {
            logger.info('[CURRENCY SERVICE]: Cache Miss - Consultando API externa para Dólar/Euro');
            const response = await dolar_euroFunction();

            if (response.error || response.status !== 200) {
                logger.error(`[CURRENCY SERVICE]: Error al obtener datos: ${response.error?.message || 'Status no es 200'}`);
                return { content: '🤯 Hay problemas técnicos, volvé a intentarlo más tarde', success: false };
            }

            data = response.data;
            cache.set(cacheKey, data);
        } else {
            logger.info('[CURRENCY SERVICE]: Cache Hit - Usando datos en caché para Dólar/Euro');
        }

        const msg = [
            `Dolar Oficial 🧑‍✈️`,
            `-Compra:  ${data.oficial.value_buy}`,
            `-Venta:      ${data.oficial.value_sell}`,
            ``,
            `Dolar Blue 💵 `,
            `-Compra:  ${data.blue.value_buy}`,
            `-Venta:      ${data.blue.value_sell}`
        ].join('\n');

        return { content: msg, success: true };
    } catch (error) {
        logger.error(`[CURRENCY SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};

export const getBtcInfo = async () => {
    try {
        const cacheKey = 'btc_eth_data';
        let data = cache.get(cacheKey);

        if (!data) {
            logger.info('[CURRENCY SERVICE]: Cache Miss - Consultando API externa para Criptos');
            const response = await btc_ethFunction();

            if (response.error || response.status !== 200) {
                logger.error(`[CURRENCY SERVICE]: Error al obtener datos: ${response.error?.message || 'Status no es 200'}`);
                return { content: '🤯 Hay problemas técnicos, volvé a intentarlo más tarde', success: false };
            }

            data = response.data;
            cache.set(cacheKey, data);
        } else {
            logger.info('[CURRENCY SERVICE]: Cache Hit - Usando datos en caché para Criptos');
        }

        const valores = [
            data.btc.letsbit.ask,
            data.btc.binancep2p.ask,
            data.btc.tiendacrypto.ask,
            data.btc.fiwind.ask,
            data.btc.bitsoalpha.ask
        ];
        const sumaValores = valores.reduce((acumulador, valores) => acumulador + valores, 0);
        const promedio = sumaValores / valores.length;

        return { data: { valores, promedio }, success: true };
    } catch (error) {
        logger.error(`[CURRENCY SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};

export const getEthInfo = async () => {
    try {
        const cacheKey = 'btc_eth_data';
        let data = cache.get(cacheKey);

        if (!data) {
            logger.info('[CURRENCY SERVICE]: Cache Miss - Consultando API externa para Criptos (ETH request)');
            const response = await btc_ethFunction();

            if (response.error || response.status !== 200) {
                logger.error(`[CURRENCY SERVICE]: Error al obtener datos: ${response.error?.message || 'Status no es 200'}`);
                return { content: '🤯 Hay problemas técnicos, volvé a intentarlo más tarde', success: false };
            }

            data = response.data;
            cache.set(cacheKey, data);
        } else {
            logger.info('[CURRENCY SERVICE]: Cache Hit - Usando datos en caché para Criptos (ETH request)');
        }

        const valores = [
            data.eth.letsbit.ask,
            data.eth.binancep2p.ask,
            data.eth.tiendacrypto.ask,
            data.eth.fiwind.ask,
            data.eth.bitsoalpha.ask
        ];
        const sumaValores = valores.reduce((acumulador, valores) => acumulador + valores, 0);
        const promedio = sumaValores / valores.length;

        return { data: { valores, promedio }, success: true };
    } catch (error) {
        logger.error(`[CURRENCY SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};

export const getEuroInfo = async () => {
    try {
        const cacheKey = 'dolar_euro_data';
        let data = cache.get(cacheKey);

        if (!data) {
            logger.info('[CURRENCY SERVICE]: Cache Miss - Consultando API externa para Dólar/Euro (Euro request)');
            const response = await dolar_euroFunction();

            if (response.error || response.status !== 200) {
                logger.error(`[CURRENCY SERVICE]: Error al obtener datos: ${response.error?.message || 'Status no es 200'}`);
                return { content: '🤯 Hay problemas técnicos, volvé a intentarlo más tarde', success: false };
            }

            data = response.data;
            cache.set(cacheKey, data);
        } else {
            logger.info('[CURRENCY SERVICE]: Cache Hit - Usando datos en caché para Dólar/Euro (Euro request)');
        }

        const msg = [
            `Euro Oficial 🧑‍✈️`,
            `-Compra:  ${data.oficial_euro.value_buy}`,
            `-Venta:      ${data.oficial_euro.value_sell}`,
            ``,
            `Euro Blue 💵 `,
            `-Compra:  ${data.blue_euro.value_buy}`,
            `-Venta:      ${data.blue_euro.value_sell}`
        ].join('\n');

        return { content: msg, success: true };
    } catch (error) {
        logger.error(`[CURRENCY SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};
