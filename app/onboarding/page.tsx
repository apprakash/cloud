const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const onBoarding = async () => {
  const account = await stripe.accounts.create({
    type: "standard",
    email: "jimpoorna@gmail.com", 
    country: "IN",
    business_type: "individual",
    business_profile: {
      mcc: "5812",
    },
    settings: {
      branding: {
        primary_color: "#ff0000",
        secondary_color: "#ff0000",
      },
    },
  });
  const accountlink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost:3000",
    return_url: "http://localhost:3000",
    type: "account_onboarding",
  });
  console.log(accountlink);

  return <div>Page Here</div>;
};

export default onBoarding;
