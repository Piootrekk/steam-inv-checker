import SteamForm from "../components/SteamForm";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  console.log("76561198090272581");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <SteamForm />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
