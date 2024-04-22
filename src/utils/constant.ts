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
MHcCAQEEIOMaKKZ/7V3zfvNSWkPU8dPWdMoQAtF+pXMoX77N3hjxoAoGCCqGSM49
AwEHoUQDQgAE5QIQ+7iWonO2SXHg3amW83snCudYp3+her8JaeMU9mIxDhgvQk9w
WtUvFQTe16IAb/c0UoJtBdJx5HJ+Z/CPLg==
-----END EC PRIVATE KEY-----
`;

export const GATEWAY_MERCHANT_ID = "9e2dab64-e2bb-4837-9b85-d855dd878d2b";

export const successRedirectUrl = "https://santimpay.com";
export const failureRedirectUrl = "https://santimpay.com";
export const cancelRedirectUrl = "https://santimpay.com";
export const notifyUrl = "https://api.backend.merinbd.com/api/v1//subscribe/webhook";



export const pricing = {
  "Standard": 1
}