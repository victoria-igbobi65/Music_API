const sendEmail = require('../settings')
require('dotenv').config()

const passwordResetMail = async (name, email, resetURl) => {
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
                          <p>Hi ${name},</p>
                          <p>We received a request to reset the password for your account. If you didn't make this request, please ignore this email.</p>
                          <p>To reset your password, please click the link below:</p>
                          <a href="${ resetURl }" class="btn">Reset Password</a>
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
        from: '"Music App" <noreply@gmail.com>',
        to: email,
        subject: 'Forgot Password',
        html: message,
    })
}
module.exports = passwordResetMail
