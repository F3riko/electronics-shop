import ProductPreviewGallery from "./Product Preview Gallery/ProductPreviewGallery";
import CategoriesBar from "./CategoriesBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useEffect, useMemo, useState } from "react";
import dummyData from "../../dummydata/electronicsData";
import categories from "../../dummydata/categories";
import { getAllChildrenCategories } from "../../dummydata/dummyDataOperations";

const Homepage = () => {
  const dummyDataArray = useMemo(() => Object.values(dummyData), []);

  const [activeCategory, setActiveCategory] = useState({
    id: 0,
    category_name: "All products",
    parent_category_id: null,
  });
  const [productsToRender, setProductsToRender] = useState(dummyDataArray);

  // Logic to filter products based on the current active category, will be deleted later
  useEffect(() => {
    let productsFiltrdByCategory = [...dummyDataArray];
    productsFiltrdByCategory.map((category) => category.id);
    if (activeCategory.id !== 0) {
      let fromCategories = [
        activeCategory.id,
        ...getAllChildrenCategories(categories, activeCategory.id),
      ];
      productsFiltrdByCategory = productsFiltrdByCategory.filter((product) =>
        fromCategories.includes(product.category)
      );
    }
    setProductsToRender(productsFiltrdByCategory);
  }, [activeCategory, dummyDataArray]);

  return (
    <>
      <Row>
        <Col md={2}>
          <CategoriesBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </Col>
        <Col md={9}>
          <ProductPreviewGallery productsData={productsToRender} />
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
