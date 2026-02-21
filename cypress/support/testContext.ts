import { MainPage } from "../e2e/pages/main_page";
import { ProductPage } from "../e2e/pages/product_page";
import { SideBar } from "../e2e/pages/side_bar";
import { Header } from "../e2e/pages/header";
import { CartPage } from "../e2e/pages/cart_page";
import { FavoritesPage } from "../e2e/pages/favorites_page";

export class TestContext {
  mainPage = new MainPage();
  sideBar = new SideBar();
  productPage = new ProductPage();
  header = new Header();
  cartPage = new CartPage();
  favoritesPage = new FavoritesPage();
}
