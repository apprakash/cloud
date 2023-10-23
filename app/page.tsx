"use client";

const handleclick = () => {
  console.log("clicked");
  if (window) {
    const url = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`;
    window.document.location.href = url;
  }
};

export default function Home() {
  return (
    <div>
      <button
        type="button"
        className="stripe-connect"
        onClick={() => handleclick()}
      >
        Connect with Stripe
      </button>
    </div>
  );
}
