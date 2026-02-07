import { use } from "react";
import { CartContext } from "./contexts";
import { Link } from "@tanstack/react-router";
export default function Header() {
  const [cart] = use(CartContext);
  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒
        <span className="nav-cart-number" data-testid="cart-number">
          {cart.length}
        </span>
      </div>
    </nav>
  );
}
