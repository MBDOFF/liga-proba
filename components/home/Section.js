export default function Section({ children, name, className, bgColor = "bg-white" }) {
  return (
    <section id={name} className={`min-h-screen w-full flex flex-col items-center p-12 ${bgColor} ${className}`}>
      {children}
    </section>
  );
}
