import Layout from "@/components/layout";
import { useAddBankModalContext } from "@/components/banks/addBankModalContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useWeb5Context } from "@/context/web5";
import { useEffect, useState } from "react";

type BankAccount = {
  bankName: string;
  accountType: string;
  accountNumber: string;
  swiftCode: string;
  branchAddress: string;
};

const Banks = () => {
  const { setShowAddBankModal } = useAddBankModalContext();
  const { did, web5, protocolDefinition } = useWeb5Context();
  const [savedBankAccounts, setSavedBankAccounts] = useState<
    BankAccount[] | null
  >(null);
  useEffect(() => {
    if (web5) fetchBankAccounts();
  }, [web5]);

  const fetchBankAccounts = async () => {
    let response = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          schema: "https://moganesan.github.io/banks",
          protocol: protocolDefinition.protocol,
        },
      },
    });
    console.log("Response", response);

    if (response.status.code === 200) {
      const bankAccounts: BankAccount[] = await Promise.all(
        response.records.map(async (record: any) => {
          const data = await record.data.json();
          return data;
        })
      );
      console.log("Fetched Banks", bankAccounts);
      setSavedBankAccounts(bankAccounts);
    } else {
      console.log("error", response.status);
    }
  };
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Banks</h1>
        <button
          className="border-2 p-4 text-xl"
          onClick={() => setShowAddBankModal(true)}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-20 mt-10 grid-flow-row">
        {savedBankAccounts ? (
          savedBankAccounts.map((account: BankAccount) => {
            return (
              <div className="border-2 w-96 p-5 cursor-pointer hover:scale-105 duration-500">
                <div className="flex justify-between">
                  <h1 className="text-xl">{account.bankName}</h1>
                  <p>{account.accountType}</p>
                </div>
                <div>
                  <h1 className="text-4xl">{account.accountNumber}</h1>
                  <h1 className="text-xl">{account.branchAddress}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
        {!savedBankAccounts?.length && (
          <h1 className="text-xl">No Data Found...</h1>
        )}
      </div>
    </Layout>
  );
};

export default Banks;
