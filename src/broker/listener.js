const { subscribeToQueue } = require("./broker");
const sendEmail = require("../email");

module.exports = function () {
  subscribeToQueue("AUTH_USER_REGISTER_NOTIFICATION", async (data) => {
    const htmlTemplate = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Cake Shop!</title>
    <style>
        /* General Resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f4f4; font-family: 'Helvetica', 'Arial', sans-serif; }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        /* Header */
        .header {
            background-color: #b91c46; /* Brand Pink/Red */
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-family: 'Georgia', serif;
            font-size: 28px;
            font-weight: 700;
        }

        /* Body Content */
        .content {
            padding: 40px 30px;
            text-align: center;
            color: #333333;
        }
        .content h2 {
            color: #b91c46;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }

        /* Benefits List */
        .benefits-box {
            background-color: #fff5f7; /* Very light pink background */
            border: 1px dashed #b91c46;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
        }
        .benefits-box h3 {
            margin-top: 0;
            color: #b91c46;
            font-size: 18px;
        }
        .benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .benefits-list li {
            padding: 8px 0;
            font-size: 15px;
            color: #555;
            display: flex;
            align-items: center;
        }
        .benefits-list li span {
            color: #b91c46;
            font-weight: bold;
            margin-right: 10px;
            font-size: 18px;
        }

        /* Button */
        .btn {
            display: inline-block;
            padding: 14px 30px;
            background-color: #b91c46;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 50px;
            font-size: 16px;
            transition: background-color 0.3s;
            margin-top: 10px;
        }
        .btn:hover {
            background-color: #9f163b;
        }

        /* Footer */
        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
        .footer a {
            color: #b91c46;
            text-decoration: none;
        }
        .social-icons {
            margin-top: 15px;
        }
        .social-icons img {
            width: 24px;
            margin: 0 5px;
            opacity: 0.6;
        }

        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content { padding: 30px 20px; }
            .header h1 { font-size: 24px; }
        }
    </style>
</head>
<body>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 0;">
                
                <div class="email-container">
                    
                    <div class="header">
                        <h1>Cake Shop</h1>
                    </div>

                    <div class="content">
                        
                        <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt="Welcome" width="120" style="margin-bottom: 20px;">

                        <h2>Welcome to the Family!</h2>
                        
                        <p>Hi <strong>${data.firstName} ${data.lastName}</strong>,</p>
                        
                        <p>We are thrilled to have you here! Your account has been successfully created. You are now officially part of the <strong>Cake Shop</strong> community.</p>
                        
                        <div class="benefits-box">
                            <h3>What you can do now:</h3>
                            <ul class="benefits-list">
                                <li><span>&#10003;</span> Faster checkout for your sweet cravings</li>
                                <li><span>&#10003;</span> Track your order status in real-time</li>
                                <li><span>&#10003;</span> Save your favorite items to your Wishlist</li>
                                <li><span>&#10003;</span> View your past order history</li>
                            </ul>
                        </div>

                        <p>Ready to find something delicious?</p>
                        
                        <a href="https://bakery-frontend-two.vercel.app/login" class="btn">Visit My Account</a>
                        <br><br>
                        <a href="https://bakery-frontend-two.vercel.app/products" style="color: #b91c46; font-size: 14px; text-decoration: underline;">Or start browsing cakes</a>
                    </div>

                    <div class="footer">
                        <p>&copy; 2026 Cake Shop. All rights reserved.</p>
                        <p>You received this email because you registered on our website.</p>
                        <p>123 Bakery Street, Sweet Town, ST 54321</p>
                        <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
                        
                        <div class="social-icons">
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook"></a>
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram"></a>
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube"></a>
                        </div>
                    </div>

                </div>

            </td>
        </tr>
    </table>

</body>
</html>
    `;
    await sendEmail(
      data.email,
      "Welcome to Our Service",
      "Thank you for registering with us!",
      htmlTemplate,
    );
  });

  subscribeToQueue("SELLER_ORDER_CREATED_NOTIFICATION", async (data) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Order Has Been Placed! 🚀</title>
        <style>
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
        <center>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                            <tr>
                                <td align="center" style="padding: 30px 20px 20px 20px; background-color: #007bff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                                    <h1 style="margin: 0; font-size: 28px; color: #ffffff;">
                                        Order Created Successfully!
                                    </h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 40px 20px 40px; color: #333333;">
                                    <p style="font-size: 18px; line-height: 24px; margin: 0;">
                                        Hi ${data.user} order has been placed successfully.
                                    </p>
                                    <p style="font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                                        His phone number is <strong>${data.findAddress.phone || "N/A"}</strong> and address is <strong>${data.findAddress.street || "N/A"} ${data.findAddress.city || "N/A"} ${data.findAddress.zip || "N/A"} and his address type is ${data.findAddress.addressType || "N/A"} </strong>.
                                    </p>
                                </td>
                            </tr>
                                <td align="center" style="padding: 20px; font-size: 14px; line-height: 20px; color: #888888; border-top: 1px solid #eeeeee;">
                                    <p style="margin: 0;">
                                        Need help? Reply to this email or visit our <a href="${data.supportLink || "#"}" style="color: #007bff;">Support Center</a>.
                                    </p>
                                    <p style="margin: 10px 0 0 0;">
                                        &copy; ${new Date().getFullYear()} services. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
    </html>
    `;
    await sendEmail(
      process.env.EMAIL_USER,
      "Welcome to Our Service",
      "Your order successfully completed.",
      htmlTemplate,
    );
  });

  subscribeToQueue("SELLER_ORDER_CANCEL_NOTIFICATION", async (data) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Cancelled Notification</title>
        <style>
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
        <center>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                            <tr>
                                <td align="center" style="padding: 30px 20px 20px 20px; background-color: #dc3545; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                                    <h1 style="margin: 0; font-size: 28px; color: #ffffff;">
                                        Order Cancelled
                                    </h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 40px 20px 40px; color: #333333;">
                                    <p style="font-size: 18px; line-height: 24px; margin: 0;">
                                        Dear ${data.user},
                                    </p>
                                    <p style="font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                                        We regret to inform you that the order with ID <strong>${data.orderId}</strong> has been cancelled by the user.
                                    </p>
                                    <p style="font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                                        Please check your dashboard for more details.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px; font-size: 14px; line-height: 20px; color: #888888; border-top: 1px solid #eeeeee;">
                                    <p style="margin: 0;">
                                        Need help? Reply to this email or visit our <a href="${data.supportLink || "#"}" style="color: #007bff;">Support Center</a>.
                                    </p>
                                    <p style="margin: 10px 0 0 0;">
                                        &copy; ${new Date().getFullYear()} services. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
    </html>
    `;

    await sendEmail(
      process.env.EMAIL_USER,
      "Order Cancelled Notification",
      "An order has been cancelled by the user.",
      htmlTemplate,
    );
  });
};
