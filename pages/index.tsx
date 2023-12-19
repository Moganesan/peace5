import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { useWeb5Context } from "@/context/web5";

const inter = Inter({ subsets: ["latin"] });

type Password = {
  url: string;
  name: string;
  userName: string;
  sitePassword: string;
  autoLogin: boolean;
};

type Card = {
  cardName: string;
  cardType: string;
  cardNumber: number;
  securityCode: number;
  startDate: string;
  expireDate: string;
};

type BankAccount = {
  bankName: string;
  accountType: string;
  accountNumber: string;
  swiftCode: string;
  branchAddress: string;
};

export default function Home() {
  const { web5, did, protocolDefinition } = useWeb5Context();
  const [savedPasswords, setSavedPasswords] = useState<Password[] | null>(null);
  const [savedCards, setSavedCards] = useState<Card[] | null>(null);
  const [savedBankAccounts, setSavedBankAccounts] = useState<
    BankAccount[] | null
  >(null);
  const fetchPasswords = async () => {
    let response = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          schema: "https://moganesan.github.io/passwords",
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

  const fetchCards = async () => {
    let response = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          schema: "https://moganesan.github.io/cards",
          protocol: protocolDefinition.protocol,
        },
      },
    });
    console.log("Response", response);

    if (response.status.code === 200) {
      const cards: Card[] = await Promise.all(
        response.records.map(async (record: any) => {
          const data = await record.data.json();
          return data;
        })
      );
      console.log("Fetched Cards", cards);
      setSavedCards(cards);
    } else {
      console.log("error", response.status);
    }
  };

  const formatCreditCardNumber = (number: string) => {
    const visibleDigits = 4; // Number of visible digits at the beginning and end
    const hiddenDigits = number.length - 2 * visibleDigits; // Number of hidden digits in the middle

    // Extract visible and hidden parts
    const visiblePart = number.slice(0, visibleDigits);
    const hiddenPart = "*".repeat(hiddenDigits);
    const lastVisiblePart = number.slice(-visibleDigits);

    // Combine parts with spaces for better readability
    const formattedNumber = `${visiblePart} ${hiddenPart} ${lastVisiblePart}`;
    console.log(formattedNumber);

    return formattedNumber;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
    const year = date.getFullYear().toString();

    return `${month}/${year}`;
  };

  useEffect(() => {
    if (web5) {
      fetchPasswords();
      fetchCards();
      fetchBankAccounts();
    }
  }, [web5]);
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-3xl">
            Passwords{" "}
            {savedPasswords?.length == 0 ? null : savedPasswords?.length}
          </h1>
          <div className="grid grid-cols-5 gap-20 mt-10 grid-flow-row">
            {savedPasswords ? (
              savedPasswords?.map((password: Password) => {
                return (
                  <div className="border-2 w-64 p-5 cursor-pointer hover:scale-105 duration-500">
                    <img src={`https://f1.allesedv.com/16/${password.url}`} />
                    <h1>{password.name}</h1>
                    <p>{password.userName}</p>
                  </div>
                );
              })
            ) : (
              <h1 className="text-xl">Loading...</h1>
            )}
            {!savedPasswords?.length && (
              <h1 className="text-xl">No Data Found...</h1>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl">
            Payment Cards {savedCards?.length == 0 ? null : savedCards?.length}
          </h1>
          <div className="grid grid-cols-3 mt-10 grid-flow-row gap-20">
            {savedCards ? (
              savedCards.map((card: Card) => {
                return (
                  <div className="border-2 w-96 p-5 cursor-pointer hover:scale-105 duration-500">
                    <div className="flex justify-between">
                      <h1 className="text-xl">{card.cardName}</h1>
                      <p>{card.cardType}</p>
                    </div>
                    <div>
                      <h1 className="text-4xl">
                        {formatCreditCardNumber(card.cardNumber.toString())}
                      </h1>
                      <h1 className="text-xl">{formatDate(card.expireDate)}</h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
            {!savedCards?.length && (
              <h1 className="text-xl">No Data Found...</h1>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl">
            Bank Accounts{" "}
            {savedBankAccounts?.length == 0 ? null : savedBankAccounts?.length}
          </h1>
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
        </div>
      </div>
    </Layout>
  );
}
