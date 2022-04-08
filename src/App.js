import { Fragment, useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";

function App() {

  const [cartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true)
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <Fragment>
      {cartShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
