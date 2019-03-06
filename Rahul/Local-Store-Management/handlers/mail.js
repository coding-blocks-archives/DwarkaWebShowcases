const nodemailer = require("nodemailer");
const pug = require("pug");
const promisify = require("es6-promisify");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHtml = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  );
  return html;
};

exports.send = async options => {
  const html = generateHtml(options.filename, options);
  const mailOptions = {
    from: `kohli6010@gmail.com`,
    to: options.user.email,
    subject: options.subject,
    html,
    text: `This will be filed later`
  };

  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
