import Message from "../Message";

function App() {
  return (
    <div className="container mt-5">
      {/* Top-right login button */}
      <div className="d-flex justify-content-end">
        <a href="/login" className="btn btn-outline-primary">
          Login
        </a>
      </div>

      <header className="text-center mb-4">
        <h1 className="display-4">Welcome to BetterPrepared</h1>
        <p className="lead">This is a simple page styled with Bootstrap.</p>
      </header>
      <main>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Feature 1</h5>
                <p className="card-text">Description of the first feature.</p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Feature 2</h5>
                <p className="card-text">Description of the second feature.</p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center mt-4">
        <p>&copy; 2025 BetterPrepared. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
