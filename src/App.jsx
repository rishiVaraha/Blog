import Config from "./config/config";

function App() {
  console.log(Config.appwriteUrl);
  return <div className="bg-gray-700 text-white">Hello</div>;
}

export default App;
