import axios from "axios";
import { useEffect, useState } from "react";

const NewsFeed = () => {
  const [articles, setArticles] = useState();

  // Request to backend
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/news",
    };

    axios
      .request(options)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const firstSevenArticles = articles && articles.slice(0, 7);

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {firstSevenArticles?.map((article, _index) => (
        <div key={_index}>
            <a href={article.url}><p>{article.title}</p></a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
