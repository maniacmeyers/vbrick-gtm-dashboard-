/**
 * VBRICK GTM Dashboard — Email Allowlist Authentication
 * Client-side auth gate with SHA-256 hashed email verification.
 * 
 * To add/remove emails, update the ALLOWED_HASHES array below.
 * Generate a hash: echo -n "email@example.com" | shasum -a 256
 */

const AUTH_CONFIG = {
  // SHA-256 hashes of allowed email addresses (lowercase, trimmed)
  // To add a new email: 
  //   1. Run: echo -n "newemail@example.com" | shasum -a 256
  //   2. Add the hash string to this array
  ALLOWED_HASHES: [
    // interactivejeff@gmail.com
    "c4d11508022930a29a8adce69bdcee829d662674724a54bce990f6fc138b24cd",
    // dylan.fawsitt@vbrick.com
    "8bb3268534e237c963cdbee264ade0c5acdb2ecbd4bf7dc8adc9edb382df1191",
    // kara.pryor@vbrick.com
    "2e85e77774ab9b7b557c56c2f8dce6089caa7581559660965c2fe98272b679c1",
    // bfzm@vbrick.com
    "0463c1115bf30cdc4cc7598886c03f8eb8ff39c6a7a30da614fa7d2ccd369af2",
    // jeff.meyers@me.com
    "4e862796ceddea1f92e4a26d2b1bba541fb69df41ff81200eff9e326d740d8e9",
    // jeff@forgetime.ai
    "ab50fb4e73220fa23b2f9c335fee90665598d734c2f0fc4dabb7091ba29a1d30",
    // jeff@careermaniacs.com
    "74deb573ac01bc95c8b2fab2ce4f82e6a06f13bef4a42922484505bf2272ac9d",
    // ai@aimaniacs.ai
    "11934bc4e575cbbd1ba0cc458fe309eea6099f30ef6893abf058a589614e1d99",
    // ruthie.nissim@vbrick.com
    "334872f900df3b1ee102c221ef4fcda94b61f5a3d8618185dfdc14736c3e4d5f"
  ],
  
  // Session duration in hours
  SESSION_HOURS: 72,
  
  // Storage key
  STORAGE_KEY: "vbrick_gtm_auth"
};

// ─── Auth Functions ───────────────────────────────────────────

async function hashEmail(email) {
  const normalized = email.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function isEmailAllowed(email) {
  const hash = await hashEmail(email);
  return AUTH_CONFIG.ALLOWED_HASHES.includes(hash);
}

// In-memory session store (works in sandboxed iframes)
// Also persists to cookie when possible for cross-page persistence
let _activeSession = null;

function _setCookie(name, value, hours) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + hours * 3600000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  } catch { /* cookies may be blocked */ }
}

function _getCookie(name) {
  try {
    const v = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return v ? decodeURIComponent(v.pop()) : null;
  } catch { return null; }
}

function _deleteCookie(name) {
  try { document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"; } catch {}
}

function getSession() {
  if (_activeSession) {
    const expiry = new Date(_activeSession.expiry);
    if (expiry > new Date()) return _activeSession;
    _activeSession = null;
  }
  // Try restoring from cookie
  const raw = _getCookie(AUTH_CONFIG.STORAGE_KEY);
  if (raw) {
    try {
      const session = JSON.parse(raw);
      const expiry = new Date(session.expiry);
      if (expiry > new Date()) {
        _activeSession = session;
        return session;
      }
      _deleteCookie(AUTH_CONFIG.STORAGE_KEY);
    } catch {}
  }
  return null;
}

function createSession(email) {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + AUTH_CONFIG.SESSION_HOURS);
  const session = {
    email: email.toLowerCase().trim(),
    expiry: expiry.toISOString(),
    created: new Date().toISOString()
  };
  _activeSession = session;
  _setCookie(AUTH_CONFIG.STORAGE_KEY, JSON.stringify(session), AUTH_CONFIG.SESSION_HOURS);
  return session;
}

function destroySession() {
  _activeSession = null;
  _deleteCookie(AUTH_CONFIG.STORAGE_KEY);
}

// ─── Auth UI ──────────────────────────────────────────────────

