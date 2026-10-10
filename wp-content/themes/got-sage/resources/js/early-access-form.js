/** Register the accessible early-access signup form with Alpine. */
export default function registerEarlyAccessForm(Alpine) {
  Alpine.data('gotEarlyAccessForm', (endpoint, nonce) => ({
    endpoint,
    nonce,
    email: '',
    firstName: '',
    whatsapp: '',
    consent: false,
    honeypot: '',
    state: 'idle',
    errors: {},
    message: '',
    errorMessage: '',

    async submit() {
      this.errors = {};
      this.message = '';
      this.errorMessage = '';

      const normalizedEmail = this.email.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)) {
        this.errors.email = 'Enter a valid email address.';
      }

      if (!this.consent) {
        this.errors.consent = 'Please agree before requesting early access.';
      }

      if (Object.keys(this.errors).length > 0) {
        this.state = 'idle';
        return;
      }

      this.state = 'loading';

      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': this.nonce,
          },
          body: JSON.stringify({
            email: normalizedEmail,
            first_name: this.firstName.trim(),
            whatsapp: this.whatsapp.trim(),
            consent: this.consent,
            company_website: this.honeypot,
          }),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          if (result.code === 'got_early_access_rate_limited') {
            this.errorMessage = 'Too many attempts. Try again later.';
          } else if (result.data?.field === 'email') {
            this.errors.email = result.message || 'Enter a valid email address.';
          } else if (result.data?.field === 'consent') {
            this.errors.consent = result.message || 'Please agree before requesting early access.';
          } else {
            this.errorMessage = result.message || 'We could not complete your request. Please try again.';
          }

          this.state = 'error';
          return;
        }

        if (result.status === 'accepted') {
          this.message = result.message || 'Request received.';
        } else if (result.status === 'already_confirmed') {
          this.message = "You're already on the list.";
        } else if (result.status === 'pending' && result.confirmation_sent === true) {
          this.message = `Check your email${normalizedEmail ? ` at ${normalizedEmail}` : ''} for a confirmation link. Confirm it to join the Drop 01 list.`;
        } else {
          this.errorMessage = result.message || 'Your request could not be confirmed. Please try again later.';
          this.state = 'error';
          return;
        }

        this.state = 'success';
      } catch {
        this.errorMessage = 'We could not connect. Please check your connection and try again.';
        this.state = 'error';
      }
    },
  }));

  Alpine.data('gotEarlyAccessUnsubscribe', (endpoint, token) => ({
    endpoint,
    token,
    state: 'idle',
    message: '',

    async submit() {
      this.state = 'loading';
      this.message = '';

      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token }),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.status !== 'unsubscribed') {
          this.state = 'error';
          this.message = result.message || 'We could not update your request. Please try again.';
          return;
        }

        this.state = 'success';
        this.message = 'Your email updates are unsubscribed.';
      } catch {
        this.state = 'error';
        this.message = 'We could not connect. Please try again.';
      }
    },
  }));
}
