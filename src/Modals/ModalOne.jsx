/* eslint-disable react-refresh/only-export-components */
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import vidDown, { getTittleVideo } from "./vid";
import { Select, SelectItem } from "@nextui-org/react";
import { tag } from "./tags";
import "../App.css";

// Definir la función handleDownloadClick fuera del evento DOMContentLoaded

export default function ModalOne() {
  const [value, setValue] = React.useState(new Set([]));

  const vidYT = () => {
    vidDown();
    getTittleVideo();
    console.log("apretado");
  };

  function handleDownloadClick() {
    const input = document.getElementById("tittleNameArchive")
    const tag = document.getElementById("vidTittle")
    let fileName;

    if (input && tag) {
      if (input.value !== "") {
        fileName = `C:/Videos/${tag.textContent}.mp4`;
        return fileName;
      } else {
        fileName = `C:/Videos/${input.value}.mp4`;
        return fileName;
      }
    } else {
      console.error("Elementos no encontrados");
      return null; // O maneja el error de alguna manera adecuada
    }
    
  }

  function selectFile() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(handleDownloadClick());
      }, 1000); 
    });
  }

  async function miFuncionAsincrona() {
    try {
      var resultado = await selectFile().then((resultado) => {
        localStorage.setItem("urlFileVideo", resultado);
        console.log(resultado);
      });
    } catch (error) {
      console.error(error);
    }

    return `${resultado}`
  }
  
  // Llama a la función asincrónica
  const resultadoRecuperado = localStorage.getItem("urlFileVideo");

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Descargar Video
            </ModalHeader>
            <ModalBody>
              <Input type="text" label="URL video" id="urlvalue" />
              <Input
                type="text"
                label="Nombre del archivo"
                id="tittleNameArchive"
              />
              <Select
                label="Selecciona una opcion"
                className="max-w-xs"
                selectedKeys={value}
                onSelectionChange={setValue}
              >
                {tag.map((tags) => (
                  <SelectItem key={tags.value} value={tags.value}>
                    {tags.label}
                  </SelectItem>
                ))}
              </Select>
              <p id="tag">{value}</p>
              <img id="imgPreview"></img>
              <p id="vidTittle"></p>
            </ModalBody>
            <ModalFooter>
              <Link href={resultadoRecuperado} download>
                <Button
                  as={Link}
                  color="warning"
                  showAnchorIcon
                  variant="solid"
                  download
                >
                  Copiarlo en otra ubicacion
                </Button>
              </Link>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="success" onClick={vidYT}>
                Descargar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
}
export function ModelButOne() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Descargar video</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalOne />
      </Modal>
    </>
  );
}
