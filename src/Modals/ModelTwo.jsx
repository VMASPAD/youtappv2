import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { audioObtain } from './audio';


export function ModelTwo() {

  const vidAudio = () => {
    audioObtain();
    console.log("apretado");
  };
  return (
    <>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Descargar Audio</ModalHeader>
              <ModalBody>
              <Input type="text" label="URL video" id="urlVideoAudio" value="123456789"/>
              <Input type="text" label="Nombre del archivo" id="nameArchiveAudio" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="success" onPress={onClose} onClick={vidAudio}>
                  Descargar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </>
  )
}

export function ModelButTwo() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
    <Button onPress={onOpen}>Descargar audio</Button>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModelTwo />
     </Modal>
    </>
  )
}

