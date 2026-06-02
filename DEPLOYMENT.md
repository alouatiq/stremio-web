# Deployment Guide — GitHub + Vercel

Stremio Web is a **pure static SPA** (React + WebAssembly). No backend server is needed.
GitHub hosts your code; Vercel builds and serves it.

---

## 1. Push to GitHub

If you haven't already:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin development
```

---

## 2. Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New → Project**.
3. Import your GitHub repository.
4. Vercel will auto-detect the framework — override with these settings:

| Setting | Value |
|---|---|
| **Framework Preset** | Other |
| **Build Command** | `pnpm build` |
| **Output Directory** | `build` |
| **Install Command** | `pnpm install` |
| **Node.js Version** | 20.x |

5. Click **Deploy**.

---

## 3. Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Description |
|---|---|---|
| `PIN_CODE` | Optional | If set, a PIN lock screen is shown before the app loads. Leave empty to disable. |
| `SENTRY_DSN` | Optional | Sentry error tracking DSN. |

> Variables are baked into the JS bundle at build time. After changing a variable, trigger a redeploy.

---

## 4. Automatic Deploys

Once connected, every `git push` to your branch triggers a Vercel build automatically.

```bash
# Make a change, then:
git add .
git commit -m "your message"
git push
# Vercel detects the push and deploys within ~1 minute
```

Preview deployments are created for every branch and pull request.

---

## 5. PIN Code Feature

The PIN gate protects the app with a password set via environment variable.

**To enable:**
1. In Vercel → Environment Variables, add `PIN_CODE` with your chosen PIN (e.g. `1234`).
2. Redeploy.

**Behaviour:**
- When `PIN_CODE` is not set → app loads normally (no gate).
- When `PIN_CODE` is set → a PIN entry screen appears first.
- Correct PIN unlocks the app for the browser tab session.
- Wrong PIN shows an error and clears the input.

**Note:** The PIN is embedded in the JS bundle at build time. It provides basic access control, not cryptographic security.

---

## 6. Local Development

```bash
# Install dependencies (requires pnpm v9+)
pnpm install

# Start dev server (available at https://localhost:8080)
pnpm start

# Production build (outputs to build/)
pnpm build
```

To test the PIN gate locally, pass the variable at build/serve time:

```bash
PIN_CODE=1234 pnpm start
```
