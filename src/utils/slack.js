const axios = require('axios');
const conf = require('../../conf/conf');

module.exports = {
    post(text) {
        if (conf.params.slackHook) {
            const body = {
                text,
                channel: 'events',
                username: 'Cryptolive-BOT',
            };
            console.log(conf.params.slackHook);
            return axios.post(conf.params.slackHook, body)
                .then((result) => {
                    console.log(`Posted to slack message '${text}'`);
                    return result;
                })
                .catch((err) => {
                    console.error(`Failed to post to slack: ${err.message}`);
                    console.log(err);
                    return err;
                });
        }

        console.log(`Would have posted to slack message '${text}'`);

        return Promise.resolve(() => {
            console.warn('Slack not configured');
            return true;
        });
    },
};
