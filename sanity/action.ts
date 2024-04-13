import { groq } from "next-sanity";
import { readClient } from "./lib/client";
import { buildQuery } from "./utils";

interface GetResourceParams {
  query: string;
  category: string;
  page: string;
}

export const getResourcesPlaylist = async () => {
  try {
    const resources = await readClient.fetch(
      groq`*[_type == "resourcePlaylist"]{
        _id,
        title,
        resources[0...6]->{
          _id,
          title,
          category,
          downloadLink,
          views,
          "image": poster.asset->url,
        }
      }`
    );
    return resources;
  } catch (error) {
    console.log(error);
  }
};

export const getResources = async (params: GetResourceParams) => {
  const { query, category, page } = params;
  try {
    const resources = await readClient.fetch(
      groq`${buildQuery({
        type: "resource",
        query,
        category,
        page: parseInt(page),
      })}{
        _id,
        title,
        slug,
        category,
        downloadLink,
        views,
        "image": poster.asset->url,
      }`
    );
    return resources;
  } catch (error) {
    console.log(error);
  }
};
