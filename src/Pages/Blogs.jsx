import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/post/getposts");
    const data = await response.json();
    setBlogs(data);
    //console.log(data);
  };
  return (
    <div className="flex flex-col md:flex-row">
      {blogs.map((ele, index) => {
        return (
          <div className="p-3">
          <div key={index}>
            <Card
              className="max-w-sm"
              imgAlt="image"
              imgSrc={ele.image}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ele.title}
              </h5>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ele.category}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {ele.content}
              </p>
            </Card>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
