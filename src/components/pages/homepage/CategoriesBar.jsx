import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import categories from "../../dummydata/categories";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const CategoriesBar = ({ activeCategory, setActiveCategory }) => {
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);

  const getCategoriesByParent = (categoriesObj, parentId) => {
    return Object.values(categoriesObj).filter(
      (category) => category.parent_category_id === parentId
    );
  };

  const categoryHasChildren = (categoriesObj, categoryId) => {
    return Object.values(categoriesObj).some(
      (category) => category.parent_category_id === categoryId
    );
  };

  useEffect(() => {
    const categoriesToRender = [];
    const categoriesArray = Object.values(categories);

    if (categoryHasChildren(categories, activeCategory.id)) {
      categoriesToRender.push(categoriesArray[0]);
      if (activeCategory.id !== 0) categoriesToRender.push(activeCategory);
      categoriesToRender.push(
        ...getCategoriesByParent(categories, activeCategory.id)
      );
    } else {
      categoriesToRender.push(categories[0]);
      categoriesToRender.push(categories[activeCategory.parent_category_id]);
      categoriesToRender.push(
        ...getCategoriesByParent(categories, activeCategory.parent_category_id)
      );
    }
    console.log(categoriesToRender);
    setCategoriesToDisplay(categoriesToRender);
  }, [activeCategory]);

  return (
    <ListGroup>
      {categoriesToDisplay.map((category) => (
        <ListGroupItem
          key={category.id}
          action
          onClick={() => setActiveCategory(category)}
          active={activeCategory.id === category.id}
        >
          {category.category_name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CategoriesBar;
