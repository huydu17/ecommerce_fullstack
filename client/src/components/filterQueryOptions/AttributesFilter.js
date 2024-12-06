import React from "react";
import { Form } from "react-bootstrap";

function AttributesFilter({
  attributesFilter,
  attrsFromFilter,
  setAttrsFromFilter,
}) {
  const onChangeAttributes = (e, key, valueForKey) => {
    setAttrsFromFilter((filters) => {
      if (filters.length === 0) {
        return [{ key: key, values: [valueForKey] }];
      }
      let index = filters.findIndex((item) => item.key === key);
      if (index === -1) {
        return [...filters, { key: key, values: [valueForKey] }];
      }
      if (e.target.checked) {
        filters[index].values.push(valueForKey);
        let unique = [...new Set(filters[index].values)];
        filters[index].values = unique;
        return [...filters];
      }
      let valueWithoutUnChecked = filters[index].values.filter(
        (val) => val !== valueForKey
      );
      filters[index].values = valueWithoutUnChecked;
      if (valueWithoutUnChecked.length === 0) {
        let keyHasValue = filters.filter((item) => item.key !== key);
        return [...keyHasValue];
      } else {
        return [...filters];
      }
    });
  };

  return (
    <>
      {attributesFilter &&
        attributesFilter?.length > 0 &&
        attributesFilter.map((attr, idx) => (
          <div key={idx}>
            <Form.Label>
              <b>{Object.values(attr)[0]}</b>
            </Form.Label>
            <div>
              {attr[Object.keys(attr)[1]].map((valueForKey, index) => (
                <Form.Check
                  id={`check-api3-${valueForKey}`}
                  key={index}
                  type="checkbox"
                  label={valueForKey}
                  checked={
                    !!attrsFromFilter.find(
                      (filter) =>
                        filter.key === attr.key &&
                        filter.values.includes(valueForKey)
                    )
                  } // Liên kết trạng thái checkbox với attrsFromFilter
                  onChange={(e) => onChangeAttributes(e, attr.key, valueForKey)}
                />
              ))}
            </div>
          </div>
        ))}
    </>
  );
}

export default AttributesFilter;
