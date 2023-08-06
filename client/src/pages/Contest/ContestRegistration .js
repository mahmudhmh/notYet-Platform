import React from "react";

const ContestRegistration = ({
  isRegistered,
  handleSubmit,
  handleJoinContest,
}) => {
  const renderButton = () => {
    if (isRegistered) {
      return <button onClick={handleJoinContest}>Join</button>;
    } else {
      return <button onClick={handleSubmit}>Register</button>;
    }
  };

  return (
    <div>
      <h2>Contest Registration</h2>
      {renderButton()}
    </div>
  );
};

export default ContestRegistration;
