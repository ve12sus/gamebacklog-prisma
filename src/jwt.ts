import { sha256 } from 'js-sha256';

export function signToken() : string {
  // loading private key
  const privateKey = 'myPrivateKey';
  // JWT header
  const header = {
    typ: 'JWT',
    alg: 'HS256',
  };
  // JWT payload
  const user = 'john doe';
  const payload = {
    sub: user,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    iat: Math.floor(Date.now() / 1000) - 30,
  };
  // The signature is the header and the body base64URL encoded, SHA 256 hashed, signed with the key
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const headerAndPayload = `${encodedHeader.toString()}.${encodedPayload.toString()}`;
  const signature = sha256.hmac(privateKey, headerAndPayload);
  const token = `${encodedHeader.toString()}.${encodedPayload.toString()}.${signature}`;
  return token;
}

export function decodeToken(token : string) : string {
  const header = token.split('.')[0];
  const decodedHeader = Buffer.from(header, 'base64');
  console.log(decodedHeader.toString());
  return decodedHeader.toString();
}

export function verifySignature(token : string) : boolean {
  try {
    const header = token.split('.')[0];
    const payload = token.split('.')[1];
    const sig = token.split('.')[2];
    const headerPayload = `${header}.${payload}`;
    const recalculatedSig = sha256.hmac('myPrivateKey', headerPayload);
    if (sig === recalculatedSig) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
