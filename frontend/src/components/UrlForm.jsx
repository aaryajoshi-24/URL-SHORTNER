import { useState } from "react";
import API from "../services/api";

function UrlForm() {

    const [originalUrl, setOriginalUrl] = useState("");
    const [result, setResult] = useState(null);

    const createShortUrl = async () => {

        try {

            const response = await API.post("/urls", {
                originalUrl
            });

            setResult(response.data);
            setOriginalUrl("");

        } catch (error) {

            alert("Failed to create short URL");
            console.log(error);

        }

    };

    return (

        <div>

           <input
    type="text"
    placeholder="Enter Original URL"
    value={originalUrl}
    onChange={(e) => setOriginalUrl(e.target.value)}
    style={{ width: "100%" }}
/>

            <button onClick={createShortUrl}>
                Shorten URL
            </button>

            {result && (

                <div className="result">

                    <h3>Generated URL</h3>

                    <p>
                        <b>Original URL:</b> {result.originalUrl}
                    </p>

                    <p>
                        <b>Short Code:</b> {result.shortCode}
                    </p>

                </div>

            )}

        </div>

    );

}

export default UrlForm;