import RouteApp  from "./routes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  );
}
