import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [imgUrl, setImageUrl] = useState<string>('');

  function handleViewImage(url: string): void {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="12">
        {cards.map(card => (
          <Card
            key={card.id}
            data={{
              title: card.title,
              description: card.description,
              url: card.url,
              ts: card.ts,
            }}
            viewImage={url => handleViewImage(url)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />
    </>
  );
}
