import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {
  getCategoriesByParent,
  categoryHasChildren,
} from "../../../utils/categoryUtils";
import { HomeContext } from "./Homepage";

const CategoriesBar = ({ activeCategory, setActiveCategory }) => {
  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
  const categories = useContext(HomeContext);

  useEffect(() => {
    if (categories.length === 0) {
      setCategoriesToDisplay([]);
    } else {
      const categoriesToRender = [];
      if (categoryHasChildren(categories, activeCategory.id)) {
        categoriesToRender.push(categories[0]);
        if (activeCategory.id !== 0) categoriesToRender.push(activeCategory);
        categoriesToRender.push(
          ...getCategoriesByParent(categories, activeCategory.id)
        );
      } else {
        categoriesToRender.push(categories[0]);
        categoriesToRender.push(
          categories.find((cat) => cat.id === activeCategory.parent_category_id)
        );
        categoriesToRender.push(
          ...getCategoriesByParent(
            categories,
            activeCategory.parent_category_id
          )
        );
      }
      setCategoriesToDisplay(categoriesToRender);
    }
  }, [categories, activeCategory]);

  if (categoriesToDisplay.length === 0) {
    return <p>Loading categories...</p>;
  }

  return (
    <ListGroup>
      {categoriesToDisplay.map((category) => (
        <ListGroupItem
          key={category.id}
          action
          onClick={() => setActiveCategory(category)}
          active={activeCategory.id === category.id}
        >
          {category.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CategoriesBar;
