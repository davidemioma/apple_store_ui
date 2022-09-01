import React from "react";

interface Props {
  text: string;
  setView: () => void;
  isActive: boolean;
}

const ViewBtn = ({ text, setView, isActive }: Props) => {
  return (
    <button
      className={`${isActive && "active_view"} view`}
      onClick={() => setView()}
    >
      {text}
      {isActive && (
        <div className="gradient absolute bottom-0 left-0 h-0.5 w-full" />
      )}
    </button>
  );
};

export default ViewBtn;
