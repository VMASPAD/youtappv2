const ytdl = require('ytdl-core');
const fs = require('fs');

export function audioObtain() {
  const urlVideo = document.getElementById("urlVideoAudio").value;
  const nameArchive = document.getElementById("nameArchiveAudio").value;

  const audioStream = ytdl(urlVideo, { quality: 'highestaudio' });
  const dirAudio = `C:\\Audios\\${nameArchive}.mp3`
  audioStream
    .pipe(fs.createWriteStream(dirAudio))
    .on('finish', () => {
        var notification = new Notification("Descarga Completada", {
            title: "youtapp",
            body: `El video se ha descargado y guardado en: ${dirAudio}`,
          });
      console.log('Descarga completada');
    })
    .on('error', (error) => {
        var notification = new Notification("Descarga Completada", {
            title: "youtapp",
            body: `No se pudo encontrar el audio o el video no es accesible`,
          });
      console.error('Error al descargar el audio:', error);
    });
}
