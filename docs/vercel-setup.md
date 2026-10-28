# Make the private Vercel app usable

The public `/preview.html` is a synthetic design preview. `/dashboard`, sign-in and quotation data require a production MongoDB replica set and authentication secret. A Vercel build can be Ready while the server routes fail; the 28 October 2026 build log specifically reported Better Auth's default-secret error.

1. In MongoDB Atlas, create a dedicated project and cluster for Ember Glass. Create one database user with a long, unique password and only the access needed for this app's database. Copy Atlas's **Node.js driver SRV connection string** and insert the database user's password in Atlas's secure UI or a local secret manager. Keep TLS enabled. Configure Atlas Network Access for Vercel's outbound connections. Ordinary Vercel functions do not provide a fixed outbound IP by default; a broad Atlas IP rule such as `0.0.0.0/0` is a security tradeoff and should only be used with a strong unique database user, least privilege and TLS. Fixed egress or private networking is preferable when available.
2. In Vercel → Project `mrbraaiguy` → Settings → Environment Variables, add the following for **Production**. Never paste values into GitHub or chat.

   | Name | Value |
   | --- | --- |
   | `MONGODB_URI` | Atlas SRV connection string for the dedicated database user |
   | `MONGODB_DB` | `ember_glass` (non-secret) |
   | `BETTER_AUTH_URL` | `https://mrbraaiguy.vercel.app` |
   | `BETTER_AUTH_SECRET` | New random secret of at least 32 characters, generated securely; use the same value for initial owner provisioning |
   | `OWNER_EMAIL` | The exact email address to be allowed into the private app |
   | `OWNER_SETUP_CODE` | Unique cryptographically random code of at least 32 characters, stored privately only during initial setup |

3. Redeploy `main` so Vercel's production functions receive the new variables. Check Runtime Logs for connection or authentication errors. A Ready build alone does not validate the server routes.
4. After redeploying, visit `/setup` in an external browser. Enter the private `OWNER_SETUP_CODE` and choose a strong password. The route creates only the `OWNER_EMAIL` account, enforces five attempts per 15 minutes per client IP, and rejects all subsequent setup requests once the account exists. Remove `OWNER_SETUP_CODE` from Vercel after success and redeploy. Never send the code or password in chat.
5. Visit `/login` in an external browser, sign in as the owner, open `/dashboard`, and create a synthetic draft. In Business settings, confirm VAT registration/rate, sender identity and approved terms before attempting to issue. Verify PDF preview/download on Vercel; the code includes a serverless Chromium package, but its actual hosted runtime must be checked.

No real customer data should be imported until access, backups and a restore test are in place. Connected email and Zoho import remain unconfigured features. This setup does not change the public Mr Braai Guy website.
