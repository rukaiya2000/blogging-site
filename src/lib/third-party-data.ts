import fetchData from "./axios"
import { createUrl, processStories } from "./common-utils";

export const fetchCategoryWiseStories = async (pageSize: number, country: string, category: string | null = null) => {
    const params = {
        country
    }
    if (category) {
        Object.assign(params, { category })
    }
    
    const url = createUrl(params);
    
    const response = await fetchData(url, "GET", params);

    return processStories(response, pageSize);
}

export const fetchStoriesRelatedToCurrentTopic = async (pageSize: number, topic: string, to: string | null = null) => {

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);

    const params = {
        pageSize,
        q: topic,
        from: currentDate.toLocaleDateString('en-ca'),
        sortBy: "publishedAt"
    }

    if (to) {
        Object.assign(params, { to })
    }
    const url = createUrl(params, false);

    const response = await fetchData(url, "GET", params);
    return response;
}

export const fetchRandomFoodMeals = async () => {
    const response = await fetchData(process.env.RANDOM_FOOD_MEAL_URL!, "GET");
    return response;
}
