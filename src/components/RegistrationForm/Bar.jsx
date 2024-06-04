import PasswordStrengthBar from "react-password-strength-bar";

export const Bar = ({ pass, confirm }) => {
  let pasw = "";
  let word = "";
  let wrd = "";
  let color = "";

  if (pass.length < 8 && pass.length > 0) {
    wrd = "Too short";
    color = "red";
  }
  if (pass !== confirm) {
    color = "yellow";
    word = ["Not match"];
  }
  if (pass.length > 7 && confirm.length < 8 && confirm.length > 0) {
    word = ["Not match"];
    wrd = "Not match";
  }

  if (pass !== "" && pass.length > 7 && pass === confirm) {
    pasw = pass;
    word = ["Okay"];
    color = "green";
  }
  if (pass !== "" && pass.length > 7 && pass !== confirm) {
    color = "red";
    wrd = "Not match";
  }
  return (
    <PasswordStrengthBar
      password={pasw}
      minLength={2}
      shortScoreWord={wrd}
      scoreWords={[word]}
      barColors={[color]}
    />
  );
};
