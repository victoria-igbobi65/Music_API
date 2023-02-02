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
                          <p>We\'re so glad you decided to join us as an admin. Here are the priviledges you are allowed on My Music App:</p>
                          <ul>
                            <li>Seamless streaming</li>
                            <li>Awesome features</li>
                            <li>Excellent customer support</li>
                            <li>Frequent updates and improvements</li>
                            <li>Add songs to platform</li>
                            <li>Update song deatails</li>
                            <li>Delete a song</li>
                            <li>View a song details</li>
                            <li>And many more features</li>
                          </ul>
                          <We hope time spent on our application is worth your time, cheers to new beginnigs</p>
                          <p>Best regards,<br>My Music App</p>
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
        subject: 'Welcome to Music App',
        html: message,
    })
}
module.exports = welcomeMail
