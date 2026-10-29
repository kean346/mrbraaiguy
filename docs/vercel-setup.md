# Vercel and Atlas setup

The public `/preview.html` is a synthetic design preview. The working CRM, private costing and customer PDFs are protected by one shared workspace password.

In Vercel → Project `mrbraaiguy` → Settings → Environment Variables, configure these values for **Production**:

| Name | Value |
| --- | --- |
| `MONGODB_URI` | Atlas SRV connection string for the dedicated database user |
| `MONGODB_DB` | `ember_glass` |
| `BETTER_AUTH_URL` | `https://mrbraaiguy.vercel.app` (retained as the trusted application origin) |
| `BETTER_AUTH_SECRET` | Random cookie-signing secret of at least 32 characters |
| `APP_ACCESS_PASSWORD` | Unique shared workspace password; if omitted, the existing `OWNER_SETUP_CODE` is used as a compatibility fallback |

Redeploy `main` after saving variables. Open `/login`, enter the shared password, and verify that `/dashboard` loads. The browser receives a signed, HttpOnly, SameSite cookie valid for 12 hours. Password attempts are limited to five per 15 minutes per client address. `/setup` redirects to `/login`, and public account registration does not exist.

Atlas must allow Vercel's outbound connection. Use a dedicated, least-privilege database user, TLS, backups and a restore test before importing real customers. Verify PDF preview and download on Vercel because hosted Chromium behavior must be checked in its actual runtime.
