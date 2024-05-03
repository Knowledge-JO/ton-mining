import TonWeb from "tonweb";

const tonweb = new TonWeb(
  new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
    apiKey: "66a6c214df376094daa13097571acc4229bbebbc97e4c1f780114cd76594e9d7",
  })
);

export default tonweb;
