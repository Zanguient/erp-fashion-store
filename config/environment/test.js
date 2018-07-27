'use strict';
let local = require('../local.env.js');
// Test specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,


    // Control debug level for modules using visionmedia/debug
    DEBUG: '',

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        local.port ||
        8080,

    selfURL: 'http://localhost',
    emails: {
        from: {
            t2t: "TTS <talktous@tts.com>",
            noreply: "TTS <noreply@tts.com>",
        }
    },
    webApp: {
        url: "http://loaclhost:80"
    }
};