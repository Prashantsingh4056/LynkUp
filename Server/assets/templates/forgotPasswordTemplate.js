const forgotPasswordTemplate = (
username,
otpCode,
brandName = "LynkUp"
) => {
return `

<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body{
  margin:0;
  padding:40px;
  background:#F8FAFC;
  font-family:Arial,sans-serif;
  color:#334155;
}

.container{
  max-width:560px;
  margin:auto;
  background:#FFFFFF;
  border:1px solid #E2E8F0;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 10px 30px rgba(15,23,42,0.08);
}

.header{
  background:linear-gradient(135deg,#4F46E5,#7C3AED);
  padding:36px;
  text-align:center;
}

.logo{
  color:#FFFFFF;
  font-size:32px;
  font-weight:700;
  letter-spacing:-0.5px;
}

.content{
  padding:40px;
}

h2{
  margin:0 0 16px;
  color:#0F172A;
  font-size:28px;
}

p{
  color:#475569;
  line-height:1.7;
  margin:16px 0;
}

.otp-wrapper{
  text-align:center;
  margin:36px 0;
}

.otp-box{
  display:inline-block;
  padding:18px 32px;
  background:#F8FAFC;
  border:1px solid #E2E8F0;
  border-radius:14px;
  font-size:34px;
  font-weight:700;
  letter-spacing:8px;
  color:#4F46E5;
}

.note{
  background:#F8FAFC;
  border:1px solid #E2E8F0;
  border-radius:12px;
  padding:18px;
  margin-top:28px;
}

.note strong{
  color:#0F172A;
}

.footer{
  padding:24px;
  text-align:center;
  color:#94A3B8;
  font-size:13px;
  border-top:1px solid #E2E8F0;
}
</style>

</head>

<body>

<div class="container">

  <div class="header">
    <div class="logo">${brandName}</div>
  </div>

  <div class="content">


<h2>Reset your password</h2>

<p>Hi ${username},</p>

<p>
  We received a request to reset the password for your <strong>${brandName}</strong> account.
  Enter the verification code below to continue.
</p>

<div class="otp-wrapper">
  <div class="otp-box">${otpCode}</div>
</div>

<div class="note">
  <strong>This code expires in 10 minutes</strong> and can only be used once.
</div>

<p>
  If you didn’t request a password reset, you can safely ignore this email.
  Your account will remain secure and no changes will be made.
</p>

<p>— The ${brandName} Team</p>


  </div>

  <div class="footer">
    © ${new Date().getFullYear()} ${brandName}. Build your link in bio.
  </div>

</div>

</body>
</html>
`;


};

export default forgotPasswordTemplate;
