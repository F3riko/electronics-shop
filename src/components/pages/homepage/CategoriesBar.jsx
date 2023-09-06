import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Spinner from "react-bootstrap/Spinner";
import {
  getCategoriesByParent,
  categoryHasChildren,
} from "../../../utils/categoriesOprations/categoryUtils";
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
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className="mt-5"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <ListGroup className="categories-bar">
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
