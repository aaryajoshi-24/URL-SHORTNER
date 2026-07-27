import { useState } from "react";
import {
  FaCopy,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChartBar
} from "react-icons/fa";
import API from "../services/api";

function Shorten() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const [copied, setCopied] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  const [retrievedUrl, setRetrievedUrl] = useState("");

  const [newUrl, setNewUrl] = useState("");

  const [stats, setStats] = useState(null);

  // Generate Short URL

  const generateUrl = async () => {

    if (!originalUrl) {
      alert("Please enter a URL");
      return;
    }

    try {

      const response = await API.post("/urls", {
        originalUrl,
      });

      setShortCode(response.data.shortCode);

      setCopied(false);

      setActiveSection("");

      setRetrievedUrl("");

      setStats(null);

    } catch (error) {

      alert("Failed to Generate URL");

    }

  };

  // Copy Short Code

  const copyCode = () => {

    navigator.clipboard.writeText(shortCode);

    alert("Copied Successfully");

    setCopied(true);

  };

  // Retrieve URL

  const retrieveUrl = async () => {

    try {

      const response = await API.get(`/urls/${shortCode}`);

      setRetrievedUrl(response.data.originalUrl);

      setActiveSection("retrieve");

    } catch (error) {

      alert("Retrieve Failed");

    }

  };

  // Update URL

  const updateUrl = async () => {

    if (!newUrl) {

      alert("Enter New URL");

      return;

    }

    try {

      await API.put(`/urls/${shortCode}`, {

        originalUrl: newUrl,

      });

      const response = await API.get(`/urls/${shortCode}`);

      setRetrievedUrl(response.data.originalUrl);

      setActiveSection("update");

      alert("Updated Successfully");

      setNewUrl("");

    } catch (error) {

      alert("Update Failed");

    }

  };

  // Delete URL

  const deleteUrl = async () => {

    try {

      await API.delete(`/urls/${shortCode}`);

      alert("URL Deleted Successfully");

      setOriginalUrl("");

      setShortCode("");

      setCopied(false);

      setRetrievedUrl("");

      setStats(null);

      setNewUrl("");

      setActiveSection("");

    } catch (error) {

      alert("Delete Failed");

    }

  };

  // Statistics

  const getStats = async () => {

    try {

      const response = await API.get(`/urls/${shortCode}/stats`);

      setStats(response.data);

      setActiveSection("stats");

    } catch (error) {

      alert("Failed to Fetch Statistics");

    }

  };

  return ( <div className="container">

  <div className="card">

    <h1>🔗 URL Shortener</h1>

    <p>Create and Manage your Short URLs</p>

    <input
      type="text"
      placeholder="Enter Original URL"
      value={originalUrl}
      onChange={(e) => setOriginalUrl(e.target.value)}
    />

    <button onClick={generateUrl}>
      Generate Short URL
    </button>

    {shortCode && (

      <div className="result">

        <h3>Generated Short Code</h3>

        <h2>{shortCode}</h2>

        {!copied && (

          <button onClick={copyCode}>
            <FaCopy /> Copy
          </button>

        )}

      </div>

    )}

    {copied && (

      <>

        <div className="grid">

          <button
            className="action"
            onClick={retrieveUrl}
          >
            <FaSearch /> Retrieve
          </button>

          <button
            className="action"
            onClick={() => setActiveSection("update")}
          >
            <FaEdit /> Update
          </button>

          <button
            className="action"
            onClick={() => setActiveSection("delete")}
          >
            <FaTrash /> Delete
          </button>

          <button
            className="action"
            onClick={getStats}
          >
            <FaChartBar /> Statistics
          </button>

        </div>
                {activeSection === "retrieve" && (

          <div className="result">

            <h3>Original URL</h3>

            <p>{retrievedUrl}</p>

          </div>

        )}

        {activeSection === "update" && (

          <div className="result">

            <input
              type="text"
              placeholder="Enter New URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />

            <button onClick={updateUrl}>
              Update URL
            </button>

            {retrievedUrl && (

              <>

                <h3>Updated URL</h3>

                <p>{retrievedUrl}</p>

              </>

            )}

          </div>

        )}

        {activeSection === "delete" && (

          <div className="result">

            <h3>Delete this URL?</h3>

            <button onClick={deleteUrl}>
              Delete Permanently
            </button>

          </div>

        )}

        {activeSection === "stats" && stats && (

          <div className="result">

            <h3>Statistics</h3>

            <p>
              <b>Original URL:</b> {stats.originalUrl}
            </p>

            <p>
              <b>Short Code:</b> {stats.shortCode}
            </p>

            <p>
              <b>Access Count:</b> {stats.accessCount}
            </p>

            <p>
              <b>Created At:</b> {stats.createdAt}
            </p>

            <p>
              <b>Updated At:</b> {stats.updatedAt}
            </p>

          </div>

        )}

      </>

    )}

  </div>

</div>

  );

}

export default Shorten;