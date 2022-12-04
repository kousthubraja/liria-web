import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";


const PK = 'your_channel_address_secret_key'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
const sendNotification = async() => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `Donation Request`,
          body: `Donation key`
        },
        payload: {
          title: `[sdk-test] payload title`,
          body: `sample msg body`,
          cta: '',
          img: ''
        },
        recipients: 'eip155:5:0x537311ffc67Ba9BA65a32BDaa30529D52eB6B69E', // recipient address
        channel: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
        env: 'staging'
      });
      
      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
  }