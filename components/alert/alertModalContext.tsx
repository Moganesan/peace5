import { createContext, useContext, FC, useState } from "react";
import { WithChildren } from "@/helpers/reactHelper";

type Props = {
  showAlertModal: boolean;
  setShowAlertModal: Function;
  alertMessage: string | null;
  setAlertMessage: Function;
  alertTitle: string | null;
  setAlertTitle: Function;
};

const AlertModalContext = createContext<Props>({
  showAlertModal: false,
  setShowAlertModal: () => {},
  setAlertTitle: () => {},
  alertTitle: null,
  setAlertMessage: () => {},
  alertMessage: null,
});

const AlertModalContextProvider: FC<WithChildren> = ({ children }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertTitle, setAlertTitle] = useState<string>("");
  return (
    <AlertModalContext.Provider
      value={{
        showAlertModal: showAlertModal,
        setShowAlertModal: setShowAlertModal,
        alertMessage: alertMessage,
        alertTitle: alertTitle,
        setAlertMessage: setAlertMessage,
        setAlertTitle,
      }}
    >
      {children}
    </AlertModalContext.Provider>
  );
};

const useAlertModalContext = () => useContext(AlertModalContext);

export { useAlertModalContext, AlertModalContextProvider };
