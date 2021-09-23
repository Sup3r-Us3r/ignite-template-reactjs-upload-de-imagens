import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent w="auto" maxW={900} maxH={600}>
        <ModalBody p={0}>
          <Image
            src={imgUrl}
            alt="Full image"
            maxW={900}
            maxH={600}
            objectFit="cover"
          />
        </ModalBody>
        <ModalFooter bg="pGray.800" justifyContent="flex-start">
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
