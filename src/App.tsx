import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <div
      className="w-dvw h-dvh bg-no-repeat bg-center bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url("/images/background.png")`,
      }}
    >
      <div className="m-2">
        <h1 className="text-center text-4xl font-bold">
          Simplify Your URLs with Ease
        </h1>
        <Home />
        <footer className="w-full text-center">
          <span>
            <hr />
            Contact{" "}
            <a
              className="underline"
              href="https://www.facebook.com/tuank17a2/"
              target="_blank"
              rel="noreferrer"
            >
              me
            </a>{" "}
            if you have any questions <br />
            Developed by JPatrick &reg; August 2024
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
