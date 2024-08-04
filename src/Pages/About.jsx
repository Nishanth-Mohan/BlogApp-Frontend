import React from 'react';
import { Blockquote,Avatar } from "flowbite-react";

const About = () => {


  return (
 
    <div className='m-1'>
        <h1 className='font-medium'>About</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome to Blog App, where creativity meets simplicity. Our mission is to provide a platform that empowers individuals to share their thoughts, ideas, and stories with the world. Whether you're an aspiring writer, a seasoned blogger, or just someone who loves to share your experiences, Blog App is designed to make your blogging journey as smooth and enjoyable as possible.
        </p><br/>
<h1 className='font-medium'>Our Story</h1>
<p className="text-gray-500 dark:text-gray-400">
Blog App was created with the vision of making blogging accessible and straightforward for everyone. We saw a need for a user-friendly platform that combines powerful features with an intuitive interface. Our team is passionate about technology and storytelling, and we believe that anyone should be able to express themselves without worrying about complex tools or technical barriers.
</p><br/>
<h1 className='font-semibold'>Features</h1>
<Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800 grid grid-cols-1 md:grid-cols-2 md:gap-6">
<div className='p-5'>
  <b>User-Friendly Interface:</b> Designed to be intuitive, making it easy for anyone to start and manage their blog.<br/><br/>
  <b>Customizable Themes:</b> Choose from a variety of themes and layouts to match your personal style.<br/><br/>
  <b>Responsive Design:</b> Optimized for both desktop and mobile devices so you can manage your blog on the go.<br/><br/>
  <b>Media Integration:</b> Easily add images and other media to enhance your posts.<br/><br/>
  <b>Category Management:</b> Organize your posts into categories for a better reading experience.<br/><br/>
 </div>
<img src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-10.png" alt="img" />
</Blockquote>


<h1 className='font-medium'>Our Team</h1>
<p className="text-gray-500 dark:text-gray-400">Our team consists of passionate developers, designers, and content creators who are committed to delivering the best blogging experience. We constantly strive to improve and innovate, ensuring that Blog App remains a top choice for bloggers worldwide.
</p><br/>

<h1 className='font-medium'>Get Involved</h1>
<p className="text-gray-500 dark:text-gray-400">We’re always looking for feedback and contributions from our users. If you have any suggestions, feature requests, or simply want to say hello, please don’t hesitate to contact us. You can also contribute to the project by visiting our GitHub repository and checking out our open issues and feature requests.</p>
<br/>
<h1 className='font-medium'>Contact Us</h1>
<p className="text-gray-500 dark:text-gray-400">Email: ********<br/>
Twitter: ********<br/>
GitHub: ********<br/><br/>
</p>
<p className="text-gray-500 dark:text-gray-400">Thank you for choosing Blog App. We’re excited to see what you create and share with the world!</p><br/><br/>

<figcaption className="mt-6 flex items-center justify-center space-x-3">
        <Avatar rounded size="xs" img="/images/people/profile-picture-5.jpg" alt="profile picture" />
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">Nishanth Mohan</cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">FullStack Developer</cite>
        </div>
      </figcaption>

    </div>
   
  )
}

export default About