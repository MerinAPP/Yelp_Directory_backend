export const MaxImageSize = 10 * 1000 * 1000; // 10 mb
export const SystemConst = {
  VERIFICATION_CODE_EXP: 1000 * 60 * 30, // 30 minutes
  REFRESH_TOKEN_EXP: 1000 * 60 * 60 * 24 * 7, // 1 week
  REFRESH_HALF_LIFE: 1000 * 60 * 60 * 24 * 3, //3 days
  REFRESH_COOKIE: 'REFRESH_TOKEN',
};

export const PRODUCTION_BASE_URL = "https://services.santimpay.com/api/v1/gateway";
export const TEST_BASE_URL = "https://testnet.santimpay.com/api/v1/gateway";

export const PRIVATE_KEY_IN_PEM = `
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIKc3hdMRdIb+7B6eoc4ZjcpuEZlsEAj4kXJy3rPjOkRyoAoGCCqGSM49
AwEHoUQDQgAEdFnQpWFqLdvvtmQCNcMHYRcHv/AaYMKL3atdGSHlsDWmySSvvdjX
D0c63NvNY8Ky/QISmpyXh/ckq2gAtcKVDQ==
-----END EC PRIVATE KEY-----
`;

export const GATEWAY_MERCHANT_ID = "f802d2a9424b49b8-a20c-576555cdb137";

export const successRedirectUrl = "https://santimpay.com";
export const failureRedirectUrl = "https://santimpay.com";
export const cancelRedirectUrl = "https://santimpay.com";
export const notifyUrl = "https://api.merinbd.com/api/v1/subscribe/webhook";



export const pricing = {
  "Standard": 1
}