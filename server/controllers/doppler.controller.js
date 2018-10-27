class DopplerController {
    constructor(redisClientFactory) {
      this.redisClientFactory = redisClientFactory;
    }

    async getShops(request, response) {
        const {
            session: { dopplerApiKey }
        } = request;

        const redis = this.redisClientFactory.createClient();
        const shops = (await redis.getShopsAsync(dopplerApiKey, false))
        .map(async shopName => {
            let shop = await redis.getShopAsync(shopName);
            return {
                shop: shopName,
                accessToken: shop.accessToken,
                connectedOn: shop.connectedOn
            };
        });
        
        response.json(await Promise.all(shops));
        await redis.quitAsync();
    }
}

module.exports = DopplerController;