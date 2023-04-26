import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { gtm } from '../lib/gtm';
import { useAuth } from "../hooks/use-auth"

// const Home = () => {

//   const router = useRouter();

//   useEffect(() => {
//     router.push("/authentication/login");
//   }, []);

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    gtm.push({ event: "page_view" });
    if (!user) {
      console.log(user);
      window.location.href = "/authentication/login";

    } else {
      if (localStorage.getItem("role") == "admin") {
        window.location.href = "/dashboard";
      } else if (localStorage.getItem("role") == "employee") {
        window.location.href = "/dashboard/startsession";
      }
    }
  }, [user]);

  //   return (
  //     <div>
  //       <button onClick={handleLogin}>Login</button>
  //     </div>
  //   );
  // };

  return (
    <>
      <main>

      </main>
    </>
  )
};

export default Home;
