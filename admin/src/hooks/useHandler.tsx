import * as React from "react";
import { createContext, useState } from "react";
import { HandlerType } from "../utils/types";

export interface HandlerContextInterface {
  active: number | null;
  setActive: (id: any) => void;
  visible: boolean;
  setVisible: (enabled: boolean) => void;
  handler: HandlerType | null;
  setHandler: (handler: any) => void;
}

const initialState = {
  active: null,
  setActive: () => {},
  visible: false,
  setVisible: () => {},
  handler: null,
  setHandler: () => {},
};

const HandlerContext = createContext<HandlerContextInterface>(initialState);

const HandlerProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(initialState.visible);
  const [active, setActive] = useState(initialState.active);
  const [handler, setHandler] = useState(initialState.handler);

  return (
    <HandlerContext.Provider
      value={{ visible, active, handler, setVisible, setActive, setHandler }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerProvider };
