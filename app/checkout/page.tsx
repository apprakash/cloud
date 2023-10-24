const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const CheckOut = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const id = searchParams?.id;

  const payment = await stripe.paymentIntents.create(
    {
      amount: 1000,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    },
    {
      stripeAccount: id,
    }
  );
  console.log(payment);
  const session = await stripe.checkout.sessions.create(
    {
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 5,
        },
      ],
      payment_intent_data: {
        application_fee_amount: 123,
      },
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    },
    {
      stripeAccount: id,
    }
  );
  console.log("Session:", session);
  return <div>CheckOut Page</div>;
};

export default CheckOut;
