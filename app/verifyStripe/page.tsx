const verifyStripe = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const scope = searchParams?.scope ?? "";
  const code = searchParams?.code ?? "";

  return(
  <div>
    Scope: {scope} 
    <br/>
    Code: {code}
  </div>
  )
};

export default verifyStripe;
