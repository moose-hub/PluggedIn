import React, { useState } from "react";

interface ContributionFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClose: () => void;
  amount: string;
  message: string;
}

const ContributionForm: React.FC<ContributionFormProps> = ({
  handleSubmit,
  handleAmountChange,
  handleMessageChange,
  handleClose,
  amount,
  message,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg z-50">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Contribution Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Enter your contribution amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Add a message"
                value={message}
                onChange={handleMessageChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributionForm;
