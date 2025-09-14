export const Footer = () => {
  const date = new Date();
  return (
    <footer className="flex flex-col gap-6 items-center pt-40 pb-20 text-foreground">
      <p>Thanks for stopping by :)</p>
      <p className="opacity-40">© 2021-{date.getFullYear()} James Schinwald</p>
    </footer>
  );
};
