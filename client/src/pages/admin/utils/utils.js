export const setValueForKey = (e, attributesFromDb, attrValue) => {
  if (e.target.value !== "Chọn thuộc tính" && attributesFromDb.length > 0) {
    let selectedAttribute = attributesFromDb.find(
      (item) => item.key === e.target.value
    );
    let valuesForKey = attrValue.current;
    if (selectedAttribute && selectedAttribute.value.length > 0) {
      while (valuesForKey.options.length) {
        valuesForKey.remove(0);
      }
      valuesForKey.options.add(new Option("Chọn giá trị"));
      selectedAttribute.value.map((item) => {
        valuesForKey.options.add(new Option(item));
        return "";
      });
    }
  } else {
    return;
  }
};

export const changeCategory = (
  e,
  categories,
  setCategoryChoosen,
  setAttributesFromDb
) => {
  setCategoryChoosen(e.target.value);
  const categoryOfEditProduct = categories.find(
    (item) => item.name === e.target.value
  );
  if (categoryOfEditProduct) {
    setAttributesFromDb(categoryOfEditProduct.attributes);
  } else {
    setAttributesFromDb([]);
  }
};

export const handleUploadImages = (
  e,
  setSelectedFiles,
  setPreviewImages,
  fileInputRef
) => {
  const files = Array.from(e.target.files);
  setSelectedFiles((selectedFiles) => [...selectedFiles, ...files]);
  const imagesPreviews = files.map((file) => ({
    url: URL.createObjectURL(file),
    name: file.name,
  }));
  setPreviewImages((previewImages) => [...previewImages, ...imagesPreviews]);
};
export const removePreviewImage = (
  index,
  setPreviewImages,
  setSelectedFiles
) => {
  setPreviewImages((prev) => prev.filter((_, idx) => idx !== index));
  setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
};

export const addAttribute = (
  newAttribute,
  setAttributesForTable,
  setNewAttribute,
  setDisplayRowAttribute
) => {
  if (newAttribute.key !== "" && newAttribute.value !== "") {
    setAttributesForTable((attr) => {
      if (attr.length > 0) {
        let checkKeyExistTable = false;
        const attributesModified = attr.map((item) => {
          if (item.key === newAttribute.key) {
            item.value = newAttribute.value;
            checkKeyExistTable = true;
            return item;
          }
          return item;
        });
        if (checkKeyExistTable) {
          return [...attributesModified];
        } else {
          return [
            ...attributesModified,
            { key: newAttribute.key, value: newAttribute.value },
          ];
        }
      } else {
        return [{ key: newAttribute.key, value: newAttribute.value }];
      }
    });
    setNewAttribute({ key: "", value: "" });
    setDisplayRowAttribute(false);
  }
};
export const deleteAttribute = (key, setAttributesForTable) => {
  setAttributesForTable((attr) => {
    return attr.filter((item) => item.key !== key);
  });
};

const setAttributeTable = (key, value, setAttributesForTable) => {
  setAttributesForTable((attr) => {
    if (attr.length > 0) {
      let checkKeyExistTable = false;
      const attributesModified = attr.map((item) => {
        if (item.key === key) {
          item.value = value;
          checkKeyExistTable = true;
          return item;
        }
        return item;
      });
      if (checkKeyExistTable) {
        return [...attributesModified];
      } else {
        return [...attributesModified, { key, value }];
      }
    } else {
      return [{ key, value }];
    }
  });
};
export const attributeValueSelected = (e, attrKey, setAttributesForTable) => {
  if (e.target.value !== "Chọn giá trị") {
    setAttributeTable(
      attrKey.current.value,
      e.target.value,
      setAttributesForTable
    );
  }
};
