import { useState, useEffect } from "react";
const useInternetStatus = () => {
  const [status, setStatus] = useState();

  const online = () => {
    setStatus(true);
  };

  const offline = () => {
    setStatus(false);
  };
  useEffect(() => {
    window.addEventListener("offline", offline);
    window.addEventListener("online", online);

    return (_) => {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
    };
  }, []);

  return status;
};

export default useInternetStatus;
