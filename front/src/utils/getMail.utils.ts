import { MailContent } from "@/types/interfaces";

const getDataToMail = (data: MailContent) => {
  const currentYear = new Date().getFullYear();
  const comp = "HMASERV";

  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Information</title>
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

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table, th, td {
            border: 1px solid #dddddd;
        }

        th, td {
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
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
            <h1>Client Information</h1>
        </div>

        <!-- Email Content -->
        <div class="content">
            <p>Dear Abdelrahman,</p>
            <p>Below are the details provided by the client who contacted you via your website:</p>

            <!-- Client Information Table -->
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.phone}</td>
                    <td>${data.country}</td>
                </tr>
            </table>

            <!-- Subject and Message -->
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
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

export default getDataToMail
