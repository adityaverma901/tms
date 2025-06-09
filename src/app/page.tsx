"use client"
import { useEffect, useState } from "react";
// import Navigation from "@/components/Navigation";
import Footer from "@/components/shared/Gennextfooter";
// import TravelDealSearch from "./search/page";
import { useSession } from "next-auth/react";
// import Homepage from "@/components/Homepage";
import { useCurrentRole, useCurrentUser } from "@/hooks/auth";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import Homepage from "@/components/Homepage";
 
export default function Home() {
  // const { data: session, status } = useSession();
  // const user = useCurrentUser();
  const role = useCurrentRole() as "USER" | "TRAVEL_AGENT" | "HOTEL_ADMIN" | "SALE_PERSON" | "SUPER_ADMIN" | undefined;
  console.log("role",role);
  
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  
  // Use useEffect to handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleRouting = async () => {
      if (!role) {
        return;
      }

      setIsRedirecting(true);
      switch (role) {
        case "USER":
          router.push("/dashboard/user");
          break;
          case "SUPER_ADMIN":
            router.push("/dashboard/superadmin");
            break;
        case "TRAVEL_AGENT":
          router.push("/dashboard/home");
        default:
          setIsRedirecting(false);
          break;
      }
      
    };
    handleRouting();
  }, [router, role]);


  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return <Loader />;;
  }

  if (isRedirecting ) {
    return <Loader />;
  }

  // if (user) {
  //   return (
  //     <main className="relative">
  //       <Navigation />
  //       <TravelDealSearch />
  //       <Footer />
  //     </main>
  //   );
  // }

  // If user is authenticated, show the main application
  return <Homepage />;
 
}