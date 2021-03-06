const fetch = require("node-fetch");
const buildApp = require("../../buildApp");

module.exports = async (ipresponse, store, tray) => {
  console.log("in POSTaccessToken");

  try {
    const response = await fetch(
      "http://" + ipresponse[0].internalipaddress + "/api",
      {
        method: "POST",
        body: '{"devicetype":"my_hue_app#iphone peter"}'
      }
    );

    const jsonResponse = await response.json();

    store.set("username", jsonResponse[0].success.username);
    store.set("bridgeip", ipresponse[0].internalipaddress);

    buildApp(store, tray);
  } catch (err) {
    throw new Error(`Error in POSTusername: ${err}`);
  }
};
