import React from "react";
import DefaultLayout from "../layouts/default";
import SignIn from "../components/SignIn";

function SignInPage(props) {
  return (
    <DefaultLayout>
      <SignIn accountVerifyStatus={new URLSearchParams(props.location.search).get('status')} />
    </DefaultLayout>
  );
}

export default SignInPage;
