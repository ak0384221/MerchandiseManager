export default function Header({ Heading }) {
  return (
    <nav className=" w-full print:hidden text-center  pt-6 mb-4 flex justify-center items-center gap-2">
      <img src="/logo2.png" className="size-[2rem]  " alt="" />{" "}
      <h1 className="logo  text-4xl font-Aladin text-center  ">{Heading}</h1>
    </nav>
  );
}
