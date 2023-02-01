const sendEmail = require('../settings')
require('dotenv').config()



const welcomeMail = async (name, email) => {

    const message = `
        <table align="center" bgcolor="#333333" width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" bgcolor="#333333" style="padding: 40px 0 30px 0;">
              <table bgcolor="#FFFFFF" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 40px 30px 40px 30px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;">
                          <p>Dear ${name},</p>
                          <p>We\'re so glad you decided to join us. Here's what we have in store for you:</p>
                          <ul>
                            <li>Seamless streaming</li>
                            <li>Awesome features</li>
                            <li>Excellent customer support</li>
                            <li>Frequent updates and improvements</li>
                          </ul>
                          <p>If you have any questions or concerns, please feel free to reach out to us at mymusicapp13@gmail.com</p>
                          <p>Best regards,<br>Your team</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `
    
    return sendEmail({
        from:'Music App <noreply@gmail.com>',
        to: email,
        subject: 'Welcome to Music App',
        html: message,
    })
}
module.exports = welcomeMail
