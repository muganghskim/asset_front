import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems = [
    { id: 'item-1', content: 'Item 1', price: 10 },
    { id: 'item-2', content: 'Item 2', price: 15 },
    { id: 'item-3', content: 'Item 3', price: 20 },
  ];

const DragAndDrop: React.FC = () => {
    const [items, setItems] = useState(initialItems);
    const [dropZoneItems, setDropZoneItems] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [newPrice, setNewPrice] = useState('');
  
    const onDragEnd = (result: any) => {
      if (!result.destination) return;
  
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;
  
      if (result.source.droppableId === 'items-zone' && result.destination.droppableId === 'drop-zone') {
        const newItems = Array.from(items);
        const [movedItem] = newItems.splice(sourceIndex, 1);
        setItems(newItems);
        setDropZoneItems([...dropZoneItems, movedItem]);
        setShowModal(true);
        setSelectedItem(movedItem);
      } else if (result.source.droppableId === 'drop-zone' && result.destination.droppableId === 'items-zone') {
        const newDropZoneItems = Array.from(dropZoneItems);
        const [movedItem] = newDropZoneItems.splice(sourceIndex, 1);
        setDropZoneItems(newDropZoneItems);
        setItems([...items, movedItem]);
      } else if (result.source.droppableId === 'items-zone' && result.destination.droppableId === 'items-zone') {
        const newItems = Array.from(items);
        const [movedItem] = newItems.splice(sourceIndex, 1);
        newItems.splice(destinationIndex, 0, movedItem);
        setItems(newItems);
      } else if (result.source.droppableId === 'drop-zone' && result.destination.droppableId === 'drop-zone') {
        const newDropZoneItems = Array.from(dropZoneItems);
        const [movedItem] = newDropZoneItems.splice(sourceIndex, 1);
        newDropZoneItems.splice(destinationIndex, 0, movedItem);
        setDropZoneItems(newDropZoneItems);
      }
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPrice(event.target.value);
    };
  
    const handleSavePrice = () => {
      if (!selectedItem || newPrice === '') return;
      const updatedItems = items.map((item: any) => {
        if (item.id === selectedItem.id) {
          return { ...item, price: parseFloat(newPrice) };
        }
        return item;
      });
      setItems(updatedItems);
      setShowModal(false);
      setNewPrice('');
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items-zone">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-52 h-52 border-dashed border-2 border-gray-400 rounded mb-8 flex flex-col items-center justify-center"
            >
              <p className="text-gray-500">Items Zone</p>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white rounded p-4 shadow-md mb-2"
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="drop-zone">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-52 h-52 border-dashed border-2 border-gray-400 rounded flex flex-col items-center justify-center"
            >
              <p className="text-gray-500">Drop Zone</p>
              {dropZoneItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white rounded p-4 shadow-md mb-2"
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {showModal && selectedItem && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded p-4 shadow-md">
              <p>{selectedItem.content}</p>
              <input
                type="number"
                placeholder="New Price"
                value={newPrice}
                onChange={handlePriceChange}
                className="border border-gray-300 rounded px-3 py-1 mt-2"
              />
              <button
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleSavePrice}
              >
                Save
              </button>
              <button
                className="mt-2 bg-gray-500 text-white py-2 px-4 rounded ml-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default DragAndDrop;
