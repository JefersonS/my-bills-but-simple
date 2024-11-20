import React, { useState } from 'react';
import { MonthlyBills } from '../page';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  addBill: (bill: MonthlyBills) => void;
}

interface BackdropClickEvent extends React.MouseEvent<HTMLDivElement> {
  target: EventTarget & HTMLDivElement;
  currentTarget: EventTarget & HTMLDivElement;
}

const NewBillModal = ({ isOpen, onClose, addBill }: ModalProps) => {
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  // Handling clicks outside the modal to close it
  const handleBackdropClick = (e: BackdropClickEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick} >
      <div className="bg-[#f9f6f2] rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-6 space-y-6">
          <div className='space-y-4'>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter bill name"
                className="block w-full p-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                onKeyDown={handleEnterPress}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
              <input
                type="number"
                name="value"
                id="value"
                placeholder="Enter the bill value"
                className="block w-full p-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                onKeyDown={handleEnterPress}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                placeholder="Enter the bill value"
                className="block w-full p-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                onKeyDown={handleEnterPress}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    onClose();
                    addBill({ id: String(Math.random()), name, amount: value, dueDate });
                  }, 2000);
                }}
              >
                Add Bill
              </button>
            </div>
            <div>
              {loading && <p className="text-blue-500">Adding bill...</p>}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default NewBillModal;
