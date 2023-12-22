import book from "../assests/book.png";

function HomePage() {
  return (
    <div className="flex items-center justify-center my-6 py-6">
      <img src={book} alt="book" />
      <p className="text-white px-5">
        This is an application that allows you to create your own post <br />
        which contains a title, a description and if you want you can add an
        image.
      </p>
    </div>
  );
}

export default HomePage;