function createAuthScreen() {
  const overlay = document.createElement("div");
  overlay.id = "authOverlay";
  overlay.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-logo">
          <svg viewBox="0 0 40 40" fill="none" width="48" height="48">
            <rect width="40" height="40" rx="8" fill="#01696F"/>
            <path d="M10 12L20 28L30 12" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="20" cy="20" r="3" fill="#fff" opacity="0.6"/>
          </svg>
          <h1 class="auth-title">VBRICK <span>GTM Intelligence</span></h1>
        </div>
        <p class="auth-subtitle">Enter your authorized email to access the dashboard.</p>
        <form id="authForm" class="auth-form">
          <div class="auth-input-group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <input type="email" id="authEmail" placeholder="your.email@company.com" required autocomplete="email" autocapitalize="off" />
          </div>
          <button type="submit" class="auth-btn" id="authSubmit">
            <span class="auth-btn-text">Access Dashboard</span>
            <svg class="auth-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <p class="auth-error" id="authError"></p>
        </form>
        <p class="auth-footer">Access restricted to authorized personnel only.</p>
      </div>
    </div>
  `;
  document.body.prepend(overlay);
  
  // Inject auth styles
  const style = document.createElement("style");
  style.textContent = `
    #authOverlay {
      position: fixed; inset: 0; z-index: 10000;
      background: var(--color-bg, #F7F6F2);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .auth-container {
      width: 100%; max-width: 420px; padding: 24px;
    }
    .auth-card {
      background: var(--color-surface, #F9F8F5);
      border: 1px solid var(--color-border, #D4D1CA);
      border-radius: 16px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
    .auth-logo {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      margin-bottom: 24px;
    }
    .auth-title {
      font-size: 20px; font-weight: 700; letter-spacing: -0.02em;
      color: var(--color-text, #28251D); margin: 0;
    }
    .auth-title span { font-weight: 500; opacity: 0.7; }
    .auth-subtitle {
      font-size: 14px; color: var(--color-text-muted, #7A7974);
      margin: 0 0 28px; line-height: 1.5;
    }
    .auth-form { display: flex; flex-direction: column; gap: 14px; }
    .auth-input-group {
      display: flex; align-items: center; gap: 10px;
      background: var(--color-bg, #F7F6F2);
      border: 1px solid var(--color-border, #D4D1CA);
      border-radius: 10px; padding: 12px 14px;
      transition: border-color 0.2s;
    }
    .auth-input-group:focus-within {
      border-color: var(--color-primary, #01696F);
      box-shadow: 0 0 0 3px rgba(1,105,111,0.1);
    }
    .auth-input-group svg { color: var(--color-text-muted, #7A7974); flex-shrink: 0; }
    .auth-input-group input {
      border: none; background: transparent; outline: none;
      font-size: 15px; font-family: inherit; width: 100%;
      color: var(--color-text, #28251D);
    }
    .auth-input-group input::placeholder { color: var(--color-text-faint, #BAB9B4); }
    .auth-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: var(--color-primary, #01696F); color: #fff;
      border: none; border-radius: 10px; padding: 13px 20px;
      font-size: 15px; font-weight: 600; font-family: inherit;
      cursor: pointer; transition: background 0.2s, transform 0.1s;
    }
    .auth-btn:hover { background: var(--color-primary-hover, #0C4E54); }
    .auth-btn:active { transform: scale(0.98); }
    .auth-btn.loading .auth-btn-text { opacity: 0.6; }
    .auth-btn.loading .auth-btn-arrow { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .auth-error {
      font-size: 13px; color: #A12C7B; margin: 4px 0 0;
      min-height: 20px; transition: opacity 0.2s;
    }
    .auth-footer {
      font-size: 12px; color: var(--color-text-faint, #BAB9B4);
      margin: 24px 0 0;
    }
    .auth-card .auth-signout {
      display: none;
    }
  `;
  document.head.appendChild(style);
  
  // Wire up form
  const form = document.getElementById("authForm");
  const emailInput = document.getElementById("authEmail");
  const errorEl = document.getElementById("authError");
  const submitBtn = document.getElementById("authSubmit");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";
    submitBtn.classList.add("loading");
    
    const email = emailInput.value;
    const allowed = await isEmailAllowed(email);
    
    if (allowed) {
      createSession(email);
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s";
      setTimeout(() => {
        overlay.remove();
        showDashboard();
      }, 300);
    } else {
      errorEl.textContent = "This email is not authorized. Contact your administrator.";
      submitBtn.classList.remove("loading");
      emailInput.focus();
    }
  });
  
  emailInput.focus();
}

function showDashboard() {
  document.querySelector(".dashboard").style.display = "";
  document.querySelector(".site-footer").style.display = "";
}

function hideDashboard() {
  document.querySelector(".dashboard").style.display = "none";
  document.querySelector(".site-footer").style.display = "none";
}

// ─── Sign Out Button (added to sidebar) ──────────────────────

function addSignOutButton() {
  const session = getSession();
  if (!session) return;
  
  const footer = document.querySelector(".sidebar-footer");
  if (!footer) return;
  
  const btn = document.createElement("button");
  btn.className = "signout-btn";
  btn.title = `Signed in as ${session.email}`;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  `;
  btn.addEventListener("click", () => {
    destroySession();
    location.reload();
  });
  
  // Add sign-out styles
  const style = document.createElement("style");
  style.textContent = `
    .signout-btn {
      background: transparent; border: none; padding: 6px;
      color: var(--color-text-muted); cursor: pointer;
      border-radius: 6px; transition: color 0.2s, background 0.2s;
      display: flex; align-items: center;
    }
    .signout-btn:hover { color: var(--color-text); background: var(--color-border); }
  `;
  document.head.appendChild(style);
  
  footer.insertBefore(btn, footer.firstChild);
}

// ─── Init ─────────────────────────────────────────────────────

(function initAuth() {
  const session = getSession();
  if (session) {
    showDashboard();
    addSignOutButton();
  } else {
    hideDashboard();
    createAuthScreen();
  }
})();
