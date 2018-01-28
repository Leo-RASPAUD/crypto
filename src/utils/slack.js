const axios = require('axios');

const { SLACK_HOOK } = process.env;

module.exports = {
    post(text, channel) {
        if (SLACK_HOOK) {
            const body = {
                text,
                channel: 'events',
                username: 'Cryptolive-BOT',
                icon_emoji: ":sac_d'argent:",
            };
            return axios.post(SLACK_HOOK, { body })
                .then((result) => {
                    console.log(`Posted to slack message '${text}'`);
                    return result;
                })
                .catch((err) => {
                    console.error(`Failed to post to slack: ${err.message}`);
                    return err;
                });
        }

        console.log(`Would have posted to slack message '${text}' to channel: ${channel}`);

        return Promise.resolve(() => {
            console.warn('Slack not configured');
            return true;
        });
    },
};
