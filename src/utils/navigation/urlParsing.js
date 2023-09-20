export const addQueryParams = (queryParamsObject, location, navigate) => {
  const searchParams = new URLSearchParams(location.search);
  for (const paramName in queryParamsObject) {
    if (queryParamsObject.hasOwnProperty(paramName)) {
      searchParams.set(paramName, queryParamsObject[paramName]);
    }
  }
  navigate(`?${searchParams.toString()}`);
};

export const addMultipleQueryParams = (
  queryParamsObject,
  location,
  navigate
) => {
  const searchParams = new URLSearchParams(location.search);
  const allOptions = Object.keys(getAllOptionsParams(location));
  for (const option of allOptions) {
    searchParams.delete(option);
  }
  for (const paramName of Object.keys(queryParamsObject)) {
    const paramValues = queryParamsObject[paramName];
    for (const paramValue of paramValues) {
      searchParams.append(paramName, paramValue);
    }
  }
  navigate(`?${searchParams.toString()}`);
};

export const deleteSortingParams = (queryParamsObject, location, navigate) => {
  const searchParams = new URLSearchParams(location.search);
  for (const paramName in queryParamsObject) {
    if (queryParamsObject.hasOwnProperty(paramName)) {
      if (paramName === "category" || paramName === "searchQuery") {
        continue;
      }
      if (searchParams.has(paramName)) {
        searchParams.delete(paramName);
      }
    }
  }
  const newQueryString = searchParams.toString();
  navigate(`?${newQueryString}`);
};

export const deleteQueryParam = (paramName, location, navigate) => {
  const searchParams = new URLSearchParams(location.search);
  searchParams.delete(paramName);
  navigate(`?${searchParams.toString()}`);
};

export const resetQueryParams = (navigate) => {
  navigate("");
};

export const getAllQueryParams = (location) => {
  const queryParams = new URLSearchParams(location.search);
  const allQueryParams = {};

  for (const [paramName, paramValue] of queryParams.entries()) {
    allQueryParams[paramName] = paramValue;
  }
  return allQueryParams;
};

const fixedParams = [
  "category",
  "searchQuery",
  "minPrice",
  "maxPrice",
  "sortBy",
];
export const getAllOptionsParams = (location) => {
  const queryParams = new URLSearchParams(location.search);
  const allQueryParams = {};
  for (const [paramName, paramValue] of queryParams.entries()) {
    if (!fixedParams.includes(paramName)) {
      if (allQueryParams[paramName]?.length > 0) {
        allQueryParams[paramName].push(paramValue);
      } else {
        allQueryParams[paramName] = [paramValue];
      }
    }
  }
  return allQueryParams;
};

export const deleteAllOptionsParams = (location, navigate) => {
  const allOptions = Object.keys(getAllOptionsParams(location));
  const searchParams = new URLSearchParams(location.search);
  for (const option of allOptions) {
    searchParams.delete(option);
  }
  navigate(`?${searchParams.toString()}`);
};
