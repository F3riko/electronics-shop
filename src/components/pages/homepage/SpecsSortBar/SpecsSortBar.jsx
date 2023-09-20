import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import { getSpecsByCategory } from "../../../../services/homepage-api";
import {
  addMultipleQueryParams,
  deleteAllOptionsParams,
  getAllOptionsParams,
} from "../../../../utils/navigation/urlParsing";
import { useLocation, useNavigate } from "react-router-dom";

const SpecsSortBar = ({ activeCategory }) => {
  const [optionsData, setOptionsData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [openCategory, setOpenCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const allOptions = getAllOptionsParams(location);
    if (Object.keys(allOptions).length !== 0) {
      setSelectedOptions((prevValue) => {
        const selectedOptionsCopy = { ...prevValue };
        const presentKeys = Object.keys(allOptions);
        for (const optionName of Object.keys(selectedOptionsCopy)) {
          if (presentKeys.includes(optionName)) {
            selectedOptionsCopy[optionName] = allOptions[optionName];
          }
        }
        return selectedOptionsCopy;
      });
    } else if (Object.keys(optionsData).length !== 0) {
      setSelectedToDefault(optionsData);
    }
  }, [location]);

  useEffect(() => {
    if (activeCategory?.id) {
      let categoryForSpecs = activeCategory?.id;
      if (activeCategory.parent_category_id !== 0) {
        categoryForSpecs = activeCategory.parent_category_id;
      }
      (async () => {
        const options = await getSpecsByCategory(categoryForSpecs);
        setOptionsData(options);
        setSelectedToDefault(options);
      })();
    } else {
      setOptionsData({});
      deleteAllOptionsParams(location, navigate);
    }
  }, [activeCategory]);

  const handleOptionClick = (category, option) => {
    setSelectedOptions((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      const optionValue = option.title;

      if (updatedSelected[category].includes(optionValue)) {
        updatedSelected[category] = updatedSelected[category].filter(
          (selectedValue) => selectedValue !== optionValue
        );
      } else {
        updatedSelected[category].push(optionValue);
      }
      return updatedSelected;
    });
  };

  const toggleCategory = (category) => {
    setOpenCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  const handleFilter = async () => {
    const selectedOptionsClean = Object.entries(selectedOptions)
      .filter(([_, value]) => value.length > 0)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    if (Object.keys(selectedOptions).length > 0) {
      addMultipleQueryParams(selectedOptionsClean, location, navigate);
    }
  };

  const setSelectedToDefault = (options) => {
    const selectedOptionsEmpty = {};
    Object.keys(options).forEach((option) => {
      selectedOptionsEmpty[option] = [];
    });
    setSelectedOptions(selectedOptionsEmpty);
  };

  return (
    <div className="specs-wrapper">
      {Object.keys(optionsData).map((category) => (
        <div key={category}>
          <Button
            className="spec-toggle-button"
            variant="outline-secondary"
            onClick={() => toggleCategory(category)}
            aria-controls={`${category}-options`}
            aria-expanded={openCategory === category}
          >
            {category}
          </Button>
          <Collapse in={openCategory === category}>
            <div id={`${category}-options`} className="specs-list">
              {optionsData[category].map((option) => (
                <Form.Check
                  key={option.id}
                  type="checkbox"
                  id={`option-${option.id}`}
                  label={option.title}
                  checked={selectedOptions[category].includes(option.title)}
                  onChange={() => handleOptionClick(category, option)}
                />
              ))}
            </div>
          </Collapse>
        </div>
      ))}
      <Button className="w-100 mt-2" onClick={handleFilter}>
        Apply filters
      </Button>
    </div>
  );
};

export default SpecsSortBar;
