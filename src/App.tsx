import { AppRoutes } from "./router/AppRoutes";
import { GlobalStyle } from "./styles/Global.Style";

function App() {
  return (
    <>
      <AppRoutes />
      <GlobalStyle />
      <span
        style={{ fontSize: "12px", position: "absolute", bottom: 0, left: 0 }}
      >
        <i>0.0.0v under development</i>
      </span>
    </>
  );
}

export default App;
