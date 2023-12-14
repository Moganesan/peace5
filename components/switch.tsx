import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function SwitchComponent({
  switchName,
  enabled,
  setEnabled,
}: {
  switchName: string;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only text-primary">{switchName}</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <h1 className="ml-2">{switchName}</h1>
    </div>
  );
}
