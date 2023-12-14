import { WithChildren } from "@/helpers/reactHelper";
import { useContext, createContext, FC, useState } from "react";

type props = {
  showAddCardModal: boolean;
  setShowAddCardModal: Function;
};

const AddCardModalContext = createContext<props>({
  showAddCardModal: false,
  setShowAddCardModal: () => {},
});

const AddCardModalContextProvidet: FC<WithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <AddCardModalContext.Provider
      value={{ showAddCardModal: showModal, setShowAddCardModal: setShowModal }}
    >
      {children}
    </AddCardModalContext.Provider>
  );
};

const useAddCardModal = () => useContext(AddCardModalContext);

export { AddCardModalContextProvidet, useAddCardModal };
