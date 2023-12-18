import React, { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAddBankModalContext } from "./addBankModalContext";
import SwitchComponent from "../switch";

const AddBankModal: FC = () => {
  const { setShowAddBankModal, showAddBankModal } = useAddBankModalContext();
  const [bankName, setBankName] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [swiftCode, setSwiftCode] = useState<string>("");
  const [branchAddress, setBranchAddress] = useState<string>("");
  return (
    <Transition appear show={showAddBankModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setShowAddBankModal(false)}
        className="relative z-30"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-primaryBackground text-primary p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium font-sans leading-6 text-gray-900"
                >
                  Add New Bank
                </Dialog.Title>

                <div className="mt-4">
                  <div>
                    <label>Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Account Type</label>
                    <select
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    >
                      <option value={"savings"}>Savings</option>
                      <option value={"current"}>Current</option>
                    </select>
                  </div>
                  <div className="mt-5">
                    <label>Account Number</label>
                    <input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      type="number"
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Swift Code</label>
                    <input
                      value={swiftCode}
                      onChange={(e) => setSwiftCode(e.target.value)}
                      type="text"
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Branch Address</label>
                    <input
                      value={branchAddress}
                      onChange={(e) => setBranchAddress(e.target.value)}
                      type="text"
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  {/* <div className="mt-3">
                    <SwitchComponent
                      enabled={autoLogin}
                      setEnabled={setAutoLogin}
                      switchName="Autologin"
                    />
                  </div> */}
                  <div className="mt-4">
                    <button className="bg-primaryBackground px-4 py-2 border-2">
                      Cancel
                    </button>
                    <button className="px-4 py-2 border-2 text-slate-950 bg-primary ml-2">
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddBankModal;
