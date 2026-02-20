import { MainPage } from "./pages/main_page";
import { ProductPage } from "./pages/product_page";
import { SideBar } from "./pages/side_bar";
import { Header } from "./pages/header";
import { CartPage } from "./pages/cart_page";

export class TestContext {
  mainPage = new MainPage();
  sideBar = new SideBar();
  productPage = new ProductPage();
  header = new Header();
  cartPage = new CartPage();
}
