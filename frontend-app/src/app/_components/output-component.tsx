import React from "react";

interface ModalProps {
  text: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ text, show, setShow }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md bg-white p-6 shadow-md">
            <p>{text}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                onClick={() => setShow(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
