import React from 'react';

const page = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4 ">ImageToMeme Privacy Policy</h1>
        <p className="mb-4">
          ImageToMeme is a free online service that provides a simple way to
          make your own meme, as you want with the text color, font size and the
          position of the text.
        </p>
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <p className="mb-4">
          At the moment we do not collect any type of information from your
          data, however this project is build by Nextjs so probably is storing
          some cookies for caching and other stuff related to performance.
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>
            Cookies: Cookies are data files that are placed on your device or
            computer and often include an anonymous unique identifier.
          </li>
        </ul>
        <h2 className="text-xl font-bold mb-2">Uploaded Images</h2>
        <p className="mb-4">
          When you upload an image to the App, We do not collect nor store any
          of these images we are simply putting a way to add text to the image
          and download it.
        </p>
        <h2 className="text-xl font-bold mb-2">Use of Cookies</h2>
        <p className="mb-4">
          We do not use any cookies to track user behavior for the time being.
          but this probably will change in the future.
        </p>
        <h2 className="text-xl font-bold mb-2">
          Changes to Our Privacy Policy
        </h2>
        <p className="mb-4">
          We reserve the right to make changes to this Privacy Policy at any
          time. Any changes will be posted on this page, so please check back
          periodically for updates.
        </p>
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at moustafaashraf01@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default page;
