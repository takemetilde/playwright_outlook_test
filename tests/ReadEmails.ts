require('dotenv').config();
import axios from 'axios';

class ReadEmails {

    async getEmails(accessToken: any) {
        const graphUrl = `https://graph.microsoft.com/v1.0/me/messages?search="Honeywell Forge: Finish Pairing Your Multi-Factor Authentication Device"&top=1`;

        const response = await axios.get(graphUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data.value;
    }

    async parseEmailToken(emailMessage: string): Promise<string> {
        let regex = /Authentication Code:(\n+)\d{6}/g;
        let match = emailMessage.match(regex);

        return match[1];
    }
}

export default new ReadEmails();