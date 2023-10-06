/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { testDialog } from '../../electron/main';

const { exec } = require('child_process');

async function createWindow() {
  // ...
  const fileElement = document.getElementById('file-info'); // Supongamos que tienes un elemento HTML con el id 'file-info'

  try {
    const fileUrlDir = await testDialog(); // Espera a que se resuelva la promesa
    if (fileUrlDir) {
      console.log('Selected file:', fileUrlDir);
      if (fileElement) {
        fileElement.textContent = `Selected file: ${fileUrlDir}`;
      }
    } else {
      console.log('No file selected');
      if (fileElement) {
        fileElement.textContent = 'No file selected';
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
export function mergeMP4andMP3() {
  
  createWindow()
  const fileVideoInput = document.getElementById("fileVideoInput").value
  const fileAudioInput = document.getElementById("fileAudioInput").value
  const tittleNameArchiveOutput = document.getElementById("tittleNameArchiveOutput").value
  
  const command = `ffmpeg -i ${fileVideoInput} -i ${fileAudioInput} -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 -shortest ${tittleNameArchiveOutput}.mp4`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Fusión completada: ${tittleNameArchiveOutput}.mp4`);
  });
}

