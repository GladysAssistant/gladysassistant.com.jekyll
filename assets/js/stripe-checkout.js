const stripe = Stripe('pk_live_zY5TGhpZHlH65hSEB4PmBeIe');

function onClickCheckoutGladysPlus(locale) {
  const element = document.getElementById('subscribe-gladys-plus-button');
  element.disabled = true;
  if (window.fbq) {
    fbq('track', 'InitiateCheckout');
  }
  if (window.ga) {
    ga('send', 'event', 'button', 'gladys-plus', 'initiate-checkout');
  }
  fetch('https://api.gladysgateway.com/accounts/payments/sessions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locale: locale,
    }),
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(session) {
      return stripe.redirectToCheckout({
        sessionId: session.id,
      });
    })
    .then(function(result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      if (result && result.error && result.error.message) {
        alert(result.error.message);
      }
      element.disabled = false;
    })
    .catch(function() {
      element.disabled = false;
    });
}
