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
            text-decoration: none;
            font-weight: 400;
            border-radius: 50px;
            color: #ffffff;
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
                        <a href="https://bakery-frontend-two.vercel.app/products" style="color: #c23a5e; font-size: 14px; text-decoration: underline;">Or start browsing cakes</a>
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
    <title>New Order Received</title>
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
            background-color: #333333; /* Darker header for Admin emails to distinguish from customer emails */
            padding: 20px;
            text-align: center;
            border-bottom: 4px solid #b91c46; /* Brand accent line */
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Content */
        .content {
            padding: 40px 30px;
            color: #333333;
        }
        .content h2 {
            color: #b91c46;
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 10px;
        }
        .alert-text {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
        }

        /* Customer Details Box */
        .details-box {
            background-color: #f9f9f9;
            border: 1px solid #eeeeee;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .details-row {
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
        }
        .details-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #555;
            width: 40%;
        }
        .value {
            color: #333;
            width: 60%;
            text-align: right;
            font-weight: 500;
        }

        /* Buttons */
        .btn {
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 14px 0;
            background-color: #b91c46;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 50px;
            font-size: 16px;
            text-align: center;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #9f163b;
        }

        /* Footer */
        .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #999;
        }

        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content { padding: 20px; }
            .details-row { flex-direction: column; text-align: left; }
            .value { text-align: left; width: 100%; margin-top: 5px; }
        }
    </style>
</head>
<body>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 0;">
                
                <div class="email-container">
                    
                    <div class="header">
                        <h1>🔔 New Order Alert</h1>
                    </div>

                    <div class="content">
                        
                        <h2>Hello Admin,</h2>
                        <p class="alert-text">You have received a new order on your website! Here are the delivery details provided by the customer.</p>

                        <div class="details-box">
                            <div class="details-row">
                                <span class="label">Customer Name:</span>
                                <span class="value">${data.user}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">Phone Number:</span>
                                <span class="value"><a href="tel:${data.findAddress.phone}" style="color:#333; text-decoration:none;">${data.findAddress.phone}</a></span>
                            </div>
                            <div class="details-row">
                                <span class="label">Address Type:</span>
                                <span class="value" style="text-transform: capitalize; color: #b91c46;">${data.findAddress.addressType}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">Street Address:</span>
                                <span class="value">${data.findAddress.street}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">City:</span>
                                <span class="value">${data.findAddress.city}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">Zip Code:</span>
                                <span class="value">${data.findAddress.zip}</span>
                            </div>
                        </div>

                        <a href="https://bakery-frontend-two.vercel.app/profile" class="btn">View Full Order</a>
                        
                    </div>

                    <div class="footer">
                        <p>This is an automated notification from your Cake Shop System.</p>
                    </div>

                </div>

            </td>
        </tr>
    </table>

</body>
</html>
    `;
    await sendEmail(
      process.env.EMAIL_USER,
      "🔔 New Order Received!",
      "You have received a new order.",
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
    <title>Order Cancelled</title>
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
            background-color: #333333; /* Dark Admin Header */
            padding: 20px;
            text-align: center;
            border-bottom: 4px solid #d32f2f; /* Red line for Cancellation/Alert */
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        /* Content */
        .content {
            padding: 40px 30px;
            color: #333333;
        }
        .content h2 {
            color: #d32f2f; /* Red Text for emphasis */
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 10px;
        }
        .alert-text {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
        }

        /* Cancellation Details Box */
        .details-box {
            background-color: #fff5f5; /* Light Red tint background */
            border: 1px solid #ffcccc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .details-row {
            padding: 10px 0;
            border-bottom: 1px solid #ffdddd;
            display: flex;
            justify-content: space-between;
        }
        .details-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #d32f2f; /* Dark Red Label */
            width: 40%;
        }
        .value {
            color: #333;
            width: 60%;
            text-align: right;
            font-weight: 500;
        }

        /* Button */
        .btn {
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 14px 0;
            background-color: #333333; /* Neutral Dark Button */
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 50px;
            font-size: 16px;
            text-align: center;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #555555;
        }

        /* Footer */
        .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #999;
        }

        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content { padding: 20px; }
            .details-row { flex-direction: column; text-align: left; }
            .value { text-align: left; width: 100%; margin-top: 5px; }
        }
    </style>
</head>
<body>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 0;">
                
                <div class="email-container">
                    
                    <div class="header">
                        <h1>🚫 Order Cancelled</h1>
                    </div>

                    <div class="content">
                        
                        <h2>Attention Admin,</h2>
                        <p class="alert-text">An order has been cancelled by the customer. Please review the details below and update your inventory if necessary.</p>

                        <div class="details-box">
                            <div class="details-row">
                                <span class="label">Order ID:</span>
                                <span class="value">#
                                ${data.orderId}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">Customer Name:</span>
                                <span class="value">${data.user}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">Date:</span>
                                <span class="value">${data.date}</span>
                            </div>
                            <div class="details-row">
                                <span class="label">Status:</span>
                                <span class="value" style="color: #d32f2f; font-weight: bold;">Cancelled</span>
                            </div>
                        </div>

                        <a href="https://bakery-frontend-two.vercel.app/profile" class="btn">View Order Details</a>
                        
                    </div>

                    <div class="footer">
                        <p>This is an automated system notification.</p>
                    </div>

                </div>

            </td>
        </tr>
    </table>

</body>
</html>`;

    await sendEmail(
      process.env.EMAIL_USER,
      "Order Cancelled Notification",
      "An order has been cancelled by the user.",
      htmlTemplate,
    );
  });
};
