import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="container">

      <div className="card">

        <h1>🔗 URL Shortener</h1>

        <p>
          Create, Retrieve, Update, Delete and Track your Short URLs
        </p>

        <button onClick={() => navigate("/shorten")}>
          Get Started
        </button>

      </div>

    </div>

  );

}

export default Home;