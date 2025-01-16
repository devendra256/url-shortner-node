import { useState } from "react";

function UrlForm() {

    const [url, setUrl] = useState("");
    const [urlData, setUrlData] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/shorten", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        console.log(data);
    }

    const copyHandler = () => {
        console.log("Copied", this);
    }

    const deleteHandler = () => {
        console.log("Deleted");
    }

    const showAllUrls = async () => {
        const response = await fetch("http://localhost:3000/urls");
        const data = await response.json();
        document.querySelector('#shortUrls').innerHTML = "";
        if (data.status === "success") {
            setUrlData(data.data);
        }
    }

    const visitUrl = async (shortUrl) => {
        window.open(shortUrl, "_blank");
        const response = await fetch("http://localhost:3000/visit/", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ shortUrl })
        });
        if (!response.ok) {
            alert("Something went wrong");            
        }
    }

    return (
        <>
            <form>
                <div>
                    <input
                        className="border-2 border-gray-300 bg-white h-10 px-2 pr-16 rounded-lg text-sm focus:outline-none"
                        type="text"
                        name="inputUrl"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        placeholder="https://google.com" />

                    <button
                        type="submit"
                        onClick={submitHandler}
                        className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
                    >Shorten</button>
                </div>
            </form>
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded m-4"
                    onClick={showAllUrls}>Show All Short Url</button>

                <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-center text-gray-600 uppercase text-sm">
                            <th className="px-4 py-3">Full Url</th>
                            <th className="px-4 py-3">Short Url</th>
                            <th className="px-4 py-3">Clicks</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="shortUrls" className="divide-y divide-gray-200">
                        {
                            urlData.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-blue-600 underline">
                                        <a href={item.fullUrl} target="_blank" rel="noopener noreferrer">{item.fullUrl}</a>
                                    </td>
                                    <td className="px-4 py-3 text-blue-600 underline">
                                        <button onClick={() => visitUrl(item.shortUrl)}>{item.shortUrl} ↗️</button>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">{item.clicks}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded shadow"
                                            onClick={copyHandler}
                                        >Copy 📃</button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded shadow"
                                            onClick={deleteHandler}
                                        >Delete 🗑️</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UrlForm;