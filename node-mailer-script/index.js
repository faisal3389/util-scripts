var nodemailer = require('nodemailer');

sendMail();
function sendMail() {
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL, 
                  // you can try with TLS, but port is then 587
    auth: {
      user: 'faisal.siddiqui@capillarytech.com', // Your email id
      pass: 'ibbfolfnutsuucun' // Your password
    }
  });

  var mailOptions = {
    from: 'faisal.siddiqui@capillarytech.com',
    to: 'faisal.siddiqui@capillarytech.com',
    subject: 'Sending Email using Node.js',
    text: 'I hope this message gets through!',
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
