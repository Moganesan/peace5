import Layout from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAddPasswordModalContext } from "@/components/addPassword/addPasswordModalContext";
import { useWeb5Context } from "@/context/web5";
import { useState, useEffect } from "react";

type Password = {
  url: string;
  name: string;
  userName: string;
  sitePassword: string;
  autoLogin: boolean;
};

const Passwords = () => {
  const { setShowAddPasswordModal } = useAddPasswordModalContext();
  const { web5, did, protocolDefinition } = useWeb5Context();
  const [savedPasswords, setSavedPasswords] = useState<Password[] | null>(null);

  useEffect(() => {
    if (web5) {
      fetchPasswords();
    }
  }, [web5]);

  const fetchPasswords = async () => {
    let response = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          protocol: protocolDefinition.protocol,
        },
      },
    });
    console.log("Response", response);

    if (response.status.code === 200) {
      const passwords: Password[] = await Promise.all(
        response.records.map(async (record: any) => {
          const data = await record.data.json();
          return data;
        })
      );
      console.log("Fetched Passwords", passwords);
      setSavedPasswords(passwords);
    } else {
      console.log("error", response.status);
    }
  };
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Passwords</h1>
        <button
          className="border-2 p-4 text-xl"
          onClick={() => setShowAddPasswordModal(true)}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-20 mt-10 grid-flow-row">
        {setSavedPasswords.length &&
          savedPasswords?.map((password: Password) => {
            return (
              <div className="border-2 w-64 p-5 cursor-pointer hover:scale-105 duration-500">
                <img src={`https://f1.allesedv.com/16/${password.url}`} />
                <h1>{password.name}</h1>
                <p>{password.userName}</p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Passwords;
