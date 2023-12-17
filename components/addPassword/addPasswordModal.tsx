import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAddPasswordModalContext } from "./addPasswordModalContext";
import SwitchComponent from "../switch";
import { useWeb5Context } from "@/context/web5/web5Context";
import axios from "axios";

const AddPasswordModal: FC = () => {
  const { setShowAddPasswordModal, showAddPasswordModal } =
    useAddPasswordModalContext();
  const [autoLogin, setAutoLogin] = useState(false);
  const [url, setURL] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [sitePassword, setSitePassword] = useState<string>("");
  const { did, web5, protocolDefinition } = useWeb5Context();

  const savePassword = async () => {
    const { record } = await web5.dwn.records.create({
      store: false,
      data: {
        url: url,
        name: name,
        userName: userName,
        sitePassword: sitePassword,
        autoLogin: autoLogin,
      },
      message: {
        schema: protocolDefinition.types.passwords.schema,
        protocol: protocolDefinition.protocol,
        protocolPath: "passwords",
        dataFormat: "application/json",
      },
    });

    console.log("record", record);

    const { status: myDidStatus } = await record.send(did);
    console.log(myDidStatus, "status");
  };

  return (
    <Transition appear show={showAddPasswordModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setShowAddPasswordModal(false)}
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
                  Add Password
                </Dialog.Title>

                <div className="mt-4">
                  <div>
                    <label>URL</label>
                    <input
                      value={url}
                      onChange={(e) => setURL(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>

                  <div className="mt-5">
                    <label>Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Username</label>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-5">
                    <label>Site Password</label>
                    <input
                      value={sitePassword}
                      onChange={(e) => setSitePassword(e.target.value)}
                      type="password"
                      className="w-full bg-primaryBackground border-2 px-2 py-2 outline-none"
                    />
                  </div>
                  <div className="mt-3">
                    <SwitchComponent
                      enabled={autoLogin}
                      setEnabled={setAutoLogin}
                      switchName="Autologin"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setShowAddPasswordModal(false)}
                      className="bg-primaryBackground px-4 py-2 border-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => savePassword()}
                      className="px-4 py-2 border-2 text-slate-950 bg-primary ml-2"
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

export default AddPasswordModal;
