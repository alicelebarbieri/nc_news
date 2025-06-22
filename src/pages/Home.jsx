import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import { useSearchParams } from "react-router-dom";
import { Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";

function Home() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const handleSortChange = (e) => {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  };
  const handleOrderChange = (e) => {
    searchParams.set("order", e.target.value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    getArticles({ sort_by: sortBy, order })
    .then(({ data }) => {
      setArticles(data.articles);
    })
    .catch((err) => {
        console.error("Error fetching articles:", err);
  });
  }, [sortBy, order]);

  return (
    <Container className="py-4">
      <Row className="mb-4 text-center">
        
      </Row>

      <Row>
        <Col>
          <h1 className="text-center">Welcome to the News App</h1>
          <h2>All Articles</h2>

          <Form className="d-flex gap-3 mb-3">
            <Form.Group>
              <Form.Label>Sort by:</Form.Label>
              <Form.Select value={sortBy} onChange={handleSortChange}>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Order:</Form.Label>
              <Form.Select value={order} onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Form.Group>
          </Form>

          <Row xs={1} md={2} lg={3} className="g-4">
            {articles.map((article) => (
              <Col key={article.article_id}>
                <ArticleCard article={article} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;