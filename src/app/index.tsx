import { DetailsView } from "@/pages/details-view";
import { SearchView } from "@/pages/search-view";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
 
export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchView />} />
                    <Route path="/details/:id" element={<DetailsView />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}