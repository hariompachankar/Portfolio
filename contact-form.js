/* ============================================
   CONTACT FORM (MAILBOX) — Form Handler
   Uses EmailJS to send actual emails via Gmail/Outlook
   ============================================
   SETUP INSTRUCTIONS (required once):
   1. Go to https://www.emailjs.com and sign up (free - 200 emails/month)
   2. In EmailJS dashboard:
      a. "Email Services" → "Add New Service" → connect your Gmail/Outlook
      b. "Email Templates" → "Create New Template" → design your email
         - Use variables: {{name}}, {{email}}, {{message}}, {{reply_to}}
      c. Go to "Account" → "API Keys" → copy your Public Key
   3. Update the IDs below with YOUR values:
      - YOUR_SERVICE_ID  (e.g. "service_abc123def")
      - YOUR_TEMPLATE_ID (e.g. "template_xyz789")
      - YOUR_PUBLIC_KEY  (e.g. "user_ABC123DEF456")
   ============================================ */

// ⚠️  REPLACE THESE WITH YOUR OWN EMAILJS CREDENTIALS
const EMAILJS_CONFIG = {
  serviceId: 'service_wr6vtvl',    // ← Your EmailJS Service ID
  templateId: 'YOUR_TEMPLATE_ID',   // ← Your EmailJS Template ID
  publicKey: 'YOUR_PUBLIC_KEY'      // ← Your EmailJS Public Key (API Key)
};

document.addEventListener('DOMContentLoaded', function () {

  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');

  /**
   * Play a simple click sound via Web Audio API
   * (Reuses the global playClickSound if available, otherwise creates its own)
   */
  function playSound(freq, duration) {
    if (typeof playClickSound === 'function') {
      playClickSound(freq || 500);
      return;
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq || 500, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration || 0.04));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (duration || 0.04));
    } catch (e) { /* silently fail */ }
  }

  /**
   * Show toast notification (uses global showToast if available)
   */
  function showFormToast(msg) {
    if (typeof showToast === 'function') {
      showToast(msg);
    }
  }

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    playSound(500);

    // --- Client-side validation ---
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      formStatus.className = 'form-status error';
      formStatus.textContent = '⚠️ Please fill in all fields before sending.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.className = 'form-status error';
      formStatus.textContent = '⚠️ Please enter a valid email address.';
      return;
    }

    // --- Check if EmailJS is configured ---
    if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
      formStatus.className = 'form-status error';
      formStatus.innerHTML = '⚠️ EmailJS not yet configured. Please set up your EmailJS credentials in <code>contact-form.js</code>.<br><br>See setup instructions at the top of the file.';
      return;
    }

    // --- Loading state ---
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.textContent = '⏳';
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        name: name,
        email: email,
        message: message,
        reply_to: email    // So you can Reply directly to the sender
      };

      // Send email via EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200 || result.text === 'OK') {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon. 🚀';
        contactForm.reset();
        showFormToast('Message sent successfully! 🚀');
      } else {
        throw new Error('Unexpected response from EmailJS');
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      formStatus.className = 'form-status error';
      formStatus.textContent = '❌ Could not send message. Please email me directly at pachankarh@gmail.com';
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnIcon.textContent = '✉';
    }
  });

});

