import { gql, useQuery } from "@apollo/client";
import update from "immutability-helper";
import { useState } from "react";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import Card from "./Card";

const PROJECT_BY_ID = gql`
  query($id: Int!) {
    project(id: $id) {
      tasks {
        id
        title
      }
    }
  }
`;

const Test = () => {
  const [cards, setCards] = useState([]);

  const { data } = useQuery(PROJECT_BY_ID, {
    variables: { id: 1 },
  });

  useEffect(() => {
    if (data) {
      setCards(data.project.tasks);
    }
  }, [data]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  return (
    <DndProvider options={HTML5toTouch}>
      <div>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.title}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Test;
