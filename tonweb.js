import TonWeb from "tonweb";

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {apiKey: '4e0fe263f34eea5a0c755a031c4eaf39261887d78b889f68f27b2833d811bd43'}));

export default tonweb;
