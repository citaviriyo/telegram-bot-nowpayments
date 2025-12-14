import ipnHandler from "../nowpayments-ipn.js";

export default async function handler(req, res) {
  return ipnHandler(req, res);
}
