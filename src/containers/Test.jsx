import { gql, useQuery } from "@apollo/client";
import update from "immutability-helper";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import axios from "../helpers/api";

const PROJECT_BY_ID = gql`
  query($id: Int!) {
    project(id: $id) {
      tasks {
        id
        title
        order
      }
    }
  }
`;

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

const Test = () => {
  const [items, setItems] = useState([]);
  const { data } = useQuery(PROJECT_BY_ID, {
    variables: { id: 1 },
  });

  useEffect(() => {
    if (data) {
      setItems(_.orderBy(data.project.tasks, "order"));
    }
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const dragItem = items[result.destination.index];
    setItems(
      update(items, {
        $splice: [
          [result.destination.index, 1],
          [result.source.index, 0, dragItem],
        ],
      })
    );

    axios.put(`/tasks/${result.draggableId}`, {
      order: result.destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Test;
