import { WithChildren } from "@/helpers/reactHelper";
import { useContext, createContext, useState, FC } from "react";

type props = {
  showRegisterModal: boolean;
  setShowRegisterModal: Function;
};

const RegisterModalContext = createContext<props>({
  showRegisterModal: false,
  setShowRegisterModal: () => {},
});

const RegisterModalContextProvider: FC<WithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <RegisterModalContext.Provider
      value={{
        showRegisterModal: showModal,
        setShowRegisterModal: setShowModal,
      }}
    >
      {children}
    </RegisterModalContext.Provider>
  );
};

const useRegisterModalContext = () => useContext(RegisterModalContext);

export { useRegisterModalContext, RegisterModalContextProvider };
