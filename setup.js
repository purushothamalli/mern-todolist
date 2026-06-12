import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import readline from 'readline/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSecret = () => crypto.randomBytes(64).toString('hex');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function runSetup() {
    console.log('\n--- 🚀 MERN Todo Interactive Setup ---');
    console.log('Press Enter to accept default values.\n');

    // Only be interactive if we're in a TTY (terminal)
    const isInteractive = process.stdout.isTTY;

    let port = '4000';
    let dbUri = 'mongodb://localhost:27017/mern-todo';
    let frontendUrl = 'http://localhost:5173';
    let apiUrl = 'http://localhost:4000/api';

    if (isInteractive) {
        port = await rl.question(`🔹 Backend Port [${port}]: `) || port;
        dbUri = await rl.question(`🔹 MongoDB URI [${dbUri}]: `) || dbUri;
        frontendUrl = await rl.question(`🔹 Frontend URL (for CORS) [${frontendUrl}]: `) || frontendUrl;
        
        const defaultApiUrl = `http://localhost:${port}/api`;
        apiUrl = await rl.question(`🔹 Vite API URL [${defaultApiUrl}]: `) || defaultApiUrl;
    } else {
        console.log('Non-interactive environment detected. Using default values.');
    }

    const backendEnv = `PORT=${port}
DB_URI=${dbUri}
ACCESS_TOKEN_SECRET=${generateSecret()}
REFRESH_TOKEN_SECRET=${generateSecret()}
FRONTEND_URL=${frontendUrl}
`;

    const frontendEnv = `VITE_API_URL=${apiUrl}
`;

    const writeEnvFile = async (dir, content) => {
        const filePath = path.join(__dirname, dir, '.env');
        if (fs.existsSync(filePath)) {
            const answer = isInteractive 
                ? await rl.question(`⚠️  ${dir}/.env already exists. Overwrite? (y/N): `)
                : 'n';
            if (answer.toLowerCase() !== 'y') {
                console.log(`⏩ Skipping ${dir}/.env`);
                return;
            }
        }
        fs.writeFileSync(filePath, content);
        console.log(`✅ Created ${dir}/.env`);
    };

    await writeEnvFile('backend', backendEnv);
    await writeEnvFile('frontend', frontendEnv);

    console.log('\n✨ Setup Complete! You can now run "npm run dev" to start the project.');
    rl.close();
}

runSetup().catch(err => {
    console.error('❌ Setup failed:', err);
    process.exit(1);
});
