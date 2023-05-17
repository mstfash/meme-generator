import MemeCreator from '@/components/MemeCreator';

export default function Home() {
  return (
    <div>
      <div className="max-w-[767px]">
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Create a meme from image of your choice.
        </h1>
        <p className="my-5">
          Upload your image, add areas for the text, drag the text box wherever
          you want it to be and download the image with the text on it.
        </p>
      </div>
      <MemeCreator />
    </div>
  );
}
