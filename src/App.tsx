import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { CurrentWeatherPage } from './pages/CurrentWeather.page';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App h-[100vh] bg-[#fffffff2] md:w-[84vw] md:mx-[8vw] w-[92vw] mx-[4vw]">
      <QueryClientProvider client={queryClient}>
        <CurrentWeatherPage queryClient={queryClient} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
