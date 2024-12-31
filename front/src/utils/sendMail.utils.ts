const sendCustomMail = (name:string) => {
    const currentYear = new Date().getFullYear();
    const comp = "HMASERV"
    const websiteURL = process.env.NEXT_PUBLIC_BASE_URL_API
  return `
    
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You</title>
    <style>
        /* General email styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #3a73ef;
            padding: 20px;
            text-align: center;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .content p {
            margin: 0 0 10px;
        }

        .content .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #3a73ef;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        .footer {
            padding: 10px;
            background-color: #f4f4f4;
            text-align: center;
            font-size: 12px;
            color: #888;
        }

        .footer a {
            color: #888;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Email Header -->
        <div class="header">
            <h1>Thank You for Contacting Us!</h1>
        </div>

        <!-- Email Content -->
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us via our website. We have received your message and will get back to you as soon as possible.</p>
            <p>If you have any immediate concerns or need further assistance, please don't hesitate to contact us directly.</p>
            <p>We appreciate your interest and look forward to assisting you.</p>
            <p>Best regards,</p>
            <p>${comp}</p>

            <!-- Optional Button -->
            <a href="${websiteURL}" class="btn">Visit Our Website</a>
        </div>

        <!-- Email Footer -->
        <div class="footer">
            <p>&copy; ${currentYear} ${comp}. All rights reserved.</p>
            
        </div>
    </div>
</body>

</html>

    `;
};

export default sendCustomMail
