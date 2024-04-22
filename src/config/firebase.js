import admin from "firebase-admin";
const serviceAccount = {
  type: "service_account",
  project_id: "merin-9171f",
  private_key_id: "97dbb6e750fbf67a7d80aeac6b55cc60b45ed9db",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBlpuQaeN+N3Uo\nc9Z0eacysUfZ7M+CUezm6BANmzGDI3g1e2q/ljciquA527rJIYhKQn/Bpfsf6tVi\nXLNnuCVGhJABZTdt4TYIEJhkMoXHS14A9IjehfRAg50NzMYfGKJ7SiUnr9jqjBtm\nUj2j4WzxrCs+uaJAS3yME4r8D3xUB6TH3/EKgxbZ37fE3CqyJWLdyhS8xcbVxUxH\nvPMaaW/49rBwpWXm2Cy2ZVuQdLvcipKoxJOOahhYT/hn5AA7OI1qs9/SYDpvMVm3\nBSVaLnRQzW1shsSANNlpD26fkVM11sJEBMC4Lp2pVmrlLJKjVY/GF1NA43CvYYk1\nYurpGogfAgMBAAECggEAAJjAPf+1jcwJ9mf0/0LouwVE3W0XbqVl/4gzlHcn/el8\nE14gBBsobFjue/8rYjdSPjhaQHSMg5qrsbPrcaRlqQP7laWEODh7fCbg8V4ef3DC\nB2q5iUYMbK57K3G4Ipxm0850styd5IsuAnC6c+jb9xq6v2S/FUemSKA+y2wYzAGA\npx3784CHcvVav4DgTUEUjMezRYz0vKzfSLsfSBn2dSSDkMAELbeYyWLf8LqfThI+\nYdD5Evf1UNDvZjojRIQJtdC5Dqk7bWtun+vvu5reH31/WCYfIybFJ6eY4co++V7U\nEnmhdwtDo1eUIzgK3WuFsZ9S1CJxfOLr5TVS58wtAQKBgQDji5W7yG6Q8tDZmYDM\nE9nbVy3nXwc3GPb/GhnzHmeJU/PkrZWq5ZybA0nzgIWw4NlJRgjDGkrVIvoDRqME\nXowuTNnKLqEmnwmJ6GAlmXvLMkr3zg2NAwnty6XMyaT5xFOGBbI69RbKTIHWqG3j\n2E0JpACQp1w7MslXlk8PWiLZwQKBgQDZy/U16MI1cXIXYQ+Trkk+MqZADuGunuKh\nUyRAVa2Mh+YEdQRqO9B5pFQFtoICgBEHaJ7N/jg/sTdExA7uXEk70UNvIhy/V+/+\nP/4mWoz8TyYnfjMmquihklIj4Sq/UM/7OaEsMbGTOlaBe+IPyorqEZd0tlT+kuM+\nIVWdTjsZ3wKBgDQyvySWtBZ4PUTNm+g03ZMdiqA7AnK3PWID4NQOs32jTp203FKZ\n3bUJqhs77m9HBVFzyWrIS0ZdgbDisV69ObcdVhC1Za5waUXDktrNPMK+RMhX8m/Y\ntJxiTSSPVVMeoHJsOBiiRJoftuFBPgQ4iGOfxalpWxURb3KyPmytJrWBAoGBAM0i\nlGfdPiaWHo60pbZEPsotbHcDTT9qeSzXoVpTGG43hceG68yfX+FijJ0A5H00YFWp\nDYIZwqMC6HqFa0bId1W26RvgdlEmo23GmjtHqGjwp5AlBkqSSR/9MA6JQvkFRY9r\nHUoB2C5CkT3OEAMtkx+ZyBxuq6lHcm+PeBL8nx/jAoGAO6n0XglBzEP6ipadKMl5\nC7XsoH5EpaYBwCXPMkmHERKarHW6ompQ4qH+3AlwJlBUGemmo1664TT2gXWeTCyQ\ne30CHcs1/T37/e6zLoQv7u2h9D9LrGHelwHpNpVT1/hdfJMa5L4mddWlxwfS7G5g\nkmth6PJoZ6Xl0n22Hkuw+AU=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-7wyxr@merin-9171f.iam.gserviceaccount.com",
  client_id: "106021362189882663865",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7wyxr%40merin-9171f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});
export { admin };
