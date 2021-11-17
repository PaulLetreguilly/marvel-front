import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img
          src="https://www.thegeekgeneration.com/wp-content/uploads/2009/12/thumbnail-marvel-character-logo.jpg"
          alt="marvel logo"
          class="logo"
        />
      </Link>
    </header>
  );
};

export default Header;
