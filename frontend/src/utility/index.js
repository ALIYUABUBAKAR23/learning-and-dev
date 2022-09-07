export const getSiteUrl = (pathName = null) => {
    const sitePath = !isEmpty(pathName) && isString(pathName) ? pathName : '';
    let siteUrl = `/${sitePath}`;
    if (window.location.href.includes(':3333')) {
      siteUrl = `http://localhost:8081/${sitePath}`;
    }
    return siteUrl;
  };

export const baseUrl = "http://127.0.0.1:8000/api/";

export const handleWidgetChange = (onChange, formData) => (
  event,
  inputName
) => {
  const newFormData = {
    ...formData,
  };
  console.log('handle widget change: ', formData);
  if (inputName) {
    newFormData[inputName] = event;
  } else {
    const { name, value} = event.target;
    newFormData[name] = value;
  }
  onChange(newFormData);
};

export const handleWidgetChange2 = (onChange, setNewData, formData, changedData) => (
  event,
  inputName
) => {
  const newFormData = {
    ...formData,
  };

  const updatedFormData = {
    ...changedData
  }
  
  if (inputName) {
    newFormData[inputName] = event;
    updatedFormData[inputName] = event;
  } else {
    const { name, value} = event.target;
    newFormData[name] = value;
    updatedFormData[name] = value
  }
  console.log("new")
  console.log(newFormData)
  console.log("updated")
  console.log(updatedFormData)
  onChange(newFormData);
  setNewData(updatedFormData);
};
