require('../config');
__path = process.cwd()

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/*
* @Pesan Error
*/
msg = {
    notapikey: {
        status: false,
        code: 406,
        message: 'apikey parameter empty'
    },
    notemail: {
        status: false,
        code: 406,
        message: 'email parameter empty'
    },
    notsubj: {
        status: false,
        code: 406,
        message: 'subject empty'
    },
    nottext: {
        status: false,
        code: 406,
        message: 'insert your text/html message in text parameter'
    },
    invalidemail: {
        status: false,
        code: 406,
        message: 'email invalid'
    },
    invalidKey: {
        status: false,
        code: 406,
        message: 'apikey invalid'
    },
    success: {
        status: true,
        code: 200,
        message: 'Success'
    },
    error: {
        status: false,
        message: '404 ERROR'
    }
}

/*
Akhir Pesan Error
*/
function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}
const listKey = global.apikey;

var transport = nodemailer.createTransport({
    host: global.host,
    port: global.port,
    auth: {
        user: global.user,
        pass: global.pass
    }
});

router.get('/send', (req, res) => {
    const apikey = req.query.apikey
    const to = req.query.email
    const subj = req.query.subject
    const html = req.query.text

    if(!apikey) return res.json(msg.notparam)
    if(!to) return res.json(msg.notemail)
    if(!isEmail(to)) return res.json(msg.invalidemail)
    if(!subj) return res.json(msg.notsubj)
    if(!html) return res.json(msg.nottext)
    if(listKey.includes(apikey)){
        var mailOptions = {
                from: global.from,
                to: to,
                subject: subj,
                html: html,
            };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                res
                  .status(200)
                  .json({
                    code: 406,
                    success: false,
                    message: error
                    })
            }
            res.json(msg.success)
        });
        
    } else {
        res.json(msg.invalidKey)
    }
    
})

module.exports = router
