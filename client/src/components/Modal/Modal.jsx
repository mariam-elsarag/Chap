import React from "react";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { IoChevronForwardOutline } from "react-icons/io5";

const Model = ({
  children,
  headerTitle = "",
  open,
  onClose,
  hasBtn = true,
  button,
}) => {
  const modelRef = useOutsideClick(onClose);
  return (
    <div className={` relative w-full  `}>
      <div
        className={`modelContainer flex items-center justify-center  fixed inset-0 ${
          open ? "open" : ""
        } `}
      >
        <div
          ref={modelRef}
          className={`model flex flex-col justify-between overflow-y-auto bg-secondary-bg  w-[600px] absolute rounded-lg sm:rounded-xl py-2 px-1`}
        >
          <div className="model_body h-full flex flex-col justify-between overflow-y-auto pt-4 pb-6 px-4 sm:p-6">
            <header className="flex items-center justify-between gap-2 pb-4 border-b border-border">
              <strong className="text-primary text-base ">{headerTitle}</strong>
              <span
                role="button"
                onClick={() => {
                  onClose();
                }}
              >
                <IoChevronForwardOutline size={22} color="var(--text-1)" />
              </span>
            </header>
            <section className="flex-1 flex flex-col justify-between gap-4  ">
              {/* model body */}
              <div className="flex flex-col gap-2 flex-1">{children}</div>
              {hasBtn && button && <div>{button}</div>}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
