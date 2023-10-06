import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { mergeMP4andMP3 } from "./archiveFusion";



export default function ModalThree() {

  const fusionVideoAudio = () => {
    mergeMP4andMP3();
    console.log("apretado");
  };
  
  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Fusionar Archivos
            </ModalHeader>
            <ModalBody>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Archivo MP4</span>
                </label>
                <input
                  id="fileVideoInput"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Archivo MP3</span>
                </label>
                <input
                  id="fileAudioInput"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
              <Input
                type="text"
                label="Nombre del archivo"
                id="tittleNameArchiveOutput"
              />
<div id="file-info"></div>

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={onClose} onClick={fusionVideoAudio}>
                Fusionar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
}
export function ModelButThree() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Fusionar archivos</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalThree />
      </Modal>
    </>
  );
}
