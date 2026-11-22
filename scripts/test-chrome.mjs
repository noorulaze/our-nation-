import { spawn } from 'node:child_process';
import path from 'node:path';

const outPath = path.resolve('homepage.png');
console.log('Target screenshot path:', outPath);

const p = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless',
  '--disable-gpu',
  `--screenshot=${outPath}`,
  '--window-size=1440,900',
  'https://our-nation.vercel.app'
]);

p.stdout.on('data', d => console.log('OUT:', d.toString()));
p.stderr.on('data', d => console.log('ERR:', d.toString()));
p.on('close', code => console.log('Chrome exited with code:', code));
