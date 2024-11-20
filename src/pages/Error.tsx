import { PiSmileyXEyes } from "react-icons/pi";

const Error = () => {
  return (
    <div className="container text-center pt-[200px]">
      <h1 className="pb-4 font-bold">
        Кажется, что-то пошло не так
      </h1>
        <PiSmileyXEyes className="inline" size={"50px"} />
    </div>
  );
}

export default Error