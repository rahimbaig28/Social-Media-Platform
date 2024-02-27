const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        user: "hoomark0321@gmail.com",
        pass: "Rb@00332211", 
      }
    });
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      let obj= {
        from: "hoomark0321@gmail.com",
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
      console.log(obj,"oppp")
      return obj
      
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      console.log("info",info)
      if (error) {
        return "12"+error; 
      } else {
        return res.status(200).json({
          success: "Send Succesfully", 
        });
      }
    });
  } catch (error) {
    return  "13"+error;
  }
};

module.exports = sendEmail;
