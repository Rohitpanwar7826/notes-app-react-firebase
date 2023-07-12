import "./index.css";

function Footer() {
  return (
    <div style={{ height: '3rem'}}>
      <footer className="fixed-bottom footer bg-dark text-light">
        <div className="container pt-0 pb-0 text-center">
          <p className="p-1 m-0">
            Create and Developed By: Ro<span className="text-primary">h</span>i
            <span className="text-danger">t</span> S
            <span className="text-warning">i</span>ng
            <span className="text-warning">h</span>{" "}
            <span className="text-danger">P</span>an
            <span className="text-warning">w</span>ar
          </p>
          <hr className="m-0 p-0" />
          <p className="mb-0 p-0">&copy; 2023 R.K Notes</p>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
