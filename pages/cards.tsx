import Layout from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAddCardModal } from "@/components/addCard/addCardModalContext";
import { useWeb5Context } from "@/context/web5";
import { useEffect, useState } from "react";

type Card = {
  cardName: string;
  cardType: string;
  cardNumber: number;
  securityCode: number;
  startDate: string;
  expireDate: string;
};

const Cards = () => {
  const { setShowAddCardModal } = useAddCardModal();
  const { did, web5, protocolDefinition } = useWeb5Context();
  const [savedCards, setSavedCards] = useState<Card[] | null>(null);

  useEffect(() => {
    if (web5) {
      fetchCards();
    }
  }, [web5]);
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

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Cards</h1>
        <button
          className="border-2 p-4 text-xl"
          onClick={() => setShowAddCardModal(true)}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
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
        {!savedCards?.length && <h1 className="text-xl">No Data Found...</h1>}
      </div>
    </Layout>
  );
};

export default Cards;
