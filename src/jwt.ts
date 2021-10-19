import { sha256 } from 'js-sha256';

function unescape(str : string) {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/');
}

function escape(str : string) {
  return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function encode(str : string) {
  return escape(Buffer.from(str, 'utf8').toString('base64'));
}

function decode(str : string) {
  return Buffer.from(unescape(str), 'base64').toString('utf8');
}

export function signToken(user : string) : string {
  const privateKey = 'myPrivateKey';
  const header = {
    typ: 'JWT',
    alg: 'HS256',
  };
  const payload = {
    sub: user,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    iat: Math.floor(Date.now() / 1000) - 30,
  };
  const encodedHeader = encode(JSON.stringify(header));
  const encodedPayload = encode(JSON.stringify(payload));
  const headerAndPayload = `${encodedHeader}.${encodedPayload}`;
  const signatureHex = sha256.hmac(privateKey, headerAndPayload);
  const signature64url = escape(Buffer.from(signatureHex, 'hex').toString('base64'));
  const token = `${headerAndPayload}.${signature64url}`;
  return token;
}

export function decodeBasicHeader(string : string) : string {
  try {
    const basicAuthDecoded = Buffer.from(string.split(' ')[1], 'base64');
    const email = basicAuthDecoded.toString().split(':')[0];
    if (!email) {
      throw new Error('Unexpected error: Invalid JWT');
    } return email;
  } catch (err) {
    throw new Error('Unexpected error: Invalid JWT');
  }
}

export function decodeToken(token : string) : string {
  const header = token.split('.')[0];
  const decodedHeader = Buffer.from(header, 'base64');
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
