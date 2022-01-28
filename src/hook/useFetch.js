import { useCallback,  useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isauth, setIsAuth] = useState(false);
  //   const [apidata, setApidata] = useState(null);

  const sendRequest = useCallback(async (user) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://wren.in:3200/api/sign-up/fan");

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
   if(user){
      data.map((u) => {
        if (
          u.first_name === user.first_name &&
          u.last_name === user.last_name &&
          u.username === user.username &&
          u.email === user.email &&
          u.password === user.password
        ) {
         return setIsAuth(true);
        } else{
            throw new Error("auth fail")
        }
      })};
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

 

  return {
    isLoading,
    err: error,
    isauth,
    sendRequest,
  };
};

export default useFetch;
