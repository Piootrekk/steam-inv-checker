import SteamForm from "../components/SteamForm";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }
  );
  return (
    <QueryClientProvider client={queryClient}>
      <SteamForm />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
