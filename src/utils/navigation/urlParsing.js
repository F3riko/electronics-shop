export const addQueryParams = (queryParamsObject, location, navigate) => {
  const searchParams = new URLSearchParams(location.search);
  for (const paramName in queryParamsObject) {
    if (queryParamsObject.hasOwnProperty(paramName)) {
      searchParams.set(paramName, queryParamsObject[paramName]);
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
