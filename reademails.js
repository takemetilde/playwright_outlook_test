// readEmails.js
require('dotenv').config();
const axios = require('axios');

const {
    TENANT_ID,
    CLIENT_ID,
    CLIENT_SECRET,
    USER_EMAIL
} = process.env;

async function getAccessToken() {
    const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('scope', 'https://graph.microsoft.com/.default');
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'client_credentials');

    const response = await axios.post(url, params);
    return response.data.access_token;
}

async function getEmails(accessToken) {
    const graphUrl = `https://graph.microsoft.com/v1.0/users/${USER_EMAIL}/messages`;

    const response = await axios.get(graphUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data.value;
}

(async () => {
    try {
        const token = await getAccessToken();
        const emails = await getEmails(token);

        emails.forEach(email => {
            console.log('📧 Subject:', email.subject);
            console.log('📤 From:', email.from?.emailAddress?.address);
            console.log('📝 Preview:', email.bodyPreview);
            console.log('—'.repeat(40));
        });
    } catch (err) {
        console.error('❌ Error:', err.response?.data || err.message);
    }
})();
