import { getXataClient } from "@/src/xata";
import Link from "next/link";

const xata = getXataClient();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const verifyStripe = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const scope = searchParams?.scope;
  const code = searchParams?.code;

  const result = await stripe.oauth.token({
    grant_type: "authorization_code",
    code: code,
  });
  const account = await stripe.accounts.retrieve(result.stripe_user_id);
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost:3000",
    return_url: "http://localhost:3000",
    type: "account_onboarding",
  });
  console.log(accountLink);
  //   const record = await xata.db.ConnectedAccounts.create({
  //     AuthDetails: result,
  //     AccountDetails: account,
  //   });

  return (
    <div>
      Scope: {scope}
      <br />
      Code: {code}
      <br/>
      <Link href={`/checkout/?id=${account.id}`}>
        <button>CheckOut</button>
      </Link>
    </div>
  );
};

export default verifyStripe;
