const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

const pubDer = publicKey.export({ type: "spki", format: "der" });
// Ed25519 raw public key is the last 32 bytes of the SPKI DER encoding
const rawPub = pubDer.subarray(pubDer.length - 32);
const sqldKey = Buffer.from(rawPub).toString("base64url");

const header = Buffer.from(JSON.stringify({ alg: "EdDSA", typ: "JWT" })).toString("base64url");
const payload = Buffer.from(JSON.stringify({ iat: Math.floor(Date.now() / 1000) })).toString("base64url");
const data = header + "." + payload;
const signature = crypto.sign(null, Buffer.from(data), privateKey).toString("base64url");

console.log("SQLD_AUTH_JWT_KEY=" + sqldKey);
console.log("ASTRO_DB_APP_TOKEN=" + data + "." + signature);
