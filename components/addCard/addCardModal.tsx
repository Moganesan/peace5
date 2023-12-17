import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAddCardModal } from "./addCardModalContext";
import { useWeb5Context } from "@/context/web5";
import { useAlertModalContext } from "@/components/alert/alertModalContext";

const AddCardModal: FC = () => {
  const { setShowAddCardModal, showAddCardModal } = useAddCardModal();
  const [cardName, setCardName] = useState<string>("");
  const [cardType, setCardType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<number | null>(null);
  const [securityCode, setSecurityCode] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const { did, web5, protocolDefinition } = useWeb5Context();
  const [loading, setLoading] = useState<boolean>(false);
  const { setShowAlertModal, setAlertTitle, setAlertMessage } =
    useAlertModalContext();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const saveCard = async () => {
    if (
      !cardName ||
      !cardType ||
      !cardNumber ||
      !securityCode ||
      !startDate ||
      !expireDate
    ) {
      setAlertTitle("Invalid Card Details");
      setAlertMessage("please fill all the required input fields.");
      setShowAlertModal(true);
      return;
    }
    setLoading(true);

    const { record } = await web5.dwn.records.create({
      store: false,
      data: {
        cardName: cardName,
        cardType: cardType,
        cardNumber: cardNumber,
        securityCode: securityCode,
        startDate: startDate,
        expireDate: expireDate,
      },
      message: {
        schema: protocolDefinition.types.cards.schema,
        protocol: protocolDefinition.protocol,
        protocolPath: "cards",
        dataFormat: "application/json",
      },
    });

    const { status: myDidStatus } = await record.send(did);
    setLoading(false);
    setSuccessMessage("Record Saved!");
    resetInputField();

    console.log("Save Cards Status", myDidStatus);
  };

  const resetInputField = () => {
    setCardName("");
    setCardNumber(null);
    setCardType("");
    setSecurityCode(null);
    setStartDate("");
    setExpireDate("");
  };
  return (
    <Transition appear show={showAddCardModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setShowAddCardModal(false)}
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
                  Add New Card
                </Dialog.Title>

                <div className="mt-4">
                  <div>
                    <label>Name on Card</label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Type</label>
                    <input
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Number</label>
                    <input
                      value={cardNumber?.toString()}
                      onChange={(e) => setCardNumber(Number(e.target.value))}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Security Code</label>
                    <input
                      value={securityCode?.toString()}
                      onChange={(e) => setSecurityCode(Number(e.target.value))}
                      type="password"
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Start Date</label>
                    <input
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Expiration Date</label>
                    <input
                      value={expireDate}
                      onChange={(e) => setExpireDate(e.target.value)}
                      type="date"
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
                  <h1 className="mt-4">{successMessage}</h1>
                  <div className="mt-4">
                    <button className="bg-primaryBackground px-4 py-2 border-2">
                      Cancel
                    </button>
                    <button
                      onClick={() => !loading && saveCard()}
                      className={`px-4 py-2 border-2 duration-500 ${
                        loading && "animate-pulse"
                      } text-slate-950 bg-primary ml-2`}
                    >
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

export default AddCardModal;
