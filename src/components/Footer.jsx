import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <Container>
        <small>
          © {new Date().getFullYear()} NC News — Built with 💻 by Alicele Barbieri
        </small>
      </Container>
    </footer>
  );
}

export default Footer;