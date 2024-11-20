"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import NewBillModal from "./components/NewBillModal";

export type MonthlyBills = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
};

type Month = {
  month: string;
  bills: MonthlyBills[];
}

const initialSeed = [
  {
    month: "January",
    bills: [
      {
        id: "1",
        name: "Rent",
        amount: 1000,
        dueDate: "01/01/2022",
      },
      {
        id: "2",
        name: "Electricity",
        amount: 50,
        dueDate: "01/01/2022",
      },
      {
        id: "3",
        name: "Water",
        amount: 20,
        dueDate: "01/01/2022",
      },
    ],
  },
  {
    month: "February",
    bills: [
      {
        id: "4",
        name: "Rent",
        amount: 1000,
        dueDate: "01/02/2022",
      },
      {
        id: "5",
        name: "Electricity",
        amount: 50,
        dueDate: "01/02/2022",
      },
      {
        id: "6",
        name: "Water",
        amount: 20,
        dueDate: "01/02/2022",
      },
    ],
  },
  {
    month: "March",
    bills: [
      {
        id: "7",
        name: "Rent",
        amount: 1000,
        dueDate: "01/03/2022",
      },
      {
        id: "8",
        name: "Electricity",
        amount: 50,
        dueDate: "01/03/2022",
      },
      {
        id: "9",
        name: "Water",
        amount: 20,
        dueDate: "01/03/2022",
      },
    ],
  },
  {
    month: "April",
    bills: [
      {
        id: "10",
        name: "Rent",
        amount: 1000,
        dueDate: "01/04/2022",
      },
      {
        id: "11",
        name: "Electricity",
        amount: 50,
        dueDate: "01/04/2022",
      },
      {
        id: "12",
        name: "Water",
        amount: 20,
        dueDate: "01/04/2022",
      },
    ],
  },
  {
    month: "May",
    bills: [
      {
        id: "13",
        name: "Rent",
        amount: 1000,
        dueDate: "01/05/2022",
      },
      {
        id: "14",
        name: "Electricity",
        amount: 50,
        dueDate: "01/05/2022",
      },
      {
        id: "15",
        name: "Water",
        amount: 20,
        dueDate: "01/05/2022",
      },
    ],
  },
  {
    month: "June",
    bills: [
      {
        id: "16",
        name: "Rent",
        amount: 1000,
        dueDate: "01/06/2022",
      },
      {
        id: "17",
        name: "Electricity",
        amount: 50,
        dueDate: "01/06/2022",
      },
      {
        id: "18",
        name: "Water",
        amount: 20,
        dueDate: "01/06/2022",
      },
    ],
  },
];


export default function Home() {
  const [bills, setBills] = useState<Month[]>([...initialSeed.slice(0, 3)]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const getSkew = (index: number) => {
    if (index === 0) {
      return "clipLeft";
    } else if (index === 2) {
      return "clipRight";
    }
  }

  const handleNext = () => {
    if (currentIndex === initialSeed.length - 2) {
      return;
    }

    setBills([...initialSeed.slice(currentIndex, currentIndex + 3)]);
    setCurrentIndex(currentIndex + 1);
  }

  const handlePrevious = () => {
    if (currentIndex === 1) {
      return;
    }

    setBills([...initialSeed.slice(currentIndex - 2, currentIndex + 1)]);
    setCurrentIndex(currentIndex - 1);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const onCloseModal = () => {
    setShowModal(false);
  }

  const addBill = (bill: MonthlyBills) => {
    const month = initialSeed[currentIndex];
    month.bills.push(bill);
    setBills([...initialSeed.slice(currentIndex - 1, currentIndex + 2)]);
  }

  return (
    <div className="space-y-4">
      <NewBillModal isOpen={showModal} onClose={onCloseModal} addBill={addBill} />
      <div className="flex justify-center mt-2">
        <p className="text-3xl">My bils</p>
      </div>
      <div className="min-h-[800px]">
        <div className="flex flex-row gap-2 justify-center relative">
          {bills.map((month, index) => (
            <div key={month.month} className={`border-2 p-4 ${getSkew(index)}`}>
              <div className="flex justify-center">
                <p className="text-lg">{month.month}</p>
              </div>
              <div className="flex flex-col gap-2">
                {month.bills.map((bill) => (
                  <div key={bill.id} className='grid grid-cols-3'>
                    <p className="text-lg">{bill.name}</p>
                    <p className="text-lg">{bill.amount}</p>
                    <p className="text-lg">{bill.dueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="hover:scale-125 cursor-pointer" onClick={handlePrevious}><FaArrowLeft /></button>
          <button className="hover:scale-125 cursor-pointer" onClick={handleNext}><FaArrowRight /></button>
        </div>
        <div className="flex justify-center">
          <button className="hover:scale-125 cursor-pointer" onClick={openModal}>New Bill</button>
        </div>
      </div>
      <style jsx>{`
        .clipRight {
          clip-path: polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%);
        }
        .clipLeft {
          clip-path: polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%);
        }
      `}</style>
    </div>
  );
}
