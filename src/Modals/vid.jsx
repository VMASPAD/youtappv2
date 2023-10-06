/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import ytdl from 'ytdl-core';
import grabLink from "youtube-thumbnail-grabber";
const { getInfo } = require('ytdl-getinfo')

function vidDown() {
  const titleInput = document.getElementById("tittleNameArchive");
  const tagElement = document.getElementById("vidTittle");
  const urlVideoInput = document.getElementById("urlvalue");
  
  // Obtén el valor del input o el contenido del elemento <p> según corresponda
  const title = titleInput.value.trim() !== "" ? titleInput.value.trim() : tagElement.textContent.trim();
  const urlVideo = urlVideoInput.value.trim();
  const savePath = `C:\\Videos\\${title}.mp4`;
  
  const tagKey = document.getElementById("tag")
  const tagContent = tagKey.textContent

    const videoStream = ytdl(urlVideo, { quality: tagContent });
    const fileStream = fs.createWriteStream(savePath);
  
    videoStream.pipe(fileStream);
  
    fileStream.on('finish', () => {
      console.log(`El video se ha descargado y guardado en: ${savePath}`);
  
      // Notificación de descarga completada
      var notification = new Notification("Descarga Completada", {
        title: "youtapp",
        body: `El video se ha descargado y guardado en: ${savePath}`,
      });
    });
  
    fileStream.on('error', (err) => {
      console.error('Error al guardar el video:', err);
  
      // Notificación de error
      var notification = new Notification("Error de Descarga", {
        title: "youtapp",
        body: 'Error al guardar el video.',
      });
    });
  }
export default vidDown;

export function getTittleVideo(){

    var urlVideo = document.getElementById("urlvalue").value

    const imgPreview = document.getElementById("imgPreview")

    const urlImage = grabLink(urlVideo, "max")

    imgPreview.src = urlImage

    getInfo(urlVideo).then(info => {
      var tittleName = info.items[0].title
      console.log(tittleName)
      const vidTittle = document.getElementById("vidTittle")
      vidTittle.innerHTML = `${tittleName}`
    })
    
}
