export const extractErrorMessage = (errorMessage: string) => {
  const regexResult = errorMessage.match(/\/(.*)$/);

  if (regexResult) {
    const errorCode = regexResult[1].replace(/-/g, ' ');
    const formattedError = errorCode.replace(/\b\w/g, firstChar => firstChar.toUpperCase());

    return formattedError;
  } else {
    return 'Unknown Error';
  }
}

export const createUrl = (options: any, topHeadlines: boolean = true) => {
  const urlWithApiKey = `${process.env.NEWS_API_BASE_URL}/${topHeadlines ? "top-headlines" : "everything"}?apiKey=${process.env.NEWS_API_KEY}`

  const url = new URL(urlWithApiKey);
  const params = new URLSearchParams(url.search);

  Object.keys((options)).forEach((option) => {
    params.append(option, options[option]);
  })

  url.search = params.toString();
  return url.href;
}

export const processStories = (stories: any, requiredNumberOfArticles: number) => {

  if (stories) {
    return stories.articles.filter((article: any) => !(article.title.toLowerCase().includes("removed") || article.urlToImage === null)).splice(0, requiredNumberOfArticles);
  }
  return []
}


export const checkMainPost = (index: number, mainIndexPost: number[]) => {
  return mainIndexPost.includes(index);
}

export const processHtmlString = (htmlString: string) => {
  const [firstParagraph, ...restOfParagraphs] = htmlString.split('</p>');
  return { firstParagraph: firstParagraph + '</p>', restOfParagraphs: restOfParagraphs.join('</p>') };
}

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
          reject(error);
      };
  });
};