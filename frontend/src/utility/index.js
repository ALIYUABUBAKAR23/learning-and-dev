export const getSiteUrl = (pathName = null) => {
    const sitePath = !isEmpty(pathName) && isString(pathName) ? pathName : '';
    let siteUrl = `/${sitePath}`;
    if (window.location.href.includes(':3333')) {
      siteUrl = `http://localhost:8081/${sitePath}`;
    }
    return siteUrl;
  };

export const baseUrl = "http://127.0.0.1:8000/api/"
export const baseUserUrl = "http://127.0.0.1:8000/"