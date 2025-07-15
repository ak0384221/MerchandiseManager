export default function Header({ Heading }) {
  return (
    <nav className=" w-full print:hidden text-center  my-4">
      <h1 className="logo  text-4xl font-Aladin text-center  ">{Heading}</h1>
    </nav>
  );
}
