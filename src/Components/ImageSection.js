import { useEffect, useState } from "react";

export default function Example(props) {
  console.log("image section rendered");
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      if (props.query !== "") {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${props.query}&client_id=zlWMOBdrEdSuxehZGhfTzLaiaH3OZldFG67k5lSUKrU`
        );
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.log("Error while fetching data : " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.query]);

  // console.log("props.query=" + props.query);

  // console.log(data);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Images</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.results?.map((item) => (
            <a key={item.id} href={item.links.download} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={item.urls.small}
                  alt={item.urls.regular}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {item.alt_description}
              </p>
              {/* <h3 className="mt-4 text-sm text-gray-700">{item.alt_description}</h3> */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
