export const getCategoriesByParent = (categoriesArray, parentId) => {
  return categoriesArray.filter(
    (category) => category.parent_category_id === parentId
  );
};

export const categoryHasChildren = (categoriesArray, categoryId) => {
  return categoriesArray.some(
    (category) => category.parent_category_id === categoryId
  );
};

export const getAllChildrenCategories = (categoriesArray, parentId) => {
  const children = getCategoriesByParent(categoriesArray, parentId);
  const result = [];

  for (const category of children) {
    const descendants = getAllChildrenCategories(categoriesArray, category.id);
    result.push(category, ...descendants);
  }

  return result.map((category) => category.id);
};

export const getCategoryNameById = (categoriesArray, categoryId) => {
  const category = categoriesArray.find(
    (category) => category.id === categoryId
  );
  return category ? category.name : "Category not found";
};
