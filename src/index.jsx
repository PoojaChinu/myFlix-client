import { createRoot } from "react-dom/client";

// Importing the MainView Function
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Importing the Container
import Container from "react-bootstrap/Container";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container className="h-100 justify-content-center">
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
