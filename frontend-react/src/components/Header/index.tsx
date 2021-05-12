import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <h1>gRPC-Web Research</h1>
    <nav>
      <ul>
        <li>
          <Link to="/app-pay">Streaming Example</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
